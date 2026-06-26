import React from "react";
import herbalinkProjectImage from "@/assets/projects/herbalink.png";
import nudgemeProjectImage from "@/assets/projects/nudgeme.png";
import roiDesignCalculatorImage from "@/assets/projects/roidesigncalc.png";
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
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `Analysts search 'revenue,' get 40 results, then spend 20 minutes figuring out which table is the right one. Which is current. Which is the team-of-record's. Which was deprecated three quarters ago but never cleaned up. The job isn't returning results — it's returning the result you can act on.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I DID`,
      title: `What I Did`,
      description: `Semantic search over metadata, not keyword match. Tables called \`arr_monthly\` show up for 'revenue.' Cut results from 40-to-narrow-down to 4-to-pick-from. Data lineage on the result itself, not a click-through — where the data came from, when it last refreshed, what depends on it. The decision is 'can I trust this in front of leadership?' — that needs to be one glance away. Permission state as a first-class signal: restricted results stay visible with a lock and a one-click access request. Hiding them entirely just makes people think the data doesn't exist. Permission-aware auto-complete — built the obvious version first and security flagged it; the suggestion box was leaking the existence of restricted datasets through pattern-matching.`,
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `Hiccup`,
      content: `Started by treating this as consumer search with enterprise wrapper — clean ranked list, minimal chrome. Wrong audience. Enterprise users want context, signals, density. Redesign added the kind of density I'd normally argue against. Also assumed natural-language queries would dominate. They didn't. Analysts type fragments and abbreviations. The 'I know what I want, find it fast' use case mattered more than the conversational one.`,
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `The shift from 'keyword match over names' to 'semantic match with lineage and permissions inline' reframed the product from a search tool into a data discovery tool. Different category, different success metric. The principle worth taking away: in enterprise contexts, trustworthiness of the result matters more than relevance. Most search UX optimizes for the second.`,
    },
    sections: [],
    seoData: {
      image: `/images/default-og-image.jpg`,
      projectName: `DAE Search`,
      results: [],
      technologies: [],
      path: `/project/dae-search`,
    },
  },
  "herbalink": {
    id: `herbalink`,
    title: `HerbaLink`,
    description: `Verified herbalists, designed around trust. A booking platform shipped solo with AI as a co-builder.`,
    tags: [`AI-Assisted Product`, `Healthcare`, `Trust & Safety`, `Solo Build`],
    projectLink: `http://herbalink.live`,
    heroImage: {
      src: `/lovable-uploads/herbalink/hero-phones.png`,
      alt: `HerbaLink mobile screens — landing, herbalist directory, and consultation booking`,
    },
    heroMetrics: [
      { value: `Solo Build`, label: `Designer + AI, end-to-end` },
      { value: `Credentials as a Gate`, label: `Verified against an external registry, not a badge` },
      { value: `Smaller Catalog by Design`, label: `Honest beats exhaustive` },
    ],
    researchSection: {
      subhead: `Talking to users turning to herbalism revealed three problems:`,
      emergingThemes: [
        {
          eyebrow: `DISCOVERY IS A MISINFORMATION FIELD`,
          insight: `Instagram practitioners with no credentials, Google results that mix certified herbalists with weekend-workshop graduates, supplement interactions nobody warns about.`,
          drove: `Drove: a credentialed directory gated by external verification.`,
        },
        {
          eyebrow: `TRUST IS THE PRODUCT, NOT SEARCH`,
          insight: `One user: "I found an herbalist on Instagram who promised to cure my anxiety with a $200 tincture. Turns out she had zero credentials and the herbs made me violently sick."`,
          drove: `Drove: making the safe path the easy path, not warning labels on the unsafe one.`,
        },
        {
          eyebrow: `FILTER-HEAVY UX FEELS LIKE WEBMD`,
          insight: `A user testing the early filter panel: "This feels like trying to diagnose myself on WebMD."`,
          drove: `Drove: replaced filters with a guided triage intake.`,
        },
      ],
      researchImages: [
        {
          src: `/lovable-uploads/herbalink/connecting-herbalists.png`,
          alt: `HerbaLink concept boards — symptom tracker, landing, and wellness services`,
        },
      ],
    },

    problemCallout: {
      eyebrow: `THE REAL PROBLEM`,
      statement: `People turn to herbalism for anxiety, fatigue, and conditions conventional medicine isn't addressing for them — and the discovery experience is a misinformation field. The design job wasn't to build a bigger directory. It was to make the safe path the easy path, in a category where being wrong has real medical consequences.`,
    },
    sprintZeroSection: {
      eyebrow: `SPRINT ZERO`,
      title: `Sprint Zero`,
      workshopKickoff: ``,
      explorations: `Early sketches and flow exploration focused on the credential gate — sitting before any browsing — rather than the directory layout.`,
      decisionPoint: `Build the catalog around external verification first. No practitioner is visible until their credentials are checked against the American Herbalists Guild or equivalent. Smaller catalog, honest one — discovery comes second.`,
    },
    keyInsights: [
      {
        number: 1,
        title: `"Verified" as a gate is a different product than "verified" as a badge.`,
        description: `Most directories let anyone list themselves and slap a badge on profiles that pass a basic check. Inverting that — no practitioner is visible until verified — produces a smaller, more honest catalog. That distinction is the product.`,
      },
      {
        number: 2,
        title: `Users say "more options," they mean "more confidence in the option I pick."`,
        description: `Adding 200 practitioners to the early catalog made the experience worse, not better. The win came from removing anyone whose credentials couldn't be verified — even when the catalog visibly shrank.`,
      },
      {
        number: 3,
        title: `AI can build the directory in a weekend. Deciding who doesn't appear in it is the actual product.`,
        description: `AI handled scaffolding, Supabase schemas, RLS policies, edge functions, the symptom intake structure, and copy variants. The credential model — which certifications matter for which conditions, when to refuse a listing — was every call I made by hand.`,
      },
    ],
    ideationSection: {
      subhead: `Multiple iterations on discovery and intake — each cut backed by observed user behavior.`,
      bubbles: [
        { title: `Heavy filter panel`, description: `Modality, condition, price, location, availability tested as "WebMD." Replaced with guided intake.` },
        { title: `Comprehensive symptom diary`, description: `Mood, sleep, supplements, side effects, energy was opened twice per user and abandoned. Cut to one question: what changed since last visit?` },
        { title: `Yelp-style "Verified" badge`, description: `Scrapped in favor of a gate that controls visibility entirely.` },
      ],
      wireframeImage: {
        src: `https://i0.wp.com/barskyux.com/wp-content/uploads/2025/07/UserFlow.png?fit=1232%2C928&ssl=1`,
        alt: `HerbaLink user flow from onboarding to booking`,
        caption: `Final flow — onboarding feeds a guided intake, not a search bar`,
      },
    },
    myThoughtProcessSection: {
      eyebrow: `APPROACH & DECISION MAKING`,
      title: `My Thought Process`,
      content: `In a category dominated by misinformation, the design job is to make the safe path the easy path. Not to add warning labels to the unsafe path. Every decision was checked against: would this protect a user from the same $200-tincture mistake? That filter killed open-ended search, killed crowdsourced practitioner listings, and inverted "verified" from a badge into a gate.`,
    },
    userTestingSection: {
      eyebrow: `USER TESTING`,
      title: `User Testing`,
      description: `Tested with users actively searching for herbalists, plus a smaller group reviewing the safety and intake flows on real iOS and Android phones. Changes from observation: "This feels like WebMD" → filter panel replaced with guided triage intake. "I want to know what changed since last time" → symptom tracker cut from health diary to a single follow-up question. "Are these people actually qualified?" → credential gate made visible on the profile, not buried in an FAQ.`,
    },
    whatDidntWorkSection: {
      eyebrow: `WHAT DIDN'T WORK`,
      title: `What Didn't Work`,
      content: `The original architecture was a giant filterable database of every herbalist I could find. Wrong product — users didn't want options, they wanted confidence. Reset. The comprehensive symptom diary tried to be a health journal. Users opened it twice and abandoned it. Cut back to one question that they actually use. The "Verified" badge approach was abandoned entirely in favor of the gate model.`,
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `A shipped booking platform where every listed practitioner has externally verified credentials, where intake replaces search, and where the safer path is also the easier one. Credential gate verified against an external registry, not a badge. Guided intake replaces filter panels and reduces WebMD-style anxiety. Honest catalog — smaller by design, with no unverified tier. AI as scaffolder: schema, RLS, intake structure, copy variants; judgment stayed human.`,
    },
    sections: [],
    seoData: {
      image: `/images/default-og-image.jpg`,
      projectName: `HerbaLink`,
      results: [],
      technologies: [],
      path: `/project/herbalink`,
    },
  },

  "nudgeme": {
    id: `nudgeme`,
    title: `NudgeMe`,
    description: `A reminder app that parses plain English into structured schedules. Recurring rules, multi-channel delivery, installable PWA. Built on React + Supabase.`,
    tags: [`PWA`, `Natural Language`, `Reminder UX`, `Solo Build`],
    heroImage: {
      src: nudgemeProjectImage,
      alt: `NudgeMe app showing natural-language reminder input with recurring and one-time reminders`,
    },
    projectLink: `https://nudgeme.rip`,
    problemCallout: {
      eyebrow: `THE REAL PROBLEM`,
      statement: `Every reminder app makes you click through three screens before you can save the thing. By the time you're done, you've forgotten what you wanted to remember. The design job wasn't a prettier form — it was making one sentence the entire input, and trusting the parser enough that the preview screen is the only correction surface a user ever needs.`,
    },
    keyInsights: [
      {
        number: 1,
        title: `Natural-language input over a form.`,
        description: `Chose a single sentence over the calendar-app pattern of date picker + time picker + repeat dropdown because the form is where reminders die. Tradeoff: the parser has to handle real human phrasing — slang, typos, "next tues" — and a visible preview step exists specifically so a misread can be fixed in one tap instead of a re-entry.`,
      },
      {
        number: 2,
        title: `Save first, sign up after.`,
        description: `Chose letting strangers type a reminder before creating an account over the standard auth-wall onboarding because the friction kills the demo. Tradeoff: anonymous draft storage and a quiet account merge on signup, but I get to watch real first-use behavior instead of post-signup behavior.`,
      },
      {
        number: 3,
        title: `Block private data at the input layer.`,
        description: `Chose pattern-matching for passwords, card numbers, and SSNs at parse time over a generic privacy disclaimer because users will type sensitive things into any free-text field eventually. Tradeoff: occasional false positives on legitimate strings, mitigated with a one-tap override.`,
      },
    ],
    finalProductSection: {
      eyebrow: `WHAT I BUILT`,
      title: `What I Built`,
      description: `A one-input reminder flow: type the reminder the way you'd say it out loud, preview what the parser understood, edit anything that's off, then save. The same input supports one-time reminders, recurring schedules, browser notifications, email, SMS, and PWA install behavior without turning the first screen into a settings panel.`,
    },
    myThoughtProcessSection: {
      eyebrow: `AI vs. JUDGMENT`,
      title: `AI vs. Judgment`,
      content: `AI handled the LLM parser, the Supabase schema, the recurrence engine, the multi-channel dispatch, and the PWA install plumbing. What I wouldn't let it decide: when the parser is confident enough to skip the preview step. That's a trust call — get it wrong and silent misreads become missed reminders, which is the one failure mode the product can't survive.`,
    },
    whatDidntWorkSection: {
      eyebrow: `WHAT DIDN'T WORK`,
      title: `What Didn't Work`,
      content: `First version auto-saved on parse with no preview. Sounded clean; produced silent misreads users only caught when the reminder didn't fire. Added the preview step back. Also tried push notifications without a PWA install — iOS Safari kills them. The "Add to Home Screen" step became a real onboarding moment, not a footnote.`,
    },
    outcomeSection: {
      eyebrow: `STATUS`,
      title: `Outcome`,
      description: `Live at nudgeme.rip. The product keeps the first-use loop focused on one sentence, then adds recurring reminders, browser pop-ups, email, text, and calendar sync only after the reminder is understood.`,
    },
    sections: [],
    seoData: {
      image: nudgemeProjectImage,
      projectName: `NudgeMe`,
      results: [],
      technologies: [],
      path: `/project/nudgeme`,
    },
  },

  "roi-design-builder": {
    id: `roi-design-builder`,
    title: `ROI Design Calculator`,
    description: `A calculator that translates design decisions into dollars. Built for designers talking to finance, not designers talking to designers.`,
    tags: [`Financial Modeling`, `Enterprise Tool`, `Design Strategy`, `Shipped`],
    heroImage: {
      src: roiDesignCalculatorImage,
      alt: `ROI Design Calculator interface showing business value and payback outputs`,
    },
    projectLink: `https://roicalc.one/`,
    problemCallout: {
      eyebrow: `THE REAL PROBLEM`,
      statement: `Designers lose budget conversations because they speak in craft and stakeholders speak in money. The brief was a tool that translates. The hard part isn't the math — it's knowing which numbers stakeholders actually trust. Industry benchmarks get challenged immediately unless they're citable. That's the core design problem this tool is solving.`,
    },
    keyInsights: [
      {
        number: 1,
        title: `The output had to sound like finance, not design.`,
        description: `The tool translates UX changes into revenue, savings, payback period, and total business value because those are the units stakeholders already use to make funding decisions.`,
      },
      {
        number: 2,
        title: `Benchmarks needed to be defensible by vertical.`,
        description: `Generic industry numbers get challenged fast. I chose industry-template benchmarks over blank inputs because a model only works in the room if the assumptions can be explained and cited.`,
      },
      {
        number: 3,
        title: `The report matters as much as the calculator.`,
        description: `A designer needs to walk into the budget conversation with a board-ready model, not a screenshot of a form. The workflow ends in an argument stakeholders can read, question, and reuse.`,
      },
    ],
    finalProductSection: {
      eyebrow: `WHAT I BUILT`,
      title: `What I Built`,
      description: `A financial modeling tool that turns design improvements into business cases: revenue upside, operational savings, implementation cost, payback period, and ROI. The interaction is structured around assumptions because the credibility of the model depends on showing where every number came from.`,
    },
    whatDidntWorkSection: {
      eyebrow: `WHAT I HAVEN'T SOLVED`,
      title: `What I Haven't Solved`,
      content: `The benchmark data problem is real. Generic stats get dismissed. The tool only works if the numbers are defensible. That tension is partially solved — not fully.`,
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `The calculator gives designers a defensible financial model for budget conversations: not "design is valuable," but what value, where it comes from, what it costs, and how quickly it pays back.`,
    },
    sections: [],
    seoData: {
      image: roiDesignCalculatorImage,
      projectName: `ROI Design Calculator`,
      results: [],
      technologies: [],
      path: `/project/roi-design-builder`,
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
  "fire-lion": {
    id: `fire-lion`,
    title: `Fire Lion`,
    description: `A shipped game, built solo with AI. A one-tap arcade runner where you spell words mid-flight to cast spells.`,
    tags: [`AI-Assisted Product`, `Game Design`, `Mobile Web`, `Solo Build`],
    heroVideo: {
      src: `/lovable-uploads/fire-lion-hero.mp4`,
      poster: `/images/firelion-hero-title.png`,
      alt: `Fire Lion gameplay overview`,
    },
    projectLink: `https://firelion.me`,
    heroMetrics: [
      { value: `Solo Build`, label: `One designer, AI as co-builder` },
      { value: `Daily Playtests`, label: `Self + friends, real phones` },
      { value: `6 Systems Cut`, label: `After watching real users` },
    ],
    researchSection: {
      subhead: `Watching real players on real phones surfaced three patterns:`,
      emergingThemes: [
        {
          eyebrow: `FEATURE BLOAT KILLS FUN`,
          insight: `Daily missions, streaks, daily-word challenges, social proof counters — all added, all ignored.`,
          drove: `Drove: a ruthless deletion list and a single-mode core loop.`,
        },
        {
          eyebrow: `GAME FEEL CAN'T BE PROMPTED`,
          insight: `AI shipped collision math and particle systems in minutes. The lion still felt like a balloon for 30 iterations.`,
          drove: `Drove: hand-tuned gravity, tap impulse, and scroll curves over hundreds of test runs.`,
        },
        {
          eyebrow: `PLAYERS WANT SURPRISE, NOT SHOPPING`,
          insight: `Forge upgrade screens and pre-run skill trees tested badly. People wanted to play.`,
          drove: `Drove: removed every pre-run friction point. Tap FLY is the only path in.`,
        },
      ],
      researchImage: `/images/firelion-gameplay-lavagod.png`,
      researchImageAlt: `Main runner gameplay, Lava God form, Wave 5, invincibility power-up`,
    },
    problemCallout: {
      eyebrow: `THE REAL PROBLEM`,
      statement: `Most "I built X with AI" portfolios are a calculator, a to-do app, a productized audit. Safe. Forgettable. The harder question — can a designer ship a real product solo with AI? — needed a harder answer. A game. Game feel can't be faked with a prompt.`,
    },
    sprintZeroSection: {
      eyebrow: `SPRINT ZERO`,
      title: `Sprint Zero`,
      workshopKickoff: ``,
      explorations: `The spelling mechanic — words cast spells — was only added after the tap-to-fly felt right. Every later system (combos, bosses, modes) was layered on top of a verified core loop.`,
      decisionPoint: `Build the smallest possible playable loop first — one tap, one lion, no words, no worlds, no audio — and only add a mechanic after the core gesture feels good.`,
      images: [
        { src: `/images/firelion-spelling-lightning.png`, alt: `Lightning Strike spell casting from spelling MN` },
        { src: `/images/firelion-spelling-combo.png`, alt: `Spelling CRAP over a lava forge anvil, 5× combo` },
      ],
    },
    keyInsights: [
      {
        number: 1,
        title: `Building features is easy with AI. Killing features is the actual design work.`,
        description: `AI happily shipped daily missions, streaks, a forge upgrade screen, mod gating, and three premium fighter modes. Users used none of them. The deletion list ended up longer than the feature list — and the game got better with every removal.`,
      },
      {
        number: 2,
        title: `AI handles the work between human decisions. It doesn't replace them.`,
        description: `AI scaffolded Supabase schemas, Tailwind tokens, particle systems, and refactors across 30+ files at a time. Every gravity tweak, tap impulse, and difficulty threshold was still mine — hand-tuned by feel over hundreds of test runs.`,
      },
      {
        number: 3,
        title: `Three modes serve three moods. Isolation is the design rule that makes it work.`,
        description: `Fire Lion (tense, escalating), Lion Wars (strategic), Cub Mode (low-stakes recovery). Cub Mode lives in its own component with its own audio and state — enforced in the AI memory file so even at 2am, six prompts deep, the rule holds.`,
      },
    ],
    ideationSection: {
      subhead: `Multiple iterations on the core loop — kept only what made players want one more run.`,
      bubbles: [
        { title: `Tap-to-fly tuning`, description: `Tuned across ~30 iterations before it stopped feeling floaty.` },
        { title: `Slow-start ramp`, description: `Added to ease beginners — players thought the game was broken. Cut entirely.` },
        { title: `Boss fights rebuilt`, description: `From damage-sponge to telegraphed attacks with 3-second cinematic intros.` },
      ],
      wireframeImage: {
        src: `/images/firelion-lionwars-combat.png`,
        alt: `Lion Wars naval combat, wave 1 of 7, lava cavern backdrop`,
        caption: `Lion Wars — built as a between-worlds mode, then pulled because it broke flow`,
      },
    },
    myThoughtProcessSection: {
      eyebrow: `APPROACH & DECISION MAKING`,
      title: `My Thought Process`,
      content: `The whole project was held together by one question, asked over every feature: does this make the player want one more run? If yes, keep. If no — even if AI built it in minutes, even if it tested fine in isolation — cut. That filter is what separates a tech demo from a game, and it's the part AI can't do.`,
    },
    userTestingSection: {
      eyebrow: `USER TESTING`,
      title: `User Testing`,
      description: `Tested with friends and family on real iOS and Android phones, plus daily self-playtests (minimum 10 runs per day). Qualitative changes that shipped from feedback: "Why is the first board always the same boss?" → randomized world order per run. "I can never revive." → full rewrite of revive UI and availability logic. "The lion flies too slowly at the start." → killed the slow-start mechanic. "It's stupid I can't move left and right in Cub Mode." → added horizontal movement.`,
      images: [
        { src: `/images/firelion-cubmode-sunset.png`, alt: `Cub Mode sunset scene — kept isolated from the main game so refactors never break it` },
        { src: `/images/firelion-cubmode-ocean.png`, alt: `Cub Mode ocean scene — same isolation rule: separate component, separate audio, separate state` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `WHAT DIDN'T WORK`,
      title: `What Didn't Work`,
      content: `The first version had daily missions, a streak system, a daily Wordle-style challenge, a legacy cumulative score, a social proof counter, a forge pre-run upgrade screen, and mod gating behind a "Lava Rank" tier. All shipped fast thanks to AI. All ignored by players. All removed. Lion Wars originally triggered between worlds in the runner. Players hated being yanked out of flow. The trigger was removed; the code stays in the codebase for a Phase 2 integration directly into the main runner.`,
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `A shipped game with three modes, real retention loops, a deletion list longer than its feature list, and a clear thesis: AI can scaffold a game in a week, but deciding which 80% to throw away is the year of design work that makes it playable. Three modes — Fire Lion, Lion Wars, Cub Mode. Solo design end-to-end — UI, mechanics, economy, audio, art direction. Ruthless deletion discipline — every cut backed by observed player behavior. Reusable AI memory file keeps the next session in perfect context.`,
    },
    sections: [],
    seoData: {
      image: `/images/firelion-hero-title.png`,
      projectName: `Fire Lion`,
      results: [],
      technologies: [],
      path: `/project/fire-lion`,
    },
  },
  "ring-rival": {
    id: `ring-rival`,
    title: `Ring-Rival`,
    description: `Console boxing feel on the mobile web. Distinct AI opponents, AI-generated trash talk, career mode — built solo with AI as a co-builder.`,
    tags: [`AI-Assisted Product`, `Mobile Web`, `Game Design`, `Solo Build`],
    heroVideo: {
      src: `/lovable-uploads/ring-rival-hero.mp4`,
      poster: `/images/ringrival-hero-title.png`,
      alt: `Ring-Rival mobile boxing gameplay`,
    },
    projectLink: `https://rival.li`,
    heroMetrics: [
      { value: `Solo Build`, label: `Designer + AI, no team` },
      { value: `22s → 6s`, label: `Time to first punch after testing` },
      { value: `~40% → <2%`, label: `Audio failure rate after the first-tap gate` },
    ],
    researchSection: {
      subhead: `Observing real players on real phones revealed three problems:`,
      emergingThemes: [
        {
          eyebrow: `STATIC TUTORIALS DON'T WORK`,
          insight: `A 4-step calibration wizard, a daily challenges modal, and a how-to page all tested poorly. Six of six testers skipped the how-to before their first fight.`,
          drove: `Drove: if the first fight doesn't teach the controls in 10 seconds, no screen will.`,
        },
        {
          eyebrow: `MOBILE AUDIO IS UNRELIABLE BY DEFAULT`,
          insight: `iOS Safari kills audio that isn't triggered by user gesture. ~40% of first sessions launched silent.`,
          drove: `Drove: AudioContext resume gated behind the first tap on the title screen.`,
        },
        {
          eyebrow: `AI OPPONENTS NEED RHYTHM, NOT TIMERS`,
          insight: `Early opponents threw punches at fixed intervals. Felt like fighting a metronome.`,
          drove: `Drove: an EmotionEngine where opponents bait, hesitate, and tilt based on how the player is doing.`,
        },
      ],
      researchImage: `/images/ringrival-glassjoe-idle.png`,
      researchImageAlt: `Glass Joe idle stance — started with one opponent, two buttons, a health bar before adding anything else`,
    },
    problemCallout: {
      eyebrow: `THE REAL PROBLEM`,
      statement: `Boxing games live on consoles for a reason — tight input latency, animation feel, and AI that reads like a real opponent. Doing all of that with a thumb on a phone, in a browser, no install, was the constraint that made the project worth building. The design question wasn't "can we ship a boxer," it was "can we ship one that feels right."`,
    },
    sprintZeroSection: {
      eyebrow: `SPRINT ZERO`,
      title: `Sprint Zero`,
      workshopKickoff: ``,
      explorations: `Five-second control briefing before each fight — readable in 10 seconds, dismissible. Each fighter has a distinct silhouette and personality, generated via Gemini image preview — voice without writing a dialogue tree.`,
      decisionPoint: `Verify game feel on a single archetype (Glass Joe) before generating any other fighters. If a punch doesn't feel good against the easiest opponent, no amount of AI sprite generation will save the project.`,
      images: [
        { src: `/images/ringrival-controls-modal.png`, alt: `VS Glass Joe controls modal with input scheme` },
        { src: `/images/ringrival-vonkaiser.png`, alt: `Von Kaiser — tall, broad, defensive guard` },
      ],
    },
    keyInsights: [
      {
        number: 1,
        title: `AI generates fighters endlessly. Sequencing them is design.`,
        description: `Sprite generation, trash talk, announcer intros, and crowd mood all came from AI prompts. Deciding the career order — Glass Joe → Von Kaiser → Bald Bull → … → the final boss — is a difficulty curve, hand-built across hundreds of test fights.`,
      },
      {
        number: 2,
        title: `Game feel is the part you can't prompt.`,
        description: `Hit-stop duration, screen shake amplitude, the 60ms haptic on connect, the curve of the health bar drain — all hand-tuned by feel. No model knows whether a punch feels like a punch.`,
      },
      {
        number: 3,
        title: `Mobile ergonomics are decided by watching a real hand on a real phone.`,
        description: `Where the punch button lives, how big the block zone is, whether the music toggle belongs top-right or in a menu — every one of these was settled by handing a phone to someone and watching them play.`,
      },
    ],
    ideationSection: {
      subhead: `Multiple iterations on core systems — every cut backed by observation, not opinion.`,
      bubbles: [
        { title: `Sprite scaling`, description: `Rebuilt three times before per-archetype mobileScaleBoost multipliers worked across body types.` },
        { title: `Particle effects`, description: `Throttled to 15% of frames after Bald Bull's signature charge created an unreadable dust cloud on mobile.` },
        { title: `AI opponent rhythm`, description: `Rewritten from fixed-interval punches to the EmotionEngine — bait, hesitate, tilt.` },
      ],
      wireframeImage: {
        src: `/images/ringrival-knockdown.png`,
        alt: `Knockdown — DOWN! 5 count with star burst over floored Glass Joe`,
        caption: `Hit-stop, star burst, count timing — all hand-tuned by feel`,
      },
    },
    myThoughtProcessSection: {
      eyebrow: `APPROACH & DECISION MAKING`,
      title: `My Thought Process`,
      content: `The whole game is a series of small calibration calls that AI can't make: is this punch satisfying, is this opponent fun to fight, is this control discoverable. AI's job was to generate raw material — sprites, voice lines, schemas, refactors — at a speed that made hundreds of micro-iterations possible. My job was to be the taste filter on every output.`,
    },
    userTestingSection: {
      eyebrow: `USER TESTING`,
      title: `User Testing`,
      description: `Tested in person and remotely on iOS and Android phones, ages 14–47, with screen and face recording. Key changes from observation: time-to-first-punch dropped from 22s to 6s by cutting menus and tutorial screens. Audio failure rate dropped from ~40% to under 2% by gating AudioContext resume behind the first tap. Webcam hand-tracking and AR mode were cut — half the testers refused the camera prompt and bounced.`,
      images: [
        { src: `/images/ringrival-impact-particles.png`, alt: `Glass Joe getting hit — red impact particles dialed back so fighter stays visible` },
        { src: `/images/ringrival-pause-modal.png`, alt: `Pause modal mid-fight vs. Disco Dan — Resume / Music Off / Forfeit reachable without breaking flow` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `WHAT DIDN'T WORK`,
      title: `What Didn't Work`,
      content: `The original calibration wizard, daily challenges modal, and how-to page were all built and all ignored. Cut. Webcam-based hand-tracking was technically impressive and the wrong mechanic for the audience. Removed entirely, along with all AR-mode references in SEO and the menu. Multiplayer and leaderboards exist as components but are gated. Shipping them requires moderation I didn't want to own in v1.`,
      images: [
        { src: `/images/ringrival-discodan.png`, alt: `Disco Dan — completely different silhouette and personality from Glass Joe` },
      ],
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `A shipped boxing game with distinct AI opponents, generated trash talk, hand-tuned game feel, and a deployment cadence of 3–6 builds a day. Real users, real cuts, real opponents. Distinct opponents — each with their own silhouette, voice, and rhythm. AI as content engine — sprites, trash talk, intros, crowd reactions. Designer as taste filter — every output checked against "does this feel good." Iteration cadence: ship → watch a session → fix the loudest thing → reship.`,
    },
    sections: [],
    seoData: {
      image: `/images/ringrival-hero-title.png`,
      projectName: `Ring-Rival`,
      results: [],
      technologies: [],
      path: `/project/ring-rival`,
    },
  },
  "catchbuddy": {
    id: `catchbuddy`,
    title: `CatchBuddy`,
    description: `Same-day pickup sports, designed for trust. Post a game, see open games, confirm in a few taps. Built solo with AI as a co-builder.`,
    tags: [`AI-Assisted Product`, `Trust & Safety`, `Mobile-First`, `Solo Build`],
    heroVideo: {
      src: `/lovable-uploads/catchbuddy-hero.mp4`,
      poster: `/images/catchbuddy-hero-landing.png`,
      alt: `CatchBuddy pickup sports app overview`,
    },
    projectLink: `https://catchbuddy.me`,
    heroMetrics: [
      { value: `Solo Build`, label: `Designer + AI, end-to-end` },
      { value: `Safety-First Architecture`, label: `Minor approval, panic button, curated meeting spots` },
      { value: `Real Stack Shipped`, label: `Auth, RLS, OAuth, Stripe, Realtime` },
    ],
    researchSection: {
      subhead: `Observing pickup-sports culture and existing apps surfaced three friction points:`,
      emergingThemes: [
        {
          eyebrow: `LEAGUE-FOCUSED APPS DON'T SERVE CASUAL PLAY`,
          insight: `Existing platforms assume commitment, schedules, recurring teams. Most people want one game this weekend, not a season.`,
          drove: `Drove: a single-action "post a catch request" as the entire product.`,
        },
        {
          eyebrow: `TRUST IS THE REAL UNLOCK, NOT MATCHING`,
          insight: `Two strangers meeting at a park requires a different safety model than dating apps or marketplaces.`,
          drove: `Drove: phone verification, panic button, curated meeting spots, minor approval flow — built in from v1.`,
        },
        {
          eyebrow: `"MATCHES" READS AS DATING`,
          insight: `Early testers consistently misread the nav.`,
          drove: `Drove: rewrote navigation as "Browse" and "Players" instead of "Matches."`,
        },
      ],
      researchImage: `/images/catchbuddy-signin.png`,
      researchImageAlt: `Sign-in screen with the CatchBuddy brand — first trust signal before anything is asked`,
    },
    problemCallout: {
      eyebrow: `THE REAL PROBLEM`,
      statement: `Pickup sports are dying in cities. Existing apps are league-focused or chat-heavy. Nobody wants a Slack thread to throw a baseball after work. The real product wasn't another scheduling tool — it was a way to lower the friction and the safety risk of two strangers agreeing to meet at a park.`,
    },
    sprintZeroSection: {
      eyebrow: `SPRINT ZERO`,
      title: `Sprint Zero`,
      workshopKickoff: ``,
      explorations: `Step 1 — pick a sport. Five options, no menu, no friction. Step 2 — pick a park: curated venues only; no arbitrary GPS pins. Step 3 — equipment + preferences: small signals that cut down on missed expectations.`,
      decisionPoint: `Ship the minimum viable trust loop — post a game, see games, confirm a match — and only then layer in the safety scaffolding (phone verification, panic button, minor approval). No discovery without trust signals in place.`,
      images: [
        { src: `/images/catchbuddy-post-game.png`, alt: `Post Your Game — sport picker with Football, Basketball, Baseball, Volleyball, Frisbee` },
        { src: `/images/catchbuddy-choose-park.png`, alt: `Choose a Park — searchable list with distance and amenities` },
      ],
    },
    keyInsights: [
      {
        number: 1,
        title: `Safety can't be a bolt-on. It's the product.`,
        description: `Minors require a verified parent on file before they can post. The panic button reaches every in-game screen. Public meeting spots are curated, not crowdsourced. None of that comes from a prompt — those are product calls about who's actually going to use this and what could go wrong.`,
      },
      {
        number: 2,
        title: `AI scaffolds the schema. It doesn't decide who's allowed to post.`,
        description: `AI shipped the RLS policies, the profiles_public view, the Supabase migrations, the Stripe integration, the OAuth flow. The trust model — who gets in, who's gated, what's surfaced — was every decision I made by hand.`,
      },
      {
        number: 3,
        title: `Real reviews surface things AI misses.`,
        description: `AI's own security code review caught a recursive RLS policy on the profiles table that would have leaked data in production. Used the AI as a second pair of eyes, not as the only set.`,
      },
    ],
    ideationSection: {
      subhead: `Multiple iterations on onboarding and flow — every cut backed by observed friction.`,
      bubbles: [
        { title: `"Quick Start" wizard`, description: `Built, then cut — users skipped it every time.` },
        { title: `Homepage MapSection`, description: `Looked great in screenshots and confused first-time visitors. Cut.` },
        { title: `iOS geolocation flow`, description: `Rebuilt with a city-dropdown fallback after half of testers denied location.` },
      ],
      wireframeImage: {
        src: `/images/catchbuddy-equipment-prefs.png`,
        alt: `Equipment and preferences — "I'll bring a football," no-contact toggle`,
        caption: `Step 3 — equipment + preferences. Small signals that cut down on missed expectations`,
      },
    },
    myThoughtProcessSection: {
      eyebrow: `APPROACH & DECISION MAKING`,
      title: `My Thought Process`,
      content: `The product had to be honest about who was using it. Two strangers, a park, a real game on a real day. Every design decision was checked against: would I let my 16-year-old cousin sign up for this? That filter killed open-ended chat, killed crowdsourced meeting spots, and gated everything for minors behind a verified parent.`,
    },
    userTestingSection: {
      eyebrow: `USER TESTING`,
      title: `User Testing`,
      description: `Tested with friends, family, and parents reviewing the minor-approval flow on real iOS and Android phones. Changes from observation: "Matches" → "Browse" and "Players" — users read "Matches" as Tinder-like. Toast stacking — auto-dismiss after 3 seconds. Bottom nav layout shift — fixed to grid-cols-5 to prevent jumps when badges appear. Calendar OAuth state — rewrote with HMAC-SHA256 signing after CSRF vulnerability was caught. Demo data leakage — separated demo matches into their own query path with a Demo badge.`,
      images: [
        { src: `/images/catchbuddy-find-players.png`, alt: `Find Players list with 92% and 81% match scores — proximity + time heuristic surfaced as percentages users instantly understand` },
        { src: `/images/catchbuddy-signup-minor-gate.png`, alt: `Sign-up form with the 13+ age gate — first checkpoint in the minor-protection flow` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `WHAT DIDN'T WORK`,
      title: `What Didn't Work`,
      content: `The Quick Start wizard was over-engineered onboarding. Users wanted to skip it. Cut. The homepage MapSection promised value the first interaction couldn't deliver. Cut. Apple Calendar, Outlook, and ICS support were built. Three calendar providers turned out to be a maintenance tax for a feature users barely cared about. Google-only now.`,
      images: [
        { src: `/images/catchbuddy-game-live.png`, alt: `Confirmation — "Your Game is Live!" with nearby player count, not a vanity counter` },
      ],
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `A shipped pickup-sports platform with auth, RLS, Stripe payments, Google Calendar OAuth, realtime updates, a minor-approval flow, and curated meeting spots — designed and built solo with AI as a co-builder. Trust-first architecture: safety scaffolding built in from v1, not bolted on. Real stack: auth, RLS, OAuth, Stripe, Realtime, all shipped. User-driven cuts: every removed feature backed by observed friction. AI as collaborator: schema scaffolding, security review, copy drafts, edge functions.`,
      images: [
        { src: `/images/catchbuddy-pro-pricing.png`, alt: `Pro pricing — $7.99/mo or $59.99/yr, added after the safety and matching loop was stable` },
      ],
    },
    sections: [],
    seoData: {
      image: `/images/catchbuddy-hero-landing.png`,
      projectName: `CatchBuddy`,
      results: [],
      technologies: [],
      path: `/project/catchbuddy`,
    },
  },
};


export const getStructuredCaseStudy = (id: string): StructuredCaseStudyData | null => {
  return structuredCaseStudies[id] || null;
};
