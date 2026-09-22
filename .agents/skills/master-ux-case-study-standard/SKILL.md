---
name: master-ux-case-study-standard
description: Writing, auditing, or rewriting any project / case-study page so it reads like senior/principal product judgment — decisions, tradeoffs, constraints, outcomes — not generic portfolio filler. Use when editing case study copy, drafting a new project page, or running an audit against existing pages.
---

# Master-Level UX Case Study Standard (All Project Pages)

**Use when:** Writing, auditing, or rewriting any project / case-study page so it
reads like senior product judgment — not generic portfolio filler.

---

## The one principle everything follows from

Seniority is shown through **decisions and tradeoffs made under constraints**, and
the **outcomes** they produced — NOT through process steps or adjectives. Juniors
describe what they built and how nice it looks. Principals explain what they
chose, what they gave up, *why*, and what happened. Every section below exists to
surface a decision, a constraint, or a result. If a sentence does none of those,
cut it.

For Hiram specifically, the sharpest senior signal is the **honest
AI-collaboration line**: owning what AI did and where *his* judgment was the
actual value. That reframes "built with AI tools" from a weakness into the exact
thing a Lead/Principal hire is paid for — knowing what to trust, what to throw
away, and what to never let the machine decide.

---

## The page arc (every project)

Keep each section short and punchy; pair with a visual (text → image → text →
image). The words carry the judgment; the images carry the proof.

1. **One line:** what it is + who it's for, plainly. No "revolutionary platform."
2. **Problem & stakes:** what was broken/needed, for whom, and why it mattered
   (user *and* business). Concrete.
3. **Constraints:** the real conditions — scope, time, team size, tech, business
   goals. Senior work is judgment under constraints, so name them. (Solo build,
   3-week runway, no real users yet — say it.)
4. **Role & the AI-collaboration truth:** what YOU drove vs. what AI/tools did.
   Be specific about where your judgment was the value-add.
5. **Key decisions & tradeoffs:** 2–3 real decisions. For each: the options, what
   you chose, what you rejected, and WHY (tied to a user or business goal). This
   is the heart of the page.
6. **Outcome:** what happened. Measurable where it's honest; qualitative + honest
   where it isn't. Never a fake or unverifiable metric.
7. **Reflection:** what you'd do differently / what you learned. Maturity reads
   as seniority.

---

## Writing principles

- **Specificity beats vocabulary.** "Cut signup from 6 steps to 2" >
  "seamless, intuitive experience."
- **Every decision needs its why.** A decision without a rationale is decoration.
- **Lead with judgment, not process.** Don't list persona→wireframe→test as a
  checklist; show the calls you made and why.
- **Honesty is a credibility signal.** Owning what AI did and what you judged is
  *more* impressive than pretending you hand-crafted everything.
- **Tradeoffs prove seniority.** Anyone can say what they built; seniors say what
  they gave up and why.
- **Write for someone who can smell BS** — a hiring manager or fellow senior
  designer. They want decisions and outcomes, not adjectives.

---

## The jibberish smell test (red flags)

A line is jibberish if:
- It could appear on ANY designer's portfolio (generic = jibberish).
- It says what you did with no *why it mattered*.
- Adjective density is high and decision density is low.
- It lists process as a checklist with no judgment shown.
- The metric is vague or unverifiable.

**Banned filler** (delete on sight): seamless, intuitive, user-centric,
leveraged, synergy, robust, scalable (unasserted), cutting-edge, game-changing,
holistic, passionate, delightful, elevated, empowered — unless immediately backed
by concrete evidence.

---

## Before / after

- ❌ "I leveraged a user-centric approach to create a seamless, intuitive
  experience that delighted users."
  ✅ "Users were dropping at the address step. I cut it and inferred location from
  their first search — completion went from 41% to 68%."

- ❌ "I designed a robust, scalable design system."
  ✅ "One designer, 3-week runway: I built 12 components instead of a full system
  — enough to ship the 4 screens that mattered — and documented which gaps were
  deliberate vs. unfinished, so the next hire knew the difference."

- ❌ "I used AI to accelerate my workflow."
  ✅ "AI drafted the first pass of every screen; my job was deciding which to
  throw away. The one thing I wouldn't let it guess was the trust model — who
  sees what, and when — because getting that wrong would've broken the whole
  premise."

---

## Per-page checklist

- [ ] Problem and stakes are concrete (not "users wanted a better experience").
- [ ] Constraints are named.
- [ ] Role is explicit; AI-vs-judgment is honest and specific.
- [ ] 2–3 decisions, each with options + choice + rejected + why.
- [ ] At least one real tradeoff stated.
- [ ] Outcome is honest (real metric or honest qualitative).
- [ ] Reflection present.
- [ ] Zero banned filler words.
- [ ] No sentence that could live on any other designer's site.

---

## Audit prompt (run on each existing page)

> Audit this case study against a senior/principal UX standard. For each section,
> tell me: (1) does it state a decision, constraint, or outcome — or is it filler?
> (2) flag every banned filler word (seamless, intuitive, user-centric, leveraged,
> robust, etc.), (3) flag any claim with no "why it mattered," (4) flag any
> process described as a checklist with no judgment shown, and (5) flag any vague
> or unverifiable metric. Then rewrite the weakest section to lead with a decision
> + its rationale + the outcome. Don't add adjectives; add specifics.

---

## Pairs with

- `strategic-principal-voice` — voice/banned-phrases enforcement layer.
- `mem://portfolio/psychological-impact-reframing` — frame outcomes as belief
  shifts in users, not pixel deliverables.
