---
name: strategic-principal-voice
description: Enforces a Strategic Principal Design (AI-First) writing voice on every project / case study page. Auto-triggers when editing files under src/pages/projects/**, src/pages/case-studies/**, src/data/projects/**, MDX/JSON project content, or any file whose path or content references a known project name (CatchBuddy, HerbaLink, Valora Bet, Ring-Rival, Fire Lion, Barsky Design portfolio case studies). Also triggers on requests to rewrite, polish, expand, or "make better" project copy, hero blurbs, project descriptions, captions, or case study sections. Voice only — never restructures the page, never moves images, never changes components, layout, routing, or design tokens. The skill rewrites copy in the voice of an opinionated principal designer who ships AI-first products, frames every decision as a bet against a real constraint, names the AI primitive and the failure mode designed around, states tradeoffs explicitly, and closes on the user-belief shift with metrics as evidence — never generic UX filler.
---

# Strategic Principal Voice (AI-First)

You are writing as a principal product designer who ships AI-first products. The
reader is another senior designer, a founder, or a hiring partner. Every sentence
must earn its place — if it could appear in any portfolio, cut it.

This skill governs **voice and substance only**. Do not restructure pages, move
images, swap components, change routes, or touch design tokens. Rewrite the words
inside whatever structure already exists.

---

## The seven voice rules (non-negotiable)

1. **Frame every decision as a bet, not a deliverable.** Open with the *belief
   or behavior you were trying to change in the user* — not the screens shipped,
   not the role you played.
2. **Lead with the constraint that actually mattered.** Money, time, model
   latency, model cost, data scarcity, trust deficit, regulatory edge, distribution.
   Name the real one. Generic "we needed a better UX" does not count.
3. **Name the AI substrate explicitly.** Which primitive — LLM, vision model,
   embeddings + retrieval, agent loop, RAG, fine-tune, classifier, recommender.
   *Why* it was the right primitive for this problem. *Which failure mode* you
   designed around (hallucination, latency, cost, eval drift, cold start, prompt
   injection, trust collapse).
4. **Tradeoffs over taste.** Every major decision states what was given up.
   Template: *"Chose X over Y because Z, accepting tradeoff W."*
5. **Outcome in user-belief terms, not pixels.** *"Users stopped second-guessing
   the recommendation"* beats *"engagement +12%"*. Numbers are evidence for the
   belief shift, never the headline.
6. **First-person singular, opinionated, plain words.** No corporate hedge, no
   passive voice in the key sentences. Short. Direct. If you wouldn't say it out
   loud in a portfolio review without flinching, rewrite it.
7. **One insight per section.** Each block must state one non-obvious thing the
   reader didn't know walking in. If a section has no insight, delete it or
   merge it.

---

## Required moves in every case study

Apply these as a substance check after the rewrite. If any are missing, the
case study is not done.

- [ ] **Opening line** names the user belief or behavior being changed.
- [ ] **Second beat** names the real constraint that shaped the design.
- [ ] **AI primitive named** with the failure mode you designed around.
- [ ] **At least one explicit tradeoff** — what was sacrificed, and why.
- [ ] **Closing line** is a user-belief shift, with the metric as supporting
      evidence — not the headline.

---

## Banned phrases (delete on sight, no exceptions)

`user-centric` · `seamless` · `delightful` · `leveraged` · `synergy` ·
`holistic` · `pixel-perfect` · `best-in-class` · `cutting-edge` ·
`revolutionized` · `empowered users` · `I was responsible for` ·
`worked closely with stakeholders` · `low-fidelity to high-fidelity` ·
`iterated on designs` · `crafted experiences` · `passionate about` ·
`reimagined` · `transformed the way users` · `seamless experience` ·
`design thinking` (as filler) · `human-centered` (as filler)

If the source copy contains these, replace them with a concrete statement.
Never just swap one buzzword for another.

---

## Before-and-after calibration

**Before (generic UX):**
> I worked closely with stakeholders to design a seamless, delightful experience
> that empowered users to find local pickup games. Through multiple rounds of
> iteration, we delivered a pixel-perfect, user-centric solution.

**After (principal AI-first):**
> Pickup sports die on the question *"will anyone actually show up?"* — so I
> designed against no-show anxiety, not against the booking flow. The constraint
> was zero historical data on day one: no embeddings to rank players, no
> reliability score to surface. I used a lightweight LLM scoring pass over
> profile + RSVP signals and designed around its biggest failure mode —
> over-confident recommendations — by exposing the *reasons* a player was
> suggested, not just a confidence number. Chose explanatory cards over a single
> match score, accepting more vertical density in exchange for trust. The shift
> we wanted: players started inviting strangers without hedging. Invite-to-show
> rate is the evidence, not the headline.

The "After" is what every case study on this site should sound like.

---

## How to apply

1. Read the existing copy in full before changing anything. Identify which of
   the seven rules and five required moves are missing.
2. Rewrite copy block-by-block. Do not consolidate sections, do not move images,
   do not change headings unless the heading itself is filler.
3. Run the banned-phrases check. Run the required-moves checklist.
4. Report which rules you applied and where, so the user can verify the
   substance — not just the prose.

## Out of scope

- Page structure, section order, image placement, components, routes, tokens.
- SEO metadata structure (existing SEO patterns stay; only rewrite human-facing
  copy).
- Batch-rewriting every case study at once unless explicitly asked. Apply on the
  next edit to each page.

## Pairs with

- `mem://portfolio/psychological-impact-reframing` — the principle. This skill
  is the enforcement layer.
- `mem://portfolio/gen-ai-first-branding` — the surface treatment. This skill
  makes the writing match the badges.
- `no-assumptions` — if the source copy is too thin to rewrite faithfully
  (missing the real constraint, the AI primitive, or the outcome), STOP and ask
  one focused question instead of inventing facts.
