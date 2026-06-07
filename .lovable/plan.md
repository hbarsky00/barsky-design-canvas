# Skill: strategic-principal-voice

Create a new auto-triggering skill that enforces a Strategic Principal Design (AI-First) voice across every project / case study page. Voice only — no structural rewrites of existing pages.

## What it does

When any case study or project page is being edited, the agent must rewrite copy in the voice of a strategic principal designer who builds AI-first products. No generic UX filler, no "I worked on the UI" sentences, no decorative jargon.

## Voice rules the skill encodes

1. **Frame every decision as a bet, not a deliverable.** Open with the belief or behavior we were trying to change in the user, not the screens shipped.
2. **Lead with the constraint that mattered.** Money, time, model latency, model cost, data scarcity, trust deficit, regulatory edge — name the real constraint that shaped the design.
3. **Name the AI substrate explicitly.** Which model class (LLM, vision, embeddings, agent loop, RAG, fine-tune), why it was the right primitive, and what failure mode you designed around (hallucination, latency, cost, eval drift).
4. **Tradeoffs over taste.** Every major decision states what was given up. "We chose X over Y because Z, accepting tradeoff W."
5. **Outcome in user-belief terms, not pixels.** "Users started trusting the recommendation enough to skip the second-opinion step" beats "improved engagement 12%". Metrics support the belief shift, never replace it.
6. **First-person singular, opinionated, plain words.** No "leveraged synergies", no "delightful experiences", no "user-centric" as filler. If a sentence could appear in any portfolio, cut it.
7. **One insight per section.** Each block earns its place by stating a non-obvious thing the reader didn't know walking in.

## Banned phrases (skill lists them explicitly)

user-centric · seamless · delightful · leveraged · synergy · holistic · pixel-perfect · best-in-class · cutting-edge · revolutionized · empowered users · I was responsible for · worked closely with · stakeholders · low-fidelity to high-fidelity · iterated on designs

## Required moves per case study

- Open with the **user belief or behavior being changed**, in one sentence.
- State the **real constraint** in the second beat.
- Name the **AI primitive + failure mode designed around**.
- Show at least **one tradeoff** with what was sacrificed.
- Close on **the belief shift the user experienced**, with the metric as evidence.

## Auto-trigger scope

Skill description targets retrieval on edits to:

- `src/pages/projects/**`
- `src/pages/case-studies/**`
- `src/data/projects/**` and any project content/JSON
- Any file whose path or content mentions "case study", "project page", or a known project name (CatchBuddy, HerbaLink, Valora Bet, Ring-Rival, Fire Lion, etc.)

Manual invocation via `/strategic-principal-voice` also supported.

## Structure

Voice only. The skill does not impose a section skeleton — it rewrites tone and substance inside whatever structure each page already has. Existing layouts, image placement, and component choices are untouched.

## Pairs with existing memory

- `mem://portfolio/psychological-impact-reframing` — already says case studies focus on belief/behavior change. This skill is the enforcement layer.
- `mem://portfolio/gen-ai-first-branding` — already requires AI-first framing; this skill makes the writing match.

## Files

```text
.agents/skills/strategic-principal-voice/
└── SKILL.md
```

Single file. Frontmatter `name: strategic-principal-voice`, `description` written to auto-trigger on case study / project page edits and on any request to rewrite, polish, or expand project copy.

After writing, apply via `skills--apply_draft .agents/skills/strategic-principal-voice`.

## Out of scope

- No structural rewrites of existing pages.
- No new components, no new routes.
- No changes to images, layout, or design tokens.
- No retroactive batch-rewrite of every case study — the skill applies on the next edit to each page.
