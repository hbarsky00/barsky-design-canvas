import React from "react";
import MiniProductSite, { MiniSiteConfig } from "@/components/mini-site/MiniProductSite";
import heroImg from "@/assets/projects/herbalink.png";

const config: MiniSiteConfig = {
  id: "herbalink",
  brandName: "HerbaLink",
  colors: {
    bg: "#faf9f6",
    text: "#2d2d2d",
    accent: "#4a7c59",
    secondary: "#6b9b78",
    navText: "#2d2d2d",
    navBgOnScroll: "rgba(250,249,246,0.9)",
    muted: "rgba(45,45,45,0.7)",
    border: "rgba(45,45,45,0.12)",
    cardBg: "rgba(74,124,89,0.06)",
  },
  nav: { ctaLabel: "Find an Herbalist →", ctaHref: "http://herbalink.live" },
  hero: {
    eyebrow: "Verified Herbalist Platform",
    headline: "Find a Herbalist You Can Trust.",
    subhead: "Every practitioner verified against the American Herbalists Guild. No unverified listings, ever.",
    ctaLabel: "Find an Herbalist →",
    ctaHref: "http://herbalink.live",
    image: { src: heroImg, alt: "HerbaLink platform" },
  },
  features: [
    { title: "Credential-Gated Directory", description: "Nothing visible until verified against the American Herbalists Guild. Smaller catalog. Honest by design." },
    { title: "Symptom-First Discovery", description: "Guided intake replaces open search. Describe what you're experiencing, not what certification you want." },
    { title: "Transparent Booking", description: "See credentials, specialties, and availability before you book." },
    { title: "Built for Safety", description: "In a category where bad advice has real consequences, the safer path is the easier one." },
  ],
  about: {
    body: "People turn to herbalism for conditions conventional medicine isn't addressing — and the discovery experience is a misinformation field. Inverting the credential gate produces a smaller, more honest catalog. Honest beats exhaustive.",
    honest: "Practitioner onboarding is manual. Scaling verified supply is the hardest problem and I haven't cracked it.",
  },
  press: [
    { field: "Type", value: "Solo-built healthcare platform" },
    { field: "Stack", value: "Supabase, Stripe, Edge Functions, RLS" },
    { field: "Verification", value: "American Herbalists Guild" },
    { field: "Platform", value: "Mobile web" },
    { field: "Status", value: "✓ Live" },
    { field: "URL", value: "herbalink.live" },
    { field: "Designer", value: "Hiram Barsky" },
  ],
  bottomCta: { label: "Find an Herbalist at herbalink.live →", href: "http://herbalink.live" },
  seo: {
    title: "HerbaLink — Verified Herbalist Platform",
    description: "Find a verified herbalist you can trust. Every practitioner credentialed against the American Herbalists Guild.",
  },
};

const StructuredHerbalinkCaseStudy: React.FC = () => <MiniProductSite config={config} />;
export default StructuredHerbalinkCaseStudy;
