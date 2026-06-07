---
name: case-study-audit-rewrite-workflow
description: Systematic audit-and-rewrite workflow for case study / project pages. Use when auditing an existing case study, identifying the weakest section, or rewriting a section to lead with decision + rationale + outcome. Pairs with master-ux-case-study-standard.
---

# Case Study Audit & Rewrite Workflow (All Projects)

**Use when:** Ready to systematically audit and rewrite case studies to
master-level standard. Run once on each project page, top to bottom.

---

## Hiram's case studies (confirm + add if missing)

- Fire Lion (arcade game, Cub Mode, word-spell system)
- Ring-Rival (mobile web boxing game)
- CatchBuddy (location-aware pickup sports matching)
- HerbaLink (verified herbalist platform)
- Valora Bet (social prediction markets)
- ROI Design Builder (financial modeling tool/workshop)

---

## The audit checklist (per project page)

### Problem & stakes
- [ ] Concrete problem statement (what was broken/needed, for whom).
- [ ] Stakes are clear (user + business impact).
- [ ] No generic language like "users wanted a better experience."

### Constraints
- [ ] Real constraints named (scope, time, team, budget, tech).
- [ ] Stated, not hidden.

### Role & AI honesty
- [ ] Specific role is explicit.
- [ ] What AI/tools did vs. what was judged is clear and specific.
- [ ] Shows judgment (what was thrown away, trusted, never let the machine decide).

### Key decisions & tradeoffs
- [ ] At least 2–3 real decisions documented.
- [ ] For each: options, what was chosen, what was rejected, why.
- [ ] At least one tradeoff stated (what was given up and why).

### Outcome
- [ ] Honest result (real metrics OR qualitative + honest).
- [ ] No vague or unverifiable claims.

### Reflection
- [ ] What would be done differently is present.
- [ ] What was learned is stated.

### Language quality
- [ ] Zero banned filler (seamless, intuitive, user-centric, leveraged, robust, scalable, cutting-edge, game-changing, holistic, passionate, delightful, elevated, empowered).
- [ ] Every sentence serves a decision, constraint, or outcome.
- [ ] No sentence that could live on any other designer's site.

### Structural
- [ ] Text → image → text → image format is clean.
- [ ] Sections are punchy and scannable.
- [ ] Adjectives are earned or cut.

---

## The audit prompt (run on each case study)

> **AUDIT CHECKLIST — [PROJECT NAME]**
>
> Read this case study against a senior/principal UX standard. For each section
> below, (1) state whether it expresses a decision, constraint, or outcome — or
> is it filler? (2) flag every banned filler word (seamless, intuitive,
> user-centric, leveraged, robust, scalable, cutting-edge, game-changing,
> holistic, passionate, delightful, elevated, empowered), (3) flag any claim
> with no "why it mattered," (4) flag any process described as a checklist
> (personas→wireframes→test) with no judgment shown, (5) flag any vague or
> unverifiable metric.
>
> Then pick the ONE weakest section (most jibberish-heavy or most generic) and
> rewrite it to lead with a decision + its rationale + the outcome. No new
> adjectives; add specifics.
>
> Sections to audit:
> - Problem & stakes
> - Constraints
> - Role & AI honesty
> - Key decisions & tradeoffs
> - Outcome
> - Reflection
> - Language quality (banned words, adjective density)

---

## The rewrite prompt (for weak sections)

> **REWRITE [SECTION NAME] — [PROJECT NAME]**
>
> This section reads generic / filler-heavy. Rewrite it to lead with:
> 1. A specific decision or constraint (not a process step).
> 2. The rationale (why it mattered to the user or business).
> 3. The outcome (what happened).
>
> Rules:
> - Cut all adjectives except those earned by concrete evidence.
> - No banned filler (seamless, intuitive, user-centric, leveraged, robust, etc.).
> - Every sentence must state a decision, constraint, or outcome.
> - If a tradeoff is mentioned, state what was given up and why.
> - Write for a hiring manager who can smell BS — they want judgment and
>   outcomes, not nice words.
>
> Original text:
> [PASTE THE WEAK SECTION HERE]
>
> Rewritten:

---

## The workflow (how to apply this)

1. **Pick the weakest project** — most generic or filler-heavy.
2. **Run the audit checklist** on that case study.
3. **Use the audit prompt** (apply to the page).
4. **Identify the ONE weakest section** from the audit results.
5. **Use the rewrite prompt** to fix that section.
6. **Repeat for the next project**.

After 2–3 projects, the pattern locks in.

---

## What "done" looks like

- Every section expresses a decision, constraint, or outcome.
- Zero banned filler words.
- The weakest section is still strong (specific decision + rationale + outcome).
- Reader can see judgment, not a generic template.
- A hiring manager thinks "this person knows what they decided and why."

---

## Pro tip

Fastest unlock: add ONE real tradeoff to each case study. One sentence:
"I chose X over Y because ___, and gave up ___." That single line signals
seniority more than anything else.

---

## Pairs with

- `master-ux-case-study-standard` — the principles and smell test this workflow
  enforces. Read it when unsure whether something is filler.
- `strategic-principal-voice` — voice/banned-phrases enforcement.
