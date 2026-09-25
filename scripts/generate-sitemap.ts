// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
// Keeps the sitemap fresh on every deploy. Sources blog posts from src/data/blog if present,
// and project routes from src/App.tsx so additions/removals stay in sync.

import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { getBlogSEO, getProjectSEO } from "../src/data/seoData";

const BASE_URL = "https://barskydesign.pro";

interface Entry {
  path: string;
  // Only set from a real date (seoData.ts `modified` / `published`). Entries
  // without one omit <lastmod> entirely — see urlBlock.
  lastmod?: string;
  image?: { loc: string; title: string };
}

const staticEntries: Entry[] = [
  {
    path: "/",
    image: {
      loc: `${BASE_URL}/images/hiram-barsky-headshot.webp`,
      title: "Hiram Barsky — designer and developer",
    },
  },
  { path: "/services" },
  { path: "/design-services/ux-ui-design" },
  { path: "/design-services/mobile-app-design" },
  { path: "/design-services/web-development" },
  { path: "/about" },
  { path: "/contact" },
  { path: "/store" },
  { path: "/blog" },
  // Served by the /project/:projectId catch-all, so getProjectPaths() below can't
  // see them — but both are prerendered by inject-seo-html.ts and indexable, and
  // both were missing from the sitemap entirely.
  { path: "/project/dae-search" },
  // "/projects" is gone from here on purpose: it 301s to /#case-studies.
  // A sitemap must only list canonical 200s, and this one answered 200 with an
  // empty body at priority 0.9 — the strongest crawl signal on the site pointed
  // at nothing.
];

// Project routes — extracted from App.tsx <Route path="/project/..."> entries,
// excluding redirects and the dynamic :projectId catch-all. Checked per-line (not a
// fixed-width lookahead) so one route's <Navigate> can't false-positive-exclude an
// unrelated route sitting a line or two below it — this previously dropped
// /project/herbalink from the sitemap because /project/barskyjoint's Navigate fell
// inside the old 400-char window.
// A commented-out <Route> is not a route. Without this, the `{/* ... HIDDEN */}`
// line above /project/investor-loan-app's <Navigate> got scraped as a live route
// and prerendered — shipping the homepage body under a case-study title/canonical.
const COMMENTED = /^\s*(\{\/\*|\/\/|\/\*|\*)/;

function getProjectPaths(): string[] {
  const appPath = resolve("src/App.tsx");
  const src = existsSync(appPath) ? readFileSync(appPath, "utf8") : "";
  const found = new Set<string>();
  for (const line of src.split("\n")) {
    const m = /<Route\s+path="(\/(?:project|case-studies)\/[a-z0-9-]+)"/i.exec(line);
    if (m && !line.includes("Navigate") && !COMMENTED.test(line)) {
      found.add(m[1]);
    }
  }
  // smarterhealth/medication-app/gold2crypto have no matching entry in
  // structuredCaseStudies.ts, so the generic /project/:projectId catch-all
  // (SimplifiedProjectDetail) always hits its "no data" Navigate fallback —
  // soft 404s, kept out of the sitemap. business-management and splittime are
  // retired/hidden as of 2026-08-22: neither has a <Route> line any more, so
  // neither is picked up here, and netlify.toml 301s both to /projects.
  return Array.from(found).sort();
}

// Blog slugs — read from the real blog data file. The candidate list used to check
// nonexistent filenames (blogPosts.ts / blog/posts.ts / blog.ts — the real file is
// src/data/blogData.ts) and silently fall back to a stale hardcoded list, which
// included 2 slugs with no actual post behind them (ai-in-design,
// portfolio-red-flags-no-interviews) and generated real sitemap/SEO entries for
// pages that 404.
/**
 * slug -> ISO date, from the `date:` field next to each post in blogData.ts.
 *
 * BLOG_SEO_MAP carries only title and description, so `getBlogSEO(slug)?.published`
 * was always undefined and every one of the 52 URLs shipped without <lastmod> —
 * the one field Google actually uses for crawl scheduling. The dates were sitting
 * in blogData.ts the whole time as "June 10, 2026".
 */
function getBlogDates(): Record<string, string> {
  const p = resolve("src/data/blogData.ts");
  if (!existsSync(p)) return {};
  const txt = readFileSync(p, "utf8");
  const out: Record<string, string> = {};
  // Each post object carries slug and date; pair them per chunk rather than with
  // one greedy regex across the file.
  for (const chunk of txt.split(/\n  \{/)) {
    const slug = /slug:\s*["'`]([a-z0-9-]+)["'`]/i.exec(chunk)?.[1];
    const date = /\bdate:\s*["'`]([^"'`]+)["'`]/i.exec(chunk)?.[1];
    if (!slug || !date) continue;
    const t = Date.parse(date);
    if (Number.isNaN(t)) continue;
    out[slug] = new Date(t).toISOString().slice(0, 10);
  }
  return out;
}

function getBlogSlugs(): string[] {
  const p = resolve("src/data/blogData.ts");
  if (!existsSync(p)) return [];
  const txt = readFileSync(p, "utf8");
  const slugs = Array.from(txt.matchAll(/slug:\s*["'`]([a-z0-9-]+)["'`]/gi)).map((m) => m[1]);
  return Array.from(new Set(slugs)).sort();
}

const blogDates = getBlogDates();

const entries: Entry[] = [
  ...staticEntries,
  ...getProjectPaths().map<Entry>((path) => {
    const seo = getProjectSEO(path.replace("/project/", ""));
    return { path, lastmod: seo?.modified || seo?.published };
  }),
  ...getBlogSlugs().map<Entry>((slug) => ({
    path: `/blog/${slug}`,
    // A post's real dates, so lastmod carries a signal. Stamping every URL
    // with today's date is worse than omitting it: it claims 32 pages all
    // changed on the same day, every deploy, which trains crawlers to
    // ignore the field.
    lastmod:
      getBlogSEO(slug)?.modified || getBlogSEO(slug)?.published || blogDates[slug],
  })),
];

function urlBlock(e: Entry): string {
  const lines = [
    "  <url>",
    `    <loc>${BASE_URL}${e.path}</loc>`,
    // Omit rather than fall back to the build date. Until 2026-09-13 every
    // project and static URL — 22 of 45 — was stamped with "today" on each
    // deploy, which is the exact "all changed on the same day" pattern the
    // blog comment above warns about, and it contradicted the case studies'
    // own JSON-LD dateModified. Google treats a lastmod it catches lying as a
    // reason to ignore the field sitemap-wide, taking the blog's real dates
    // down with it. An absent lastmod is neutral; a false one is not.
    e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
    // <changefreq> and <priority> are gone. Google has ignored both since 2023;
    // all 52 URLs carried them while none carried the lastmod Google does read.
  ];
  if (e.image) {
    lines.push(
      "    <image:image>",
      `      <image:loc>${e.image.loc}</image:loc>`,
      `      <image:title>${e.image.title}</image:title>`,
      "    </image:image>",
    );
  }
  lines.push("  </url>");
  return lines.filter(Boolean).join("\n");
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ...entries.map(urlBlock),
  "</urlset>",
  "",
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);
