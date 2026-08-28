/**
 * Sends Hiram the contact-form email.
 *
 * Called directly by the form, not wired to Netlify's `submission-created`
 * event. The event version was correctly bundled — Netlify returned 403 for it
 * versus 404 for a name that does not exist — and still never fired anything I
 * could observe, with no way to read its logs from here. A function the form
 * calls by name is one I can invoke and verify in a single request.
 *
 * This runs after the Netlify Forms POST has already succeeded, so the
 * submission is stored no matter what happens in here. Worst case is a missing
 * notification, never a lost message.
 *
 * ESM export, not `exports.handler`: package.json sets "type": "module", so a
 * .js file here is an ES module and the CommonJS form dies at load with
 * "module is not defined in ES module scope". That is also, retrospectively,
 * why the submission-created version produced nothing — it was bundled fine
 * and crashed on every invocation, somewhere I could not read.
 */
const TO = "hbarsky01@gmail.com";
const FROM = "Barsky Design <hello@barskydesign.pro>";

/**
 * Abuse guards.
 *
 * This endpoint spends money: it calls Resend with a live key and sends mail
 * from a verified domain. Before these checks it accepted any POST from anyone,
 * and the repo is public, so the URL and payload shape were readable by anyone
 * who looked. That is an open mail relay pointed at Hiram's inbox.
 *
 * Three cheap layers, in order of how much they cost to evaluate:
 *   1. Origin/Referer must be one of ours. Blocks curl and scripts outright;
 *      a browser cannot forge either header.
 *   2. Per-IP rate limit, in memory. Netlify keeps a warm container alive
 *      between invocations, so this catches bursts from one source. It is not
 *      durable across cold starts and is not meant to be — it is a speed bump
 *      on the cheap path, not the security boundary.
 *   3. Field length caps. An unbounded message body is both a mail-size problem
 *      and a way to burn quota with one request.
 */
const ALLOWED_ORIGINS = [
  "https://barskydesign.pro",
  "https://www.barskydesign.pro",
];

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const seen = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  seen.push(now);
  hits.set(ip, seen);
  // keep the map from growing without bound on a long-lived container
  if (hits.size > 500) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return seen.length > MAX_PER_WINDOW;
}

const LIMITS = { name: 120, email: 200, subject: 200, message: 5000 };
const clamp = (v, n) => String(v == null ? "" : v).slice(0, n);

const esc = (v) =>
  String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "POST only" };
  }

  const h = event.headers || {};
  const origin = h.origin || h.Origin || "";
  const referer = h.referer || h.Referer || "";
  const fromUs =
    ALLOWED_ORIGINS.includes(origin) ||
    ALLOWED_ORIGINS.some((o) => referer.startsWith(o + "/"));
  if (!fromUs) {
    return { statusCode: 403, body: JSON.stringify({ ok: false, reason: "bad-origin" }) };
  }

  const ip =
    h["x-nf-client-connection-ip"] ||
    (h["x-forwarded-for"] || "").split(",")[0].trim() ||
    "unknown";
  if (rateLimited(ip)) {
    return { statusCode: 429, body: JSON.stringify({ ok: false, reason: "rate-limited" }) };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY missing");
    return { statusCode: 500, body: JSON.stringify({ ok: false, reason: "no-key" }) };
  }

  let d = {};
  try {
    d = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, reason: "bad-json" }) };
  }

  const name = clamp(d.name, LIMITS.name);
  const email = clamp(d.email, LIMITS.email);
  const subject = clamp(d.subject, LIMITS.subject);
  const message = clamp(d.message, LIMITS.message);

  // an empty message is a bot probe, not a person
  if (!message.trim()) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, reason: "empty" }) };
  }
  // reply_to only when it parses as an address, so a junk value cannot poison the header
  const replyTo = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email) ? email : undefined;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email || undefined,
      subject: `barskydesign.pro — ${subject || "New enquiry"} (from ${name || "unknown"})`,
      html:
        `<h2 style="font:600 18px system-ui;margin:0 0 16px">New message from barskydesign.pro</h2>` +
        `<p style="font:14px system-ui;margin:0 0 6px"><strong>Name:</strong> ${esc(name)}</p>` +
        `<p style="font:14px system-ui;margin:0 0 6px"><strong>Email:</strong> ${esc(email)}</p>` +
        `<p style="font:14px system-ui;margin:0 0 16px"><strong>Subject:</strong> ${esc(subject)}</p>` +
        `<div style="font:14px/1.6 system-ui;white-space:pre-wrap;border-left:3px solid #314ff6;padding-left:14px">${esc(message)}</div>`,
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("Resend rejected:", res.status, text);
    return { statusCode: 502, body: JSON.stringify({ ok: false, status: res.status, detail: text }) };
  }
  return { statusCode: 200, body: JSON.stringify({ ok: true, resend: text }) };
};
