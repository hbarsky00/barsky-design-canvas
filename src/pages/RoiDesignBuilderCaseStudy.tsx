import React from "react";
import MiniProductSite, { MiniSiteConfig } from "@/components/mini-site/MiniProductSite";

const config: MiniSiteConfig = {
  id: "roi-design-builder",
  brandName: "ROI Design Builder",
  colors: {
    bg: "#ffffff",
    text: "#111111",
    accent: "#0ea5e9",
    secondary: "#38bdf8",
    navText: "#111111",
    navBgOnScroll: "rgba(255,255,255,0.9)",
    muted: "rgba(17,17,17,0.65)",
    border: "rgba(17,17,17,0.1)",
    cardBg: "rgba(14,165,233,0.06)",
  },
  nav: { ctaLabel: "Try It →", ctaDisabled: true },
  hero: {
    eyebrow: "Enterprise · Stakeholder Tools · Concept",
    headline: "Make the Business Case for Design.",
    subhead: "A calculator and presentation tool that helps designers translate design decisions into dollars.",
    ctaLabel: "Coming Soon",
    ctaDisabled: true,
    statusBadge: "🚧 In Development",
    placeholderText: "ROI",
  },
  features: [
    { title: "ROI Calculator", description: "Input project scope, team size, and design decisions. Get a defensible business case output." },
    { title: "Stakeholder Deck Builder", description: "Auto-generate a presentation from your inputs. Leave the meeting with a shareable PDF." },
    { title: "Benchmark Library", description: "Industry benchmarks for conversion lift, churn reduction, and support cost savings — pre-loaded and citable." },
    { title: "Plain English Output", description: "Designed for designers talking to finance, not designers talking to designers." },
  ],
  about: {
    body: "Designers lose budget conversations because they speak in craft and stakeholders speak in money. The brief was a tool that translates. The hard part isn't the math — it's knowing which numbers stakeholders actually trust.",
    honest: "This is a concept. The benchmark data problem is real — generic industry stats get challenged immediately. The tool only works if the numbers are defensible. That's the unsolved design problem.",
  },
  press: [
    { field: "Type", value: "Concept / Tool Design" },
    { field: "Tags", value: "Enterprise, Stakeholder Tools, ROI" },
    { field: "Status", value: "🚧 In Development" },
    { field: "Platform", value: "Web app" },
    { field: "Designer", value: "Hiram Barsky" },
  ],
  bottomCta: { label: "In Development — Check Back Soon", disabled: true },
  seo: {
    title: "ROI Design Builder — Make the Business Case for Design",
    description: "A concept calculator and presentation tool that helps designers translate design decisions into dollars stakeholders trust.",
  },
};

const RoiDesignBuilderCaseStudy: React.FC = () => <MiniProductSite config={config} />;
export default RoiDesignBuilderCaseStudy;
