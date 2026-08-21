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
    // The opening frame is gameplay, not a trailer. What used to sit here was a
    // cinematic of a photorealistic boxer — nothing in it existed in the game,
    // so the first thing the page did was set the wrong expectation and the
    // second thing it did was break it.
    heroImage={{
      src: "/images/ringrival-now/card-poster.jpg",
      alt: "Ring-Rival mid-fight — first-person gloves, Denny Frost blocking, trash talk and the super-punch meter",
      hoverVideo: "/ring-rival-fight-frost.mp4",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "Boxing games live on consoles for a reason: tight input latency, real animation feel, AI that reads like an opponent. Doing that with a thumb in a browser, no install, was the constraint that made it worth building.",
        ],
      },
      {
        heading: "How It Got Built",
        paragraphs: [
          "A fighter isn't one drawing. It's a body, two arms, two legs and a head, each a separate piece, because each has to move on its own — so the rig came before the roster.",
          "Glass Joe was the first one through it, and he shows every seam: flat block torso, arms that are a single wedge from shoulder to glove with no elbow, legs meeting the hip at a hard edge, one flat fill per limb. Von Kaiser is that same rig at heavier proportions. Getting a second fighter out of it was the test — if the rig held, the roster was a data problem instead of an art problem.",
          "It held, and it still looked like paper. A flat wedge swinging at a flat block reads as two shapes overlapping, not as contact. So arms got split into shoulder, bicep and forearm, legs got a knee and a calf, and the torso got its own shading — enough that a body turn reads as a body turning. That loop is the whole build: generate the parts fast, throw out what doesn't read, rebuild the layer underneath.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/ringrival-glassjoe-idle.png",
            alt: "Glass Joe at launch — flat block torso, wedge arms with no elbow, parallelogram legs seamed at the knee",
            caption: "Glass Joe, first fighter through the rig — one flat fill per limb, no elbow, no shading.",
            width: 1920,
            height: 1328,
          },
          {
            src: "/images/ringrival-vonkaiser.png",
            alt: "Von Kaiser — the same rig at heavier proportions: wider trapezoid torso, longer arms, broader stance",
            caption: "Von Kaiser, same rig, heavier proportions. Proof the roster was data, not redrawing.",
            width: 1920,
            height: 1333,
          },
        ],
      },
      {
        heading: "The Part AI Couldn't Do",
        paragraphs: [
          "Impact particles were the first attempt and the first mistake — the burst was big enough to bury the fighter at the exact moment you needed to read him.",
          "Hit-stop duration, screen shake, a 60ms haptic on connect, the health-bar drain curve, where the punch button sits, how big the block zone is: all tuned by hand, on a real phone, over and over. No model knows whether a punch feels like a punch. AI generated the raw material at a 3–6 build-per-day cadence; the designer was the taste filter on every output.",
        ],
      },
      {
        heading: "One Sheet Per Fighter",
        paragraphs: [
          "Because the rig is shared, I don't draw a fighter. I generate their sheet: ready, jab, cross, hook, uppercut, special, wind-up, block, hurt. Same nine slots, same joints, every opponent.",
          "Eight of those the fight code can count on. The ninth is theirs alone — Glass Joe's is the Glass Jaw, Von Kaiser's is the Kaiser Barrage. That one slot is the difference between a roster and a palette swap.",
          "It also means adding an opponent isn't a new art job. It's the rig at their proportions, and a sheet generated off it.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/ringrival-sprite-sheet-1.png",
            width: 1100,
            height: 1100,
            alt: "Glass Joe's generated pose sheet, labelled ready, jab, cross, hook, uppercut, special (Glass Jaw), wind-up, block and hurt",
            caption: "Glass Joe. Lean, nervous, and his special is the Glass Jaw.",
          },
          {
            src: "/images/ringrival-sprite-sheet-2.png",
            width: 1100,
            height: 1100,
            alt: "Von Kaiser's generated pose sheet, labelled ready, jab, cross, hook, uppercut, special (Kaiser Barrage), wind-up, block and hurt",
            caption: "Von Kaiser. Same nine slots, heavier build, and the Kaiser Barrage in the special.",
          },
        ],
      },
      {
        heading: "What Got Cut",
        paragraphs: [
          "Time-to-first-punch went from 22 seconds to 6 — not by optimizing anything, by deleting the splash screen, the mode select, the fighter select and the tutorial. The tutorial became one card you dismiss in a tap.",
          "Audio failed in roughly 40% of sessions and is under 2% now, by gating AudioContext behind the first tap. Webcam hand-tracking was technically impressive and wrong for the audience, so it went too.",
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "Same rig as Glass Joe — but the wedges are arms now. Klaus Brenner is heavier on purpose: slower to reset, a different read for the player. Each opponent ships with their own special, their own trash talk and their own rhythm rather than a reskin, and a knockdown stopped being a countdown and became something you can fight your way out of.",
        ],
        videos: [
          {
            src: "/ring-rival-fight-brenner.mp4",
            poster: "/images/ringrival-now/fight-brenner-poster.jpg",
            caption:
              "Klaus Brenner — bigger, heavier, on a different rhythm. Two fighters, two reads: that is what a roster is for.",
          },
        ],
      },
    ]}
  />
);

export default StructuredRingRivalCaseStudy;
