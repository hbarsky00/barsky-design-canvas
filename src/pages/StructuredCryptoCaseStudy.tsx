import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredCryptoCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="crypto"
    title="Trading Without Friction"
    description="A crypto trading interface designed for two audiences the industry insists you have to choose between."
    tags={["Fintech", "Crypto", "Product Design", "Dual-Mode UX"]}
    meta={[{ label: "Role", value: "Lead UX Designer" }]}
    heroImage={{
      src: "/images/crypto/hero.webp",
      alt: "Crypto trading dashboard on mobile and desktop",
    }}
    relatedPost={{
      slug: "beginner-or-pro-is-a-false-choice",
      title: "Beginner or Pro Is a False Choice, and Both Sides Pay for It",
      blurb: "Easy apps hide complexity and charge for it. Pro apps expose everything and assume confidence you may not have. The split is a business decision\u2026",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "\"Easy\" crypto apps hide complexity and charge premium spreads. \"Pro\" apps expose everything and assume you brought your own confidence.",
          "Beginners pay for hidden fees and never graduate. Pros pay for every \"are you sure?\" tax built for someone else.",
        ],
        images: [
          { src: "/images/crypto/competitive.webp", alt: "Competitor teardown — \"easy\" apps hide the spread, \"pro\" apps assume you brought your own confidence" },
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Two modes, one platform, shared core. Beginner mode strips the chart, uses plain English, and surfaces total cost — including spread — next to the action button every time.",
          "Pro mode shows the full order book with zero hand-holding. Mode is a setting, not a separate product.",
        ],
        images: [
          { src: "/images/crypto/site-map.webp", alt: "The two-mode architecture — one platform, shared core, mode as a setting rather than a separate product" },
        ],
      },
      {
        heading: "The Design Constraint That Held It Together",
        paragraphs: [
          "Plain language as a design rule, not a copy pass: if we couldn't explain something in one sentence, we either explained it inline or cut it from beginner mode.",
          "Total cost next to the action button was the most-fought decision and the one I'd defend hardest.",
        ],
        images: [
          { src: "/images/crypto/initial-flow.webp", alt: "Initial concepts challenging crypto app conventions" },
          { src: "/images/crypto/design-thinking.webp", alt: "The design-thinking pass that produced the two-mode constraint" },
        ],
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "First version of beginner mode was too protected — confirmations everywhere, tooltips on every term, an onboarding tour that wouldn't quit. People felt patronized, not safe.",
          "Pro mode had the opposite problem: I'd cut so much that pros couldn't find features they relied on. Density is a feature for that audience.",
        ],
        images: [
          { src: "/images/crypto/learning.webp", alt: "Failed prototype iterations — the over-protected beginner mode that tested as patronising" },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Pros and beginners using the same platform without either feeling like it was built for the other one.",
          "What I didn't solve: intermediate traders fit awkwardly in either mode — a v2 would need a third mode or more granular customization.",
        ],
      },
    ]}
  />
);

export default StructuredCryptoCaseStudy;
