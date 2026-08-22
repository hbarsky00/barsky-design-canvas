// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
// Keeps the sitemap fresh on every deploy. Sources blog posts from src/data/blog if present,
// and project routes from src/App.tsx so additions/removals stay in sync.

import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { getBlogSEO } from "../src/data/seoData";

const BASE_URL = "https://barskydesign.pro";
const today = new Date().toISOString().slice(0, 10);

interface Entry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
  image?: { loc: string; title: string };
}

const staticEntries: Entry[] = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
    image: {
      loc: `${BASE_URL}/images/hiram-barsky-headshot.jpg`,
      title: "Hiram Barsky - Lead Product Designer",
    },
  },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/design-services/ux-ui-design", changefreq: "monthly", priority: "0.8" },
  { path: "/design-services/mobile-app-design", changefreq: "monthly", priority: "0.8" },
  { path: "/design-services/web-development", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/store", changefreq: "weekly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
];

// Project routes — extracted from App.tsx <Route path="/project/..."> entries,
// excluding redirects and the dynamic :projectId catch-all. Checked per-line (not a
// fixed-width lookahead) so one route's <Navigate> can't false-positive-exclude an
// unrelated route sitting a line or two below it — this previously dropped
// /project/herbalink from the sitemap because /project/barskyjoint's Navigate fell
// inside the old 400-char window.
function getProjectPaths(): string[] {
  const appPath = resolve("src/App.tsx");
  const src = existsSync(appPath) ? readFileSync(appPath, "utf8") : "";
  const found = new Set<string>();
  for (const line of src.split("\n")) {
    const m = /<Route\s+path="(\/project\/[a-z0-9-]+)"/i.exec(line);
    if (m && !line.includes("Navigate")) {
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
function getBlogSlugs(): string[] {
  const p = resolve("src/data/blogData.ts");
  if (!existsSync(p)) return [];
  const txt = readFileSync(p, "utf8");
  const slugs = Array.from(txt.matchAll(/slug:\s*["'`]([a-z0-9-]+)["'`]/gi)).map((m) => m[1]);
  return Array.from(new Set(slugs)).sort();
}

const entries: Entry[] = [
  ...staticEntries,
  ...getProjectPaths().map<Entry>((path) => ({
    path,
    changefreq: "monthly",
    priority: "0.7",
  })),
  ...getBlogSlugs().map<Entry>((slug) => ({
    path: `/blog/${slug}`,
    changefreq: "monthly",
    priority: "0.6",
    // A post's real dates, so lastmod carries a signal. Stamping every URL
    // with today's date is worse than omitting it: it claims 32 pages all
    // changed on the same day, every deploy, which trains crawlers to
    // ignore the field.
    lastmod: getBlogSEO(slug)?.modified || getBlogSEO(slug)?.published,
  })),
];

function urlBlock(e: Entry): string {
  const lines = [
    "  <url>",
    `    <loc>${BASE_URL}${e.path}</loc>`,
    `    <lastmod>${e.lastmod || today}</lastmod>`,
    e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
    e.priority ? `    <priority>${e.priority}</priority>` : null,
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
