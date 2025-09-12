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
  },
  "daesearchproject": {
    id: "daesearchproject",
    title: "DAE Search Platform: Making Enterprise Data Actually Findable",
    description: "Redesigned an enterprise search platform that transformed how teams discover and access critical business data, reducing information retrieval time by 65% and delivering 20% ROI through improved productivity.",
    tags: ["Enterprise", "Search", "Data Discovery", "B2B", "Productivity"],
    gradientClasses: "from-blue-50 via-cyan-50 to-indigo-50",
    heroVideo: {
      src: "/lovable-uploads/dae-search-hero.mp4",
      poster: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/daenewnew.png",
      alt: "DAE Search Platform interface overview"
    },
    heroMetrics: [
      { value: "20%", label: "ROI from Better Discovery" },
      { value: "–65%", label: "Information Retrieval Time" },
      { value: "+85%", label: "Search Accuracy" },
      { value: "–40%", label: "Support Tickets" }
    ],
    researchSection: {
      subhead: "Employee interviews revealed critical gaps in enterprise data discovery and access patterns.",
      blurb: "Data silos were costing productivity.",
      emergingThemes: [
        {
          eyebrow: "DISCOVERY BARRIERS",
          insight: "Teams spend 3+ hours daily searching for existing data across disconnected systems.",
          drove: "Unified search interface with intelligent content tagging and federated results."
        },
        {
          eyebrow: "PERMISSION COMPLEXITY",
          insight: "Access control confusion leads to either data hoarding or security breaches.",
          drove: "Visual permission indicators and smart access request workflows."
        },
        {
          eyebrow: "CONTEXT LOSS",
          insight: "Found data lacks business context, making it unusable without tribal knowledge.",
          drove: "Rich metadata display with usage patterns and related content suggestions."
        }
      ],
      researchImages: [
        {
          src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/user%20flow%20process.webp",
          alt: "Information architecture analysis of existing data systems"
        }
      ]
    },
    problemCallout: {
      eyebrow: "Problem",
      statement: "Enterprise teams lose 40% of their productive time hunting for data that already exists. Critical decisions get delayed, projects stall, and knowledge workers become frustrated with disconnected systems that hide rather than reveal insights."
    },
    sprintZeroSection: {
      eyebrow: "Sprint Zero",
      title: "Foundation & Principles",
      workshopKickoff: "1. Search is discovery → results must teach. 2. Context drives confidence → show data lineage and usage. 3. Access is workflow → permissions become pathways, not barriers.",
      explorations: "I designed three search paradigms: Google-like simplicity, database-style filtering, and AI-powered semantic search. User testing revealed the need for a hybrid approach that combines familiar search patterns with enterprise-specific context and intelligence.",
      decisionPoint: "Focus on semantic search with visual data lineage and intelligent permission handling.",
      images: [
        {
          src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/drawingouttheplan.webp",
          alt: "Initial concepts for enterprise search interface design",
          caption: "Foundation principles guiding the enterprise data discovery platform"
        },
        {
          src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/filterselect0.png",
          alt: "Search paradigm exploration and decision framework",
          caption: "Comparative analysis of search approaches for enterprise data discovery"
        }
      ]
    },
    keyInsights: [
      {
        number: 1,
        title: "Semantic search changed everything",
        description: "Moving beyond keyword matching to intent understanding increased relevant results by 85% and reduced refinement queries by 70%."
      },
      {
        number: 2,
        title: "Visual permission indicators build confidence",
        description: "Showing access status and request pathways upfront eliminated 60% of support tickets about data access and improved user autonomy."
      },
      {
        number: 3,
        title: "Context beats features",
        description: "Users needed to understand data lineage and usage patterns more than advanced filter options. Rich metadata increased data utilization by 40%."
      }
    ],
    ideationSection: {
      subhead: "Building intelligence into enterprise search",
      bubbles: [
        {
          title: "Smart Search",
          description: "Semantic understanding beyond keywords"
        },
        {
          title: "Access Intelligence",
          description: "Visual permission status and request flows"
        },
        {
          title: "Context Rich",
          description: "Data lineage and usage patterns"
        },
        {
          title: "Federated Results",
          description: "Unified view across disconnected systems"
        }
      ],
      iterations: [
        {
          label: "Search Interface Evolution",
          imageSrc: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/searchresultswithfilters.png",
          alt: "Enterprise search interface with semantic results and intelligent filtering",
          blurb: "Semantic search with rich context and intelligent access controls"
        },
        {
          label: "Data Discovery Flow",
          imageSrc: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/daenewnew.png",
          alt: "Complete data discovery workflow with visual permission indicators",
          blurb: "End-to-end discovery workflow that guides users to relevant, accessible data"
        }
      ]
    },
    userTestingSection: {
      title: "Validating enterprise search improvements",
      description: "Testing with knowledge workers across departments confirmed that semantic search combined with visual permission indicators dramatically improved both discovery speed and data utilization confidence.",
      eyebrow: "Validation & Testing",
      metrics: [
        { value: "↓65%", label: "Information retrieval time" },
        { value: "+85%", label: "Search result relevance" },
        { value: "↓60%", label: "Access-related support tickets" }
      ]
    },
    finalProductSection: {
      title: "Enterprise search that actually works",
      description: "Delivered a platform that transforms enterprise data discovery from a frustrating treasure hunt into an intelligent, guided experience. Teams find what they need quickly, understand what they can access, and gain confidence in their data-driven decisions.",
      eyebrow: "The Solution",
      images: [
        {
          src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/daenewnew.png",
          alt: "Complete DAE search platform interface",
          caption: "Enterprise search platform with semantic intelligence and visual access controls"
        }
      ]
    },
    outcomeSection: {
      title: "Transforming enterprise productivity",
      description: "The platform delivered measurable ROI through improved data discovery and reduced time-to-insight. Teams report higher confidence in their decisions and significantly less frustration with internal systems.",
      eyebrow: "Outcomes & Impact",
      metrics: [
        { value: "20%", label: "ROI from improved productivity" },
        { value: "↓65%", label: "Information retrieval time" },
        { value: "+85%", label: "Search accuracy" },
        { value: "↓40%", label: "Support tickets" }
      ]
    },
    sections: [],
    seoData: {
      image: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/daenewnew.png",
      projectName: "DAE Search Platform — 20% ROI Through Enterprise Data Discovery | Hiram Barsky",
      results: [
        "20% ROI from improved productivity",
        "65% reduction in information retrieval time",
        "85% increase in search accuracy",
        "40% reduction in support tickets"
      ],
      technologies: ["Enterprise Search", "Data Discovery", "Semantic Search", "Access Control"],
      path: "/project/daesearchproject"
    }
  },
  "business-management": {
    id: "business-management",
    title: "SplitTime: How Design Psychology Reduced Co-Parenting Conflict by 40%",
    description: "A family communication platform designed around conflict reduction, not feature complexity. How I used neutral design patterns to help divorced families coordinate better.",
    tags: ["Family Tech", "Communication", "Conflict Resolution", "Mobile App"],
    gradientClasses: "from-purple-50 via-pink-50 to-rose-50",
    heroVideo: {
      src: "/lovable-uploads/splittime-hero.mp4",
      poster: "https://barskyux.com/wp-content/uploads/2025/08/studiodisplaynewlook.png",
      alt: "SplitTime family coordination platform overview"
    },
    heroMetrics: [
      { value: "40%", label: "Conflict Reduction" },
      { value: "90%", label: "User Satisfaction" },
      { value: "24hr", label: "Average Response Time" },
      { value: "+65%", label: "Coordination Efficiency" }
    ],
    researchSection: {
      subhead: "Understanding the emotional complexity of co-parenting communication",
      blurb: "How design can reduce conflict instead of creating it.",
      emergingThemes: [
        {
          eyebrow: "COMMUNICATION BREAKDOWN",
          insight: "Text messages escalate quickly when emotions run high. Parents need structured, neutral ways to coordinate.",
          drove: "Message templates and neutral language suggestions to prevent escalation."
        },
        {
          eyebrow: "SCHEDULE CONFUSION",
          insight: "\"Who has the kids when?\" becomes a source of constant conflict when information isn't shared clearly.",
          drove: "Visual calendar with clear custody periods and automatic notifications."
        },
        {
          eyebrow: "FINANCIAL TRANSPARENCY",
          insight: "Expense disputes happen when spending isn't documented or shared appropriately.",
          drove: "Receipt uploads and automatic expense splitting with transparent documentation."
        }
      ],
      researchImages: [
        {
          src: "https://barskyux.com/wp-content/uploads/2016/08/initial_research_design-800x633.png",
          alt: "Research findings on co-parenting communication pain points"
        }
      ]
    },
    problemCallout: {
      eyebrow: "Problem",
      statement: "Divorced parents need to coordinate schedules, expenses, and communication for their children, but existing tools either ignore the emotional complexity or make conflict worse. Most co-parenting apps focus on features instead of the fundamental challenge: reducing conflict while maintaining effective coordination."
    },
    sprintZeroSection: {
      eyebrow: "Sprint Zero",
      title: "Foundation & Principles",
      workshopKickoff: "1. Neutral by design → prevent escalation through interface choices. 2. Transparency builds trust → both parents see the same information. 3. Structure reduces emotion → guided flows instead of open-ended conflict.",
      explorations: "I explored three approaches: messenger-style communication, calendar-focused coordination, and document-centered organization. Research showed the need for all three, but with neutral design patterns that discourage emotional escalation.",
      decisionPoint: "Focus on conflict reduction through neutral design language, visual clarity, and structured communication patterns.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2016/08/ideation_phase_design.png",
          alt: "Initial concepts for neutral co-parenting interface design",
          caption: "Foundation principles focused on conflict reduction through design psychology"
        }
      ]
    },
    keyInsights: [
      {
        number: 1,
        title: "Neutral design prevents escalation",
        description: "Interface choices like color, language, and interaction patterns can either escalate or de-escalate emotional situations. Neutral design reduced conflict incidents by 40%."
      },
      {
        number: 2,
        title: "Transparency builds co-parenting trust",
        description: "When both parents see identical information and have equal access to schedules and expenses, 'he said, she said' conflicts disappear."
      },
      {
        number: 3,
        title: "Structure beats freedom in high-emotion contexts",
        description: "Guided communication templates and structured data entry prevent the kind of open-ended interactions that often lead to conflict."
      }
    ],
    ideationSection: {
      subhead: "Designing for emotional intelligence",
      bubbles: [
        {
          title: "Neutral Messaging",
          description: "Templates and suggestions that prevent escalation"
        },
        {
          title: "Visual Scheduling",
          description: "Clear custody periods and shared calendars"
        },
        {
          title: "Expense Transparency",
          description: "Receipt uploads and automatic splitting"
        },
        {
          title: "Document Sharing",
          description: "Centralized access to important child information"
        }
      ],
      iterations: [
        {
          label: "Communication Design",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/6.Messages.png",
          alt: "Neutral messaging interface designed to reduce conflict",
          blurb: "Messaging system with neutral design patterns and conflict-reduction features"
        },
        {
          label: "Schedule Coordination",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/3.calendar.png",
          alt: "Visual calendar with clear custody periods and shared access",
          blurb: "Shared calendar that eliminates scheduling confusion and 'he said, she said' conflicts"
        }
      ]
    },
    myThoughtProcessSection: {
      eyebrow: "My Thought Process",
      title: "Approach & Decision Making",
      content: "I designed around conflict reduction first, using neutral language and clear boundaries. Many co-parenting apps miss the mark by focusing on features instead of how people feel. I built SplitTime to reduce conflict first, using neutral language, clear boundaries, and shared accountability. The result: 40% less co-parenting conflict through a platform that helps families communicate better—not just stay organized.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2016/08/ideation_phase_design.png",
          alt: "Splittime user satisfaction metrics and communication improvements",
          caption: "Ideation phase explorations mapping Splittime's core user flows and interaction patterns."
        }
      ]
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "Learning from Setbacks",
      content: "At first, I added too many features to the scheduling interface, which overwhelmed users. I learned to focus on the basics and add advanced features slowly, based on what users needed.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2024/01/Screenshot-2025-05-03-at-10.10.22%E2%80%AFPM-e1748480830908.png",
          alt: "Early Splittime interface with feature overload",
          caption: "Early design attempts included too many features, overwhelming stressed co-parents"
        }
      ]
    },
    userTestingSection: {
      title: "Testing with real families",
      description: "Testing with divorced parents confirmed that neutral design patterns and structured communication significantly reduced conflict while improving coordination effectiveness.",
      eyebrow: "Validation & Testing",
      metrics: [
        { value: "↓40%", label: "Conflict incidents" },
        { value: "90%", label: "User satisfaction" },
        { value: "+65%", label: "Coordination efficiency" }
      ]
    },
    finalProductSection: {
      title: "A platform that helps families heal",
      description: "SplitTime provides the structure and neutrality that co-parents need to coordinate effectively without emotional escalation. By focusing on conflict reduction rather than feature complexity, it helps families build healthier post-divorce relationships.",
      eyebrow: "The Solution",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/studiodisplaynewlook.png",
          alt: "Complete SplitTime platform interface",
          caption: "Family coordination platform with conflict-reduction design patterns"
        }
      ]
    },
    outcomeSection: {
      title: "Healing families through better design",
      description: "SplitTime changed the way separated families communicate and work together. It helped build healthier relationships and led to better outcomes for children.",
      eyebrow: "Outcomes & Impact",
      metrics: [
        { value: "40%", label: "Conflict Reduction" },
        { value: "90%", label: "User Satisfaction" },
        { value: "24hr", label: "Response Time" }
      ]
    },
    sections: [],
    seoData: {
      image: "https://barskyux.com/wp-content/uploads/2025/08/studiodisplaynewlook.png",
      projectName: "Splittime App",
      results: ["Reduced stress and conflict", "Improved coordination and transparency"],
      technologies: ["iOS", "Android", "WebApp"],
      path: "/project/business-management"
    }
  },
  "investor-loan-app": {
    id: "investor-loan-app",
    title: "Redesigning Loans: 85% Fewer Errors, 40% Faster",
    description: "How I led a banking platform redesign that replaced Excel and scaled operations with speed, accuracy, and trust.",
    tags: ["FinTech", "Analytics", "WebApp"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    heroVideo: {
      src: "investor-loan-demo.mp4",
      poster: "https://barskyux.com/wp-content/uploads/2025/08/analysisdashboard-1.png",
      alt: "Investor loan platform dashboard"
    },
    researchSection: {
      subhead: "Digging into the pain points",
      blurb: "Why Excel was breaking loan operations",
      emergingThemes: [
        {
          eyebrow: "ACCURACY & AUDIT",
          insight: "Copy/paste errors and unclear totals created compliance risk.",
          drove: "Inline validation, calculated totals, and immutable change history."
        },
        {
          eyebrow: "FINDABILITY",
          insight: "Officers struggled to locate deals/borrowers across files.",
          drove: "Predictive, category-aware search with contextual filters."
        },
        {
          eyebrow: "GUIDED ORDERS",
          insight: "Flat forms caused premature inputs and rework.",
          drove: "Stepwise flows with disabled actions until lender selection, plus real-time feedback."
        }
      ],
      researchImages: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/excelterror.jpg",
          alt: "Excel-based loan tracking spreadsheet with inconsistent fields and manual totals"
        }
      ]
    },
    problemCallout: {
      eyebrow: "The critical challenge",
      statement: "Compliance risks hidden in spreadsheets: Loan teams were managing multi-million-dollar deals in fragile spreadsheets, with no audit trail or validation. Errors slipped through, reconciliation was manual, and regulators had no trustworthy data to review."
    },
    sprintZeroSection: {
      eyebrow: "Sprint Zero",
      title: "Blue-Sky Thinking",
      workshopKickoff: "I mapped the loan lifecycle end-to-end: intake → lender selection → approval → booking → audit. Early sketches explored validation gates before submission, guided steps for loan officers, and real-time totals and audit history.",
      explorations: "Early exploration of loan processing workflows and automated validation concepts.",
      decisionPoint: "The data showed most errors stemmed from missing validation and flat forms. I focused on building an intelligent workflow system—automation, checks, and audit trails—instead of adding unnecessary financial modeling.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2023/12/BookBuilder-Low-Fidelity.png",
          alt: "Low-fidelity order builder wireframe for loan workflows",
          caption: ""
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2023/12/whiteboarding.png",
          alt: "Whiteboard mapping of loan lifecycle from application to audit",
          caption: ""
        }
      ]
    },
    keyInsights: [
      { number: 1, title: "Trust through validation", description: "Real-time checks prevent costly errors." },
      { number: 2, title: "Predictive findability", description: "Bloomberg-style search beats filter hell." },
      { number: 3, title: "Guided orders", description: "Stepwise flows reduce mistakes vs. flat forms." }
    ],
    ideationSection: {
      subhead: "Exploring solutions: Designing the building blocks of trust",
      bubbles: [
        { title: "Deal summary", description: "Clear status, limits, and totals" },
        { title: "Predictive search", description: "Context-aware, smart defaults" },
        { title: "Order builder", description: "Guided steps, fewer errors" },
        { title: "Audit & comments", description: "Full history with collaboration" }
      ],
      iterations: [
        { 
          label: "Iteration 1", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2023/12/Orderbook-ViewAddOrderDefault.png", 
          alt: "Early orderbook view with Add Order entry point and sparse validation",
          blurb: "Sparse validation, unclear priorities"
        },
        { 
          label: "Iteration 2", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2023/12/Add-Order-Default.png", 
          alt: "Add Order default form with clearer required fields and disabled actions",
          blurb: "Required fields, disabled submit until ready"
        },
        { 
          label: "Iteration 3", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2023/12/Loan-Central-Orderbook-View.png", 
          alt: "Orderbook overview with real-time totals and status cues",
          blurb: "Real-time totals and inline validation states"
        },
        { 
          label: "Iteration 4", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/uxpilot-design-1756062219098-scaled.png", 
          alt: "High-fidelity UI showing guided steps and validation feedback",
          blurb: "High-fidelity guided steps with audit integration"
        }
      ]
    },
    userTestingSection: {
      title: "Testing with real loan officers",
      description: "Testing validated that automation and audit trails significantly improved both speed and compliance.",
      eyebrow: "Proving it out",
      metrics: [
        { value: "95%", label: "Task Completion" },
        { value: "85%", label: "Error Reduction" },
        { value: "60s", label: "Avg. Search Time" }
      ],
      images: [
        {
          src: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
          alt: "User testing session showing loan officer workflow validation",
          caption: "Testing sessions confirmed my automated validation approach significantly reduced processing errors."
        }
      ]
    },
    finalProductSection: {
      title: "From error-prone spreadsheets to reliable workflows",
      description: "We delivered a platform that replaced Excel chaos with guided workflows, real-time checks, and transparent audit trails. Officers gained confidence, regulators gained visibility, and the bank scaled with accuracy.",
      eyebrow: "The solution in action",
      video: {
        src: "https://www.loom.com/share/a47f20680a16435cab9e90521383bfc6?sid=6eed1d9d-f571-4f4b-aa38-f40267e710d0",
        title: "Investor loan platform demo",
        caption: "Complete loan management platform with automated workflows and real-time validation"
      },
      images: [
        {
          src: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
          alt: "Investor loan platform dashboard final interface",
          caption: "Complete loan management platform with automated workflows and real-time validation"
        }
      ]
    },
    outcomeSection: {
      title: "Outcome",
      description: "The platform transformed loan operations from error-prone manual processes to reliable automated workflows. Loan officers gained confidence, compliance improved dramatically, and the bank scaled operations without sacrificing accuracy.",
      eyebrow: "OUTCOMES & IMPACT",
      metrics: [
        { value: "85%", label: "Error Reduction" },
        { value: "40%", label: "Faster Processing" },
        { value: "100%", label: "Audit Compliance" },
        { value: "95%", label: "User Adoption" }
      ]
    },
    sections: [],
    seoData: {
      image: "https://barskyux.com/wp-content/uploads/2025/08/analysisdashboard-1.png",
      projectName: "Investor Loan Platform — 85% Error Reduction Through Automated Workflows | Hiram Barsky",
      results: [
        "85% reduction in processing errors",
        "40% faster loan processing",
        "100% audit compliance",
        "95% user adoption rate"
      ],
      technologies: ["FinTech", "Workflow Automation", "Banking Systems", "Compliance"],
      path: "/project/investor-loan-app"
    }
  },
  "herbalink": {
    id: "herbalink",
    title: "Herbalink: Building Trust in Herbal Supplement Discovery",
    description: "How I designed a platform that connects consumers with trusted herbal supplement information, reducing research time by 60% while building confidence in natural health decisions.",
    tags: ["Health Tech", "E-commerce", "Product Discovery", "Trust & Safety"],
    gradientClasses: "from-green-50 via-emerald-50 to-lime-50",
    heroVideo: {
      src: "/lovable-uploads/herbalink-hero.mp4",
      poster: "https://barskyux.com/wp-content/uploads/2025/08/herbalinkproductshot.png",
      alt: "Herbalink herbal supplement discovery platform"
    },
    heroMetrics: [
      { value: "↓60%", label: "Research Time" },
      { value: "+75%", label: "Purchase Confidence" },
      { value: "90%", label: "Information Accuracy" },
      { value: "+40%", label: "User Engagement" }
    ],
    researchSection: {
      subhead: "Understanding consumer challenges in herbal supplement research",
      blurb: "Building trust in a market full of misinformation.",
      emergingThemes: [
        {
          eyebrow: "INFORMATION OVERLOAD",
          insight: "Consumers spend hours researching supplements across multiple unreliable sources, often finding conflicting information.",
          drove: "Curated, expert-verified information architecture with clear source attribution."
        },
        {
          eyebrow: "TRUST DEFICIT",
          insight: "People struggle to distinguish between marketing claims and scientific evidence in supplement research.",
          drove: "Evidence-based rating system with transparent methodology and expert review."
        },
        {
          eyebrow: "DECISION PARALYSIS",
          insight: "Too many options and unclear comparisons prevent people from making confident purchase decisions.",
          drove: "Guided discovery flow with personalized recommendations and clear comparison tools."
        }
      ],
      researchImages: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/suppresearch.jpg",
          alt: "User research session showing supplement research frustrations and pain points"
        }
      ]
    },
    problemCallout: {
      eyebrow: "Problem",
      statement: "The herbal supplement market is flooded with misinformation, conflicting claims, and unverified products. Consumers need hours to research basic questions about safety, efficacy, and quality, often ending up more confused than when they started."
    },
    sprintZeroSection: {
      eyebrow: "Sprint Zero",
      title: "Foundation & Principles",
      workshopKickoff: "1. Trust through transparency → show sources and methodology. 2. Guided discovery → help users find what they need without overwhelm. 3. Evidence-based → separate marketing from science.",
      explorations: "I explored three approaches: encyclopedia-style information organization, e-commerce-focused product discovery, and expert-guided recommendation engine. Research showed the need for a hybrid that combines trusted information with practical purchasing guidance.",
      decisionPoint: "Focus on building trust through expert curation while maintaining practical usability for everyday consumers.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/herbalinitialconcepts.jpg",
          alt: "Initial concepts for herbal supplement information architecture",
          caption: "Foundation principles focused on trust-building through expert curation and transparency"
        }
      ]
    },
    keyInsights: [
      {
        number: 1,
        title: "Transparency builds trust in health decisions",
        description: "Showing expert credentials, source citations, and review methodology increased user confidence by 75% compared to traditional supplement sites."
      },
      {
        number: 2,
        title: "Guided discovery prevents overwhelm",
        description: "Structured flows that ask about goals and preferences before showing options reduced decision paralysis and increased conversion by 45%."
      },
      {
        number: 3,
        title: "Evidence separation clarifies choices",
        description: "Clearly distinguishing between traditional use, preliminary research, and proven benefits helped users make informed decisions based on their risk tolerance."
      }
    ],
    ideationSection: {
      subhead: "Designing for health decision confidence",
      bubbles: [
        {
          title: "Expert Curation",
          description: "Verified information from qualified professionals"
        },
        {
          title: "Evidence Levels",
          description: "Clear distinction between traditional use and proven benefits"
        },
        {
          title: "Guided Discovery",
          description: "Personalized recommendations based on health goals"
        },
        {
          title: "Safety First",
          description: "Interaction warnings and contraindication alerts"
        }
      ],
      iterations: [
        {
          label: "Information Architecture",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/herbalinkinfosystem.png",
          alt: "Information organization system with expert verification and evidence levels",
          blurb: "Expert-curated information system with clear evidence hierarchy and source attribution"
        },
        {
          label: "Discovery Experience",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/herbalinkproductshot.png",
          alt: "Guided supplement discovery flow with personalized recommendations",
          blurb: "Personalized discovery experience that guides users to appropriate supplements based on their goals"
        }
      ]
    },
    userTestingSection: {
      title: "Validating trust and usability",
      description: "Testing with health-conscious consumers confirmed that expert curation and transparent methodology significantly improved both trust and decision-making speed.",
      eyebrow: "Validation & Testing",
      metrics: [
        { value: "↓60%", label: "Time to decision" },
        { value: "+75%", label: "Purchase confidence" },
        { value: "+85%", label: "Information trust score" }
      ]
    },
    finalProductSection: {
      title: "Trusted supplement discovery that actually helps",
      description: "Herbalink provides the expert guidance and transparent information that consumers need to make confident herbal supplement decisions, without the marketing noise and misinformation that plague the industry.",
      eyebrow: "The Solution",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/herbalinkproductshot.png",
          alt: "Complete Herbalink platform interface",
          caption: "Herbal supplement discovery platform with expert curation and evidence-based recommendations"
        }
      ]
    },
    outcomeSection: {
      title: "Building consumer confidence in natural health",
      description: "Herbalink transformed how people research and purchase herbal supplements, providing the trust and clarity needed to make informed health decisions in a confusing market.",
      eyebrow: "Outcomes & Impact",
      metrics: [
        { value: "↓60%", label: "Research Time" },
        { value: "+75%", label: "Purchase Confidence" },
        { value: "90%", label: "Information Accuracy" },
        { value: "+40%", label: "User Engagement" }
      ]
    },
    sections: [],
    seoData: {
      image: "https://barskyux.com/wp-content/uploads/2025/08/herbalinkproductshot.png",
      projectName: "Herbalink — Building Trust in Herbal Supplement Discovery | Hiram Barsky",
      results: [
        "60% reduction in research time",
        "75% increase in purchase confidence", 
        "90% information accuracy score",
        "40% increase in user engagement"
      ],
      technologies: ["Health Tech", "Product Discovery", "Expert Curation", "Trust & Safety"],
      path: "/project/herbalink"
    }
  },
  "barskyjoint": {
    id: "barskyjoint",
    title: "BarskyJoint: Dual-Format Ordering That Increased Ticket Size 28%",
    description: "How I designed a restaurant ordering platform that serves both speed-focused customers and detail-oriented customizers, boosting revenue while improving satisfaction.",
    tags: ["Restaurant Tech", "Food Service", "Ordering", "Dual-Mode UX"],
    gradientClasses: "from-orange-50 via-amber-50 to-yellow-50",
    heroVideo: {
      src: "/lovable-uploads/barskyjoint-hero.mp4",
      poster: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
      alt: "BarskyJoint restaurant ordering platform"
    },
    heroMetrics: [
      { value: "+28%", label: "Average Ticket Size" },
      { value: "↓35%", label: "Order Completion Time" },
      { value: "↓60%", label: "Customization Errors" },
      { value: "85%", label: "Customer Preference vs Competitors" }
    ],
    researchSection: {
      subhead: "Understanding diverse ordering preferences in restaurant environments",
      blurb: "Why one-size-fits-all ordering fails both customers and restaurants.",
      emergingThemes: [
        {
          eyebrow: "SPEED vs CUSTOMIZATION",
          insight: "Fast customers get frustrated by detailed customization flows, while detail-oriented customers feel rushed by quick ordering systems.",
          drove: "Dual-mode interface that adapts to customer ordering style and context."
        },
        {
          eyebrow: "COGNITIVE LOAD",
          insight: "Decision fatigue from too many choices upfront leads to order abandonment and dissatisfaction.",
          drove: "Progressive disclosure with smart defaults and 'expand if needed' customization."
        },
        {
          eyebrow: "PLATFORM PARITY",
          insight: "Customers expect consistent experience whether ordering on kiosk, mobile, or web.",
          drove: "Unified design system that works across all ordering touchpoints."
        }
      ],
      researchImages: [
        {
          src: "/lovable-uploads/92026191-54bd-457b-9a0d-1a7bd591a2a5.png",
          alt: "Restaurant ordering research showing customer frustration with current systems"
        }
      ]
    },
    problemCallout: {
      eyebrow: "Problem", 
      statement: "Restaurant ordering systems force customers into one experience: either oversimplified (frustrating for customizers) or overcomplicated (overwhelming for speed-focused diners). This false choice hurts both customer satisfaction and restaurant revenue."
    },
    sprintZeroSection: {
      eyebrow: "Sprint Zero",
      title: "Foundation & Principles", 
      workshopKickoff: "1. Adapt to intent → detect and serve ordering style. 2. Progressive disclosure → show complexity when wanted. 3. Platform consistency → same experience across kiosk, mobile, web.",
      explorations: "I explored three ordering paradigms: quick-service speed ordering, full-service customization, and adaptive hybrid flows. Research revealed that context and customer intent could be detected early to provide the right experience.",
      decisionPoint: "Build dual-mode ordering that detects customer intent and adapts the interface complexity accordingly.",
      images: [
        {
          src: "/lovable-uploads/2c2d5cc4-b820-4d42-8470-4b3147ed61be.png",
          alt: "Initial concepts for adaptive restaurant ordering interface",
          caption: "Foundation principles for dual-mode ordering that adapts to customer preferences"
        }
      ]
    },
    keyInsights: [
      {
        number: 1,
        title: "Customer intent can be detected early",
        description: "Simple behavioral cues (time spent, interaction patterns) allow the system to adapt the ordering flow to match customer preferences."
      },
      {
        number: 2,
        title: "Smart defaults reduce decision fatigue",
        description: "Providing sensible defaults with easy customization options increased order completion while reducing cognitive load."
      },
      {
        number: 3,
        title: "Platform parity builds trust",
        description: "Consistent experience across kiosk, mobile, and web increased customer confidence and reduced support issues."
      }
    ],
    ideationSection: {
      subhead: "Designing for different ordering personalities",
      bubbles: [
        {
          title: "Speed Mode",
          description: "Quick ordering with minimal friction"
        },
        {
          title: "Custom Mode", 
          description: "Detailed customization for particular customers"
        },
        {
          title: "Smart Defaults",
          description: "Sensible choices that can be easily modified"
        },
        {
          title: "Upsell Intelligence",
          description: "Contextual suggestions that increase ticket size"
        }
      ],
      iterations: [
        {
          label: "Adaptive Interface",
          imageSrc: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
          alt: "Dual-mode ordering interface that adapts to customer behavior",
          blurb: "Ordering system that detects customer intent and adapts complexity accordingly"
        },
        {
          label: "Customization Flow",
          imageSrc: "/lovable-uploads/92026191-54bd-457b-9a0d-1a7bd591a2a5.png",
          alt: "Progressive disclosure customization system for detail-oriented customers",
          blurb: "Progressive customization that prevents choice overload while enabling detailed preferences"
        }
      ]
    },
    myThoughtProcessSection: {
      eyebrow: "My Thought Process",
      title: "Approach & Decision Making",
      content: "The key was designing for speed + confidence. Progressive disclosure let customers see essentials first, then dive into details if they wanted. And platform parity meant whether ordering on kiosk or web, the experience felt familiar.",
      images: [
        {
          src: "/lovable-uploads/2c2d5cc4-b820-4d42-8470-4b3147ed61be.png",
          alt: "Restaurant ordering design thinking process",
          caption: "Design process visualization showing decision points for restaurant ordering platform"
        }
      ]
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "Lessons Learned",
      content: "At first, showing every customization upfront created choice paralysis and higher abandonment. Moving to defaults + \"expand if needed\" dramatically improved completion and satisfaction.",
      images: [
        {
          src: "/lovable-uploads/92026191-54bd-457b-9a0d-1a7bd591a2a5.png",
          alt: "Early restaurant ordering interface with too many options",
          caption: "Early designs that overwhelmed customers with choices"
        }
      ]
    },
    userTestingSection: {
      title: "Prototype Testing",
      eyebrow: "Validation & Testing",
      description: "Results:\n• ↓35% order completion time\n• ↓60% customization errors\n• 85% customer preference over competitor systems",
      metrics: [
        { value: "↓35%", label: "order completion time" },
        { value: "↓60%", label: "customization errors" },
        { value: "85%", label: "customer preference" }
      ]
    },
    outcomeSection: {
      title: "Outcome",
      eyebrow: "Outcomes & Impact",
      description: "The dual-format design improved both revenue and customer experience:\n\n• +28% average ticket size\n• ↓35% order completion time\n• ↓60% customization errors\n• 85% of customers said they preferred it to other systems",
      metrics: [
        { value: "+28%", label: "average ticket size" },
        { value: "↓35%", label: "order completion time" },
        { value: "↓60%", label: "customization errors" },
        { value: "85%", label: "customer preference" }
      ]
    },
    sections: [],
    seoData: {
      image: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
      projectName: "BarskyJoint — 28% Higher Average Ticket Size with Dual-Format Ordering | Hiram Barsky",
      results: [
        "+28% average ticket size",
        "↓35% order completion time",
        "↓60% customization errors",
        "85% customer preference"
      ],
      technologies: ["Restaurant Tech", "Food Service", "Kiosk Design", "Product Design"],
      path: "/project/barskyjoint"
    }
  }
};

export const getStructuredCaseStudy = (id: string): StructuredCaseStudyData | null => {
  return structuredCaseStudies[id] || null;
};