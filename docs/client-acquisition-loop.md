# Client-acquisition loop — barskydesign.pro

Every 4 days, 15:00 local. One lever per run. The point of this loop is not
"improve the site" in general — `docs/auto-improve-loop.md` already owns that.
This loop has one question behind every run:

> **A founder who needs someone to design and ship a product lands on this
> site. Does anything here make them get in touch?**

Everything below serves that question. The lens is `ux-researcher` — treat the
site as an artefact under evaluative research, with the buyer as the
participant, not Hiram as the author.

## Where things live

- Repo: `/Users/hirambarsky/Documents/barsky-design-canvas` — live at https://barskydesign.pro
- Case-study index (10 studies, order is the rotation order):
  `src/data/caseStudyIndex.ts` — investor-loan-app, dae-search, bz-essentials,
  business-management (QuickFlow), recast, herbalink, catchbuddy, stips,
  ring-rival, and whatever has been added since.
- Case-study bodies: `src/data/structuredCaseStudies.ts` (single source of
  truth; pages read it via `src/utils/simpleCaseStudyAdapter.ts`)
- Services / offer copy: `src/data/services.ts`, `src/data/designServices.ts`
- FAQ content: `src/data/seoFaqs.ts` (rendered by `src/components/seo/SeoFaqSection.tsx`)
- Testimonials: `src/data/testimonials.ts`
- Contact form: `src/components/contact/ContactForm.tsx` — the ONLY conversion
  surface on the site. `src/components/home/ContactForm.tsx` is a thin wrapper
  around it (it used to be a second, divergent copy posting to a dead Supabase
  host; do not let it fork again).
- This loop's rotation log: `docs/client-acquisition-log.md`

## The six levers

Read `docs/client-acquisition-log.md`, take the first lever not done in the
current cycle, and do only that one. All six logged → start a new cycle at the
top, note the date.

### 1. One case study, buyer-lens pass
Take the next study in `caseStudyIndex.ts` order (the log records where the
rotation stands). Read it the way a founder skimming for 40 seconds would, and
check it answers, in this order, above the fold or close to it:

1. What was actually broken, for whom, in concrete terms.
2. What Hiram decided, and what he rejected — the decision is the product, the
   screenshots are evidence for it.
3. What shipped, and whether it is live and reachable.
4. What changed afterwards, or an honest "not measured".

Most of these studies fail on 2 and 4. Fix the weakest one thing. Do not
restructure a study that already reads well.

### 2. Proof audit
Walk one study's claims and ask what each traces to. Anything that traces to
nothing gets softened to what is defensible or FLAGGED in the log — never
deleted, never invented, never quietly filled in.

### 3. Conversion path
Follow the buyer's actual route to contact, end to end, and prove each hop:
the CTA exists on the page, points somewhere real, the form renders, submits,
and the submission arrives. This path was silently dead until 2026-09-05 (the
homepage form posted to `ctqttomppgkjbjkckise.supabase.co`, which does not
resolve). That is the most likely single answer to "why no calls". Re-verify
it rather than assuming it stayed fixed. Do not send test mail through a real
inbox without saying so in the report.

### 4. Entry-point coverage
Search and AI answers drop people onto a deep case-study or blog page, never
the homepage. Pick one such page and ask whether, standing alone with no prior
context, it establishes who this is, what he does, and how to hire him. Fix the
worst gap. This is where the loop overlaps least with the SEO loop and pays the
most.

### 5. Positioning vs evidence
Compare what `src/data/services.ts` and the homepage promise against what the
case studies actually demonstrate. Where they disagree, the evidence wins —
either the copy narrows to what is proven, or a study is doing work the copy
never claims and should be surfaced. Positioning itself is settled and does not
get rewritten here: "I design and develop SaaS, web apps, mobile apps and
internal tools."

### 6. Off-site acquisition
The lever that cannot be shipped as code. Where would a founder looking for
this actually be, and is Hiram there? Google Business Profile, the directories
and marketplaces that matter for this kind of work, communities, referral
surfaces, whatever outbound already exists. Output is a short prioritized list
written into the log, ranked by effort against likely reply — plus a plain
statement of which items only Hiram can do. Write no code on this lever. Do
not sign up for anything, do not create an account, do not post anywhere.

## Anti-collision — read this before touching git

`barskydesign-auto-improve` runs unattended on THIS repo every 2 days at 09:00
and pushes to main on its own authority. This loop runs at 15:00 so the windows
never overlap, but the working tree is still shared and git has no per-session
isolation. Two commits (2026-08-23 `d86d52e1`, 2026-09-04 `60c279a`) already
swept another session's half-finished work into an unrelated message and
deployed it.

- First action of every run: `git status --porcelain`. Anything modified or
  untracked that this run did not create means another session is mid-edit —
  STOP, change nothing, report it.
- Stage explicit paths. Never `git add -A`, never a bare directory.
- `git diff --cached --name-only` before every commit and read it. A path you
  did not touch means abort, not commit.
- Leave the tree clean. Uncommitted work is exactly what the other loop's
  catch-all stage picks up.

## Publish posture

**Commit, do not push.** Report which commits are waiting.

Stated plainly so no future run mistakes it for a hold: `barskydesign-auto-improve`
pushes main every 2 days, so a commit left here rides along on its next push and
goes live. That is inside the standing publish authorization Hiram gave for this
site on 2026-08-22 — but it means every run must leave main in a state that is
fine to ship. If a change genuinely should not go live unreviewed, it does not
get committed to main; it goes on `research/<date>-<lever>` and the log says so.

## Hard rules

- Never invent a metric, percentage, client, project count or outcome.
- Three facts stay flagged and never get filled in: Hiram's hourly rate, whether
  he holds an actual WCAG certification (the copy claims a practice, not a
  credential), and the Blue Sky numbers.
- Never delete case-study content — images, sections or copy — without asking.
  Adding and improving is fine. This rule has been broken before.
- Five products are live: firelion.me, catchbuddy.fit, herbalink.live,
  stips.bet, ringrival.today. Not nine.
- Visible copy changed → `npm run capture-bodies`, then `npm run build` again,
  or crawlers keep serving the old snapshot.
- Gates before committing: `npx tsc --noEmit` clean and `npm run build` clean.
  Note that `npm run build` alone does NOT typecheck.
- Scope is this repo only. `~/Documents/barskydesign` is a different site and
  belongs to a different loop.
- Anything needing a fact only Hiram has → FLAG it in the log. Do not guess.

## Report format

Which lever, the one thing changed, what proves it, whether it is committed or
pushed, and what is flagged for Hiram.
