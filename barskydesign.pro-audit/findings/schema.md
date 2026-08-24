# Schema / Structured Data — score 95/100

Measured against the live site, 15 pages sampled.

## What works
- **Every page carries 3+ valid JSON-LD blocks.** Zero parse errors across all 15 sampled pages.
- **No duplicate `@type` on any page.** The layering is deliberate and correct: `LocalBusiness` + `WebSite` + `WebPage` + `Organization` sitewide, `BlogPosting` + `BreadcrumbList` added on posts, `Article` on case studies.
- **FAQPage matches its visible content exactly** — 8 schema questions, 8 present in the served body with script tags excluded. This was two competing blocks (3 questions in head vs 8 injected inline) until 2026-08-22.
- **`priceRange` is consistent at `$$$`** across `/`, `/about` and `/contact`. It was silently shipping as `$$` until the `String.replace()` `$`-expansion bug was fixed the same day.
- **Blog posts carry `BreadcrumbList`** — not present on case studies.

## Findings

### ~~1. FAQPage appears on /projects~~ — RETRACTED, measurement error
I recorded this from a `curl -L` fetch. `-L` follows the redirect, so I was
reading the homepage and attributing it to `/projects`. Verified without `-L`:
`/projects` returns **301 -> https://barskydesign.pro/#case-studies`**. Only the
homepage emits `FAQPage`, which is correct.

This is the same `-L` mistake that produced a false soft-404 finding earlier the
same day — worth a permanent note: never measure a redirect with `-L`.

### 2. Case studies have no BreadcrumbList — Low
**Evidence:** `/project/herbalink`, `/project/stips`, `/project/ring-rival` emit `Article` but no `BreadcrumbList`; blog posts emit both.
**Why it matters:** breadcrumbs render in mobile SERPs and clarify hierarchy. Blog posts already get this; case studies are the more commercially valuable pages and do not.
**Fix:** emit `BreadcrumbList` for `kind: 'project'` the same way it is emitted for posts.
