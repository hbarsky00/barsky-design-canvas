# AEO rotation log — barskydesign.pro

One lever per run, six in a cycle. Pick the first lever not yet ticked in the
current cycle; when all six are done, start a new cycle below with the date.

Levers: 1 entity hardening · 2 extractable Q&A · 3 citable resource content ·
4 structured-data validation sweep · 5 llms.txt / cross-web consistency ·
6 content freshness / gap-fill

## Cycle 1 — started 2026-08-22

- [x] **1 entity hardening** — 2026-08-22 — Organization schema `jobTitle`,
  Person description and Org description rewritten to the design-and-develop
  positioning; `knowsAbout` extended with SaaS / web app / mobile app / internal
  tools entries. `sameAs` was already present. Also fixed a real corruption bug:
  `inject-seo-html.ts` passed the rendered body to `String.replace()` as a
  replacement *string*, which expands `$$`, so `priceRange: "$$$"` was shipping
  as `"$$"`. Both call sites now use replacer functions.

- [x] **2 extractable Q&A** — 2026-08-22 — the homepage FAQ was the weakest
  thing on the site and broke Google's FAQ guidelines three ways at once:
    1. Two competing `FAQPage` blocks — three hardcoded questions in the head
       from `structuredDataUtils`, and eight different ones emitted inline by
       `SeoFaqSection` once its lazy chunk loaded. Neither matched the other.
    2. The visible section was `hidden md:block`. Google indexes mobile-first,
       so the markup described content that is `display:none` in the viewport it
       actually crawls.
    3. It was lazy-loaded, so the Q&A was absent from the prerendered HTML that
       answer engines without a JS runtime read — the exact audience this lever
       exists for.
  Fixed: `structuredDataUtils` now generates the `FAQPage` from `homepageFaqs`,
  the same array the section renders, so one source feeds both. Removed the
  duplicate inline block. Dropped `min-h-screen` from the section (the only
  reason it needed hiding on mobile) and unhid it. Renders eagerly now, so the
  questions are in the served HTML.
  Content was rewritten separately in b5f5bcdb — the previous answers claimed
  "conversion rates by 40%+", "47+ successful projects", "60% faster design
  cycles", "24-hour response times", a "$150-250/hour" rate and "WCAG 2.1 AA
  certified". The 2026-07-15 honesty pass cleaned the FAQ *schema* and never
  touched `seoFaqs.ts`, which is what the visible section reads from.

- [ ] 3 citable resource content
- [ ] 4 structured-data validation sweep
- [ ] 5 llms.txt / cross-web consistency
- [ ] 6 content freshness / gap-fill

### Out of rotation — 2026-08-23 — `/projects` was an indexable empty page

Not one of the six levers, so no box ticked; lever 3 is still next. This was the
known-open "/projects fails capture every run" item, and the shrug was hiding a
real defect rather than a flaky script.

**Diagnosed.** `/projects` was never a page. `App.tsx` routed it to
`<Navigate to="/#case-studies" replace />`, a *client-side* redirect, so the URL
answered **200 with an empty `<div id="root">`** — nothing happened until React
booted. Meanwhile the SEO layer treated it as a first-class page:

- `robots: index, follow` and a self-referential canonical to `/projects`
- its own title, description and OG card (`page-projects.png`)
- **sitemap priority 0.9** — the strongest crawl signal on the site after `/`
- the most internally-linked URL after the homepage: the footer link on *every*
  page, the hero (×2), the services CTAs, `RelatedProjects`, `InternalLinkingHub`
- and **five `_redirects` rules pointed at it** — `/case-studies/*`,
  `/case-studies/roi-design-builder`, `/project/business-management`,
  `/project/wholesale-distribution`, `/project/splittime`

So every retired-URL 301 on this site, and every footer link on every page, was
funnelling crawlers and link equity into a blank document. For a JS-capable
crawler it read as a soft 404 that contradicted its own canonical; for the
answer engines this loop exists to serve — which mostly do not run JS — the
site's second-strongest URL was empty.

**Considered and rejected: build a real `/projects` index.** The homepage lists
6 case studies; 9 `/project/*` routes are live, so an index looked additive. It
is not allowed: `VideoCaseStudiesSection.tsx` records that Hiram deliberately
pulled `fire-lion` (2026-08-07, "were going to work on that later") and
`email-creation-ai` (2026-08-09, "park it as a draft") from featured work. An
index page would re-feature exactly what he parked, and the honest remaining set
duplicates the homepage. The settled editorial decision is that
`/#case-studies` **is** the work index — so the fix is to honour that at the
HTTP layer instead of publishing a page that pretends otherwise.

**Changed.**
- `public/_redirects` — `/projects  /#case-studies  301!`, above the catch-all.
  Forced, because rules in that file do not shadow real files by default and
  this must fire even if a stale `projects/index.html` survives into a deploy.
- The same file — repointed all five rules above from `/projects` to
  `/#case-studies`, so none of them is a 301→301 chain any more.
- Delisted `/projects` from the four places that published it:
  `scripts/inject-seo-html.ts` (stops generating the empty page),
  `scripts/capture-prerendered-bodies.ts` (it could never capture a `<Navigate>`
  — this route *was* the perpetual failure), `scripts/generate-sitemap.ts`, and
  `pageIndexingConfigs` in `src/utils/seoUtils.ts`.
- Repointed every internal `to="/projects"` to `/#case-studies` — `Footer`,
  `Hero` (×2), `Projects`, `RelatedProjects`, `SimplifiedProjectDetail`,
  `ConsolidatedServicesSection`, `ServicesCallToAction`, `InternalLinkingHub`,
  `useProjectDetail`. `to="/#case-studies"` was already the established pattern
  (header nav, case-study pages, service pages) and `App.tsx` has the hash-scroll
  handler, so this needed no new mechanism.
- Left the `<Navigate>` route in `App.tsx` as an in-app fallback. The server 301
  catches every hard navigation; this only covers a stale in-app link.

**Measured.** Build output went from `31 routes (30 prerendered, 1 head-only)`
to `30 routes (30 prerendered, 0 head-only)` — the head-only route was always
this one. Live, with `curl` and no `-L`:

| URL | before | after |
|---|---|---|
| `/projects` | 200, empty body | **301 → `/#case-studies`** |
| `/case-studies/*` | 301 → empty page | **301 → `/#case-studies`** |
| `/case-studies/roi-design-builder` | 301 → empty page | **301 → `/#case-studies`** |
| `/project/business-management` | 301 → empty page | **301 → `/#case-studies`** |
| `/project/wholesale-distribution` | 301 → empty page | **301 → `/#case-studies`** |
| `/project/splittime` | 301 → empty page | **301 → `/#case-studies`** |

Live sitemap: 31 → **30** URLs, `/projects` absent. Served HTML (no JS) on `/`,
`/about`, `/services`, `/blog`: **0** occurrences of `href="/projects"`,
`/#case-studies` present on each, bodies still 42–89 kB. Verified against
barskydesign.pro, not a local build.

**FLAGGED — two sessions were writing this repo at once.** This run's edits were
swept into `d86d52e1 "Add claude-seo to the loop's diagnosis toolkit"` (19:05),
a commit from a *different* concurrent session that ran a catch-all `git add`
over an in-progress working tree; that session then pushed the WebP/font
overhaul (21:04–21:44) and my change went live with it. The change is correct
and verified live, but it is committed under an unrelated message and was never
reviewed as its own diff. The same collision explains the capture trouble below:
two sessions running headless Chrome and `vite preview --strictPort 4199`
against the same `dist/` at the same time. **If this loop is ever scheduled
alongside another agent on this repo, they will corrupt each other's commits.**

**Capture.** 29/30 routes recaptured cleanly (the footer href changed on every
page, so every snapshot was stale). `/` timed out repeatedly under the
contention above; the concurrent session's own capture at 21:23 produced a clean
homepage snapshot, and the live check confirms 0 stale hrefs on `/`, so the
served homepage is correct. Not a shortcut worth repeating — recapture `/` on a
quiet machine next run and confirm.

**Also found, deliberately not acted on** (one substantial thing per run):
- `capture-prerendered-bodies.ts` leaks `.capture-media-stash` if the process is
  SIGKILLed — its `finally` never runs, so `dist/` is left with **zero videos**
  and the next run's `stashMedia()` opens with `rmSync(stash)`. `public/` is the
  source of truth so nothing is lost, but the failure mode looks like data loss
  and cost this run real time. Worth a guard that restores on startup.
- `StructuredCaseStudyLayout.tsx` links to `/#projects`; the homepage section id
  is `case-studies`. That anchor has never matched anything.
- `AdvancedSitemapMeta.tsx` emitted `priority-pages="/,/projects,/contact"`.
  Repointed to `/services` in passing, but none of that component's `<meta>`
  tags are real — same class of fiction as the `usePageIndexing` known-open item.

### Flagged for Hiram — facts only he has

- **Hourly rate.** The old FAQ published "$150-250/hour". Nothing verified it,
  so the pricing answer now says rates depend on scope and points at a call. If
  that range is real, say so and it goes back in.
- **WCAG credential.** The old FAQ said "WCAG 2.1 AA certified" — a credential
  claim. Softened to "I build to WCAG 2.1 AA", which is a practice. If there is
  an actual certification (IAAP CPACC/WAS or similar), it can be stated again.
- **Blue Sky numbers.** Retired from SEO 2026-08-22, so lower stakes now, but
  the case-study data still disagrees with itself: 45% vs 35% faster processing
  in different files, and "12 errors/week to 4 errors/month" is a 92% reduction,
  not the 68% claimed throughout.
