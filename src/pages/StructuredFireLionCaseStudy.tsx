import React from "react";
import MiniProductSite, { MiniSiteConfig } from "@/components/mini-site/MiniProductSite";
import heroImg from "@/assets/projects/firelion.png";

const config: MiniSiteConfig = {
  id: "fire-lion",
  brandName: "Fire Lion",
  colors: {
    bg: "#0a0a0a",
    text: "#ffffff",
    accent: "#ff6b00",
    secondary: "#ff2200",
    navText: "#ffffff",
  },
  nav: { ctaLabel: "Play Now →", ctaHref: "https://firelion.me" },
  hero: {
    eyebrow: "Word-Casting Arcade Game",
    headline: "Spell Words. Cast Spells. Survive.",
    subhead: "A solo-built mobile web game where vocabulary is your weapon.",
    ctaLabel: "Play Free →",
    ctaHref: "https://firelion.me",
    image: { src: heroImg, alt: "Fire Lion gameplay" },
  },
  features: [
    { title: "Three Game Modes", description: "Fire Lion, Lion Wars, Cub Mode. Each isolated so refactors never break the others." },
    { title: "Spell-to-Cast Combat", description: "Spell words mid-flight to trigger attacks. Combos scale with word length and speed." },
    { title: "AI-Generated Content", description: "Opponent personalities, trash talk, and level text generated with AI. Art direction tuned by hand." },
    { title: "Solo Built", description: "Supabase, particle systems, 30+ file refactors. Built solo with AI as co-builder." },
  ],
  about: {
    body: "The design job was deciding what to delete. The deletion list ended up longer than the feature list. The game got better with every cut.",
    honest: "Difficulty balancing across skill levels. The game gets hard fast and there's no adaptive curve yet.",
  },
  press: [
    { field: "Type", value: "Solo-built mobile web game" },
    { field: "Stack", value: "Supabase, Vanilla JS, Web Audio API" },
    { field: "Modes", value: "Fire Lion, Lion Wars, Cub Mode" },
    { field: "Platform", value: "Mobile web — iOS Safari, Chrome" },
    { field: "Status", value: "✓ Live" },
    { field: "URL", value: "firelion.me" },
    { field: "Designer", value: "Hiram Barsky" },
  ],
  bottomCta: { label: "Play Fire Lion Free →", href: "https://firelion.me" },
  seo: {
    title: "Fire Lion — Word-Casting Arcade Game by Hiram Barsky",
    description: "A solo-built mobile web game where vocabulary is your weapon. Three modes, AI-generated opponents, spell-to-cast combat.",
  },
};

const StructuredFireLionCaseStudy: React.FC = () => <MiniProductSite config={config} />;
export default StructuredFireLionCaseStudy;
