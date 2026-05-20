import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredCatchBuddyCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="catchbuddy"
    title="CatchBuddy"
    description="Same-day pickup sports, designed for trust. Post a game, find players, confirm in a few taps — built solo with AI as a co-builder."
    tags={["AI-Assisted Product", "Trust & Safety", "Mobile-First", "Solo Build"]}
    liveUrl="https://catchbuddy.me"
    heroImage={{
      src: "/images/catchbuddy-hero-landing.png",
      alt: "CatchBuddy pickup sports landing hero",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "Pickup sports are dying in cities. Existing apps assume commitment, schedules, and recurring teams. Most people want one game this weekend, not a season.",
          "The real product wasn't another scheduling tool — it was a way to lower the friction and safety risk of two strangers agreeing to meet at a park.",
        ],
        images: [
          { src: "/images/catchbuddy-post-game.png", alt: "Post Your Game — sport picker with Football, Basketball, Baseball, Volleyball, Frisbee" },
        ],
      },
      {
        heading: "Safety Is the Product",
        paragraphs: [
          "Minors require a verified parent before they can post. The panic button reaches every in-game screen. Public meeting spots are curated, not crowdsourced.",
          "None of that came from a prompt — those are product calls about who's actually going to use this and what could go wrong.",
        ],
        images: [
          { src: "/images/catchbuddy-choose-park.png", alt: "Choose a Park — searchable list with distance and amenities" },
        ],
      },
      {
        heading: "What AI Did vs. What I Did",
        paragraphs: [
          "AI shipped the RLS policies, Supabase migrations, Stripe integration, and OAuth flow.",
          "The trust model — who gets in, who's gated, what's surfaced — was every decision made by hand. AI's own security review also caught a recursive RLS policy that would have leaked data in production.",
        ],
        images: [
          { src: "/images/catchbuddy-equipment-prefs.png", alt: "Equipment and preferences — \"I'll bring a football,\" no-contact toggle" },
        ],
      },
      {
        heading: "What Got Cut",
        paragraphs: [
          "\"Matches\" was renamed to \"Browse\" and \"Players\" after testers consistently read it as Tinder-like.",
          "The Quick Start wizard was over-engineered — users wanted to skip it.",
          "Apple, Outlook, and ICS calendar support were built and then cut as a maintenance tax for a feature users barely used.",
        ],
        images: [
          { src: "/images/catchbuddy-find-players.png", alt: "Find Players list with 92% and 81% match scores" },
          { src: "/images/catchbuddy-signup-minor-gate.png", alt: "Sign-up form with the 13+ age gate — first checkpoint in the minor-protection flow" },
          { src: "/images/catchbuddy-game-live.png", alt: "Confirmation — \"Your Game is Live!\" with nearby player count, not a vanity counter" },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A shipped platform with auth, RLS, Stripe, Google OAuth, realtime updates, a minor-approval flow, and curated meeting spots — designed and built solo.",
          "Trust-first architecture, built in from v1, not bolted on.",
        ],
      },
    ]}
  />
);

export default StructuredCatchBuddyCaseStudy;
