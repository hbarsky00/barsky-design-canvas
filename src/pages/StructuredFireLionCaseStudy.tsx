import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredFireLionCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="fire-lion"
    title="Fire Lion"
    description="A shipped arcade game, built solo with AI. You spell words mid-flight to cast spells — and most of the design work was deciding what to delete."
    tags={["AI-Assisted Product", "Game Design", "Mobile Web", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://firelion.me"
    heroImage={{
      src: "/images/firelion-hero-triptych.webp",
      alt: "Fire Lion in play — the hold-to-fly prompt, the lion mid-flight, and a boulder incoming",
      hoverVideo: "/lovable-uploads/fire-lion-hero.mp4",
      caption: "Hold to fly, and something is already coming at you. If one tap didn't feel good here, nothing bolted on top would have rescued it.",
      width: 1672,
      height: 992,
    }}
    relatedPost={{
      slug: "a-to-do-app-doesnt-prove-anything",
      title: "A To-Do App Doesn't Prove Anything",
      blurb: "Most “I built this with AI” portfolios pick something safe. Safe projects hide the only question worth answering: can you ship something…",
    }}
    blocks={[
      {
        heading: "I Picked Something That Could Visibly Fail",
        paragraphs: [
          "Every \"I built this with AI\" portfolio piece is a calculator or a to-do app, and I understand why. Nothing in a to-do app can fail in a way a stranger would notice.",
          "A game fails in public. If a jump feels wrong everyone knows inside a second, and nobody has to have the mechanics explained to them first. That seemed like the more honest test, so I built one.",
        ],
        images: [
          { src: "/images/firelion-spelling-lightning.webp", alt: "Lightning Strike spell casting from spelling MN", caption: "Spelling a word mid-flight casts the spell. It works because tapping already felt good, not because it's a clever idea.",
 width: 488,
 height: 686,
    },
        ],
      },
      {
        heading: "One Tap Had to Be Fun Before Anything Else Existed",
        paragraphs: [
          "The rule I set myself was that the core loop had to be fun before a single mechanic went on top of it. One tap, one lion, nothing else. If that wasn't fun, no amount of spells or modes was going to rescue it.",
          "The spelling came months later, and only because the tapping had already passed that test. You spell a word mid-flight and it casts. It works because the tap underneath it already felt good.",
        ],
        images: [
          { src: "/images/firelion-spelling-combo.webp", alt: "Spelling CRAP over a lava forge anvil, 5× combo", caption: "A five-times combo over the lava forge. This is what survived after the daily missions, streaks and upgrade screens were deleted.",
 width: 500,
 height: 692,
    },
        ],
      },
      {
        heading: "Three Modes, Three Sandboxes",
        paragraphs: [
          "Fire Lion escalates and gets tense. Lion Wars is slower and strategic. Cub Mode is the low-stakes one you go to when you've been losing.",
          "Each one lives in its own component, with its own state and its own audio. That is a defensive decision rather than an architectural one. I was building fast, usually late at night, and a refactor that reaches across a shared file breaks things you don't find out about until somebody else does. The duplication costs me something real. What it buys is the ability to change one mode without holding the other two in my head.",
        ],
        images: [
          { src: "/images/firelion-cubmode-sunset.webp", alt: "Cub Mode sunset scene — kept isolated from the main game so refactors never break it", caption: "Cub Mode, the low-stakes one you go to after losing. Its own component, its own state, its own audio.",
 width: 802,
 height: 656,
    },
          { src: "/images/firelion-cubmode-ocean.webp", alt: "Cub Mode ocean scene — same isolation rule: separate component, separate audio, separate state", caption: "Same isolation rule, second scene. Duplication I paid for on purpose, so a refactor in one mode can't reach the other two.",
 width: 735,
 height: 655,
    },
        ],
      },
      {
        heading: "Where AI Stopped Being Useful",
        paragraphs: [
          "AI scaffolded the Supabase schemas, the particle systems, and refactors across thirty-odd files at a time. That saved me weeks, and I am not going to pretend otherwise.",
          "Gravity, tap impulse, the difficulty curve. I tuned all of those by hand, on a phone, over hundreds of runs. There is no way to ask a model whether a jump feels right — it will answer you, and the answer means nothing.",
          "Producing features got cheap. Deciding which ones survive didn't.",
        ],
        images: [
          { src: "/images/firelion-lionwars-combat.webp", alt: "Lion Wars naval combat, wave 1 of 7, lava cavern backdrop", caption: "Lion Wars, the slow strategic mode. AI scaffolded the particle system; the difficulty curve I tuned by hand on a phone.",
 width: 488,
 height: 680,
    },
        ],
      },
      {
        heading: "The Delete List Got Longer Than the Feature List",
        paragraphs: [
          "Daily missions. Streaks. A Wordle-style daily challenge. A social-proof counter. A forge upgrade screen. Mod gating. I built all of it, shipped all of it, and then took all of it back out.",
          "None of them were bad ideas on paper, which is the trap. They were retention mechanics bolted onto a game that had not earned retention yet, and every one of them put another screen between opening the thing and playing it.",
          "The game got better each time I cut one. Somewhere around the fourth or fifth I stopped thinking of deletion as tidying up and started treating it as the actual work.",
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "The palette is the only part of this game a token file could hold. Colour carries the state because there is no time to read anything. The gravity and the tap feel were hand-tuned on a phone.",
        ],
        images: [
          { src: "/images/firelion-ds/design-system.webp", alt: "Fire Lion design tokens — Bebas Neue, the dark arcade ground, and the flame/gold/cold-green accents", caption: "A dark ground, three accents, and type that is HUD rather than copy.",
 width: 1500,
 height: 913,
    },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It's live at firelion.me and it's finished enough to hand to someone without explaining anything first.",
          "AI can build a game in about a week. That is the least interesting thing here. Somebody still has to hold the line on what stays in, and no model was going to do that for me.",
        ],
      },
    ]}
  />
);

export default StructuredFireLionCaseStudy;
