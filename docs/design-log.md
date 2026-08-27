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

- **2026-08-27 — blog reading measure, all 22 post routes.** Design was the
  staler half (design last ran 2026-08-22, AEO 2026-08-23), and 22 blog routes
  plus a new case study had shipped on 08-25 with no design pass over them.

  **Diagnosed first, and the SEO half came back clean**, which is why this run
  went to design: `seo_audit_all_routes.py` reported `PROBLEMS: 0` across all 41
  routes (title, description, OG image, canonical, 0 shared OG cards), the
  sitemap carried all 41 URLs, and schema was healthy — `BlogPosting` +
  `BreadcrumbList` on posts, `Article` on projects, `FAQPage` on `/`.

  **Measured line length** (`characters ÷ rendered lines`, paragraphs over 200
  chars, on `/blog/taste-is-the-whole-job`):

  | viewport | column | font | chars/line | target |
  |---|---|---|---|---|
  | 375px | 277px | 18px/32 | **31** | 35–45 mobile |
  | 1440px | 734px | 18px/32 | **72–84** | 45–75 |

  Wrong at *both* ends from one cause: a fixed `max-w-4xl` shell, `prose-lg`
  pinned at 18px regardless of viewport, and `p-8 lg:p-12` with no mobile
  step-down — 96px of horizontal padding on a 375px screen, 26% of the viewport.

  **Changed** — no new visual language; the case-study layout
  (`StructuredCaseStudySection.tsx`) already ships `p-3 sm:p-8 lg:p-12`, so the
  blog just never got the responsive step the rest of the site has:
  - `pages/BlogPost.tsx` — `p-8 lg:p-12` → `p-5 sm:p-8 lg:p-12`.
  - `pages/BlogPost.tsx` — `max-w-4xl` → `max-w-3xl` on the article shell. This
    is what fixes the desktop end; nothing else was over-wide.
  - `pages/BlogPost.tsx` — both `prose prose-lg` → `prose sm:prose-lg`, and the
    lead paragraph `text-xl` → `text-lg sm:text-xl`. 16px/28 on phones, 18px/32
    from `sm:` up.
  - `blog/InternalLinkEnhancer.tsx` — a **third** `prose prose-lg` wrapper lives
    here and renders the actual article body. Missing it left the body at 18px
    while the two outer wrappers had already stepped down; found by walking the
    computed-style chain, not by reading the JSX. Now `prose sm:prose-lg`.
  - `blog/InternalLinkEnhancer.tsx` — related-posts grid
    `md:grid-cols-2 lg:grid-cols-3` → `sm:grid-cols-2`. Narrowing the shell had
    squeezed those cards to 186px; this is a fix for a regression this run
    introduced, not a second improvement.

  **Result**, same method, against the rebuilt site, confirmed on two posts:

  | viewport | column | font | chars/line |
  |---|---|---|---|
  | 375px | 301px | 16px/28 | **35–40** |
  | 1440px | 606px | 18px/32 | **57–71** |

  No horizontal overflow at either width. Related-post cards 186px → 291px.
  `npx tsc --noEmit` clean, `npm run build` clean at 41/41 prerendered.
  Recaptured all 41 routes (0 failures — `/projects` stayed resolved) and
  re-verified in the **built** HTML, not the source: all 22 `dist/blog/*` carry
  `prose sm:prose-lg`, `grid sm:grid-cols-2`, `p-5 sm:p-8 lg:p-12` and
  `max-w-3xl`, with 0 stale occurrences of the old classes.

  **Checked and deliberately not acted on: dark mode.** A forced `.dark` class
  shows real failures on blog posts — `text-gray-900` on the dark surface at
  **1.02:1**, in-body links at 2.97:1, 14 hardcoded `gray-*` classes with no
  `dark:` variant. None of it is user-reachable: `ThemeToggle.tsx` is a no-op
  ("theme is forced to light via ThemeProvider") and the one
  `prefers-color-scheme: dark` block in `index.css` only restyles two decorative
  gradients. Measured in the theme users actually get, blog posts have **zero**
  contrast failures — the tag pills composite to 4.95:1. Recording this so a
  future run does not spend itself fixing a dead code path.

  **FLAGGED — a second session was writing this repo throughout this run**, the
  same collision as 2026-08-23, and it happened again anyway because nothing
  enforces the rule. It ran `capture-prerendered-bodies` concurrently with mine,
  modified `.gitignore`, and swept my in-progress edits into two commits of its
  own: `BlogPost.tsx` into `7e4bc3e2 "Fix button labels vanishing on hover"`
  (already pushed), and `InternalLinkEnhancer.tsx` into `e3bfca30 "Make the blog
  prerenders agree with the component that generates them"` — whose message
  reasons about my half-finished edits as though they were pre-existing repo
  state, because it could not know another agent was mid-change. The work is
  correct and verified, but **none of this run's rationale is in its own commit**;
  this log entry is the only record. Also cost real time: a `prepareOutDir` build
  failure and a snapshot set that dropped to "7 prerendered, 34 head-only"
  mid-run were both that session's capture racing mine over `dist/` and
  `vite preview --strictPort 4199`.

  **Left open:**
  - `prose prose-lg` is still fixed-size in ~25 other places (project sections,
    case-study sections, `About`, `ServicePage`, `SeoFaqSection`). Those sit in
    different containers with different widths, so they need measuring on their
    own terms rather than a find-and-replace. The blog was the acute case.
  - `components/blog/BlogPostPage.tsx` is a dead duplicate of
    `pages/BlogPost.tsx` — same component name, imported by nothing
    (`/blog/:slug` routes to `pages/BlogPost.tsx`). It still carries the old
    `p-8 lg:p-12` and `prose prose-lg`. Left alone: deleting is out of scope for
    a design run, but it will keep showing up in greps and inviting edits to a
    file that never renders.
  - **FLAGGED, content not design:** `/blog/what-one-person-can-ship-now` says
    "I have four products live that I built by myself" twice. The loop's hard
    rules enumerate five live products (firelion.me, catchbuddy.fit,
    herbalink.live, stips.bet, ringrival.today). Either the post is stale or the
    count is deliberately a subset — that is Hiram's call, not a silent edit.
  - Breadcrumbs on posts wrap "UX Design Blog" onto two lines at 375px while the
    truncated title sits beside it. Cosmetic, pre-existing, not touched.
