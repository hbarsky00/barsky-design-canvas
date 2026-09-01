# Autonomous improvement loop — barskydesign.pro

Authorised by Hiram 2026-08-22: run every 2 days, **do not ask him anything**,
publish when the work verifies. Split roughly **50/50 between SEO/AEO and
design** — his words. Alternate the emphasis each run so neither half rots.

Repo: `~/Documents/barsky-design-canvas` · Live: https://barskydesign.pro
Deploy: `git push origin main` → Netlify `incredible-griffin-66e664` auto-builds.

## Each run, in order

1. **Read `docs/aeo-log.md`.** It carries the lever rotation and the
   flagged-facts list. Read `docs/design-log.md` too (create if missing).
2. **Pick this run's emphasis.** Look at the last entry in each log and choose
   whichever half is more stale — SEO/AEO or design. Over any four runs it
   should come out about even.
3. **Diagnose before touching anything.** Deterministic checks beat opinions:
   - `python3 scripts/seo_audit_all_routes.py` (in this repo) for
     title/description/OG across every built route
   - the `amazing-seo-skill` checkers in
     `~/Documents/.claude/skills/amazing-seo-skill/scripts/` for schema,
     links, images, security headers
   - the `claude-seo` skill (`/seo audit <url>`, installed 2026-08-22 at
     `~/.claude/skills/seo`, v2.2.4) and its 30 sub-skills — seo-technical,
     seo-schema, seo-geo, seo-content, seo-images, seo-sitemap and the rest.
     It carries its own Chromium, so it can measure Core Web Vitals for real
     rather than inferring them. Use it and `amazing-seo-skill` together and
     reconcile where they disagree; neither is automatically right
   - for design: build, open the preview, and actually look — desktop AND
     mobile (375px), light AND dark
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
- **Do not touch** `~/Documents/barskydesign` (different site, different skill)
  or reconnect the Stips repo to bolt.new.

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

- `LazySection` gates children behind an IntersectionObserver, so anything
  inside it is absent from the prerendered HTML that non-JS crawlers read. FAQ
  and internal-linking were unwrapped 2026-08-22. **adventures, contact and
  blog are still wrapped and still invisible** — unwrapping them is a real
  performance trade (form libraries, media), so weigh it, do not just do it.
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
