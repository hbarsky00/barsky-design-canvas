// Single source of truth for every indexable route on the site.
// Used by generate-sitemap.ts (sitemap.xml) and prerender-seo.ts (per-route
// static HTML). If a URL is listed here it must be a real route in App.tsx,
// must not be blocked by robots.txt, and must not be redirected in netlify.toml.

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

export const BASE_URL = "https://barskydesign.pro";

// Static pages that have explicit routes in App.tsx.
export const STATIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/store",
  "/blog",
  "/case-studies",
  "/design-services/ux-ui-design",
  "/design-services/mobile-app-design",
  "/design-services/web-development",
];

// Featured projects — the only /project/* URLs we want indexed. Other project
// routes still resolve for direct visits but are not in the sitemap and get no
// prerendered file (so crawlers see them drop out of the index).
export const FEATURED_PROJECTS = [
  "catchbuddy",
  "herbalink",
  "valora-bet",
  "nudgeme",
  "ring-rival",
  "fire-lion",
  "roi-design-builder",
  "business-management",
  "investor-loan-app",
  "email-creation-ai",
];

// Case-study pages with explicit routes in App.tsx.
export const FEATURED_CASE_STUDIES = [
  "dae-search",
  "fire-lion",
  "herbalink",
  "nudgeme",
  "roi-design-builder",
  "valora-bet",
  "catchbuddy",
  "ring-rival",
];

export interface BlogEntry {
  slug: string;
  title: string;
  excerpt: string;
}

// Blog posts — parsed from src/data/blogData.ts (the source of truth for what
// /blog/:slug actually renders) rather than a hand-maintained map that drifts.
// Regex-based because blogData.ts imports image assets that can't be loaded
// outside Vite. Relies on each post object listing title and excerpt before slug.
export function getBlogEntries(): BlogEntry[] {
  const p = resolve("src/data/blogData.ts");
  if (!existsSync(p)) return [];
  const txt = readFileSync(p, "utf8");

  const entries: BlogEntry[] = [];
  const slugRe = /slug:\s*["'`]([a-z0-9-]+)["'`]/gi;
  let m: RegExpExecArray | null;
  while ((m = slugRe.exec(txt))) {
    const before = txt.slice(0, m.index);
    const title = lastMatch(before, /title:\s*"((?:[^"\\]|\\.)*)"/g);
    const excerpt = lastMatch(before, /excerpt:\s*"((?:[^"\\]|\\.)*)"/g);
    if (title && excerpt) {
      entries.push({ slug: m[1], title, excerpt });
    }
  }
  // De-dupe on slug, keep first occurrence
  const seen = new Set<string>();
  return entries.filter((e) => !seen.has(e.slug) && seen.add(e.slug));
}

function lastMatch(txt: string, re: RegExp): string | null {
  let out: string | null = null;
  let m: RegExpExecArray | null;
  while ((m = re.exec(txt))) out = m[1];
  return out;
}

// Product IDs — read from src/data/productsData.ts.
export function getProductIds(): string[] {
  const p = resolve("src/data/productsData.ts");
  if (!existsSync(p)) return [];
  const txt = readFileSync(p, "utf8");
  const ids = Array.from(txt.matchAll(/^\s*id:\s*["'`]([a-z0-9-]+)["'`]/gim)).map(
    (m) => m[1],
  );
  return Array.from(new Set(ids)).sort();
}
