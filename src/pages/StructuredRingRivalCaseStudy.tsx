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
      // No hover video here any more. This still sat directly above the
      // star-punch clip, so the top of the page was two video surfaces back to
      // back showing two different fights — a wide landscape one you had to
      // hover to see, then a narrow portrait one that played itself. One
      // moving thing at the top, and it should be the newest work.
      caption: "Mid-fight: gloves, a blocking opponent, trash talk and the super meter. Gameplay as the opening frame, because the cinematic that used to sit here promised a game that didn't exist.",
      width: 1672,
      height: 992,
    }}
    relatedPost={{
      slug: "the-work-is-deleting-not-generating",
      title: "The Work Is Deleting, Not Generating",
      blurb: "AI made producing screens almost free. That moved the bottleneck from making things to deciding which ones to throw away \u2014 and no model will do\u2026",
    }}
    blocks={[
      {
        heading: "What I'm Working On Right Now",
        paragraphs: [
          "The star punch. You bank stars by landing counters, and the meter above the gloves is what you spend them from. The hard part is getting the meter, the wind-up and the hit to agree with each other. If the star burns even one frame before the glove connects, it reads as scripted.",
          "This is a phone capture of the current build, title screen through to a knockdown against Tor Volkov. It is the newest thing on this page and it is not finished.",
        ],
        videos: [
          {
            src: "/ring-rival-star-punch.mp4",
            poster: "/images/ringrival-now/star-punch-poster.jpg",
            width: 430,
            height: 820,
            caption:
              "Star punch landing on Tor Volkov, straight into the count. Recorded on a phone at the size it is actually played, because that is the only screen the timing has to feel right on.",
          },
        ],
      },
      {
        heading: "Every Boxing Game I've Liked Was on a Console",
        paragraphs: [
          "Every boxing game I've liked was on a console. On those the punch lands the instant your thumb moves, the animation reads as one body hitting another, and the opponent seems to be thinking about you. A browser gives you none of that by default. Mobile Safari gives you slightly less.",
          "I wanted it anyway. No install, no app store, a link you open on your phone and you're fighting.",
        ],
      },
      {
        heading: "Building a Fighter Out of Parts",
        paragraphs: [
          "A fighter isn't a drawing. It's a body, two arms, two legs and a head, all separate, because every one of them has to move on its own and the code has to know which is which. So I built the rig first, before there was anyone to put in it.",
          "Glass Joe went through it first, and you can see every seam. Flat block for a torso. Each arm one wedge from shoulder to glove with no elbow in it, legs meeting the hip at a hard edge, one flat colour per limb. Then I ran Von Kaiser through the same rig at heavier proportions, and that was the real test, because if it held for a second fighter I could add the rest as data instead of drawing each one by hand.",
          "It held. It also still looked like paper. A flat wedge swinging at a flat block just looks like two shapes overlapping. It never reads as contact. So I went back in and split each arm into a shoulder, a bicep and a forearm, gave the legs a knee and a calf, and shaded the torso so a turn reads as a turn. Make the parts fast, throw out whatever doesn't read, rebuild the layer underneath.",
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
          "My first go at making a punch land used impact particles. Wrong call. The burst was so big it buried the fighter at the exact moment you needed to see him get hit.",
          "After that I stopped guessing and started tuning on a real phone, one number at a time. How long the game freezes on contact, how hard the screen shakes, a 60ms buzz in your hand when you connect, how fast the health bar drains, where the punch button sits and how big the block zone is. Over and over, until it stopped feeling like a web page.",
          "You can't ask a model whether a punch feels like a punch. It'll answer, and the answer is worthless, because it has never held the phone. AI gave me three to six builds a day of raw material and I threw most of them away.",
        ],
      },
      {
        heading: "One Sheet Per Fighter",
        paragraphs: [
          "Because the rig is shared I don't draw a fighter anymore, I generate their sheet: ready, jab, cross, hook, uppercut, special, wind-up, block, hurt. Nine poses. Same joints every time.",
          "The fight code can count on eight of those being identical across every fighter. The ninth slot is theirs. Glass Joe's is the Glass Jaw, Von Kaiser's is the Kaiser Barrage, and that one slot is what stops the roster feeling like the same guy in different colours.",
          "Adding an opponent stopped being an art project, since it's the rig at their proportions and a sheet generated off the back of it, which is how Klaus Brenner got in without a single new drawing.",
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
          "It used to take 22 seconds to throw your first punch. After the cut it took 6, and I didn't optimise anything to get there \u2014 I deleted the splash screen, the mode select, the fighter select and the tutorial.",
          "Audio was failing in about 40% of sessions and I had no idea, because nothing ever errored. Browsers block sound until you've interacted with the page, and the game was starting its audio on load, so for four in ten people the first punch landed in silence. Moving audio behind the first tap took it under 2%.",
          "I also built webcam hand-tracking. It worked, and it was genuinely impressive. It was also completely wrong for someone playing on their phone on a couch, so I cut it.",
          "Play it now and you'll find the game has moved on. There's a career mode, which is a fighter select wearing a different hat, and the tutorial has grown back to five cards, though it sits on top of a fight already in progress and one tap skips all five. I'd rather tell you that than sell you a game frozen at its leanest, and the honest version is that the cutting was real and some of it came back within a month.",
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "Every colour comes in a pair: the state at rest, and the same state ten percent lighter on impact. Colour and brightness change together because that reads faster than either on its own.",
        ],
        images: [
          { src: "/images/ringrival-now/design-system.webp", alt: "Ring-Rival design tokens — Courier New, the charcoal ring, and four accent colours each paired with a brighter glow", caption: "Four colours, each with its own glow, because a punch has to register in the frame it lands.",
 width: 1500,
 height: 913,
    },
        ],
      },
      {
        heading: "Every Opponent Has Their Own Rhythm",
        paragraphs: [
          "Same rig Glass Joe came out of, but the wedges are arms now. Klaus Brenner is heavier and slower to reset, so you have to read him differently than the others.",
          "Every opponent has their own special, their own trash talk and their own rhythm. Getting knocked down used to be a countdown you sat and watched, and now you can mash your way back up if you're quick about it.",
        ],
        videos: [
          {
            src: "/ring-rival-fight-brenner.mp4",
            poster: "/images/ringrival-now/fight-brenner-poster.jpg",
            caption:
              "Klaus Brenner. Bigger, heavier, and on a rhythm you have to learn separately.",
              width: 624,
              height: 1079,
          },
        ],
        images: [
          {
            src: "/images/ring-rival/flow-fighter-pipeline.svg",
            alt: "Shared rig of body, arms, legs and head, to a fighter's proportions, to a generated sheet of nine poses, which splits into eight poses the fight code counts on and one special that belongs to the fighter, both feeding the opponent in the roster",
            caption: "How a new opponent gets made, from the rig described further up this page. Eight poses are shared contract; the ninth is what makes Klaus Brenner not Glass Joe.",
            width: 1509,
            height: 218,
          },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It's live at ringrival.today. You open a link on your phone and you're in a fight, with no install and no account. That was the whole question I started with, and the answer came back close enough to yes that I kept going.",
          "It isn't finished, which is why the newest work on this page sits at the top instead of the bottom. Right now I'm tuning the star punch, mostly the frame where the star burns.",
        ],
      },
    ]}
  />
);

export default StructuredRingRivalCaseStudy;
