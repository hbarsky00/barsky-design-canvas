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
