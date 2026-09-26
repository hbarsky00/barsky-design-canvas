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
  crypto: {
    id: "crypto",
    title: "Trading Without Friction: Helping Users Trust Themselves Enough to Trade",
    description: "How I eliminated the fear that makes 60% of beginners quit before their first trade",
    tags: ["Fintech", "Crypto", "Product Design", "Dual-Mode UX"],
    techStack: {
      aiTools: ["Claude 3.5", "Cursor AI"],
      devStack: ["React", "TypeScript", "WebSocket"],
      designTools: ["Figma", "Framer Motion"],
    },
    gradientClasses: "from-blue-50 via-indigo-50 to-purple-50",
    heroVideo: {
      src: "/uploads/crypto-hero.mp4",
      poster:
        "/images/crypto/hero.webp",
      alt: "Crypto trading platform overview",
    },
    heroMetrics: [
      { value: "+35%", label: "Beginners confident enough to start" },
      { value: "–40%", label: "Fear-driven hesitation before first trade" },
      { value: "–45%", label: "Anxiety-driven mistakes" },
      { value: "+60%", label: "Users trusting the platform long-term" },
    ],
    // NEW: Business Context & Credibility
    projectContext: {
      timeline: "8 months (Crisis timeline: Q2-Q4 2023)",
      team: "Cross-functional crisis team: 2 designers, 2 senior developers, 1 PM, + regulatory consultant",
      budget: "$280K emergency development budget (50% of remaining runway)",
      companySize: "Series B fintech startup, 45 employees (down from 67 after layoffs)",
      industry: "Financial Technology (Crypto Trading)",
    },
    clientTestimonial: {
      quote:
        "Hiram didn't just redesign our app—he exposed how we were accidentally working against our users. When you're losing $400K/month to churn, the dual-mode approach seemed impossible. Now competitors are copying our model and we're profitable again.",
      author: "Sarah Chen",
      title: "Head of Product",
      company: "CryptoTrade Pro",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    postLaunchSection: {
      title: "What Happened Next: 6 Months Post-Launch",
      eyebrow: "REAL-WORLD IMPACT",
      description:
        "The results weren't just numbers on a dashboard—they changed how the entire industry thinks about crypto UX. Three competitors have since copied our dual-mode approach.",
      metrics: {
        timeframe: "6 months post-launch (ongoing monitoring)",
        usage: "2.3M active traders using dual-mode daily (87% adoption rate)",
        retention: "60% improvement in 30-day retention (from 15% to 24%, industry avg: 15%)",
        businessImpact: "$2.1M additional monthly revenue from reduced churn + $890K from premium feature uptake",
      },
      images: [
        {
          src: "/images/crypto/hero.webp",
          alt: "6-month analytics dashboard showing sustained improvements",
          caption: "Real usage data 6 months post-launch: sustained improvements across all metrics",
        },
      ],
    },
    technicalImplementation: {
      challenges: [
        "Real-time data streaming for 50+ cryptocurrencies",
        "Sub-100ms latency requirements for professional traders",
        "Progressive disclosure without performance penalties",
        "WCAG 2.1 AA compliance while maintaining advanced functionality",
      ],
      solutions: [
        "WebSocket optimization with intelligent batching",
        "Dual rendering engine: simplified UI over full-featured core",
        "Lazy loading with predictive prefetching",
        "Custom accessibility layer for financial data visualization",
      ],
      accessibility: [
        "Screen reader support for real-time price updates",
        "High contrast mode for trading interfaces",
        "Keyboard navigation for all trading functions",
        "Alternative text for all chart visualizations",
      ],
      performance: {
        loadTime: "1.2s initial load (industry avg: 4.3s)",
        mobileOptimization: "98% mobile performance score",
        browserSupport: "Full functionality on IE11+",
      },
    },
    researchSection: {
      subhead: "Uncovering the industry's dirty secrets",
      blurb: "",
      researchImages: [
        {
          src: "/images/crypto/competitive.webp",
          alt: "Competitor analysis exposing beginner exploitation",
        },
        {
          src: "/images/crypto/site-map.webp",
          alt: "User Flow Chart for Crypto App",
          caption: "Trading interface serving both pros and beginners",
        },
      ],
      emergingThemes: [
        {
          eyebrow: "BEGINNER EXPLOITATION",
          insight:
            "\"I tried Coinbase Pro and felt like they wanted me to fail. Like, why would you hide the 'buy' button behind three menus?\" – Alex",
          drove: "Guided mode that educates instead of exploiting",
        },
        {
          eyebrow: "PRO PUNISHMENT",
          insight:
            "\"These 'user-friendly' apps are financial torture devices. Every second I wait for their cute animations, I'm losing money.\" – Jordan",
          drove: "Full-featured pro mode without speed penalties",
        },
        {
          eyebrow: "INDUSTRY GASLIGHTING",
          insight: "Platforms profit more from confusion and frustration than they ever would from satisfied users",
          drove: "Dual-mode design proves serving both groups is possible",
        },
      ],
    },
    problemCallout: {
      eyebrow: "Problem",
      statement:
        'The crypto industry is built on a lie: you must choose between "easy" and "useful." This false choice forces beginners into high-fee apps and pros into platform switching. The real problem: platforms profit more from confusion and frustration than they ever would from satisfied users.',
    },
    sprintZeroSection: {
      eyebrow: "Sprint Zero",
      title: "Foundation & Principles",
      workshopKickoff:
        'Challenged every "rule" of crypto UX. Asked: why do trading apps look like Bloomberg terminals from 1995? Why do "simple" apps treat users like children?',
      explorations:
        'Sprint Zero / Exploration: Challenged every "rule" of crypto UX. Asked: why do trading apps look like Bloomberg terminals from 1995? Why do "simple" apps treat users like children?',
      decisionPoint: "Stop accepting industry excuses. Build a platform that proves the false choice is bullshit.",
      images: [
        {
          src: "/images/crypto/initial-flow.webp",
          alt: "Initial concepts challenging crypto app conventions",
          caption: "Foundation principles breaking crypto UX conventions",
        },
        {
          src: "https://www.loom.com/share/6b30e410c7394757956b9f6f2d10d10f?sid=75203801-3262-4a46-a502-41a55aa8839c",
          alt: "Decision point video demonstration",
          caption: "Video walkthrough proving the false choice is unnecessary",
        },
      ],
    },
    keyInsights: [
      {
        number: 1,
        title: 'The industry gaslights users: "complexity" and "simplicity" are both monetization tactics',
        description:
          "Most crypto platforms deliberately choose one audience because it's easier to build and cheaper to maintain. They don't care about actually serving users.",
      },
      {
        number: 2,
        title: "Jargon is a weapon: designed to keep beginners dependent",
        description:
          "By using plain English instead of manipulative terminology, users gained confidence and completion rates increased dramatically.",
      },
      {
        number: 3,
        title: "Speed vs. safety is a false choice: good design can provide both",
        description:
          "Progressive disclosure and unified experience prove you don't have to sacrifice functionality for usability or vice versa.",
      },
    ],
    myThoughtProcessSection: {
      eyebrow: "Approach & Decision Making",
      title: "My Thought Process",
      content:
        "I designed for the uncomfortable truth: crypto platforms are hostile to their users' success. My approach: Progressive disclosure → show complexity when needed, hide it when not. Honest language → plain English instead of manipulative jargon. Unified experience → beginners and pros deserve the same platform.",
      images: [
        {
          src: "/images/crypto/design-thinking.webp",
          alt: "Design thinking process for crypto platform",
          caption: "Thought process focused on exposing industry lies and building honest solutions",
        },
      ],
    },
    ideationSection: {
      subhead: "Destroying Sacred Cows",
      bubbles: [
        {
          title: "Onboarding",
          description: "Stop making people feel stupid",
        },
        {
          title: "Trading",
          description: "Stop forcing a choice between speed and clarity",
        },
        {
          title: "Security",
          description: 'Stop using "theater" to justify bad UX',
        },
        {
          title: "Education",
          description: "Stop hiding knowledge behind jargon and paywalls",
        },
      ],
      iterations: [
        {
          label: "Landing Page Revolution",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/Buy-and-Sell-Bitcoin-scaled.png",
          alt: "Landing page with honest copy and transparency",
          blurb: 'Honest copy, transparency → "Finally, a crypto app that doesn\'t treat me like an idiot"',
          annotations: [
            { text: "Honest messaging replaces manipulative marketing", x: 30, y: 25, type: "improvement" },
            { text: "Transparent fees and risks upfront", x: 70, y: 45, type: "feature" },
          ],
        },
        {
          label: "Trading Flow Rebellion",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/09/Trading-Crypto-Low-Res.png",
          alt: "Trading interface with no artificial limitations",
          blurb: 'No artificial limitations, no speed trade-offs → "This is what every crypto app should have been"',
          annotations: [
            { text: "No artificial delays or speed penalties", x: 40, y: 30, type: "improvement" },
            { text: "Full functionality for all users", x: 60, y: 65, type: "feature" },
          ],
        },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "Expensive Lessons & Stakeholder Management",
      content:
        "**First attempt disaster**: V1 still felt like 'every other crypto app, just prettier.' Feedback was brutal but true. **Failed features**: Global notifications created noise (replaced with asset-specific alerts). Security theater frustrated users (replaced with risk-based authentication). **Stakeholder crisis**: Engineering team threatened to quit when I suggested starting over. Had to prove ROI with competitor analysis. **The breakthrough**: Stop polishing bad patterns—start from user needs. Cost: 6 weeks of development time. Value: Product that actually works.",
      images: [
        {
          src: "/images/crypto/learning.webp",
          alt: "Failed prototype iterations and stakeholder feedback sessions",
          caption: "Failed prototypes and stakeholder crisis meetings that led to breakthrough insights",
        },
      ],
    },
    userTestingSection: {
      title: "Proving the Industry Wrong",
      eyebrow: "Validation & Testing",
      description:
        "Results: 3 min time-to-first-trade (vs 8+ mins competitors). ↓45% order errors. 75% higher trust scores.",
      metrics: [
        { value: "3 min", label: "Time-to-first-trade (vs 8+ competitors)" },
        { value: "↓45%", label: "Order errors" },
        { value: "75%", label: "Higher trust scores" },
      ],
    },
    finalProductSection: {
      title: "The Platform That Shouldn't Exist (According to Industry Logic)",
      description:
        "A crypto app that commits the ultimate sin: actually helping users. Honest Mode → plain English, no manipulation. Unified Experience → one platform for all. Transparent Everything → fees & risks upfront. Actually Fast → no artificial delays.",
      eyebrow: "The Result",
      images: [
        {
          src: "/images/crypto/hero-card.webp",
          alt: "Finished crypto platform breaking industry conventions",
          caption: "Final platform proving the industry's false choice is unnecessary",
        },
      ],
    },
    outcomeSection: {
      title: "Outcome",
      eyebrow: "Outcomes & Impact",
      description:
        'User reactions: Alex: "I can\'t believe how simple this is when you\'re not trying to confuse me." Jordan: "Finally, I don\'t have to choose between speed and helping friends get started."',
      metrics: [
        { value: "+35%", label: "Onboarding conversion" },
        { value: "↓40%", label: "Time-to-first-trade" },
        { value: "+60%", label: "Retention" },
      ],
    },
    sections: [],
    seoData: {
      image:
        "/images/crypto/hero.webp",
      projectName: "Crypto Trading UX — 35% Higher Conversion by Breaking Industry Lies",
      results: [
        "35% increase in onboarding conversion",
        "40% reduction in time-to-first-trade",
        "45% reduction in order errors",
        "60% increase in retention",
      ],
      technologies: ["React", "TypeScript", "Node.js", "WebSocket", "REST API"],
      path: "/project/crypto",
    },
  },
  "dae-search": {
    id: "dae-search",
    title: "DAE Search",
    description:
      "Enterprise search redesigned around the inconvenient truth that finding the data is only half the job — knowing whether to trust it is the rest.",
    tags: ["Enterprise", "Data Discovery", "Search UX"],
    gradientClasses: "from-blue-50 via-cyan-50 to-indigo-50",
    // No heroImage here on purpose: UnifiedCaseStudyHero only ever renders
    // heroVideo.poster or seoData.image, so a heroImage field is dead config.
    problemCallout: {
      eyebrow: "THE PROBLEM",
      statement:
        "Analysts search 'revenue,' get 40 results, then spend 20 minutes figuring out which table is the right one. Which is current. Which is the team-of-record's. Which was deprecated three quarters ago but never cleaned up. The job isn't returning results — it's returning the result you can act on.",
    },
    finalProductSection: {
      eyebrow: "WHAT I DID",
      title: "What I Did",
      description:
        "Semantic search over metadata, not keyword match. Tables called `arr_monthly` show up for 'revenue.' Cut results from 40-to-narrow-down to 4-to-pick-from. Data lineage on the result itself, not a click-through — where the data came from, when it last refreshed, what depends on it. The decision is 'can I trust this in front of leadership?' — that needs to be one glance away. Permission state as a first-class signal: restricted results stay visible with a lock and a one-click access request. Hiding them entirely just makes people think the data doesn't exist. Permission-aware auto-complete — built the obvious version first and security flagged it; the suggestion box was leaking the existence of restricted datasets through pattern-matching.",
      images: [
        {
          src: "/images/dae-search/what-i-built.webp",
          alt: "DAE Search process flow — sign in, visible data assets, search, results",
        },
        {
          src: "/images/dae-search/decisions-1.webp",
          alt: "Initial concepts for enterprise search interface design",
        },
        {
          src: "/images/dae-search/decisions-2.webp",
          alt: "Search results — a filter rail beside a table of data assets, each row carrying status and availability",
        },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: "HICCUP",
      title: "Hiccup",
      content:
        "Started by treating this as consumer search with enterprise wrapper — clean ranked list, minimal chrome. Wrong audience. Enterprise users want context, signals, density. Redesign added the kind of density I'd normally argue against. Also assumed natural-language queries would dominate. They didn't. Analysts type fragments and abbreviations. The 'I know what I want, find it fast' use case mattered more than the conversational one.",
      images: [
        {
          src: "/images/dae-search/the-problem.webp",
          alt: "The advanced-search empty state — a keyword box and one saved filter, before a single result is shown",
        },
      ],
    },
    outcomeSection: {
      eyebrow: "OUTCOME",
      title: "Outcome",
      description:
        "The shift from 'keyword match over names' to 'semantic match with lineage and permissions inline' reframed the product from a search tool into a data discovery tool. Different category, different success metric. The principle worth taking away: in enterprise contexts, trustworthiness of the result matters more than relevance. Most search UX optimizes for the second.",
    },
    sections: [],
    seoData: {
      image: "/images/dae-search/hero.webp",
      projectName: "DAE Search",
      results: [],
      technologies: [],
      path: "/project/dae-search",
    },
  },
  herbalink: {
    id: "herbalink",
    title: "HerbaLink",
    description:
      "Verified herbalists, designed around trust. A booking platform shipped solo with AI as a co-builder.",
    tags: ["AI-Assisted Product", "Healthcare", "Trust & Safety", "Solo Build"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    heroVideo: {
      src: "/herbalink-card.mp4",
      poster: "/images/herbalink/card-poster-home.jpg",
      alt: "HerbaLink booking platform overview",
    },
    projectLink: "https://herbalink.live",
    heroMetrics: [
      { value: "Solo Build", label: "Designer + AI, end-to-end" },
      { value: "Credentials as a Gate", label: "Verified against an external registry, not a badge" },
      { value: "Smaller Catalog by Design", label: "Honest beats exhaustive" },
    ],
    researchSection: {
      subhead: "Talking to users turning to herbalism revealed three problems:",
      emergingThemes: [
        {
          eyebrow: "DISCOVERY IS A MISINFORMATION FIELD",
          insight:
            "Instagram practitioners with no credentials, Google results that mix certified herbalists with weekend-workshop graduates, supplement interactions nobody warns about.",
          drove: "a credentialed directory gated by external verification.",
        },
        {
          eyebrow: "TRUST IS THE PRODUCT, NOT SEARCH",
          insight:
            "One user: \"I found an herbalist on Instagram who promised to cure my anxiety with a $200 tincture. Turns out she had zero credentials and the herbs made me violently sick.\"",
          drove: "making the safe path the easy path, not warning labels on the unsafe one.",
        },
        {
          eyebrow: "FILTER-HEAVY UX FEELS LIKE WEBMD",
          insight:
            "A user testing the early filter panel: \"This feels like trying to diagnose myself on WebMD.\"",
          drove: "replaced filters with a guided triage intake.",
        },
      ],
      researchImage: "/images/herbalink/herbalist-directory.webp",
      researchImageAlt:
        "HerbaLink's Find Herbalists page — every practitioner shown carries a Verified badge, because the unverified ones are never listed",
    },
    problemCallout: {
      eyebrow: "THE REAL PROBLEM",
      statement:
        "People turn to herbalism for anxiety, fatigue, and conditions conventional medicine isn't addressing for them — and the discovery experience is a misinformation field. The design job wasn't to build a bigger directory. It was to make the safe path the easy path, in a category where being wrong has real medical consequences.",
    },
    sprintZeroSection: {
      eyebrow: "SPRINT ZERO",
      title: "Sprint Zero",
      workshopKickoff: "",
      explorations:
        "Early sketches and flow exploration focused on the credential gate — sitting before any browsing — rather than the directory layout.",
      decisionPoint:
        "Build the catalog around external verification first. No practitioner is visible until their credentials are checked against the American Herbalists Guild or equivalent. Smaller catalog, honest one — discovery comes second.",
      images: [
        {
          src: "/images/herbalink/find-herbalist-sketch.webp",
          alt: "Initial concepts and sketches focused on the credential gate, not the directory layout",
        },
        {
          src: "/images/herbalink/thought-process.webp",
          alt: "The process I ran — interview users and herbalists, identify trust barriers, prioritise outcomes over UI, design for retention, validate simplicity",
        },
      ],
    },
    keyInsights: [
      {
        number: 1,
        title: "\"Verified\" as a gate is a different product than \"verified\" as a badge.",
        description:
          "Most directories let anyone list themselves and slap a badge on profiles that pass a basic check. Inverting that — no practitioner is visible until verified — produces a smaller, more honest catalog. That distinction is the product.",
      },
      {
        number: 2,
        title: "Users say \"more options,\" they mean \"more confidence in the option I pick.\"",
        description:
          "Adding 200 practitioners to the early catalog made the experience worse, not better. The win came from removing anyone whose credentials couldn't be verified — even when the catalog visibly shrank.",
      },
      {
        number: 3,
        title:
          "AI can build the directory in a weekend. Deciding who doesn't appear in it is the actual product.",
        description:
          "AI handled scaffolding, Supabase schemas, RLS policies, edge functions, the symptom intake structure, and copy variants. The credential model — which certifications matter for which conditions, when to refuse a listing — was every call I made by hand.",
      },
    ],
    ideationSection: {
      subhead: "Multiple iterations on discovery and intake — each cut backed by observed user behavior.",
      bubbles: [
        {
          title: "Heavy filter panel",
          description:
            "Modality, condition, price, location, availability tested as \"WebMD.\" Replaced with guided intake.",
        },
        {
          title: "Comprehensive symptom diary",
          description:
            "Mood, sleep, supplements, side effects, energy was opened twice per user and abandoned. Cut to one question: what changed since last visit?",
        },
        {
          title: "Yelp-style \"Verified\" badge",
          description: "Scrapped in favor of a gate that controls visibility entirely.",
        },
      ],
      wireframeImage: {
        src: "/images/herbalink/sitemap.png",
        alt: "HerbaLink site structure — verification sits on the practitioner path, before any listing can appear",
        caption: "Site structure — onboarding feeds a guided intake, not a search bar",
      },
    },
    myThoughtProcessSection: {
      eyebrow: "APPROACH & DECISION MAKING",
      title: "My Thought Process",
      content:
        "In a category dominated by misinformation, the design job is to make the safe path the easy path. Not to add warning labels to the unsafe path. Every decision was checked against: would this protect a user from the same $200-tincture mistake? That filter killed open-ended search, killed crowdsourced practitioner listings, and inverted \"verified\" from a badge into a gate.",
    },
    userTestingSection: {
      eyebrow: "USER TESTING",
      title: "User Testing",
      description:
        "Tested with users actively searching for herbalists, plus a smaller group reviewing the safety and intake flows on real iOS and Android phones. Changes from observation: \"This feels like WebMD\" → filter panel replaced with guided triage intake. \"I want to know what changed since last time\" → symptom tracker cut from health diary to a single follow-up question. \"Are these people actually qualified?\" → credential gate made visible on the profile, not buried in an FAQ.",
      images: [
        {
          src: "/images/herbalink/booking-intake.webp",
          alt: "Booking intake — one question, \"What would you like to focus on?\", beside the consultation summary that replaced the symptom diary",
        },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: "WHAT DIDN'T WORK",
      title: "What Didn't Work",
      content:
        "The original architecture was a giant filterable database of every herbalist I could find. Wrong product — users didn't want options, they wanted confidence. Reset. The comprehensive symptom diary tried to be a health journal. Users opened it twice and abandoned it. Cut back to one question that they actually use. The \"Verified\" badge approach was abandoned entirely in favor of the gate model.",
      images: [
        {
          src: "/images/herbalink/before-poster.jpg",
          alt: "The original filter-heavy directory — herbal traditions, specialties and certifications as a filter rail. This is the version a tester called WebMD",
        },
      ],
    },
    outcomeSection: {
      eyebrow: "OUTCOME",
      title: "Outcome",
      description:
        "A shipped booking platform where every listed practitioner has externally verified credentials, where intake replaces search, and where the safer path is also the easier one. Credential gate verified against an external registry, not a badge. Guided intake replaces filter panels and reduces WebMD-style anxiety. Honest catalog — smaller by design, with no unverified tier. AI as scaffolder: schema, RLS, intake structure, copy variants; judgment stayed human.",
      images: [
        {
          src: "/images/herbalink/herb-safety-detail.webp",
          alt: "Herb detail with benefits, preparation and precautions — safety information sits with the recommendation instead of behind a disclaimer",
        },
        {
          src: "/images/herbalink/mobile-booking-guided.webp",
          alt: "HerbaLink final mobile — same hierarchy, same trust signals, optimized for thumb",
        },
      ],
    },
    sections: [],
    seoData: {
      image: "/images/og/herbalink.png",
      projectName: "HerbaLink",
      results: [],
      technologies: [],
      path: "/project/herbalink",
    },
  },
  splittime: {
    id: "splittime",
    title: "SplitTime – Simplifying Co-Parenting with Better Planning",
    description:
      "Built a co-parenting app to reduce scheduling conflicts. Early tests showed a 40% decrease in communication breakdowns.",
    tags: ["Blue Sky", "Design Thinking", "iOS→Android", "Legal UX", "WebApp"],
    techStack: {
      aiTools: ["ChatGPT", "Midjourney"],
      devStack: ["React", "Firebase"],
      designTools: ["Figma", "Principle"],
    },
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    projectLink: "https://splittime.pro",
    heroVideo: {
      src: "",
      poster: "/images/splittime/hero-overview.webp",
      alt: "Splittime co-parenting app hero overview",
    },
    researchSection: {
      subhead:
        "SplitTime is a co-parenting app designed to simplify shared custody, expenses, and communication. Parents were relying on texts and spreadsheets, leading to miscommunication and stress. The vision is to create a neutral and trustworthy tool that reduces conflict and fosters trust between co-parents.",
      blurb: "Tools create conflict.",
      emergingThemes: [
        {
          eyebrow: "ESSENTIALS TO KNOW",
          insight: "Families need today's pickups, locations, and changes at a glance.",
          drove: "Shared calendar + unified timeline for events, notes, and expenses.",
        },
        {
          eyebrow: "CONFIRMATIONS & APPROVALS",
          insight: "Changes were often disputed or missed.",
          drove: "Request/approve flows with stamped history and notifications.",
        },
        {
          eyebrow: "TONE-SAFE COMMUNICATION",
          insight: "Escalations came from ad-hoc texts.",
          drove: "In-app templates and reminders that keep language neutral.",
        },
      ],
      researchVideo:
        "https://www.loom.com/share/fc0904a5d0d840389f0b474c29806b37?sid=0b69a583-a511-448e-92f1-1861e98d3070",
    },
    problemCallout: {
      eyebrow: "Problem to Solve",
      statement:
        "Co-parents often lack a single source of truth for schedules, expenses, and decisions, leading to miscommunication, missed pickups, and ongoing conflict.",
    },
    sprintZeroSection: {
      eyebrow: "0 → 1 EXPLORATION",
      title: "Sprint Zero: Blue-Sky Thinking",
      workshopKickoff: "Early brainstorming on co-parenting communication tools and conflict reduction strategies.",
      explorations:
        "I explored blue-sky concepts ranging from AI-powered communication filtering to gamified cooperation tracking. Early sketches included therapeutic check-ins, mood tracking, and automated conflict de-escalation. I tested divergent ideas like neutral third-party mediation and child-focused decision frameworks to understand what would genuinely reduce tension between co-parents.",
      decisionPoint:
        "I decided to focus on a neutral communication platform after seeing that most conflicts came from unclear tone and expectations. I chose structured templates, approval workflows, and transparent history to build accountability through clarity, instead of adding features that might make things harder.",
      images: [
        {
          src: "/images/splittime/dashboard-concept.png",
          alt: "Initial Concepts & Sketches",
          caption: "Early brainstorming on co-parenting communication tools and conflict reduction strategies",
        },
        {
          src: "/images/splittime/wireframing.webp",
          alt: "User Flow Explorations",
          caption: "Blue-sky exploration of scheduling workflows and neutral communication patterns",
        },
      ],
    },
    keyInsights: [
      {
        number: 1,
        title: "Single source of truth",
        description: "One shared schedule and ledger eliminates disputes.",
      },
      {
        number: 2,
        title: "Consent & clarity",
        description: "Approvals and change logs build trust between co-parents.",
      },
      {
        number: 3,
        title: "Calm communication",
        description: "Neutral templates reduce conflict and decision fatigue.",
      },
    ],
    ideationSection: {
      subhead: "I tested calendar, approvals, expenses, and messaging to reduce conflict and missed handoffs.",
      bubbles: [
        { title: "Today's schedule", description: "Hand-offs, locations, changes" },
        { title: "Approvals", description: "Requests, confirmations, history" },
        { title: "Expenses", description: "Shared ledger with receipts" },
        { title: "Messaging", description: "Tone-safe templates" },
      ],
      iterations: [
        {
          label: "Iteration 1",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/Dashboard1st.png",
          alt: "First iteration of Splittime calendar view",
          blurb:
            "Calendar layout too dense — overwhelming for stressed parents\nNo clear distinction between confirmed and pending events",
          annotations: [
            { text: "Calendar layout too dense - overwhelming for stressed parents", x: 50, y: 30, type: "issue" },
            { text: "No clear distinction between confirmed vs pending events", x: 70, y: 50, type: "issue" },
          ],
        },
        {
          label: "Iteration 2",
          imageSrc: "/images/splittime/dashboard-primary.webp",
          alt: "Second iteration with approval flows",
          blurb: "Added approval status indicators for clarity\nSimplified calendar view reduces cognitive load",
          annotations: [
            { text: "Added approval status indicators for clarity", x: 40, y: 25, type: "improvement" },
            { text: "Simplified calendar view reduces cognitive load", x: 60, y: 45, type: "improvement" },
          ],
        },
        {
          label: "Iteration 3",
          imageSrc: "/images/splittime/dashboard-primary.webp",
          alt: "Third iteration adding expense tracking",
          blurb: "Integrated expense tracking streamlines workflow\nReceipt upload system improves transparency",
          annotations: [
            { text: "Integrated expense tracking streamlines workflow", x: 30, y: 60, type: "feature" },
            { text: "Receipt upload system improves transparency", x: 80, y: 40, type: "feature" },
          ],
        },
        {
          label: "Iteration 4",
          imageSrc: "/images/splittime/messaging.webp",
          alt: "Fourth iteration with messaging templates",
          blurb: "Neutral tone suggestions prevent escalation\nTemplate messaging reduces conflict potential",
          annotations: [
            { text: "Template messaging reduces conflict potential", x: 45, y: 35, type: "feature" },
            { text: "Neutral tone suggestions prevent escalation", x: 65, y: 65, type: "improvement" },
          ],
        },
      ],
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description:
        "Testing with divorced co-parents revealed the importance of neutral communication tools and clear approval workflows to prevent misunderstandings.",
      eyebrow: "VALIDATION & TESTING",
      metrics: [
        { value: "89%", label: "Usability Score" },
        { value: "40%", label: "Conflict Reduction" },
        { value: "2min", label: "Avg. Request Time" },
      ],
      images: [
        {
          src: "/images/splittime/hero-overview.webp",
          alt: "User testing session showing co-parenting workflow validation",
          caption: "Testing sessions validated my neutral communication approach and approval workflow design.",
        },
      ],
    },
    finalProductSection: {
      title: "The Final Product",
      description:
        "A co-parenting platform that prioritizes children's wellbeing through clear communication, shared scheduling, and conflict reduction tools that help separated families coordinate effectively.",
      eyebrow: "THE RESULT",
      images: [
        {
          src: "/images/splittime/early-dashboard.webp",
          alt: "Splittime Dashboard",
          caption: "Main dashboard showing overview of all co-parenting activities and quick actions",
          annotations: [
            {
              x: 25,
              y: 20,
              type: "feature",
              text: "Activity timeline provides instant overview of recent co-parenting interactions without overwhelming detail",
            },
            {
              x: 75,
              y: 35,
              type: "improvement",
              text: "Quick stats reduce anxiety by showing positive progress metrics like timely pickups and resolved issues",
            },
            {
              x: 50,
              y: 65,
              type: "feature",
              text: "Primary navigation emphasizes children-first organization over parent-centric views",
            },
            {
              x: 80,
              y: 80,
              type: "improvement",
              text: "Quick action buttons enable immediate task completion without deep navigation",
            },
          ],
        },
        {
          src: "/images/splittime/dashboard-concept.png",
          alt: "Dashboard Add Function",
          caption: "Add new events, expenses, or messages directly from the dashboard",
          annotations: [
            {
              x: 40,
              y: 30,
              type: "feature",
              text: "Modal overlay keeps users in context while adding new items, reducing cognitive load",
            },
            {
              x: 60,
              y: 50,
              type: "improvement",
              text: "Clear categorization prevents mix-ups between schedules, expenses, and communications",
            },
            {
              x: 70,
              y: 75,
              type: "feature",
              text: "Smart defaults and autocomplete reduce friction in high-stress co-parenting moments",
            },
          ],
        },
        {
          src: "/images/splittime/app-screens.webp",
          alt: "Calendar View",
          caption: "Shared calendar ensuring both parents stay coordinated on schedules",
          annotations: [
            {
              x: 30,
              y: 25,
              type: "improvement",
              text: "Color-coded custody periods eliminate confusion about who has the children when",
            },
            {
              x: 65,
              y: 40,
              type: "feature",
              text: "Both parents see identical information, preventing 'he said, she said' scheduling conflicts",
            },
            {
              x: 50,
              y: 70,
              type: "improvement",
              text: "Visual scheduling reduces text-based miscommunication that often leads to conflict",
            },
          ],
        },
        {
          src: "/images/splittime/features.webp",
          alt: "Expenses Tracking",
          caption: "Track and split child-related expenses with transparent documentation",
          annotations: [
            {
              x: 35,
              y: 30,
              type: "feature",
              text: "Receipt uploads provide transparent documentation, eliminating disputes about spending",
            },
            {
              x: 70,
              y: 45,
              type: "improvement",
              text: "Automatic splitting calculations remove emotional negotiation from financial discussions",
            },
            {
              x: 55,
              y: 75,
              type: "feature",
              text: "Spending categories help parents understand child-related expenses and plan budgets",
            },
          ],
        },
        {
          src: "/images/splittime/documents.webp",
          alt: "Documents Storage",
          caption: "Centralized document storage for important child-related paperwork",
          annotations: [
            {
              x: 40,
              y: 25,
              type: "improvement",
              text: "Centralized storage ensures both parents access the same current documents and information",
            },
            {
              x: 60,
              y: 50,
              type: "feature",
              text: "Smart organization by child and category makes critical documents findable during emergencies",
            },
            {
              x: 75,
              y: 75,
              type: "improvement",
              text: "Version control prevents confusion about outdated medical forms or legal documents",
            },
          ],
        },
        {
          src: "/images/splittime/messaging.png",
          alt: "Messaging System",
          caption: "Neutral messaging interface designed to reduce conflict and misunderstandings",
          annotations: [
            {
              x: 30,
              y: 30,
              type: "improvement",
              text: "Neutral interface design discourages emotional escalation in written communication",
            },
            {
              x: 65,
              y: 45,
              type: "feature",
              text: "Message threading keeps conversations organized and prevents misunderstandings",
            },
            {
              x: 50,
              y: 70,
              type: "improvement",
              text: "Read receipts and timestamps create accountability without being intrusive",
            },
          ],
        },
        {
          src: "/images/splittime/child-profile.png",
          alt: "Child Profile",
          caption: "Detailed child profile with important information accessible to both parents",
          annotations: [
            {
              x: 35,
              y: 25,
              type: "feature",
              text: "Comprehensive child information ensures both parents stay informed about development and needs",
            },
            {
              x: 70,
              y: 40,
              type: "improvement",
              text: "Medical information, preferences, and emergency contacts are always current and accessible",
            },
            {
              x: 55,
              y: 70,
              type: "feature",
              text: "Growth tracking and milestone documentation helps both parents stay connected to child's development",
            },
          ],
        },
      ],
    },
    outcomeSection: {
      title: "Outcome",
      description:
        "SplitTime changed the way separated families communicate and work together. It helped build healthier relationships and led to better outcomes for children.",
      eyebrow: "OUTCOMES & IMPACT",
      metrics: [
        { value: "40%", label: "Conflict Reduction" },
        { value: "90%", label: "User Satisfaction" },
        { value: "24hr", label: "Response Time" },
      ],
    },
    myThoughtProcessSection: {
      eyebrow: "APPROACH & DECISION MAKING",
      title: "My Thought Process",
      content:
        "I designed around conflict reduction first, using neutral language and clear boundaries. Many co-parenting apps miss the mark by focusing on features instead of how people feel. I built SplitTime to reduce conflict first, using neutral language, clear boundaries, and shared accountability. The result: 40% less co-parenting conflict through a platform that helps families communicate better—not just stay organized.",
      images: [
        {
          src: "/images/splittime/features.webp",
          alt: "Splittime user satisfaction metrics and communication improvements",
          caption: "Ideation phase explorations mapping Splittime’s core user flows and interaction patterns.",
          annotations: [
            {
              text: "I designed around conflict reduction first, using neutral language and clear boundaries to help families communicate instead of argue.",
              x: 30,
              y: 25,
              type: "improvement",
            },
            {
              text: "The result: 40% less co-parenting conflict through a platform that prioritizes emotional well-being over feature complexity.",
              x: 70,
              y: 75,
              type: "feature",
            },
          ],
        },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "Learning from Setbacks",
      content:
        "At first, I added too many features to the scheduling interface, which overwhelmed users. I learned to focus on the basics and add advanced features slowly, based on what users needed.",
      images: [
        {
          src: "/images/splittime/early-dashboard.webp",
          alt: "Early Splittime interface with feature overload",
          caption: "Early design attempts included too many features, overwhelming stressed co-parents",
          annotations: [
            {
              x: 40,
              y: 30,
              type: "issue",
              text: "Too many options created decision paralysis",
            },
            {
              x: 65,
              y: 50,
              type: "issue",
              text: "Complex interface increased stress levels",
            },
            {
              x: 50,
              y: 75,
              type: "improvement",
              text: "Simplified to core conflict-reduction features",
            },
          ],
        },
      ],
    },
    sections: [],
    seoData: {
      image: "https://barskyux.com/wp-content/uploads/2025/08/studiodisplaynewlook.png",
      projectName: "Splittime App",
      results: ["Reduced stress and conflict", "Improved coordination and transparency"],
      technologies: ["iOS", "Android", "WebApp"],
      path: "/project/splittime",
    },
  },
  "investor-loan-app": {
    id: "investor-loan-app",
    title: "Redesigning Loans: 85% Fewer Errors, 40% Faster",
    description:
      "How I led a banking platform redesign that replaced Excel and scaled operations with speed, accuracy, and trust.",
    tags: ["FinTech", "Analytics", "WebApp"],
    techStack: {
      aiTools: ["ChatGPT", "Synthetic Data Gen"],
      devStack: ["React", "TypeScript", "PostgreSQL"],
      designTools: ["Figma", "Excel Analysis"],
    },
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    heroVideo: {
      src: "investor-loan-demo.mp4",
      poster: "/images/investor-loan-app/hero.webp",
      alt: "Investor loan platform dashboard",
    },
    researchSection: {
      subhead: "Digging into the pain points",
      blurb: "Why Excel was breaking loan operations",
      emergingThemes: [
        {
          eyebrow: "ACCURACY & AUDIT",
          insight: "Copy/paste errors and unclear totals created compliance risk.",
          drove: "Inline validation, calculated totals, and immutable change history.",
        },
        {
          eyebrow: "FINDABILITY",
          insight: "Officers struggled to locate deals/borrowers across files.",
          drove: "Predictive, category-aware search with contextual filters.",
        },
        {
          eyebrow: "GUIDED ORDERS",
          insight: "Flat forms caused premature inputs and rework.",
          drove: "Stepwise flows with disabled actions until lender selection, plus real-time feedback.",
        },
      ],
      researchImages: [
        {
          src: "/images/investor-loan-app/excel-error.webp",
          alt: "Excel-based loan tracking spreadsheet with inconsistent fields and manual totals",
        },
      ],
    },
    problemCallout: {
      eyebrow: "The critical challenge",
      statement:
        "Compliance risks hidden in spreadsheets: Loan teams were managing multi-million-dollar deals in fragile spreadsheets, with no audit trail or validation. Errors slipped through, reconciliation was manual, and regulators had no trustworthy data to review.",
    },
    sprintZeroSection: {
      eyebrow: "Sprint Zero",
      title: "Blue-Sky Thinking",
      workshopKickoff:
        "I mapped the loan lifecycle end-to-end: intake → lender selection → approval → booking → audit. Early sketches explored validation gates before submission, guided steps for loan officers, and real-time totals and audit history.",
      explorations: "Early exploration of loan processing workflows and automated validation concepts.",
      decisionPoint:
        "The data showed most errors stemmed from missing validation and flat forms. I focused on building an intelligent workflow system—automation, checks, and audit trails—instead of adding unnecessary financial modeling.",
      images: [
        {
          src: "/images/investor-loan-app/book-builder-lofi.webp",
          alt: "Low-fidelity order builder wireframe for loan workflows",
          caption: "",
        },
        {
          src: "/images/investor-loan-app/whiteboarding.webp",
          alt: "Whiteboard mapping of loan lifecycle from application to audit",
          caption: "",
        },
      ],
    },
    keyInsights: [
      { number: 1, title: "Trust through validation", description: "Real-time checks prevent costly errors." },
      { number: 2, title: "Predictive findability", description: "Bloomberg-style search beats filter hell." },
      { number: 3, title: "Guided orders", description: "Stepwise flows reduce mistakes vs. flat forms." },
    ],
    ideationSection: {
      subhead: "Exploring solutions: Designing the building blocks of trust",
      bubbles: [
        { title: "Deal summary", description: "Clear status, limits, and totals" },
        { title: "Predictive search", description: "Context-aware, smart defaults" },
        { title: "Order builder", description: "Guided steps, fewer errors" },
        { title: "Audit & comments", description: "Full history with collaboration" },
      ],
      iterations: [
        {
          label: "Iteration 1",
          imageSrc: "/images/investor-loan-app/orderbook-add-order.webp",
          alt: "Early orderbook view with Add Order entry point and sparse validation",
          blurb: "Sparse validation, unclear priorities",
          annotations: [
            { text: "Add Order entry", x: 30, y: 20, type: "feature" },
            { text: "Unclear field priority", x: 60, y: 45, type: "issue" },
            { text: "No inline checks", x: 50, y: 75, type: "issue" },
          ],
        },
        {
          label: "Iteration 2",
          imageSrc: "/images/investor-loan-app/add-order-default.webp",
          alt: "Add Order default form with clearer required fields and disabled actions",
          blurb: "Required fields, disabled submit until ready",
          annotations: [
            { text: "Required field indicators", x: 25, y: 30, type: "improvement" },
            { text: "Disabled submit until ready", x: 65, y: 50, type: "feature" },
            { text: "Contextual field help", x: 50, y: 75, type: "improvement" },
          ],
        },
        {
          label: "Iteration 3",
          imageSrc: "/images/investor-loan-app/orderbook-overview.webp",
          alt: "Orderbook overview with real-time totals and status cues",
          blurb: "Real-time totals and inline validation states",
          annotations: [
            { text: "Live totals", x: 35, y: 25, type: "feature" },
            { text: "Status chips", x: 65, y: 40, type: "improvement" },
            { text: "Inline validation states", x: 50, y: 70, type: "feature" },
          ],
        },
        {
          label: "Iteration 4",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/uxpilot-design-1756062219098-scaled.png",
          alt: "High-fidelity UI showing guided steps and validation feedback",
          blurb: "High-fidelity guided steps with audit integration",
          annotations: [
            { text: "Step indicator", x: 30, y: 20, type: "feature" },
            { text: "Error prevention copy", x: 60, y: 45, type: "improvement" },
            { text: "Confirm & audit link", x: 70, y: 75, type: "feature" },
          ],
        },
      ],
    },
    userTestingSection: {
      title: "Testing with real loan officers",
      description:
        "Testing validated that automation and audit trails significantly improved both speed and compliance.",
      eyebrow: "Proving it out",
      metrics: [
        { value: "95%", label: "Task Completion" },
        { value: "85%", label: "Error Reduction" },
        { value: "60s", label: "Avg. Search Time" },
      ],
      images: [
        {
          src: "/uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
          alt: "User testing session showing loan officer workflow validation",
          caption:
            "Testing sessions confirmed my automated validation approach significantly reduced processing errors.",
        },
      ],
    },
    finalProductSection: {
      title: "From error-prone spreadsheets to reliable workflows",
      description:
        "We delivered a platform that replaced Excel chaos with guided workflows, real-time checks, and transparent audit trails. Officers gained confidence, regulators gained visibility, and the bank scaled with accuracy.",
      eyebrow: "The solution in action",
      video: {
        src: "https://www.loom.com/share/a47f20680a16435cab9e90521383bfc6?sid=6eed1d9d-f571-4f4b-aa38-f40267e710d0",
        title: "Investor loan platform demo",
        caption: "Complete loan management platform with automated workflows and real-time validation",
      },
      images: [
        {
          src: "/uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
          alt: "Investor loan platform dashboard final interface",
          caption: "Complete loan management platform with automated workflows and real-time validation",
        },
        {
          src: "/images/investor-loan-app/my-deals-list-view.webp",
          alt: "My Deals list view with quick filters, status chips, and bulk actions",
          caption: "",
        },
        {
          src: "/images/investor-loan-app/loan-deals-poster.jpg",
          alt: "Loan deals table with summary sidebar, inline validation, and audit trail",
          caption: "",
        },
        {
          src: "/images/investor-loan-app/manage-loan-limits.webp",
          alt: "Orderbook screen emphasizing guided steps and real-time totals",
          caption: "",
        },
      ],
    },
    outcomeSection: {
      title: "The results that mattered",
      description:
        "The platform transformed loan operations with measurable improvements. Officers gained confidence, regulators gained visibility, and the bank scaled with accuracy.",
      eyebrow: "Impact",
      metrics: [
        { value: "85%", label: "Fewer Errors" },
        { value: "40%", label: "Faster Processing" },
        { value: "200+", label: "Orders in 2 Months" },
      ],
    },
    myThoughtProcessSection: {
      eyebrow: "Design mindset",
      title: "Solving workflows, not just interfaces",
      content:
        "I treated this as a process problem, not a screen problem. By shadowing loan officers, I saw scattered data, manual mistakes, and compliance blind spots. The answer wasn't prettier forms—it was automation, validation, and transparency.",
      images: [
        {
          src: "/uploads/6e0291a5-2519-4b89-8402-44a9b8a27cf0.png",
          alt: "Investor loan platform user workflow and process improvements",
        },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: "Lessons learned",
      title: "When copying Excel patterns failed",
      content:
        "At first, we recreated too much of Excel's flat structure. Users were overwhelmed, and errors persisted. The fix: guided workflows, card-based views, and live syncing that matched real processes instead of old habits.",
      images: [
        {
          src: "/images/investor-loan-app/before-after.webp",
          alt: "Collage highlighting legacy manual steps and fragmentation",
          caption: "",
        },
      ],
    },
    sections: [],
    seoData: {
      image:
        "/images/business-management/hero-three-laptops.jpg",
      projectName: "Business Management App",
      results: ["85% fewer errors", "40% faster processing", "80% satisfaction", "200+ orders in 2 months"],
      technologies: ["React", "Data Visualization", "Automation"],
      path: "/project/investor-loan-app",
    },
  },
  catchbuddy: {
    id: "catchbuddy",
    title: "CatchBuddy",
    description:
      "Same-day pickup sports, designed for trust. Post a game, see open games, confirm in a few taps. Built solo with AI as a co-builder.",
    tags: ["AI-Assisted Product", "Trust & Safety", "Mobile-First", "Solo Build"],
    gradientClasses: "from-orange-50 via-amber-50 to-yellow-50",
    heroVideo: {
      src: "/catchbuddy-card.mp4",
      poster: "/images/catchbuddy-hero-landing.webp",
      alt: "CatchBuddy pickup sports app overview",
    },
    projectLink: "https://catchbuddy.fit",
    heroMetrics: [
      { value: "Solo Build", label: "Designer + AI, end-to-end" },
      { value: "Safety-First Architecture", label: "Minor approval, panic button, curated meeting spots" },
      { value: "Real Stack Shipped", label: "Auth, RLS, OAuth, Stripe, Realtime" },
    ],
    researchSection: {
      subhead: "Observing pickup-sports culture and existing apps surfaced three friction points:",
      emergingThemes: [
        {
          eyebrow: "LEAGUE-FOCUSED APPS DON'T SERVE CASUAL PLAY",
          insight:
            "Existing platforms assume commitment, schedules, recurring teams. Most people want one game this weekend, not a season.",
          drove: "a single-action \"post a catch request\" as the entire product.",
        },
        {
          eyebrow: "TRUST IS THE REAL UNLOCK, NOT MATCHING",
          insight:
            "Two strangers meeting at a park requires a different safety model than dating apps or marketplaces.",
          drove:
            "phone verification, panic button, curated meeting spots, minor approval flow — built in from v1.",
        },
        {
          eyebrow: "\"MATCHES\" READS AS DATING",
          insight: "Early testers consistently misread the nav.",
          drove: "rewrote navigation as \"Browse\" and \"Players\" instead of \"Matches.\"",
        },
      ],
      researchImage: "/images/catchbuddy-signin.webp",
      researchImageAlt:
        "Sign-in screen with the CatchBuddy brand — first trust signal before anything is asked",
    },
    problemCallout: {
      eyebrow: "THE REAL PROBLEM",
      statement:
        "Pickup sports are dying in cities. Existing apps are league-focused or chat-heavy. Nobody wants a Slack thread to throw a baseball after work. The real product wasn't another scheduling tool — it was a way to lower the friction and the safety risk of two strangers agreeing to meet at a park.",
    },
    sprintZeroSection: {
      eyebrow: "SPRINT ZERO",
      title: "Sprint Zero",
      workshopKickoff: "",
      explorations:
        "Step 1 — pick a sport. Five options, no menu, no friction. Step 2 — pick a park: curated venues only; no arbitrary GPS pins. Step 3 — equipment + preferences: small signals that cut down on missed expectations.",
      decisionPoint:
        "Ship the minimum viable trust loop — post a game, see games, confirm a match — and only then layer in the safety scaffolding (phone verification, panic button, minor approval). No discovery without trust signals in place.",
      images: [
        {
          src: "/images/catchbuddy-post-game.webp",
          alt: "Post Your Game — sport picker with Football, Basketball, Baseball, Volleyball, Frisbee",
        },
        {
          src: "/images/catchbuddy-choose-park.webp",
          alt: "Choose a Park — searchable list with distance and amenities",
        },
      ],
    },
    keyInsights: [
      {
        number: 1,
        title: "Safety can't be a bolt-on. It's the product.",
        description:
          "Minors require a verified parent on file before they can post. The panic button reaches every in-game screen. Public meeting spots are curated, not crowdsourced. None of that comes from a prompt — those are product calls about who's actually going to use this and what could go wrong.",
      },
      {
        number: 2,
        title: "AI scaffolds the schema. It doesn't decide who's allowed to post.",
        description:
          "AI shipped the RLS policies, the profiles_public view, the Supabase migrations, the Stripe integration, the OAuth flow. The trust model — who gets in, who's gated, what's surfaced — was every decision I made by hand.",
      },
      {
        number: 3,
        title: "Real reviews surface things AI misses.",
        description:
          "AI's own security code review caught a recursive RLS policy on the profiles table that would have leaked data in production. Used the AI as a second pair of eyes, not as the only set.",
      },
    ],
    ideationSection: {
      subhead: "Multiple iterations on onboarding and flow — every cut backed by observed friction.",
      bubbles: [
        { title: "\"Quick Start\" wizard", description: "Built, then cut — users skipped it every time." },
        {
          title: "Homepage MapSection",
          description: "Looked great in screenshots and confused first-time visitors. Cut.",
        },
        {
          title: "iOS geolocation flow",
          description: "Rebuilt with a city-dropdown fallback after half of testers denied location.",
        },
      ],
      wireframeImage: {
        src: "/images/catchbuddy-equipment-prefs.webp",
        alt: "Equipment and preferences — \"I'll bring a football,\" no-contact toggle",
        caption: "Step 3 — equipment + preferences. Small signals that cut down on missed expectations",
      },
    },
    myThoughtProcessSection: {
      eyebrow: "APPROACH & DECISION MAKING",
      title: "My Thought Process",
      content:
        "The product had to be honest about who was using it. Two strangers, a park, a real game on a real day. Every design decision was checked against: would I let my 16-year-old cousin sign up for this? That filter killed open-ended chat, killed crowdsourced meeting spots, and gated everything for minors behind a verified parent.",
    },
    userTestingSection: {
      eyebrow: "USER TESTING",
      title: "User Testing",
      description:
        "Tested with friends, family, and parents reviewing the minor-approval flow on real iOS and Android phones. Changes from observation: \"Matches\" → \"Browse\" and \"Players\" — users read \"Matches\" as Tinder-like. Toast stacking — auto-dismiss after 3 seconds. Bottom nav layout shift — fixed to grid-cols-5 to prevent jumps when badges appear. Calendar OAuth state — rewrote with HMAC-SHA256 signing after CSRF vulnerability was caught. Demo data leakage — separated demo matches into their own query path with a Demo badge.",
      images: [
        {
          src: "/images/catchbuddy-find-players.webp",
          alt: "The Matches screen testers kept reading as a dating app — a Find Players tab and percentage match scores from a proximity and time heuristic",
        },
        {
          src: "/images/catchbuddy-signup-minor-gate.webp",
          alt: "Sign-up form with the 13+ age gate — first checkpoint in the minor-protection flow",
        },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: "WHAT DIDN'T WORK",
      title: "What Didn't Work",
      content:
        "The Quick Start wizard was over-engineered onboarding. Users wanted to skip it. Cut. The homepage MapSection promised value the first interaction couldn't deliver. Cut. Apple Calendar, Outlook, and ICS support were built. Three calendar providers turned out to be a maintenance tax for a feature users barely cared about. Google-only now.",
      images: [
        {
          src: "/images/catchbuddy-game-live.webp",
          alt: "Confirmation — \"Your Game is Live!\" with nearby player count, not a vanity counter",
        },
      ],
    },
    outcomeSection: {
      eyebrow: "OUTCOME",
      title: "Outcome",
      description:
        "A shipped pickup-sports platform with auth, RLS, Stripe payments, Google Calendar OAuth, realtime updates, a minor-approval flow, and curated meeting spots — designed and built solo with AI as a co-builder. Trust-first architecture: safety scaffolding built in from v1, not bolted on. Real stack: auth, RLS, OAuth, Stripe, Realtime, all shipped. User-driven cuts: every removed feature backed by observed friction. AI as collaborator: schema scaffolding, security review, copy drafts, edge functions.",
      images: [
        {
          src: "/images/catchbuddy-pro-pricing.webp",
          alt: "Pro pricing — $7.99/mo or $59.99/yr, added after the safety and matching loop was stable",
        },
      ],
    },
    clientTestimonial: {
      quote:
        "Unmatched in his ability to translate the often vague ideas from clients into beautiful, simple-to-use products.",
      author: "Daanish",
      title: "Business Delivery Partner",
      company: "Tata Consultancy Services",
    },
    sections: [],
    seoData: {
      image: "/images/og/catchbuddy.png",
      projectName: "CatchBuddy",
      results: [],
      technologies: [],
      path: "/project/catchbuddy",
    },
  },

  "fire-lion": {
    id: "fire-lion",
    title: "Fire Lion",
    description:
      "A shipped game, built solo with AI. A one-tap arcade runner where you spell words mid-flight to cast spells.",
    tags: ["AI-Assisted Product", "Game Design", "Mobile Web", "Solo Build"],
    gradientClasses: "from-orange-50 via-amber-50 to-yellow-50",
    heroVideo: {
      // Re-encoded from the 11 MB original: 720 px wide, CRF 28, audio stripped.
      // A 5-second hero has no business costing 11 MB of LCP budget.
      src: "/fire-lion-card.mp4",
      poster: "/images/firelion-hero-title.webp",
      alt: "Fire Lion gameplay overview",
    },
    projectLink: "https://firelion.me",
    heroMetrics: [
      { value: "Solo Build", label: "One designer, AI as co-builder" },
      { value: "Daily Playtests", label: "Self + friends, real phones" },
      { value: "6 Systems Cut", label: "After watching real users" },
    ],
    researchSection: {
      subhead: "Watching real players on real phones surfaced three patterns:",
      emergingThemes: [
        {
          eyebrow: "FEATURE BLOAT KILLS FUN",
          insight:
            "Daily missions, streaks, daily-word challenges, social proof counters — all added, all ignored.",
          drove: "a ruthless deletion list and a single-mode core loop.",
        },
        {
          eyebrow: "GAME FEEL CAN'T BE PROMPTED",
          insight:
            "AI shipped collision math and particle systems in minutes. The lion still felt like a balloon for 30 iterations.",
          drove: "hand-tuned gravity, tap impulse, and scroll curves over hundreds of test runs.",
        },
        {
          eyebrow: "PLAYERS WANT SURPRISE, NOT SHOPPING",
          insight: "Forge upgrade screens and pre-run skill trees tested badly. People wanted to play.",
          drove: "removed every pre-run friction point. Tap FLY is the only path in.",
        },
      ],
      researchImage: "/images/firelion-gameplay-lavagod.webp",
      researchImageAlt: "Main runner gameplay — one tap to fly, score and best-run counters on screen, no pre-run menus",
    },
    problemCallout: {
      eyebrow: "THE REAL PROBLEM",
      statement:
        "Most \"I built X with AI\" portfolios are a calculator, a dashboard, a productized audit. Safe. Forgettable. The harder question — can a designer ship a real product solo with AI? — needed a harder answer. A game. Game feel can't be faked with a prompt.",
    },
    sprintZeroSection: {
      eyebrow: "SPRINT ZERO",
      title: "Sprint Zero",
      workshopKickoff: "",
      explorations:
        "The spelling mechanic — words cast spells — was only added after the tap-to-fly felt right. Every later system (combos, bosses, modes) was layered on top of a verified core loop.",
      decisionPoint:
        "Build the smallest possible playable loop first — one tap, one lion, no words, no worlds, no audio — and only add a mechanic after the core gesture feels good.",
      images: [
        {
          src: "/images/firelion-spelling-lightning.webp",
          alt: "Lightning Strike spell casting from spelling MN",
        },
        {
          src: "/images/firelion-spelling-combo.webp",
          alt: "Spelling CRAP over a lava forge anvil, 5× combo",
        },
      ],
    },
    keyInsights: [
      {
        number: 1,
        title: "Building features is easy with AI. Killing features is the actual design work.",
        description:
          "AI happily shipped daily missions, streaks, a forge upgrade screen, mod gating, and three premium fighter modes. Users used none of them. The deletion list ended up longer than the feature list — and the game got better with every removal.",
      },
      {
        number: 2,
        title: "AI handles the work between human decisions. It doesn't replace them.",
        description:
          "AI scaffolded Supabase schemas, Tailwind tokens, particle systems, and refactors across 30+ files at a time. Every gravity tweak, tap impulse, and difficulty threshold was still mine — hand-tuned by feel over hundreds of test runs.",
      },
      {
        number: 3,
        title: "Three modes serve three moods. Isolation is the design rule that makes it work.",
        description:
          "Fire Lion (tense, escalating), Lion Wars (strategic), Cub Mode (low-stakes recovery). Cub Mode lives in its own component with its own audio and state — enforced in the AI memory file so even at 2am, six prompts deep, the rule holds.",
      },
    ],
    ideationSection: {
      subhead: "Multiple iterations on the core loop — kept only what made players want one more run.",
      bubbles: [
        { title: "Tap-to-fly tuning", description: "Tuned across ~30 iterations before it stopped feeling floaty." },
        {
          title: "Slow-start ramp",
          description: "Added to ease beginners — players thought the game was broken. Cut entirely.",
        },
        {
          title: "Boss fights rebuilt",
          description: "From damage-sponge to telegraphed attacks with 3-second cinematic intros.",
        },
      ],
      wireframeImage: {
        src: "/images/firelion-lionwars-combat.webp",
        alt: "Lion Wars naval combat, wave 1 of 7, lava cavern backdrop",
        caption: "Lion Wars — built as a between-worlds mode, then pulled because it broke flow",
      },
    },
    myThoughtProcessSection: {
      eyebrow: "APPROACH & DECISION MAKING",
      title: "My Thought Process",
      content:
        "The whole project was held together by one question, asked over every feature: does this make the player want one more run? If yes, keep. If no — even if AI built it in minutes, even if it tested fine in isolation — cut. That filter is what separates a tech demo from a game, and it's the part AI can't do.",
    },
    userTestingSection: {
      eyebrow: "USER TESTING",
      title: "User Testing",
      description:
        "Tested with friends and family on real iOS and Android phones, plus daily self-playtests (minimum 10 runs per day). Qualitative changes that shipped from feedback: \"Why is the first board always the same boss?\" → randomized world order per run. \"I can never revive.\" → full rewrite of revive UI and availability logic. \"The lion flies too slowly at the start.\" → killed the slow-start mechanic. \"It's stupid I can't move left and right in Cub Mode.\" → added horizontal movement.",
      images: [
        {
          src: "/images/firelion-cubmode-sunset.webp",
          alt: "Cub Mode sunset scene — kept isolated from the main game so refactors never break it",
        },
        {
          src: "/images/firelion-cubmode-ocean.webp",
          alt: "Cub Mode ocean scene — same isolation rule: separate component, separate audio, separate state",
        },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: "WHAT DIDN'T WORK",
      title: "What Didn't Work",
      content:
        "The first version had daily missions, a streak system, a daily Wordle-style challenge, a legacy cumulative score, a social proof counter, a forge pre-run upgrade screen, and mod gating behind a \"Lava Rank\" tier. All shipped fast thanks to AI. All ignored by players. All removed. Lion Wars originally triggered between worlds in the runner. Players hated being yanked out of flow. The trigger was removed; the code stays in the codebase for a Phase 2 integration directly into the main runner.",
    },
    outcomeSection: {
      eyebrow: "OUTCOME",
      title: "Outcome",
      description:
        "A shipped game with three modes, real retention loops, a deletion list longer than its feature list, and a clear thesis: AI can scaffold a game in a week, but deciding which 80% to throw away is the year of design work that makes it playable. Three modes — Fire Lion, Lion Wars, Cub Mode. Solo design end-to-end — UI, mechanics, economy, audio, art direction. Ruthless deletion discipline — every cut backed by observed player behavior. Reusable AI memory file keeps the next session in perfect context.",
    },
    sections: [],
    seoData: {
      image: "/images/og/fire-lion.png",
      projectName: "Fire Lion",
      results: [],
      technologies: [],
      path: "/project/fire-lion",
    },
  },

  "ring-rival": {
    id: "ring-rival",
    title: "Ring-Rival",
    description:
      "Console boxing feel on the mobile web. Distinct AI opponents, AI-generated trash talk, career mode — built solo with AI as a co-builder.",
    tags: ["AI-Assisted Product", "Mobile Web", "Game Design", "Solo Build"],
    gradientClasses: "from-sky-50 via-indigo-50 to-violet-50",
    heroVideo: {
      src: "/ring-rival-card.mp4",
      poster: "/images/ringrival-hero-title.webp",
      alt: "Ring-Rival mobile boxing gameplay",
    },
    projectLink: "https://rival.li",
    heroMetrics: [
      { value: "Solo Build", label: "Designer + AI, no team" },
      { value: "22s → 6s", label: "Time to first punch after testing" },
      { value: "~40% → <2%", label: "Audio failure rate after the first-tap gate" },
    ],
    researchSection: {
      subhead: "Observing real players on real phones revealed three problems:",
      emergingThemes: [
        {
          eyebrow: "STATIC TUTORIALS DON'T WORK",
          insight:
            "A 4-step calibration wizard, a daily challenges modal, and a how-to page all tested poorly. Six of six testers skipped the how-to before their first fight.",
          drove: "if the first fight doesn't teach the controls in 10 seconds, no screen will.",
        },
        {
          eyebrow: "MOBILE AUDIO IS UNRELIABLE BY DEFAULT",
          insight:
            "iOS Safari kills audio that isn't triggered by user gesture. ~40% of first sessions launched silent.",
          drove: "AudioContext resume gated behind the first tap on the title screen.",
        },
        {
          eyebrow: "AI OPPONENTS NEED RHYTHM, NOT TIMERS",
          insight: "Early opponents threw punches at fixed intervals. Felt like fighting a metronome.",
          drove:
            "an EmotionEngine where opponents bait, hesitate, and tilt based on how the player is doing.",
        },
      ],
      researchImage: "/images/ringrival-glassjoe-idle.webp",
      researchImageAlt:
        "Glass Joe idle stance — started with one opponent, two buttons, a health bar before adding anything else",
    },
    problemCallout: {
      eyebrow: "THE REAL PROBLEM",
      statement:
        "Boxing games live on consoles for a reason — tight input latency, animation feel, and AI that reads like a real opponent. Doing all of that with a thumb on a phone, in a browser, no install, was the constraint that made the project worth building. The design question wasn't \"can we ship a boxer,\" it was \"can we ship one that feels right.\"",
    },
    sprintZeroSection: {
      eyebrow: "SPRINT ZERO",
      title: "Sprint Zero",
      workshopKickoff: "",
      explorations:
        "Five-second control briefing before each fight — readable in 10 seconds, dismissible. Each fighter has a distinct silhouette and personality, generated via Gemini image preview — voice without writing a dialogue tree.",
      decisionPoint:
        "Verify game feel on a single archetype (Glass Joe) before generating any other fighters. If a punch doesn't feel good against the easiest opponent, no amount of AI sprite generation will save the project.",
      images: [
        {
          src: "/images/ringrival-controls-modal.png",
          alt: "VS Glass Joe controls modal with input scheme",
        },
        {
          src: "/images/ringrival-vonkaiser.webp",
          alt: "Von Kaiser — tall, broad, defensive guard",
        },
      ],
    },
    keyInsights: [
      {
        number: 1,
        title: "AI generates fighters endlessly. Sequencing them is design.",
        description:
          "Sprite generation, trash talk, announcer intros, and crowd mood all came from AI prompts. Deciding the career order — Glass Joe → Von Kaiser → Bald Bull → … → the final boss — is a difficulty curve, hand-built across hundreds of test fights.",
      },
      {
        number: 2,
        title: "Game feel is the part you can't prompt.",
        description:
          "Hit-stop duration, screen shake amplitude, the 60ms haptic on connect, the curve of the health bar drain — all hand-tuned by feel. No model knows whether a punch feels like a punch.",
      },
      {
        number: 3,
        title: "Mobile ergonomics are decided by watching a real hand on a real phone.",
        description:
          "Where the punch button lives, how big the block zone is, whether the music toggle belongs top-right or in a menu — every one of these was settled by handing a phone to someone and watching them play.",
      },
    ],
    ideationSection: {
      subhead: "Multiple iterations on core systems — every cut backed by observation, not opinion.",
      bubbles: [
        {
          title: "Sprite scaling",
          description:
            "Rebuilt three times before per-archetype mobileScaleBoost multipliers worked across body types.",
        },
        {
          title: "Particle effects",
          description:
            "Throttled to 15% of frames after Bald Bull's signature charge created an unreadable dust cloud on mobile.",
        },
        {
          title: "AI opponent rhythm",
          description: "Rewritten from fixed-interval punches to the EmotionEngine — bait, hesitate, tilt.",
        },
      ],
      wireframeImage: {
        src: "/images/ringrival-knockdown.webp",
        alt: "Knockdown — DOWN! 5 count with star burst over floored Glass Joe",
        caption: "Hit-stop, star burst, count timing — all hand-tuned by feel",
      },
    },
    myThoughtProcessSection: {
      eyebrow: "APPROACH & DECISION MAKING",
      title: "My Thought Process",
      content:
        "The whole game is a series of small calibration calls that AI can't make: is this punch satisfying, is this opponent fun to fight, is this control discoverable. AI's job was to generate raw material — sprites, voice lines, schemas, refactors — at a speed that made hundreds of micro-iterations possible. My job was to be the taste filter on every output.",
    },
    userTestingSection: {
      eyebrow: "USER TESTING",
      title: "User Testing",
      description:
        "Tested in person and remotely on iOS and Android phones, ages 14–47, with screen and face recording. Key changes from observation: time-to-first-punch dropped from 22s to 6s by cutting menus and tutorial screens. Audio failure rate dropped from ~40% to under 2% by gating AudioContext resume behind the first tap. Webcam hand-tracking and AR mode were cut — half the testers refused the camera prompt and bounced.",
      images: [
        {
          src: "/images/ringrival-impact-particles.webp",
          alt: "Glass Joe getting hit — red impact particles dialed back so fighter stays visible",
        },
        {
          src: "/images/ringrival-pause-modal.webp",
          alt: "Pause modal mid-fight vs. Disco Dan — Resume / Music Off / Forfeit reachable without breaking flow",
        },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: "WHAT DIDN'T WORK",
      title: "What Didn't Work",
      content:
        "The original calibration wizard, daily challenges modal, and how-to page were all built and all ignored. Cut. Webcam-based hand-tracking was technically impressive and the wrong mechanic for the audience. Removed entirely, along with all AR-mode references in SEO and the menu. Multiplayer and leaderboards exist as components but are gated. Shipping them requires moderation I didn't want to own in v1.",
      images: [
        {
          src: "/images/ringrival-now/disco-flurry.jpg",
          alt: "Disco Dan — completely different silhouette and personality from Glass Joe",
        },
      ],
    },
    outcomeSection: {
      eyebrow: "OUTCOME",
      title: "Outcome",
      description:
        "A shipped boxing game with distinct AI opponents, generated trash talk, hand-tuned game feel, and a deployment cadence of 3–6 builds a day. Real users, real cuts, real opponents. Distinct opponents — each with their own silhouette, voice, and rhythm. AI as content engine — sprites, trash talk, intros, crowd reactions. Designer as taste filter — every output checked against \"does this feel good.\" Iteration cadence: ship → watch a session → fix the loudest thing → reship.",
    },
    sections: [],
    seoData: {
      image: "/images/og/ring-rival.png",
      projectName: "Ring-Rival",
      results: [],
      technologies: [],
      path: "/project/ring-rival",
    },
  },
  "business-management": {
    id: "business-management",
    title: "Blue Sky: Using Design Thinking to Reduce Enterprise Operation Errors by 68%",
    description: "When small businesses are drowning in tools, sometimes you need to throw them a lifeline",
    tags: ["Enterprise", "Small Business", "Automation", "Design Thinking"],
    techStack: {
      aiTools: ["ChatGPT", "Midjourney", "Cursor AI"],
      devStack: ["React", "Next.js", "Supabase"],
      designTools: ["Figma", "Framer"],
    },
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    heroImage: {
      src: "/images/business-management/hero-three-laptops.jpg",
      alt: "Business management warehouse operations and inventory tracking system",
    },
    researchSection: {
      subhead:
        'REPETITIVE MANUAL WORK\n"I spend more time entering the same client info into different systems than actually serving clients." – Mike, freelance photographer\nSolved with smart templates + automation.',
      blurb: "Gathering insights from 47 small business owners",
      emergingThemes: [
        {
          eyebrow: "CONSOLIDATION",
          insight: "Scheduling, invoicing, and tasks lived in separate systems.",
          drove: "Unified dashboard with linked records.",
        },
        {
          eyebrow: "AUTOMATION",
          insight: "Recurring work (invoices, reminders) was manual.",
          drove: "Recurrence, templates, and smart reminders.",
        },
        {
          eyebrow: "VISIBILITY & PRIORITY",
          insight: "Hard to see what needs attention now.",
          drove: "'Today' view with aging statuses and alerts.",
        },
      ],
      researchImages: [
        {
          src: "/images/business-management/v2/mobile-grid-8up.webp",
          alt: "Eight QuickFlow mobile screens: business overview, customers, orders, products, recipe calculator, recurring orders, delivery and drivers",
          caption:
            'PRIORITY BLINDNESS\n"I missed a $12K payment because the overdue notice got buried under 47 other notifications." – Lisa, web developer\nSolved with Today dashboard + priority scoring.',
        },
      ],
    },
    problemCallout: {
      eyebrow: "Problem to Solve",
      statement:
        "Small businesses often juggle disconnected tools for scheduling, invoicing, and tasks, wasting hours weekly and losing revenue.",
    },
    sprintZeroSection: {
      eyebrow: "0 → 1 EXPLORATION",
      title: "Sprint Zero: Blue-Sky Thinking",
      workshopKickoff: "Initial concept sitemap mapping core modules and navigation.",
      explorations:
        "I explored blue-sky concepts ranging from AI-powered workflow automation to intelligent business insights. Early sketches included predictive cash flow modeling, automated client follow-ups, and integrated marketing campaigns. I tested divergent ideas like voice-controlled task management and smart scheduling optimization to understand what would genuinely improve daily business operations.",
      decisionPoint:
        "I decided to build a unified operations platform after seeing that most problems came from switching between tools and re-entering data. I focused on bringing core functions together, automating repetitive work, and making daily priorities clear. This approach created efficiency by integrating features, not by adding more complexity.",
      images: [
        // sitemap-draft.jpg removed: it was the same diagram as sitemap-refined,
        // differing only in three misspellings baked into the image ("Derivvry",
        // "Invegtory", "MoA/tor Interfacce"). 0.44% of pixels differed. The
        // refined one also claimed to be a "user flow exploration" — it is a
        // sitemap, so the caption now says what the image actually shows.
        {
          src: "/images/business-management/sitemap-refined.jpg",
          alt: "Concept sitemap for the unified operations platform",
          caption: "Concept sitemap mapping the core modules and navigation.",
        },
      ],
    },
    keyInsights: [
      { number: 1, title: "One platform eliminates chaos", description: "Consolidating core ops cuts tool chaos." },
      {
        number: 2,
        title: "Automation saves hours",
        description: "Recurring invoices and reminders save hours weekly.",
      },
      {
        number: 3,
        title: "Priority-at-a-glance prevents oversights",
        description: "A single dashboard surfaces what needs attention now.",
      },
    ],
    ideationSection: {
      subhead: 'Multiple iterations on the "run your day" loop',
      bubbles: [
        { title: "Dashboard KPIs", description: "only critical alerts" },
        { title: "Tasks", description: "Today view + smart priority" },
        { title: "Invoices", description: "template-driven workflow" },
        { title: "Scheduling", description: "auto-generates tasks + invoices" },
      ],
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description:
        "Testing with enterprise teams revealed that consolidating multiple tools into one unified platform dramatically reduced training time and operational errors.",
      eyebrow: "Validation & Testing",
      video: {
        src: "/images/business-management/v2/design-system.webp",
        title: "Design System Implementation Demo",
        caption:
          "Unified design system streamlined user workflows and reduced learning curve across all business functions",
      },
      metrics: [
        { value: "90%", label: "satisfaction" },
        { value: "68%", label: "fewer errors" },
        { value: "5 min", label: "daily setup time" },
      ],
      images: [
        {
          src: "/images/business-management/v2/orders.webp",
          alt: "QuickFlow order management: every delivery order and its status on one screen",
          caption: "Testing sessions confirmed my unified approach significantly improved daily operations efficiency.",
        },
      ],
    },
    finalProductSection: {
      title: "The Final Product",
      description:
        "Unified platform with: Smart priority dashboard, Automated invoicing, Connected scheduling, Error reduction by 68%",
      eyebrow: "The Result",
      images: [
        {
          src: "/images/business-management/final-product-four-panel.jpg",
          alt: "Business management system final interface",
          caption: "Complete business management platform with unified operations and automated workflows",
          annotations: [
            {
              x: 20,
              y: 25,
              type: "feature",
              text: "Unified dashboard eliminated tool switching",
            },
            {
              x: 70,
              y: 20,
              type: "feature",
              text: "Automated invoicing reduced errors by 68%",
            },
            {
              x: 50,
              y: 60,
              type: "improvement",
              text: "Smart priority system surfaces urgent tasks",
            },
            {
              x: 80,
              y: 80,
              type: "feature",
              text: "Integrated scheduling prevents double-booking",
            },
          ],
        },
      ],
    },
    outcomeSection: {
      title: "Outcome",
      description:
        "Sarah's email: \"I just realized I haven't thought about my 'admin day' in weeks. Everything just happens automatically now.\"",
      eyebrow: "Outcomes & Impact",
      metrics: [
        { value: "68%", label: "Fewer Errors" },
        { value: "35%", label: "Faster Processing" },
        { value: "90%", label: "User Satisfaction" },
      ],
    },
    myThoughtProcessSection: {
      eyebrow: "Approach & Decision Making",
      title: "My Thought Process",
      content:
        "I designed around how small businesses actually operate—not how we think they should. Watching Sarah's workflow made it clear: reduce cognitive load, not add features. Result: unified platform with smart defaults and connected workflows.",
      video: {
        src: "https://www.loom.com/share/e60a93f3f5984a17a7eb0020b5dad812?sid=f76cfc4b-c235-4c48-9dd2-468091c9113b",
        title: "My Thought Process - Business Management Design Approach",
        caption: "Walkthrough of design decisions and approach for the business management platform",
      },
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "Lessons Learned",
      content: "Too many customization options = decision paralysis. Smart defaults + minimal customization = win.",
    },
    sections: [],
    seoData: {
      image:
        "/images/business-management/hero-three-laptops.jpg",
      projectName: "Blue Sky: Using Design Thinking to Reduce Enterprise Operation Errors by 68%",
      results: [
        "68% Fewer Operation Errors",
        "35% faster processing",
        "90% user satisfaction",
        "Unified operations platform",
      ],
      technologies: ["Enterprise", "Small Business", "Automation", "Design Thinking"],
      path: "/project/business-management",
    },
  },
  "email-creation-ai": {
    id: "email-creation-ai",
    title: "ManuscriptRx: Designing an AI-Assisted Email Creation Workflow for Pharma",
    description:
      "A self-initiated concept project — a 6-step AI-assisted workflow that replaces the broken handoffs in pharma HCP email production with one platform built around real roles and approval gates.",
    tags: ["Concept Project", "Enterprise", "Gen AI", "Pharma", "Workflow Design"],
    techStack: {
      aiTools: ["Claude", "ChatGPT"],
      devStack: ["React", "TypeScript"],
      designTools: ["Figma"],
    },
    gradientClasses: "from-sky-50 via-indigo-50 to-violet-50",
    heroImage: {
      // Was screen1-content-planning, which is also slide 1 of the walkthrough
      // below — the same picture twice on one page. hero-pair was built for this
      // slot (Steps 1 and 2 side by side) and was sitting unused.
      src: "/images/emailai-hero-pair.webp",
      alt: "ManuscriptRx workflow: Step 1 Content Planning beside Step 2 Assemble From Approved Content",
    },
    heroMetrics: [
      { value: "6", label: "Workflow steps" },
      { value: "4", label: "Roles designed for" },
      { value: "1", label: "Honest open problem" },
    ],
    outcomeSection: {
      eyebrow: "The Core Design Problem",
      title: "Pharma email production fails at the handoffs, not the writing",
      description:
        "The temptation is to add AI everywhere and call it smart. The real question is simpler: how do we make sure the right person is looking at the right thing at the right time — and the AI handles everything in between? That framing drove every screen.",
      metrics: [
        { value: "Roles", label: "Med Writer · Content Ops · Brand · MLR" },
        { value: "Gates", label: "Designed around real approvals" },
        { value: "AI", label: "Owns the work between humans" },
        { value: "Spec", label: "Markdown handoff per screen" },
      ],
      images: [],
    },
    whatDidntWorkSection: {
      eyebrow: "What I Haven't Solved",
      title: "Step 6 — the MLR review experience",
      content:
        "I designed the AI outputs (RV PDF, annotations panel, based-on declaration) but not the review experience itself — how MLR reviewers annotate, reject, and approve claims with legal accountability. That's the hardest part of pharma email and would need direct research with MLR and legal.",
      images: [],
    },
    myThoughtProcessSection: {
      eyebrow: "The 6-Step Workflow",
      title: "Walking through ManuscriptRx, screen by screen",
      content:
        "**Step 1 — Content Planning**\nThe workflow opens with a 6-step progress navigator so users always see where they are, what's next, and who owns what. The center panel is a plain-language prompt above filterable brief cards.\n*Design decision:* Brief Creation is locked on purpose — \"Outside pilot scope\" — because the brief already exists upstream. I also surfaced the PromoMats metadata warning rather than hide it, so a manager can see I understood the integration problems, not just the happy path.\n\n**Step 2 — Assemble From Approved Content**\nThe AI owns this step entirely. Left panel: the full manuscript. Right panel: what got pulled automatically — product name verified against brand guidelines, market-specific safety links, unsubscribe block, privacy notice. The human reviews and either approves or requests changes.\n*Design decision:* The two sticky notes about claims libraries and PromoMats image sourcing stay visible. In a real spec, unresolved decisions need to be in the open.\n\n**Step 3 — Iterate / Edit + Quality Checks**\nThe most complex screen, intentionally. Top half: AI Assistant chat on the left, live email preview on the right with modifiable sections in teal and locked compliance sections in grey. Role tabs gate what each person can touch. Bottom half: three QC cards — AI runs an automatic pass/fail (no new claims, language in bounds, accessibility, latest ISI, working unsubscribe), Content Ops reviews it, Med Writer signs off.\n*Design decision:* QC sits inline with editing so issues get caught while the writer is still in the content, not after it's \"done.\"\n\n**Step 5 — Test Email**\nHTML is generated via Knak. The left checklist validates character limits, mobile truncation, hero image size, link resolution, responsive formatting, alt text, tracking tags, and table structure. The right panel renders the email side-by-side in mobile and desktop.\n*Design decision:* The \"Send Preview to Brand Team\" button doesn't appear until the AI checklist passes. A deliberate guardrail, not a technical limitation.\n\n**Step 6 — Pre-MLR RV Package**\nSee \"What I Haven't Solved\" above — flagged here as the open problem rather than buried in the flow.\n\n**How I built the spec**\nI designed every screen in Figma, then used Claude to write a structured Markdown file per screen — purpose, component states, role permissions, AI behavior, edge cases. Those MD files went to the dev team as the build spec. Writing in plain language exposed assumptions wireframes hide.",
      images: [
        {
          src: "/images/emailai-screen1-content-planning.webp",
          alt: "Step 1 — Content Planning: 6-step navigator with Brief Creation locked and Initiate Email Creation active",
        },
        {
          src: "/images/emailai-screen2-assemble.png",
          alt: "Step 2 — Assemble From Approved Content: AI-owned manuscript on the left, market-specific compliance content auto-pulled on the right",
        },
        {
          src: "/images/emailai-screen3-iterate-qc.webp",
          alt: "Step 3 — Iterate / Edit + Quality Checks: AI chat with live email preview on top, three role-owned QC cards on the bottom",
        },
        {
          src: "/images/emailai-screen6-pre-mlr.webp",
          alt: "Step 5 — Test Email: HTML generation and metadata checklist on the left, mobile and desktop email previews on the right",
        },
      ],
    },
    sections: [],
    seoData: {
      image: "/images/email-ai-promo.webp",
      projectName: "ManuscriptRx — AI-Assisted Pharma Email Creation Workflow (Concept)",
      results: [
        "Self-initiated concept project",
        "6-step workflow built around real approval gates",
        "Markdown-spec dev handoff written with Claude",
      ],
      technologies: ["Concept Project", "Enterprise", "Gen AI", "Pharma", "Workflow Design"],
      path: "/project/email-creation-ai",
    },
  },
};

export const getStructuredCaseStudy = (id: string): StructuredCaseStudyData | null => {
  return structuredCaseStudies[id] || null;
};
