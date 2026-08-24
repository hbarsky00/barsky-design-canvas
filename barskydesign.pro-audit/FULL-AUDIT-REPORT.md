# barskydesign.pro — Full SEO Audit
**Date:** 2026-08-23 · **Business type:** Agency / solo consultancy portfolio
**Method:** live-site measurement. Lighthouse ran locally over 28 routes via bundled Chromium; schema, claims and crawlability checked against served HTML.

## SEO Health Score: 83/100

| Category | Weight | Score | Verdict |
|---|---|---|---|
| Content Quality | 23% | 88 | Strong |
| Technical SEO | 22% | 90 | Strong |
| On-Page SEO | 20% | 98 | Excellent |
| Schema | 10% | 95 | Excellent |
| **Performance (CWV)** | 10% | **45** | **Needs work** |
| AI Search Readiness | 10% | 78 | Decent |
| **Images** | 5% | **35** | **Needs work** |

The score flatters the site. On-page, schema and content are genuinely in good
shape — those took the work of the last two days and it shows. **Everything
holding it back is weight on the wire.**

## Top 5 issues

1. **Homepage is 7,236 KiB with a 29.6 s LCP.** One PNG is 2.5 MB of it.
2. **A 493 KB PNG renders where a 99 KB WebP of the same photo already exists** — twice, on the homepage.
3. **LCP fails Core Web Vitals on all 28 routes.** Best is 4.6 s; threshold is 2.5 s.
4. **Three homepage sections are absent from the served HTML** — `adventures`, `contact`, `blog`, replaced by 3 pulse placeholders. Invisible to any crawler that doesn't run JS.
5. **robots.txt names the deprecated `anthropic-ai` token** but not `ClaudeBot`, `Claude-User` or `OAI-SearchBot` — the last being the crawler behind ChatGPT search citations.

## Top 5 quick wins

1. Convert `catchbuddy-hero-landing.png` to WebP. **~2.3 MB off the homepage from one file.**
2. Point the two homepage cards at `hiram-barsky-profile.webp`. One line, ~400 KB.
3. Convert `dae-search/hero.jpg` to WebP. 528 KB, measured.
4. Name the four missing AI crawler tokens in robots.txt. Costs nothing.
5. Flip CSP from report-only to enforced. One word, once the reports are clean.

## What is genuinely strong

- **Zero surviving invented claims.** 14 removed patterns swept across 15 live pages: `40%+`, `47+ projects`, `60% faster`, `24-hour response`, `WCAG 2.1 AA certified`, `$150-250/hour`, `nine live products`. **0 hits.** The honesty work held.
- **CLS is 0.000 on 24 of 28 routes.** TBT is 0 ms on 27 of 28.
- **On-page is complete**: 31/31 routes carry title, description, canonical, og:title, og:description, og:image and twitter:image, every card verified present at 1200×630, zero shared cards.
- **Schema is clean**: 3+ valid JSON-LD blocks per page, zero parse errors, no duplicate `@type`, and the homepage `FAQPage` matches its visible content 8/8.
- **E-E-A-T is real and falsifiable**: named author, verifiable employer history, five live products anyone can open, and a case study that openly states its directory is empty.

## Corrections made during this audit

Two findings were retracted before publication rather than shipped wrong:
- **`/projects` emitting a stray FAQPage** — false. Measured with `curl -L`, which follows the redirect, so I was reading the homepage. `/projects` correctly returns `301 → /#case-studies`.
- The same `-L` error produced a false "soft 404" finding earlier the same day. Recorded permanently in the loop playbook: **never measure a redirect with `-L`.**

Five delegated specialist agents were launched and all five hit a tool-use cap
and stopped mid-work without writing findings. Everything above was measured
directly instead.
