import React from "react";
import {
  Zap,
  BarChart4,
  XCircle,
  Sparkles,
  Settings,
  Truck,
  Package,
  Users,
  Target,
  CheckCircle2,
  AlertTriangle,
  Rocket,
  Wrench,
  Badge,
  Search,
  Eye,
  TrendingUp,
  Shield,
  TrendingDown,
  DollarSign,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { StructuredCaseStudySectionProps } from "@/components/case-study/structured/StructuredCaseStudySection";

export interface EmergingTheme {
  eyebrow: string;
  insight: string;
  drove: string;
}

export interface ResearchSection {
  subhead: string;
  blurb?: string;
  emergingThemes: EmergingTheme[];
  researchImage?: string;
  researchImageAlt?: string;
  researchImages?: { src: string; alt: string; caption?: string; annotations?: ImageAnnotation[] }[];
  researchVideo?: string;
}

export interface IdeationBubble {
  title: string;
  description: string;
}

export interface ImageAnnotation {
  text: string;
  x: number; // percentage from left
  y: number; // percentage from top
  type?: "issue" | "improvement" | "feature";
}

export interface IdeationIteration {
  label: string;
  imageSrc: string;
  alt: string;
  blurb?: string;
  annotations?: ImageAnnotation[];
}

export interface IdeationSection {
  subhead: string;
  bubbles: IdeationBubble[];
  wireframeImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
  iterations?: IdeationIteration[];
}

export interface ClientTestimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar?: string;
}

export interface ProjectContext {
  timeline: string;
  team: string;
  budget: string;
  companySize: string;
  industry: string;
}

export interface PostLaunchMetrics {
  timeframe: string;
  usage: string;
  retention: string;
  businessImpact: string;
}

export interface TechnicalImplementation {
  challenges: string[];
  solutions: string[];
  accessibility: string[];
  performance: {
    loadTime: string;
    mobileOptimization: string;
    browserSupport: string;
  };
}

export interface TechStack {
  aiTools?: string[];
  devStack?: string[];
  designTools?: string[];
}

export interface StructuredCaseStudyData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  techStack?: TechStack;
  heroVideo?: {
    src: string;
    poster: string;
    alt: string;
  };
  heroImage?: {
    src: string;
    alt: string;
  };
  heroMetrics?: {
    value: string;
    label: string;
  }[];
  // NEW: Business Context & Credibility
  projectContext?: ProjectContext;
  clientTestimonial?: ClientTestimonial;
  postLaunchSection?: {
    title: string;
    description: string;
    eyebrow?: string;
    metrics: PostLaunchMetrics;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
  };
  technicalImplementation?: TechnicalImplementation;
  // EXISTING sections
  researchSection?: ResearchSection;
  problemCallout?: {
    eyebrow: string;
    statement: string;
  };
  sprintZeroSection?: {
    eyebrow: string;
    title: string;
    workshopKickoff: string;
    explorations: string;
    decisionPoint: string;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
      annotations?: ImageAnnotation[];
    }>;
  };
  keyInsights?: {
    number: number;
    title: string;
    description: string;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
  }[];
  keyInsightsVideo?: {
    src: string;
    title: string;
    caption?: string;
  };
  ideationSection?: IdeationSection;
  myThoughtProcessSection?: {
    eyebrow: string;
    title: string;
    content: string;
    video?: {
      src: string;
      title: string;
      caption?: string;
    };
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
      annotations?: ImageAnnotation[];
    }>;
  };
  userTestingSection?: {
    title: string;
    description: string;
    eyebrow?: string;
    video?: {
      src: string;
      title: string;
      caption?: string;
    };
    metrics?: Array<{
      value: string;
      label: string;
    }>;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
  };
  whatDidntWorkSection?: {
    eyebrow: string;
    title: string;
    content: string;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
      annotations?: ImageAnnotation[];
    }>;
  };
  finalProductSection?: {
    title: string;
    description: string;
    eyebrow?: string;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
      annotations?: ImageAnnotation[];
    }>;
    video?: {
      src: string;
      title: string;
      caption?: string;
    };
  };
  outcomeSection?: {
    title: string;
    description: string;
    eyebrow?: string;
    metrics?: Array<{
      value: string;
      label: string;
    }>;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
      annotations?: ImageAnnotation[];
    }>;
  };
  sections: StructuredCaseStudySectionProps[];
  projectLink?: string;
  gradientClasses?: string;
  seoData?: {
    image: string;
    projectName: string;
    results: string[];
    technologies: string[];
    path: string;
  };
}

export const structuredCaseStudies: Record<string, StructuredCaseStudyData> = {
  "barskyjoint": {
    id: `barskyjoint`,
    title: `BarskyJoint`,
    description: `One ordering system that works on a kiosk and a phone, without making either feel like a compromise.`,
    tags: [`Restaurant Tech`, `Food Service`, `Kiosk Design`],
    heroVideo: {
      src: `/lovable-uploads/barskyjoint-hero.mp4`,
      poster: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/barskyjoint/Barsky%20Joint%20Promo.png`,
      alt: `BarskyJoint ordering platform overview`,
    },
    projectLink: `https://barskyjoint.com`,
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `A burger with 14 customizations, all shown at once, freezes people. On a kiosk a line forms behind them. On web they close the tab.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I DID`,
      title: `What I Did`,
      description: `Every item ships with a sensible default. Two taps and you're done — customize inline if you want, no modal, no new screen. Same components on kiosk and web, with tap targets sized for thumbs vs. cursors: one design system, calibrated per device. The order summary stays visible at all times instead of living on a separate cart page.`,
      images: [
        { src: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/barskyjoint/mainpagedesktop.jpg`, alt: `Menu confusion analysis from restaurant ordering interface` },
        { src: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/barskyjoint/journeymap0.jpg`, alt: `Customer journey mapping for restaurant ordering flow` },
        { src: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/barskyjoint/uxpilot-design-1757973264652.png`, alt: `Decision point analysis for ordering platform design` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `Hiccup`,
      content: `First version showed all customization upfront. I thought I was being thorough. Three test sessions in, people were stalling on the toppings screen for a burger they'd already decided on — pulled it back to defaults-plus-expand. Also tried to make the kiosk feel 'modern' with animation. On a kiosk, animation is latency. Cut almost all of it.`,
      images: [
        { src: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/barskyjoint/Barskyjoint800.jpg`, alt: `Failed early restaurant ordering interface design` },
      ],
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `Faster orders and fewer mid-order abandonments in early testing. No post-launch numbers I'd stand behind.`,
    },
    sections: [],
    seoData: {
      image: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/barskyjoint/Barsky%20Joint%20Promo.png`,
      projectName: `BarskyJoint`,
      results: [],
      technologies: [],
      path: `/project/barskyjoint`,
    },
  },
  "crypto": {
    id: `crypto`,
    title: `Trading Without Friction`,
    description: `A crypto trading interface designed for two audiences the industry insists you have to choose between.`,
    tags: [`Fintech`, `Crypto`, `Product Design`, `Dual-Mode UX`],
    heroVideo: {
      src: `/lovable-uploads/crypto-hero.mp4`,
      poster: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/crypto/dashboardmobileanddesktopcrypto.jpg`,
      alt: `Crypto trading platform overview`,
    },
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `'Easy' crypto apps (Coinbase, Cash App) hide complexity and charge premium spreads. 'Pro' apps (Kraken, Binance) expose everything and assume you brought your own confidence. Both audiences get screwed differently. Beginners pay for hidden fees and never graduate. Pros pay for every 'are you sure?' tax built for someone else.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I DID`,
      title: `What I Did`,
      description: `Two modes, one platform, shared core. Beginner mode strips the chart, uses plain English, surfaces explanations next to anything that costs money. Pro mode shows the full order book and zero hand-holding. Mode is a setting, not a separate product — beginners can see Pro exists, pros can flip to Beginner to help a friend without switching accounts. Plain language as a design constraint, not a copy pass: if we couldn't explain something in one sentence, we either explained it inline or cut it from beginner mode. Total cost — including spread — sits next to the action button. Every time. Most-fought decision, one I'd defend hardest.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2025/08/competetive-2.png`, alt: `Competitor analysis exposing beginner exploitation` },
        { src: `https://barskyux.com/wp-content/uploads/2025/09/cryptotrade_site_map_flowchart_better.png`, alt: `User Flow Chart for Crypto App` },
        { src: `https://barskyux.com/wp-content/uploads/2025/09/Initial-Flow-of-screens-scaled.png`, alt: `Initial concepts challenging crypto app conventions` },
        { src: `https://barskyux.com/wp-content/uploads/2025/09/designthinkingupdate.png`, alt: `Design thinking process for crypto platform` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `Hiccup`,
      content: `First version of beginner mode was too protected. Confirmations everywhere, tooltips on every term, an onboarding tour that wouldn't quit. People felt patronized, not safe. Fix: explain on hover, confirm only above a threshold, get out of the way otherwise. Pro mode had the opposite problem — I'd cut so much that some pros couldn't find features they relied on. Density is a feature for that audience, not a bug.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2025/08/Learning.jpg`, alt: `Failed prototype iterations and stakeholder feedback sessions` },
      ],
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `Pros and beginners using the same platform without either feeling like it was built for the other one. That was the goal. — What I Didn't Solve: Intermediate traders fit awkwardly in either mode. A v2 would probably need a third mode or more granular customization.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2025/08/Onboarding-Section.png`, alt: `Finished crypto platform breaking industry conventions` },
      ],
    },
    sections: [],
    seoData: {
      image: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/crypto/dashboardmobileanddesktopcrypto.jpg`,
      projectName: `Trading Without Friction`,
      results: [],
      technologies: [],
      path: `/project/crypto`,
    },
  },
  "dae-search": {
    id: `dae-search`,
    title: `DAE Search`,
    description: `Enterprise search redesigned around the inconvenient truth that finding the data is only half the job — knowing whether to trust it is the rest.`,
    tags: [`Enterprise`, `Data Discovery`, `Search UX`],
    heroImage: {
      src: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae-search/DAE-Project-1.jpg`,
      alt: `DAE Search Platform interface overview`,
    },
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `Analysts search 'revenue,' get 40 results, then spend 20 minutes figuring out which table is the right one. Which is current. Which is the team-of-record's. Which was deprecated three quarters ago but never cleaned up. The job isn't returning results — it's returning the result you can act on.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I DID`,
      title: `What I Did`,
      description: `Semantic search over metadata, not keyword match. Tables called \`arr_monthly\` show up for 'revenue.' Cut results from 40-to-narrow-down to 4-to-pick-from. Data lineage on the result itself, not a click-through — where the data came from, when it last refreshed, what depends on it. The decision is 'can I trust this in front of leadership?' — that needs to be one glance away. Permission state as a first-class signal: restricted results stay visible with a lock and a one-click access request. Hiding them entirely just makes people think the data doesn't exist. Permission-aware auto-complete — built the obvious version first and security flagged it; the suggestion box was leaking the existence of restricted datasets through pattern-matching.`,
      images: [
        { src: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/user%20flow%20process.webp`, alt: `Information architecture analysis of existing data systems` },
        { src: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/drawingouttheplan.webp`, alt: `Initial concepts for enterprise search interface design` },
        { src: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/filterselect0.png`, alt: `Search paradigm exploration and decision framework` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `Hiccup`,
      content: `Started by treating this as consumer search with enterprise wrapper — clean ranked list, minimal chrome. Wrong audience. Enterprise users want context, signals, density. Redesign added the kind of density I'd normally argue against. Also assumed natural-language queries would dominate. They didn't. Analysts type fragments and abbreviations. The 'I know what I want, find it fast' use case mattered more than the conversational one.`,
      images: [
        { src: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/advancedsearch0.jpg`, alt: `Learning from design iterations that didn't meet enterprise needs` },
      ],
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `The shift from 'keyword match over names' to 'semantic match with lineage and permissions inline' reframed the product from a search tool into a data discovery tool. Different category, different success metric. The principle worth taking away: in enterprise contexts, trustworthiness of the result matters more than relevance. Most search UX optimizes for the second.`,
    },
    sections: [],
    seoData: {
      image: `https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae-search/DAE-Project-1.jpg`,
      projectName: `DAE Search`,
      results: [],
      technologies: [],
      path: `/project/dae-search`,
    },
  },
  "herbalink": {
    id: `herbalink`,
    title: `HerbaLink`,
    description: `A booking platform for herbalists, built around the realization that the actual product is trust, not search.`,
    tags: [`Health`, `Marketplace`, `Trust & Safety`],
    heroVideo: {
      src: `https://barskyux.com/wp-content/uploads/2025/07/HerbaLink-Book-A-Herbalist-1.mp4`,
      poster: `https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png`,
      alt: `HerbaLink booking platform overview`,
    },
    projectLink: `http://herbalink.live`,
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `One quote from research stuck: 'I found this herbalist on Instagram who promised to cure my anxiety with a $200 tincture. Turns out she had zero credentials and the herbs made me violently sick.' — Jessica. That's not a search problem. It's a trust and safety problem, and they're the same problem. Build the world's best herbalist directory and someone still finds an unqualified practitioner — I've made things worse.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I DID`,
      title: `What I Did`,
      description: `Verified credentials as a gate, not a badge. Practitioners aren't visible until credentials are checked against the American Herbalists Guild or equivalent. No 'unverified' tier. Smaller catalog, more honest one. Safety info — drug interactions, contraindications — on the booking page, not in an FAQ. If you're booking for a condition where herbs interact with common prescriptions, that warning is unavoidable. Guided matching instead of filters: testing the filter-heavy version was brutal — 'this feels like trying to diagnose myself on WebMD.' Redesigned closer to a triage intake than a search bar. Visible sources on every claim. Users mostly won't click through, but the act of citing keeps the platform honest.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2025/08/AHG-directory-2025-release-animation-1.gif`, alt: `AHG directory — grid of herbal schools` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/findanherbalistsketch.png`, alt: `Initial Concepts & Sketches` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-19-2025-11_19_58-PM.png`, alt: `User Flow Explorations` },
        { src: `https://i0.wp.com/barskyux.com/wp-content/uploads/2025/07/UserFlow.png?fit=1232%2C928&ssl=1`, alt: `HerbaLink user flow from onboarding to booking` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `Hiccup`,
      content: `Original architecture was a giant filterable database. Wrong product. When users say they want more options, they often mean they want more confidence in the option they pick. Adding 200 practitioners made things worse. Also over-designed the symptom tracker as a comprehensive health diary. Users opened it twice and abandoned it. Cut back to 'what changed since last visit?' — that one they use.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2025/07/herbalistdemo-2.png`, alt: `HerbaLink early Book an Herbalist concept` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/Symptom-Trackerupdate-scaled.png`, alt: `User testing session showing booking flow validation` },
      ],
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `Early users described it as feeling more like booking a doctor than browsing a wellness app. That was the shift I was after.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2025/08/macbookpro.png`, alt: `HerbaLink final product desktop interface` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/herbalink-book-an-herbalist-scaled.png`, alt: `HerbaLink final product mobile interface` },
      ],
    },
    sections: [],
    seoData: {
      image: `https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png`,
      projectName: `HerbaLink`,
      results: [],
      technologies: [],
      path: `/project/herbalink`,
    },
  },
  "splittime": {
    id: `splittime`,
    title: `SplitTime`,
    description: `A co-parenting app designed around the fact that every interaction is potential evidence.`,
    tags: [`Family Tech`, `Legal UX`, `Mobile`],
    heroImage: {
      src: `https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1`,
      alt: `SplitTime co-parenting platform overview`,
    },
    projectLink: `https://splittime.pro`,
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `Most co-parenting apps are calendars with chat bolted on. They treat the job as logistics. The hard part isn't logistics — it's that 'are you picking her up at 5 or 5:30?' reads as accusatory when you're already angry, and by message four nobody's talking about pickup anymore.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I DID`,
      title: `What I Did`,
      description: `Structured requests, not open chat. The primary pattern is a clear ask → approve / decline / counter-propose → stamped timestamp. No room for tone, clean record if it ever needs to be one. Templates for the 80% of co-parenting communication that's the same conversation every week — pickup confirmations, expense reimbursements, schedule adjustments — strip the emotional charge out of routine messages. Change history as a first-class feature: every approval, modification, expense — timestamped and immutable. Knowing the record exists changes how people behave. Shared schedule and child profile, both parents can see everything.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2025/08/Dashboard0.jpg`, alt: `Initial Concepts & Sketches` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/wireframing-1.webp`, alt: `User Flow Explorations` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/6.Messages.png`, alt: `Messaging System` },
        { src: `https://barskyux.com/wp-content/uploads/2016/08/ideation_phase_design.png`, alt: `Splittime user satisfaction metrics and communication improvements` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/4.Expenses.png`, alt: `Expenses Tracking` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/5.Documents.png`, alt: `Documents Storage` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/3.calendar.png`, alt: `Calendar View` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/7.ChildProfile.png`, alt: `Child Profile` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `Hiccup`,
      content: `First cut had a free-form messaging feature because it felt cruel not to. Wrong — open messaging is where the conflict lives. Removing it felt counterintuitive until I watched someone visibly relax when I told them there wasn't one. Also tried neutral-language nudges ('did you mean to say...'). Felt patronizing in testing. Templates are the version of that idea that works.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2024/01/Screenshot-2025-05-03-at-10.10.22%E2%80%AFPM-e1748480830908.png`, alt: `Early Splittime interface with feature overload` },
      ],
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `Parents testing it described it as 'the first one that didn't make me feel like I was being managed.' That's the response I was designing for.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2025/08/1.Dashboard.png`, alt: `Splittime Dashboard` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/2.Dashboard-Add.png`, alt: `Dashboard Add Function` },
      ],
    },
    sections: [],
    seoData: {
      image: `https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png`,
      projectName: `SplitTime`,
      results: [],
      technologies: [],
      path: `/project/splittime`,
    },
  },
  "investor-loan-app": {
    id: `investor-loan-app`,
    title: `Investor Loan Platform`,
    description: `Replacing Excel as the system of record for multi-million-dollar loan deals — without anyone losing their workflow.`,
    tags: [`Enterprise`, `FinTech`, `Workflow Design`],
    heroVideo: {
      src: `investor-loan-demo.mp4`,
      poster: `https://barskyux.com/wp-content/uploads/2025/08/analysisdashboard-1.png`,
      alt: `Investor Loan Platform overview`,
    },
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `A bank running loan ops in Excel. Multi-million-dollar deals, no audit trail, no validation. Three previous replacement attempts had failed because they tried to 'improve' things officers didn't want changed.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I DID`,
      title: `What I Did`,
      description: `Inline validation that catches malformed entries the moment they happen. Invisible when right, obvious when wrong. No modals, no error logs. Predictive search instead of filters — loan officers think in fragments, a name, a deal code. Bloomberg-style search beats filter panels for this audience. Guided order builder with disabled forward steps: pick the lender, then terms become editable. Feels restrictive in screenshots, less restrictive in practice. Audit trail surfaced next to the record, not buried in an admin tool. This is the feature that made compliance actually advocate for adoption.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2025/08/excelterror.jpg`, alt: `Excel-based loan tracking spreadsheet with inconsistent fields and manual totals` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/uxpilot-design-1756062303031-scaled.png`, alt: `Collage highlighting legacy manual steps and fragmentation` },
        { src: `https://barskyux.com/wp-content/uploads/2023/12/BookBuilder-Low-Fidelity.png`, alt: `Low-fidelity order builder wireframe for loan workflows` },
        { src: `https://barskyux.com/wp-content/uploads/2023/12/whiteboarding.png`, alt: `Whiteboard mapping of loan lifecycle from application to audit` },
        { src: `/lovable-uploads/6e0291a5-2519-4b89-8402-44a9b8a27cf0.png`, alt: `Investor loan platform user workflow and process improvements` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `Hiccup`,
      content: `First version replicated too much of Excel's structure because I was trying to minimize cognitive change. Worst of both worlds — looked like Excel, didn't behave like it. Rewrite went the other direction: looked nothing like Excel, behaved like what officers actually needed. Also over-invested in dashboards early. Officers don't start their day on a dashboard. They open a specific deal.`,
      images: [
        { src: `/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png`, alt: `User testing session showing loan officer workflow validation` },
      ],
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `Adoption happened — which for an Excel-replacement project is the only outcome that matters. Three previous attempts hadn't gotten that far.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2023/12/My-Deals-list-view.png`, alt: `My Deals list view with quick filters, status chips, and bulk actions` },
        { src: `https://barskyux.com/wp-content/uploads/2023/12/Loan-Deals-1.png`, alt: `Loan deals table with summary sidebar, inline validation, and audit trail` },
        { src: `https://barskyux.com/wp-content/uploads/2023/12/Just-Orderbook.png`, alt: `Orderbook screen emphasizing guided steps and real-time totals` },
      ],
    },
    sections: [],
    seoData: {
      image: `https://barskyux.com/wp-content/uploads/2025/08/analysisdashboard-1.png`,
      projectName: `Investor Loan Platform`,
      results: [],
      technologies: [],
      path: `/project/investor-loan-app`,
    },
  },
  "email-creation-ai": {
    id: `email-creation-ai`,
    title: `ManuscriptRx`,
    description: `A self-initiated concept for AI-assisted pharma HCP email production — designed around the approval gates, not around the AI.`,
    tags: [`Enterprise`, `Gen AI`, `Pharma`, `Workflow Design`],
    heroImage: {
      src: `/images/emailai-screen1-content-planning.png`,
      alt: `Step 1 — Content Planning: 6-step workflow navigator with Brief Creation locked and Initiate Email Creation active`,
    },
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `A regulated pharma email touches a medical writer, content ops, brand, MLR, and CRM. Each handoff is a different tool. Two weeks is fast. The obvious 'dump the manuscript in and ship it' story is wrong because regulated email requires human review at specific gates. Thesis: The AI's job is the work between humans, not the work humans do.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I DID`,
      title: `What I Did`,
      description: `Six-step workflow, each step has a clear owner and a clear gate. Brief Creation locked as 'Outside pilot scope' — the brief exists upstream. Saying that out loud is more useful than pretending I'd designed it. PromoMats integration warning stays visible on screen. Unresolved decisions in the open, not hidden. QC sits inline with editing, not after. AI auto-pass + Content Ops + Med Writer signoff happen while the writer is still in the content. 'Send Preview to Brand Team' doesn't appear until the AI checklist passes. Wrong action not available > warning when you take it. Designed every screen in Figma, then used Claude to write a Markdown spec per screen — purpose, states, role permissions, AI behavior, edge cases. Spec went to dev.`,
      images: [
        { src: `/images/emailai-screen2-assemble.png`, alt: `Step 2 — Assemble From Approved Content: AI-owned manuscript on the left, market-specific compliance content auto-pulled on the right` },
        { src: `/images/emailai-screen3-iterate-qc.png`, alt: `Step 3 — Iterate / Edit + Quality Checks: AI chat with live email preview on top, three role-owned QC cards on the bottom` },
        { src: `/images/emailai-screen6-pre-mlr.png`, alt: `Step 5 — Test Email: HTML generation and metadata checklist on the left, mobile and desktop email previews on the right` },
      ],
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `A point of view: AI handles everything between human decisions, never replaces them. The screens are evidence of that thesis. — What I Haven't Solved: The MLR review experience. I designed the artifacts MLR receives but not the review tool itself — how MLR reviewers annotate, reject, and approve claims with legal accountability. That's the hardest part of pharma email and I'm not going to pretend I solved it in a concept project.`,
    },
    sections: [],
    seoData: {
      image: `/images/emailai-screen1-content-planning.png`,
      projectName: `ManuscriptRx`,
      results: [],
      technologies: [],
      path: `/project/email-creation-ai`,
    },
  },
};

export const getStructuredCaseStudy = (id: string): StructuredCaseStudyData | null => {
  return structuredCaseStudies[id] || null;
};
