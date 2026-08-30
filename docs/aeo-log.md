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

- [x] **3 citable resource content** — 2026-08-30 — `what-one-person-can-ship-now`,
  the post closest to the differentiator this loop exists to get cited for
  ("can one person actually design and build a product with AI").

  **Two extraction defects, both structural rather than editorial.**

  1. *The most liftable passage on the page had no structure.* "Four walls, in
     the order I hit them" was followed by four unmarked `<p>` elements. A
     numbered constraint list is exactly the shape an answer engine quotes, and
     nothing in the markup said it was one. Added a four-item `<ul>` with bolded
     lead-ins (Distribution / Institutional trust / Operations / Nobody checking
     your work) directly under that sentence, one clause each, with the existing
     prose kept below as the argument. Answer-first, then detail — no paragraph
     was rewritten or removed, so the human-voice pass of 2026-08-27 is intact.
  2. *The post's own headline number did not check out on the page.* It opens
     "I have four products live that I designed and built by myself" and then
     names three: Stips, Ring-Rival, CatchBuddy. The fourth was only ever
     asserted by the closing image's alt text. An engine reading this counts
     three and the claim reads inflated. Named Recast in the product paragraph
     (it is live at recastvid.com, has its own case study, and is referenced by
     four other posts in this file) and corrected "Three different shapes of
     product" to "Four".

  Also gave the closing `/images/recast/landing-light.webp` figure its real
  `width`/`height` (1500x831) and `loading="lazy"` — it was the one image in the
  post without dimensions, so it was the one that could shift layout.

  **Deliberately not done: manufacturing an "X is..." definition sentence.** The
  lever's checklist asks for one, but the post already carries its citable claim
  in the second paragraph — "One person can ship real software. One person still
  cannot ship a real company." Bolting a definitional opener on top of that would
  add nothing an engine can't already extract and would read as SEO-shaped
  writing, which is the exact regression the 2026-08-27 pass was undoing.

  **Measured.** `tsc -p tsconfig.app.json` unchanged (12 pre-existing errors in
  `analytics.ts` / `Comments.tsx` / `test/setup.ts`, none introduced; the root
  `tsconfig.json` is looser and reports 0 — both numbers are correct for their
  config). Build clean, 44/44 prerendered, 0 head-only. `capture-bodies` 44/44
  with **exactly one** snapshot changing, which is the confirmation that the edit
  was contained. Served non-JS HTML for the post now carries all four `<li>`
  elements and the corrected count. Media intact: 23 files in `public`, 23 in
  `dist`, no `.capture-media-stash` left behind.

  **Noted, not acted on:** a `vite preview --strictPort 4199` from an earlier run
  was already alive when this run started (pid 29090). It did not corrupt
  anything — `vite preview` serves `dist/` from disk, so it picked up the fresh
  build — but it is the same leftover-process class of hazard as the 2026-08-23
  entry, and it means `--strictPort` is not actually protecting this script from
  a concurrent run the way the header comment implies.

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

### Out of rotation — 2026-08-29 — `/about` was still publishing invented client outcomes

SEO/AEO was the staler half (AEO last ran 2026-08-23, design 2026-08-27). Lever
3 is still next and stays unticked: this was not a lever, it was a hard-rule
violation found while diagnosing, and it outranked the rotation.

**Diagnosed.** Route meta is clean (`seo_audit_all_routes.py`: 43 routes, 0
problems; llms.txt scores 90/100, 43/43 links valid), so the weakness was not
technical. Measuring served word count per route put `/about` at **461 words** —
the thinnest page on the site apart from `/store` and `/contact`, and it is the
page an answer engine reads to decide who Hiram is. Reading what those 461 words
actually said turned up the real problem.

The "Professional Journey" on `/about`, and the identical experience section on
the **homepage**, were crediting Hiram with thirteen performance percentages
attributed to six named employers:

| employer | claim |
|---|---|
| PNC | "boosting engagement by 40% and raising satisfaction scores by 25%" |
| Bank of America | "cutting errors by 15% and lifting engagement by 10%" |
| Deloitte | "Elevated platform engagement by 20%" |
| Tata Consultancy Services | "drove a 15% revenue lift"; "reducing support workload by 10%" |
| KPMG | "reduced client costs by 10% and increased platform revenue by 14%" |
| Express Scripts | "improved satisfaction and engagement by 30%, while cutting project turnaround by 20%" |

Nothing in this repo supports any of them. `git log` puts every one on
**`gpt-engineer-app[bot]`**, Aug/Sep 2025 — the same generator that wrote "47+
successful projects", "40%+ conversion", "$150-250/hour" and "WCAG 2.1 AA
certified", all of which the 2026-07-15 honesty pass removed. That pass cleaned
the FAQ and never reached these two files, so the claims kept being served on the
site's two most important pages. `/about` was the last unswept Lovable-era page.

The same array existed **twice**, hand-copied — `components/about/
ProfessionalJourney.tsx` and `components/home/RecentAdventuresSection.tsx` —
which is how one fabrication came to be served on two pages.

`/about` also contradicted itself: H1 "About Hiram Barsky - UX/UI Designer & AI
Developer" and subhead "Gen AI Developer focused on building AI-powered digital
experiences", against the page's own title tag "About Hiram Barsky — Designer
and Developer". The AI-first framing is explicitly retired positioning.

**Changed.**
- New `src/data/careerHistory.ts` — one source of truth, with its provenance and
  the removal written into the file header so it cannot quietly drift back.
  Both components import it; neither holds copy any more.
- Descriptions fixed **by subtraction**: each is what was left of the original
  sentence once the unverifiable quantity came out. Nothing added, nothing
  reworded into a new claim. Roles, employers and dates untouched — those are
  biography and were never the problem.
- `PersonalStory.tsx` — H1 now matches the title tag; subhead states the settled
  positioning; "My Story" replaced AI-hype with specifics that trace to the
  employer list and to five live products, each linked to its case study.
- `WorkingWithMe.tsx` — the four cards were interchangeable filler, and
  "Results-Driven: measurable outcomes like conversion improvements" was the same
  implied metrics claim in another costume. Replaced with four checkable ones.
  WCAG stays a practice ("I build to WCAG 2.1 AA"), never a credential.

**Measured.** `npx tsc --noEmit` clean, `npm run build` clean at 43/43
prerendered. The first rebuild still served all thirteen numbers — the
prerendered snapshots were stale — so `npm run capture-bodies` was re-run
(**43/43 routes, 0 failures**, `/projects` still resolved) and the site rebuilt.
Verified against **barskydesign.pro**, not a local build:

| check | before | after |
|---|---|---|
| fabricated-metric occurrences on `/` + `/about` | **13** | **0** |
| banned AI-first positioning on `/about` | 1 | **0** |
| `/about` words served to a non-JS crawler | 461 | **563** |
| case-study links on `/about` | 0 | **5** |

Rendered and checked at 1440px and 375px: no horizontal overflow (scrollWidth
375 = clientWidth, 0 offending elements), career entries render at opacity 1
with the honest copy.

**Left open / FLAGGED:**
- **The thirteen numbers, if any are real.** Removed because nothing sourced
  them, exactly as the hourly rate and the WCAG credential were. If Hiram
  measured any of them, they can go back — from him, with a source.
- **FLAGGED — `/about`'s meta description names AstraZeneca**, which appears
  nowhere in the career history; the sixth role is Express Scripts. One of the
  two is wrong and only Hiram knows which.
- **The header badge still reads "Product Designer + AI"** on every page — the
  retired positioning, surviving in a component this change did not touch.
  Sitewide, so it wants its own run.
- **`SkillsShowcase.tsx` is still bot-generated** — "Webflow", "Adobe Creative
  Suite", "A/B Testing", "Conversion Optimization". Not metrics, so not urgent,
  but nothing verifies that list either.
- **FLAGGED — this push also carried `9ad446df` ("Caption every image...")**, an
  unpushed commit left in the working tree by another session. It deployed with
  this change and was not reviewed here. No concurrent writer was active during
  this run (the only trace was a stale `vite preview --strictPort 4199` from
  Aug 27, killed before starting), so the collisions of 2026-08-23 and 08-27 did
  not recur.

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
