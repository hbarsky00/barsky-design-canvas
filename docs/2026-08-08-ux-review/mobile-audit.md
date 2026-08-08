# Mobile audit — all case studies + all blog posts
**Date:** 2026-08-08 · **Viewport:** 375×812 (spot checks at 360 and 320 for the hero fix earlier tonight) · **Method:** per-page DOM measurement (horizontal overflow, element-level off-viewport checks, broken/dead media, missing alt, h1 count, unnamed controls) — more reliable in this environment than screenshots.

## Pages audited (20)
**Case studies (10):** ring-rival, herbalink, business-management, investor-loan-app, catchbuddy, email-creation-ai, fire-lion, crypto, dae-search, splittime
**Blog posts (10):** all slugs in blogData.ts

## Result
18 of 20 pages were fully clean: no horizontal scroll, no clipped elements, exactly one h1, all images have alt text, no broken media. The blog posts are uniformly solid on mobile (20px body text, clean margins).

Everything found wrong traced to one root cause: **the dead barskyux.com domain** (and one deprovisioned Supabase project). The domain doesn't resolve at all — every asset still referencing it is broken for every visitor.

## Fixed
1. **Blue Sky hero video** (`structuredCaseStudies.ts`) — pointed at dead barskyux mp4; only its poster ever showed, and every visit fired failed network requests. Dropped the video so the hero renders the local poster image directly. Re-add a `heroVideo` when a real file exists.
2. **"More Work" preview** (`SingleCaseStudyPreview.tsx`, bottom of Blue Sky page) — its hardcoded HerbaLink/SplitTime entries used dead barskyux images AND videos, and still carried pre-honesty-pass copy ("3x More Bookings", "-40% Conflict Reduction") scrubbed everywhere else in July. Synced to the honest homepage-card copy with local images.
3. **Annotation tooltips clipping off-screen** (`AnnotatedImage.tsx`, Blue Sky mobile) — always-visible 192px tooltips centered on their dot ran off-viewport when a dot sat near an image edge (measured 22px off-screen left). Tooltips near an edge now anchor inward; arrow follows.
4. **Dead SEO/hero images in case-study data** — crypto (deprovisioned Supabase URL ×2, plus a heroVideo whose local mp4 doesn't exist), herbalink (dead barskyux seoData image + hero video), splittime (dead barskyux hero image, and its seoData image was *HerbaLink's* promo on a dead host). All now local assets.

Verified after fixes: Blue Sky at 375px has zero dead-host requests, zero off-viewport elements, no horizontal scroll, hero renders `/images/business-management/hero-three-laptops.jpg`.

## Reported only (no live impact — dead code / unrendered data)
- ~26 remaining barskyux.com refs in `structuredCaseStudies.ts` sit in content sections of crypto/herbalink/splittime entries that **no route renders** (those pages use inline `SimpleCaseStudyPage` content with local images). Harmless today; clean up if those entries ever get re-wired.
- `Hero.tsx`/`HeroLogo.tsx`, `MinimalHero.tsx`, `ModernProjectImage.tsx` (via `ModernProjectDetail`/`CleanProjectDetail`) all contain dead barskyux video URLs but are unreachable from any route — dead-code removal candidates.
- Footer/inline text links are under 24px tall site-wide (WCAG 2.5.8 inline exception applies; cosmetic).
