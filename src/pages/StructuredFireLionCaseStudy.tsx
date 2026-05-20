import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredFireLionCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="fire-lion"
    title="Fire Lion"
    description="A shipped arcade game, built solo with AI. You spell words mid-flight to cast spells — and most of the design work was deciding what to delete."
    tags={["AI-Assisted Product", "Game Design", "Mobile Web", "Solo Build"]}
    liveUrl="https://firelion.me"
    heroImage={{
      src: "/images/firelion-hero-title.png",
      alt: "Fire Lion hero title screen",
      hoverVideo: "/lovable-uploads/firelion-hero.mp4",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "Most \"I built X with AI\" portfolios are a calculator or a dashboard. Safe. Forgettable.",
          "The harder question — can a designer ship a real product solo with AI? — needed a harder answer. Game feel can't be faked with a prompt.",
        ],
        images: [
          { src: "/images/firelion-spelling-lightning.png", alt: "Lightning Strike spell casting from spelling MN" },
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "One tap, one lion, one core loop — playable before any mechanics were added.",
          "Three modes emerged from real play: Fire Lion (tense, escalating), Lion Wars (strategic), Cub Mode (low-stakes recovery). Each lives in its own isolated component so late-night AI sessions never break the others.",
        ],
        images: [
          { src: "/images/firelion-spelling-combo.png", alt: "Spelling CRAP over a lava forge anvil, 5× combo" },
        ],
      },
      {
        heading: "What AI Did vs. What I Did",
        paragraphs: [
          "AI scaffolded Supabase schemas, particle systems, and refactors across 30+ files at a time.",
          "Every gravity tweak, tap impulse, and difficulty curve was hand-tuned across hundreds of test runs. Building features is easy with AI. Killing them is the actual design work.",
        ],
        images: [
          { src: "/images/firelion-lionwars-combat.png", alt: "Lion Wars naval combat, wave 1 of 7, lava cavern backdrop" },
        ],
      },
      {
        heading: "What Got Cut",
        paragraphs: [
          "Daily missions, streaks, a Wordle-style challenge, a social proof counter, a forge upgrade screen, and mod gating — all shipped, all ignored, all removed.",
          "The deletion list ended up longer than the feature list. The game got better with every cut.",
        ],
        images: [
          { src: "/images/firelion-cubmode-sunset.png", alt: "Cub Mode sunset scene — kept isolated from the main game so refactors never break it" },
          { src: "/images/firelion-cubmode-ocean.png", alt: "Cub Mode ocean scene — same isolation rule: separate component, separate audio, separate state" },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A shipped game where deciding which 80% to throw away was the year of work that made it playable.",
          "AI can scaffold a game in a week. The taste filter is still the designer's job.",
        ],
      },
    ]}
  />
);

export default StructuredFireLionCaseStudy;
