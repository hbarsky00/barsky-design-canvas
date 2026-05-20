import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredHerbalinkCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="herbalink"
    title="HerbaLink"
    description="Verified herbalists, designed around trust. A booking platform where the credential gate is the product — not a badge."
    tags={["AI-Assisted Product", "Healthcare", "Trust & Safety", "Solo Build"]}
    liveUrl="http://herbalink.live"
    heroImage={{
      src: "https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png",
      alt: "HerbaLink book-an-herbalist promo on mobile",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "People turn to herbalism for anxiety, fatigue, and conditions conventional medicine isn't addressing — and the discovery experience is a misinformation field.",
          "The design job wasn't to build a bigger directory. It was to make the safe path the easy path in a category where being wrong has real medical consequences.",
        ],
        images: [
          { src: "https://barskyux.com/wp-content/uploads/2025/08/findanherbalistsketch.png", alt: "Initial concepts and sketches focused on the credential gate, not the directory layout" },
        ],
      },
      {
        heading: "Verified as a Gate, Not a Badge",
        paragraphs: [
          "Most directories let anyone list and then badge profiles that pass a basic check. Inverting that — no practitioner visible until verified against the American Herbalists Guild — produces a smaller, more honest catalog.",
          "Adding 200 unverified practitioners made the experience worse, not better.",
        ],
        images: [
          { src: "https://barskyux.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-19-2025-11_19_58-PM.png", alt: "Flow exploration — credential gate sits before any browsing" },
        ],
      },
      {
        heading: "What AI Did vs. What I Did",
        paragraphs: [
          "AI handled Supabase schemas, RLS policies, edge functions, the symptom intake structure, and copy variants.",
          "Which certifications matter for which conditions, when to refuse a listing, who doesn't appear in the catalog — those were every call made by hand.",
        ],
        images: [
          { src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2025/07/UserFlow.png?fit=1232%2C928&ssl=1", alt: "HerbaLink user flow from onboarding to booking" },
        ],
      },
      {
        heading: "What Got Cut",
        paragraphs: [
          "The original filter panel was replaced with guided triage intake after a tester said \"this feels like WebMD.\"",
          "The comprehensive symptom diary was cut to a single follow-up question — users opened the full version twice and abandoned it.",
          "Open-ended search was removed entirely in favor of credential-first discovery.",
        ],
        images: [
          { src: "https://barskyux.com/wp-content/uploads/2025/08/Symptom-Trackerupdate-scaled.png", alt: "Symptom tracker — final form, after the comprehensive version was cut" },
          { src: "https://barskyux.com/wp-content/uploads/2025/07/herbalistdemo-2.png", alt: "HerbaLink early Book an Herbalist concept — before the credential gate was inverted" },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A shipped booking platform where every listed practitioner has externally verified credentials, intake replaces search, and the safer path is also the easier one.",
          "Smaller catalog by design — honest beats exhaustive.",
        ],
      },
    ]}
  />
);

export default StructuredHerbalinkCaseStudy;
