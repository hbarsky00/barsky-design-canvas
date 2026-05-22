import React from "react";
import MiniProductSite, { MiniSiteConfig } from "@/components/mini-site/MiniProductSite";

const config: MiniSiteConfig = {
  id: "ring-rival",
  brandName: "Ring-Rival",
  colors: {
    bg: "#0d0d0d",
    text: "#ffffff",
    accent: "#e8003d",
    secondary: "#ffffff",
    navText: "#ffffff",
  },
  nav: { ctaLabel: "Fight Now →", ctaHref: "https://rival.li" },
  hero: {
    eyebrow: "Mobile Web Boxing",
    headline: "Console Boxing Feel. Zero Install.",
    subhead: "Distinct AI opponents, generated trash talk, career mode — in your browser.",
    ctaLabel: "Start Career →",
    ctaHref: "https://rival.li",
    image: { src: "/images/ringrival-hero-title.png", alt: "Ring-Rival boxing game" },
  },
  features: [
    { title: "Distinct AI Opponents", description: "Each fighter has a unique silhouette, personality, and trash talk. Generated with AI, tuned across hundreds of fights." },
    { title: "Console-Grade Feel", description: "Hit-stop, screen shake, 60ms haptic on connect. Hand-tuned by feel, not by prompt." },
    { title: "Career Mode", description: "Fight through a difficulty-ordered roster. Unlock opponents by winning." },
    { title: "Zero Install", description: "Full game in the browser. No app store, no download." },
  ],
  about: {
    body: "Boxing games live on consoles for a reason. Doing console feel with a thumb in a browser was the constraint that made it worth building. No model knows whether a punch feels like a punch — that part was all hand-tuning.",
    honest: "Multiplayer is the obvious next step and the hardest engineering problem. Webcam hand-tracking was explored and cut — impressive, wrong audience.",
  },
  press: [
    { field: "Type", value: "Solo-built mobile web game" },
    { field: "Stack", value: "Canvas API, Web Audio, Haptics, Supabase" },
    { field: "Opponents", value: "Glass Joe, Von Kaiser, Disco Dan + more" },
    { field: "Platform", value: "Mobile web — iOS Safari, Chrome" },
    { field: "Status", value: "✓ Live" },
    { field: "URL", value: "rival.li" },
    { field: "Designer", value: "Hiram Barsky" },
  ],
  bottomCta: { label: "Fight Now at rival.li →", href: "https://rival.li" },
  seo: {
    title: "Ring-Rival — Mobile Web Boxing by Hiram Barsky",
    description: "Console boxing feel with zero install. Distinct AI opponents, generated trash talk, full career mode in the browser.",
  },
};

const StructuredRingRivalCaseStudy: React.FC = () => <MiniProductSite config={config} />;
export default StructuredRingRivalCaseStudy;
