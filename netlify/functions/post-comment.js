/**
 * Accepts a blog comment, verifies the commenter is human, stores it unapproved.
 *
 * Why a function rather than a direct Supabase insert from the browser: the
 * publishable key is public, so anything the browser can do, a script can do.
 * `anon` therefore has no grants and no policies on `comments` at all — verified
 * by querying as anon, which returns 401 for both select and insert. The only
 * writer is this function, using the service role key, and it will not write
 * anything until Turnstile says the caller is a person.
 *
 * Fails CLOSED. If TURNSTILE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY is missing,
 * this returns 503 and stores nothing. An unprotected comment box is worse than
 * no comment box, so a misconfiguration must not silently open one.
 */
const ALLOWED_ORIGINS = ["https://barskydesign.pro", "https://www.barskydesign.pro"];

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const seen = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  seen.push(now);
  hits.set(ip, seen);
  if (hits.size > 500) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return seen.length > MAX_PER_WINDOW;
}

const clamp = (v, n) => String(v == null ? "" : v).trim().slice(0, n);
const countLinks = (s) => (s.match(/https?:\/\//gi) || []).length;

async function sha256(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST only" };

  const h = event.headers || {};
  const origin = h.origin || h.Origin || "";
  const referer = h.referer || h.Referer || "";
  const fromUs =
    ALLOWED_ORIGINS.includes(origin) ||
    ALLOWED_ORIGINS.some((o) => referer.startsWith(o + "/"));
  if (!fromUs) return { statusCode: 403, body: JSON.stringify({ ok: false, reason: "bad-origin" }) };

  const secret = process.env.TURNSTILE_SECRET_KEY;
  const svc = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const base = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  if (!secret || !svc || !base) {
    console.error("comments not configured", { secret: !!secret, svc: !!svc, base: !!base });
    return { statusCode: 503, body: JSON.stringify({ ok: false, reason: "not-configured" }) };
  }

  const ip =
    h["x-nf-client-connection-ip"] ||
    (h["x-forwarded-for"] || "").split(",")[0].trim() ||
    "unknown";
  if (rateLimited(ip)) return { statusCode: 429, body: JSON.stringify({ ok: false, reason: "rate-limited" }) };

  let d = {};
  try { d = JSON.parse(event.body || "{}"); }
  catch { return { statusCode: 400, body: JSON.stringify({ ok: false, reason: "bad-json" }) }; }

  // honeypot: a field hidden from people, irresistible to form-fillers
  if (clamp(d.website, 200)) return { statusCode: 200, body: JSON.stringify({ ok: true, pending: true }) };

  // a person cannot read a post and write a comment in under three seconds
  const elapsed = Number(d.elapsedMs || 0);
  if (!Number.isFinite(elapsed) || elapsed < 3000) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, reason: "too-fast" }) };
  }

  const slug = clamp(d.postSlug, 120);
  const name = clamp(d.name, 80);
  const email = clamp(d.email, 200);
  const bodyText = clamp(d.body, 4000);
  if (!slug || !name || !bodyText) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, reason: "missing-fields" }) };
  }
  if (email && !/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, reason: "bad-email" }) };
  }
  // comment spam is almost always link delivery
  if (countLinks(bodyText) > 2) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, reason: "too-many-links" }) };
  }

  // Turnstile, server side. The browser token proves nothing until Cloudflare confirms it.
  const form = new URLSearchParams({ secret, response: String(d.token || ""), remoteip: ip });
  const tv = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  }).then((r) => r.json()).catch(() => ({ success: false }));
  if (!tv.success) {
    return { statusCode: 403, body: JSON.stringify({ ok: false, reason: "human-check-failed" }) };
  }

  const ipHash = await sha256(ip + "|" + (process.env.IP_SALT || base));
  const res = await fetch(`${base}/rest/v1/comments`, {
    method: "POST",
    headers: {
      apikey: svc,
      Authorization: `Bearer ${svc}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      post_slug: slug,
      author_name: name,
      author_email: email || null,
      body: bodyText,
      approved: false,              // nothing is ever published on submit
      ip_hash: ipHash,
      user_agent: clamp(h["user-agent"] || "", 300),
    }),
  });

  if (!res.ok) {
    console.error("comment insert failed", res.status, (await res.text()).slice(0, 200));
    return { statusCode: 502, body: JSON.stringify({ ok: false, reason: "store-failed" }) };
  }
  // Tell Hiram a comment is waiting. Best effort: if this fails the comment is
  // already stored, so a missing email is never a lost comment.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Barsky Design <hello@barskydesign.pro>",
        to: ["hbarsky01@gmail.com"],
        subject: `Comment awaiting approval — ${slug}`,
        html:
          `<p style="font:14px system-ui"><strong>${esc(name)}</strong> commented on ` +
          `<a href="https://barskydesign.pro/blog/${esc(slug)}">${esc(slug)}</a>:</p>` +
          `<div style="font:14px/1.6 system-ui;white-space:pre-wrap;border-left:3px solid #A8432A;padding-left:14px">${esc(bodyText)}</div>` +
          `<p style="font:13px system-ui;color:#666">It is stored unapproved. Flip <code>approved</code> to true in the Supabase table editor to publish it.</p>`,
      }),
    }).catch((e) => console.error("comment notify failed", e));
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true, pending: true }) };
};
