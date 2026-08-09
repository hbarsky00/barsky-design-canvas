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
          { src: "/images/ringrival-controls-modal.png", alt: "The control scheme, spelled out before the first fight — the whole game had to work from a thumb on glass" },
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "One archetype (Glass Joe) had to feel good before any other fighter was generated.",
          "AI produced sprites, trash talk, announcer intros, and crowd reactions. The career order — difficulty curve, fight sequencing, when each opponent appears — was built by hand across hundreds of test fights.",
        ],
        images: [
          { src: "/images/ringrival-glassjoe-idle.png", alt: "Glass Joe — the one archetype that had to feel right before any other fighter got generated" },
          { src: "/images/ringrival-vonkaiser.png", alt: "Von Kaiser — tall, broad, defensive guard, built once the first fighter felt right" },
        ],
      },
      {
        heading: "The Parts AI Can't Do",
        paragraphs: [
          "Hit-stop duration, screen shake amplitude, a 60ms haptic on connect, the curve of health bar drain — all hand-tuned by feel.",
          "Where the punch button lives and how big the block zone is were settled by watching a real hand on a real phone. No model knows whether a punch feels like a punch.",
        ],
        images: [
          { src: "/images/ringrival-impact-particles.png", alt: "Impact particles on connect — dialed back by hand until the hit read without burying the fighter" },
          { src: "/images/ringrival-knockdown.png", alt: "The knockdown: DOWN! and a 5 count, with the star burst timed to the hit-stop" },
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
          { src: "/images/ringrival-pause-modal.png", alt: "What survived the cuts: pause is three choices — Resume, Music Off, Forfeit — reachable without breaking the fight" },
        ],
      },
      {
        heading: "Then → Now",
        paragraphs: [
          "Launch was one archetype: Glass Joe, hand-tuned until the punch felt like a punch, everything else built around him. A knockdown was a countdown and nothing else.",
          "The roster's grown since. New opponents each ship with their own named special move and their own trash talk — not a reskin of Glass Joe. A knockdown now has a real comeback mechanic, not just a countdown.",
        ],
        videos: [
          {
            src: "/ring-rival-fight-frost.mp4",
            poster: "/images/ringrival-now/fight-frost-poster.jpg",
            caption:
              "Mid-fight against Denny Frost — jabs, blocks, and a super punch charging. The hit-stop and health-bar drain in here are the hand-tuned parts no model could have written.",
          },
          {
            src: "/ring-rival-fight-brenner.mp4",
            poster: "/images/ringrival-now/fight-brenner-poster.jpg",
            caption:
              "A later fight, against Klaus Brenner — bigger, heavier-hitting, and on a different rhythm entirely. Two fighters, two reads: that difference is what a roster is actually for.",
          },
        ],
        images: [
          { src: "/images/ringrival-now/trash-talk.jpg", alt: "Now: opponent trash talk mid-fight — \"They really signed YOU to fight me?\"" },
          { src: "/images/ringrival-now/comeback-mechanic.jpg", alt: "Now: knocked down against Ricky Groove — tap rapidly to get up before the count" },
          { src: "/images/ringrival-now/disco-flurry.jpg", alt: "Now: Ricky Groove's Disco Flurry special move, sparks and all" },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A shipped boxing game with a 3–6 build-per-day cadence, real user cuts, and AI opponents that bait, hesitate, and tilt.",
          "AI generated the raw material. The designer was the taste filter on every output.",
        ],
        images: [
          { src: "/images/ringrival-now/denny-frost-haymaker.jpg", alt: "Denny Frost's Glass Haymaker landing, with opponent-specific trash talk — \"Hope you told your corner to bring a mop.\"" },
        ],
      },
    ]}
  />
);

export default StructuredRingRivalCaseStudy;
