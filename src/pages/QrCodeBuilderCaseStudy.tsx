import React from "react";
import MiniProductSite, { MiniSiteConfig } from "@/components/mini-site/MiniProductSite";

const config: MiniSiteConfig = {
  id: "qr-code-builder",
  brandName: "QR Code Builder",
  colors: {
    bg: "#0f0f1a",
    text: "#ffffff",
    accent: "#6366f1",
    secondary: "#a5b4fc",
    navText: "#ffffff",
  },
  nav: { ctaLabel: "Try It →", ctaDisabled: true },
  hero: {
    eyebrow: "Gen AI · Tool Design · Concept",
    headline: "Branded QR Codes. Built to Perform.",
    subhead: "Generate styled QR codes with built-in analytics and AI-assisted design customization.",
    ctaLabel: "Coming Soon",
    ctaDisabled: true,
    statusBadge: "🚧 In Development",
    placeholderText: "QR",
  },
  features: [
    { title: "AI Style Generation", description: "Describe your brand, get a QR code that matches. Colors, shapes, and patterns generated to spec." },
    { title: "Built-in Analytics", description: "Track scans by location, device, and time. Know which codes are working." },
    { title: "Brand-Safe Output", description: "Every generated code is tested for scannability before export. Beauty doesn't break function." },
    { title: "One-Click Export", description: "PNG, SVG, and print-ready PDF. No design tool required." },
  ],
  about: {
    body: "QR codes are everywhere and almost all of them are ugly. The brief was: what if the code itself was part of the brand? The design challenge is keeping AI-generated styles scannable — beauty can't break function.",
    honest: "This is a concept. The hard part is the scannability constraint — generative styles that look great but fail to scan are useless. That tension isn't solved yet.",
  },
  press: [
    { field: "Type", value: "Concept / Tool Design" },
    { field: "Tags", value: "Gen AI, Tool Design, Branding" },
    { field: "Status", value: "🚧 In Development" },
    { field: "Platform", value: "Web app" },
    { field: "Designer", value: "Hiram Barsky" },
  ],
  bottomCta: { label: "In Development — Check Back Soon", disabled: true },
  seo: {
    title: "QR Code Builder — Branded QR Codes With Analytics",
    description: "A concept tool for generating branded QR codes with built-in analytics and AI-assisted style customization.",
  },
};

const QrCodeBuilderCaseStudy: React.FC = () => <MiniProductSite config={config} />;
export default QrCodeBuilderCaseStudy;
