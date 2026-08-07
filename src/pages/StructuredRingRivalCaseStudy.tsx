import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredRingRivalCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="ring-rival"
    title="Ring-Rival"
    description="Console boxing feel on the mobile web. Distinct AI opponents, generated trash talk, career mode — built solo with AI as a co-builder."
    tags={["AI-Assisted Product", "Mobile Web", "Game Design", "Solo Build"]}
    liveUrl="https://rival.li"
    heroImage={{
      src: "/images/ringrival-hero-title.png",
      alt: "Ring-Rival hero title screen",
      hoverVideo: "/lovable-uploads/ring-rival-hero.mp4",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "Boxing games live on consoles for a reason — tight input latency, real animation feel, AI that reads like an opponent.",
          "Doing all of that with a thumb in a browser, no install, was the constraint that made it worth building. The question wasn't \"can we ship a boxer\" — it was \"can we ship one that feels right.\"",
        ],
        images: [
          { src: "/images/ringrival-controls-modal.png", alt: "VS Glass Joe controls modal with input scheme" },
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "One archetype (Glass Joe) had to feel good before any other fighter was generated.",
          "AI produced sprites, trash talk, announcer intros, and crowd reactions. The career order — difficulty curve, fight sequencing, when each opponent appears — was built by hand across hundreds of test fights.",
        ],
        images: [
          { src: "/images/ringrival-vonkaiser.png", alt: "Von Kaiser — tall, broad, defensive guard" },
        ],
      },
      {
        heading: "The Parts AI Can't Do",
        paragraphs: [
          "Hit-stop duration, screen shake amplitude, a 60ms haptic on connect, the curve of health bar drain — all hand-tuned by feel.",
          "Where the punch button lives and how big the block zone is were settled by watching a real hand on a real phone. No model knows whether a punch feels like a punch.",
        ],
        images: [
          { src: "/images/ringrival-knockdown.png", alt: "Knockdown — DOWN! 5 count with star burst over floored Glass Joe" },
        ],
      },
      {
        heading: "What Got Cut",
        paragraphs: [
          "Time-to-first-punch dropped from 22 seconds to 6 by cutting menus and tutorial screens.",
          "Audio failure rate dropped from ~40% to under 2% by gating AudioContext behind the first tap.",
          "Webcam hand-tracking was technically impressive and completely wrong for the audience — removed entirely.",
        ],
        images: [
          { src: "/images/ringrival-impact-particles.png", alt: "Glass Joe getting hit — red impact particles dialed back so fighter stays visible" },
          { src: "/images/ringrival-pause-modal.png", alt: "Pause modal mid-fight vs. Disco Dan — Resume / Music Off / Forfeit reachable without breaking flow" },
          { src: "/images/ringrival-discodan.png", alt: "Disco Dan — completely different silhouette and personality from Glass Joe" },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A shipped boxing game with a 3–6 build-per-day cadence, real user cuts, and AI opponents that bait, hesitate, and tilt.",
          "AI generated the raw material. The designer was the taste filter on every output.",
        ],
      },
    ]}
  />
);

export default StructuredRingRivalCaseStudy;
