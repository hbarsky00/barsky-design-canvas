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
      src: "/images/firelion-hero-title.webp",
      alt: "Fire Lion hero title screen",
      hoverVideo: "/lovable-uploads/fire-lion-hero.mp4",
    }}
    relatedPost={{
      slug: "a-to-do-app-doesnt-prove-anything",
      title: "A To-Do App Doesn't Prove Anything",
      blurb: "Most \\u201cI built this with AI\\u201d portfolios pick something safe. Safe projects hide the only question worth answering: can you ship something…",
    }}
    blocks={[
      {
        heading: "I Picked Something That Could Visibly Fail",
        paragraphs: [
          "Every \"I built this with AI\" portfolio piece is a calculator or a to-do app. Those can't fail in a way you'd notice, which is exactly why people pick them.",
          "A game can. If a jump feels wrong, everyone knows immediately and nobody needs the mechanics explained to them. So I built one, on purpose, because game feel is the thing a prompt can't hand you.",
        ],
        images: [
          { src: "/images/firelion-spelling-lightning.webp", alt: "Lightning Strike spell casting from spelling MN" },
        ],
      },
      {
        heading: "One Tap Had to Be Fun Before Anything Else Existed",
        paragraphs: [
          "The rule I set for myself was that the core loop had to be playable before a single mechanic went on top of it. One tap, one lion, nothing else. If that wasn't fun, no amount of spells or modes was going to rescue it.",
          "The spelling came after, and only because it survived that test. You spell a word mid-flight and it casts. It works because tapping already felt good, not because it's a clever idea.",
        ],
        images: [
          { src: "/images/firelion-spelling-combo.webp", alt: "Spelling CRAP over a lava forge anvil, 5× combo" },
        ],
      },
      {
        heading: "Three Modes, Three Sandboxes",
        paragraphs: [
          "Fire Lion escalates and gets tense. Lion Wars is slower and strategic. Cub Mode is the low-stakes one you go to when you've been losing.",
          "Each one lives in its own isolated component, with its own state and its own audio. That's a defensive decision, not an architectural preference. I was building at speed with AI, often late, and a refactor that reaches across a shared file breaks things you won't notice until someone else finds them. Isolation costs duplication and buys me the ability to change one mode without holding the other two in my head.",
        ],
        images: [
          { src: "/images/firelion-cubmode-sunset.webp", alt: "Cub Mode sunset scene — kept isolated from the main game so refactors never break it" },
          { src: "/images/firelion-cubmode-ocean.webp", alt: "Cub Mode ocean scene — same isolation rule: separate component, separate audio, separate state" },
        ],
      },
      {
        heading: "AI Gave Me Volume. It Couldn't Give Me Feel.",
        paragraphs: [
          "AI scaffolded the Supabase schemas, the particle systems, and refactors across thirty-odd files at a time. That's real work and it did it faster than I would have.",
          "Then there's gravity, tap impulse, and the difficulty curve. I tuned every one of those by hand, on a phone, over hundreds of runs, because there's no way to ask a model whether a jump feels right. It'll answer, and the answer means nothing.",
          "That's the split I'd want anyone reading this to take away. Producing features got cheap. Deciding which ones survive didn't, and that's the part that's still the job.",
        ],
        images: [
          { src: "/images/firelion-lionwars-combat.webp", alt: "Lion Wars naval combat, wave 1 of 7, lava cavern backdrop" },
        ],
      },
      {
        heading: "The Delete List Got Longer Than the Feature List",
        paragraphs: [
          "Daily missions. Streaks. A Wordle-style daily challenge. A social proof counter. A forge upgrade screen. Mod gating. All of it built, all of it shipped, all of it removed.",
          "None of those were bad ideas on paper, and that's the trap. They were retention mechanics bolted onto a game that hadn't earned retention yet, and each one put another screen between opening the thing and playing it.",
          "The game got better every time I cut one. That kept being true for long enough that I stopped treating deletion as a cleanup step and started treating it as the design.",
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It's live at firelion.me and it's finished enough to hand to someone without explaining anything first.",
          "What it's evidence of isn't that AI can build a game — it can, in about a week, and that's the least interesting thing here. It's that somebody still has to hold the line on what stays in, and no model was going to do that part for me.",
        ],
      },
    ]}
  />
);

export default StructuredFireLionCaseStudy;
