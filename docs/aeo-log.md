# AEO rotation log — barskydesign.pro

One lever per run, six in a cycle. Pick the first lever not yet ticked in the
current cycle; when all six are done, start a new cycle below with the date.

Levers: 1 entity hardening · 2 extractable Q&A · 3 citable resource content ·
4 structured-data validation sweep · 5 llms.txt / cross-web consistency ·
6 content freshness / gap-fill

## Dead-run ledger — reconciled 2026-11-17

Step 0 of the task prompt asks every run to reconcile the previous ones against
the repo. Nobody had written the result down, so here it is once, in the log.
A run that reports "succeeded" and leaves no commit **did nothing**.

| run | wall clock | summary | commit in repo | verdict |
|---|---|---|---|---|
| 2026-11-13 14:11–15:00 UTC | 49 min | none | **none on 2026-11-13** | **DEAD RUN 2026-11-13 — blocked on permission, shipped nothing** |
| 2026-11-14 19:34–21:35 UTC | 2 h | yes | `c588be42`, `0edced2d` | real work ✓ |
| 2026-11-15 15:26–16:15 UTC | 49 min | none | **none on 2026-11-15** | **DEAD RUN 2026-11-15 — blocked on permission, shipped nothing** |
| 2026-11-16 05:12–05:17 UTC | 5 min | none | `46f8a4e7` lands 05:27, *after* the run ended | **ambiguous** — three log entries and three commits exist for 2026-11-16, but the design-log records that work as a *cloud* session. The scheduled run itself almost certainly did nothing; the day was saved by a session the scheduler was not tracking. |
| 2026-11-17 14:11–14:27 UTC | 16 min | yes | `dbf4ef4a`, `58f72d81`, `232dbabe` | real work ✓ — FINDABILITY, the eight page meta descriptions |
| 2026-11-18 03:37 UTC | — | this entry | `docs/` only, deliberately | **ABORTED — another agent was editing this repo live.** Not a dead run: the block was detected, recorded and reported. |

The cause, per the task prompt, is the task launching in `default` permission
mode instead of `auto`: the first `git log` raises a prompt, nobody is there to
click it, the prompt times out and the session dies — then reports success.
Two identical 49-minute no-ops are the signature.

**This run (2026-11-17) was not blocked**, which is the first positive evidence
that the permission mode is now right: every build, audit, `curl`, commit and
push went through unprompted. The one exception was `kill <pid>` on a stale
`vite preview` from 2026-11-16, denied by the auto-mode classifier as
destructive. That is a reasonable denial and it cost nothing — the capture step
was not needed this run — but **a future CRAFT or FLOW run that needs
`capture-bodies` will fail on `--strictPort 4199` if a stale preview is still
holding the port and it cannot clear it.** Worth an allow rule before then.

## 2026-11-17 (evening) — NO LENS RUN, ABORTED — a second agent was working in this repo

Step 0 passed: the 2026-11-17 09:11 EST run is real work, the 2026-11-16 run is
already resolved as ambiguous in the ledger above, and **no new dead run
appeared.** The run then stopped at the concurrency check, which is the one hard
rule in the task prompt that says to stop rather than to work around it.

### The evidence, at 22:38 EST

- `vite preview --port 4199 --strictPort` started 22:29:33, still holding the
  port.
- Thirteen tracked files dirty plus one new untracked image, all written
  between 22:17 and 22:38 — `src/data/structuredCaseStudies.ts`,
  `src/data/homeCaseStudies.ts`, `src/data/caseStudyHeroes.ts`,
  `src/data/imageDimensions.json`, two `StructuredCaseStudy*` components,
  `VideoCaseStudiesSection.tsx`, six `prerendered-bodies/*.html`, and
  `public/images/dae-search/hero-dashboard.webp`.
- `src/data/imageDimensions.json` was written **27 seconds** before the check.
  This is not a stale tree; it is a case-study media pass in progress.

### Why that forbids shipping, not just committing

The ship gate requires `npm run capture-bodies` whenever visible markup
changes, and that regenerates exactly the `prerendered-bodies/*.html` the other
agent is part-way through writing. A build would also overwrite `dist/` under
it. So the collision is not the hypothetical catch-all `git add` this rule was
written for — this run's own ship gate would have destroyed another agent's
in-flight work. Aborting is the cheap outcome.

The stale-preview worry recorded in this run's predecessor turns out to have a
second edge: port 4199 being held is itself a signal that someone else is
mid-run, so a future run should read it as *stop*, not as *something to kill*.

### What this run changed

Nothing on the site. One ledger row, this section, `docs/` only, staged by
explicit path — never `git add -A`. No typecheck, no build, no recapture, no
`capture-bodies`: all four would have written into another agent's working tree.

### Left open — pick this up next run

The rotation is owed **RESEARCH or CRAFT**, both last turned 2026-11-16;
FINDABILITY and FLOW both already turned on 2026-11-17. Two concrete items are
sitting in the logs ready to pick up:

- **`og:image:alt` still falls back to `` `${title} preview image` ``** in
  `seoBuilder.ts` — alt text that describes a file rather than an image, shipped
  on every page. Named as open by the 2026-11-14 run and still true.
- **`SkillsShowcase.tsx` is still bot-generated**, unchanged since it was first
  flagged.

### Addendum, 22:41 EST — the block cleared, and this run still held

Sixty seconds after the check above, the other agent committed `dcaa1eca`
("Fix the DAE hero, the stacked headers, and a 96px band of nothing") and
pushed it themselves. The tree went clean. Neither side contaminated the other:
their push carried their fourteen files, this run's carried one `docs/` file,
and the reflog shows the two pushes four seconds apart. **The concurrency rule
worked as written** — first confirmed instance.

This run still did not start a lens pass, for two reasons worth writing down
rather than dressing up:

- Their `vite preview` on 4199 was **still running** at 22:40:46, which is what
  verifying a just-pushed change looks like. Treating a clear tree as a green
  light while another session is still live is how the next collision happens.
- `dcaa1eca` is itself a **CRAFT change** — hero image, stacked headers,
  spacing. CRAFT is one of the two lenses this rotation owed. Auditing that
  ground sixty seconds after it moved, without having seen the intent behind
  it, produces a critique of someone else's in-flight judgement, not an
  improvement.

So the rotation still owes **RESEARCH or CRAFT**, and a CRAFT run should now
start by reading `dcaa1eca` rather than by re-auditing what it already fixed.

Also worth noting for whoever reads this: the case-study media work happening
tonight is **not** from this loop. If a later run finds case-study heroes or
`prerendered-bodies/` changed with no line in these logs, that is why — do not
treat it as drift and do not revert it.

## 2026-11-17 — FINDABILITY (lever 1, entity hardening) — the search snippet was still written by an agency

`PAGE_SEO_MAP` in `src/data/seoData.ts` was the last place the retired
positioning and the old agency voice were still shipping live. The 2026-11-16
sweep cleaned components, schema and the FAQ and never opened this file — the
same class of miss as `seoFaqs.ts`: a file nobody re-reads because the pages it
feeds all render correctly.

This matters more than its size suggests. The meta description is the only
sentence most people read before deciding whether to click, and on five of the
site's eight hand-written page entries it was boilerplate that contradicted the
page behind it.

### Measured before — `curl` against production on 2026-11-17, not inferred from source

| route | what the snippet said | why it was wrong |
|---|---|---|
| `/about` | "**Senior UX/Product Designer** with 15+ years creating data-driven, **AI-powered platforms**" | Both strings are explicitly retired positioning. The 2026-11-14 run removed "Lead UX Designer" from 74 files and the 2026-11-16 run replaced the hero eyebrow; this line survived both, in the one sentence Google shows. |
| `/design-services/mobile-app-design` | design "that **increases engagement and app store ratings**" | An unbacked outcome claim — the exact class the 2026-11-16 honesty sweep removed everywhere else. |
| `/contact` | "**Ready to transform your product?**" | The page this site exists to reach, opening in agency voice. Also named "Clifton, NJ" while the page itself says "New Jersey". |
| `/blog` | "**Expert insights on** UX design, AI integration..." | Generic. The page's own line is far better and was sitting unused. |
| `/services` | "...experiences that **drive business results**" | Outcome boilerplate. |
| `/store` | "...templates to **accelerate your product development**" | Boilerplate; says nothing about what is actually sold. |

Scan across all 66 built routes for agency-voice tells (`transform your`,
`expert`, `drive results`, `that scale`, `increases engagement`, `app store
ratings`, `boost`, `seamless`, `leverag`, plus the two retired strings):
**5 descriptions hit. The other 61 were clean** — which is why this was
invisible: the blog and case-study descriptions had all been rewritten, so the
file read as done.

Separately, **`/design-services/ux-ui-design` titled itself "UX/UI Design
Services" while its `<h1>` said "Product Design Services"** — a snippet that
mismatched its own page, and a second claimant for the phrase the `/services`
hub already targets. Retitled to match the H1. The hub keeps the phrase
deliberately: it sits higher in the tree and carries more inbound links, so it
is the right page to win it.

### What shipped (`dbf4ef4a`)

Eight descriptions and one title rewritten. **Every replacement is lifted from
the page's own current copy**, so the snippet now promises what the page
delivers — `/contact` leads with "Tell me what you're working on and where it's
stuck", which is the page's actual opening line and a far lower barrier than
"Ready to transform your product?".

Nothing invented: no rate, no project count, no outcome percentage. "Clifton"
was dropped from `/contact` rather than kept, because the page says "New
Jersey" and the 2026-11-16 run deliberately refused to guess the city for
schema `address`. One entity, one answer.

### Measured after

- Descriptions with agency-boilerplate tells, all 66 built routes: **5 → 0**.
- Retired-positioning strings (`Senior UX/Product Designer`, `AI-powered
  platforms`) anywhere in `dist`: **0 files**.
- All eight titles ≤ 58 chars; all eight descriptions 135–158 chars (checker
  range is 70–160); `og:description` equals the meta description on all eight.
- `npm run typecheck` clean — and it **earned its place this run**: the first
  version of the `/contact` line used straight apostrophes inside a
  single-quoted TS string and produced eight TS1005 parse errors. A bare
  `tsc --noEmit` would have passed. `npm run build` EXIT:0.
- **No recapture.** Head-only change; all 66 tracked snapshots in
  `prerendered-bodies/` showed 0 modifications, which is the check rather than
  the assumption.
- **Verified live** on all eight routes after the Netlify build, with
  cache-busted requests. Note: the first verification pass returned the OLD
  `/about` description while the same script found zero occurrences of
  `Senior UX/Product Designer` seconds later — a stale edge node caught
  mid-propagation. Five cache-busted re-fetches all returned the new value
  (`age: 0`, `cache-status: fwd=miss; stored`). **If a live check disagrees
  with itself, re-fetch before believing the failure.**

### Left open

- **Eight blog posts ship over-length descriptions** (168–203 chars) and three
  over-length titles (62–67), all of them the posts ported from barsky.design
  on 2026-11-12. The checker flags all eleven. **Deliberately not fixed**, and
  this is the reasoning rather than laziness: all eight are written *to
  designers* ("How to Write a Case Study", "Design Hiring in 2026", "User
  Research With No Budget"). Raising their SERP click-through amplifies exactly
  the audience mismatch `research-log.md` identified — 49 of 66 URLs are posts
  and most address designers, which is why Hiram's only inbound is designers
  offering to redesign the site. Fix them in a run that also addresses who they
  are for, not as a metadata chore.
- **Twelve routes share `site.png` as their OG card** — the four `/services/*`
  sub-pages and eight blog posts. Those four are the founder-facing commercial
  pages, so a generic social card is worst exactly where it matters most.
  Needs real rendered cards; its own run.
- **The four `/services/*` pages and three `/design-services/*` pages have one
  inbound internal link each** — all from the `/services` hub. The most
  commercial pages on the site, with almost no internal signal reaching them.
  Measured this run (0 orphans site-wide, but these seven are the floor).
- **Sixteen of 66 sitemap entries carry no `<lastmod>`** — every non-blog
  route, including `/`, `/about`, `/contact` and `/services`. Only a hint to
  crawlers, but it is free and currently unused.
- **`/about`'s "My Story" body copy still says "boost engagement, conversions"
  and its `<h1>` reads "About Hiram Barsky - UX/UI Designer & AI Developer".**
  FLAGGED, not touched: visible page prose, and rewriting it is Hiram's call.
  The retired positioning is now gone from the *metadata*, but the H1 on that
  page still carries the old framing.
- `usePageIndexing` still injects invented `<meta name="crawl-priority">` and
  `fetch-priority` tags on three pages and console.logs on every production
  navigation. `seoUtils.ts` `pageIndexingConfigs` still lists seven
  `/case-studies/*` paths that have never been routes. Both unchanged.
- `og:image:alt` still falls back to `` `${title} preview image` ``.
- Still no GA4 or Search Console export. Every finding above is deterministic or
  desk research; none of it is a number about real visitors. Named as this
  loop's highest-value unlock for three runs now.

## 2026-11-16 — UNSCHEDULED, SEVERITY-DRIVEN — the FAQ was still publishing all three FLAGGED facts, live

Not a lever turn. Found while sweeping for retired-positioning strings after
Hiram pointed out that his only inbound is designers offering to redesign the
site. Logged here because `aeo-log.md` is where the flagged-facts list lives and
because the FAQ is the FAQPage source, which is what answer engines quote.

**`src/data/seoFaqs.ts` was shipping every single one of the three facts this
playbook says must NEVER be filled in.** Confirmed live on
`https://barskydesign.pro/` by `curl` on 2026-11-16, not inferred from source:

| claim | grep count on the live homepage |
|---|---|
| `Hourly Rate: $150-250/hour` | 1 |
| `47+ successful projects` | 1 |
| `40%+` conversion improvement | 2 |

Plus two more inventions in the same file — "60% faster design cycles" and
"accelerate the traditional design process by 60%" — an unverifiable
"24-hour response times" promise, "Most clients find significant ROI", and
**"I'm WCAG 2.1 AA certified"**, which is the flagged credential claim stated as
fact rather than the approved "I build to WCAG 2.1 AA" practice wording.

**This was supposedly fixed three months ago.** The 2026-07-15 honesty pass
cleaned the case studies and the FAQ *schema* and never touched this file; the
miss was noticed again on 2026-08-22 and written into project memory. It was
still live today. A known bug with a memory note is not a fixed bug.

Rewritten end to end. Every invented number removed; the rate removed and
**deliberately not replaced with another number**; the WCAG line changed to the
practice wording. Answers rewritten for someone who owns a product rather than
for another designer, per the audience finding in `research-log.md`. What is
left is checkable: 15+ years, the industries, the real stack, and the five
products that are actually live and nameable.

`projectFaqs` and `servicesFaqs` deleted from the same file. Checked first:
**zero importers anywhere in `src/`**, so they rendered nowhere and emitted no
schema — but they carried the same invented material and were one wiring-up away
from being live. Recoverable from git.

### Three more live fabrications found in the same sweep

- `ExitIntentDetector.tsx` — the exit popup read "See how I've helped clients
  boost conversions by **40%+** with AI-powered UX design." Now points at the
  five live products instead.
- `ServicesCallToAction.tsx` — "a clear roadmap to **40%+** improvement" and a
  "**24-hour response time**" guarantee. Both replaced with things that are
  true: scope in writing before work starts, and a straight answer if he is not
  the right fit.
- `structuredDataUtils.ts` — `hasOccupation.name` was **"AI Product Designer"**
  while `jobTitle` on the same entity said "Product Designer & Front-End
  Developer". One entity, two occupations, in machine-readable form. Aligned,
  and the `skills` string no longer leads with "AI product design".

### Entity work shipped alongside

- **Hero eyebrow** was "Lead Product Designer" — an employee job title at the
  top of a site selling an independent practice that designs *and* builds. Now
  "Independent Product Designer & Developer" (short form below `xl`), which
  matches the subhead and the schema `jobTitle`, so the entity says one thing in
  three places. Peer precedent: `ishadeed.com` leads with the service, and
  `olivierlarose.com` with "Independent Design Engineer".
- **`address` added** to both Person and Organization — `addressRegion: "NJ"`,
  `addressCountry: "US"`. `areaServed` already said where he *works*; nothing
  said where he *is*, and `address` is the field engines read for place. City
  deliberately omitted rather than guessed from `occupationLocation`. With GBP
  and the `sameAs` set still pending this is the cheapest entity signal left.
- Three remaining "AI-enhanced" positioning strings replaced in
  `CallToAction.tsx`, `BlogLanding.tsx` and `InternalLinkEnhancer.tsx`.

### FLAGGED, not touched

- **`StructuredCaseStudyOverview.tsx`** — DAE Search lists "Reduce search time
  by 60%" in its `goals` array. That is a stated project objective, not a
  claimed result, and case-study text is flagged rather than rewritten. Hiram's
  call whether the target was real.
- **`ServicesCallToAction.tsx` carries `dark:` variants** (`dark:text-white`,
  `dark:text-gray-300`) on a site that has no dark theme and never will.
- **`src/docs/seo-implementation-summary.md`** still documents a long-dead H1,
  "I Design AI-Powered UX That Boosts Conversion by 40%+". Not shipped — the
  file is never imported — but it is a stale instruction sitting where a future
  run might read it as current.
- **Availability.** Still nothing on the site. Every peer states theirs. Needs
  one sentence from Hiram; a run may not invent it.

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

- [x] **4 structured-data validation sweep** — 2026-09-01 — the site served
  **eight JSON-LD types across 44 routes with exactly one addressable `@id`**
  between them. Everything else was an anonymous node, so nothing could be
  joined to anything.

  **What the sweep found** (parsed every `<script type="application/ld+json">`
  in `dist/`, 44 pages, 0 parse errors, 0 duplicate `@type` per page):

  1. **Two organizations, two names, two URLs, describing one business.**
     `index.html` declared `LocalBusiness` "Barsky Design" at
     `https://barskydesign.pro/`; `structuredDataUtils` declared `Organization`
     "Hiram Barsky Design" at `https://barskydesign.pro` (no trailing slash).
     Neither carried an `@id`, neither named the other in `sameAs`. On all 44
     pages. Every article added a third stub under the second name as its
     `publisher`, and `WebSite.publisher` was a fourth.
  2. **"Hiram Barsky" existed as 2–3 unresolvable people per page** — founder of
     the LocalBusiness, founder of the Organization, author of the article —
     each a bare `{"@type":"Person","name":"Hiram Barsky"}`. The `sameAs` links
     that actually identify him (LinkedIn, GitHub) hung off the *organizations*,
     so no Person node on the site was connected to them. For a lever whose
     whole purpose is being cited by name, that is the defect that matters.
  3. `WebPage` referenced `#website` and nothing else — no link to the publisher.

  **Changed.** `index.html` now carries one `@graph` with three `@id`-addressable
  nodes: `#business` (LocalBusiness — an Organization subtype, so one node does
  both jobs, holding the union of the two old blocks' fields), `#hiram` (Person,
  with the `sameAs` links moved onto him and `worksFor` pointing back), and
  `#website` (`publisher` now an `@id` pointer). `structuredDataUtils` lost its
  Organization block entirely and references `#business` / `#hiram` by `@id` from
  every `author`, `publisher` and `WebPage.publisher`.

  Name conflict resolved to **"Barsky Design"** — it is what `WebSite`,
  `LocalBusiness` and the domain already said; "Hiram Barsky Design" is kept as
  `alternateName` rather than deleted. `WebPage.publisher`, not `about`: a blog
  post is published by the business, it is not *about* the business.

  Nothing was invented. Every field in the merged node came from one of the two
  blocks it replaced. The one description dropped as redundant ("15+ years across
  fintech, healthcare and pharma") is still stated verbatim on `#hiram`.

  A side effect worth noting: `priceRange: "$$$"` is now static in `index.html`
  instead of passing through `inject-seo-html`'s string replacement, which is
  where the `$$$` → `$$` corruption of 2026-08-22 came from. That class of bug
  can no longer reach this field.

  **Measured.** `npx tsc --noEmit` 0, build clean at 44/44 prerendered, 0
  head-only. No `capture-bodies` run: this change is head-only JSON-LD and
  touches no visible copy, and no prerendered body changed.

  | check (per page) | live before | live after |
  |---|---|---|
  | organization-ish nodes | **3–4**, under 2 names | **1** |
  | `@id`-less `Person` stubs | **2–3** | **0** |
  | addressable `@id`s sitewide | **1** (`#website`) | **3** + per-page |
  | dangling `@id` references | — | **0 / 44 pages** |
  | JSON-LD parse errors | 0 | **0** |

  The "after" column is **barskydesign.pro**, not the local build: ten live
  routes re-fetched after the deploy, one per page type — `/`, `/about`,
  `/contact`, `/services`, `/store`, `/blog`, a blog post, two case studies and
  a `/design-services/*` page. All ten identical on every row. (The built
  output measured the same across all 44.)

  **Left open:**
  - **All 12 case studies emit `Article` with no `BreadcrumbList`.** All 23 blog
    posts have one, because `BlogBreadcrumbs.tsx` emits it and only blog routes
    render that component. Case studies are the conversion path and the one page
    type where a SERP breadcrumb would help most. Biggest remaining structured-
    data gap; next AEO run should take it.
  - `BlogPosting`/`Article` only emit `dateModified` when `seoData.modifiedTime`
    is set. It is set on all 12 case studies and on none of the 23 posts, so
    every post ships `datePublished` alone.
  - `/blog`, `/services`, `/store` and the three `/design-services/*` pages carry
    only `WebPage`. Whether `Blog` / `Service` / product types belong there is a
    content question, not a validation one — do not bolt them on without checking
    the pages actually satisfy them.
  - **FLAGGED — `/project/business-management` still emits indexable `Article`
    schema** for QuickFlow, which the loop rules list as retired. Either it is
    live and the rule is stale, or it is retired and should be delisted the way
    `/projects` was. Only Hiram knows which.

- [x] **5 llms.txt / cross-web consistency** — 2026-09-09 — **measured clean, so
  the run's substantial work went to lever 4's leftover instead** (below). This
  is the lever verifying, not the lever being skipped; the measurements are the
  output.

  | check | result |
  |---|---|
  | internal paths in `llms.txt` vs `sitemap.xml` | **44 / 44, both directions** — 0 in one and not the other |
  | outbound product URLs (7) | **all 200**: recastvid.com, ringrival.today, catchbuddy.fit, firelion.me, herbalink.live, stips.bet, az-essentials.netlify.app |
  | `sameAs` targets | github.com/hbarsky00 **200**; LinkedIn **999**, which is their bot block, not a dead link |
  | `robots.txt` | every AI crawler token explicitly allowed (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, anthropic-ai, PerplexityBot, Google-Extended), 0 `Disallow`, sitemap declared |

  Worth recording that the 2026-09-09 client-acquisition run (a *different*
  loop) independently 200-checked the same outbound links from the case-study
  side that morning and killed two dead ones — `splittime.pro` and the Blue Sky
  Lovable URL. Neither was ever in `llms.txt`, which is why this lever came back
  clean: `llms.txt` had already been kept honest.

  **The one inconsistency found, deliberately not fixed.** `llms.txt` quotes
  `/blog/what-one-person-can-ship-now` as "I have four products live that I
  built by myself" while its own *For AI assistants* section lists **six**
  openable products plus BZ Essentials. The description is an accurate quote of
  the post; the post is the thing that disagrees with the site. Already FLAGGED
  in `docs/design-log.md` 2026-08-27 as Hiram's call, not a silent edit, and it
  stays flagged — editing a post's own claim to make a summary line up is
  exactly backwards.

- [x] **6 content freshness / gap-fill** — 2026-09-13 — SEO/AEO was the staler
  half (AEO 09-09, design 09-11). The freshness signals the site sends were
  measured against git and found to be wrong in three places, all in the same
  data file and the one script that reads it.

  **What was measured, on barskydesign.pro before touching anything.**
  1. **`sitemap.xml`: 22 of 45 URLs carried today's date as `<lastmod>`** — every
     case study and every static page, re-stamped on each deploy. Only the 23
     blog URLs had a real date. `generate-sitemap.ts` fell back to
     `new Date()` for any entry without one, directly under a comment
     explaining why doing that is worse than omitting the field. The 13 case
     studies therefore told Google "changed 2026-09-13" in the sitemap and
     "changed 2026-08-29" in their own JSON-LD `dateModified`, in the same
     response. Google's documented behaviour when `lastmod` is caught being
     inconsistent is to stop trusting it for the whole sitemap — which would
     have taken the blog's honest dates down too.
  2. **All 13 case studies declared `modified: 2026-08-29`.** Every one was
     rewritten on 2026-09-12 (`c11240ea`, `a393009b`, `25bcd7cf` — the
     "Humanize" commits, copy changes on all thirteen page files; FarmFlow also
     `f6e4141c`). The hand-maintained date had drifted within two weeks of
     being set.
  3. **`BlogPosting.dateModified` on 12 / 23 posts.** The 09-01 sweep recorded
     "none of the 23"; the truth was eleven missing (the 08-25/08-27 batch) and
     twelve stale (`2026-08-09T12:00:00Z`, predating the 08-27 image-and-
     backlink pass and the 08-29 caption pass, both of which added visible copy
     to every post).

  Also picked up by the mandated `seo_audit_all_routes.py`: `/project/farmflow`
  was the one route failing it — a **246-character** meta description, ~90 over
  the truncation line (every other route is ≤155).

  **Changed.**
  - `scripts/generate-sitemap.ts` — project entries now take `lastmod` from
    `PROJECT_SEO_MAP` (`modified || published`), the same source their JSON-LD
    uses, so the two can no longer disagree. Entries with no real date **omit
    `<lastmod>`** instead of inventing one; `today` is gone from the script.
    The homepage image title in the same file said "Hiram Barsky - Lead Product
    Designer" — retired positioning — and now says "designer and developer",
    matching the `/about` title tag.
  - `src/data/seoData.ts` — `modified` set from git per route, by one rule
    written into both maps' comments: *the last commit that changed the item's
    visible copy, not the file's last commit and not a style tweak.* Case
    studies: 13 × `2026-09-12`. Posts: `git log -L` on each post's block in
    `blogData.ts`; 21 × `2026-08-29` (caption pass), `what-one-person-can-ship-
    now` `2026-08-30` (lever 3), `finding-the-data-is-half-the-job`
    `2026-09-06` (DAE captions). `c3937c91` (09-07) touched 12 posts but only
    swapped a photo-credit class, so it does not count. FarmFlow's description
    cut to 150 characters by subtraction only — nothing added.
  - `scripts/check-content-dates.mjs` — **new, read-only.** Prints declared
    `modified` vs git for all 36 dated routes and flags where git is newer.
    Carries a `STYLE_ONLY` set (currently just `c3937c91`) so a judged
    markup-only commit stops nagging. Exists because item 2 shows these dates
    drift silently; the loop should run it each cycle. It reports **36 routes,
    0 stale** now.

  Considered and rejected: deriving `modified` from git at build time.
  Netlify's clone depth is unverified from here and a shallow clone would
  silently ship blanks; a per-block `git log -L` cannot distinguish a rewrite
  from a class change either. Hand-maintained plus a deterministic drift
  report is the honest minimum.

  **Measured.** `npx tsc --noEmit` **0**, eslint clean on the three files,
  build **45 / 45 prerendered, 0 head-only** (45 now, not 44 — FarmFlow was
  added 09-11). `seo_audit_all_routes.py` **PROBLEMS: 0** (was 1). No
  `capture-bodies`: head JSON-LD, meta description and sitemap only — no body
  copy changed. Working tree checked before commit: only the three edited
  files plus the new script staged, by path.

  | check | live before | live after |
  |---|---|---|
  | sitemap URLs stamped with the build date | **22 / 45** | **0 / 45** |
  | sitemap URLs with a real `<lastmod>` | 23 | **36** (9 static omit it) |
  | case-study `lastmod` == its JSON-LD `dateModified` | 0 / 13 | **13 / 13** |
  | case studies with `dateModified` matching git | 0 / 13 | **13 / 13** |
  | posts with `BlogPosting.dateModified` | **12 / 23** | **23 / 23** |
  | routes failing `seo_audit_all_routes.py` | 1 | **0** |
  | "Lead Product Designer" in sitemap | 1 | **0** |

  The "after" column is **barskydesign.pro**, ~60s after the push (`6e30fb59`),
  not the local build: the sitemap re-fetched, all 13 `/project/*` pages and
  all 23 `/blog/*` pages re-fetched and compared route by route. Sitemap
  `<lastmod>` values live: 21 × 08-29, 08-30, 09-06, 13 × 09-12 — identical to
  the built file.

  **Concurrent writer, noted.** Another session was writing to this repo
  during this run — untracked `docs/diagrams/*` and `public/images/*/flow-*`
  files with mtimes a minute old, from the client-acquisition loop's diagram
  work. Per the 2026-08-23 rule this loop should not have started; it was
  already mid-run when the files appeared. Mitigated by staging by explicit
  path only and by `git diff` confirming each hunk was this run's. If that
  session commits case-study copy today, the 13 × `2026-09-12` dates go stale
  by one day the moment it lands — `check-content-dates.mjs` will say so.


## Cycle 2 — started 2026-09-17

- [x] **1 entity hardening** — 2026-09-17 — SEO/AEO was the staler half
  (AEO 09-13, design 09-15). Cycle 1's lever 1 and lever 4 built the graph —
  `#business`, `#hiram`, `#website`, every article's `author`/`publisher` by
  `@id`. The gap this run found was the one page **about** the person.

  **Measured first.** `seo_audit_all_routes.py` PROBLEMS: 0.
  `check-content-dates.mjs` 35 routes, 0 stale. `schema_recommended_fields.py`
  on live `/about`: Person **100** — every recommended field present. So the
  Person node was not the weak point. The page was: `#hiram` declared
  `url: https://barskydesign.pro/about`, and `/about` answered with a plain
  `WebPage` carrying no `mainEntity`, no `about`, nothing that said "this
  page is that person". One-directional edge. Google's ProfilePage
  structured-data type (documented Jan 2024) exists for exactly this: a page
  whose `mainEntity` is a single Person, which is what Google uses to tie a
  creator identity to the pages that carry it.

  Also checked and left alone: `sameAs` still LinkedIn + GitHub only. A
  `twitter.com/hirambarsky` URL sits in `seoConstants.ts` `SOCIAL_PROFILES`,
  which nothing imports — dead code, and unverified, so it stays out of the
  graph. The Person `knowsAbout` list lives on `#business`, not `#hiram`; a
  one-person business's expertise is the person's, but duplicating the array
  into `index.html` twice buys little and starts a second copy to drift.
  Not done.

  **Changed — two files, two `@id` edges, zero new facts.**
  - `src/utils/seo/structuredDataUtils.ts` — the base node for
    `canonical === https://barskydesign.pro/about` is `@type: ProfilePage`
    with `mainEntity: { "@id": "…/#hiram" }`. ProfilePage is a WebPage
    subtype, so `isPartOf`, `publisher`, `image`, `primaryImageOfPage` all
    stay valid. Every other route is unchanged (`WebPage`). Comment in the
    file says why, so the next "always WebPage" tidy-up does not undo it.
  - `index.html` — `#hiram` gains `mainEntityOfPage:
    https://barskydesign.pro/about`, the reverse edge, served sitewide.

  **Deliberately omitted:** `dateCreated` / `dateModified` on the ProfilePage.
  The checker lists them as recommended. `/about` has no date in
  `STATIC_PAGE_SEO`, `check-content-dates.mjs` only watches the 35 dated
  routes, and lever 6 (09-13) exists because hand-maintained dates drift the
  moment nothing checks them. A date nothing watches is worse than none.

  **Measured.** `npx tsc --noEmit` 0, eslint 0, build 44 / 44 prerendered,
  0 head-only. Built output parsed across all 44 pages: 0 JSON-LD parse
  errors, **exactly 1** ProfilePage (`/about`), **0 dangling `@id`
  references**. No `capture-bodies`: head JSON-LD only, no visible copy.

  | check | live before | live after |
  |---|---|---|
  | `/about` base node type | WebPage | **ProfilePage** |
  | `/about` → `#hiram` edge (`mainEntity`) | none | **present** |
  | `#hiram` → `/about` edge (`mainEntityOfPage`) | none | **present** |
  | ProfilePage nodes on `/`, `/blog`, a case study | 0 | **0** (contained) |
  | `schema_recommended_fields.py` items missing a required field | 0 | **0** |
  | sitemap URLs answering 200 | 44 / 44 | **44 / 44** |
  | unknown path | 404 | **404** |

  "After" is **barskydesign.pro** re-fetched after deploy `25372792`,
  served chunk `index-Kmtuzy4X.js` = the local `dist/` hash. The checker's
  remaining "recommended missing" on ProfilePage are `sameAs` (on the
  Person it points to — the checker does not resolve `@id`) and the two
  dates above.

  **Out of scope but blocking — the first push did not deploy.** Deploy
  `16930fd5` failed in `onPreBuild`, before `npm run build` ran: *"Node
  version 18 is incompatible with the Prerender Extension — please upgrade
  to Node 20.x or later"*. `.nvmrc` pinned `18.18.0`, added by a Lovable
  bot commit (`8747c169`, Aug 2025) with no stated reason; react-router 7
  had been warning `EBADENGINE >=20` on every deploy since. The extension
  moved between the 09-16 deploy (green) and today, so **any** push this
  week would have failed. Fixed in `25372792`: `.nvmrc` → `22`, the
  version every local verification build has run on, so Netlify now builds
  what was checked. Read from the Netlify deploy log in the browser pane —
  the public API's `/log` endpoint 404s, and the CLI's `getDeploy` only
  carries the one-line error. The playbook's "poll the live URL" step
  caught it: after ~13 minutes the served chunk was still `DPn0Oi07`.

  **Left open:**
  - `seoConstants.ts` `SOCIAL_PROFILES` is dead code carrying an unverified
    Twitter URL. Delete or verify — small, but not this lever's job.
  - `/about`'s meta description still names AstraZeneca while
    `careerHistory.ts` says Express Scripts (FLAGGED 08-29, still Hiram's).
  - Lever 4's leftover from cycle 1: `/blog`, `/services`, `/store` and the
    `/design-services/*` pages carry only `WebPage`. Still a content
    question, not a validation one.
  - Next lever: **2 extractable Q&A.**

### Out of rotation — 2026-09-09 — case studies had no BreadcrumbList

SEO/AEO was the staler half (AEO 09-06, design 09-07). Lever 5 was next, and it
is ticked above on its measurements — all clean. With nothing to fix there, the
run took the item lever 4 explicitly handed to it on 2026-09-01: *"All 12 case
studies emit `Article` with no `BreadcrumbList`… Biggest remaining
structured-data gap; next AEO run should take it."*

**The asymmetry.** All **23** blog posts have emitted a `BreadcrumbList` since
`BlogBreadcrumbs.tsx` shipped — it renders one into the body of every post.
**0 of 12** case studies did, because that component is only rendered by blog
routes. So the one page type that is actually the conversion path was also the
only one with no SERP breadcrumb and no stated position in the hierarchy.

**Changed** — `src/utils/seo/structuredDataUtils.ts`, one place, under the
existing `kind === 'project'` branch, so it reaches all 12 without touching a
single case-study page. It is head-injected by `inject-seo-html`, which means it
is in the prerendered HTML a non-JS answer engine reads, unlike the blog's
body-rendered one.

**The middle rung is `/#case-studies`, not `/projects`.** `/projects` was
retired on 2026-08-23 (a client-side `<Navigate>` serving an empty 200) and now
301s here; the header nav points here; the homepage section IS the work index by
settled editorial decision. A breadcrumb whose level-2 `item` 301s away would be
describing a hierarchy this site does not have. Considered a two-rung
`Home > Title` to avoid a fragment URL and rejected it: the fragment resolves
200, and if a consumer collapses it the result degrades to exactly that
two-rung form, so the three-rung version is strictly not worse.

Each list is addressable at `<canonical>#breadcrumb` and `WebPage.breadcrumb`
points at it by `@id` — continuing the joinable graph the 09-01 sweep built
rather than adding another anonymous node beside it.

**Measured.** `npx tsc --noEmit` **0**, build clean at **44/44 prerendered, 0
head-only**. No `capture-bodies`: this is head-only JSON-LD, no visible copy
changed, and `git status` showed exactly one modified file all run.

| check | before | after (live) |
|---|---|---|
| case studies with a `BreadcrumbList` | **0 / 12** | **12 / 12** |
| blog posts with exactly one | 23 / 23 | **23 / 23** (no duplicate introduced) |
| dangling `WebPage.breadcrumb` refs | — | **0 / 12** |
| `itemListElement` positions | — | `[1,2,3]` on all 12 |
| level-3 `item` == page canonical | — | **12 / 12** |
| JSON-LD parse errors | 0 | **0** |

The "after" column is **barskydesign.pro**, re-fetched route by route ~60s after
the push — all twelve `/project/*` URLs, not a local build, not a sample. A live
blog post was re-checked as the control and still reports exactly one
`BreadcrumbList`, confirming the change did not leak into the page type that
already had one.

**Left open:**
- **No case study has a *visible* breadcrumb trail.** Blog posts do. Emitting
  the markup without one is accepted practice and Google does not require the
  trail, but the honest version — and the one that helps a human on a 12-page
  conversion path — is a visible trail matching this markup. That is a design
  change on the pages the loop is most careful with, so it belongs to a design
  run, not to a schema fix.
- **The blog's `BreadcrumbList` is still body-rendered, `@id`-less, and outside
  `structuredDataUtils`.** It works, and unifying the two sources would risk
  emitting duplicates on 23 posts, so it was left alone — but the site now
  generates the same schema type from two unrelated places.
- Unchanged from 09-01: posts ship `datePublished` with no `dateModified`;
  `/blog`, `/services`, `/store` and the three `/design-services/*` pages carry
  only `WebPage`.
- **Still FLAGGED — `/project/business-management`** emits indexable `Article`
  (and now a breadcrumb) for QuickFlow, which the loop rules list as retired.
  Either the rule is stale or the page should be delisted the way `/projects`
  was. Only Hiram knows which. Noting that the 09-09 client-acquisition run
  touched this study's data without resolving the question either.

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

### Soft 404s fixed at the mechanism — 2026-09-06

Triggered by a Search Console report Hiram shared, not by a rotation lever.

**Most of that report was Google working correctly and needs no action.** Recorded
so no future run burns a cycle "fixing" it:
- *Alternate page with proper canonical tag (18)* — `/x` and `/x/` both serve 200,
  and both carry `<link rel="canonical" href=".../x">`. Google found the variants
  and honoured the canonical. That is why *Duplicate without user-selected
  canonical* is 0.
- *Page with redirect (25)* — all 44 sitemap URLs return 200 directly, tested
  without `curl -L`. The 25 are `http://` and `www.` variants 301ing to the
  canonical host, plus the retired URLs `public/_redirects` deliberately 301s.
  Permanent redirects report this way forever; "Failed" validation only means
  Google re-checked and they still redirect, which is correct.
- *Blocked by robots.txt (2)* — `robots.txt` has zero `Disallow` lines on both the
  apex and the netlify.app subdomain, and there is no `X-Robots-Tag` header.
  Nothing can currently be blocked; this is stale. The URLs are only visible by
  clicking into the GSC row — ask Hiram for them rather than guessing.

**The one real defect.** Every unmatched URL answered **HTTP 200** with the SPA
shell — three nonsense paths returned identical 22,106-byte bodies. That is the
textbook soft-404 shape. The `_redirects` file had been patching individual
offending URLs with 301s since 2026-08-21 (see the "/get-started", "/web-development"
and "/project/nudgeme" blocks) while the mechanism producing them stayed in place.

Fixed at the source: the catch-all is now `/* /spa-shell.html 404`. Before it,
explicit 200s for the real routes that have **no prerendered file** and would
otherwise have started reporting as missing — `/store/product/*` (two real
products), `/store/success` (post-checkout), `/__seo-check` and
`/admin/content-export-2024`. Also 301'd `/project/barskyjoint`, a client-side
`<Navigate to="/">` carrying the identical defect `/projects` had.

Verified live after deploy: 44/44 sitemap URLs still 200, the no-file routes
still 200, nonsense/unknown-project/unknown-post all 404, barskyjoint 301 → `/`.
The 404 still returns the full HTML body as `text/html`, so a human sees the
NotFound page as before — only the status line changed.

**Consequence for future runs:** stop adding one-off 301s for soft-404 reports.
A URL that should not exist now returns 404 on its own. Add a rule only when the
URL should genuinely go *somewhere*.

## 2026-11-14 — FINDABILITY — the homepage served no section headings to a crawler

Lens picked by rotation: RESEARCH and CRAFT/FLOW both last turned 2026-11-12,
and the 11-14 run before this one was FLOW preparation that shipped no site
change. FINDABILITY had not had a turn since the 2026-11-12 checker fixes.

### What was wrong

`SectionHeader` defaults to `titleAnimation="typewriter"` and
`subtitleAnimation="typewriter"`, and that was the one variant in
`CharacterAnimationVariants.ts` whose hidden state carried
`display: "none"`. A word only leaves the hidden state when the heading's
`IntersectionObserver` fires, so a section that mounts below the fold during
prerender capture is frozen there and ships hidden.

Measured on the live site before the change:

| route | word spans serialised `display: none` |
|---|---|
| `/` | 72 |
| `/contact` | 11 |
| `/about`, `/services`, `/projects`, `/blog`, `/design-services/ux-ui-design`, `/project/herbalink` | 0 |

The 72 were every section heading on the homepage and every subtitle under
them: "Five products you can open right now", "Recent adventures", "Product
Designer & AI Developer", "Get in Touch" + "Tell me what you're working on and
where it's stuck", "Latest Insights" + its subtitle, "Frequently Asked
Questions" + its subtitle, "Explore More Resources". A crawler that does not
execute JS — which is most of the AI crawlers this site is trying to be cited
by — read a homepage with no section structure: no contact heading, no FAQ
heading, no blog heading, on the single most important page.

Googlebot renders JS, so this was not costing classic rankings. It was costing
the AEO half, which is the half this site has been working on since August.

### Why `revealLazySections` did not already catch it

`scripts/capture-prerendered-bodies.ts` scrolls the whole page specifically to
trip observers like this one (added after LazySection placeholders shipped as
voids). It works for the routes whose sections mount early. It loses the race
on the homepage: those sections mount as the 500px/140ms scroll passes them,
and the scroll has returned to the top before the heading's own observer gets a
frame. The fix is at the variant, so mount timing stops mattering for every
caller — `SectionHeader` site-wide and `CaseStudySectionHeader`.

### The change

`typewriter.hidden` is now `{ opacity: 0 }` and `typewriter.visible` drops its
`display: "inline-block"`. The per-word `delay: i * 0.09` stagger is untouched
— the stagger is what produces the typed feel; `display` only removed the words
from the layout, which also meant each heading reflowed word by word as it
animated.

### Measured after

- `dist/index.html` 72 → **0** `display: none`; `dist/contact/index.html` 11 → **0**;
  **0** across all 66 built routes.
- The headings now serialise at `opacity: 1` with real text, because once the
  words occupy layout the capture's scroll pass does trip the observers.
- `<h2>` text extracted from the live homepage: all eight headings present with
  real word spaces. Subtitles present in extracted page text.
- **Verified live 2026-11-14 after deploy** (`e72569a3`): `/` 0 hidden,
  `/contact` 0 hidden.
- `npm run typecheck` clean · `npm run build` EXIT:0 · 66/66 routes recaptured,
  no new failures · checked in a browser at 1440px and 375px, animation and
  centring unchanged.

### Left open

- **`/contact` rewrites its own `<title>` after hydration.** The served title is
  "Contact Barsky Design — Product Design & UX Consulting"; a few seconds after
  JS runs the tab reads "Hiram Barsky | Lead UX Designer | Driving Design
  Strategy". That is the retired positioning the hard rules forbid, reappearing
  client-side, and it disagrees with the static title Google indexed. Noticed
  while verifying this change at 375px; not touched, because one change per run.
  Strong candidate for the next FINDABILITY turn — and worth checking whether
  other routes do the same.
- **`opacity: 0` is still the hidden state.** It serialises as `opacity: 1` on
  every route today, but that depends on the capture's scroll pass continuing to
  win. If a future route ships headings at `opacity: 0`, the text is at least
  still in the DOM and the accessibility tree, which `display: none` was not.
- **A stale `vite preview --strictPort 4199` from 2026-11-12 was holding the
  port** the capture script needs. Killed before capturing; had it not been, the
  capture would have run against a two-day-old `dist`. Worth making the script
  fail loudly on a port it did not start.
- Still no analytics behind any of this. Unchanged from the 2026-11-12 note.

## 2026-11-14 (second pass) — FINDABILITY — three names for one entity, one of them retired

Ran on from the flag at the end of the entry above. Hiram asked for the run to
continue rather than stop at one change, so this is a second shipped change in
the same session, not a new rotation turn.

### What the flag turned out to be

The flagged symptom was `/contact` showing "Hiram Barsky | Lead UX Designer |
Driving Design Strategy" in the tab after hydration. Chasing it found the
constant behind it doing something worse and entirely deterministic:

```
og:site_name = "Hiram Barsky | Lead UX Designer | Driving Design Strategy"
```

on **all 66 built pages**, from `scripts/inject-seo-html.ts`. Verified live
before the change on `/`, `/about`, `/contact`, `/blog`, `/services`,
`/project/herbalink`. 74 files in `dist` contained the string.

So the same page was publishing three different names for one entity:

| signal | value before |
|---|---|
| Person schema `jobTitle` | Product Designer & Front-End Developer |
| Organization schema `name` | Barsky Design |
| `og:site_name` | Hiram Barsky \| Lead UX Designer \| Driving Design Strategy |

The 2026-11-11 entity pass fixed "Hiram Barsky Design" vs "Barsky Design" and
left a comment saying so two lines above the Organization name. It did not look
at `og:site_name`, which is the one a social card and an entity extractor
actually label the publisher with. "Lead UX Designer" is also the positioning
the hard rules in `docs/auto-improve-loop.md` explicitly forbid.

### The change

- `og:site_name` → `seo.siteName` → `BRAND` → **"Barsky Design"**, matching the
  Organization schema. Changed in **both** emitters: `inject-seo-html.ts` (what
  a crawler reads) and `UnifiedSEO.tsx` (what the hydrated page sets). Fixing
  only one would have left the served HTML wrong — the first build after
  changing the constant alone proved it, og:site_name was still the old shape.
- `BuiltSEO.siteName` was a dead field nothing read. Both emitters now read it,
  so there is one source of truth instead of a constant quoted in two files.
- `SEO_CONSTANTS.SITE_NAME` is only a `<title>` fallback for a page with no
  `STATIC_PAGE_SEO` entry. Composed now from `AUTHOR` plus the Person schema's
  own `jobTitle`: "Hiram Barsky — Product Designer & Front-End Developer".
  Nothing invented — both halves already existed in the repo.
- `public/manifest.json` carried the same retired string as the PWA `name`;
  `short_name` was "Hiram Barsky | UX Designer". Now the same composed title and
  plain "Hiram Barsky".

### The trailing-slash miss that surfaced it

Netlify serves `/contact` **and** `/contact/` with a 200 — confirmed without
`curl -L` — and GSC has both indexed (the "Alternate page with proper canonical
tag (18)" row in the 2026-09-06 notes above is exactly these pairs). Every key
in `STATIC_PAGE_SEO` is slash-free and `getStaticPageSEO` did an exact lookup,
so the trailing-slash form missed and fell through to the `SITE_NAME` fallback:
retired title, retired `og:title`, generic description. The canonical stayed
correct, because `normalizeCanonicalUrl` strips the slash and this lookup did
not — the same normalisation, present in one place and missing in the other.

Fixed in `getStaticPageSEO`, so every caller gets it including `ContentExport`.
Checked: `/contact/ → /contact`, `/contact → /contact`, `/ → /`,
`/services/ai-product-design/ → /services/ai-product-design`.

**Honest about the evidence.** The live symptom was seen twice — once on a
local `dist` server, once on production `/contact/` — and then would not
reproduce on demand: later loads of `/contact/`, `/about/`, `/store/`,
`/services/` and `/blog/` all kept their correct titles, and a MutationObserver
on `<head>` recorded no title change at all over 10s. So the *timing* of when
the fallback wins is not understood. The lookup miss itself is not in doubt —
it is an exact-key lookup against slash-free keys — and it is now impossible.
No internal link on the site emits a trailing slash (checked all 16 on the
homepage), so the exposure is external links, search results and typed URLs.

### Measured after

- "Lead UX Designer" in `dist`: **74 files → 0**.
- `og:site_name` across all 66 built pages: one value, **"Barsky Design"**.
- Page `<title>`s unchanged — every static page has its own entry and never
  touched the fallback.
- **Verified live after deploy** (`c588be42`): `/`, `/about`, `/contact`,
  `/blog`, `/services`, `/store`, `/project/herbalink` and one blog post all
  serve `og:site_name="Barsky Design"`; 0 occurrences of the retired string;
  `/manifest.json` serves the new name.
- `/contact/` in a browser after hydration: title, `og:title`, description,
  `og:site_name` and canonical all correct.
- `npm run typecheck` clean · `npm run build` EXIT:0. **No recapture** — nothing
  inside `<div id="root">` changed, only `<head>` and the manifest.

### Left open

- **The hydration timing is still unexplained.** Something made the fallback win
  twice and then stop. If a stale title is ever seen again, instrument
  `UnifiedSEO`'s `useMemo` rather than guessing; the lookup is no longer a
  candidate.
- **`og:image:alt` still falls back to `` `${title} preview image` ``** in
  `seoBuilder.ts`, which is a description of a file, not of an image. Small, but
  it is alt text shipped on every page.
- `SkillsShowcase.tsx` is still bot-generated — unchanged from the note above.
