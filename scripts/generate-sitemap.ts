// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
// Keeps the sitemap fresh on every deploy. Sources blog posts from src/data/blog if present,
// and project routes from src/App.tsx so additions/removals stay in sync.

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
// excluding redirects and the dynamic :projectId catch-all.
function getProjectPaths(): string[] {
  const appPath = resolve("src/App.tsx");
  const src = existsSync(appPath) ? readFileSync(appPath, "utf8") : "";
  const re = /<Route\s+path="(\/project\/[a-z0-9-]+)"/gi;
  const found = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    if (!src.slice(m.index, m.index + 400).includes("Navigate")) {
      found.add(m[1]);
    }
  }
  // Known additional projects rendered via <Route path="/project/:projectId" />.
  [
    "/project/splittime",
    "/project/crypto",
    "/project/smarterhealth",
    "/project/medication-app",
    "/project/gold2crypto",
    "/project/dae-search",
    "/project/business-management",
    "/project/barskyjoint",
    "/project/investor-loan-app",
    "/project/wholesale-distribution",
    "/project/fire-lion",
    "/project/ring-rival",
    "/project/catchbuddy",
  ].forEach((p) => found.add(p));
  return Array.from(found).sort();
}

// Blog slugs — read from src/data/blog if available, else fall back to known list.
function getBlogSlugs(): string[] {
  const candidates = [
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
  return [
    "finding-first-ux-job-guide",
    "design-systems-that-get-used",
    "portfolio-red-flags-no-interviews",
    "ai-enhanced-ux-designer-future",
    "user-research-shoestring-budget",
    "built-product-without-real-data",
    "building-products-nobody-asked-for",
    "wireframes-to-wow-visual-hierarchy",
    "case-study-writing",
    "ai-in-design",
    "beautiful-interface-doesnt-convert",
    "research-without-users",
  ];
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
