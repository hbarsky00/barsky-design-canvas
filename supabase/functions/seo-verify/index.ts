// supabase/functions/seo-verify/index.ts
// Edge function to verify live SEO tags against Supabase records and sitemaps
// Returns a single JSON object with verification results
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

type SeoRecord = {
  slug: string;
  path_type: "page" | "project" | "post";
  title: string;
  description: string;
  canonical_url?: string | null;
  og_image_url?: string | null;
  updated_at: string;
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SITE_URL = (Deno.env.get("SITE_URL") || "https://barskydesign.pro").replace(/\/$/, "");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function toPath(rec: SeoRecord): string {
  switch (rec.path_type) {
    case "page":
      return rec.slug === "home" ? "/" : `/${rec.slug}`;
    case "project":
      return `/project/${rec.slug}`;
    case "post":
      return `/blog/${rec.slug}`;
    default:
      return `/${rec.slug}`;
  }
}

function absUrl(path: string) {
  return `${SITE_URL}${path}`;
}

function extract(html: string) {
  const get = (regex: RegExp) => {
    const m = html.match(regex);
    return m ? (m[1] || m[0]) : null;
  };
  const getAll = (regex: RegExp) => Array.from(html.matchAll(regex)).map(m => m[0]);

  const title = get(/<title[^>]*>([\s\S]*?)<\/title>/i)?.trim() || null;
  const description = get(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i) || null;
  const canonical = get(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i) || null;

  const ogTitle = get(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i) || null;
  const ogDesc = get(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i) || null;
  const ogImage = get(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i) || null;
  const ogUrl = get(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["'][^>]*>/i) || null;

  const canonicalCount = getAll(/<link[^>]*rel=["']canonical["'][^>]*>/gi).length;

  return { title, description, canonical, ogTitle, ogDesc, ogImage, ogUrl, canonicalCount };
}

function normalizePath(p: string) {
  return p.replace(/\/$/, "");
}

async function fetchText(url: string): Promise<{ ok: boolean; status: number; text: string }>{
  try {
    const res = await fetch(url, { redirect: "follow" });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text };
  } catch {
    return { ok: false, status: 0, text: "" };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const issues: string[] = [];
  const routesFetched: string[] = [];
  const dbMismatches: Array<{ route: string; field: string; expected: string | null; actual: string | null }> = [];

  // 1) Load DB records
  const { data: records, error } = await supabase
    .from("seo_meta")
    .select("slug, path_type, title, description, canonical_url, og_image_url, updated_at")
    .order("updated_at", { ascending: false });
  if (error) {
    return new Response(JSON.stringify({ error: "db_error", details: String(error) }), { headers: { "content-type": "application/json" }, status: 500 });
  }
  const recs = (records || []) as SeoRecord[];

  // Build unique route list from DB
  const paths = Array.from(new Set(recs.map(toPath)));
  if (!paths.includes("/")) paths.unshift("/");

  let seoTagsVerified = true;
  let canonicalOk = true;
  let ogImagesOk = true;
  let dbHtmlMatch = true;

  // 2) Verify each route
  for (const path of paths) {
    const url = absUrl(path);
    const { ok, status, text } = await fetchText(url);
    if (!ok) {
      issues.push(`Fetch failed ${status} for ${url}`);
      seoTagsVerified = false;
      continue;
    }
    routesFetched.push(path);
    const m = extract(text);

    // Basic SEO presence
    if (!m.title || !m.description || !m.canonical) {
      seoTagsVerified = false;
      issues.push(`Missing essential tags on ${path}`);
    }

    // Canonical validations
    if (m.canonicalCount !== 1) {
      canonicalOk = false;
      issues.push(`Canonical count ${m.canonicalCount} on ${path}`);
    }
    if (m.canonical) {
      const expectedCanon = `${SITE_URL}${normalizePath(path) || "/"}`.replace(/\/$/, "");
      const actualCanon = normalizePath(m.canonical);
      if (!actualCanon.startsWith(SITE_URL)) {
        canonicalOk = false;
        issues.push(`Canonical not absolute on ${path}: ${actualCanon}`);
      }
      if (normalizePath(actualCanon) !== expectedCanon) {
        canonicalOk = false;
        issues.push(`Canonical mismatch on ${path}: ${actualCanon} !== ${expectedCanon}`);
      }
    }

    // OG image validation
    if (m.ogImage && !/^https?:\/\//i.test(m.ogImage)) {
      ogImagesOk = false;
      issues.push(`OG image not absolute on ${path}: ${m.ogImage}`);
    }

    // DB consistency when available
    const match = recs.find((r) => toPath(r) === path);
    if (match) {
      const expectedTitle = match.title?.trim() || null;
      const expectedDesc = match.description?.trim() || null;
      const expectedCanon = match.canonical_url ? normalizePath(match.canonical_url) : `${SITE_URL}${normalizePath(path)}`;
      const expectedOg = match.og_image_url || null;

      const cmp: Array<[string, string | null, string | null]> = [
        ["title", expectedTitle, m.title],
        ["description", expectedDesc, m.description],
        ["canonical", expectedCanon, m.canonical ? normalizePath(m.canonical) : null],
        ["og_image_url", expectedOg, m.ogImage],
      ];
      for (const [field, exp, act] of cmp) {
        if ((exp || "") !== (act || "")) {
          dbHtmlMatch = false;
          dbMismatches.push({ route: path, field, expected: exp, actual: act });
        }
      }
    }
  }

  // 3) Check sitemap.xml and robots.txt
  const siteMapRes = await fetchText(absUrl("/sitemap.xml"));
  const sitemapFound = siteMapRes.ok && /<urlset[\s\S]*<\/urlset>/i.test(siteMapRes.text);
  const sitemapUrls = sitemapFound ? Array.from(siteMapRes.text.matchAll(/<loc>([^<]+)<\/loc>/gi)).map(m => m[1]) : [];

  const robotsRes = await fetchText(absUrl("/robots.txt"));
  const robotsTxtValid = robotsRes.ok && /User-agent:/i.test(robotsRes.text);

  const sitemapMissing: string[] = [];
  for (const p of paths) {
    const full = absUrl(p);
    if (!sitemapUrls.includes(full)) {
      sitemapMissing.push(full);
    }
  }

  const json = {
    static_routes_verified: routesFetched,
    seo_tags_verified: seoTagsVerified,
    canonical_ok: canonicalOk,
    sitemap_found: sitemapFound,
    robots_txt_valid: robotsTxtValid,
    og_images_ok: ogImagesOk,
    db_html_match: dbHtmlMatch,
    db_mismatches: dbMismatches,
    issues,
    sitemap_urls_missing_in_dist: sitemapMissing,
  };

  return new Response(JSON.stringify(json), {
    headers: { 
      "content-type": "application/json",
      ...corsHeaders 
    },
  });
});
