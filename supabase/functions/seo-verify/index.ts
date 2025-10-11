import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function j(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", ...cors },
  });
}

function buildTarget(slugRaw: string | null, siteUrlEnv: string | undefined) {
  const slug = (slugRaw ?? "/").trim();
  const siteUrl = (siteUrlEnv ?? "https://barskydesign.pro").trim();
  try {
    return slug.startsWith("http") ? new URL(slug).toString() : new URL(slug, siteUrl).toString();
  } catch {
    return "";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  const siteUrlEnv = Deno.env.get("SITE_URL");

  const target = buildTarget(slug, siteUrlEnv);

  if (!target) {
    return j(
      {
        ok: false,
        error: "invalid_target_url",
        details: { slug, SITE_URL: siteUrlEnv ?? null },
      },
      400
    );
  }

  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 10_000);

    const res = await fetch(target, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "supabase-edge-seo-verify/1.0" },
    }).catch((e) => {
      throw new Error(`fetch_failed: ${e?.message || e}`);
    });

    clearTimeout(t);

    const status = res.status;
    const html = await res.text();

    const pick = (re: RegExp) => (html.match(re)?.[1] ?? "").trim();
    const title = pick(/<title>([\s\S]*?)<\/title>/i);
    const description = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    const canonical = pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    const ogTitle = pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
    const ogDesc = pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
    const ogImage = pick(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);

    return j({
      ok: status >= 200 && status < 300,
      status,
      target,
      env: { SITE_URL: siteUrlEnv ?? null },
      seo: { title, description, canonical, ogTitle, ogDesc, ogImage },
      diagnostics: {
        htmlBytes: html.length,
        hasHead: /<head[\s>]/i.test(html),
        notes:
          status >= 200 && status < 300
            ? "Success"
            : "Non-200 from target; SEO fields may still be extracted",
      },
    }, 200);
  } catch (e) {
    return j({
      ok: false,
      error: "edge_exception",
      message: String(e?.message ?? e),
      targetInfo: { slug, SITE_URL: siteUrlEnv ?? null },
    }, 200);
  }
});
