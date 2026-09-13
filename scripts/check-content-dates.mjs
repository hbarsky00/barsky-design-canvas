// Reports where git is newer than the hand-maintained `modified` dates in
// src/data/seoData.ts. Those dates feed Article/BlogPosting.dateModified and
// the sitemap's <lastmod>, and they drift: on 2026-09-13 all thirteen case
// studies still declared 2026-08-29 after being rewritten on 09-12.
//
// Read-only. It cannot tell a copy rewrite from a class tweak on its own, so a
// flagged route means "look at the commit", not "bump the date". Commits that
// touched markup but no visible copy go in STYLE_ONLY once judged.
//   node scripts/check-content-dates.mjs
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const STYLE_ONLY = new Set([
  "c3937c91", // 2026-09-07 photo-credit span: opacity-70 → text-xs, on 12 posts
]);

const seo = readFileSync("src/data/seoData.ts", "utf8");
const app = readFileSync("src/App.tsx", "utf8");

const git = (args) =>
  execSync(`git log --no-patch --format='%h %cs' ${args}`, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
    .split("\n")
    .map((l) => l.trim().split(" "))
    .find(([hash]) => hash && !STYLE_ONLY.has(hash))?.[1] ?? "(none)";

const declared = (map, key) => {
  const block = seo.slice(seo.indexOf(`export const ${map}`));
  const m = new RegExp(`"${key}": \\{[^}]*?modified: "(\\d{4}-\\d\\d-\\d\\d)`).exec(block);
  return m?.[1] ?? "(none)";
};

const rows = [];

// Case studies: <Route path="/project/x" element={<Comp />} /> → its import file.
for (const line of app.split("\n")) {
  const m = /<Route\s+path="\/project\/([a-z0-9-]+)"\s+element=\{<(\w+)/.exec(line);
  if (!m || line.includes("Navigate")) continue;
  const file = new RegExp(`${m[2]} = React\\.lazy\\(\\(\\) => import\\("@/(.+?)"\\)`).exec(app)?.[1];
  if (!file) continue;
  rows.push([`/project/${m[1]}`, declared("PROJECT_SEO_MAP", m[1]), git(`-- src/${file}.tsx`)]);
}

// Blog posts: one file, so ask git about each post's block.
const blog = readFileSync("src/data/blogData.ts", "utf8");
for (const slug of new Set([...blog.matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]))) {
  rows.push([`/blog/${slug}`, declared("BLOG_SEO_MAP", slug), git(`-L'/slug: "${slug}"/,/^  },\\?$/:src/data/blogData.ts'`)]);
}

let stale = 0;
for (const [route, dec, gitDate] of rows) {
  const flag = gitDate > dec ? "STALE" : "";
  if (flag) stale++;
  console.log(`${route.padEnd(52)} declared ${dec.padEnd(10)} git ${gitDate}  ${flag}`);
}
console.log(`\n${rows.length} routes, ${stale} where git is newer than declared`);
