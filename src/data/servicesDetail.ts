/**
 * The four service pages, carried over from barsky.design when the two sites
 * were consolidated.
 *
 * These lived only on the domain that now 301s here, which meant the sharpest
 * positioning copy on either site was unreachable. Copied verbatim: the
 * definitions, the process, the engagement shape and the "not for" lines are
 * Hiram's words, not a rewrite.
 *
 * The slugs match the old URLs exactly (/services/<slug>), so barsky.design's
 * /services/* redirect maps one-to-one instead of dumping everyone on an index.
 */
export type Service = {
  slug: string;
  title: string;
  blurb: string;
  points: string[];
  // --- Full detail-page content ---------------------------------------------
  metaTitle: string;
  metaDescription: string;
  /** One-sentence definition. Written to stand alone if an answer engine lifts it. */
  definition: string;
  /** The situation a buyer is in when they need this. */
  problem: string[];
  /** What the engagement actually includes. */
  includes: { title: string; body: string }[];
  /** How a typical engagement runs. */
  process: { step: string; body: string }[];
  /** Case-study slugs that prove this service. */
  proof: string[];
  faqs: { q: string; a: string }[];
  /** Typical engagement shape — no invented rates, just the shape. */
  shape: string;
  /** Honest disqualification. Saying who this ISN’T for builds more trust than
   *  another paragraph of benefits, and stops bad-fit calls before they book. */
  notFor: string;
};

export const services: Service[] = [
  {
    slug: "ai-product-design",
    title: "AI Product Design",
    blurb:
      "End-to-end design for AI-first products — from the model’s behavior to the interface people actually touch.",
    points: ["Concept to shipped UI", "Prompt & interaction design", "Trust & safety patterns"],
    metaTitle: "AI Product Design",
    metaDescription:
      "End-to-end design for AI-first products: the interaction model, the interface, and how the AI behaves when it’s confident, uncertain, or wrong.",
    definition:
      "AI product design is the design of a product whose core value comes from a model — covering the interaction model, the interface, and the AI’s behavior when it is confident, uncertain, or wrong, not just the screens around it.",
    problem: [
      "Your demo lands in the room and then stalls, because the demo used an input somebody chose and real people don’t.",
      "The model works, but nobody can tell when to trust an answer — so they check everything, which is slower than not using it.",
      "Engineers are making product decisions by default, because nobody has defined what should happen when confidence is low.",
    ],
    includes: [
      {
        title: "The interaction model",
        body:
          "How a person and the model take turns, how context accumulates, and where the human stays in control. This is the part that decides whether your product feels like a tool or a slot machine.",
      },
      {
        title: "Behavior design for confident, uncertain and wrong",
        body:
          "The three states every AI product has and most only design for one of. What it shows while thinking, how it signals shaky ground, how someone corrects it without starting over, and when it should refuse outright instead of guessing.",
      },
      {
        title: "The trust surface",
        body:
          "Sources shown next to answers rather than behind a click, so a person can verify in one glance and defend the decision to their boss. Verifiable beats authoritative.",
      },
      {
        title: "The interface itself",
        body:
          "Screens, states, and the full set nobody demos: empty, loading, error, offline, and the one where the user did it in the wrong order.",
      },
    ],
    process: [
      { step: "Frame", body: "We look at real model output at volume — hundreds of rows, not the six that made the deck. You cannot design for behavior you have not watched." },
      { step: "Design", body: "Interaction model and interface, designed from the ugliest realistic input rather than the clean one. If it holds there, the clean case takes care of itself." },
      { step: "Ship", body: "Built in React and TypeScript, so the engagement can end in working software instead of a file someone still has to interpret." },
      { step: "Measure", body: "Watch where people hesitate, correct, or abandon. Those three moments tell you more than any satisfaction score." },
    ],
    proof: ["nudgeme", "herbalink", "stips"],
    shape:
      "Most AI product design engagements run four to ten weeks, depending on whether we are shaping something new or repairing a product that demos well and stalls with real users. Project-based or retainer. The first thirty-minute call is free and is where scope gets defined \u2014 you leave it with a clear picture of the work whether or not you hire us.",
    notFor:
      "This is the wrong service if the AI in your product is genuinely incidental \u2014 a smart filter bolted onto a stable core, where the value would survive removing it. That is ordinary product design and you should pay ordinary product design prices for it. It is also wrong if what you actually need is a model that performs better; we design behavior around a model, we do not train one. And if the goal is a demo for a funding round rather than something people will use on a Tuesday, say so up front, because the work is different and cheaper.",
    faqs: [
      {
        q: "What makes AI product design different from regular UX?",
        a: "Traditional UX assumes a deterministic system: press the button, get the same result every time. An AI product is probabilistic, so the design has to answer questions conventional interface work never raises — how much to trust any single answer, what shows while the model is thinking, how someone corrects a wrong result without losing their work, and what happens when the model is confidently incorrect. The screens can look identical. The behavior underneath is a different discipline.",
      },
      {
        q: "Do you need our model to be finished first?",
        a: "No, and it is usually better if it isn’t. Design decisions change what the model needs to do — how fast it must respond, what it should refuse, what it has to cite. Bringing design in after the model is frozen means designing around choices that were never examined.",
      },
      {
        q: "Can you build it, or only design it?",
        a: "Both. We build in React and TypeScript, which is the point of the studio. The design is made by the person who has to implement it, so it accounts for real constraints — latency, failure, cost — instead of discovering them late.",
      },
    ],
  },
  {
    slug: "design-systems",
    title: "Design Systems",
    blurb:
      "Scalable component libraries and tokens that keep a growing product consistent and fast to build.",
    points: ["Token architecture", "Component libraries", "Governance & docs"],
    metaTitle: "Design Systems",
    metaDescription:
      "Design systems that survive contact with a real codebase: token architecture, component libraries built in React and TypeScript, and governance that holds.",
    definition:
      "A design system is a shared library of tokens, components and rules that lets a team build a consistent product faster — and, when it works, one that stays consistent after the people who built it have moved on.",
    problem: [
      "Every screen is slightly different, and nobody can say which version is correct.",
      "You have a component library, but engineers keep building around it because it doesn’t do what they need.",
      "The system was handed over as a Figma file and quietly diverged from the code within a quarter.",
    ],
    includes: [
      {
        title: "Token architecture",
        body:
          "Colour, type, spacing, radius and motion defined once, in code, with semantic names that describe purpose rather than appearance. This is what makes a theme change a config edit instead of a rewrite.",
      },
      {
        title: "Components built in React and TypeScript",
        body:
          "Real, typed, accessible components — not pictures of components. Including the states people skip: disabled, loading, error, empty, focus-visible.",
      },
      {
        title: "Accessibility baked in",
        body:
          "Contrast that passes WCAG AA, keyboard paths, focus rings and reduced-motion handling built into the primitives, so nobody has to remember them per feature.",
      },
      {
        title: "Governance and docs",
        body:
          "The boring part that decides whether the system survives: who can add a component, what happens when someone needs an exception, and where the answer lives when a new engineer asks.",
      },
    ],
    process: [
      { step: "Audit", body: "Inventory what exists across the live product. Most teams are surprised how many button variants they actually shipped." },
      { step: "Define", body: "Tokens and primitives first, in code. Names that describe intent, so they still make sense after a redesign." },
      { step: "Build", body: "Components with their real states, typed and accessible, adopted incrementally rather than in one risky sweep." },
      { step: "Hand over", body: "Docs plus the governance rules, so the system keeps working without us in the room." },
    ],
    proof: ["dae-search", "stips"],
    shape:
      "Design system work usually runs six to twelve weeks for an initial system, then a lighter retainer while adoption happens \u2014 because the failure mode is not building the system, it is nobody using it. We can also audit an existing system and fix what is broken rather than starting over, which is often the cheaper and better answer.",
    notFor:
      "You probably do not need this yet if one person builds all your UI, or if the product is still changing shape weekly. A system built on top of an unsettled product locks in decisions you are about to change, and you pay maintenance for consistency you were not going to break anyway. Define your tokens now, because those are cheap early and expensive to retrofit, and come back for the rest when a second person starts building UI and you have had your first argument about which component is correct.",
    faqs: [
      {
        q: "Do we need a design system yet?",
        a: "If more than one person is building UI and you have argued about which version of a component is correct, yes. Below that, a system is usually premature — you get the cost of maintaining it without the consistency benefit. The honest answer is often 'not yet, but define your tokens now,' because tokens are cheap early and expensive to retrofit.",
      },
      {
        q: "Do you build it in Figma or in code?",
        a: "Both, but code is the source of truth. A system that lives only in Figma drifts from the product within a quarter, because the thing that ships is the code. We keep the design file as a companion, not the master copy.",
      },
      {
        q: "What stops it from rotting after you leave?",
        a: "Governance, which is why it’s part of the work rather than an afterthought. That means a written rule for who adds components and how exceptions get handled, docs that live next to the code, and primitives designed so the accessible path is also the easiest path.",
      },
    ],
  },
  {
    slug: "ux-strategy-research",
    title: "UX Strategy & Research",
    blurb:
      "Turn ambiguity into a plan — research, flows, and a roadmap tied to measurable outcomes.",
    points: ["User research", "Journey mapping", "Roadmap & metrics"],
    metaTitle: "UX Strategy & Research",
    metaDescription:
      "Research and strategy that ends in a decision, not a deck: user research, journey mapping, and a roadmap tied to numbers a finance team will accept.",
    definition:
      "UX strategy and research is the work of turning an ambiguous problem into a defensible plan — what to build, for whom, in what order, and how you will know whether it worked.",
    problem: [
      "The team has a backlog and no agreement about which item actually matters.",
      "You have analytics telling you what happened and nothing telling you why.",
      "Design keeps losing the budget conversation because the case is made in adjectives while someone else brings a spreadsheet.",
    ],
    includes: [
      {
        title: "Research that answers a decision",
        body:
          "Scoped to a question someone is waiting on, not a general survey of users. If a finding wouldn’t change what you build, we don’t spend a week gathering it.",
      },
      {
        title: "Journey and flow mapping",
        body:
          "Where people enter, where they stall, and where they quietly leave — mapped against what the system actually does, including the states nobody documented.",
      },
      {
        title: "A prioritised roadmap",
        body:
          "Sequenced by impact against effort, with the reasoning visible so it survives the next reorg and the next person who asks why.",
      },
      {
        title: "The business case",
        body:
          "The cost of the current problem, the plausible range for fixing it, and the assumptions behind both — built so a finance person can push on the inputs instead of dismissing the conclusion.",
      },
    ],
    process: [
      { step: "Frame", body: "Agree the decision this work has to inform. Everything after gets judged against that." },
      { step: "Research", body: "Talk to real users, watch real sessions, read the support tickets nobody reads. The tickets are usually the cheapest insight in the building." },
      { step: "Synthesise", body: "Flows, findings and a roadmap — with the trade-offs stated rather than smoothed over." },
      { step: "Measure", body: "Define the numbers up front, including the one that would prove us wrong." },
    ],
    proof: ["dae-search", "herbalink", "roicalc"],
    shape:
      "Strategy and research engagements are usually two to six weeks \u2014 long enough to talk to real users and read the evidence you already have, short enough that the answer still matters when it arrives. Delivered as flows, findings and a sequenced roadmap, plus the business case if a budget conversation is coming.",
    notFor:
      "This is not the right service if the decision is already made and what you want is evidence to support it. That work exists, it is just not research, and we are bad at it on purpose. It is also wrong if you need a number by Friday for a deck \u2014 good research on a real question takes longer than that, and a fast answer you cannot defend is worse than no answer. If you have never read your own support tickets in bulk, start there before hiring anyone; it is free and it often reframes the question.",
    faqs: [
      {
        q: "How do you make the business case for design work?",
        a: "By starting from the cost that already exists rather than the upside nobody believes. Support tickets about one confusing screen, hours lost re-keying data between systems, the share of people who start a flow and never finish. Those numbers usually sit in a tool the company already pays for. Once you have the cost of the status quo, the ask stops being an opinion about design and becomes arithmetic — and you present it as a range with the assumptions visible, because an estimate with no showable math is what actually gets rejected.",
      },
      {
        q: "How much research is enough?",
        a: "Enough to change a decision, and not more. Five well-run sessions on a specific question beat fifty on a vague one. The failure mode we see most is research that produces a beautiful deck nobody acts on, usually because the question was never tied to a decision anyone was waiting to make.",
      },
      {
        q: "Can you work with what we already have?",
        a: "Usually, yes. Most teams have more evidence than they think — analytics, support tickets, sales-call notes, churn surveys — that has never been read together. Starting there is cheaper and faster than commissioning new research, and it often reframes the question before you spend anything.",
      },
    ],
  },
  {
    slug: "prototype-to-ship",
    title: "Prototype to Ship",
    blurb:
      "We don’t hand off a static file. We build and ship the real thing with React, TypeScript, and modern AI tooling.",
    points: ["React / TypeScript", "Rapid prototyping", "Production frontend"],
    metaTitle: "Prototype to Ship",
    metaDescription:
      "Design that ends in deployed software. We build the real product in React and TypeScript, so an engagement finishes with working code instead of a handoff file.",
    definition:
      "Prototype-to-ship is a design engagement that ends in deployed, working software — the studio designs the product and then builds it in production React and TypeScript, removing the handoff entirely.",
    problem: [
      "The last agency delivered a beautiful Figma file and you still needed to find engineers to build it.",
      "What shipped doesn’t match what was designed, and nobody can point to where it diverged.",
      "You’re pre-hire and need something real in front of users or investors, not a clickable illusion.",
    ],
    includes: [
      {
        title: "Design and build by the same hands",
        body:
          "The person drawing the interface is the person implementing it. That kills an entire class of problem — specs that are cheap to draw and brutal to build, transitions that cost a re-render on every keystroke, states that get noted and never made.",
      },
      {
        title: "Production frontend, not a prototype",
        body:
          "Typed React, real data, accessible markup, deployed. Something a stranger can open on a phone, not a demo that only survives the path you rehearsed.",
      },
      {
        title: "The unglamorous last ten percent",
        body:
          "Empty states, error copy, offline behaviour, double-tap, wrong order. The part that decides whether anyone comes back, and the part most engagements run out of budget before reaching.",
      },
      {
        title: "Handover you can maintain",
        body:
          "Readable code, real components, and no dependency on us to keep it running.",
      },
    ],
    process: [
      { step: "Frame", body: "What has to be true for this to be worth shipping, and what is explicitly out of scope for v1." },
      { step: "Design", body: "Fast, in the direction of the build — decisions get pressure-tested against implementation reality as they’re made, not after." },
      { step: "Ship", body: "Built and deployed. AI accelerates the mechanical work; the judgment about what is actually right stays human." },
      { step: "Measure", body: "See how it behaves with real people, then iterate on what the data actually says." },
    ],
    proof: ["herbalink", "nudgeme", "stips", "ring-rival"],
    shape:
      "Prototype-to-ship engagements typically run six to twelve weeks to a live v1, scoped hard around what has to be true for launch. Project-based, or a retainer if you want continued iteration once real users arrive. Agencies use the same arrangement for overflow, under their brand.",
    notFor:
      "This is the wrong fit if you need deep backend or infrastructure work \u2014 we build production frontend and the design that goes with it, not your data platform. It is also wrong if you want a designer to hand mockups to your existing team, because the whole point here is that the same hands do both and you would be paying for a benefit you are not taking. And if your requirements genuinely cannot be cut to a shippable v1, that is a scoping problem worth solving before anyone writes code.",
    faqs: [
      {
        q: "Do we get code we can maintain, or a throwaway prototype?",
        a: "Production code. Typed React and TypeScript, real components, deployed and running — the same stack a team would keep building on. Several of the products on this site were built this way and are live today, which is the check worth making on any studio claiming this: ask for a URL you can open, not a screenshot.",
      },
      {
        q: "How does AI fit into how you build?",
        a: "It does the mechanical work and it is genuinely fast at it. It does not do the deciding. A model will happily produce something that runs and solves a slightly different problem than the one you had, and nothing crashes to tell you. The judgment about which of four options is right, and whether the flow is wrong even though it works, is the part that stays human.",
      },
      {
        q: "What if we already have engineers?",
        a: "That works well. We take a feature end to end and hand back working code your team reviews, rather than a spec they have to interpret. Agencies and dev shops use us the same way when design demand outruns capacity.",
      },
    ],
  },
];
