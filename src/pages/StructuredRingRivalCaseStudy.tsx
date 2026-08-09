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
      },
      {
        heading: "Building a Fighter Out of Parts",
        paragraphs: [
          "A fighter isn't one drawing. It's a body, two arms, two legs and a head, each a separate piece, because every one of them has to move independently — a jab extends one arm without touching the other, a knockdown drops the whole rig.",
          "Glass Joe was the first, and he shows every seam. The torso is a single flat block. The arms are wedges hung off ball-joint shoulders with no elbow, no bicep, no forearm — one shape from shoulder to glove. The legs are parallelogram slabs that meet the hip at a hard edge, and you can see the join at the knee. One flat fill per limb, black outline, no shading anywhere.",
          "Von Kaiser is the same construction at different proportions: the block widened into a trapezoid, the arms lengthened, the stance pushed out. That was the point of building the rig before building the roster — a new opponent should be a new silhouette and a new set of timings, not a new character drawn from scratch.",
        ],
        images: [
          { src: "/images/ringrival-glassjoe-idle.png", alt: "Glass Joe at launch — flat block torso, wedge arms with no elbow, parallelogram legs seamed at the knee" },
          { src: "/images/ringrival-vonkaiser.png", alt: "Von Kaiser — the same rig at heavier proportions: wider trapezoid torso, longer arms, broader stance" },
        ],
      },
      {
        heading: "Making a Flat Shape Land a Punch",
        paragraphs: [
          "The rig worked and still looked like paper. A flat wedge swinging at a flat block reads as two shapes overlapping, not as contact — so the next pass was spent putting weight into the anatomy. Arms got split into shoulder, bicep and forearm so the elbow actually bends and the glove arrives after the shoulder turns. Legs got a calf and a knee instead of a seam, and tapered toward the boot so the fighter stands on the canvas instead of floating above it. The torso stopped being one fill: pecs, ribs and abs got their own shading so a body turn reads as a body turning.",
          "Then the hit itself. Impact particles were the first attempt and the first mistake — the initial burst was big enough to bury the fighter at the exact moment you needed to read him, so it got dialed back until it punctuated the hit instead of hiding it. Hit-stop duration, screen-shake amplitude, a 60ms haptic on connect, the curve of the health-bar drain: all tuned by hand, by feel, on a real phone.",
          "Where the punch button lives and how big the block zone is were settled the same way — watching a real hand on a real device. No model knows whether a punch feels like a punch.",
        ],
        images: [
          { src: "/images/ringrival-impact-particles.png", alt: "Impact particles dialed back until they punctuated the hit instead of burying the fighter" },
          { src: "/images/ringrival-knockdown.png", alt: "The knockdown — DOWN! and a 5 count, star burst timed to the hit-stop so the stop and the flash land together" },
        ],
      },
      {
        heading: "What Got Cut",
        paragraphs: [
          "Time-to-first-punch dropped from 22 seconds to 6 by cutting menus and tutorial screens.",
          "Audio failure rate dropped from ~40% to under 2% by gating AudioContext behind the first tap.",
          "Webcam hand-tracking was technically impressive and completely wrong for the audience — removed entirely.",
          "What replaced the tutorial is one card: the whole control scheme on a single screen you dismiss in a tap. Everything a player needs to start throwing punches, and nothing else.",
        ],
        images: [
          { src: "/images/ringrival-controls-modal.png", alt: "The one card that replaced the tutorial flow — the entire control scheme on a single dismissable screen" },
        ],
      },
      {
        heading: "Then → Now",
        paragraphs: [
          "Scroll back up to Glass Joe, then watch the two fights below. Same rig, same game — but the wedges are arms now. Denny Frost has a shoulder that loads before the hand moves and a torso that rotates into the punch. Klaus Brenner is built heavier on purpose: thicker through the chest, slower to reset, a different read for the player.",
          "The roster grew the same way the anatomy did — one thing at a time. Each opponent ships with their own named special, their own trash talk, and their own rhythm, rather than a reskin of Glass Joe. A knockdown stopped being a countdown and became a comeback mechanic you can actually fight your way out of.",
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
