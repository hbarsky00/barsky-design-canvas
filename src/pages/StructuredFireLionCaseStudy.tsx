import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredFireLionCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="fire-lion"
    title="Fire Lion"
    description="An arcade game that has been shipped, developed all by itself using AI\u2014during flight you have to spell out the words in order to cast the spells\u2014and most of the design effort consisted in deciding what to delete."
    tags={["AI-Assisted Product", "Game Design", "Mobile Web", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://firelion.me"
    heroImage={{
      src: "/images/firelion-hero-triptych.webp",
      alt: "Fire Lion in play: the hold-to-fly prompt, the lion mid-flight, and a boulder incoming",
      hoverVideo: "/lovable-uploads/fire-lion-hero.mp4",
      caption: "To fly you have to hold the device, and there's already something heading towards you; if one tap wasn't satisfactory in this instance, no subsequent attachment could have improved the situation.",
      width: 1672,
      height: 992,
    }}
    relatedPost={{
      slug: "a-to-do-app-doesnt-prove-anything",
      title: "A To-Do App Doesn't Prove Anything",
      blurb: "Most “I built this with AI” portfolios pick something safe. Safe projects hide the only question worth answering: can you ship something…",
    }}
    blocks={[
      {
        heading: "I Picked Something That Could Visibly Fail",
        paragraphs: [
          "Each portfolio item that says \"I built this with AI\" is either a calculator or a to-do app, and I can see why. Because nothing in a to-do app could fail in a way that a stranger would notice.",
          "A game will fail in the eyes of the public; if a jump seems incorrect everyone becomes aware of it within a second and there is no need to explain the mechanics to them first. Since that appeared to be the more honest approach, I decided to create such a test.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/fire-lion/flow-how-i-worked.svg",
            alt: "How I worked on Fire Lion: pick a game, one tap and one lion, tune until fun, spelling months later, AI scaffolds, hand-tune feel, build retention features, watch players ignore them, delete them, live",
            caption: "A step-by-step explanation of how I approached it, based on the account in the study. The decision known as Terracotta was the one that the others relied upon. The more subdued steps were my own constructions which I afterwards removed.",
            width: 472,
            height: 880,
          },
          {
            src: "/images/fire-lion/flow-three-modes.svg",
            alt: "Tap FLY leads to one of three modes, Fire Lion, Lion Wars and Cub Mode, each with its own state and audio, nothing shared",
            caption: "There is one entrance and three rooms that are sealed off from each other, meaning that any change in one of them won't affect the other two.",
            width: 1270,
            height: 484,
          },
          { src: "/images/firelion-spelling-lightning.webp", alt: "Lightning Strike spell casting from spelling MN", caption: "Casting a spell by spelling out a word while in motion has an effect since it was already pleasant to tap before the act of spelling was added.",
 width: 488,
 height: 686,
    },
        ],
      },
      {
        heading: "One Tap Had to Be Fun Before Anything Else Existed",
        paragraphs: [
          "With just one tap, one lion, and no further features, it had to be enjoyable from the very beginning or else no amount of spells or modes could save it, which is why I spent a long time with just the basic loop before adding anything.",
          "The spelling didn't come until months later, simply because the tapping had already passed that test; you have to spell a word while it's in motion and it works because the tap underneath it had already seemed good.",
        ],
        images: [
          { src: "/images/firelion-spelling-combo.webp", alt: "Spelling CRAP over a lava forge anvil, 5× combo", caption: "This result comes from five consecutive combos on the lava forge; it is what remained after the daily missions, the streaks and the upgrade screens had been deleted.",
 width: 500,
 height: 692,
    },
        ],
      },
      {
        heading: "Three Modes, Three Sandboxes",
        paragraphs: [
          "Fire Lion becomes more intense and builds up tension. Lion Wars is slower and more strategic. Cub Mode is the low-stakes option that you choose when you've been losing.",
          "Each component has its own state and its own audio; this is a defensive choice rather than an architectural one. I was developing quickly, generally in the late hours of the night, and any refactoring that involves a shared file causes problems which only become apparent when someone else discovers them. Although the duplication comes at a real cost to me, it does give me the advantage of being able to change one mode without having to keep the other two in mind.",
        ],
        images: [
          { src: "/images/firelion-cubmode-sunset.webp", alt: "Cub Mode sunset scene: kept isolated from the main game so refactors never break it", caption: "Cub Mode is the low-stakes option that you access when you've lost. It is a separate component, has its own state, and has its own audio.",
 width: 802,
 height: 656,
    },
          { src: "/images/firelion-cubmode-ocean.webp", alt: "Cub Mode ocean scene: same isolation rule: separate component, separate audio, separate state", caption: "The same isolation rule is applied in the second scene. I deliberately incurred the cost of duplication, so that a refactoring operation in one mode will not affect the other two.",
 width: 735,
 height: 655,
    },
        ],
      },
      {
        heading: "Where AI Stopped Being Useful",
        paragraphs: [
          "The AI created the Supabase schemas, the particle systems, and the refactors across thirty-odd files all at once. That saved me weeks, and I won't pretend I didn't.",
          "I set up the gravity, the tap impulse, and the difficulty curve by hand using a phone after carrying out hundreds of trials. You can't ask a model whether a jump seems right to it; it will give you an answer, but that answer has no meaning.",
          "Making features became cheap, but it was still expensive to decide which ones would survive, since that part still requires someone to sit on the couch with the phone.",
        ],
        images: [
          { src: "/images/firelion-lionwars-combat.webp", alt: "Lion Wars naval combat, wave 1 of 7, lava cavern backdrop", caption: "Lion Wars, in the slow strategic mode. The AI was used to set up the particle system. I adjusted the difficulty curve by hand on a phone.",
 width: 488,
 height: 680,
    },
        ],
      },
      {
        heading: "The Delete List Got Longer Than the Feature List",
        paragraphs: [
          "I created all of that\u2014the daily missions, the streaks, the daily challenge in the style of Wordle, the social-proof counter, and the forge upgrade screen\u2014and then got rid of it all again.",
          "The ideas themselves weren't bad in theory, which was the problem. They were retention features added to a game that hadn't yet proved it could retain players, and each one introduced an extra screen between opening the game and actually playing it.",
          "Each time I deleted one, the game improved. Around the fourth or fifth deletion, I stopped seeing deletion as a way to tidy things up and started to regard it as the real work.",
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "The only part of the game that a token file could contain is the palette. Color indicates state since there is no time to read anything. I manually adjusted the gravity and tap sensation on a phone.",
        ],
        images: [
          { src: "/images/firelion-ds/design-system.webp", alt: "Fire Lion design tokens: Bebas Neue, the dark arcade ground, and the flame/gold/cold-green accents", caption: "The ground is dark, there are three accents, and the type is HUD not copy.",
 width: 1500,
 height: 913,
    },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "You can find it at firelion.me, and it's advanced enough that you can give it to someone else without needing an explanation.",
          "It takes AI only a week to create a game. That's not the most interesting point. I still had to decide what to include, and no model was willing to do that for me.",
        ],
      },
    ]}
  />
);

export default StructuredFireLionCaseStudy;
