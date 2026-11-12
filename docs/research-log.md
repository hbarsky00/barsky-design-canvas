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
