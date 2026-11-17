# Research log — barskydesign.pro

The RESEARCH lens of the every-2-days loop. One entry per run, newest first.

This log exists because the other three lenses (FINDABILITY, CRAFT, FLOW) all
measure the site against itself. None of them asks the only question that
decides whether the phone rings: **what does the person doing the hiring
compare this site against, and what are they actually filtering on?** That
question needs outside evidence — the market, the competition, the words
buyers use — not another pass over our own HTML.

Rules for this lens:

- **Cite the source.** A claim about what buyers want needs a URL or a quote,
  not a hunch. Label every finding `Confirmed` (external source or
  deterministic check), `Likely` (reasoning plus one signal), or
  `Hypothesis` (reasoning alone).
- **No invented metrics.** The hard rules in `auto-improve-loop.md` apply in
  full. Research is the lens most likely to tempt a fabricated statistic;
  it is the one place that would do the most damage.
- **End in a change or an explicit "no change".** Research that does not
  reach the site is a blog post for an audience of one.

---

## 2026-11-16 — RESEARCH — what the peers who outrank and outconvert this site actually do

Hiram's ask, verbatim: *"i want to scan others who are doing it way better than
me and do the things other sites are doing."* So this run went outside the repo
first and only came back to change something the evidence supported.

### Who actually owns the queries a founder types — `Confirmed`

Three searches for the buying language (`freelance product designer who also
codes hire for SaaS app`, `hire freelance UX designer for startup MVP web app
internal tools`, and an "available for projects" variant) returned **almost no
individual portfolios**. Page one is Upwork, Contra, Toptal, Fiverr, Codementor,
Guru, Freelancer, Arc. The only individual humans surfaced were *inside* those
marketplaces as profiles.

This is the second independent confirmation of what `project_barskydesign_findability`
already concluded: **head terms are unwinnable.** Not "hard" — structurally
unwinnable, because the SERP is a marketplace SERP. No amount of on-page work on
a one-person site displaces Upwork for "hire freelance SaaS designer". Any plan
that routes through ranking for those phrases is a plan to lose.

What that leaves: long-tail problem-shaped queries, AI-engine citation, and
direct/referral. All three are won by having a lot of specific, opinionated
writing — which is the next finding.

### What the peers in this exact lane are built on — `Confirmed`

Three independent design-engineer sites, fetched and read:

| | Above the fold | Proof | Availability | Primary CTA |
|---|---|---|---|---|
| **ishadeed.com** (Ahmad Shadeed) | H1 is the *service*: "UX Design, Web Design Engineering, and UX Audits", then "I bridge the gap between design and development" | Book, paid course, conference talk, a coined term (Defensive CSS), **"3400+ subscribers"**, 2 projects, 6 recent articles | implied by the CTA | **"Book a call"** button |
| **olivierlarose.com** | "Independent Design☼Engineer" + **"Based in Montreal"** | ~30 projects as a scannable table: Project / Category / Client / Year. No metrics, no testimonials | none | a `Contact` mailto in the nav |
| **emilkowal.ski** | His name, then "Design Engineer" | Shipped products people use (Sonner, Vaul), 7 articles, **"previously Linear and Vercel"** | **stated outright: "Currently taking a break from work"** | course enrollment |

Three things all of them do that this site does not:

1. **An explicit availability signal.** Emil states his plainly. This site has
   **none** — grepped `src/` for availability language and found nothing but an
   image-error string. For a founder deciding whether to bother writing, "can I
   even hire this person right now" is the cheapest question to answer and we
   answer it nowhere. `Confirmed` absent. **FLAGGED, not fixed:** the content is
   a fact only Hiram knows, and `auto-improve-loop.md` forbids a run inventing
   availability. The slot is his to fill.
2. **Place, stated where it is read.** Olivier puts "Based in Montreal" in the
   hero. This site mentions New Jersey **once**, on the contact page, at
   `text-xs text-muted-foreground`, and has no `addressRegion`/`addressLocality`
   in schema at all. With GBP and `sameAs` still pending, that is a free entity
   signal going unused. `Confirmed` absent. Not fixed this run — one change per
   run; logged as the next candidate.
3. **Writing as the funnel, surfaced early.** Ahmad's homepage puts recent
   articles up front with "View all articles". His ranking comes from the
   article corpus, not from a portfolio page.

### The finding that got fixed — `Confirmed`, deterministic

Point 3 turned out to be where this site was actively broken, not merely behind.

**49 of this site's 66 URLs are blog posts — 74%.** The corpus is already the
biggest findability asset here, and it is the one thing the marketplace SERPs
cannot take. And **nothing on the site sorted it by date.**

`blogPosts` was exported in the order posts were written into the file, with new
posts appended. The newest post sat at **index 38 of 48**. Three surfaces
published that order as recency:

- the homepage **"Latest Insights"** strip — `blogPosts.slice(0, 3)`, so it
  advertised **August 7, July 18 and July 11** while **November 10, November 3
  and October 27** sat unlinked. Three months of the newest writing invisible on
  the page most likely to be a founder's first stop.
- the `/blog` index — rendered the newest post **39th down a 48-post page**.
- the LLM content export (`export/extractors/homepage.ts`) — same `slice(0, 3)`,
  so the stale three were also what fed AI consumers.

Worse than stale: one of the three being advertised was
`what-is-an-ai-first-product-designer` — **the retired positioning**, which the
2026-11-14 run had just finished stripping out of `og:site_name` across all 66
pages. It was still the site's own headline recommendation of what to read.

**Fixed at the source**, not at the three call sites: `blogData.ts` now keeps the
file-order array private and exports `blogPosts` sorted newest-first. All three
surfaces corrected by one change; `.find()` and `.map()` consumers are
order-independent and unaffected.

The homepage subtitle was corrected in the same pass. It promised "Expert
perspectives on AI-enhanced design, accessibility, and conversion optimization"
— a topic list that **none of the six newest posts** match. The strip now reads
"Notes from designing and shipping products — written as decisions, not method."

Top six after the fix, all current and all founder-relevant:

- Nov 10 — The take-home test stopped proving anything
- Nov 3 — Your design system now has two readers, and one of them is a model
- Oct 27 — A case study is a record of decisions, not a record of work
- Oct 20 — What I actually use AI for, hour by hour
- Oct 13 — Research with no budget, when the tempting shortcut is a model
- Oct 6 — Generated layouts all have the same problem

**Verified both ways** before shipping, per
`feedback_verify_the_checker_not_just_the_code`: the assertion that the order is
chronological **fails against file order** and **passes against the exported
array**. A check that could not fail would have proved nothing.

### The real finding, which came from Hiram, not from the research — `Confirmed`

Mid-run he asked: *"the only emails i get is designers telling me they can make
my site better , i wonder why that is ?"*

That is a measurement, not a complaint, and it points at something none of the
four lenses had ever looked for. **The corpus selects its own audience, and this
one selects designers.**

Measured over all 48 posts:

- **13 titles name a design practitioner as the reader, in the title itself** —
  "Prompt Engineering for Designers", "How to Interview a Designer Now", "Your
  portfolio gets read by a robot before a human", "ChatGPT vs Claude vs Gemini
  for UX Workflows", "From Figma to Production with AI: A Modern Designer's…",
  "Half of designers now ship AI-written code", "AI ate the entry-level job.
  Nobody trained the juniors yet.", "Making the business case for design", "The
  Designer Who Codes Argument Is Over", "What is an AI-first product designer?",
  "A case study is a record of decisions", "Your design system now has two
  readers", "Learning AI Design with Claude: A Designer's…". No judgement call
  is involved in that count; the reader is named on the page.
- A title-by-title read of the rest puts roughly **28 of 48 writing to the
  design profession against 11 writing to someone who owns a product**, with 9
  genuinely ambiguous.
- **Five of the six newest posts are for the profession.** The corpus has been
  drifting further that way, not less.

A blind keyword classifier run as a cross-check split 19/19, but it is a weak
instrument and should not be quoted as agreement: it scores
`trust-is-a-design-material` and `solo-building-with-ai` as buyer content when
the reader of both is plainly a designer. The title-name count above is the
number that holds.

**So the inbound is correct.** 49 of 66 URLs are posts; those posts rank for
designer queries; Google and the answer engines classify the entity from what it
writes about; the people who arrive are designers, and the ones with something
to sell send email. A founder with a broken internal tool never enters this
corpus at all. The site is not failing to convert founders — **it is not
reaching them**, and the thing doing the reaching is pointed elsewhere.

This also indicts the fix made earlier in this same run. Sorting the strip by
date made its "Latest" claim true, and in doing so put **three pieces of career
advice for designers** on the page whose only job is to convert a founder. Date
was the wrong selector for that slot. The sort stays — `/blog` and the LLM
export should be chronological — but the homepage now **picks** instead:

| | |
|---|---|
| `why-enterprise-tools-lose-to-excel` | internal tools, directly on positioning |
| `demo-works-shipping-is-different` | the thing a founder is actually afraid of |
| `design-for-the-approval-gates` | regulated work — fintech, healthcare, pharma |

Heading changed with it, from "Latest Insights" to **"If you're building
something"**, subtitle "Three on what actually sinks a build. The rest of the
writing is in the archive." All three picks verified to resolve against the real
corpus before shipping; a renamed slug degrades to newest-first rather than
blanking the section.

**What this run deliberately did NOT do:** decide the corpus strategy. Eleven
good buyer-facing posts already exist and are now reachable from the homepage.
Whether the next 48 posts keep addressing the profession — which builds
reputation among peers — or turn toward the people who hire, is a positioning
decision and Hiram's alone. **FLAGGED.** Worth noting the two are not exclusive:
Ahmad Shadeed writes for practitioners *and* sells audits, but his H1 names the
service, not the craft.

### Still open, in priority order

1. **Availability line** — needs one sentence from Hiram. Highest-value gap
   found this run; every peer has it, we have nothing.
2. **Place in the hero and in schema** — `addressRegion` / `addressLocality`,
   plus a visible location line. Free entity signal, no new facts required.
3. **The homepage FAQ is `hidden md:block`** — absent on mobile, which is what
   Google indexes. Previously logged, still open.
4. Olivier's **dense project table** (Project / Category / Client / Year) is far
   more scannable than large cards. Worth testing against the five-product grid.

Not touched, deliberately: the hero eyebrow reads "Lead Product Designer", an
employee title on a site selling an independent practice that designs *and*
builds — all three peers put the independent, dual-discipline identity there.
Positioning is settled and not a run's to rewrite. **FLAGGED for Hiram.**

---

## 2026-11-12 (second pass) — RESEARCH — four claims the site was making that were not true

Same day, same lens, continued on Hiram's instruction to keep going. Where the
first pass fixed what the site *failed* to say, this one fixed what it was
saying that was false.

### F5 — Every animated heading on the site serialised as one run-on word. `Confirmed`.

`CharacterAnimation` rendered `type="word"` as a list of spans with
`className="inline-block mr-[0.25em]"` and **no space character between them**.
It looked correct, because a quarter-em margin looks like a space. It was not
one.

What a screen reader announced, and what a non-JS crawler read out of the
prerendered HTML:

    Fiveproductsyoucanopenrightnow
    Recentadventures
    GetinTouch
    FrequentlyAskedQuestions

Measured against the live HTML before the fix: `grep -c "Recent adventures"`
returned **0** and `grep -c "Frequently Asked Questions"` returned **0**, on a
page that visibly contains both. Every animated `h1`/`h2` on every page was
affected.

Fixed by emitting a real space between words. Whitespace between inline-block
elements still renders as a word space, so nothing moved visually — and it
removed the trailing margin the last word carried, which had been pushing every
centred heading a quarter-em off centre.

### F6 — The LazySection "known-open item" was wrong and had been misdirecting runs. `Confirmed`.

`auto-improve-loop.md` has carried a note since August that lazy-wrapped
sections (adventures, contact, blog) are absent from the prerendered HTML.
Retested directly: `capture-bodies` drives a real browser that scrolls, so
IntersectionObserver fires and the children **are** captured. "Senior Lead
Product Designer" and "Send message" are both in the live HTML while still
wrapped.

The note existed because someone grepped for the heading text and got zero
hits — which was F5, not LazySection. One bug generated a fake second bug and a
standing instruction to go do unnecessary work. Corrected in the playbook.

### F7 — `/store/success` congratulated visitors on a purchase that cannot happen. `Confirmed`.

A live, reachable route reading "Purchase Successful!", "You should receive an
email with your download links shortly", and "Access to templates is immediate
and lifetime". There is no checkout on this site, no payment provider anywhere
in the repo, and no email delivery. Every sentence was false. Deleted; the URL
now 301s to `/store`.

### F8 — `usePageIndexing` injected two meta tags no engine reads, and logged on every navigation. `Confirmed`.

The hook ran on `/` and `/services`. It called `submitUrlForIndexing`, which
only `console.log`s and returns true; injected `<meta name="crawl-priority">`
and `<meta name="fetch-priority">`, neither of which is a real meta tag; and
printed a debug object to the production console on every route change.

Deleted, along with the `pageIndexingConfigs` list it read — which named seven
`/case-studies/*` paths that have never been routes on this site, including the
deliberately retired Investor Loan study — and the unused local
`generateSitemapEntries` that would have emitted sitemap entries for all of
them. The real sitemap comes from `sitemapGeneration.ts`.

### F9 — The About section told founders the work stops at a prototype. `Confirmed`.

"What I Bring" ended: *"…and build prototypes that validate concepts."* That
sentence sat directly beneath five products a founder can open and use, and it
is the precise claim F1 says buyers filter on. The same block opened with "I
help early-stage startups transform complex problems into intuitive user
experiences that drive real business results" — a sentence with no checkable
content — and closed with an undated "Currently specializing in…", the same
class of time-stamped claim that produced the fourteen-month-stale section.

Rewritten so every sentence is checkable against the rest of the page: one
person through launch, what a project starts from, what it ends as, and where
AI actually fits. Positioning unchanged — AI stays a capability, not the
pitch.

### F10 — The FINDABILITY lens's main checker was broken and reported every route as missing a title. `Confirmed`.

`scripts/seo_audit_all_routes.py` matched `<title>`. react-helmet-async emits
`<title data-rh="true">`, so the pattern matched nothing and the script printed
`MISS` for the title on **all 66 routes**. The titles were there the whole time.

A checker that reports 66 false positives is worse than no checker: it buries
its real findings, and it teaches whoever reads the report to skim past it.
Regex fixed — and the report underneath turned out to have 21 genuine findings
nobody could see (F11).

### F11 — 21 blog posts shipped an og:image that social platforms crop badly. `Confirmed`.

With the checker fixed, 21 posts flagged `SIZE`: their `og:image` pointed at the
raw cover art rather than a card. Those covers are 3:2 or 16:9 — one is
1400x1008 — and LinkedIn, X and Slack crop to roughly 1.91:1, so a share
centre-cropped the artwork into whatever happened to be in the middle. This is
Hiram's main distribution channel.

Thirteen of the 21 **already had a correct 1200x630 card** sitting unused in
`public/images/og/`; `BLOG_IMAGE_MAP` in `seoData.ts` simply had no entry, so
they fell through to the cover. Those cost nothing but the mapping. The other
eight were generated by the existing script.

### F12 — The card generator printed literal "u2019" where apostrophes belong. `Confirmed`.

Found by looking at a generated card instead of trusting the exit code. The
first new card read:

    Products donu2019t fail because theyu2019re wrong.

`blogData.ts` stores curly apostrophes as `\u2019` escapes, and the parser's
generic `\\(.)` unescape stripped the backslash and left the text `u2019`.
Decoding `\uXXXX` before that strip fixes it. **Twelve cards already live had
this defect** — exactly the twelve posts whose title or excerpt contains an
apostrophe — so it had been shipping to LinkedIn for as long as those cards
existed. All regenerated; the other 62 came out byte-identical, which is the
confirmation that the generator is deterministic and nothing else moved.

### F13 — `npx tsc --noEmit` has been a no-op. The ship gate was checking nothing. `Confirmed`.

The worst finding of the day, and found only because an earlier fix *should*
have failed to compile and didn't.

The root `tsconfig.json` is a solution-style config: `"files": []` plus two
project references. A bare `tsc --noEmit` against it compiles **zero files** and
exits 0 regardless of what is broken — references are only built when you point
at a project or pass `-b`.

Proved by appending `const __canary: number = "nope";` to `seoData.ts` and
running the gate:

    npx tsc --noEmit            → exit 0, no output
    tsc -p tsconfig.app.json    → src/data/seoData.ts(535,7): error TS2322

Every "tsc --noEmit clean" recorded in this repo — including three earlier in
this same session — meant nothing.

Turning it on surfaced 12 real errors that had been invisible: `vite/client`
was missing from `types` in `tsconfig.app.json` (the explicit array overrides
the default, so `import.meta.env` and `*.jpg` modules were untyped), eleven
`window.gtag` calls with no declaration, and a JSON import cast to a tuple type
TypeScript refuses directly. All fixed; both projects now check clean.

Added `npm run typecheck`, which runs both projects properly, and changed the
ship gate in `auto-improve-loop.md` and in the scheduled task to call it.

### F14 — The hand-maintained content dates fed nothing. `Confirmed`.

`check-content-dates.mjs` audits `modified` in `BLOG_SEO_MAP` and
`PROJECT_SEO_MAP`. It reported **47 of 51 routes stale**.

Two of those were a classification problem: commits `c15f7d2f` and `850d2417`
only unwrapped and rewrapped internal `<a>` tags — every word identical — which
is the same shape as the commit already in the script's `STYLE_ONLY` set. Added
them: 47 → 31.

The script was also reading a **commented-out** route (`{/* ... HIDDEN */}`),
which is how the deliberately retired Investor Loan study kept reappearing in
the report. A report that lists a pulled case study is how a pulled case study
gets put back. Now skips comment lines.

The rest were real: 21 entries had a wrong or absent `modified`, and seven posts
had no `BLOG_SEO_MAP` entry at all, so they could never declare one. Those seven
were seeded from exactly what each page was already serving — no copy rewritten.

Then the point of the whole exercise turned out to be missing. `getBlogSEO`
and `getProjectSEO` return only `kind`, `title`, `description` and `image` —
they **drop `published` and `modified` on the floor**. `seoBuilder` maps those
two onto `publishedTime`/`modifiedTime`, `structuredDataUtils` reads
`modifiedTime` for JSON-LD `dateModified`, and `generate-sitemap` reads
`.modified` for `<lastmod>`. All three received `undefined` and silently fell
back to the publish date.

So the dates were hand-maintained, audited by a dedicated script, and consumed
by nothing. That is why they drifted: there was no way to see the effect of
keeping them right. Two fields added to two return objects; verified in the
built output — `dateModified` and `<lastmod>` now read 2026-11-12 for a post
edited today, and the sitemap's dates spread across six real dates rather than
all being stamped with the build date.

Checker now reports **0 stale of 50 routes**, down from 47 of 51.

### Left open

- **The homepage FAQ is `hidden md:block`** — absent from the mobile layout
  entirely. Still in the DOM and still indexable, but Google indexes
  mobile-first and extractable Q&A is this site's whole AEO play. A collapsed
  accordion on mobile is the obvious answer; it changes mobile page length
  materially, so it wants its own FINDABILITY run.
- **Four orphaned thumbnails** at `public/images/working-on/` and **14 iCloud
  conflict copies** in `src/assets/blog/` (1.8 MB directory, none imported).
  Both are deletions, which are Hiram's call.
- **Still no analytics.** Unchanged from the first pass, and still the biggest
  unlock for this lens.

---

## 2026-11-12 — RESEARCH — the homepage's "Now" section was fourteen months stale

**Research question.** A founder lands on barskydesign.pro with a product that
is stuck. They can hire a design studio, a Toptal/Contra freelancer, or an
in-house contractor. What do they filter on before they book a call, and does
this site survive that filter?

No users were recruited — this is desk research. Sources: live freelance
listings and hiring guidance for 2026 design roles, plus a heuristic pass over
the live site and a deterministic check of every product link.

### Findings

**F1 — Buyers in 2026 filter on live, openable products, not case studies.
`Confirmed`.**
Current postings for AI-native product design ask for "real products or
functional prototypes you've built using AI development tools" and "evidence
of shipped code and system thinking over purely visual aesthetics." Hiring
guidance in the same market argues a portfolio of five polished screens loses
to one showing "a shipped product with before/after metrics." The recurring
advice to buyers is to ask for live links rather than case studies.

Sources:
- <https://designproject.io/jobs/ai-native-product-designer-at-metalab-avyj83>
- <https://dribbble.com/jobs/311231-Product-Design-Builder>
- <https://blog.codercops.com/blog/how-to-hire-ux-designer-product-design-2026>

**F2 — The homepage answered that filter with stale work-in-progress.
`Confirmed`.**
`CurrentProjectsSection` carried a hand-typed eyebrow reading "Last Updated
Friday September 19th, 2025" — **fourteen months old on the day it was found**
— above a paragraph promising "I keep this section updated." Four cards, all
badged "Work in Progress," none of them shipped since. The QR-code card's copy
was truncated mid-word: "…easy customization on the fl".

A section whose entire claim is *now* is worse than no section once the date
rots. It converts a credibility asset into evidence that the practice is
dormant, sitting directly between Selected Work and the CTA.

**F3 — Five genuinely shipped products were nowhere on the homepage.
`Confirmed`.**
Verified by HTTP request on 2026-11-12, all 200:
herbalink.live, catchbuddy.fit, stips.bet, ringrival.today, firelion.me.
Only two (CatchBuddy, HerbaLink) appeared anywhere on the homepage, and only as
a secondary "View live" link under a case study. The exact proof F1 says buyers
filter on existed, and the page did not show it.

**F4 — `quickqr.app` is not Hiram's. `Confirmed`.**
Checked because a sixth product looked like a candidate for the new section.
`quickqr.app` returns 200 with the title "quickqr.app · Free QR codes forever";
Hiram's is `quickqrnew.netlify.app`, titled "QuickQR — free QR code generator,
no expiry". Different products. Not added. The five-live-products rule in
`auto-improve-loop.md` stands.

### What shipped

`CurrentProjectsSection` → `ShippedProductsSection`. Five cards, each a real
2x screenshot of the live site captured the same day, each linking to the
running product in a new tab, each naming its stack. The sixth grid cell —
which would otherwise be whitespace — is the next step: a link to /contact for
the founder who has just opened two of them.

**The date stamp is gone and deliberately not replaced.** The hand-maintained
date was the root cause, not a symptom: nothing in the new section expires,
so nothing has to be remembered. The one maintenance rule is written into the
component's header comment — load the URL and screenshot it before adding a
row.

### Left open

- **Animated headings serialize without spaces.** `AnimatedText` spaces words
  with `mr-[0.25em]` instead of space characters, so every animated `h2` on the
  homepage has a `textContent` of "Fiveproductsyoucanopenrightnow",
  "Recentadventures", "GetinTouch". That is what a screen reader announces and
  what a non-JS crawler reads out of the prerendered HTML. Site-wide,
  pre-existing, and a strong candidate for the next FINDABILITY run. Not
  touched here — it is a shared component and deserves its own verified change.
- **Four orphaned thumbnails** remain at `public/images/working-on/`
  (qr-code-creator, roi-calculator, faces-of-hunger, crypto-app-learning).
  Nothing references them now. Left on disk rather than deleted: the standing
  rule is that removing content is Hiram's call. The four Loom URLs they went
  with are preserved in the git history of the deleted component.
- **No analytics behind any of this.** Every finding above is desk research or
  a deterministic check. GA4 and Search Console exports would turn "a founder
  probably bounces here" into a number. Still the single highest-value unlock
  for this lens, and still not done.

---

## 2026-11-17 — FLOW: the site was addressed to the wrong reader

Hiram asked, on 2026-11-16: *"the only emails i get is designers telling me
they can make my site better, i wonder why that is?"* The 11-16 pass answered
the honesty half of that — every invented metric is gone. This run answers the
other half, which is the one that actually changes the inbound.

### The finding

Of 48 posts, **17 are addressed to someone who owns a product and 31 to the
design profession.** The buyer-facing writing was already on the site. Nothing
was missing. It was sorted by date into a list headed "UX Design & AI
Insights", so "Why Enterprise Tools Lose to Excel" sat between "The take-home
test stopped proving anything" and "Your design system now has two readers".

A corpus selects its own readers. This one had been selecting peers.

### What the search result said

The homepage title and description are the headline and snippet Google shows,
and both named the wrong audience:

```
UX Designer Portfolio — Hiram Barsky, Product Designer
Senior UX designer portfolio with case studies in AI, fintech, healthcare,
and cyber — showing measurable user outcomes and product design impact.
```

"Portfolio" is a word designers and recruiters search. "Senior UX designer" is
a job-seeker's self-description, not a vendor's. And the second half is true of
every design site ever built, so it distinguishes nothing. That pair is the
single highest-leverage string on the site for this problem and it had survived
three positioning passes untouched.

### What changed

| Surface | Was | Now |
|---|---|---|
| Homepage `<title>` | UX Designer Portfolio — Hiram Barsky, Product Designer | Hiram Barsky — Product Designer & Front-End Developer |
| Homepage description | Senior UX designer portfolio… | One person who designs and builds SaaS, web apps and internal tools… |
| `/blog` `<title>` | UX Design Blog — Product Design Insights | Notes on Building and Shipping Products |
| `/blog` `<h1>` | UX Design & AI Insights | Notes from building and shipping products |
| `/services` `<title>` | UX/UI Design Services | Design & Build Services — SaaS, Web and Internal Tools |
| `/services` `<h1>` | Product Design & Gen AI Development | SaaS, web apps and internal tools — designed and built by one person |

`/blog` is now two tracks. **"If you're building something"** leads with the 17
buyer-facing posts as cards; **"If you do this work"** follows with the other 31
as a dense list. Nothing was unpublished — every post keeps its URL. The split
lives in one place, `BUILDER_SLUGS` in `blogData.ts`, and `BlogPreview` tops up
the homepage strip from the same track instead of from whatever is newest.

### Two things found while looking, not looked for

- **`SERVICES_DATA` advertised "Machine Learning Models".** That export is not
  rendered anywhere — `ContentExport.tsx` is its only consumer, so its entire
  job is telling answer engines what Hiram sells. He does not train models.
  Same class of problem as the invented numbers in `seoFaqs.ts`: an unearned
  capability claim, machine-readable, where no human reading the site would
  ever see it to object. Replaced with the four engagements that exist as real
  pages.
- **`/blog` staggered 48 cards at `index * 0.1`,** so the last card began
  animating 4.8 seconds after the first. Everything below the fold arrived
  after the reader did. Capped at 5 steps.

### Still open, in priority order

1. **Write for the buyer.** Everything above makes 17 existing posts findable.
   It does not add one. The next posts decide whether this holds.
2. ~~Animated headings serialize without spaces.~~ **Already fixed, and the
   claim above was wrong.** Carrying the previous run's open item forward
   without re-checking it was the error: `CharacterAnimation` now emits a real
   space character between words, and production confirms it —
   `curl https://barskydesign.pro/` returns "Five products you can open right
   now", not "Fiveproductsyoucanopenrightnow". Another session fixed it. An
   open item inherited from an older log is a claim, not a fact; verify it
   before repeating it.
3. **The hero capability pill still says "AI & Emerging Tech / Gen AI,
   Automation"** — the last visible survivor of the retired positioning.
4. **Still no analytics.** Every finding here is desk research. GA4 and Search
   Console would turn "a founder bounces here" into a number.

---

## 2026-11-17 (second pass) — the linker was rewriting his sentences

Found while checking whether internal links routed a founder anywhere useful.
They did not — but that turned out to be the smaller problem.

`InternalLinkEnhancer` injected internal links by **replacing** the matched
keyword with a different phrase from its rule table. The rule for the keyword
`AI` carried `anchorText: 'designing and building products'`. So this was live:

```
source  : "Let me just say it: AI didn't kill the entry-level job."
rendered: "Let me just say it: designing and building products didn't kill
           the entry-level job."

source  : 'Everyone slapped "AI" on their title this year'
rendered: 'Everyone slapped " designing and building products " on their title'

source  : "...the parts AI genuinely couldn't do, is in the Ring-Rival case study."
rendered: "...the parts designing and building products genuinely couldn't do..."

source  : "Budget goes to what gets measured."
rendered: "cost-effective user research methods goes to what gets measured."

source  : "twenty articulate interviews before lunch"
rendered: "twenty articulate UX job search strategies before lunch"
```

**30 of 48 posts**, measured, not estimated. Two more could not be located by
the checker — a checker limitation, reported separately rather than counted as
content findings.

The rule table also pointed every link at designer-facing posts (portfolios,
the UX job search, a designer's AI career, research methods), so a founder
reading "Why Enterprise Tools Lose to Excel" was handed three links into
career content — and the internal link graph, which is a strong signal about
what a site is *about*, argued the site was for designers. Same audience
problem as the `/blog` index, one layer down.

### Fixed

- The injector now wraps the matched phrase (`$1`) instead of substituting a
  different one. A linker links; it does not edit.
- Rules are multi-word and specific. Single common words — `AI`, `research`,
  `career`, `budget` — matched nearly every post and were the direct cause of
  the mangling.
- Rules reordered buyer-facing first, since only three are injected per post.

### The gate

`scripts/check-prose-integrity.mjs`, wired into `postbuild`. It compares each
post's normalised visible text in `prerendered-bodies/` against the `content`
template literal in `blogData.ts`. Markup changes pass; a changed, added or
dropped word fails.

**It was proven to fail before it was trusted** — run against the bodies that
were live at the time, it caught all 30. Every other gate in this repo checks
structure: links resolve, captions differ from alt text, dates parse. None of
them checked that the words on the page are the words in the source, which is
why this ran for as long as it did with nobody noticing.

### The gate immediately found a second thing

Once `check-prose-integrity.mjs` was comparing all 49 posts (the first version
silently covered only 42 — see below), it flagged
`/blog/chatgpt-vs-claude-vs-gemini-for-ux`. Not the linker this time: the
**sanitizer**.

`src/utils/htmlSanitizer.ts` allowed `p`, `div`, `img`, `span` and friends, but
not `table`, `thead`, `tr`, `th`, `td`, `figure` or `figcaption`. Two
consequences, both live:

- **Table text was deleted, not unwrapped.** DOMPurify normally keeps the text
  of a disallowed element, but HTML's table parsing rules foster-parent content
  out of a table whose cell elements have been removed. The comparison table in
  that post shipped with its entire header row — "Model", "Best for", "Where it
  pulls ahead" — simply absent from the page.
- **Every blog image caption lost its `<figcaption>`.** The text survived as
  ordinary body copy: same size, same weight as the paragraph above it, photo
  credit and all. Restored, it renders at 14px in the muted tone, measured at
  **9.64:1** against the page background.

Added `figure`, `figcaption`, the full table set, plus `hr`, `small`, `sup`,
`sub`, `del`, `ins`, and the `colspan`/`rowspan`/`scope` attributes. Every one
is an inert, non-scriptable editorial element; `style` and `div`, already
allowed, each carry strictly more risk.

### Two corrections to this log

- **The first version of the gate covered 42 of 49 posts and reported
  success.** Seven posts build their body through a `wrap()` helper rather than
  a bare template literal, and the parser skipped them without saying so — a
  gate claiming to pass over partial coverage, which is the exact failure in
  [[feedback_verify_the_checker_not_just_the_code]]. It now parses both shapes
  and **fails** if it cannot parse a post at all.
- **The first run also reported six false positives.** Wrapping a phrase in an
  anchor puts a tag boundary mid-sentence, and stripping tags there leaves a
  space: "approval chain ," against a source of "approval chain,". Identical
  prose. The comparison now ignores whitespace entirely, which kills that whole
  class of artifact and still catches any changed, added or dropped word.
