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
      caption: "A game on Saturday, not a season. The whole front door is aimed at the person who wants one afternoon.",
    }}
    relatedPost={{
      slug: "when-trust-is-the-product",
      title: "When Trust Is the Product, It Can't Be a Feature",
      blurb: "Getting two strangers to agree to meet at a park is easy. Getting them to feel fine about it's the entire product \u2014 and it's not something you\u2026",
    }}
    blocks={[
      {
        heading: "Most People Just Want a Game on Saturday",
        paragraphs: [
          "Pickup sports are dying in cities, and the apps meant to fix that all assume you want a season. They want commitment, a schedule, a recurring team. Most people just want a game on Saturday.",
          "The problem was never scheduling. It was getting two strangers to agree to meet at a park with both of them feeling fine about it.",
        ],
        images: [
          { src: "/images/catchbuddy-post-game.webp", alt: "Post Your Game — sport picker with Football, Basketball, Baseball, Volleyball, Frisbee", caption: "Posting a game starts with the sport and nothing else. No team, no schedule, no season to sign up for." },
        ],
      },
      {
        heading: "A Parent Verifies Before a Kid Can Post",
        paragraphs: [
          "A kid can't post a game until a parent is verified. The panic button is reachable from every screen you can be on during a game. And the meeting spots are a list I curated, not somewhere any user can drop a pin.",
          "That last one gets argued with a lot. Letting people add their own locations is more flexible, and I still won\u2019t do it.",
        ],
        images: [
          { src: "/images/catchbuddy-choose-park.webp", alt: "Choose a Park — searchable list with distance and amenities", caption: "A curated list of meeting spots with distance and amenities. Nobody can drop their own pin, and that restriction is the point." },
        ],
      },
      {
        heading: "What AI Did, and What It Couldn't",
        paragraphs: [
          "AI wrote the RLS policies, the Supabase migrations, the Stripe integration and the OAuth flow. That is real work and it did it fast.",
          "What it could not do was decide who gets in, who gets gated, and what a stranger sees about another stranger before they agree to meet. Every one of those I made by hand. AI's own security review also caught a recursive RLS policy that would have leaked data in production.",
        ],
        images: [
          { src: "/images/catchbuddy-equipment-prefs.webp", alt: "Equipment and preferences — \"I'll bring a football,\" no-contact toggle", caption: "The small disclosures two strangers trade before they meet — who's bringing a ball, and whether this is contact or not." },
        ],
      },
      {
        heading: "What I Cut",
        paragraphs: [
          "Testers kept reading \"Matches\" as a dating thing, which is not what anybody needed here. It is \"Browse\" and \"Players\" now.",
          "I built a Quick Start wizard that nobody wanted. Testers skipped it every time, so I stopped making them skip it.",
          "Apple, Outlook and ICS calendar support all got built, then all got cut. Barely anyone used them and I was going to be maintaining three integrations forever for that.",
        ],
        imageLayout: "pair",
        images: [
          { src: "/images/catchbuddy-find-players.webp", alt: "Find Players list with 92% and 81% match scores", width: 1946, height: 1404, caption: "Match scores on the player cards. It's called Players now, because testers kept reading \"Matches\" as a dating app." },
          { src: "/images/catchbuddy-signup-minor-gate.webp", alt: "Sign-up form with the 13+ age gate — first checkpoint in the minor-protection flow", width: 1076, height: 1398, caption: "The 13+ gate at sign-up — the first checkpoint in the minor-protection flow, in v1 rather than bolted on later." },
          { src: "/images/catchbuddy-game-live.png", alt: "Confirmation — \"Your Game is Live!\" with nearby player count, not a vanity counter", width: 1218, height: 1378, caption: "Confirmation shows how many players are nearby. A real number that decides whether you get a game, not a vanity counter." },
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "I made the palette warm. A trust product that looks like a fintech dashboard reads as a company rather than a neighbour. The safety states sit inside the same system from v1, instead of arriving later as status chips bolted on the side.",
        ],
        images: [
          { src: "/images/catchbuddy-ds/design-system.webp", alt: "CatchBuddy design tokens — warm paper ground, one deep field green at three depths, and the safety states the colour has to carry", caption: "Warm paper and one green, at three depths. Green is reserved for action so it never gets spent on decoration." },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It shipped. Auth, RLS, Stripe, Google OAuth, realtime updates, the minor-approval flow and the curated meeting spots, designed and built by me.",
          "The safety layer went in first, in v1. Every product I have seen add one later ended up with a settings screen nobody opens.",
        ],
        videos: [
          {
            src: "/catchbuddy-walkthrough.mp4",
            poster: "/images/catchbuddy-walkthrough-poster.jpg",
            narrated: true,
            caption:
              "The full walkthrough, with me talking through it. Posting a game, picking a park, equipment and preferences, then the safety layer: emergency contacts, phone verification, and the minor gate.",
          },
        ],
      },
    ]}
  />
);

export default StructuredCatchBuddyCaseStudy;
