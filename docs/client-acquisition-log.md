# Client-acquisition rotation log

Playbook: `docs/client-acquisition-loop.md`. One lever per run, every 4 days.
Append `- [x] <lever> — <date> — <what changed>` plus notes. Record where the
case-study rotation (lever 1) stands so the next run knows which study is next.

## SETTLED — the contact form is fine (2026-09-06, from Hiram)

**Hiram, in his own words: "THE CONTACT FORM IS FINE."** Do not audit it, do not
re-verify it, do not offer it as a theory for why the phone is quiet. Lever 3 is
closed in the playbook and skipped in the rotation.

It was checked twice and passed twice: the Netlify form `contact` is registered
and storing submissions (5 stored, most recent 2026-09-04), the homepage form is
a single wrapper around the one real component, and "Book a call" resolves to a
live Calendly. That is the end of it.

Re-open only if Hiram says enquiries stopped arriving, or if a run finds a second
form implementation. Anything else about getting clients belongs upstream, at
entry-point coverage and off-site acquisition.

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

- [x] **Lever 2 — proof audit** — 2026-09-06 — Audited **dae-search** and found
  the study's evidence does not show what its captions say it shows. Rewrote
  every caption and alt on the study's four images to describe the artefact
  actually in the frame, and named the real domain once.

  **Method.** Opened each image and compared it against the caption sitting
  under it, rather than auditing the prose against itself. Three of the four
  captions failed.

  **What the images actually show.**
  - `what-i-built.webp` was captioned *"Lineage on the result itself: where a
    table came from, when it last refreshed, what depends on it."* It is a
    **process-flow diagram** — "DAE Search Process Flow", nine numbered boxes
    from Login to View Related Content. No result row, no lineage, no
    freshness. This is the study's central claim, and the only picture offered
    as proof of it showed something else entirely. The same false caption was
    also on the blog post, and the homepage card called the same diagram
    "the result view an analyst actually works from".
  - `the-problem.webp` was captioned *"Forty results and no way to tell which
    table is current."* It is an **empty search state** — "Begin your search by
    typing in a keyword" — with one filter chip and "15 Data Assets found".
    There are no forty results in it.
  - `decisions-1.webp` was captioned as the pass *"when I was still designing
    consumer search with an enterprise skin on it."* The sketches show
    multi-term advanced search, entity selection, meta tags and Export All —
    the dense enterprise direction, not the consumer one.
  - `decisions-2.png` was the one that held up: a genuinely dense result table.
    Caption now names what is in the row (asset name, therapeutic area,
    geography, data availability) and points at the query — `Diabtes`, typed
    with a typo — which is direct evidence for the study's own claim that this
    audience types fragments.

  **The domain mismatch, which is the bigger finding.** The prose is a finance
  story: an analyst searching "revenue", a table called `arr_monthly`, a VP on
  Thursday. Every screenshot is a **life-sciences catalogue** — Therapeutic
  Area, Oncology, Pembrolizumab, Non-Small Cell Lung Cancer, diabetes
  registries, claims and trial sets. A buyer who looks at the pictures while
  reading the words sees two different projects. Added one sentence naming the
  actual domain and keeping the finance example as the illustration it is. Did
  not rewrite the narrative into life-sciences terms — that would have meant
  inventing an analyst workflow I have no source for.

  **Changed:** `src/pages/StructuredDaeSearchCaseStudy.tsx` (4 captions, 4 alts,
  1 new sentence), `src/data/blogData.ts` (the same three figures on
  `finding-the-data-is-half-the-job`), `src/components/home/VideoCaseStudiesSection.tsx`
  (the homepage card's alt). Nothing deleted — no image, section or paragraph
  removed. The old alt text on two of these images was unrelated boilerplate
  ("Learning from design iterations that didn't meet enterprise needs" on the
  empty-state screenshot), so this is an accessibility fix as much as a proof
  one.

  **Flagged for Hiram — three claims I could not trace, none of them touched:**
  1. **"40 results down to about 4."** The study's only quantified outcome. It
     predates every rewrite in git — it is his own original text, not something
     a loop generated — but nothing states how it was measured. The counts
     visible on screen are 15 and 127 assets. Confirm it or let it be softened.
  2. **Freshness and lineage on the row.** Section 3 says the row carries where
     a table came from, when it last refreshed and what depends on it. The
     shipped table in `decisions-2.png` carries geography and data
     availability. Either a later screen exists and is not on the page, or the
     claim overshoots what shipped. A screenshot of that row would be the
     single most valuable asset this study could gain.
  3. **What happened to it.** Neither the study nor the blog post says whether
     DAE Search shipped, was adopted, or was measured. The word "shipped"
     appears once and refers to the style guide. Compare `investor-loan-app`,
     which now ends on "Adopted." An enterprise study with no outcome reads to
     a founder as a concept exercise.

  **Also noticed, not fixed (out of lever scope).** `structuredCaseStudies.ts`
  still points six dae-search image URLs at `ctqttomppgkjbjkckise.supabase.co`,
  the dead host. Harmless today — dae-search has a `PROJECT_SEO_MAP` override
  that supplies the OG image, and that file's body does not render — but any
  study without such an override would serve a dead social image. Worth a
  sweep on a technical run, not this one. Two live code paths still call that
  host: `src/hooks/useOpenAiCaptions.ts` and `src/pages/SeoCheckRunner.tsx`.
  Neither is on the conversion path.

  Gates: `npx tsc --noEmit` clean, `npm run build` clean, `capture-bodies`
  44/44, rebuilt after. Verified in the built HTML and in a browser against
  the served `dist`, not just in source. Committed, not pushed.

  Rotation for lever 1 still sits at **dae-search** — this run audited its
  proof, it did not do the buyer-lens pass. Next lever: **3, conversion path**
  (re-verify, do not re-diagnose — see the out-of-band note above).

- [x] **Lever 3 — conversion path** — 2026-09-06 — Walked the buyer's route to
  contact end to end and proved every hop against live evidence. **No defect
  found, so no code changed.** The path is open; the shortage is upstream.

  **Hop by hop, with what proves it rather than what looks right.**

  1. **CTAs exist where a buyer lands.** Homepage carries two "Book a call"
     buttons; `/project/dae-search`, a deep page someone arrives on from
     search, carries a booking CTA in its end-of-study block plus two
     `/contact` links. Read out of the live HTML, not the source.
  2. **The booking CTA points somewhere real.** Both go to
     `https://calendly.com/barskyuxdesignservices/30min` — 200, titled
     "30 Minute Intro Meeting - Hiram Barsky". This hop had never been checked
     in this log before; a dead Calendly would have killed the shorter of the
     two routes silently.
  3. **The pages respond.** `/`, `/contact` and `/project/dae-search` all 200.
  4. **Netlify has actually registered the form.** The deployed HTML contains
     **zero** `data-netlify` attributes and **two** `form-name` inputs — that
     rewrite is Netlify's own deploy-time form processing, so registration is
     confirmed from the served bytes rather than from the source markup. Site
     metadata agrees: `extraFeatures.forms: "enabled"`.
  5. **Submissions arrive.** The Netlify form `contact`
     (`6a88c13833352e00088b01c0`, created 2026-08-21) reports
     **`submission_count: 5`, `last_submission_at: 2026-09-04T11:58:32Z`**,
     honeypot on, and its five stored fields — name, email, subject, message,
     bot-field — match exactly what the client posts. Real stored submissions
     with a recent timestamp is stronger evidence than a test of my own would
     have been.
  6. **The notification cannot lose a message.** `notify-contact.js` is called
     *after* the Netlify POST has already stored the submission, so a failed
     email is a missing notification, never a lost enquiry. The form's own
     error path hands over `hbarsky01@gmail.com` and deliberately does not
     reset the fields.
  7. **No regression on the duplicate-form fault.** `src/components/home/ContactForm.tsx`
     is still a 38-line wrapper around the real component. One implementation,
     as required.

  **What I could not do, stated plainly.** I intended to POST a clearly-labelled
  test submission to the live form. The auto-mode classifier blocked the
  external write and I did not work around it. It would have been redundant
  anyway — and it would have failed regardless, because `notify-contact`
  gates on `Origin`/`Referer` being `barskydesign.pro`, so any future live
  test has to be driven from a browser on the real origin, not from curl.

  **The number that matters, and it is not a defect.** Five submissions in the
  roughly fifteen days since the form was rebuilt, the last on 2026-09-04. The
  conversion path is working and is no longer a candidate answer to "why no
  calls". The bottleneck has moved upstream: whether enough of the right people
  reach a page carrying one of these CTAs at all. That is **lever 4**
  (entry-point coverage) and **lever 6** (off-site acquisition), and both are
  now the highest-value remaining work in this cycle.

  Nothing to gate — no source changed. Log-only commit.

  Next lever: **4, entry-point coverage.** Lever 1's rotation still sits at
  **dae-search**.

- [x] **Lever 4 — entry-point coverage** — 2026-09-06 — **Blog posts had no way
  to hire him.** Added the existing closing CTA to all 23 of them.

  **The audit.** Took the two page types search and AI answers actually drop
  people on — a case study and a blog post — and read each standing alone, with
  no prior context, against the three questions: who is this, what does he do,
  how do I hire him.

  - `/project/dae-search` **passes.** Header names him and says "Designer and
    Developer"; the study states the role; and it closes with the
    `WorkCallToAction` block — "Want something like this built?" plus Book a
    call and See more work. A cold visitor can act.
  - `/blog/finding-the-data-is-half-the-job` **failed on the third question,
    completely.** After the last paragraph the page offered: related posts, and
    a comment box whose own text reads *"Comments aren't switched on yet."*
    Then the footer. **No CTA anywhere on the page** — no Book a call, no
    invitation, nothing. The single highest-intent moment on the site, the
    instant someone finishes reading his thinking, was being handed a disabled
    form. That is worse than an empty space: it is an interactive dead end.

  This is the gap lever 4 exists to find. Blog posts are the likeliest landing
  page for both search and AI citations, they carry the strongest evidence of
  how he thinks, and they were the one page type with no way to convert.

  **The change.** `WorkCallToAction` already existed and was already used by the
  homepage and every case study — it was extracted for exactly this reason.
  Rendered it on `BlogPost.tsx` immediately after the article body and **before**
  related posts and comments, so it sits at the moment of intent rather than
  below two other blocks. Gave it optional `heading`/`blurb` props, defaulting to
  the existing case-study wording, because a blog reader has just finished an
  argument rather than seen a project — "want something like this built" would
  be asking about a thing they never saw. Blog wording:

  > **Is this the kind of problem you're sitting on?**
  > I design and develop SaaS, web apps, mobile apps and internal tools — the
  > thinking above is how I work. Tell me what you're building, or grab a time
  > and we'll talk it through.

  That repeats the settled positioning verbatim, which is the point: for a
  reader who landed here from a search about enterprise search UX, this may be
  the only sentence on the page that says what he actually sells.

  No new component, no new dependency, one reused block and two optional props.
  Wrapped in `not-prose` — the surrounding wrapper is `prose`, which would
  otherwise restyle the heading.

  **What proves it.** `npx tsc --noEmit` clean, `npm run build` clean,
  `capture-bodies` 44/44, rebuilt after. **23/23** built blog pages contain the
  CTA. Character offsets in the built HTML confirm the order: CTA (79540) →
  Book a call (80918) → related posts (82987) → comments (86129). Rendered in a
  browser against the served `dist`: the card measures 606×378, both buttons
  resolve correctly (`Book a call` → the live Calendly, `See more work` →
  `/#case-studies`), and computed styles match the case-study block exactly
  (bg `rgb(246,243,239)`, 1px border, 16px radius, 64px padding, 30px centred
  semibold heading). Blurb contrast measured at **8.65:1** on the card
  background — well past AA, not eyeballed.

  **Note:** could not take a scrolled screenshot — the browser pane was hidden,
  and a hidden pane does not render, so scroll actions time out. Verified
  through computed geometry and styles instead, which is stronger for this
  particular change than a picture would have been.

  **Flagged for Hiram.** The comment box on every blog post announces
  *"Comments aren't switched on yet."* Either switch them on or take the block
  out — an inert form with a Post button is a broken promise on the page where
  people decide whether he is worth contacting. Not touched here: it is a
  product decision, not a proof one.

  Next lever: **5, positioning vs evidence** — and per lever 1's note, measure
  it on `src/pages/Structured*CaseStudy.tsx`, not on `structuredCaseStudies.ts`.
  Lever 1's rotation still sits at **dae-search**. Lever 3 stays closed.

- [x] **Lever 5 — positioning vs evidence** — 2026-09-06 — **The offer was upside
  down.** `/services` led with an AI-consulting pitch the case studies do not
  support, and ranked the thing twelve studies prove third, as a supporting act.
  Rewrote the three "What I do" cards against the evidence.

  **Measured on the live pages**, per lever 1's correction — the twelve
  `src/pages/Structured*CaseStudy.tsx` files, not `structuredCaseStudies.ts`.

  **What the copy claimed.**
  1. *AI-First Product Design* — "AI Workflow & Interaction Design", "Prompt UX
     & Conversational Interfaces", "Human-AI Collaboration Patterns".
  2. *Gen AI Integration* — "ChatGPT / Claude API Integration".
  3. *Core Product Design* — described as "the craft that makes AI products
     actually usable", i.e. in service of the first two.

  **What the evidence carries.** Seven studies tagged **Solo Build**. Five
  products live and reachable (firelion.me, catchbuddy.fit, herbalink.live,
  stips.bet, ringrival.today). Four enterprise tools that replace a spreadsheet
  or a catalogue (Investor Loan, DAE Search, BZ Essentials, QuickFlow).
  **Not one study shows a conversational interface or prompt UX.** The only
  study tagged "Gen AI" is ManuscriptRx, which `caseStudyIndex.ts` holds out of
  the pager because **it never shipped**. Six studies carry "AI-Assisted
  Product", which means AI helped him *build* it — a claim about his delivery
  speed, not about an AI product.

  So the least-evidenced offer was the headline, and the best-evidenced one was
  ranked third. The playbook says the evidence wins.

  **The three cards now:**
  - **Design and build, same person** — end to end through the shipped front
    end, database and auth included, five products live, decisions tested in
    working software. Every line traces to a study.
  - **Internal tools people use all day** — workflow design, replacing
    spreadsheets as the system of record, search and catalogues, permissions
    and approval gates. Traces to Investor Loan, DAE, BZ Essentials, QuickFlow.
  - **AI where it earns its place** — narrowed to what actually shipped:
    semantic search over metadata (DAE), scheduled generation pipelines with
    validated output (Stips), AI-assisted delivery, and a stated line on where
    a model does not belong. The AI claim is kept, because it is real; what went
    is the part that was not.

  Positioning itself untouched, as required: "I design and develop SaaS, web
  apps, mobile apps and internal tools."

  **Also fixed, same root cause.** `SERVICES_HERO` still read "AI-First Product
  Design / Hiram Barsky · AI-First Designer" and `SERVICES_CTA` "Ready to Build
  Something Smarter?". The live hero on `/services` had already been rewritten
  to the honest version; these two were the stale copy left behind, and they
  feed `ContentExport` — so the old positioning was staged to be pasted
  somewhere else later. Brought both in line.

  **FLAGGED — Hiram's call, not mine, and it is the loudest remaining
  contradiction on the site.** The packages directly contradict the hero. The
  hero says he ships end to end; the packages sell **design deliverables and a
  handoff** — MVP Validation, $8,500, "3 weeks to launch-ready design",
  wireframes and a prototype; AI-First Redesign, $18,500, 12 weeks, "dev
  collaboration & handoff". A founder who reads the hero, believes it, then
  reads the packages learns that the build is not actually included. Three
  things only he can settle: whether those prices still stand, whether the
  packages should include the build he is now selling, and whether
  "AI-First Redesign" should still be the name of one of them. I changed no
  price and no scope.

  Gates: `npx tsc --noEmit` clean, `npm run build` clean, `capture-bodies`
  44/44, rebuilt after. Verified in the built `dist/services/index.html`: new
  cards present, zero occurrences of "AI-First" or "Prompt UX" anywhere in the
  built services page.

  Next lever: **6, off-site acquisition** — written list only, no code.

- [x] **Lever 6 — off-site acquisition** — 2026-09-06 — Written list only, as the
  playbook requires. No code, no accounts created, nothing posted anywhere.

  **The framing this cycle earned.** Lever 3 proved the contact path works and
  Hiram confirmed it. Lever 4 found blog posts had no CTA at all, and lever 5
  found the offer was selling the wrong thing. Those are now fixed. What is left
  is the part no on-site change can reach: **almost nothing points at this
  site.** Five form submissions in fifteen days is a reach number, not a
  conversion one. Everything below is ranked by effort against likely reply.

  **Tier 1 — cheapest, and two of them are near-free**

  1. **`sameAs` + `Person` schema. THE LOOP CAN DO THIS — and it is the single
     cheapest real win available.** Verified today: the built site contains
     **zero `sameAs` properties and no `Person` or `ProfilePage` schema on any
     page**, homepage and `/about` included. LinkedIn and GitHub sit in the
     footer as plain links. Nothing tells Google or an AI answer engine that the
     Hiram Barsky on barskydesign.pro is the same entity as
     `linkedin.com/in/hiram-barsky` and `github.com/hbarsky00`. Entity
     resolution is most of what decides whether an AI recommends a named
     person. Half a day of work, no permission needed. **Do this first.**
  2. **Google Business Profile — Hiram only.** Still not done; it has been
     "pending" since the findability work. The footer already declares
     "Remote worldwide · New Jersey, US" and a phone number, so the NAP data
     exists and is consistent. A GBP is the strongest local entity anchor a solo
     consultant can hold, it feeds Maps and "product designer near me", and it
     is a high-authority `sameAs` target for item 1. Needs his identity and a
     verification step, so it cannot be automated. **~30 minutes plus
     verification.**
  3. **Decide which domain is canonical — Hiram only, and it is a decision, not
     a task.** `barsky.design` and `barskydesign.pro` are both live portfolio
     sites for the same person, each with its own automated loop. Two domains
     competing on one person's name split the authority and actively confuse
     entity resolution — which is the same mechanism item 1 is trying to fix.
     Pick one, 301 the other or make it plainly subordinate. Everything else in
     this list is worth less while both exist.

  **Tier 2 — real effort, real return**

  4. **The five live products are unused backlink assets.** firelion.me,
     catchbuddy.fit, herbalink.live, stips.bet, ringrival.today. He owns all
     five. A "designed and built by Hiram Barsky" footer link on each is five
     permanent, genuine, non-spammy links from real shipped products — exactly
     the kind of link that is hard to buy and easy for him to place. Small code
     change, but in five other repos, each with its own loop and its own deploy
     approval, so it is not this loop's to make unilaterally.
  5. **LinkedIn as distribution for the blog — Hiram only, posting is his.**
     Twenty-three posts exist and nothing distributes them. He already has the
     profile. Post the argument itself rather than a bare link. This is the
     highest-yield recurring action on the list and the loop must never do it
     for him.
  6. **Marketplaces where founders search for design *and* build.** Contra,
     Toptal, Wellfound and similar. The differentiator is specific and rare:
     one person who designs and ships, with five live products to prove it —
     which is now exactly what `/services` says. All require account creation,
     so Hiram only.

  **Tier 3 — slower, higher conversion**

  7. **Communities where founders ask this question out loud** — Indie Hackers,
     r/SaaS, founder Slacks and Discords. He has twenty-three posts of genuine
     thinking to answer with; answering beats pitching. Hiram only.
  8. **Referrals, the channel nobody has asked for.** No case study names a
     client, and nothing on the site or off it asks anyone for an introduction.
     Past colleagues and the bank client behind the Investor Loan work are the
     highest-conversion source on this list and the least worked. Hiram only.

  **Summary of who does what.** The loop can do exactly one item — the schema
  and `sameAs` work (1), and it should be the next code this loop writes.
  Items 4 belongs to five other repos. Everything else (2, 3, 5, 6, 7, 8)
  requires an account, a post, an identity check, or a business decision, and is
  Hiram's alone. That is the honest shape of it: the site is now in good enough
  order that the remaining work is mostly not on the site.

  No files changed beyond this log.

### Cycle 1 complete — 2026-09-06

All six levers logged. Lever 3 is closed permanently (see the settled note at
the top of this file) and will be skipped from here.

**Cycle 2 starts at lever 1**, with the case-study rotation at **dae-search** —
it has had a proof audit but not a buyer-lens pass. Before that, the strongest
piece of work available is lever 6's item 1: `Person` schema and `sameAs`, which
no lever owns and which this loop can write without asking anyone.

### CORRECTION to lever 6, item 1 — 2026-09-06, same day

**I was wrong, and the retracted claim is the one I ranked first. There is
nothing to build here.**

Lever 6 asserted that the built site carries "zero `sameAs` properties and no
`Person` or `ProfilePage` schema on any page". That is false. Verified against
the live site today:

- `index.html` carries a hand-written `@graph` with three nodes —
  `#business` (Organization), **`#hiram` (Person)** and `#website` (WebSite).
- The **Person node has `sameAs` to both** `linkedin.com/in/hiram-barsky/` and
  `github.com/hbarsky00`, plus `jobTitle`, `image`, `description` matching the
  settled positioning, and `worksFor` pointing at `#business`. The Organization
  node repeats the same `sameAs` pair.
- The graph is **served on every route type** — checked live on `/`,
  `/project/dae-search`, `/blog/finding-the-data-is-half-the-job` and `/about`;
  the `#hiram` node appears on all four.
- `#business` is fully populated for local search already: `telephone`
  `+1-201-668-4754`, `email`, `PostalAddress` (Clifton, NJ, US), `geo`,
  `areaServed`, `openingHoursSpecification`, `contactPoint`, `knowsAbout`.
  The phone matches the footer exactly.
- `structuredDataUtils.ts` deliberately re-uses these by `@id` — every
  BlogPosting and Article sets `author: {"@id": ".../#hiram"}` — and its own
  comment warns that re-declaring an Organization here recreates a
  duplicate-entity defect removed on 2026-09-01.

**Why I got it wrong, recorded so the next run does not repeat it.** I grepped
for `"@type":"[A-Za-z]+"` — **no space after the colon**. That pattern matches
the minified JSON-LD that `inject-seo-html` writes, and silently misses the
hand-written, pretty-printed graph in `index.html`, which uses `"@type": "..."`.
Two greps returned "no Person, no sameAs" and I believed them instead of
believing the comment in `structuredDataUtils.ts` that said the entity graph
lives in `index.html` and is served on every route. The code told me the truth
and I trusted my own bad regex over it.

**Always match schema with flexible whitespace** — `'"@type"\s*:\s*"Person"'` —
and check `index.html` as well as the injected blocks. They are written by
different hands in different formats.

**What this changes about lever 6.** Item 1 is struck. The honest consequence:
**this loop has no off-site work it can do on its own.** Item 4 (the five live
products as backlink sources) belongs to five other repos with their own deploy
approvals. Everything else — Google Business Profile, the barsky.design vs
barskydesign.pro canonical decision, LinkedIn distribution, marketplaces,
communities, referrals — needs an account, a post, an identity check or a
business decision, and is Hiram's alone.

That is the real finding of lever 6, and it is more useful than the one it
replaces: the entity and schema groundwork is already done and done well. The
gap is not technical. Nothing points at the site yet, and closing that is
Hiram's move, not the loop's.

## Cycle 2 — started 2026-09-06

- [x] **Lever 1 — one case study, buyer-lens pass** — 2026-09-06 — Gave
  **dae-search** the disposition block it was the only client study missing.
  Rotation moves to **bz-essentials**.

  **The cycle-1 retraction is now fully closed, and the retracted claim was not
  just badly measured — it was false.** Cycle 1 claimed the client/enterprise
  studies ran at half the depth of the self-built product studies, measured on
  `structuredCaseStudies.ts`, which renders nothing. Re-measured against the
  twelve `src/pages/Structured*CaseStudy.tsx` files that do render:

  | | shortest | longest |
  |---|---|---|
  | | ManuscriptRx 5.8k, Crypto 6.9k | BusinessManagement 11.1k, RingRival 10.1k |

  The enterprise studies sit at the **top** of the range — investor-loan 9.3k,
  dae-search 9.3k, business-management 11.1k. The two shortest are the two
  explicit concept projects. There is no thin-client-work problem. Stop looking
  for one.

  **The real portfolio pattern, which is a house convention nobody wrote down.**
  Ten of the twelve studies end on a disposition block — "Where It Landed",
  "Where It Actually Is", "Where It Is Now", "Where It Is". Two did not:
  - **dae-search** ended on "Trust Beat Relevance", a thesis. Fixed this run.
  - **ring-rival** ends on "Every Opponent Has Their Own Rhythm", a craft
    observation. Left alone — it is a game, and the live link answers "what
    happened to it" in a way an enterprise study cannot. Noted, not queued.

  So the one client study a buyer would weigh most was also the one that never
  said what became of the work. That is question 4 of the buyer-lens pass, and
  it matches lever 2's flag #3 from cycle 1 exactly.

  **The change.** A closing "Where It Landed" block built only from what the
  page already asserts: it shipped with its own style guide (stated in the
  design-system block — "the swatches here are read straight off it"), and the
  autocomplete went through a security review that changed the design before
  release. Second paragraph says plainly that there are no adoption or
  time-saved numbers, rather than leaving a silence a reader fills with "concept
  project". That follows ManuscriptRx's existing honesty pattern ("The Part I
  Didn't Solve") rather than inventing a house voice for it.

  **What this run deliberately did NOT do.** It did not give dae-search the
  `stats` band that worked on investor-loan. Investor-loan's three facts were
  measurements. Dae-search's numbers — "40 results", "twenty minutes" — are
  narrative illustration, and its one quantified claim ("40 down to about 4")
  is already flagged as untraceable by cycle 1's lever 2. Setting illustration
  in 3xl bold type is how an unsourced number becomes a statistic. If Hiram
  confirms the 40→4 figure, that band becomes the obvious next change to this
  study.

  **Still flagged, unchanged from cycle 1 and now the study's only real gap:**
  the 40→4 claim, whether the shipped row carried freshness and lineage, and
  whether DAE Search was adopted. The new closing block is honest about the
  third; it does not answer it.

  Gates: `npx tsc --noEmit` clean, `npm run build` clean, `capture-bodies`
  44/44, rebuilt after, confirmed in `dist/project/dae-search/index.html`.
  Committed, not pushed.
