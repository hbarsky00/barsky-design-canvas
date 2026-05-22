import React from "react";
import MiniProductSite, { MiniSiteConfig } from "@/components/mini-site/MiniProductSite";

const config: MiniSiteConfig = {
  id: "catchbuddy",
  brandName: "CatchBuddy",
  colors: {
    bg: "#ffffff",
    text: "#111111",
    accent: "#16a34a",
    secondary: "#22c55e",
    navText: "#111111",
    navBgOnScroll: "rgba(255,255,255,0.9)",
    muted: "rgba(17,17,17,0.65)",
    border: "rgba(17,17,17,0.1)",
    cardBg: "rgba(17,17,17,0.03)",
  },
  nav: { ctaLabel: "Find a Game →", ctaHref: "https://catchbuddy.me" },
  hero: {
    eyebrow: "Pickup Sports Platform",
    headline: "Find Local Players. Play Today.",
    subhead: "Post a game, find partners, confirm in a few taps.",
    ctaLabel: "Find a Game →",
    ctaHref: "https://catchbuddy.me",
    image: { src: "/images/catchbuddy-hero-landing.png", alt: "CatchBuddy app" },
  },
  features: [
    { title: "Same-Day Games", description: "Post and play today. No schedules, no seasons, no commitments." },
    { title: "Safety First", description: "Curated meeting spots, panic button on every screen, verified parent gate for minors." },
    { title: "Smart Matching", description: "Match scores based on sport, skill, location, and availability." },
    { title: "Zero Friction", description: "Google OAuth, in-app confirmation, calendar export. Post to confirmed in under 2 minutes." },
  ],
  about: {
    body: "Pickup sports are dying in cities. Existing apps assume commitment. The real product was a way to lower the friction and safety risk of two strangers agreeing to meet at a park.",
    honest: "Retention after the first game. Getting people back for a second is harder than getting them there the first time.",
  },
  press: [
    { field: "Type", value: "Solo-built consumer platform" },
    { field: "Stack", value: "Supabase, Stripe, Google OAuth, Realtime" },
    { field: "Sports", value: "Football, Basketball, Baseball, Volleyball, Frisbee" },
    { field: "Platform", value: "Mobile web + PWA" },
    { field: "Status", value: "✓ Live" },
    { field: "URL", value: "catchbuddy.me" },
    { field: "Designer", value: "Hiram Barsky" },
  ],
  bottomCta: { label: "Find a Game at catchbuddy.me →", href: "https://catchbuddy.me" },
  seo: {
    title: "CatchBuddy — Same-Day Pickup Sports Platform",
    description: "Find local players and play today. Same-day pickup sports with smart matching, safety-first design, and zero friction.",
  },
};

const StructuredCatchBuddyCaseStudy: React.FC = () => <MiniProductSite config={config} />;
export default StructuredCatchBuddyCaseStudy;
