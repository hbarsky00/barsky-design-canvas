
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import CaseStudyFeature, { CaseStudyVariant } from "@/components/home/CaseStudyFeature";

interface CaseStudy {
  id: string;
  tags: string[];
  title: string;
  description: string;
  impact: string;
  url: string;
  // false when the detail route is retired (301s away). The card still shows the
  // work; it just does not link at a redirect.
  hasDetail?: boolean;
  liveUrl?: string;
  images: {
    primary: string;
    secondary?: string;
    alt: string;
  };
  layout: "side-by-side" | "single-centered" | "web-mobile";
  video?: string;
  /** Which of the five compositions presents this study. */
  variant: CaseStudyVariant;
  /** Extra product screens the layered and workflow compositions draw on. */
  screens?: { src: string; alt: string }[];
  /** Keeps the impact line off this band; the string itself is left intact. */
  hideImpact?: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    id: "dae-search",
    tags: ["Enterprise", "Search", "Data Discovery"],
    title: "DAE Search Platform: Making Enterprise Data Actually Findable",
    description: "Redesigned an enterprise search platform that transformed how teams discover and access critical business data. Through semantic search and visual data lineage, we reduced information retrieval time by 65% and delivered measurable ROI.",
    impact: "20% ROI from Better Data Discovery",
    url: "/project/dae-search",
    images: {
      primary: "/images/dae-search/outcome-dashboard.webp",
      alt: "DAE Search Platform showing enterprise data discovery interface"
    },
    layout: "side-by-side",
    variant: "productHero",
    hideImpact: true,
  },
  {
    id: "business-management",
    tags: ["Enterprise", "Small Business", "Automation"],
    title: "One System Instead of Six: Cutting Operation Errors by 68%",
    description: "Small business owners waste 23% of their week switching between disconnected tools—leading to costly errors and mental fatigue. I designed a unified operations platform that consolidates invoicing, scheduling, and task management into one intuitive system.",
    impact: "68% Fewer Operation Errors",
    url: "/project/business-management",
    images: {
      primary: "/images/business-management/v2/hifi-end-to-end-flow.webp",
      alt: "Business management warehouse operations and inventory tracking system"
    },
    layout: "side-by-side",
    variant: "editorialSplit",
  },
  {
    id: "email-creation-ai",
    tags: ["Pharma", "Gen AI", "Workflow Design"],
    title: "40% Faster Pharma Campaigns With AI-Powered Email Creation",
    description: "Designed a 6-step AI-assisted workflow for a global pharma team that reduced campaign production time by 40% while maintaining full MLR compliance and removing multiple manual handoffs.",
    impact: "40% Faster Campaign Production",
    url: "/project/email-creation-ai",
    hasDetail: false,
    images: {
      primary: "/images/email-ai-promo.webp",
      alt: "AI-powered pharma email creation workflow interface"
    },
    layout: "side-by-side",
    variant: "workflow",
    screens: [
      { src: "/images/emailai-screen1-content-planning.webp", alt: "Step one: planning the campaign content" },
      { src: "/images/emailai-screen2-assemble.webp", alt: "Step two: assembling the email from approved modules" },
      { src: "/images/emailai-screen3-iterate-qc.webp", alt: "Step three: iterating with quality control" },
      { src: "/images/emailai-screen6-pre-mlr.webp", alt: "Step six: the pre-MLR compliance check" },
    ],
  },
  // investor-loan-app entry hidden - data preserved in structuredCaseStudies.ts
  {
    id: "catchbuddy",
    tags: ["AI-Assisted Product", "Trust & Safety", "Solo Build"],
    title: "CatchBuddy: Trust Is the Product, Not a Settings Page",
    description:
      "The easy part is getting two strangers to agree to meet in a park; the difficult part is getting them to feel safe while doing so. Pickup apps assume you want a season. Most people just want a game on Saturday.",
    impact: "Safety layer shipped in v1",
    url: "/project/catchbuddy",
    liveUrl: "https://catchbuddy.fit",
    images: {
      primary: "/images/catchbuddy/hifi-phones-row.webp",
      alt: "Three CatchBuddy phone screens: nearby games, the map view, and a game detail with who is going",
    },
    layout: "side-by-side",
    variant: "cinematic",
  },
  {
    id: "herbalink",
    tags: ["Blue Sky", "Design Thinking", "GenAI"],
    title: "HerbaLink: Credential Trust for Certified Herbalists",
    description: "I built a discovery and booking platform connecting users with vetted herbalists and reliable resources. The vision centered on credibility—helping users find trusted practitioners while avoiding unverified sources and misinformation.",
    impact: "3× Practitioner Bookings",
    url: "/project/herbalink",
    liveUrl: "https://herbalink.live",
    images: {
      primary: "/images/herbalink/high-fidelity-prototype.webp",
      alt: "HerbaLink practitioner booking interface"
    },
    layout: "side-by-side",
    variant: "productContext",
  }
];

/**
 * A chapter heading, not a second hero.
 *
 * This was a centred SectionHeader — "Case Studies That Drive Results" over a
 * marketing subtitle — in its own padded container, which read as a banner and
 * pushed the first project off the screen. It is now a compact left-aligned
 * rule on the same rail the case studies use, so the eye runs straight from the
 * heading into the first piece of work.
 */
const SelectedWorkIntro: React.FC<{ count: number }> = ({ count }) => {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-14 pt-10 md:pt-12 pb-1">
      <motion.div {...rise(0)} className="flex items-center gap-4 md:gap-6">
        <p className="text-eyebrow text-muted-foreground whitespace-nowrap">Selected work</p>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        <p className="text-eyebrow text-muted-foreground tabular-nums whitespace-nowrap">
          01 — {String(count).padStart(2, "0")}
        </p>
      </motion.div>

      {/* The headline that used to sit here is now the page H1 in the hero.
          Printing it a second time, a screen apart, read as a mistake — so the
          intro keeps the rule, the counter and the standfirst, and hands over. */}
      <motion.p
        {...rise(0.06)}
        className="mt-5 md:mt-6 max-w-[640px] text-lg md:text-xl leading-relaxed text-muted-foreground"
      >
        A selection of product design work spanning enterprise platforms, healthcare, fintech, and
        consumer products.
      </motion.p>
    </div>
  );
};

const VideoCaseStudiesSection: React.FC = () => {
  return (
    <section id="case-studies" className="relative overflow-hidden bg-background" tabIndex={-1}>
      <SelectedWorkIntro count={caseStudies.length} />

      {/* Each study is its own full-bleed band, so the backgrounds carry the
          scroll rhythm. They sit outside the intro rail on purpose. */}
      {caseStudies.map((study, index) => (
        <CaseStudyFeature key={study.id} project={study} variant={study.variant} index={index} />
      ))}
    </section>
  );
};

export default VideoCaseStudiesSection;
