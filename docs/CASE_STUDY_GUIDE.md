# Case Study / Project Page Guide

How project pages are wired so you can swap or replace a case study without pain.

---

## TL;DR — to add or replace a case study

1. Open `src/data/structuredCaseStudies.ts`.
2. Copy an existing entry in the `structuredCaseStudies` object (e.g. `crypto`) and rename the key + `id` to your new slug (e.g. `myproject`).
3. Fill in only the sections you want — every section is optional except `id`, `title`, `description`, `tags`.
4. Route is automatic via the dynamic `/project/:slug` route. If you want a custom route or static SEO, add an entry to `src/data/seoData.ts`.
5. **Add to the homepage "Featured Case Studies" grid** — edit the hardcoded `featuredCaseStudies` array in `src/components/home/FeaturedCaseStudiesSection.tsx`. This is the ONLY place the homepage cards come from. Editing `caseStudies.ts` or `structuredCaseStudies.ts` alone will NOT make it appear on the homepage.
6. (Optional) Also add to `src/data/caseStudies.ts` (`homepageCaseStudyPreviews`) and `src/data/structuredCaseStudies.ts` if the project needs a `/project/:slug` detail page.
7. To remove a case study: delete its entry from `FeaturedCaseStudiesSection.tsx`, remove from `structuredCaseStudies`, and (if it had a custom route) delete the `<Route>` line in `src/App.tsx`.

That's it. No layout, no React component, no SEO file edits required for the standard flow.

---

## Architecture at a glance

```text
src/data/structuredCaseStudies.ts        ← ALL content lives here (data-driven)
        │
        ▼
src/components/case-study/structured/
  StructuredCaseStudyLayout.tsx          ← Renders the whole page from data
  StructuredCaseStudyHero.tsx            ← Hero (title, tags, metrics, video/image)
  StructuredCaseStudyOverview.tsx        ← Project context + tech stack
  StructuredCaseStudySection.tsx         ← Generic section renderer
        │
        ▼
src/pages/Structured*CaseStudy.tsx       ← One-line wrapper per project (thin)
        │
        ▼
src/App.tsx                              ← Routes
```

Most case studies use the dynamic route `/project/:slug` and never need a custom page file. Only a handful (herbalink, business-management, barskyjoint) have explicit `<Route>` entries with their own one-line page components.

---

## The data file: `src/data/structuredCaseStudies.ts`

This is the single source of truth. The exported object `structuredCaseStudies: Record<string, StructuredCaseStudyData>` keys by slug (e.g. `"crypto"`, `"smarterhealth"`).

### Required top-level fields

| Field | Type | Purpose |
|---|---|---|
| `id` | `string` | Must match the object key and the URL slug |
| `title` | `string` | H1 + browser title |
| `description` | `string` | Meta description + hero subhead |
| `tags` | `string[]` | Pills shown at the bottom of the hero (mobile) / top (desktop) |

### Optional top-level fields

| Field | Purpose |
|---|---|
| `techStack` | `{ aiTools, devStack, designTools }` — Gen-AI badge pills |
| `heroVideo` | `{ src, poster, alt }` — auto-playing background video |
| `heroImage` | `{ src, alt }` — used when no video, or when `heroAsImage={true}` |
| `heroMetrics` | Array of `{ value, label }` — 3 stat cards under hero |
| `gradientClasses` | Tailwind gradient for hero background, e.g. `"from-blue-50 via-cyan-50 to-teal-50"` |
| `projectContext` | `{ timeline, team, budget, companySize, industry }` |
| `clientTestimonial` | `{ quote, author, title, company, avatar? }` |
| `projectLink` | External "View Live Project" URL |
| `seoData` | `{ image, projectName, results, technologies, path }` — overrides default SEO |

### Optional content sections (each renders if present, skipped if omitted)

Order on the page is fixed by the layout component. You don't control order from data — only whether each section appears.

1. **`researchSection`** — Subhead, blurb, `emergingThemes[]` (eyebrow / insight / drove), `researchImages[]` or `researchVideo`.
2. **`problemCallout`** — `{ eyebrow, statement }` — the "real problem" pull-quote.
3. **`sprintZeroSection`** — Workshop kickoff, explorations, decision point + images.
4. **`keyInsights[]`** — Numbered insight cards with optional images.
5. **`keyInsightsVideo`** — Single video below the insights.
6. **`ideationSection`** — `bubbles[]`, `wireframeImage`, `iterations[]` (with optional pin annotations).
7. **`myThoughtProcessSection`** — Long-form content + optional video / annotated images.
8. **`userTestingSection`** — Description, video, metrics, images.
9. **`whatDidntWorkSection`** — Honest failures + annotated images.
10. **`finalProductSection`** — Hero shots of the shipped product.
11. **`outcomeSection`** — Results with metrics.
12. **`postLaunchSection`** — Long-tail metrics (`timeframe`, `usage`, `retention`, `businessImpact`).
13. **`technicalImplementation`** — Challenges, solutions, accessibility, performance.

All image arrays accept the same shape: `{ src, alt, caption?, annotations?: ImageAnnotation[] }`. Annotations are pin overlays positioned by `{ x, y }` percent.

---

## Wrapper page (only if you need a custom route)

`src/pages/StructuredCryptoCaseStudy.tsx` is the canonical pattern — 17 lines:

```tsx
import StructuredCaseStudyLayout from "@/components/case-study/structured/StructuredCaseStudyLayout";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

const StructuredCryptoCaseStudy: React.FC = () => {
  const data = getStructuredCaseStudy("crypto");
  if (!data) return <div>Case study not found</div>;
  return <StructuredCaseStudyLayout caseStudyData={data} heroAsImage={true} />;
};
```

You only need this if:
- You want a non-`/project/:slug` URL, OR
- You want to pass layout flags like `heroAsImage={true}` (forces image hero even when `heroVideo` exists).

For a normal new case study, **skip this step entirely** — the dynamic route handles it.

---

## Routing (`src/App.tsx`)

- `/project/:slug` — generic dynamic route, looks up by `id` in `structuredCaseStudies`. Use this for everything new.
- Custom routes that exist today: `/project/herbalink`, `/project/business-management`, `/project/barskyjoint`.
- `investor-loan-app` is currently redirected to `/`. `wholesale-distribution` redirects to `business-management`.

To **delete a case study**: remove the data entry, remove any custom `<Route>` line, and the dynamic route will 404 cleanly.

---

## SEO

SEO is built per-route by `UnifiedSEO` using `react-helmet-async`. For project pages it pulls from:

1. `seoData` field on the case study entry (preferred), OR
2. Fallback to `title` / `description` / first hero image.

Canonical URL is auto-derived from the route. **Do not** put project SEO in `index.html` — it's intentionally stripped of per-route tags.

If you want explicit SEO copy, add it to the case study entry's `seoData`:

```ts
seoData: {
  image: "https://.../hero.png",
  projectName: "MyProject",
  results: ["+40% conversions", "..."],
  technologies: ["React", "Figma"],
  path: "/project/myproject",
}
```

---

## Where a case study shows up (so you don't miss a spot when replacing)

1. **The case study page itself** — driven by `structuredCaseStudies[slug]`.
2. **Homepage video case studies grid** — `src/components/home/` (uses `projectsList.ts` / curated list).
3. **`/projects` listing** — `src/pages/AllProjects.tsx` + `src/pages/projects/hooks/useProjectsData.ts`.
4. **Sitemap** — auto-generated by `scripts/generate-sitemap.ts` from routes; new dynamic-route slugs are picked up automatically.
5. **Internal linking / related projects** — `src/components/RelatedProjects.tsx`.

When **replacing** a case study, check items 2 and 3 — those are the manual touchpoints. Everything else is data-driven.

---

## Image hosting

- Long-form case study images live in Supabase Storage: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/{slug}/...`
- Hero / cover images may live in `/public/uploads/` or on `barskyux.com`.
- Captions are auto-generated by an OpenAI edge function on upload and stored in the database — **do not regenerate once saved** (per project rule).

---

## Common gotchas

- **Slug must match in three places**: object key, `id` field, and URL. Mismatches = silent 404.
- **Tags render at the bottom on mobile, top on desktop** — by design. Don't add a second tag block.
- **`heroAsImage={true}`** forces image hero even if `heroVideo` exists. Useful for slow-loading videos.
- **Section order is fixed** in `StructuredCaseStudyLayout.tsx`. To reorder, edit the layout component, not the data.
- **Empty arrays still render the section header.** If you don't want a section, *omit the field entirely* — don't pass `[]`.
