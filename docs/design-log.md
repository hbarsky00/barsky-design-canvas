# Design log — barskydesign.pro

Companion to `docs/aeo-log.md`. The auto-improve loop splits effort ~50/50
between SEO/AEO and design; this log is the design half's memory. One
substantial improvement per run, measured before and after.

Improve **within** the established visual language — the remapped radius scale
in `tailwind.config.ts` (`rounded-xs` 4px, `rounded-sm` 8px, `rounded-md` 12px,
`rounded-lg` 16px), the existing brand tokens, Space Grotesk display / Inter
body. Fix what is measurably broken. Do not redesign what works.

## Runs

- **2026-08-22 — mobile tap targets, sitewide.** First design run of the loop
  (the AEO half had two runs, this had none, so design was the stale half).

  **Diagnosed** against the live site at 375×812 in the browser, scripted over
  `a, button, [role=button], input, select, textarea, summary`, excluding
  zero-size, `display:none`/`visibility:hidden` and `sr-only` elements:

  | page | interactive | < 24px (WCAG 2.2 AA SC 2.5.8 fail) | < 44px |
  |---|---|---|---|
  | `/` | 60 | 11 | 25 |
  | `/services` | 21 | 7 | 11 |

  The seven WCAG failures on `/services` were **all** footer navigation links —
  bare inline `<Link>`s with no padding, 20px tall. The footer renders on every
  page, so that was a sitewide SC 2.5.8 failure, not a one-page nit. The
  homepage added four more: the `View Live` links in the case-study cards, also
  20px.

  **Changed** (padding and hit-area only — no type, colour or layout redesign):
  - `Footer.tsx` — the seven nav links went from bare inline to
    `inline-block py-3 px-2 -mx-2`, which makes each 44px tall and 16px wider
    than its text while leaving the text itself at exactly the same x/y (the
    negative margin cancels the padding). `inline-block` rather than
    `inline-flex` so `hover:underline` keeps working. Both `<ul>`s went
    `space-y-3` → `space-y-0` because the 44px boxes now supply the rhythm;
    without that the footer would have grown ~84px per column instead of ~50px.
  - `Footer.tsx` — the email and phone links got `py-3` only, no `px-2 -mx-2`.
    They sit in `flex items-center gap-2` rows next to an "Email:" / "Phone:"
    label, so a `-ml-2` would have cancelled the 8px gap and jammed the value
    against its label. They were already well over 44px wide; only height was
    short.
  - `Footer.tsx` — LinkedIn/GitHub icons `p-2` → `p-2.5` (24px icon + 20px
    padding = 44px, was 40px).
  - `hero/CleanHero.tsx` — the three hero social icons `p-2.5` → `p-3` (20px
    icon + 24px padding = 44px, was 40px).
  - `home/VideoCaseStudiesSection.tsx` — `View Live` got
    `min-h-[44px] px-2 -mx-2`, which also aligns it vertically with the
    `View Case Study` button beside it.

  **Also, same file, one line:** the footer tagline read "Product Designer &
  Gen AI Developer creating intelligent, user-centered digital experiences."
  That is the retired positioning the loop's hard rules forbid, and it was
  sitting on every page. Replaced with the settled sentence: "I design and
  develop SaaS, web apps, mobile apps and internal tools." No invented facts.

  **Result** — same script, same viewport, against the deployed site:
  `/` 11 → 0 WCAG failures, 25 → 10 under 44px. `/services` 7 → 0 and 11 → 4.
  Remaining sub-44px elements are all ≥ 24px and pass SC 2.5.8.

  **Left open:**
  - Case-study title links in the homepage cards are 31px tall. They pass
    SC 2.5.8 (≥24px) but miss the 44px comfort target. Growing them means
    touching heading line-height, which is a type decision, not a padding one —
    deliberately not done unilaterally.
  - `About.tsx` still carries "15+ years of experience in UX/UI design,
    combined with modern AI development skills" — the same retired positioning
    as the footer tagline, in a longer paragraph that needs a real rewrite
    rather than a swap. Flagged for the next content-oriented run.
