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
