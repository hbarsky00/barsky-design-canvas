# Client-acquisition rotation log

Playbook: `docs/client-acquisition-loop.md`. One lever per run, every 4 days.
Append `- [x] <lever> — <date> — <what changed>` plus notes. Record where the
case-study rotation (lever 1) stands so the next run knows which study is next.

## Cycle 1 — started 2026-09-06

- [x] **Lever 1 — one case study, buyer-lens pass** — 2026-09-06 — Pulled three
  facts to the top of `investor-loan-app`. Rotation now sits at **dae-search**
  (next run's study).

  **What the pass found.** Read against the four questions a founder skimming
  for 40 seconds asks, this study answers three of them well: the problem is
  concrete ("a bank was running its loan operations in Excel… no audit trail,
  no validation"), the decisions are stated *with* what was rejected (the "What
  I Got Wrong First" block admits the first version replicated Excel's
  structure and had to be thrown out), and the outcome is honest rather than
  padded. Per the playbook, a study that already reads well does not get
  restructured.

  The one real gap: the outcome is the **last line of the page**. "Where It
  Landed" is a single sentence — "They adopted it. Three teams tried before me
  and none of them got there." — sitting below six blocks and eleven images.
  For an Excel-replacement project that sentence is the whole proof, and a
  skimmer never reaches it.

  **The change.** Three `stats` on the opening block, so those facts land in
  the first screenful. Every one traces to a sentence already on the page — no
  new claim, no number that did not exist:
  - `3` / "Teams tried to replace the spreadsheet before this one"
  - `8 figures` / "The deal values it was tracking, with no validation behind them"
  - `Adopted` / "Where this attempt landed, and the three before it didn't"

  No new component: `stats` is already declared on `SimpleCaseStudyBlock` and
  fully rendered at `SimpleCaseStudyPage.tsx:375` as a bordered `<dl>` band.
  **It was used by zero case studies.** A styled, working slot for exactly the
  "give the skimmer three facts" job had been sitting unused across all twelve.
  The other eleven studies are candidates for the same treatment on their own
  lever-1 runs.

  **Correction — a wrong turn worth recording, because it will catch the next run too.**
  This pass first added the equivalent band to `investor-loan-app` in
  `src/data/structuredCaseStudies.ts`, typechecked it, built it, and it had
  **no effect on the page**. Verified reachability afterwards:

  - All twelve case-study routes are explicit in `App.tsx` (lines 157–174) and
    every one of them renders `SimpleCaseStudyPage` with **inline props**.
  - `structuredCaseStudies.ts` → `SimplifiedProjectDetail` →
    `StructuredCaseStudyLayout` is reachable only through the generic
    `/project/:projectId` at `App.tsx:175`, which the explicit routes above it
    shadow. App.tsx says so in a comment on line 157: "these override the
    generic ProjectDetail routing".
  - So the body content in `structuredCaseStudies.ts` renders on no live case
    study. The file is **not dead** — `UnifiedSEO.tsx` still reads it for
    per-page schema, and so do the export helpers — but editing prose there
    changes SEO metadata, not the page.

  This also **retracts a conclusion** drawn earlier in this same run. A length
  and section-coverage audit of `structuredCaseStudies.ts` appeared to show the
  client/enterprise studies running at half the depth of the self-built product
  studies — a real-sounding finding about the work a buyer most wants to see.
  It was measured on the file that does not render. It may still be true of the
  live pages; it has not been measured there. **Lever 5 should measure the
  `src/pages/Structured*CaseStudy.tsx` files instead.**

  **Also verified, not a defect.** `caseStudyIndex.ts` (9 entries, pager order)
  and `structuredCaseStudies.ts` (10 entries) only partly overlap. Both
  omissions are deliberate: bz-essentials, recast and stips have their own page
  components, and the index's header comment holds crypto and ManuscriptRx out
  of the pager because neither shipped. Recorded so a future run does not
  "fix" it.

  Gates: `npx tsc --noEmit` clean, `npm run build` clean, `capture-bodies`
  44/44. Confirmed present in the built HTML at
  `dist/project/investor-loan-app/index.html`, not just in source. Committed,
  not pushed.

  **Note for whoever runs the build next:** `npm run build` failed once
  mid-run with a rimraf `ENOTEMPTY` while emptying `dist/` — the iCloud sync
  hazard this directory has. It left a stale `dist` that silently looked like a
  successful build. Re-running cleared it. Check the timestamp on the file you
  are verifying, not just the build's exit line.

### Verified out of band — 2026-09-06

**Hiram confirms contact-form submissions are arriving.** The conversion path
is working end to end from his side, not just from a deploy that looked right.
Lever 3 should re-verify it rather than re-diagnose it, and should not treat a
dead form as the standing answer to "why no calls" any more — the path is open,
so the question moves upstream to whether anyone is reaching a page with a CTA
on it in the first place. That is levers 4 and 6.

The homepage form was a second copy that stayed broken after /contact was
fixed; it is now a thin wrapper around the real one. If a future run finds two
form implementations again, that is the regression.
