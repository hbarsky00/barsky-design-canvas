import React from "react";
import { Zap, BarChart4, XCircle, Sparkles, Settings, Truck, Package, Users, Target, CheckCircle2, AlertTriangle, Rocket, Wrench, Badge, Search, Eye, TrendingUp, Shield, TrendingDown, DollarSign, BookOpen, Lightbulb } from "lucide-react";
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
  researchImages?: { src: string; alt: string; caption?: string; }[];
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
  type?: 'issue' | 'improvement' | 'feature';
}

export interface IdeationIteration {
  label: string;
  imageSrc: string;
  alt: string;
  blurb?: string;
}

export interface IdeationSection {
  subhead: string;
  bubbles: IdeationBubble[];
  iterations: IdeationIteration[];
}

export interface StructuredCaseStudyData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  heroVideo?: {
    src: string;
    poster: string;
    alt: string;
  };
  heroMetrics?: {
    value: string;
    label: string;
  }[];
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
  ideationSection?: IdeationSection;
  myThoughtProcessSection?: {
    eyebrow: string;
    title: string;
    content: string;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
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
    id: "crypto",
    title: "Trading Without Friction: Why Every Crypto App is Designed to Fail (And How I Fixed It)",
    description: "The dirty secret: platforms profit more from your confusion than your success",
    tags: ["Fintech", "Crypto", "Product Design", "Dual-Mode UX"],
    gradientClasses: "from-blue-50 via-indigo-50 to-purple-50",
    heroVideo: {
      src: "/lovable-uploads/crypto-hero.mp4",
      poster: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/crypto/dashboardmobileanddesktopcrypto.jpg",
      alt: "Crypto trading platform overview"
    },
    heroMetrics: [
      { value: "+35%", label: "Onboarding Conversion" },
      { value: "–40%", label: "Time-to-First-Trade" },
      { value: "–45%", label: "Order Errors" },
      { value: "+60%", label: "Retention" }
    ],
    researchSection: {
      subhead: "Uncovering the industry's dirty secrets",
      blurb: "",
      researchImages: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/competetive-2.png",
          alt: "Competitor analysis exposing beginner exploitation"
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/09/cryptotrade_site_map_flowchart_better.png",
          alt: "User Flow Chart for Crypto App",
          caption: "Trading interface serving both pros and beginners"
        }
      ],
      emergingThemes: [
        {
          eyebrow: "BEGINNER EXPLOITATION",
          insight: "\"I tried Coinbase Pro and felt like they wanted me to fail. Like, why would you hide the 'buy' button behind three menus?\" – Alex",
          drove: "Guided mode that educates instead of exploiting"
        },
        {
          eyebrow: "PRO PUNISHMENT", 
          insight: "\"These 'user-friendly' apps are financial torture devices. Every second I wait for their cute animations, I'm losing money.\" – Jordan",
          drove: "Full-featured pro mode without speed penalties"
        },
        {
          eyebrow: "INDUSTRY GASLIGHTING",
          insight: "Platforms profit more from confusion and frustration than they ever would from satisfied users",
          drove: "Dual-mode design proves serving both groups is possible"
        }
      ]
    },
    problemCallout: {
      eyebrow: "Problem",
      statement: "The crypto industry is built on a lie: you must choose between \"easy\" and \"useful.\" This false choice forces beginners into high-fee apps and pros into platform switching. The real problem: platforms profit more from confusion and frustration than they ever would from satisfied users."
    },
    sprintZeroSection: {
      eyebrow: "Sprint Zero",
      title: "Foundation & Principles",
      workshopKickoff: "Challenged every \"rule\" of crypto UX. Asked: why do trading apps look like Bloomberg terminals from 1995? Why do \"simple\" apps treat users like children?",
      explorations: "Sprint Zero / Exploration: Challenged every \"rule\" of crypto UX. Asked: why do trading apps look like Bloomberg terminals from 1995? Why do \"simple\" apps treat users like children?",
      decisionPoint: "Stop accepting industry excuses. Build a platform that proves the false choice is bullshit.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/09/Initial-Flow-of-screens-scaled.png",
          alt: "Initial concepts challenging crypto app conventions",
          caption: "Foundation principles breaking crypto UX conventions"
        },
        {
          src: "https://www.loom.com/share/6b30e410c7394757956b9f6f2d10d10f?sid=75203801-3262-4a46-a502-41a55aa8839c",
          alt: "Decision point video demonstration",
          caption: "Video walkthrough proving the false choice is unnecessary"
        }
      ]
    },
    keyInsights: [
      {
        number: 1,
        title: "The industry gaslights users: \"complexity\" and \"simplicity\" are both monetization tactics",
        description: "Most crypto platforms deliberately choose one audience because it's easier to build and cheaper to maintain. They don't care about actually serving users."
      },
      {
        number: 2,
        title: "Jargon is a weapon: designed to keep beginners dependent",
        description: "By using plain English instead of manipulative terminology, users gained confidence and completion rates increased dramatically."
      },
      {
        number: 3,
        title: "Speed vs. safety is a false choice: good design can provide both",
        description: "Progressive disclosure and unified experience prove you don't have to sacrifice functionality for usability or vice versa."
      }
    ],
    myThoughtProcessSection: {
      eyebrow: "My Thought Process",
      title: "Approach & Decision Making",
      content: "I designed for the uncomfortable truth: crypto platforms are hostile to their users' success. My approach: Progressive disclosure → show complexity when needed, hide it when not. Honest language → plain English instead of manipulative jargon. Unified experience → beginners and pros deserve the same platform.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/09/designthinkingupdate.png",
          alt: "Design thinking process for crypto platform",
          caption: "Thought process focused on exposing industry lies and building honest solutions"
        }
      ]
    },
    ideationSection: {
      subhead: "Destroying Sacred Cows",
      bubbles: [
        {
          title: "Onboarding",
          description: "Stop making people feel stupid"
        },
        {
          title: "Trading",
          description: "Stop forcing a choice between speed and clarity"
        },
        {
          title: "Security",
          description: "Stop using \"theater\" to justify bad UX"
        },
        {
          title: "Education",
          description: "Stop hiding knowledge behind jargon and paywalls"
        }
      ],
      iterations: [
        {
          label: "Landing Page Revolution",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/Buy-and-Sell-Bitcoin-scaled.png",
          alt: "Landing page with honest copy and transparency",
          blurb: "Honest copy, transparency → \"Finally, a crypto app that doesn't treat me like an idiot\""
        },
        {
          label: "Trading Flow Rebellion",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/09/Trading-Crypto-Low-Res.png",
          alt: "Trading interface with no artificial limitations",
          blurb: "No artificial limitations, no speed trade-offs → \"This is what every crypto app should have been\""
        }
      ]
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "Lessons Learned",
      content: "First attempt still felt like \"every other crypto app, just prettier.\" Feedback: brutal but true. Global notifications = noise → replaced with asset-specific alerts. Security theater = frustration → replaced with risk-based authentication. Breakthrough: stop trying to polish bad patterns, start from scratch with user needs.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/Learning.jpg",
          alt: "Learning from failed attempts to polish bad industry patterns",
          caption: "Learning to start from scratch instead of polishing bad patterns"
        }
      ]
    },
    userTestingSection: {
      title: "Proving the Industry Wrong",
      eyebrow: "Validation & Testing",
      description: "Results: 3 min time-to-first-trade (vs 8+ mins competitors). ↓45% order errors. 75% higher trust scores.",
      metrics: [
        { value: "3 min", label: "Time-to-first-trade (vs 8+ competitors)" },
        { value: "↓45%", label: "Order errors" },
        { value: "75%", label: "Higher trust scores" }
      ]
    },
    finalProductSection: {
      title: "The Platform That Shouldn't Exist (According to Industry Logic)",
      description: "A crypto app that commits the ultimate sin: actually helping users. Honest Mode → plain English, no manipulation. Unified Experience → one platform for all. Transparent Everything → fees & risks upfront. Actually Fast → no artificial delays.",
      eyebrow: "The Result",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/Onboarding-Section.png",
          alt: "Finished crypto platform breaking industry conventions",
          caption: "Final platform proving the industry's false choice is unnecessary"
        }
      ]
    },
    outcomeSection: {
      title: "Outcome",
      eyebrow: "Outcomes & Impact",
      description: "User reactions: Alex: \"I can't believe how simple this is when you're not trying to confuse me.\" Jordan: \"Finally, I don't have to choose between speed and helping friends get started.\"",
      metrics: [
        { value: "+35%", label: "Onboarding conversion" },
        { value: "↓40%", label: "Time-to-first-trade" },
        { value: "+60%", label: "Retention" }
      ]
    },
    sections: [],
    seoData: {
      image: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/crypto/dashboardmobileanddesktopcrypto.jpg",
      projectName: "Crypto Trading UX — 35% Higher Conversion by Breaking Industry Lies",
      results: [
        "35% increase in onboarding conversion", 
        "40% reduction in time-to-first-trade",
        "45% reduction in order errors",
        "60% increase in retention"
      ],
      technologies: ["React", "TypeScript", "Node.js", "WebSocket", "REST API"],
      path: "/project/crypto"
    }
  }
};

export const getStructuredCaseStudy = (id: string): StructuredCaseStudyData | undefined => {
  return structuredCaseStudies[id];
};