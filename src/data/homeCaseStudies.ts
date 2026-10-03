import { CaseStudyVariant } from "@/components/home/CaseStudyFeature";

/**
 * The case studies that have a real page on this site.
 *
 * This list used to exist twice: once for the homepage and once inside
 * SingleCaseStudyPreview, which drives the "Related Case Study" block at the
 * bottom of every case study. The two drifted — the second copy still offered
 * SplitTime, whose /project route 301s to the homepage, so the recommendation
 * at the end of a case study pointed readers off the site. One list now, so a
 * study can only be recommended if it is a study you can actually read.
 */
export interface CaseStudy {
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

export const caseStudies: CaseStudy[] = [
  {
    id: "dae-search",
    tags: ["Enterprise", "Search", "Data Discovery"],
    title: "DAE Search Platform: Making Enterprise Data Actually Findable",
    description: "Redesigned an enterprise search platform that transformed how teams discover and access critical business data. Through semantic search and visual data lineage, we reduced information retrieval time by 65% and delivered measurable ROI.",
    impact: "20% ROI from Better Data Discovery",
    url: "/project/dae-search",
    images: {
      primary: "/images/dae-search/hero-explorer.webp",
      alt: "DAE Digital Asset Explorer: the landing screen beside the dashboard mid-search, showing recommended results"
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
    images: {
      primary: "/images/email-creation-ai/hifi-flow.webp",
      alt: "The EmailAI desktop interface: the create-email screen with tone, length and audience controls, above the supporting screens"
    },
    layout: "side-by-side",
    // One image, not four. The workflow composition put four screens across the
    // band, which is a lot on a laptop and a stack of four on a phone.
    variant: "editorialSplit",
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
      primary: "/images/catchbuddy/phones-three-up.webp",
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
