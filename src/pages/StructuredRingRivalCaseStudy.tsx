import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredRingRivalCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="ring-rival"
    title="Ring-Rival"
    description="Console boxing feel on the mobile web. Distinct AI opponents, generated trash talk, career mode — built solo with AI as a co-builder."
    tags={["AI-Assisted Product", "Mobile Web", "Game Design", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://ringrival.today"
    heroImage={{
      src: "/images/ringrival-hero-title.png",
      alt: "Ring-Rival hero title screen",
      hoverVideo: "/lovable-uploads/ring-rival-hero.mp4",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "Boxing games live on consoles for a reason: tight input latency, real animation feel, AI that reads like an opponent. Doing that with a thumb in a browser, no install, was the constraint that made it worth building.",
        ],
      },
      {
        heading: "Building a Fighter Out of Parts",
        paragraphs: [
          "A fighter isn't one drawing. It's a body, two arms, two legs and a head, each a separate piece, because each has to move on its own.",
          "Glass Joe shows every seam. Flat block torso. Arms that are a single wedge from shoulder to glove, no elbow. Legs that meet the hip at a hard edge. One flat fill per limb, no shading anywhere. Von Kaiser is the same rig at heavier proportions — which was the point of building the rig before the roster.",
          "It worked and still looked like paper: a flat wedge swinging at a flat block reads as two shapes overlapping, not as contact. So arms got split into shoulder, bicep and forearm, legs got a knee and a calf, and the torso got its own shading — enough that a body turn reads as a body turning.",
        ],
        images: [
          { src: "/images/ringrival-glassjoe-idle.png", alt: "Glass Joe at launch — flat block torso, wedge arms with no elbow, parallelogram legs seamed at the knee" },
          { src: "/images/ringrival-vonkaiser.png", alt: "Von Kaiser — the same rig at heavier proportions: wider trapezoid torso, longer arms, broader stance" },
        ],
      },
      {
        heading: "Making the Hit Land",
        paragraphs: [
          "Impact particles were the first attempt and the first mistake — the burst was big enough to bury the fighter at the exact moment you needed to read him. Dialed back until it punctuated the hit instead of hiding it.",
          "Hit-stop duration, screen shake, a 60ms haptic on connect, the health-bar drain curve, where the punch button sits, how big the block zone is: all tuned by hand, on a real phone. No model knows whether a punch feels like a punch.",
        ],
        images: [
          { src: "/images/ringrival-impact-particles.png", alt: "Impact particles dialed back until they punctuated the hit instead of burying the fighter" },
          { src: "/images/ringrival-knockdown.png", alt: "The knockdown — DOWN! and a 5 count, star burst timed to the hit-stop so the stop and the flash land together" },
        ],
      },
      {
        heading: "What Got Cut",
        paragraphs: [
          "Time-to-first-punch went from 22 seconds to 6, by cutting menus and tutorial screens.",
          "Audio failure dropped from ~40% to under 2%, by gating AudioContext behind the first tap.",
          "Webcam hand-tracking was technically impressive and wrong for the audience. Removed.",
          "The tutorial became one card: the whole control scheme on a screen you dismiss in a tap.",
        ],
        images: [
          { src: "/images/ringrival-controls-modal.png", alt: "The one card that replaced the tutorial flow — the entire control scheme on a single dismissable screen" },
        ],
      },
      {
        heading: "Then \u2192 Now",
        paragraphs: [
          "Scroll back to Glass Joe, then watch these. Same rig — but the wedges are arms now. Denny Frost loads a shoulder before the hand moves. Klaus Brenner is heavier on purpose: slower to reset, a different read for the player.",
          "Each opponent ships with their own special, their own trash talk and their own rhythm, rather than a reskin. A knockdown stopped being a countdown and became something you can fight your way out of.",
        ],
        videos: [
          {
            src: "/ring-rival-fight-frost.mp4",
            poster: "/images/ringrival-now/fight-frost-poster.jpg",
            caption: "Denny Frost — jabs, blocks, and a super punch charging. The hit-stop and health-bar drain are the hand-tuned parts.",
          },
          {
            src: "/ring-rival-fight-brenner.mp4",
            poster: "/images/ringrival-now/fight-brenner-poster.jpg",
            caption: "Klaus Brenner — bigger, heavier, on a different rhythm. Two fighters, two reads: that is what a roster is for.",
          },
        ],
        images: [
          { src: "/images/ringrival-now/trash-talk.jpg", alt: "Opponent trash talk mid-fight — \"They really signed YOU to fight me?\"" },
          { src: "/images/ringrival-now/comeback-mechanic.jpg", alt: "Knocked down against Ricky Groove — tap rapidly to get up before the count" },
          { src: "/images/ringrival-now/disco-flurry.jpg", alt: "Ricky Groove's Disco Flurry special move, sparks and all" },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A shipped boxing game with a 3–6 build-per-day cadence, real user cuts, and AI opponents that bait, hesitate and tilt.",
          "AI generated the raw material. The designer was the taste filter on every output.",
        ],
        images: [
          { src: "/images/ringrival-now/denny-frost-haymaker.jpg", alt: "Denny Frost's Glass Haymaker landing, with opponent-specific trash talk" },
        ],
      },
    ]}
  />
);

export default StructuredRingRivalCaseStudy;
