// supabase/functions/seo-verify/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", ...CORS },
  });
}

function normalizeSiteUrl(raw?: string | null) {
  const v = (raw ?? "").trim();
  if (!v) return "https://barskydesign.pro"; // sane default
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

function buildTarget(slugRaw: string | null, siteRaw?: string | null) {
  const slug = (slugRaw ?? "/").trim() || "/";
  const site = normalizeSiteUrl(siteRaw);
  try {
    // Accept absolute slugs as well
    return slug.startsWith("http") ? new URL(slug).toString() : new URL(slug, site).toString();
  } catch (e) {
    console.error("[seo-verify] buildTarget failed", { slug, site, e: String(e) });
    return "";
  }
}

serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const url = new URL(req.url);

    // Accept `?slug=` and `/seo-verify/<slug>` forms
    const qpSlug = url.searchParams.get("slug");
    const pathSlug = url.pathname.replace(/\/seo-verify\/?/, "") || null;

    const SITE_URL = Deno.env.get("SITE_URL"); // set in function env
    const target = buildTarget(qpSlug ?? pathSlug, SITE_URL);

    if (!target) {
      return json({
        ok: false,
        error: "invalid_target_url",
        diagnostics: { slug: qpSlug ?? pathSlug, SITE_URL: SITE_URL ?? null },
      });
    }

    // Time out fast to avoid hanging
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    let res: Response;
    try {
      res = await fetch(target, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "supabase-edge-seo-verify/1.0" },
      });
    } catch (e) {
      clearTimeout(timeout);
      console.error("[seo-verify] fetch failed", { target, e: String(e) });
      return json({
        ok: false,
        error: "fetch_failed",
        message: String(e),
        target,
        env: { SITE_URL: SITE_URL ?? null },
      });
    }

    clearTimeout(timeout);

    const status = res.status;
    const html = await res.text();

    // Tiny extractors (no JSDOM in Edge)
    const pick = (re: RegExp) => (html.match(re)?.[1] ?? "").trim();
    const title = pick(/<title>([\s\S]*?)<\/title>/i);
    const description = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    const canonical = pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    const ogTitle = pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
    const ogDesc = pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
    const ogImage = pick(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);

    // Always return 200 with diagnostics so the UI never shows a red HTTP error box
    return json({
      ok: status >= 200 && status < 300,
      status,
      target,
      env: { SITE_URL: SITE_URL ?? null },
      seo: { title, description, canonical, ogTitle, ogDesc, ogImage },
      diagnostics: {
        htmlBytes: html.length,
        hasHead: /<head[\s>]/i.test(html),
        note:
          status >= 200 && status < 300
            ? "Success"
            : "Upstream returned non-200; fields may still parse",
      },
    });
  } catch (e) {
    console.error("[seo-verify] unhandled", String(e));
    return json({
      ok: false,
      error: "edge_exception",
      message: String(e),
    });
  }
});
