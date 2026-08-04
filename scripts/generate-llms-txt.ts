// Runs as part of `npm run build` (and predev); writes public/llms.txt.
// Route inventory comes from scripts/seo-routes.ts — the same source of
// truth as sitemap.xml — so llms.txt can't drift into listing dead case
// studies or missing new ones the way the old hand-maintained file did.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { BASE_URL, STATIC_PATHS, FEATURED_PROJECTS, FEATURED_CASE_STUDIES, getBlogEntries } from "./seo-routes";
import { PROJECT_SEO_MAP, STATIC_PAGE_SEO } from "../src/data/seoData";

const pageLine = (path: string, label: string) => {
  const desc = STATIC_PAGE_SEO[path]?.description || "";
  return `- [${label}](${BASE_URL}${path}): ${desc}`;
};

const lines: string[] = [
  "# Barsky Design",
  "",
  "> Portfolio of Hiram Barsky — Lead Product & AI Designer based in Clifton, NJ. " +
    "Ships design work as working software: React front ends, Supabase back ends, solo end-to-end builds.",
  "",
  "## Pages",
  "",
  pageLine("/", "Home"),
  pageLine("/about", "About"),
  pageLine("/services", "Services"),
  pageLine("/case-studies", "Case Studies"),
  pageLine("/store", "Store"),
  pageLine("/blog", "Blog"),
  pageLine("/contact", "Contact"),
  "",
  "## Case studies",
  "",
  ...FEATURED_CASE_STUDIES.map((id) => {
    const seo = PROJECT_SEO_MAP[id];
    return `- [${seo?.title || id}](${BASE_URL}/case-studies/${id}): ${seo?.description || ""}`;
  }),
  "",
  "## Live products",
  "",
  ...FEATURED_PROJECTS.filter((id) => PROJECT_SEO_MAP[id]).map((id) => {
    const seo = PROJECT_SEO_MAP[id];
    return `- [${seo.title.replace(/Case Study/i, "Product Overview")}](${BASE_URL}/project/${id}): ${seo.description}`;
  }),
  "",
  "## Blog",
  "",
  ...getBlogEntries().map(({ slug, title, excerpt }) => `- [${title}](${BASE_URL}/blog/${slug}): ${excerpt}`),
  "",
];

writeFileSync(resolve("public/llms.txt"), lines.join("\n"));
console.log(`llms.txt written (${FEATURED_CASE_STUDIES.length} case studies, ${getBlogEntries().length} blog posts)`);
