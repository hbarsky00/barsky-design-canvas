# Performance / Core Web Vitals — score 45/100

**Measured, not estimated.** Lighthouse ran locally via the skill's bundled
Chromium across 28 routes, mobile emulation with standard throttling. The
PageSpeed Insights API was rate-limited (240 QPM / 25,000 QPD exhausted) and
CrUX returned nothing, so there is **no field data** here — these are lab
numbers. Real-world figures on a fast connection will be better. The byte
weights, however, are absolute and not throttling-dependent.

**Provenance note:** the `unlighthouse_run.py` wrapper reported
`unlighthouse timed out after 600s` and returned `ok: false`. The underlying
Lighthouse runs completed regardless and wrote **28 full reports** to
`lighthouse/reports/`, which is where every number below was read from. The
wrapper's timeout is a harness limit, not a failed measurement — but the
distinction is worth stating rather than presenting the run as cleanly
successful.

## What works
- **CLS is 0.000 on 24 of 28 routes.** Near-perfect layout stability. Worst is
  `/project/email-creation-ai` at 0.159. The width/height attributes added to
  images are doing their job.
- **TBT is 0 ms on every route except the homepage** (260 ms). Almost no main-thread blocking.
- **Lighthouse SEO scores 100** on 25 of 28 routes.
- **Accessibility 93–95** across the board.

## Findings

### 1. Homepage LCP is 29.6 s and the page weighs 7,236 KiB — Critical
**Evidence (measured):**

| Asset | Size |
|---|---|
| `/images/catchbuddy-hero-landing.png` | **2,570 KB** |
| Loom CDN thumbnails (4 files) | 2,237 KB |
| `/images/dae-search/hero.jpg` | 619 KB |
| `/images/hiram-barsky-profile.png` | 493 KB |
| GTM `gtag/js` | 168 KB |

Performance score 56. LCP element is the hero `<img>`.

**Fix, in order of payoff:**
1. `catchbuddy-hero-landing.png` is 2.5 MB of PNG doing a photograph's job. WebP at quality 82 should land near 150–250 KB. **This one asset is ~35% of the page.**
2. `dae-search/hero.jpg` → WebP saves a measured 528 KB.
3. The Loom thumbnails are third-party, oversized (562 KB and 510 KB wasted on two of them), and outside your control. Self-host optimised posters instead.

### 2. A 493 KB PNG is used where a 99 KB WebP already exists — High
**Evidence:** `<img src="/images/hiram-barsky-profile.png">` appears **twice in the real DOM** on the homepage (inside `aspect-video` cards), separate from 2 references in JSON-LD which are not fetched. `hiram-barsky-profile.webp` (99 KB) is the same photograph and is already the hero's LCP element.
**Fix:** point those cards at the `.webp`. One-line change, saves ~400 KB.

### 3. LCP fails Core Web Vitals on every single route — High
**Evidence:** best route is `/design-services/ux-ui-design` at 4.6 s. Worst non-homepage are `/project/catchbuddy` 19.9 s, `/project/investor-loan-app` 14.5 s, `/blog` 10.5 s. The "good" threshold is 2.5 s. **Zero routes pass.**
**Note:** lab numbers under throttling. Get real field data before panicking about the absolute values — but the ranking between pages is reliable, and the byte weights behind it are real.

### 4. Google Fonts blocks rendering for 796 ms — Medium
**Evidence:** `fonts.googleapis.com/css2?family=Space+Grotesk...` is 1 KB but costs 796 ms render-blocking. The local CSS bundle adds 473 ms.
**Fix:** self-host the two font families, or add `media="print" onload="this.media='all'"` to make the stylesheet non-blocking with a `<noscript>` fallback.

### 5. 92 KB unused JavaScript, 26 KB unused CSS — Low
Worth ~470 ms and ~160 ms respectively. Real, but an order of magnitude behind the images.
