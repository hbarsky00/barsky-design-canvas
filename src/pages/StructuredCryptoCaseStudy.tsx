import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredCryptoCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="crypto"
    title="Trading Without Friction"
    description="A crypto trading interface designed for two audiences the industry insists you have to choose between."
    tags={["Fintech", "Crypto", "Product Design", "Dual-Mode UX"]}
    heroImage={{
      src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/crypto/dashboardmobileanddesktopcrypto.jpg",
      alt: "Crypto trading dashboard on mobile and desktop",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "\"Easy\" crypto apps hide complexity and charge premium spreads. \"Pro\" apps expose everything and assume you brought your own confidence.",
          "Beginners pay for hidden fees and never graduate. Pros pay for every \"are you sure?\" tax built for someone else.",
        ],
        images: [
          { src: "https://barskyux.com/wp-content/uploads/2025/08/Learning.jpg", alt: "Failed prototype iterations and stakeholder feedback sessions" },
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Two modes, one platform, shared core. Beginner mode strips the chart, uses plain English, and surfaces total cost — including spread — next to the action button every time.",
          "Pro mode shows the full order book with zero hand-holding. Mode is a setting, not a separate product.",
        ],
        images: [
          { src: "https://barskyux.com/wp-content/uploads/2025/08/competetive-2.png", alt: "Competitor analysis exposing beginner exploitation" },
          { src: "https://barskyux.com/wp-content/uploads/2025/09/cryptotrade_site_map_flowchart_better.png", alt: "User Flow Chart for Crypto App" },
        ],
      },
      {
        heading: "The Design Constraint That Held It Together",
        paragraphs: [
          "Plain language as a design rule, not a copy pass: if we couldn't explain something in one sentence, we either explained it inline or cut it from beginner mode.",
          "Total cost next to the action button was the most-fought decision and the one I'd defend hardest.",
        ],
        images: [
          { src: "https://barskyux.com/wp-content/uploads/2025/09/Initial-Flow-of-screens-scaled.png", alt: "Initial concepts challenging crypto app conventions" },
        ],
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "First version of beginner mode was too protected — confirmations everywhere, tooltips on every term, an onboarding tour that wouldn't quit. People felt patronized, not safe.",
          "Pro mode had the opposite problem: I'd cut so much that pros couldn't find features they relied on. Density is a feature for that audience.",
        ],
        images: [
          { src: "https://barskyux.com/wp-content/uploads/2025/09/designthinkingupdate.png", alt: "Design thinking process for crypto platform" },
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
