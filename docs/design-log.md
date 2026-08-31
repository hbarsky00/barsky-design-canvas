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

- **2026-08-31 — axe-core contrast sweep, sitewide.** Design was the staler
  half by log (last entry 08-27; the AEO lever ran 08-30), and the 08-30 design
  commit ended by explicitly deferring contrast: its hand-rolled walker returned
  `fg == bg` for elements whose colours it had already verified as different, so
  it recorded no contrast findings and said the job needed axe-core. This run
  ran axe-core 4.10.2 (WCAG 2.0/2.1/2.2 A + AA) against the built site, served
  from `dist/` on 4199, at 375px and 1440px.

  **Method note, because the previous walker was wrong in a specific way.** It
  read `backgroundColor` off the element itself, which is `transparent` for
  almost everything, so it compared a colour against itself. The correct walk
  composites each ancestor's background *with its alpha* until an opaque one is
  reached. axe does this natively; the hand checks in this run do it explicitly.

  **Finding 1 — one cause, 70+ nodes.** `text-primary` on `bg-primary/10`, the
  site's badge/pill, at 16 call sites across 17 files. Primary was
  `hsl(14 68% 44%)` = `#bc4824`; over its own 10% tint it composited to
  **4.17–4.29:1** on every page background, under the 4.5:1 AA wants for the
  12px and 14px text these pills use. Homepage 41 nodes, `/about` 21,
  `/contact` 7, each case study 1.

  Fixed at the token, not the 16 call sites — patching class strings leaves the
  17th pill to fail when someone adds it, and `text-primary` appears 81 times,
  so the sites axe happened to render are not the whole set. `--md-sys-color-primary`
  44% → **41%** lightness, hue and saturation untouched: `#bc4824` → `#b04321`.

  Chosen by computing the ratio against the tint *as it recomposites* —
  darkening primary darkens the background it sits on too, so a naive sweep
  overstates the gain. 42% reaches only 4.47 that way and still fails; 41% puts
  the worst case at 4.64:1. It also lifts white-on-primary buttons 5.13 → 5.75.

  **Finding 2 — `aria-required-children`, critical, one node per page.** The
  footer's social links were `<div role="list">` with `<a>` children directly
  inside; `role="list"` requires `listitem` children. The two real lists in that
  same file are `<ul>`/`<li>`, so the role was the outlier, not the markup.
  Dropped it — two labelled links need no list semantics.

  **Result**, axe against the rebuilt site:

  | route | viewport | before | after |
  |---|---|---|---|
  | `/` | 375 | 42 | **0** |
  | `/` | 1440 | — | **0** |
  | `/about` | 375 | 22 | **0** |
  | `/contact` | 375 | 8 | **0** |
  | `/project/recast` | 375 | 2 | **0** |
  | `/blog` | 1440 | — | **0** |
  | `/blog/a-filter-nobody-opens` | 1440 | — | **0** |

  **Finding 3 — what axe structurally cannot see.** Verifying the above on the
  live site, a hand contrast pass flagged the hero's "See my work" CTA. That
  first looked like the same false positive the 08-30 walker hit, so it was
  checked directly: the button is
  `bg-gradient-to-r from-primary via-primary to-[hsl(32_78%_46%)]` carrying
  white text, and white on the amber end `#d17b1a` measures **3.20:1**.

  It is real, it is pre-existing, and this run's primary change did not cause it
  (that change *improved* the other two stops, 5.13 → 5.72). It survived every
  previous automated pass because **axe marks any element with a
  `background-image` as "incomplete" rather than failing it** — it cannot know
  which pixel the text sits over. On the homepage that is 106 incomplete nodes.
  A gradient button can never be an axe violation regardless of how unreadable
  it is. Worth remembering: "axe reports 0" is not the same as "this page has no
  contrast failures."

  Three variants share that stop — `filled`, `brand`, and the `case-study` hover
  — covering the hero CTA and every "View Case Study" button, which is the
  primary conversion path. 46% → **37%** lightness: `#d17b1a` → `#a86315`,
  **4.70:1**. 38% was tried first and reaches only 4.49. 37% stays ~36 units of
  RGB distance from the primary end, so the gradient still reads as a warm shift
  rather than a flat fill.

  Deliberately not changed: the two `hsl(32 78% 46%)` washes in `index.css`.
  They render at 7–8% alpha as hero-canvas decoration with no text on them, so
  they are not a contrast surface.

  **Verified on barskydesign.pro**, not a local build, after both deploys:

  | check | value |
  |---|---|
  | `--primary` served | `14 68% 41%` |
  | pill elements on `/` | 49, worst **4.55:1** |
  | gradient buttons on `/` | 12, worst **4.71:1** (was 3.20) |
  | footer `div.space-x-4[role="list"]` | **0** |

  `tsc --noEmit` 0, `eslint` 0, build 44/44 prerendered with 0 head-only, both
  times. `capture-bodies` 44/44, 0 failures, twice — the first diff was exactly
  44 files x 1 line (the removed role attribute, nothing else); the second
  because Tailwind arbitrary values live in the class attribute, so 18 snapshots
  carried the old `32_78%_46%` string. Media 395 files in `public`, 395 in
  `dist`, no `.capture-media-stash` left behind. No concurrent writer: a stale
  `vite preview --strictPort 4199` from 08-30 11:57 was killed before starting,
  and no other session touched the repo during the run.

  **Left open:**
  - **The 106 axe "incomplete" contrast nodes on `/` alone.** Every one is an
    element over a background-image or gradient. Only the buttons were resolved
    here. The rest — cards over gradient washes, text over the hero canvas —
    have never been measured by anything, and no future axe run will flag them.
    They need the hand walk, and it should probably become a script in
    `scripts/` rather than being re-derived each run.
  - **axe was run on 7 routes, not all 44.** Homepage, about, contact, one case
    study, blog index and one post. Both fixes are token-level and so apply
    everywhere, but the *other* page types were never scanned for defects of
    their own — `/services`, `/design-services`, `/store` in particular.
  - `--md-sys-color-on-primary-container` is `231 100% 8%` and
    `--md-sys-color-primary-container` is `231 100% 96%` — hue 231 is blue,
    left over from a palette this site no longer uses, sitting in a hue-14
    system. Nothing visibly reads them today, which is why it has gone
    unnoticed, but they are wrong and will render blue the moment something does.
  - `<meta name="theme-color" content="#3B82F6">` in `index.html` is that same
    dead blue. It is what mobile browsers tint their chrome with, so unlike the
    tokens above it *is* user-visible, on Android Chrome. Not touched here —
    it is a one-line change but it is a brand decision, not a contrast fix.
  - The stale comment above the primary token claimed "Deep Blue with
    Sophisticated Purple Undertones". Corrected to describe the actual colour,
    with the 4.5:1 reasoning written in so a future run does not raise it back.
