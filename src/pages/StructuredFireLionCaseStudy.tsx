import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredFireLionCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="fire-lion"
    title="Fire Lion"
    description="A shipped arcade game, built solo with AI. You spell words mid-flight to cast spells — and most of the design work was deciding what to delete."
    tags={["AI-Assisted Product", "Game Design", "Mobile Web", "Solo Build"]}
    liveUrl="https://firelion.me"
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "Most \"I built X with AI\" portfolios are a calculator or a dashboard. Safe. Forgettable.",
          "The harder question — can a designer ship a real product solo with AI? — needed a harder answer. Game feel can't be faked with a prompt.",
        ],
        image: { src: "/images/firelion-hero-title.png", alt: "Fire Lion hero title screen" },
      },
      {
        heading: "What I Built",
        paragraphs: [
          "One tap, one lion, one core loop — built and playable before any mechanics were added.",
          "Three modes emerged from real play: Fire Lion (tense, escalating), Lion Wars (strategic), Cub Mode (low-stakes recovery). Each lives in its own isolated component so late-night AI sessions never break the others.",
        ],
        image: { src: "/images/firelion-spelling-lightning.png", alt: "Lightning Strike spell casting from spelling MN" },
      },
      {
        heading: "What AI Did vs. What I Did",
        paragraphs: [
          "AI scaffolded Supabase schemas, particle systems, and refactors across 30+ files at a time.",
          "Every gravity tweak, tap impulse, and difficulty curve was hand-tuned across hundreds of test runs. Building features is easy with AI. Killing them is the actual design work.",
        ],
        image: { src: "/images/firelion-lionwars-combat.png", alt: "Lion Wars naval combat, wave 1 of 7" },
      },
      {
        heading: "What Got Cut",
        paragraphs: [
          "Daily missions, streaks, a Wordle-style challenge, a social proof counter, a forge upgrade screen, and mod gating — all shipped, all ignored by players, all removed.",
          "The deletion list ended up longer than the feature list. The game got better with every cut.",
        ],
        image: { src: "/images/firelion-cubmode-sunset.png", alt: "Cub Mode sunset scene" },
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
