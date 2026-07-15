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
  "/services",
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
  /** Basename (no extension) of the post's cover image source file, e.g.
   * "ai-claude-starter-cover" for @/assets/blog/ai-claude-starter-cover.jpg.
   * prerender-seo.ts resolves it to the hashed file in dist/assets. */
  coverBasename: string | null;
}

// Blog posts — parsed from src/data/blogData.ts (the source of truth for what
// /blog/:slug actually renders) rather than a hand-maintained map that drifts.
// Regex-based because blogData.ts imports image assets that can't be loaded
// outside Vite. Relies on each post object listing title, excerpt, and
// coverImage before slug.
export function getBlogEntries(): BlogEntry[] {
  const p = resolve("src/data/blogData.ts");
  if (!existsSync(p)) return [];
  const txt = readFileSync(p, "utf8");

  // Map cover-image variable names to their source file basenames.
  const importBasenames: Record<string, string> = {};
  for (const im of txt.matchAll(/import\s+(\w+)\s+from\s+["'][^"']*\/([\w.-]+)\.(?:jpg|jpeg|png|webp)["']/g)) {
    importBasenames[im[1]] = im[2];
  }

  const entries: BlogEntry[] = [];
  const slugRe = /slug:\s*["'`]([a-z0-9-]+)["'`]/gi;
  let m: RegExpExecArray | null;
  while ((m = slugRe.exec(txt))) {
    const before = txt.slice(0, m.index);
    const title = lastMatch(before, /title:\s*"((?:[^"\\]|\\.)*)"/g);
    const excerpt = lastMatch(before, /excerpt:\s*"((?:[^"\\]|\\.)*)"/g);
    const coverVar = lastMatch(before, /coverImage:\s*(\w+)/g);
    if (title && excerpt) {
      entries.push({
        slug: m[1],
        title,
        excerpt,
        coverBasename: coverVar ? importBasenames[coverVar] ?? null : null,
      });
    }
  }
  // De-dupe on slug, keep first occurrence
  const seen = new Set<string>();
  return entries.filter((e) => !seen.has(e.slug) && seen.add(e.slug));
}

export interface ProductEntry {
  id: string;
  name: string;
  description: string;
  image: string | null;
}

// Store products with per-product name/description/image, parsed from
// src/data/productsData.ts. Splitting on id: keeps each product's fields
// scoped to its own object (category entries without description/image are
// skipped).
export function getProductEntries(): ProductEntry[] {
  const p = resolve("src/data/productsData.ts");
  if (!existsSync(p)) return [];
  const txt = readFileSync(p, "utf8");

  const entries: ProductEntry[] = [];
  const segments = txt.split(/\bid:\s*["'`]/).slice(1);
  for (const seg of segments) {
    const id = seg.match(/^([a-z0-9-]+)["'`]/)?.[1];
    const name = seg.match(/name:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const description = seg.match(/description:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const image = seg.match(/image:\s*"([^"]+)"/)?.[1] ?? null;
    if (id && name && description && !entries.some((e) => e.id === id)) {
      entries.push({ id, name, description, image });
    }
  }
  return entries;
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
