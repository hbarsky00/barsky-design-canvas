import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", ...CORS },
  });

function normalizeSiteUrl(raw?: string | null) {
  const v = (raw ?? "").trim();
  if (!v) return "https://barskydesign.pro";
  const cleaned = v.replace(/\/+$/, "");
  return /^https?:\/\//i.test(cleaned) ? cleaned : `https://${cleaned}`;
}

function buildTarget(slugRaw: string | null, siteRaw?: string | null) {
  const slug = (slugRaw ?? "/").trim() || "/";
  const site = normalizeSiteUrl(siteRaw);
  
  // If slug is already an absolute URL, use it directly
  if (/^https?:\/\//i.test(slug)) {
    try {
      return new URL(slug).toString();
    } catch {
      return "";
    }
  }
  
  // Otherwise, combine with site URL
  const path = slug.startsWith("/") ? slug : "/" + slug;
  try {
    return new URL(path, site).toString();
  } catch {
    try {
      return new URL("/", site).toString();
    } catch {
      return "";
    }
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const url = new URL(req.url);
  const qpSlug = url.searchParams.get("slug");
  const pathSlug = url.pathname.replace(/\/seo-verify\/?/, "") || null;

  const SITE_URL = Deno.env.get("SITE_URL");
  const target = buildTarget(qpSlug ?? pathSlug, SITE_URL);

  if (!target) {
    return json({
      ok: false,
      error: "invalid_target_url",
      hint: "Provide absolute URL (https://example.com) or relative path (/path)",
      diagnostics: { 
        slug: qpSlug ?? pathSlug, 
        SITE_URL: SITE_URL ?? null,
        fallback: "https://barskydesign.pro"
      }
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(target, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "supabase-edge-seo-verify/1.0" },
    }).catch((e) => {
      throw new Error(`fetch_failed: ${e?.message || e}`);
    });

    clearTimeout(timeout);
    const status = res.status;
    const html = await res.text();

    const pick = (re: RegExp) => (html.match(re)?.[1] ?? "").trim();
    const title = pick(/<title>([\s\S]*?)<\/title>/i);
    const description = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    const canonical = pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    const ogTitle = pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
    const ogDesc = pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
    const ogImage = pick(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);

    return json({
      ok: status >= 200 && status < 300,
      status,
      target,
      env: { SITE_URL: SITE_URL ?? null },
      seo: { title, description, canonical, ogTitle, ogDesc, ogImage },
      diagnostics: {
        htmlBytes: html.length,
        hasHead: /<head[\s>]/i.test(html),
        note: "Edge returns 200 even on non-200 upstream; see status field."
      }
    });
  } catch (e) {
    return json({
      ok: false,
      error: "edge_exception",
      message: String(e?.message ?? e),
      targetInfo: { SITE_URL: SITE_URL ?? null }
    });
  }
});
