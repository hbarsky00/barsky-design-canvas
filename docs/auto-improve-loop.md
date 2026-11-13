# Autonomous improvement loop — barskydesign.pro

Authorised by Hiram 2026-08-22: run every 2 days, **do not ask him anything**,
publish when the work verifies. Split roughly **50/50 between SEO/AEO and
design** — his words. Alternate the emphasis each run so neither half rots.

Repo: `~/Documents/barsky-design-canvas` · Live: https://barskydesign.pro
Deploy: `git push origin main` → Netlify `incredible-griffin-66e664` auto-builds.

## Each run, in order

1. **Read `docs/aeo-log.md`.** It carries the lever rotation and the
   flagged-facts list. Read `docs/design-log.md` and `docs/research-log.md`
   too (create if missing).
2. **Pick this run's lens.** Four lenses rotate — FINDABILITY, CRAFT, FLOW
   and RESEARCH. Read the logs and run whichever has gone longest without a
   turn. See "The four lenses" below. Over any eight runs that keeps Hiram's
   50/50 split roughly honest: two findability-ish lenses (FINDABILITY,
   RESEARCH) against two craft-ish ones (CRAFT, FLOW).
3. **Diagnose before touching anything.** Deterministic checks beat opinions:
   - `python3 scripts/seo_audit_all_routes.py` (in this repo) for
     title/description/OG across every built route
   - `node scripts/check-content-dates.mjs` — declared `modified` in
     `seoData.ts` vs git, per route. Those dates feed `dateModified` and the
     sitemap's `<lastmod>` and are hand-maintained, so they drift (added
     2026-09-13 after all 13 case studies were found a rewrite behind). A
     STALE row means look at the commit; a style-only commit goes in the
     script's `STYLE_ONLY` set, a copy change bumps the date.
   - the `amazing-seo-skill` checkers in
     `~/Documents/.claude/skills/amazing-seo-skill/scripts/` for schema,
     links, images, security headers
   - the `claude-seo` skill (`/seo audit <url>`, installed 2026-08-22 at
     `~/.claude/skills/seo`, v2.2.4) and its 30 sub-skills — seo-technical,
     seo-schema, seo-geo, seo-content, seo-images, seo-sitemap and the rest.
     It carries its own Chromium, so it can measure Core Web Vitals for real
     rather than inferring them. Use it and `amazing-seo-skill` together and
     reconcile where they disagree; neither is automatically right
   - for CRAFT and FLOW: build, open the preview, and actually look — at
     375px, 768px and 1440px. **This site has no dark theme and never will.**
     Do not add a toggle, do not "solve" a token for dark, and watch for any
     library that defaults to `theme="system"`.
4. **Do ONE substantial thing.** Not ten small ones. A run that ships one real
   improvement with proof beats a scattershot diff nobody can review.
5. **Verify it.** `npx tsc --noEmit` clean, `npm run build` clean, and the
   change confirmed in the built output — not just in the source.
6. **Re-capture if visible copy changed.** `npm run capture-bodies`, then
   `npm run build` again. Skipping this means crawlers keep seeing the old
   snapshot. Check the route count in the output; investigate any new failures.
7. **Commit, push, verify live.** Poll the live URL until the change appears,
   then confirm it with a real request. Never report "done" off a local build.
8. **Append to the log** — what changed, what was measured, what is still open.

## Hard rules

- **Never invent a fact.** Especially these three, still unconfirmed:
  - Hourly rate. The old FAQ published "$150-250/hour" with nothing behind it.
    The pricing answer now says rates depend on scope. Do not put a number back.
  - WCAG credential. "WCAG 2.1 AA certified" was a credential claim; it now
    reads "I build to WCAG 2.1 AA", a practice. Do not upgrade it again.
  - Blue Sky's numbers (45% vs 35%, and 68% vs the 92% its own detail implies).
  If a change needs one of these, write it in the log as FLAGGED and move on.
- **No invented metrics of any kind.** No conversion percentages, no project
  counts, no client outcomes that do not trace to something in this repo. The
  2026-07-15 honesty pass and the 2026-08-22 sweep both existed because this
  site had accumulated exactly that. Do not regress it to look productive.
- **Never delete case-study content** — images, sections, or copy — without
  Hiram. Adding and improving is fine. Removing is not.
- **Five products are live**: firelion.me, catchbuddy.fit, herbalink.live,
  stips.bet, ringrival.today. Not nine. splittime.pro is dead and SplitTime is
  hidden; business-management is retired. Verify before citing a count.
- **Positioning is settled**: "I design and develop SaaS, web apps, mobile apps
  and internal tools." Not "Lead UX Designer", not "AI-first products". Job
  titles stay only where they describe real history (past employers, per-project
  roles).
- **Redirects live in `public/_redirects`**, which Netlify processes BEFORE
  `netlify.toml`, and its `/*` catch-all is the last line. A rule that exists
  only in `netlify.toml` will never fire for a path `_redirects` does not name.
- **Measure redirects without `curl -L`.** `-L` follows the hop and reports the
  destination's status, which will tell you a working 301 is a 200.
- **Log every run, including a run that changes nothing.** Append a dated line
  to the lens's log even when the honest answer is "measured, found nothing
  worth shipping". Four routine runs in Sept/Oct 2026 were recorded as
  "succeeded" after three seconds and left no trace anywhere, so seven weeks
  passed with nobody able to tell the loop had stopped working. A silent run
  and a dead run have to look different.
- **barsky.design is retired.** Since 2026-11-12 it 301s wholesale to this
  site and all 12 of its unique pages were ported here. Never add content
  there, never link to it, never "fix" it. One entity, one domain.
- **Do not touch** `~/Documents/barskydesign` (different site, different skill)
  or reconnect the Stips repo to bolt.new.

## The four lenses

One per run. FINDABILITY logs to `docs/aeo-log.md`; CRAFT and FLOW both log to
`docs/design-log.md`, each line prefixed `CRAFT —` or `FLOW —` so the rotation
can be read off it; RESEARCH logs to `docs/research-log.md`. No fifth log file.

The point of separating the lenses is that they fail differently: a page
can be perfectly findable and still feel cheap, it can look expensive and
still give a founder nowhere to click, and it can do all three well while
answering a question nobody outside this repo is asking.

### FINDABILITY — can he be found and cited?
The SEO/AEO half. Deterministic checkers first, opinions never. Schema, titles
and descriptions, internal links, image dimensions, headers, sitemap lastmod,
Core Web Vitals, llms.txt. Tools listed in step 3 above.

### CRAFT — does it look like a studio shipped it?
Invoke the **`bencium-innovative-ux-designer`** skill, reframed as
CRITIQUE-THEN-FIX. This is a live portfolio that works, not a greenfield
redesign: sharpen within the established language, never restyle. Everything in
"Design half" below governs this lens.

### FLOW — can a founder actually get from landing to contacting?
Invoke the **`ux-review`** skill (usability heuristics + WCAG + interaction
states). Pick one real journey and walk it: homepage to a case study to
contact; a service page to contact; a blog post to anything at all. Check the
states, not just the happy path — loading, empty, error, success, and whether
every overlay has an escape hatch. Findings must name the step that loses the
visitor, not list heuristic scores.

For the credibility question specifically — does trust build across a visit, or
does every page restart from zero — the **`relationship-design`** skill
(Agentic UX Design, relationship-centric interfaces) is the right lens. Use its
trust-evolution thinking on the *existing* site: what a first-time visitor knows
after one page versus three, what proof arrives in what order, what the site
remembers. It is **not** a mandate to add an AI assistant, a chatbot or a
memory feature to a portfolio. Judgement, not features.

### RESEARCH — is the site answering the question buyers actually ask?
The outside-evidence lens, and the only one that looks past our own HTML.
Invoke **`competitor-analyst`** and **`ux-researcher`**, and **`ux-review`**
where a finding needs a heuristic read of a specific screen.

Where the other three lenses measure the site against itself, this one asks
what a founder compares it against before booking a call, and what they filter
on first. Desk research only — nobody is recruiting participants for a
portfolio — so the inputs are live job postings and hiring guidance in this
market, what competing independent designers put above the fold, review-site
and forum language about hiring designers, and deterministic checks of our own
claims (does that link still 200? is that date still true?).

Hard requirements, because this is the lens most able to invent things:
- **Every external claim carries a URL.** Label findings `Confirmed`,
  `Likely` or `Hypothesis`, and never promote one tier without new evidence.
- **Check our own claims against reality, not against the repo.** The
  2026-11-12 run found a homepage section stamped "Last Updated Friday
  September 19th, 2025" promising "I keep this section updated" — fourteen
  months stale, sitting between the work and the CTA. Nothing in the repo was
  broken; the page was simply lying about the date. Dates, counts, "now" and
  "currently" are where this rots, so grep for them.
- **A run ends in a shipped change or an explicit "no change, here is why".**
  Research that never reaches the site is a blog post for an audience of one.

## Design half — what "better" means here

Use the `bencium-innovative-ux-designer` skill's judgement, but this is a live
portfolio that is working, not a greenfield redesign. Improve within the
established language: the Material-derived radius scale in `tailwind.config.ts`
(`rounded-xs` is 4px, `rounded-sm` is 8px — NOT the Tailwind defaults), the
existing brand tokens, Fraunces display / IBM Plex Sans body (corrected
2026-08-31 — this said Space Grotesk / Inter, fonts the site does not use).

Good design work for this loop: fixing what breaks in dark mode, mobile layout
that crowds or clips, motion that ignores `prefers-reduced-motion`, contrast
below 4.5:1, touch targets under 44px, images without dimensions causing shift,
a section that reads as filler. Hiram cares about this specifically — he has
called out rounded corners cropping images, heroes that do not fill the
viewport, and sections that feel "boring and stagnant".

Not good: redesigning something that already works because a checklist said so.
He has pushed back hard on unrequested changes. One deliberate improvement,
verified in the browser at 375px and 1440px in both themes, then stop.

## Permissions

`.claude/settings.local.json` in this repo pre-approves everything this loop
needs — build, capture, tsc, the audit scripts, git through `push origin main`,
and curl for live verification — so an unattended run does not stop on a
permission prompt with nobody there to click it. It is gitignored: this repo is
public and the file is machine-specific.

It also has a `deny` list. Force-push, `reset --hard`, `rm -rf` and any change to
the git remote are blocked outright. An unattended agent should never be able to
do those, and bolt.new force-pushing over the Stips repo is the reason that is
not hypothetical.

If a run ever does pause on a prompt, the durable fix is to hit "Run now" on the
task once from the Scheduled sidebar — approvals granted during a run are stored
on the task itself and reused by every future run.

## Known-open items

- ~~`LazySection` gates children behind an IntersectionObserver, so anything
  inside it is absent from the prerendered HTML.~~ **Wrong — retested
  2026-11-12.** `capture-bodies` drives a real browser that scrolls the page,
  so IntersectionObserver fires and lazy children DO land in the prerendered
  body. Verified against the live HTML: "Senior Lead Product Designer"
  (adventures) and "Send message" (contact) are both present while still
  wrapped. Do not "fix" this; there is nothing to fix.
  What actually made those sections look missing was the run-on heading bug
  below — a grep for "Recent adventures" returned 0 because the markup said
  `Recentadventures`.
- **The homepage FAQ is `hidden md:block`** — entirely absent from the mobile
  layout. It is still in the DOM, so it is still indexable, but Google indexes
  mobile-first and this site's whole AEO play is extractable Q&A. Rendering it
  on mobile as a collapsed accordion is the obvious move; it changes mobile
  page length materially, so it needs its own verified FINDABILITY run rather
  than being slipped into someone else's change.
- **iCloud conflict copies in `src/assets/blog/`** — 14 `name 2.jpg` duplicates,
  none imported, inside a 1.8 MB directory. Dead weight and exactly the kind of
  thing a catch-all `git add` sweeps into a commit. Deleting them is Hiram's
  call; see [[reference_icloud_conflict_copies]].
- ~~`/projects` has no prerendered body — it fails capture every run.~~
  **Resolved 2026-08-23.** It was never a page: a client-side `<Navigate>` that
  served 200 with an empty body while carrying index/follow, a self-canonical,
  sitemap priority 0.9 and five inbound `_redirects` rules. Now a real 301 to
  `/#case-studies`, delisted everywhere. See the out-of-rotation entry in
  `docs/aeo-log.md`.
- **Never run this loop while another agent is working in this repo.** On
  2026-08-23 a concurrent session ran a catch-all `git add` and swept this
  loop's in-progress edits into its own unrelated commit, then pushed. Both
  sessions also fought over headless Chrome and `vite preview --strictPort
  4199`, which is why `/` would not capture. Check `git log` and
  `pgrep -f 'vite preview'` before starting.
- `usePageIndexing` injects `<meta name="crawl-priority">` and
  `<meta name="fetch-priority">` on three pages. Neither is a real meta tag.
  It also console.logs on every navigation in production.
- `seoUtils.ts` `pageIndexingConfigs` lists seven `/case-studies/*` paths that
  have never existed as routes on this site.
