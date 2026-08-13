import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredHerbalinkCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="herbalink"
    title="HerbaLink"
    description="Verified herbalists, designed around trust. A booking platform where the credential gate is the product — not a badge."
    tags={["AI-Assisted Product", "Healthcare", "Trust & Safety", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="http://herbalink.live"
    heroImage={{
      // Live screenshots of the shipped app, replacing dead barskyux.com links.
      src: "/images/herbalink/home-hero.png",
      alt: "HerbaLink homepage — personalized wellness guided by certified herbalists",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "People turn to herbalism for anxiety, fatigue, and conditions conventional medicine isn't addressing — and the discovery experience is a misinformation field.",
          "The design job wasn't to build a bigger directory. It was to make the safe path the easy path in a category where being wrong has real medical consequences.",
        ],
        images: [
          { src: "/images/herbalink/find-herbalist-sketch.png", alt: "Early wireframe sketches — finding a herbalist, choosing a consultation type, matching flow", width: 1536, height: 1024 },
          { src: "/images/herbalink/sitemap.png", alt: "Full site map — the credential-gated Find Herbalists flow sits alongside account, support, and legal pages", width: 512, height: 768 },
        ],
      },
      {
        heading: "My Process",
        paragraphs: [
          "Interviewed users and herbalists first — the trust barriers came from them, not from a competitive audit.",
          "Everything after that was ordered around outcomes over UI: identify what breaks trust, design the retention loop (onboarding, tracking, community), then validate that the simplified version still gave people confidence.",
        ],
        images: [
          { src: "/images/herbalink/thought-process.png", alt: "Design process — interview, identify trust barriers, prioritize outcomes over UI, design for retention, validate simplicity" },
        ],
      },
      {
        heading: "Verified as a Gate, Not a Badge",
        paragraphs: [
          "Most directories let anyone list and then badge profiles that pass a basic check. Inverting that — no practitioner visible until verified against the American Herbalists Guild — produces a smaller, more honest catalog.",
          "Adding 200 unverified practitioners made the experience worse, not better.",
        ],
        images: [
          { src: "/images/herbalink/herbalist-directory.png", alt: "Find Herbalists directory — every listed practitioner is verified before they're visible" },
        ],
      },
      {
        heading: "What AI Did vs. What I Did",
        paragraphs: [
          "AI handled Supabase schemas, RLS policies, edge functions, the symptom intake structure, and copy variants.",
          "Which certifications matter for which conditions, when to refuse a listing, who doesn't appear in the catalog — those were every call made by hand.",
        ],
        images: [
          { src: "/images/herbalink/booking-intake.png", alt: "Guided booking intake — a single focused question replaces open-ended search" },
        ],
      },
      {
        heading: "What Got Cut",
        paragraphs: [
          "The original filter panel was replaced with guided triage intake after a tester said \"this feels like WebMD.\"",
          "The comprehensive symptom diary was cut to a single follow-up question — users opened the full version twice and abandoned it.",
          "Open-ended search was removed entirely in favor of credential-first discovery.",
        ],
        videos: [
          {
            src: "/herbalink-before.mp4",
            poster: "/images/herbalink/before-poster.jpg",
            caption:
              "Before: search by name or specialty, then filter by Specialty and Health Concerns. It works, and it still asks someone who doesn't know what they need to describe what they need.",
          },
        ],
        images: [
          { src: "/images/herbalink/mobile-booking.png", alt: "After: booking on mobile — \"We'll match you\" replaces the filter panel", caption: "After: one guided question instead of a search box and two filter menus." },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A shipped booking platform where every listed practitioner has externally verified credentials, intake replaces search, and the safer path is also the easier one.",
          "Smaller catalog by design — honest beats exhaustive.",
        ],
        images: [
          { src: "/images/herbalink/herb-detail-reviews.png", alt: "Herb library entry with real user reviews — the shipped, working platform" },
        ],
      },
    ]}
  />
);

export default StructuredHerbalinkCaseStudy;
