# Relationship design — barskydesign.pro

Written 2026-11-14, applying the `relationship-design` skill (Agentic UX /
relationship-centric interfaces) to this site. This is reference material for
the **FLOW** lens of `docs/auto-improve-loop.md`. It is a candidate list, not a
mandate — a run picks one thing from it, ships it, and logs it.

---

## The reframe, and its honest limit

The skill's own "when NOT to use" list names static content sites. Taken
literally, this site is out of scope: no accounts, no sessions, nothing to
learn from.

But that describes the *site*, not the *decision*. Nobody hires a designer off
one visit. The real shape of the thing we are designing for is:

| Visit | When | Device | What they do |
|---|---|---|---|
| 1 | day 0 | phone, from a search result or a shared link | 2–3 min, skims, leaves |
| 2 | day 3–14 | desktop | reads one case study properly |
| 3 | before emailing | desktop | re-checks one specific thing — price, availability, whether he's done their kind of work |
| 3b | sometimes | a cofounder's machine | gets sent the link, arrives cold |

**The site treats all four as visit one.** That is the entire opportunity, and
it needs no AI, no chatbot, and no account system to act on.

### What this is NOT a licence to do

Writing these down because the skill is seductive and this is a live portfolio
that already works:

- ❌ No chatbot, assistant, or "ask my portfolio a question" widget.
- ❌ No fake personalization — "welcome back, founder!" on a stranger's browser.
- ❌ No invented memory. If we can't observe it, we don't display it.
- ❌ No dark theme. Never. (See the loop playbook.)
- ❌ No tracking pixel, no third-party analytics beyond what Hiram already runs.
- ❌ Nothing that restyles the site. Sharpen within the visual language.

---

## Pillar 1 — Memory

### Current state (verified 2026-11-14)

The site persists exactly one thing about a visitor:

```
src/components/bounce-reduction/ScrollEngagement.tsx:
  localStorage.getItem('engagement-shown')
```

A boolean, written the first time the scroll prompt fires, never expiring.
**The site's entire memory of a human being is "have I already interrupted
this person."** That is the only relationship state in the codebase.

It also has a real consequence worth noting: a founder who visits in January
and returns in March gets *less* than a first-timer — the prompt is suppressed
forever — while nothing else about the site acknowledges they've been here.
The one piece of memory we have is spent on suppression.

### Candidates

**M1. Read-state on case studies.** Mark which of the 13 case studies this
browser has opened. On `/projects`, lead with the unread ones rather than a
fixed order. localStorage only, no account.
*Why it moves a booking:* visit 2 currently shows the same wall as visit 1, so
a returning founder re-skims instead of going deeper.
*Ceiling:* per-device. The cofounder who gets the link is a first-timer and
should be — don't try to fix that.

**M2. Resume affordance.** If they left a case study partway, offer one quiet
line to pick it back up. One line, dismissible, never a modal.

**M3. Forgetting control — required if M1 or M2 ships.** A visible way to clear
it, in the footer or wherever the state is surfaced. On a stranger's site,
memory without a visible off-switch reads as surveillance, not service. This
is not optional polish; it ships in the same commit.

**M4. Expire `engagement-shown`.** Today it is permanent. A timestamp with a
~30-day window would let a genuinely returning visitor see the prompt again
without nagging anyone inside one decision cycle. Smallest real change on this
list.

---

## Pillar 2 — Trust as a design material

This is the pillar that matters most here and needs zero new technology. The
skill's three-stage model maps cleanly onto how someone decides to hire:

| Skill's stage | What it means for a founder reading this site |
|---|---|
| Transparency | "Show me how you think." Case studies with real decisions and tradeoffs. **This site's existing strength.** |
| Selective disclosure | "I believe you can think. Now: can you do *my* thing?" |
| Autonomy | They stop verifying and book the call. |

The site is strong at stage 1 and has almost nothing for stage 2. Everything is
pitched at the same volume on every page; nothing changes as a reader goes
deeper.

### The stage-2 question

**What is a founder still checking, right before they email?** Candidates,
honestly labelled:

- **Price band.** FLAGGED in the loop playbook — Hiram's rate is not in the
  repo and must never be invented. But "how engagements are priced" (fixed
  scope? retainer? discovery first?) is a *shape*, not a number, and the shape
  is the thing that unblocks people. **Needs Hiram.** Flag it, don't guess.
- **Availability.** Same — a shape ("taking work from X"), not a promise.
  **Needs Hiram.**
- **How a project starts.** What the first two weeks look like. This one is
  probably derivable from the case studies already in the repo.
- **What he doesn't do.** A short, confident exclusion list is one of the
  strongest trust signals a freelancer has, and it costs nothing. **Needs
  Hiram** for the content, but the slot can be designed.

### T1. Trust recovery — check this first

The skill is blunt that systems without a recovery path lose trust
permanently. The contact form is settled and working and must not be
re-audited (standing rule). **But a FLOW run may still verify the failure
path**: what a visitor sees if submission fails — network error, validation
error, double-submit. Reading what the failure state renders is not an audit of
the form and does not violate the rule. If there is no visible failure state,
that is a finding.

---

## Pillar 3 — Relationship architecture

**Does trust build across a visit, or restart on every page?**

Most visitors do not land on the homepage. They land on a case study from a
search result. So the highest-value question for a FLOW run is:

> Land cold on `/project/herbalink` with no referrer and no homepage visit.
> Does that page work as a first impression — who is this, what does he do,
> what do I do next — or does it assume you arrived from the homepage?

Every case-study route is a potential front door. If each one restarts the
relationship from zero, trust never compounds across a visit no matter how good
the writing is.

**R1.** Audit one case study as a cold landing page. Not all 13 — one, the one
with the most organic entries if that is knowable, else HerbaLink.

**R2.** The end of a case study is the highest-trust moment on the whole site
and currently hands off to a generic next step. See Pillar 4.

---

## Pillar 4 — Paths, not menus

The skill's "systems plan their own path" translates, without any agent, to:
**the site should construct the next step rather than offering a menu.**

**P1. Relevance-ordered next step.** A founder finishing HerbaLink (two-sided
marketplace, booking, trust between strangers) should be handed the most
adjacent work next — not alphabetical order, not a nav bar. Hand-authored
adjacency in the case-study data is enough; this does not need to be computed.

**P2. One next step, not three.** Where a page ends in a choice between
"see more work / read the blog / contact me", the reader does none of them.
Pick the one that matches where they are in the decision.

---

## Pillar 5 — Metrics (and why every finding above is a hypothesis)

The skill insists on measuring relationship quality over time rather than
per-session conversion. Here that would be:

- **Return-visit rate** — what fraction of visitors come back at all.
- **Depth on return** — pages per returning visitor vs. first-time.
- **First visit → contact lag** — days, not minutes. The real sales cycle.
- **Contact-form referrer** — which page was the reader on when they decided.
  Single most actionable number on this list.

**None of this is measurable today.** `docs/research-log.md` already names it:
no analytics behind any of it, GA4 and Search Console exports are "the single
highest-value unlock for this lens, and still not done."

That has a direct consequence for how this playbook gets used: **every
candidate above is a hypothesis.** Ship them because they are defensible design
improvements, not because we know they convert. Do not write a number into a
log that no instrument produced.

---

## Priority order for FLOW runs

Highest value per unit of risk, top first:

1. **R1** — cold-landing audit of one case study. Pure diagnosis, zero risk,
   likely to produce the biggest single finding on the site.
2. **T1** — verify the contact form's *failure* state renders something.
3. **P1** — relevance-ordered next step at the end of one case study.
4. **M4** — expire `engagement-shown`. Small, real, self-contained.
5. **P2** — collapse a three-way ending into one next step.
6. **M1 + M3 together** — read-state plus its forgetting control. Never M1
   alone.
7. **M2** — resume affordance. Only after M1 has been live a while.

**Flagged for Hiram, never to be invented by a run:** pricing shape,
availability shape, the "what I don't do" exclusion list. A run may design the
slot and leave it unpopulated behind a flag; it may not write the content.

---

## How a FLOW run uses this file

1. Read `docs/design-log.md` for `FLOW —` lines; skip anything already done.
2. Take the highest unfinished item above that fits in one run.
3. If it touches more than ~3 components, it is too big — split it and log the
   rest.
4. Ship it through the normal gate (`npm run typecheck`, `npm run build`,
   `npm run capture-bodies` if visible copy changed, push, verify live).
5. Append a `FLOW —` line to `docs/design-log.md` saying what changed, what was
   measured, and what is still open — **including a run that ships nothing.**
