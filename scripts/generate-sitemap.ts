// Runs as part of `npm run build` (and predev); writes public/sitemap.xml.
// Route inventory comes from scripts/seo-routes.ts — the shared source of
// truth with prerender-seo.ts — so the sitemap and the prerendered HTML can
// never disagree about which URLs exist.

import { writeFileSync } from "fs";
import { resolve } from "path";
import {
  BASE_URL,
  STATIC_PATHS,
  FEATURED_PROJECTS,
  FEATURED_CASE_STUDIES,
  getBlogEntries,
  getProductIds,
} from "./seo-routes";

const today = new Date().toISOString().slice(0, 10);

interface Entry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
  image?: { loc: string; title: string };
}

const staticEntries: Entry[] = STATIC_PATHS.map((path) => {
  if (path === "/") {
    return {
      path,
      changefreq: "weekly",
      priority: "1.0",
      image: {
        loc: `${BASE_URL}/images/hiram-barsky-headshot.jpg`,
        title: "Hiram Barsky - Lead Product Designer",
      },
    };
  }
  return {
    path,
    changefreq: path === "/blog" || path === "/store" ? "weekly" : "monthly",
    priority: "0.8",
  };
});

const entries: Entry[] = [
  ...staticEntries,
  ...[...FEATURED_PROJECTS].sort().map<Entry>((id) => ({
    path: `/project/${id}`,
    changefreq: "monthly",
    priority: "0.7",
  })),
  ...[...FEATURED_CASE_STUDIES].sort().map<Entry>((id) => ({
    path: `/case-studies/${id}`,
    changefreq: "monthly",
    priority: "0.7",
  })),
  ...getProductIds().map<Entry>((id) => ({
    path: `/store/product/${id}`,
    changefreq: "monthly",
    priority: "0.6",
  })),
  ...getBlogEntries().map<Entry>(({ slug }) => ({
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
