import React from "react";
import MiniProductSite, { MiniSiteConfig } from "@/components/mini-site/MiniProductSite";
import heroImg from "@/assets/projects/valorabet.png";

const VALORA_URL = "http://valora.bet";

const config: MiniSiteConfig = {
  id: "valora-bet",
  brandName: "Valora Bet",
  colors: {
    bg: "#0d0f1e",
    text: "#ffffff",
    accent: "#f97316",
    secondary: "#3b82f6",
    navText: "#ffffff",
    navBgOnScroll: "rgba(13,15,30,0.85)",
    muted: "rgba(255,255,255,0.7)",
    border: "rgba(255,255,255,0.12)",
    cardBg: "rgba(255,255,255,0.04)",
  },
  nav: { ctaLabel: "Play Now →", ctaHref: VALORA_URL },
  hero: {
    eyebrow: "Social Prediction Markets",
    headline: "Your World. Your Markets. Your Call.",
    subhead: "Create and bet on real-world outcomes using play money. 100+ live markets, 15K+ players, $1M+ volume.",
    ctaLabel: "Explore Markets →",
    ctaHref: VALORA_URL,
    image: { src: heroImg, alt: "Valora prediction markets platform" },
  },
  features: [
    { title: "100+ Live Markets", description: "Crypto, sports, politics, and more. New markets added daily. Browse what's happening right now." },
    { title: "Create Your Own Market", description: "Have a prediction? Publish it. Set the question, set the terms, let the crowd decide." },
    { title: "CPMM Pricing", description: "Prices move with every bet using a Constant Product Market Maker. The crowd sets the odds, not the house." },
    { title: "Clubs & Leaderboards", description: "Join clubs, compete with friends, climb the ranks. Prediction skill is a competitive sport." },
  ],
  about: {
    body: "Prediction markets are one of the most accurate forecasting tools humans have built — and almost no one uses them. The design job was making the betting mechanic feel familiar enough to play without a tutorial, while keeping the CPMM pricing model honest and visible. Most platforms hide the math. Valora shows it.",
    honest: "Google OAuth is intermittently broken. Market resolution requires manual admin intervention — there's no automated proof verification yet. Scaling real-money markets would require a compliance layer that doesn't exist.",
  },
  press: [
    { field: "Type", value: "Social prediction markets platform" },
    { field: "Stack", value: "React 18, TypeScript, Vite, Supabase, Zustand" },
    { field: "Markets", value: "Crypto, Sports, Politics, Custom" },
    { field: "Pricing Model", value: "CPMM (Constant Product Market Maker)" },
    { field: "Platform", value: "Web app" },
    { field: "Status", value: "✓ Live" },
    { field: "URL", value: "valora.bet" },
    { field: "Designer", value: "Hiram Barsky" },
  ],
  bottomCta: { label: "Play Now at valora.bet →", href: VALORA_URL },
  seo: {
    title: "Valora Bet — Social Prediction Markets by Hiram Barsky",
    description: "Create and bet on real-world outcomes using play money. 100+ live markets, 15K+ players, $1M+ volume.",
  },
};

const ValoraBetCaseStudy: React.FC = () => <MiniProductSite config={config} />;
export default ValoraBetCaseStudy;
