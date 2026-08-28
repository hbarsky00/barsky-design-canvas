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
    }}
    relatedPost={{
      slug: "when-trust-is-the-product",
      title: "When Trust Is the Product, It Can't Be a Feature",
      blurb: "Getting two strangers to agree to meet at a park is easy. Getting them to feel fine about it's the entire product \u2014 and it's not something you\u2026",
    }}
    blocks={[
      {
        heading: "Why I Built It",
        paragraphs: [
          "Pickup sports are dying in cities, and the apps meant to fix that all assume you want a season. They want commitment, a schedule, a recurring team. Most people just want a game on Saturday.",
          "So the thing I actually had to solve wasn't scheduling. It was two strangers agreeing to meet at a park, and both of them feeling fine about it.",
        ],
        images: [
          { src: "/images/catchbuddy-post-game.webp", alt: "Post Your Game — sport picker with Football, Basketball, Baseball, Volleyball, Frisbee" },
        ],
      },
      {
        heading: "Safety Wasn't a Feature, It Was the Whole Thing",
        paragraphs: [
          "A kid can't post a game until a parent is verified. The panic button is reachable from every screen you can be on during a game. And the meeting spots are a list I curated, not somewhere any user can drop a pin.",
          "That last one gets argued with a lot. Letting people add their own locations is more flexible and it is obviously the wrong call here.",
          "None of that came out of a prompt. Those are decisions about who actually shows up to this thing and what happens on the day it goes wrong.",
        ],
        images: [
          { src: "/images/catchbuddy-choose-park.webp", alt: "Choose a Park — searchable list with distance and amenities" },
        ],
      },
      {
        heading: "What AI Did, and What It Couldn't",
        paragraphs: [
          "AI wrote the RLS policies, the Supabase migrations, the Stripe integration and the OAuth flow. That is real work and it did it fast.",
          "What it could not do was decide who gets in, who gets gated, and what a stranger sees about another stranger before they agree to meet. Every one of those I made by hand. AI's own security review also caught a recursive RLS policy that would have leaked data in production.",
        ],
        images: [
          { src: "/images/catchbuddy-equipment-prefs.webp", alt: "Equipment and preferences — \"I'll bring a football,\" no-contact toggle" },
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
          { src: "/images/catchbuddy-find-players.webp", alt: "Find Players list with 92% and 81% match scores", width: 1946, height: 1404 },
          { src: "/images/catchbuddy-signup-minor-gate.webp", alt: "Sign-up form with the 13+ age gate — first checkpoint in the minor-protection flow", width: 1076, height: 1398 },
          { src: "/images/catchbuddy-game-live.png", alt: "Confirmation — \"Your Game is Live!\" with nearby player count, not a vanity counter", width: 1218, height: 1378 },
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "The palette is warm deliberately. A trust product that looks like a fintech dashboard reads as a company rather than a neighbour, and the safety states had to sit inside the same system from v1 instead of arriving later as status chips.",
        ],
        images: [
          { src: "/images/catchbuddy-ds/design-system.webp", alt: "CatchBuddy design tokens — warm paper ground, one deep field green at three depths, and the safety states the colour has to carry", caption: "Warm paper and one green, at three depths. Green is reserved for action so it never gets spent on decoration." },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It shipped. Auth, RLS, Stripe, Google OAuth, realtime updates, the minor-approval flow and the curated meeting spots, designed and built by me.",
          "The safety layer went in first, in v1, which is the only reason it holds together. Bolting that on afterwards never works.",
        ],
        videos: [
          {
            src: "/catchbuddy-walkthrough.mp4",
            poster: "/images/catchbuddy-walkthrough-poster.jpg",
            narrated: true,
            caption:
              "The full walkthrough, with me talking through it — posting a game, picking a park, equipment and preferences, then the safety layer: emergency contacts, phone verification, and the minor gate.",
          },
        ],
      },
    ]}
  />
);

export default StructuredCatchBuddyCaseStudy;
