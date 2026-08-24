# Action Plan — barskydesign.pro

Ordered by measured impact per unit of effort.

## Phase 1 — Critical (this week)

**1. Convert `catchbuddy-hero-landing.png` to WebP** — 2,570 KB → ~200 KB
Single highest-impact change on the site: ~35% of homepage weight in one file.
Referenced from `VideoCaseStudiesSection.tsx`, `RelatedProjects.tsx`,
`FeaturedCaseStudiesSection.tsx`, `designServices.ts`.
*Effort: 15 min · Impact: very high*

**2. Point the homepage cards at the WebP profile photo** — ~400 KB
`<img src="/images/hiram-barsky-profile.png">` appears twice in the real DOM
while the 99 KB `.webp` already exists and is the hero's LCP element.
*Effort: 5 min · Impact: high*

**3. Convert `dae-search/hero.jpg` to WebP** — 528 KB measured saving.
*Effort: 10 min · Impact: high*

**4. Audit every remaining PNG/JPG over 200 KB.** These three were found on one
page; the same problem almost certainly exists on case-study pages that were not
in the Lighthouse sample.
*Effort: 1 hr · Impact: high*

## Phase 2 — High (next two weeks)

**5. Replace Loom CDN thumbnails with self-hosted posters** — 2,237 KB across
four files, two of them wasting 562 KB and 510 KB. Third-party, oversized, and
outside your control.
*Effort: 1 hr · Impact: high*

**6. Unwrap the `blog` LazySection.** Links and cards, cheap to render, and it is
how a crawler discovers the writing. Leave `contact` and `adventures` wrapped —
those carry form libraries and media, so that is a real trade to decide
deliberately, not a free win.
*Effort: 20 min · Impact: medium-high (crawl + AEO)*

**7. Name the current AI crawler tokens in robots.txt** — `ClaudeBot`,
`Claude-User`, `OAI-SearchBot`, `Google-Extended`. All are allowed today via the
wildcard, so nothing is blocked; this removes ambiguity and drops the deprecated
`anthropic-ai` token.
*Effort: 5 min · Impact: medium*

**8. Self-host Space Grotesk and Inter** — 796 ms of render-blocking.
*Effort: 45 min · Impact: medium*

## Phase 3 — Medium (this month)

**9. Enforce CSP.** Review the reports collected by the `csp-report` function,
then change the header name. It protects nothing while report-only.

**10. Add `BreadcrumbList` to case studies.** Blog posts already have it; case
studies are the more commercially valuable pages and do not.

**11. Deepen `/store`** — shortest body on the site at 22,726 bytes.

**12. Differentiate the three `/design-services/*` pages** or consolidate them
into `/services` and redirect.

## Phase 4 — Ongoing

**13. Get real field data.** Everything above is lab measurement; PSI was
rate-limited and CrUX returned nothing. Connect Search Console and check CrUX
once traffic supports it — the absolute LCP numbers need field confirmation even
though the byte weights behind them are certain.

**14. Let the loop keep running.** It already retired `/projects` (which was
serving an empty `#root` to crawlers at the site's second-most-linked URL) and
fixed a sitewide WCAG 2.2 tap-target failure in the footer.
