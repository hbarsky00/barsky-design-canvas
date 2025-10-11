// DB-backed SEO verifier: no external fetch, no 400/500s.
// Returns the seo_meta row for a slug and computed canonicals.
// Optional: still tries a best-effort fetch, but it's non-fatal.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const json = (data: unknown) =>
  new Response(JSON.stringify(data), { headers: { "content-type": "application/json", ...CORS } });

function normalizeSiteUrl(raw?: string | null) {
  const v = (raw ?? "").trim();
  if (!v) return "https://barskydesign.pro";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

function normalizeSlug(input?: string | null) {
  const s = (input ?? "/").trim();
  if (!s || s === "/") return "home";        // your convention
  return s.replace(/^\/+/, "").replace(/\/+$/, ""); // "project/herbalink"
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const url = new URL(req.url);
    const qpSlug = url.searchParams.get("slug");               // e.g. "/", "/project/herbalink" or "home"
    const SITE_URL = normalizeSiteUrl(Deno.env.get("SITE_URL"));
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON = Deno.env.get("SUPABASE_ANON_KEY");

    if (!SUPABASE_URL || !SUPABASE_ANON) {
      return json({ ok: false, error: "missing_supabase_env", details: { SUPABASE_URL: !!SUPABASE_URL, SUPABASE_ANON: !!SUPABASE_ANON } });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

    // Map path to slug used in seo_meta
    // "/" -> "home", "/projects" -> "projects", "/project/herbalink" -> "herbalink"
    const path = (qpSlug ?? "/").trim();
    const slugForDb = normalizeSlug(path.includes("/") ? path.split("/").pop() : path);

    // 1) Read SEO from DB (source of truth)
    const { data: row, error } = await supabase
      .from("seo_meta")
      .select("slug,path_type,title,description,canonical_url,og_image_url,updated_at")
      .eq("slug", slugForDb)
      .maybeSingle();

    if (error) {
      return json({ ok: false, error: "db_error", message: error.message, slug: slugForDb });
    }

    if (!row) {
      return json({ ok: false, error: "not_found_in_db", slug: slugForDb, tip: "Create a seo_meta row for this slug." });
    }

    // 2) Compute expected canonical if not set in DB
    const routePrefix = row.path_type === "project" ? "/project/" : row.path_type === "post" ? "/blog/" : "/";
    const expectedRoute = row.path_type === "page" ? `/${row.slug === "home" ? "" : row.slug}` : `${routePrefix}${row.slug}`;
    const expectedCanonical = row.canonical_url || (SITE_URL + expectedRoute);

    // 3) Non-fatal, best-effort live fetch (optional)
    let live: any = null;
    try {
      const target = new URL(expectedRoute, SITE_URL).toString();
      const r = await fetch(target, { redirect: "follow", headers: { "user-agent": "supabase-edge-seo-verify/1.0" } });
      const html = await r.text();
      const pick = (re: RegExp) => (html.match(re)?.[1] ?? "").trim();
      live = {
        target,
        status: r.status,
        title: pick(/<title>([\s\S]*?)<\/title>/i),
        description: pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i),
        canonical: pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i),
        ogImage: pick(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i),
      };
    } catch (_) {
      // Ignore network errors; report DB results only
      live = { note: "live_fetch_skipped_or_failed" };
    }

    // 4) Return a stable JSON (no HTTP errors)
    return json({
      ok: true,
      source: "db",
      path_input: path,
      slug: slugForDb,
      site_url: SITE_URL,
      expected: {
        title: row.title,
        description: row.description,
        canonical: expectedCanonical,
        og_image_url: row.og_image_url,
      },
      live, // optional diagnostics; not required to pass
      note: "Edge verifier uses DB; live fetch is best-effort and non-fatal. For HTML parity, use build-time runner."
    });
  } catch (e) {
    return json({ ok: false, error: "edge_exception", message: String(e) });
  }
});
