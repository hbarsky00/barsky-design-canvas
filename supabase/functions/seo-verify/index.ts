// supabase/functions/seo-verify/index.ts
// Simplified edge function for quick SEO spot-checks
// For comprehensive verification, use build-time scripts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function okJSON(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", ...corsHeaders },
  });
}

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Accept ?slug=/path to probe a live page
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug") ?? "/";
    const siteUrl = Deno.env.get("SITE_URL") ?? "https://barskydesign.pro";
    const target = new URL(slug, siteUrl).toString();

    console.log(`[SEO-VERIFY] Checking: ${target}`);

    // Light verification against the live page
    const res = await fetch(target, { redirect: "follow" });
    const html = await res.text();

    // Simple extractors (no JSDOM in Edge)
    const get = (re: RegExp) => (html.match(re)?.[1] ?? "").trim();
    const title = get(/<title>([\s\S]*?)<\/title>/i);
    const description = get(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    const canonical = get(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    const ogTitle = get(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
    const ogDesc = get(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
    const ogImage = get(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);

    const result = {
      ok: true,
      target,
      status: res.status,
      seo: { title, description, canonical, ogTitle, ogDesc, ogImage },
      notes: "Edge check succeeded. For full DB↔HTML parity, use the build-time verifier."
    };

    console.log(`[SEO-VERIFY] Success:`, JSON.stringify(result, null, 2));
    return okJSON(result);
  } catch (e) {
    const error = String(e?.message ?? e);
    console.error(`[SEO-VERIFY] Error:`, error);
    return okJSON({ ok: false, error }, 500);
  }
});
