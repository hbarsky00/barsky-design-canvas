import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredRingRivalCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="ring-rival"
    title="Ring-Rival"
    description="I wanted to know if a browser could feel like a console boxing game. Finding out took a lot of deleting."
    tags={["AI-Assisted Product", "Mobile Web", "Game Design", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://ringrival.today"
    // The opening frame is gameplay, not a trailer. What used to sit here was a
    // cinematic of a photorealistic boxer — nothing in it existed in the game,
    // so the first thing the page did was set the wrong expectation and the
    // second thing it did was break it.
    heroImage={{
      src: "/images/ringrival-now/hero-triptych.webp",
      alt: "Ring-Rival mid-fight — first-person gloves, Denny Frost blocking, trash talk and the super-punch meter",
      hoverVideo: "/ring-rival-fight-frost.mp4",
      caption: "Mid-fight: gloves, a blocking opponent, trash talk and the super meter. Gameplay as the opening frame, because the cinematic that used to sit here promised a game that didn't exist.",
    }}
    relatedPost={{
      slug: "the-work-is-deleting-not-generating",
      title: "The Work Is Deleting, Not Generating",
      blurb: "AI made producing screens almost free. That moved the bottleneck from making things to deciding which ones to throw away \u2014 and no model will do\u2026",
    }}
    blocks={[
      {
        heading: "Why I Built It",
        paragraphs: [
          "Every boxing game I've liked was on a console, and there's a reason for that. The punch has to land the instant your thumb moves. The animation has to read as a body hitting another body. The opponent has to feel like it's thinking. You get none of that for free in a browser.",
          "I wanted to see if I could get it anyway. No install, no app store, just a link you open on your phone.",
        ],
      },
      {
        heading: "Building a Fighter Out of Parts",
        paragraphs: [
          "A fighter isn't a drawing. It's a body, two arms, two legs and a head, all separate, because they all have to move on their own. So I built the rig before I built anyone to put in it.",
          "Glass Joe went through it first, and you can see every seam. Flat block for a torso. Each arm one wedge from shoulder to glove, no elbow in it. Legs meeting the hip at a hard edge, one flat colour per limb. Then I ran Von Kaiser through the same rig at heavier proportions, and that was the real test. If the rig held for a second fighter, I could add fighters as data instead of drawing each one by hand.",
          "It held. It also still looked like paper. A flat wedge swinging at a flat block just looks like two shapes overlapping, not like contact. So I went back in and split each arm into a shoulder, a bicep and a forearm, gave the legs a knee and a calf, and shaded the torso so a turn actually reads as a turn. That is the loop the whole thing runs on. Make the parts fast, throw out whatever doesn't read, go rebuild the layer underneath it.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/ringrival-glassjoe-idle.webp",
            alt: "Glass Joe at launch — flat block torso, wedge arms with no elbow, parallelogram legs seamed at the knee",
            caption: "Glass Joe, first one through the rig. One flat colour per limb, no elbow, no shading anywhere.",
            width: 1920,
            height: 1328,
          },
          {
            src: "/images/ringrival-vonkaiser.webp",
            alt: "Von Kaiser — the same rig at heavier proportions: wider trapezoid torso, longer arms, broader stance",
            caption: "Von Kaiser. Same rig, heavier build. This is the one that told me the rig would hold.",
            width: 1920,
            height: 1333,
          },
        ],
      },
      {
        heading: "The Part AI Couldn't Do",
        paragraphs: [
          "My first go at making a punch land used impact particles, and it was the wrong call. The burst was so big it buried the fighter at the exact moment you needed to see him get hit.",
          "After that I stopped guessing. How long the game freezes on contact. How hard the screen shakes. A 60ms buzz in your hand when you connect. How fast the health bar drains. Where the punch button sits, how big the block zone is. I tuned every one of those by hand, on a real phone, over and over, until it felt right.",
          "There is no model you can ask whether a punch feels like a punch. AI gave me raw material at three to six builds a day. Deciding what to keep was the whole job.",
        ],
      },
      {
        heading: "One Sheet Per Fighter",
        paragraphs: [
          "Because the rig is shared, I don't draw a fighter anymore. I generate their sheet. Ready, jab, cross, hook, uppercut, special, wind-up, block, hurt. Same nine poses, same joints, every time.",
          "Eight of those the fight code can count on. The ninth belongs to the fighter. Glass Joe's is the Glass Jaw. Von Kaiser's is the Kaiser Barrage. That one slot is what stops a roster feeling like the same guy in different colours.",
          "It also means adding an opponent isn't an art project. It's the rig at their proportions and a sheet off the back of it.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/ringrival-sprite-sheet-1.webp",
            width: 1100,
            height: 1100,
            alt: "Glass Joe's generated pose sheet, labelled ready, jab, cross, hook, uppercut, special (Glass Jaw), wind-up, block and hurt",
            caption: "Glass Joe. Lean, nervous, and his special is the Glass Jaw, which is exactly as bad for him as it sounds.",
          },
          {
            src: "/images/ringrival-sprite-sheet-2.webp",
            width: 1100,
            height: 1100,
            alt: "Von Kaiser's generated pose sheet, labelled ready, jab, cross, hook, uppercut, special (Kaiser Barrage), wind-up, block and hurt",
            caption: "Von Kaiser. Same nine slots, and the Kaiser Barrage sitting where Glass Joe keeps his glass jaw.",
          },
        ],
      },
      {
        heading: "What I Deleted",
        paragraphs: [
          "It used to take 22 seconds to throw your first punch. Now it takes 6. I didn't optimise anything to get there. I deleted the splash screen, the mode select, the fighter select and the tutorial. What's left of the tutorial is one card, and you make it go away with a tap.",
          "Audio was failing in about 40% of sessions and I had no idea, because nothing ever errored. Browsers block sound until you interact with the page, and the game was starting its audio on load. Moving that behind the first tap took it under 2%.",
          "I also built webcam hand-tracking. It worked, and it was genuinely impressive. It was also completely wrong for someone playing on their phone on a couch, so I cut it.",
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "Every colour comes in a pair: the state at rest and the same state ten percent lighter on impact. Colour and brightness changing together reads faster than either on its own, which is the entire requirement in a fight.",
        ],
        images: [
          { src: "/images/ringrival-now/design-system.webp", alt: "Ring-Rival design tokens — Courier New, the charcoal ring, and four accent colours each paired with a brighter glow", caption: "Four colours, each with its own glow, because a punch has to register in the frame it lands." },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "Same rig Glass Joe came out of, but the wedges are arms now. Klaus Brenner is heavier on purpose, slower to reset, so you have to read him differently than the others.",
          "Every opponent has their own special, their own trash talk and their own rhythm instead of being a reskin. And getting knocked down stopped being a countdown you sit and watch. It became something you can fight your way out of.",
        ],
        videos: [
          {
            src: "/ring-rival-fight-brenner.mp4",
            poster: "/images/ringrival-now/fight-brenner-poster.jpg",
            caption:
              "Klaus Brenner. Bigger, heavier, and on a rhythm you have to learn separately. That is the point of having a roster.",
          },
        ],
      },
    ]}
  />
);

export default StructuredRingRivalCaseStudy;
