# AEO rotation log

Answer Engine Optimization passes on barskydesign.pro (barsky-design-canvas). One lever per run; six-lever cycles.
Levers: 1) entity hardening  2) extractable Q&A  3) citable resource content  4) structured-data sweep  5) llms.txt / cross-web consistency  6) content freshness / gap-fill.

Sibling log for the *other* Hiram site (barsky.design, different repo): `~/Documents/barskydesign/docs/aeo-log.md` — don't confuse the two.

## Cycle 1 (started 2026-08-05)
- [x] entity hardening — 2026-08-05 — dynamic Organization schema (`structuredDataUtils.ts`) gained `sameAs`, and the founder Person gained `knowsAbout` (8 real skills from /about's SkillsShowcase) and `alumniOf` (6 real employers from /about's ProfessionalJourney: PNC, Bank of America, Deloitte, TCS, KPMG, Express Scripts). Also fixed two real bugs found while doing this: (1) `logo` pointed at `/logo.png`, which 404s — repointed to the same headshot the static shell already uses; (2) `SEO_CONSTANTS.SOCIAL_PROFILES` had a dead GitHub URL (github.com/hirambarsky, 404) and a dead Twitter/X handle (@hirambarsky, verified 404 on both twitter.com and x.com with a browser UA) — corrected GitHub to github.com/hbarsky00 (matches this repo's git remote, verified 200), removed the dead Twitter/X entry rather than guess a replacement. Static index.html's LocalBusiness sameAs also got the GitHub addition for cross-page consistency. Re-ran capture-bodies (schema is Helmet-managed, not visible-body copy, but still needs recapture). FLAG for Hiram: no verified real Twitter/X handle — let me know if you have one and want it added back, or if the TWITTER_HANDLE meta tags (`@hirambarsky`, used in twitter:site/twitter:creator sitewide) should also be removed to match.
- [x] extractable Q&A — 2026-08-05 — this one turned up more than expected. `generateStructuredData` had a hardcoded FAQPage block that fired on the homepage with fabricated numbers ("boost conversion by 40%+", "measurable improvements within 2-4 weeks") — and no FAQ section is visibly rendered on the homepage at all, so it was a schema/content mismatch (a Google violation) stacked on invented metrics. Replaced with an opt-in `seoData.faqs` field threaded through `SEOInput`/`BuiltSEO` — schema can now only ever mirror content a page actually renders. Wrote 6 honest, answer-first questions (`SERVICES_FAQS` in seoData.ts, single source of truth for both the schema and the new visible FAQ section on /services) — no invented percentages, pricing, or project counts; every answer points to something checkable (the live products, the timeline already stated elsewhere on the page). Also rewrote `src/data/seoFaqs.ts`, which was live on every /store/product page carrying "$150-250/hour", "47+ successful projects", "WCAG 2.1 AA certified" — none of it real, and none of it even about the templates being sold there. Replaced with 3 honest questions about how the store actually works (Stripe checkout, email delivery). Deleted the unused `projectFaqs`/`servicesFaqs` dead exports. While verifying, found the same fabricated "40%+" claim a third time in `ServicesCallToAction.tsx` (live on all 3 design-services pages + store products) — and both of its CTA buttons were dead (`/get-started` 404s, `/projects` redirects to an anchor on an orphaned, unrendered component). Rewrote it to the same Calendly-first pattern used everywhere else. Verified: 129 JSON-LD blocks across the whole build, all valid; zero fabricated numbers; zero dead links; recaptured all affected prerendered-bodies.
- [x] citable resource content — 2026-08-05 — tightened "ChatGPT vs Claude vs Gemini for UX Workflows" (`src/data/blogData.ts`): sharpened the opening into a genuinely extractable answer-first sentence ("Short answer: ... Claude wins at X, ChatGPT wins at Y, Gemini wins at Z"), and added a scannable Model / Best For / Where It Pulls Ahead comparison table — exactly the shape an answer engine can lift directly as a snippet. Content itself was already honest (real per-model opinions, no fabricated stats), so nothing to strip here for once.

  Found a real, previously-unknown bug in the process: the table didn't render at all when first shipped — `src/utils/htmlSanitizer.ts`'s DOMPurify `ALLOWED_TAGS` allowlist had no `table`/`thead`/`tbody`/`tr`/`th`/`td`, so the whole table was silently stripped by `InternalLinkEnhancer.tsx`, which is the actual content-rendering path for every blog post on the live site. Same allowlist was also missing `figure`/`figcaption` — meaning the `<figure>` wrapper around every single post's inline hero image (all 7 posts share the `wrap()` helper) has been silently stripped in production, not just mine. The `<img>` itself survived (img was independently allowed) so this wasn't visually broken, just semantically degraded — but the table loss would have shipped completely empty had I not checked the raw output instead of trusting the source edit. Added all 8 tags to `ALLOWED_TAGS` (all inert structural/presentational tags, zero XSS surface — no change to script/iframe/object exclusions). Recaptured all 7 blog posts. Verified: table renders with real header cells, all 7 posts now carry their `<figure>` tag, whole-build JSON-LD (129 blocks) and fabricated-content/dead-link sweep both still clean.
- [x] structured-data validation sweep — 2026-08-06 — ran amazing-seo-skill's schema_recommended_fields.py against the live site (homepage, /services, a blog post, a case study — the sameAs/FAQPage findings it flagged there were already fixed locally in cycles 1-3, just not pushed yet, so not new work). It found one real, confirmed defect: Article schema had completeness_score 17 with the required headline field missing, on every blog post and case study. Root cause: generateStructuredData's baseStructuredData block set @type Article whenever seoData.type === 'article', but only ever populated name, never headline — so it shipped as a redundant, spec-incomplete duplicate sitting alongside the already-correct, complete BlogPosting/Article block that has proper headline/author/datePublished. Fixed by making baseStructuredData always @type WebPage (what it actually semantically is — the page container) and letting the dedicated Article-family block carry the article signal alone. One clean object instead of two overlapping ones. Also hardened capture-prerendered-bodies.ts: /case-studies/ring-rival (WebGL + persistent audio/animation) never reaches true networkidle no matter the timeout — ongoing background activity by design, not a slow load. Added a fallback to waitUntil "load" plus a longer settle delay when networkidle times out, rather than just raising the timeout further (confirmed that alone doesn't fix it — tried 40s, still timed out). Verified: 129 JSON-LD blocks, 0 invalid, zero Article without headline anywhere, ring-rival's captured body has real content (609 words), fabricated-content/dead-link sweep from prior cycles still clean.
- [x] llms.txt / cross-web consistency — 2026-08-06 — llms.txt regenerated and diffed against the committed version: zero drift, already accurate (no code change needed there). Swept every sameAs target and every live-product URL referenced sitewide (services proof rail, structuredCaseStudies.ts projectLink fields, llms.txt): LinkedIn (999 — its standard bot-wall, not a real failure), github.com/hbarsky00, ringrival.today, catchbuddy.fit, firelion.netlify.app, nudgemeapp.netlify.app, herbalink.live, splittime.pro, and the Calendly booking link all resolve clean (200). **roicalc.one (ROI Design Calculator) is completely dead** — not slow, not erroring, DNS resolution fails outright (`curl: Could not resolve host`), confirmed 3x with generous timeouts and cross-checked against a known-good domain in the same environment to rule out a local DNS issue. `whois` shows the domain registration itself is ACTIVE (expires 2026-09-08, not lapsed) with valid nameservers assigned (NS1) — but the DNS zone has no A record. Reads like a host-side disconnection (e.g. a Netlify custom-domain link dropped) rather than domain expiry. **This is an external infrastructure issue, not a codebase bug — flagging for Hiram rather than guessing at a fix or silently pulling the live references.** roicalc.one is currently linked from /services (proof rail), the ROI Design Builder case study's projectLink, and llms.txt — all still pointing at it since I don't know if this is transient or already being fixed; happy to strip/relabel those references next cycle if it's still down.
- [x] content freshness / gap-fill — 2026-08-06 — while scanning `PROJECT_SEO_MAP` (`seoData.ts`) for generic descriptions, found something worse than generic: 8 of 16 entries carried specific, unsubstantiated percentage claims ("45% faster," "3x faster," "60% for diabetic patients"...) that appear nowhere in the actual case-study content — the 2026-07-15 honesty pass fixed the page bodies but never touched this file, the meta layer AI engines and search snippets actually read. Replaced crypto/herbalink/investor-loan-app/dae-search with the same honest description already vetted in structuredCaseStudies.ts for each; smarterhealth/medication-app/gold2crypto (no live route, no real content anywhere) got a plain "no case-study writeup exists yet" instead of a fabricated stat, since they're not going away as source entries even though nothing links to them.

  business-management needed more than a text fix. `structuredCaseStudies.ts` has no entry for it at all — `StructuredBusinessManagementCaseStudy.tsx`'s null-check falls back to `<Navigate to="/projects">`, which itself redirects to a `/#projects` anchor that doesn't exist on the current homepage (found broken in the lever-2 cycle, different component). Net effect: `/project/business-management` — a "featured," sitemap-indexed, supposedly-real case study — was silently serving the **homepage** in its body while its `<head>` claimed to be an Enterprise Ops Platform case study. Confirmed live: fetched the page and found the homepage's own `<h1>HIRAM BARSKY</h1>` sitting inside what should have been a case-study body. Checked for any real content to restore it with — the only other place with a description (`src/data/projects/projectsList.ts`, a separate legacy system) has a *different* fabricated stat (68%, not seoData's 60%) — no honest source exists anywhere. Per the skill's own rule, didn't invent one. Instead: removed `business-management` from `FEATURED_PROJECTS` (stops it being indexed/prerendered/sitemap-listed), added a clean 301 (`/project/business-management` → `/case-studies`, matching the existing pattern for smarterhealth/medication-app/gold2crypto), and fixed the component's fallback target from the broken `/projects` to the real `/case-studies` (necessary, not cosmetic — a client-side `<Link>` navigation there would bypass Netlify's redirect entirely and hit the same broken fallback). **FLAG for Hiram: business-management has no real case-study content anywhere and is now de-indexed. If it's worth featuring, it needs an honest writeup — happy to draft one once there are real facts to work from (what shipped, what the actual constraints/decisions were).**

  Verified: zero fabricated stats anywhere in the built output (grepped for every pattern found this cycle plus every pattern from cycles 1-4), business-management no longer has a prerendered file, whole-build JSON-LD (126 blocks, down from 129 — correctly reflects business-management's 3 schema blocks dropping out) all valid, recaptured all 39 remaining routes' schema.

## Cycle 1 complete (2026-08-06) — all six levers done.

## Out-of-band: full CTA/funnel audit (2026-08-06)

Not an AEO lever — Hiram reported zero business and floated pivoting the site to
"digital agency" framing. Pushed back (still solo; that framing would be the
same kind of fabrication this project has been removing) and proposed auditing
every CTA/link/form for dead conversion paths first, since the last two AEO
cycles alone had already turned up four dead CTAs. Approved: "do it all."

Swept every `<Link to>`, raw `href`, `navigate()`, `window.open()`, and
`getElementById`/`scrollIntoView` pair in the codebase, cross-referenced
against the real route list in `App.tsx`, and traced every flagged component
up its import chain to confirm whether it's actually reachable from a live
route before spending time on it.

**Likely root cause of zero business, found and NOT fixable by me:** the
`/contact` page's backend — Supabase Edge Function `send-contact-email` — is
crashing on every single request. Confirmed by probing it directly:
`500 WORKER_ERROR: "Function exited due to an error (please check logs)"`,
reproduced 2x including on a bare `OPTIONS` preflight (before any form data is
even processed) — consistent with a top-level crash, most likely
`new Resend(Deno.env.get("RESEND_API_KEY"))` throwing because the
`RESEND_API_KEY` secret is missing/invalid in the Supabase project. This form
isn't only on `/contact` — `CaseStudyContactSection` embeds the same component
on most case-study pages via `StructuredCaseStudyLayout`. **I don't have
Supabase secrets and won't ask for them** — flagging for Hiram to check
Supabase dashboard → Edge Functions → `send-contact-email` → Logs, and
Project Settings → Edge Functions → Secrets. Everything else checked out
healthy: `stripe-api-handler` (store checkout) and `process-lead` (the
`/free-audit` form) both respond cleanly to the same probe.

Real, live bugs found and fixed:
- **`FloatingConsultationBubble`** (the homepage's floating "Book A Free
  Consultation" button, mounted sitewide via `HomepageLayout.tsx`) required
  BOTH `getElementById("hero")` and `getElementById("contact")` to be
  non-null before it would ever render. Neither exists — the homepage wraps
  the hero in `id="intro"`, not `"hero"`, and there's no homepage contact
  section at all. The button has never been visible, on any scroll position,
  on any visit. Repointed the visibility check to the real `id="intro"` and
  the click handler to `navigate("/contact")` instead of a phantom scroll
  target.
- The wrong-GitHub-account bug fixed on the default hero theme (Cycle 2 lever
  2) also existed independently on the Win95 easter-egg theme
  (`Win95Hero.tsx`) — each hero theme hardcodes its own social links rather
  than sharing one source. Fixed to `hbarsky00`.
- **Resolved the LinkedIn slug flag from Cycle 2 lever 2.** Full sitewide
  search found 8 live usages of the hyphenated `hiram-barsky` — including
  `Footer.tsx` (every page) and `ContactInformation.tsx` (`/contact`) — versus
  exactly one outlier, the unhyphenated `hirambarsky` in
  `SEO_CONSTANTS.SOCIAL_PROFILES`. A second, independent outlier turned up in
  the static `index.html` shell's hand-written LocalBusiness schema (the
  original source, predating the dynamic schema, apparently never touched
  when GitHub was corrected there in Cycle 1). Fixed both to match the
  8-to-1 majority. Can't verify via curl either way (LinkedIn returns 999 to
  bots regardless of slug) but this is strong enough evidence to trust over
  a schema constant that was itself probably typed wrong originally.

Found, deliberately NOT fixed — content/business calls, not mechanical bugs:
- **`src/pages/services/{MvpValidation,AiRedesign,ConversionAudit}.tsx`** —
  three fully-built, unrouted service pages, each full of the exact
  fabricated-stat pattern already removed everywhere else this project
  ("85% Faster Time to Market," "47% Average Conversion Increase," "3x Faster
  Design Process," etc.). Left unrouted rather than wiring up fake numbers to
  fix a 404. Would need an honest content rewrite before ever being safe to
  route.
- **`src/pages/LeadCapture.tsx`** (unrouted) — `LeadCaptureForm.tsx`'s
  `handleSubmit` is entirely fake: `await new Promise(resolve =>
  setTimeout(resolve, 1000))` then a success toast claiming "Check your email
  in the next 10 minutes" — the data is never sent anywhere. Dead code today,
  but a landmine if anyone ever routes this page without noticing.
- `ProfessionalJourney.tsx`'s per-employer percentage claims — still
  unresolved from Cycle 2 lever 2, still flagged, not touched.

Confirmed dead/unreachable (traced import chains, not touched): `Hero.tsx`,
`About.tsx`, `Contact.tsx` (the bare `components/` versions, distinct from the
routed pages), `Win98Hero.tsx`/`Win98Window.tsx` (no `themeId` ever selects
"win98"), `MinimalHero.tsx`, `EnhancedHero.tsx` + `EnhancedHeroBackground.tsx`
+ `HeroSocialLinks.tsx`, `AboutPreview.tsx`, `ServicesPreviewSection.tsx`,
`QuickNavigation.tsx`, `EditableImage.tsx`, `RecentAdventuresSection.tsx`,
`ScrollEngagement.tsx`, `ExitIntentDetector.tsx`, `ProjectDetailContent.tsx` /
`EnhancedProjectDetail.tsx` / `ModernProjectDetail.tsx` (and their shared
`ProjectCallToAction.tsx`, which has its own dead `/get-started` and
`/#contact` links — inert since nothing reachable renders it),
`ConsolidatedServicesSection.tsx` (also has a dead `/get-started` link, also
inert), `leads/LeadCaptureForm.tsx` (a second, different fake-ish form using
a `submit-lead` function), `ProjectContactSection.tsx`, `skip-link.tsx`.

Verified: typecheck clean, build clean, 40 routes recaptured, 129 JSON-LD
blocks, 0 invalid, GitHub link sitewide confirmed to only ever resolve to
`hbarsky00`, LinkedIn link sitewide confirmed to only ever resolve to
`hiram-barsky` (including the static shell), fabricated-stat sweep clean
(the three unrouted service pages are excluded from the sweep by virtue of
staying unrouted).

## Cycle 2 (started 2026-08-06)
- [x] entity hardening (second pass) — 2026-08-06 — lever 1 already got a thorough pass in Cycle 1 (sameAs, knowsAbout, alumniOf, fixed dead logo/GitHub/Twitter), so this pass targeted what the Cycle-1 lever-4 schema sweep (`schema_recommended_fields.py`) had flagged and left unaddressed: Organization's `recommended.missing` was `["sameAs", "description", "address", "foundingDate"]` — `sameAs` got fixed in Cycle 1, leaving three gaps. Added `description` (reused `SEO_CONSTANTS.DEFAULT_DESCRIPTION`, the same text already used sitewide — no new copy invented) and `address` (reused the exact `PostalAddress` — Clifton, NJ, US — already declared in the static shell's LocalBusiness block in index.html, so the dynamic and static schemas now agree) to the top-level `organizationSchema` object in `structuredDataUtils.ts`. Skipped `foundingDate` — no verified date exists for when "Hiram Barsky Design" started as a branded practice (distinct from the "15+ years" career-length figure used elsewhere), and inventing one would be exactly the kind of fabrication this whole project has been removing.

  While verifying, ran a full regression sweep and found the JSON-LD-block-counting method from prior cycles' verification had a latent bug of its own: `data-rh="true"` script-tag variants (added by Helmet on top of the plain ones) weren't matched by the regex used in earlier verification passes, which undercounted blocks in a couple of spot checks along the way — not a site bug, just a check that needed a slightly looser tag-attribute pattern. Corrected for this pass; whole-build count is unaffected (organization schema was always present, just briefly under-detected while debugging).

  Also confirmed (not fixed, already known): the `68%` fabricated stat in the legacy `src/data/projects/projectsList.ts` (business-management's old description, flagged in Cycle 1) still ships inside `dist/assets/*.js` because it's bundled, but traced every consumer (`GlobalCaptionGenerator.tsx`, `ProjectPdfExporter.tsx`, `useProjectDetail.ts`) and none are wired into any routed page in `App.tsx` — genuinely dead/unreachable code, not a live regression. No action needed beyond this confirmation.

  Verified: typecheck clean, build clean, all 39 routes recaptured (bodies + schema), 126 JSON-LD blocks across the whole build, 0 invalid, all 39 Organization blocks now carry both `description` and `address`, spot-checked `/services`' captured schema directly. Fabricated-stat and dead-link sweeps from prior cycles still clean (aside from the already-flagged, confirmed-dead `projectsList.ts` bundle noise above).
- [x] extractable Q&A (second pass) — 2026-08-06 — added an honest, answer-first FAQ section to `/about` (`ABOUT_FAQS` in seoData.ts, rendered by new `AboutFaqSection.tsx`, wired into the FAQPage schema the same single-source-of-truth way `/services` already works). Deliberately a different angle from `SERVICES_FAQS`: entity/bio questions (who Hiram is, what his background covers) rather than engagement-process questions — "Is he a designer or a developer?", "What companies has he designed for?", "How long has he been doing this?", "Where's he based / does he work remotely?", "What industries does he have direct experience in?". Every answer reuses facts already vetted elsewhere in the codebase (the employer list from `alumniOf`, the "15+ years" line from PersonalStory, the Clifton NJ address just added to the Organization schema) — nothing new invented. Deliberately did NOT cite any of `ProfessionalJourney.tsx`'s per-employer percentage claims (see flag below).

  Researching /about for genuine FAQ material turned up three real, previously-undiscovered bugs, all fixed:
  1. **Homepage hero's GitHub icon pointed at the wrong account.** `HeroContent.tsx` linked `github.com/hbarsky` (no "00") — confirmed via `git remote -v` and comparing profile page titles that this is a real but *different* GitHub account, not the one that owns this repo. Visitors clicking it landed on a stranger's profile. Corrected to `hbarsky00`, matching this repo's own remote and the `sameAs` value already fixed in Cycle 1. (LinkedIn has the same kind of mismatch — schema says `linkedin.com/in/hirambarsky`, the hero says `linkedin.com/in/hiram-barsky` — but LinkedIn returns 999 to bots either way, so there's no way to verify which slug is real without Hiram confirming. Left both untouched; flagging below.)
  2. **`/about`'s "Start a Project" button did nothing.** It called `scrollIntoView` on `document.getElementById('contact')`, but no element with `id="contact"` exists anywhere reachable from that page — a silent no-op click, the worst kind of broken CTA since nothing visibly fails. Repointed to the real `/contact` route via `Link`.
  3. **`/free-audit` 404'd despite a complete page already existing for it.** `src/pages/FreeAudit.tsx` and `src/components/forms/FreeAuditForm.tsx` were fully built (91 lines, real lead-capture form) but never registered in `App.tsx` — a whole lead-gen funnel was silently unreachable. Registered the route, added SEO metadata (`STATIC_PAGE_SEO['/free-audit']`, description drawn from the page's own existing copy, no new claims), and added it to `STATIC_PATHS` so it's sitemapped and prerendered like every other real page.

  **Correction to the record:** re-verified the `/projects → /#projects` redirect that Cycle 1 (and `ServicesCallToAction.tsx`'s comment) called broken — it is NOT broken. `id="projects"` exists and is live: `HeroContent.tsx` renders it with real shipped-product links, and `HeroContent` is actually mounted via `ThemedHero` → `HomepageLayout` → `Index`. The earlier finding conflated it with a *different*, genuinely-orphaned `Projects.tsx`/`FeaturedProjects.tsx` pair that also happens to use `id="projects"` but isn't rendered anywhere. Not reverting the earlier business-management fallback fix (pointing at `/case-studies` instead is still fine either way) — just correcting the claim so it doesn't get "fixed" again based on a stale note.

  **FLAG for Hiram:**
  - LinkedIn slug mismatch (`hirambarsky` vs `hiram-barsky`) — can't verify via curl since LinkedIn blocks bots uniformly (999 either way). Let me know the real one and I'll make both agree.
  - `ProfessionalJourney.tsx`'s employer bullets each carry a specific percentage claim (PNC: engagement +40%, satisfaction +25%; Bank of America: errors -15%, engagement +10%; Deloitte: engagement +20%; TCS: revenue +15%, support load -10%; KPMG: cost -10%, revenue +14%; Express Scripts: satisfaction/engagement +30%, turnaround -20%). Unlike the case-study stats fixed earlier this project, there's no cross-file contradiction proving these are fabricated — they read like fairly typical resume-style figures from corporate performance reviews, which may be real and defensible. Not touching them without your say-so; flagging because they're the same shape as everything else this project has been removing, and they now sit right next to a freshly-schema'd, freshly-FAQ'd About page.

  Verified: typecheck clean, build clean, all 40 routes recaptured (bodies + schema, `/free-audit` now has a real captured body instead of the prerender warning it started with), 129 JSON-LD blocks across the whole build (up from 126 — the new `/about` FAQPage schema), 0 invalid, `about.html`'s FAQPage block has exactly 5 questions matching the 5 rendered on the page, homepage's built GitHub link now only ever points to `hbarsky00`, `/contact` and `/free-audit` hrefs confirmed present in `about.html`'s built output, fabricated-stat sweep from prior cycles still clean.

## Out-of-band: CatchBuddy de-featured pending refinement (2026-08-07)

Hiram: "take catchbuddy case studies of the list for now, we have to refine
this." Removed CatchBuddy from every promotional/discovery surface site-wide
while leaving the underlying page, route, and case-study content untouched —
this is a de-listing, not a deletion, so it's easy to re-add once the case
study is reworked.

Removed from: `scripts/seo-routes.ts`'s `FEATURED_PROJECTS` and
`FEATURED_CASE_STUDIES` (drops it from the sitemap and prerendering — direct
links to `/project/catchbuddy` and `/case-studies/catchbuddy` still resolve,
they're just no longer indexed or promoted), the homepage's
`FeaturedCaseStudiesSection.tsx` and `VideoCaseStudiesSection.tsx`, the
`/case-studies` index page, the default hero's `SHIPPED` list
(`HeroContent.tsx`) and the shared `HERO_PROJECTS` list every other hero theme
consumes (`themes/projects.ts`), the `/services` proof rail (repointed the
"Mobile app design" service's proof to NudgeMe alone, since it was the only
other mobile-relevant live product already listed there), `RelatedProjects.tsx`
(the "see also" cross-links shown on other case studies), and
`caseStudyNav.ts` (case-study prev/next navigation).

Also found CatchBuddy named by mention, not just listed, in two FAQ answers
(`SERVICES_FAQS` and `ABOUT_FAQS` in seoData.ts — both feed directly into
FAQPage schema, so this was live in structured data too) — a plain grep for
"catchbuddy" across `dist/*.html` after the first build caught it. Trimmed
both sentences to the remaining real products rather than leaving a
half-true "proof" claim.

Deliberately left untouched: `App.tsx`'s routes (page stays reachable),
`structuredCaseStudies.ts`'s actual case-study content (that's what's being
refined, not deleted), `seoData.ts`'s `PROJECT_SEO_MAP` entry for catchbuddy
(harmless per-page metadata while unindexed), `ProjectPromoBanner.tsx` (still
correctly cross-links `/project/catchbuddy` ↔ `/case-studies/catchbuddy` for
anyone who does land there directly), and `Win98Hero.tsx` (confirmed dead
code — no `themeId` ever selects "win98").

Deleted the now-orphaned `prerendered-bodies/{project,case-studies}-catchbuddy.{html,schema.html}`
files, matching the established convention from de-featuring
business-management in Cycle 1.

Verified: typecheck clean, build clean, 38 routes (down from 40) recaptured,
123 JSON-LD blocks, 0 invalid, zero "catchbuddy" mentions anywhere in the
built output outside its own two page files, sitemap.xml no longer lists it.

- [x] citable resource content (second pass) — 2026-08-07 — Cycle 1 tightened "ChatGPT vs Claude vs Gemini for UX Workflows"; this pass picked the next weakest post for extraction: "Learning AI Design with Claude: A Designer's Starter Kit" had a strong opinionated opener but no scannable structure at all — four H2 sections with prose underneath, nothing an answer engine could lift as a direct answer to "how do I start using Claude as a designer." Added an answer-first lead sentence and a 4-item "The starter path, in order" `<ol>` right after the intro, summarizing (not just repeating) the four sections below it in imperative, numbered form — same pattern that worked for the model-comparison table in Cycle 1. Content itself was already honest (no invented stats), so nothing to strip.

  Bonus: the built output shows `InternalLinkEnhancer`'s auto-linker correctly cross-linked "three-line prompt" in the new list to the "Prompt Engineering for Designers" post — working as intended, not something I added by hand.

  Verified: typecheck clean, build clean, 38 routes recaptured, 123 JSON-LD blocks, 0 invalid, the new `<ol class="list-decimal">` confirmed present with all 4 items intact in the built HTML (one item's plain text is legitimately split by the auto-inserted internal link — checked the raw HTML directly rather than trusting a naive grep), fabricated-stat sweep clean.
- [x] structured-data validation sweep (second pass) — 2026-08-07 — ran `amazing-seo-skill`'s `schema_recommended_fields.py` against the live `/about` and `/services` (still the pre-this-session-of-fixes deploy, since nothing's been pushed since the last "push" — expected, matches Cycle 1's note that this can surface already-fixed-but-unpushed items rather than new work). Organization schema on both pages now scores 89/100, only `foundingDate` missing — deliberately skipped, no verified date, would be fabrication, same call as Cycle 2 lever 1. Real new finding: `FAQPage` scored only 50/100 on both pages, missing the recommended `name` field entirely. Added `name: "Questions worth answering up front"` to the shared FAQ schema builder in `structuredDataUtils.ts` — matches the literal, identical visible `<h2>` on both current FAQ sections (`Services.tsx` and `AboutFaqSection.tsx`) word-for-word, so schema still can't claim anything the page doesn't actually show. Noted in the code that this should become per-page if a future FAQ section ever uses different heading wording.

  Other flagged-but-not-fixed items, same both pages: `LocalBusiness` missing `openingHours`/`geo`/`aggregateRating`/`review` (a design consultancy doesn't really have posted hours; geo coordinates and reviews are facts I don't have and won't estimate), `WebSite` missing `description`/`inLanguage` (lower priority, not touched this pass), `WebPage` missing `datePublished`/`dateModified`/`breadcrumb`/etc. (these are evergreen pages, not dated articles — breadcrumb schema specifically would need a real breadcrumb component, a bigger lift than this lever's scope). None of these are quick, honest wins the way the FAQPage `name` field was — leaving for a future pass rather than manufacturing partial/fabricated values to close them out.

  Verified: typecheck clean, build clean, 38 routes recaptured, 123 JSON-LD blocks, 0 invalid, both FAQPage blocks (`/about`, `/services`) confirmed to carry `name: "Questions worth answering up front"` in the built output.
- [x] llms.txt / cross-web consistency (second pass) — 2026-08-07 — regenerated `llms.txt` and `sitemap.xml` (`npm run predev`) and diffed against committed versions: zero drift, both already accurate — the out-of-band CatchBuddy de-listing earlier this cycle already regenerated them correctly. Re-checked every live-product URL referenced sitewide: catchbuddy.fit, firelion.netlify.app, herbalink.live, nudgemeapp.netlify.app, ringrival.today, splittime.pro all still resolve 200. **roicalc.one is still dead**, unchanged from the Cycle 1 finding — re-verified with a fresh `curl -v` (`Could not resolve host`) and `dig` (nameservers still assigned to NS1, `dig +short roicalc.one A` returns nothing — no A record). Same external, host-side issue as before, not something a code change can fix. No new action needed on it beyond this re-confirmation; still linked from /services and the ROI Design Builder case study, untouched pending word from Hiram on whether it's being fixed. This was a clean confirmatory pass — no code changes, following the skill's own rule not to invent work when a sweep comes back clean.
