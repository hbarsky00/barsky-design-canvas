// supabase/functions/seo-verify/index.ts
// Robust SEO verifier with full input normalization and no-throw behavior
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...cors, ...extra },
  });
}

function badInput(hint: string) {
  return json({ ok: false, error: "invalid_target_url", hint }, 400);
}

function normalizeTarget(urlParam: string | null, pathParam: string | null): string | null {
  const site = (Deno.env.get("SITE_URL") || "https://barskydesign.pro").replace(/\/+$/, "");
  let target = urlParam || null;

  if (!target && pathParam) {
    target = pathParam.startsWith("/") ? site + pathParam : `${site}/${pathParam}`;
  }

  if (!target || target === "/") target = site + "/";

  if (target && !/^https?:\/\//i.test(target)) target = "https://" + target;

  try {
    const u = new URL(target);
    u.pathname = u.pathname.replace(/\/{2,}/g, "/");
    return u.toString();
  } catch {
    return null;
  }
}

async function fetchWithTimeout(url: string, ua: string, ms = 8000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "User-Agent": ua, "Accept": "text/html,*/*" },
    });
    const text = await res.text();
    return { status: res.status, ok: res.ok, text, url: res.url };
  } catch (e) {
    return { status: 0, ok: false, text: "", url, error: String(e) };
  } finally {
    clearTimeout(timer);
  }
}

function extract(html: string) {
  const pick = (re: RegExp) => (html.match(re)?.[1] ?? "").trim();
  const has = (re: RegExp) => re.test(html);

  const title = pick(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = pick(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  const canonical = pick(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  const ogTitle = pick(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  const ogDesc = pick(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  const ogImg = pick(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  const ogUrl = pick(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  const noindex = has(/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["'][^>]*>/i);

  return { title, desc, canonical, ogTitle, ogDesc, ogImg, ogUrl, noindex };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("", { headers: cors });

  const q = new URL(req.url).searchParams;
  const ua = q.get("ua") || "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
  const live = q.get("live") !== "false";

  const target = normalizeTarget(q.get("slug") || q.get("target_url"), q.get("path"));
  if (!target) return badInput("Provide ?slug=<path> or ?target_url=<absolute> (SITE_URL is used as base).");

  if (!live) {
    return json({ ok: true, target, dryRun: true });
  }

  const res = await fetchWithTimeout(target, ua, 10000);
  if (!res.ok || !res.text) {
    return json({
      ok: false,
      error: "fetch_failed",
      target,
      status: res.status,
      detail: res.error || "Empty response body",
      hint: "Confirm URL is reachable and not blocked by auth or CORS.",
    }, 200, { "Cache-Control": "no-cache" });
  }

  const slice = res.text.slice(0, 200_000);
  const meta = extract(slice);

  const base = (Deno.env.get("SITE_URL") || "https://barskydesign.pro").replace(/\/+$/, "");
  const canonicalOk = !!meta.canonical && meta.canonical.startsWith(base);
  const canonicalSingle = (slice.match(/rel=["']canonical["']/gi) || []).length === 1;

  const report = {
    ok: true,
    target,
    fetchedUrl: res.url,
    status: res.status,
    env: { SITE_URL: Deno.env.get("SITE_URL") ?? null },
    seo: {
      title: meta.title,
      description: meta.desc,
      canonical: meta.canonical,
      ogTitle: meta.ogTitle,
      ogDesc: meta.ogDesc,
      ogImage: meta.ogImg,
      ogUrl: meta.ogUrl,
    },
    diagnostics: {
      title_ok: !!meta.title,
      description_ok: !!meta.desc,
      canonical_ok: canonicalOk,
      canonical_absolute: /^https?:\/\//i.test(meta.canonical || ""),
      canonical_single_tag: canonicalSingle,
      og_tags_ok: !!(meta.ogTitle && meta.ogDesc && meta.ogImg),
      noindex: !!meta.noindex,
      htmlBytes: res.text.length,
    },
  };

  return json(report, 200, {
    "Cache-Control": "public, max-age=60, stale-while-revalidate=600",
  });