// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
// Single source of truth for the sitemap. Reads blog slugs from src/data/blogData.ts and
// product IDs from src/data/productsData.ts so additions/removals stay in sync automatically.

import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";

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
  { path: "/design-services/ux-ui-design", changefreq: "monthly", priority: "0.8" },
  { path: "/design-services/mobile-app-design", changefreq: "monthly", priority: "0.8" },
  { path: "/design-services/web-development", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/store", changefreq: "weekly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/case-studies", changefreq: "monthly", priority: "0.8" },
];

// Featured projects — the only project URLs surfaced on the homepage and
// the only ones we want indexed by search engines. Other project routes
// still work for direct visits but are not advertised in the sitemap.
const FEATURED_PROJECTS = [
  "/project/catchbuddy",
  "/project/herbalink",
  "/project/valora-bet",
  "/project/nudgeme",
  "/project/ring-rival",
  "/project/fire-lion",
  "/project/roi-design-builder",
  "/project/business-management",
  "/project/investor-loan-app",
  "/project/email-creation-ai",
];

const FEATURED_CASE_STUDIES = [
  "/case-studies/dae-search",
  "/case-studies/fire-lion",
  "/case-studies/herbalink",
  "/case-studies/nudgeme",
  "/case-studies/roi-design-builder",
  "/case-studies/valora-bet",
];

// Blog slugs — read from src/data/blogData.ts (current source of truth).
function getBlogSlugs(): string[] {
  const candidates = [
    "src/data/blogData.ts",
    "src/data/blogPosts.ts",
    "src/data/blog/posts.ts",
    "src/data/blog.ts",
  ];
  for (const c of candidates) {
    const p = resolve(c);
    if (!existsSync(p)) continue;
    const txt = readFileSync(p, "utf8");
    const slugs = Array.from(txt.matchAll(/slug:\s*["'`]([a-z0-9-]+)["'`]/gi)).map(
      (m) => m[1],
    );
    if (slugs.length) return Array.from(new Set(slugs)).sort();
  }
  return [];
}

// Product IDs — read from src/data/productsData.ts.
function getProductIds(): string[] {
  const p = resolve("src/data/productsData.ts");
  if (!existsSync(p)) return [];
  const txt = readFileSync(p, "utf8");
  const ids = Array.from(txt.matchAll(/^\s*id:\s*["'`]([a-z0-9-]+)["'`]/gim)).map(
    (m) => m[1],
  );
  return Array.from(new Set(ids)).sort();
}

const entries: Entry[] = [
  ...staticEntries,
  ...FEATURED_PROJECTS.sort().map<Entry>((path) => ({
    path,
    changefreq: "monthly",
    priority: "0.7",
  })),
  ...FEATURED_CASE_STUDIES.sort().map<Entry>((path) => ({
    path,
    changefreq: "monthly",
    priority: "0.7",
  })),
  ...getProductIds().map<Entry>((id) => ({
    path: `/store/product/${id}`,
    changefreq: "monthly",
    priority: "0.6",
  })),
  ...getBlogSlugs().map<Entry>((slug) => ({
    path: `/blog/${slug}`,
    changefreq: "monthly",
    priority: "0.6",
  })),
];

function urlBlock(e: Entry): string {
  const lines = [
    "  <url>",
    `    <loc>${BASE_URL}${e.path}</loc>`,
    `    <lastmod>${today}</lastmod>`,
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
