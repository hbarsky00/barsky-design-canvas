import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredCatchBuddyCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="catchbuddy"
    title="CatchBuddy"
    description="Getting two strangers to agree to meet at a park is the easy part. Getting them to feel safe doing it is the product."
    tags={["AI-Assisted Product", "Trust & Safety", "Mobile-First", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://catchbuddy.fit"
    heroImage={{
      src: "/images/catchbuddy-hero-landing.webp",
      width: 1960,
      height: 1380,
      alt: "CatchBuddy pickup sports landing hero",
      hoverVideo: "/catchbuddy-card.mp4",
      caption: "A game on Saturday. The whole front door is aimed at the person who wants one afternoon.",
    }}
    relatedPost={{
      slug: "when-trust-is-the-product",
      title: "When Trust Is the Product, It Can't Be a Feature",
      blurb: "Getting two strangers to agree to meet at a park is easy. Getting them to feel fine about it's the entire product, and it's not something you\u2026",
    }}
    blocks={[
      {
        heading: "Most People Just Want a Game on Saturday",
        paragraphs: [
          "Pickup sports are dying in cities, and the apps meant to fix that all assume you want a season, with the commitment and the schedule and the recurring team that comes with one. Most people want a game on Saturday.",
          "Scheduling was never the problem. Getting two strangers to agree to meet at a park, with both of them feeling fine about it, was the problem, and it's a trust problem before it's a calendar one.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/catchbuddy/flow-how-i-worked.svg",
            alt: "How I worked on CatchBuddy: start from trust, safety layer first, AI writes the backend, gating decided by hand, AI security review catches a recursive policy, rename Matches, cut the wizard, cut three calendar integrations, shipped",
            caption: "How I worked on it, step by step, from this study's own account. Terracotta is the decision the rest turned on. The muted steps are what I built and then took out.",
            width: 548,
            height: 726,
          },
          {
            src: "/images/catchbuddy/flow-minor-gate.svg",
            alt: "Minor gate. Sign up, and under 18 asks a parent to verify. Once verified they can post, and until then they can browse. Over 18 can post straight away. Every game gets a meeting spot from the curated list and a panic button on every screen",
            caption: "The gate a minor goes through, and the two things every game gets regardless: a curated meeting spot and a panic button.",
            width: 784,
            height: 770,
          },
          { src: "/images/catchbuddy-post-game.webp", alt: "Post Your Game: sport picker with Football, Basketball, Baseball, Volleyball, Frisbee", caption: "Posting a game starts with the sport and nothing else. No team, no schedule, no season to sign up for.",
 width: 1848,
 height: 1364,
    },
        ],
      },
      {
        heading: "A Parent Verifies Before a Kid Can Post",
        paragraphs: [
          "A kid can't post a game until a parent is verified. The panic button is reachable from every screen you can be on during a game, and the meeting spots come from a list I curated, so nobody is dropping a pin on an address of their own choosing.",
          "That last one gets argued with a lot. Letting people add their own locations would be more flexible, and I still won't do it.",
        ],
        images: [
          { src: "/images/catchbuddy-choose-park.webp", alt: "Choose a Park: searchable list with distance and amenities", caption: "A curated list of meeting spots with distance and amenities. Nobody can drop their own pin, and that restriction is the point.",
 width: 1940,
 height: 1396,
    },
        ],
      },
      {
        heading: "What AI Did, and What It Couldn't",
        paragraphs: [
          "AI wrote the RLS policies, the Supabase migrations, the Stripe integration and the OAuth flow, which is a serious chunk of the build, and it did it fast.",
          "It couldn't decide who gets in, who gets gated, and what a stranger sees about another stranger before they agree to meet. Those I made by hand. It did catch one thing I'd have missed, though: an AI security review flagged a recursive RLS policy that would have leaked data in production.",
        ],
        images: [
          { src: "/images/catchbuddy-equipment-prefs.webp", alt: "Equipment and preferences: \"I'll bring a football,\" no-contact toggle", caption: "The small disclosures two strangers trade before they meet, who's bringing a ball, and how physical the game is going to be.",
 width: 1888,
 height: 1386,
    },
        ],
      },
      {
        heading: "What I Cut",
        paragraphs: [
          "Testers kept reading \"Matches\" as a dating thing. It's \"Browse\" and \"Players\" now.",
          "I built a Quick Start wizard that nobody wanted, watched testers skip it every single time, and eventually stopped making them skip it.",
          "Apple, Outlook and ICS calendar support all got built, then all got cut, because barely anyone used them and I was going to be maintaining three integrations forever for the few who did.",
        ],
        imageLayout: "pair",
        images: [
          { src: "/images/catchbuddy-find-players.webp", alt: "Find Players list with 92% and 81% match scores", width: 1946, height: 1404, caption: "Match scores on the player cards. It's called Players now, because testers kept reading \"Matches\" as a dating app." },
          { src: "/images/catchbuddy-signup-minor-gate.webp", alt: "Sign-up form with the 13+ age gate: first checkpoint in the minor-protection flow", width: 1076, height: 1398, caption: "The 13+ gate at sign-up, the first checkpoint in the minor-protection flow, in v1 rather than bolted on later." },
          { src: "/images/catchbuddy-game-live.webp", alt: "Confirmation: \"Your Game is Live!\" with nearby player count, not a vanity counter", width: 1218, height: 1378, caption: "Confirmation shows how many players are nearby. A real number, and it decides whether you get a game." },
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "I made the palette warm, because a trust product that looks like a fintech dashboard reads as a company and this needed to read as a neighbour. The safety states sit inside the same system from v1, instead of arriving later as status chips bolted on the side.",
        ],
        images: [
          { src: "/images/catchbuddy-ds/design-system.webp", alt: "CatchBuddy design tokens: warm paper ground, one deep field green at three depths, and the safety states the colour has to carry", caption: "Warm paper and one green, at three depths. Green is reserved for action so it never gets spent on decoration.",
 width: 1500,
 height: 913,
    },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It shipped. Auth, RLS, Stripe, Google OAuth, realtime updates, the minor-approval flow and the curated meeting spots, designed and built by me.",
          "The safety layer went in first, in v1, because every product I've seen add one later ended up with a settings screen nobody opens.",
        ],
        videos: [
          {
            src: "/catchbuddy-walkthrough.mp4",
            poster: "/images/catchbuddy-walkthrough-poster.jpg",
            narrated: true,
            caption:
              "The full walkthrough, with me talking through it. Posting a game, picking a park, equipment and preferences, then the safety layer: emergency contacts, phone verification, and the minor gate.",
              width: 640,
              height: 1280,
          },
        ],
      },
    ]}
  />
);

export default StructuredCatchBuddyCaseStudy;
