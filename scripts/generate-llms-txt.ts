// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/llms.txt.
//
// Why this is generated rather than hand-written: llms.txt is the file answer
// engines read to find out what exists on this site, and the hand-maintained
// version had drifted badly — on 2026-08-27 it listed 6 of 22 blog posts, so
// 16 posts were invisible to any agent that trusted it. A file that must be
// updated by hand after every post will go stale again; this one is rebuilt
// from the same sources as the sitemap on every build, so it cannot.
//
// Sources of truth, deliberately identical to scripts/generate-sitemap.ts:
//   - case-study routes  -> src/App.tsx <Route path="/project/..."> lines
//   - blog slugs         -> src/data/blogData.ts
//   - titles/descriptions-> src/data/seoData.ts (BLOG_SEO_MAP, PROJECT_SEO_MAP)
//
// NOTE on case studies: PROJECT_SEO_MAP carries 14 entries but only 10 are real
// routes. splittime, gold2crypto, medication-app and smarterhealth have no
// <Route> line — they fall through to the /project/:projectId catch-all and its
// "no data" Navigate, i.e. soft 404s. Reading route paths from App.tsx (not
// PROJECT_SEO_MAP keys) is what keeps retired work from being advertised to
// answer engines.

import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { BLOG_SEO_MAP, PROJECT_SEO_MAP } from "../src/data/seoData";
import { blogPosts } from "../src/data/blogData";

// The positioning line and the page list are curated on purpose. Positioning is
// settled ("I design and develop SaaS, web apps, mobile apps and internal
// tools") and must not be regenerated or paraphrased by a script.
const PREAMBLE = `# Barsky Design

> Hiram Barsky designs and develops SaaS, web apps, mobile apps and internal tools — one person, from product design through React front end, database and launch. 15+ years across fintech, healthcare and pharma. Remote, working with teams anywhere.

## Pages

- [Home](/): Overview, hero, featured case studies, services and contact.
- [About](/about): Background and 15+ years designing and developing software in regulated industries.
- [Services](/services): What he designs and develops — SaaS, web apps, mobile apps, internal tools.
- [Design Services — UX/UI](/design-services/ux-ui-design): UX research, interaction design, and UI systems.
- [Design Services — Mobile App Design](/design-services/mobile-app-design): iOS and Android app design, plus the build to go with it.
- [Design Services — Web Development](/design-services/web-development): React and TypeScript web apps, designed and built by the same person.
- [Store](/store): Downloadable design templates and resources.
- [Blog](/blog): Articles on UX, design systems, AI, and career growth.
- [Contact](/contact): Project inquiries and consultation requests.`;

// Hand-written one-liners kept from the previous llms.txt — they read better
// than the SEO meta descriptions, which are written for SERP snippets. Any
// route without an entry here falls back to its PROJECT_SEO_MAP description, so
// a newly added case study still shows up with real text and never goes missing.
const CASE_STUDY_BLURBS: Record<string, string> = {
  herbalink: "Verified-herbalist booking platform — the credential gate is the product.",
  "dae-search": "Enterprise data discovery and search, redesigned around trust in the result, not just relevance.",
  catchbuddy: "Same-day pickup sports, designed for trust and safety.",
  recast: "Record once, send a link — native Mac and Android capture with a web library, built solo.",
  "ring-rival": "AI-assisted boxing game with distinct AI opponents and generated trash talk.",
  "fire-lion": "Multi-mode AI-scaffolded game, shipped with ruthless scope discipline.",
  "email-creation-ai": "AI-assisted pharma email workflow across a 6-step regulated process.",
  crypto: "Fintech UX serving beginner and pro traders from one shared platform.",
  "investor-loan-app": "Fintech loan origination platform replacing Excel as the system of record.",
  stips: "Play-money prediction markets where the price reads as a probability — designed and built solo.",
};

// Display titles for case studies. PROJECT_SEO_MAP titles are full SEO titles
// ("HerbaLink — ... | Hiram Barsky"), too long for a link list, so the short
// names are kept here and fall back to the route id when a new one appears.
const CASE_STUDY_NAMES: Record<string, string> = {
  herbalink: "HerbaLink",
  "dae-search": "DAE Search",
  catchbuddy: "CatchBuddy",
  recast: "Recast",
  "ring-rival": "Ring-Rival",
  "fire-lion": "Fire Lion",
  "email-creation-ai": "ManuscriptRx",
  crypto: "Crypto Trading Platform",
  "investor-loan-app": "Investor Loan Platform",
  stips: "Stips",
};

// Same per-line check as generate-sitemap.ts: a <Navigate> on one route's line
// must not exclude an unrelated route a line or two below it.
function getProjectIds(): string[] {
  const appPath = resolve("src/App.tsx");
  const src = existsSync(appPath) ? readFileSync(appPath, "utf8") : "";
  const found = new Set<string>();
  for (const line of src.split("\n")) {
    const m = /<Route\s+path="\/project\/([a-z0-9-]+)"/i.exec(line);
    if (m && !line.includes("Navigate")) found.add(m[1]);
  }
  return Array.from(found);
}

function getBlogSlugs(): string[] {
  const p = resolve("src/data/blogData.ts");
  if (!existsSync(p)) return [];
  const txt = readFileSync(p, "utf8");
  return Array.from(
    new Set(
      Array.from(txt.matchAll(/slug:\s*["'`]([a-z0-9-]+)["'`]/gi)).map((m) => m[1]),
    ),
  );
}

function titleCaseFromId(id: string): string {
  return id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const projectIds = getProjectIds();
const caseStudyLines = projectIds
  .map((id) => {
    const name = CASE_STUDY_NAMES[id] || titleCaseFromId(id);
    const blurb = CASE_STUDY_BLURBS[id] || PROJECT_SEO_MAP[id]?.description || "";
    return `- [${name}](/project/${id})${blurb ? `: ${blurb}` : ""}`;
  })
  .sort();

// Newest first — the publication date is the most useful ordering signal for an
// agent deciding which post answers a question about current practice.
const blogSlugs = getBlogSlugs()
  .filter((slug) => BLOG_SEO_MAP[slug])
  .sort((a, b) => {
    const da = BLOG_SEO_MAP[a].published || "";
    const db = BLOG_SEO_MAP[b].published || "";
    return db.localeCompare(da);
  });

// Prefer the post's excerpt over its meta description. BLOG_SEO_MAP
// descriptions are written for SERP snippets and capped at 155 chars — 8 of 22
// end mid-sentence on an ellipsis. That is fine in a search result, where the
// page is one click away, and bad here: an answer engine quoting llms.txt would
// cite a fragment. Excerpts in blogData are complete sentences.
const excerptBySlug = new Map(blogPosts.map((p) => [p.slug, p.excerpt]));

const blogLines = blogSlugs.map((slug) => {
  const { title, description } = BLOG_SEO_MAP[slug];
  const excerpt = excerptBySlug.get(slug);
  const blurb = (excerpt || description || "").trim();
  return `- [${title}](/blog/${slug})${blurb ? `: ${blurb}` : ""}`;
});

const skipped = getBlogSlugs().filter((s) => !BLOG_SEO_MAP[s]);
if (skipped.length) {
  console.warn(
    `llms.txt: ${skipped.length} blog slug(s) have no BLOG_SEO_MAP entry and were omitted: ${skipped.join(", ")}`,
  );
}

const out = [
  PREAMBLE,
  "",
  "## Case studies",
  "",
  ...caseStudyLines,
  "",
  "## Blog",
  "",
  ...blogLines,
  "",
].join("\n");

writeFileSync(resolve("public/llms.txt"), out);
console.log(
  `llms.txt written (${caseStudyLines.length} case studies, ${blogLines.length} blog posts)`,
);
