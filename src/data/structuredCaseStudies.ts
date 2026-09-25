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
      eyebrow: "My Thought Process",
      title: "Approach & Decision Making",
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
    title: "DAE Search Platform: Making Enterprise Data Actually Findable",
    description:
      "Redesigned an enterprise search platform that transformed how teams discover and access critical business data, reducing information retrieval time by 65% and delivering 20% ROI through improved productivity.",
    tags: ["Enterprise", "Search", "Data Discovery", "B2B", "Productivity"],
    techStack: {
      aiTools: ["GPT-4", "Semantic Search AI"],
      devStack: ["React", "ElasticSearch", "Python"],
      designTools: ["Figma", "Auto-Layout"],
    },
    gradientClasses: "from-blue-50 via-cyan-50 to-indigo-50",
    heroImage: {
      src: "/images/dae-search/hero.webp",
      alt: "DAE Search Platform interface overview",
    },
    heroMetrics: [
      { value: "20%", label: "ROI from Better Discovery" },
      { value: "–65%", label: "Information Retrieval Time" },
      { value: "+85%", label: "Search Accuracy" },
      { value: "–40%", label: "Support Tickets" },
    ],
    researchSection: {
      subhead: "Employee interviews revealed critical gaps in enterprise data discovery and access patterns.",
      blurb: "Data silos were costing productivity.",
      emergingThemes: [
        {
          eyebrow: "DISCOVERY BARRIERS",
          insight: "Teams spend 3+ hours daily searching for existing data across disconnected systems.",
          drove: "Unified search interface with intelligent content tagging and federated results.",
        },
        {
          eyebrow: "PERMISSION COMPLEXITY",
          insight: "Access control confusion leads to either data hoarding or security breaches.",
          drove: "Visual permission indicators and smart access request workflows.",
        },
        {
          eyebrow: "CONTEXT LOSS",
          insight: "Found data lacks business context, making it unusable without tribal knowledge.",
          drove: "Rich metadata display with usage patterns and related content suggestions.",
        },
      ],
      researchImages: [
        {
          src: "/images/dae-search/what-i-built.webp",
          alt: "Information architecture analysis of existing data systems",
        },
      ],
    },
    problemCallout: {
      eyebrow: "Problem",
      statement:
        "Enterprise teams lose 40% of their productive time hunting for data that already exists. Critical decisions get delayed, projects stall, and knowledge workers become frustrated with disconnected systems that hide rather than reveal insights.",
    },
    sprintZeroSection: {
      eyebrow: "Sprint Zero",
      title: "Foundation & Principles",
      workshopKickoff:
        "1. Search is discovery → results must teach. 2. Context drives confidence → show data lineage and usage. 3. Access is workflow → permissions become pathways, not barriers.",
      explorations:
        "I designed three search paradigms: Google-like simplicity, database-style filtering, and AI-powered semantic search. User testing revealed the need for a hybrid approach that combines familiar search patterns with enterprise-specific context and intelligence.",
      decisionPoint: "Focus on semantic search with visual data lineage and intelligent permission handling.",
      images: [
        {
          src: "/images/dae-search/decisions-1.webp",
          alt: "Initial concepts for enterprise search interface design",
          caption: "Foundation principles guiding the enterprise data discovery platform",
        },
        {
          src: "/images/dae-search/decisions-2.webp",
          alt: "Search paradigm exploration and decision framework",
          caption: "Comparative analysis of search approaches for enterprise data discovery",
        },
      ],
    },
    keyInsights: [
      {
        number: 1,
        title: "Semantic search changed everything",
        description:
          "Moving beyond keyword matching to intent understanding increased relevant results by 85% and reduced refinement queries by 70%.",
        images: [
          {
            src: "/images/dae-search/style-guide.webp",
            alt: "DAE project style guide showing design system, colors, typography, and component specifications",
            caption: "Design system and style guide for the DAE search platform",
          },
        ],
      },
      {
        number: 2,
        title: "Visual data lineage built trust",
        description:
          "Showing data sources, freshness, and transformation history gave users confidence to act on search results immediately.",
      },
      {
        number: 3,
        title: "Smart permissions reduced friction",
        description:
          "Proactive access suggestions and one-click request workflows turned permission barriers into guided pathways.",
      },
    ],
    // ideationSection removed to hide images
    myThoughtProcessSection: {
      eyebrow: "My Thought Process",
      title: "",
      content:
        "Enterprise search isn't just finding files—it's understanding business context. I designed for the moment when someone needs to make a decision with incomplete information. The interface needed to bridge the gap between data discovery and business insight, making every search result a learning opportunity.",
      video: {
        src: "https://www.loom.com/share/d11e52c85a1c48b181a5b23290321195?sid=1b805134-722d-4f63-a94b-42409f866a38",
        title: "DAE Search Platform Demo",
        caption:
          "Live demonstration of the enterprise search platform showing semantic search and data lineage features",
      },
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "",
      content:
        "Early versions tried to replicate consumer search patterns, but enterprise users needed more structure and context. A flat results list confused users who needed to understand data quality and permissions upfront. We also learned that auto-complete suggestions backfired when they exposed restricted content, creating security concerns.",
      images: [
        {
          src: "/images/dae-search/the-problem.webp",
          alt: "Learning from design iterations that didn't meet enterprise needs",
          caption: "Learning from design iterations that didn't meet enterprise user requirements",
        },
      ],
    },
    userTestingSection: {
      title: "Validation & Testing",
      eyebrow: "Testing",
      video: {
        src: "/images/dae-search/advanced-search.mp4",
        title: "Advanced Search Validation Testing",
        caption: "Demonstration of the advanced search functionality during user testing",
      },
      description:
        "Prototype sessions with enterprise teams showed: Information retrieval time ↓ to 5 minutes (vs 15+ previously). Search accuracy ↑ 85%. 90% of users found the data lineage visualization valuable for decision-making.",
      metrics: [
        { value: "5 min", label: "Avg. retrieval time" },
        { value: "↑85%", label: "Search accuracy" },
        { value: "90%", label: "Found lineage valuable" },
      ],
    },
    outcomeSection: {
      title: "Outcome & Impact",
      eyebrow: "Results",
      description:
        "The platform transformed enterprise data discovery from a daily frustration into a competitive advantage, delivering measurable ROI through improved productivity and decision-making speed.",
      metrics: [
        { value: "20%", label: "ROI from better discovery" },
        { value: "↓65%", label: "Information retrieval time" },
      ],
    },
    sections: [],
    seoData: {
      image: "/images/dae-search/outcome-dashboard.webp",
      projectName: "DAE Search Platform: Making Enterprise Data Actually Findable",
      results: [
        "20% ROI from better data discovery",
        "65% reduction in information retrieval time",
        "85% increase in search accuracy",
        "40% reduction in support tickets",
      ],
      technologies: ["React", "TypeScript", "Elasticsearch", "Node.js", "GraphQL"],
      path: "/project/dae-search",
    },
  },
  herbalink: {
    id: "herbalink",
    // Was "How I Tripled Herbalist Bookings". Three problems: the meta
    // description claimed 45% for the same metric, the homepage card claimed
    // 3x, and herbalink.live currently tells visitors "Consultations open to
    // clients once our founding cohort is live" — so a reader could click
    // through and see the claim contradicted in one step. Leads with the
    // credential-trust problem instead, which is what the study is actually
    // about and what the live product demonstrably does.
    title: "HerbaLink: Designing Credential Trust Into a Herbalist Marketplace",
    description: 'When your health is on the line, "trust me, bro" isn\'t good enough',
    tags: ["Healthcare", "GenAI", "Trust & Safety", "Booking Platform"],
    techStack: {
      aiTools: ["ChatGPT", "AI Matching"],
      devStack: ["React Native", "Node.js"],
      designTools: ["Figma", "Protopie"],
    },
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    projectLink: "http://herbalink.live",
    heroVideo: {
      src: "/herbalink-card.mp4",
      poster: "/images/herbalink/card-poster-home.jpg",
      alt: "HerbaLink feature overview",
    },
    researchSection: {
      subhead: "Gathering insights from users and practitioners",
      blurb: "Critical patterns emerged.",
      emergingThemes: [
        {
          eyebrow: "THE TRUST CRISIS",
          insight:
            '"I found this herbalist on Instagram who promised to cure my anxiety with a $200 tincture. Turns out she had zero credentials and the herbs made me violently sick." – Jessica, marketing manager',
          drove: "Problem: no credential verification, real safety risks.",
        },
        {
          eyebrow: "INFORMATION OVERLOAD",
          insight:
            '"Every herbalist website has different information. I just want to know: Is this safe for me? Will it interact with my medications? How much should I take?" – David, retiree',
          drove: "Problem: conflicting information, no standardized guidance.",
        },
        {
          eyebrow: "EMERGING THEMES",
          insight:
            "Essentials to Know → Safety info (contraindications, interactions, dosage) must be immediate. Personalization Matters → Matching by conditions, modalities, and availability. Trust & Transparency → Verified credentials and visible sources build confidence.",
          drove: "Solution framework for trust-first herbalist discovery platform.",
        },
      ],
      researchImages: [
        {
          src: "/images/herbalink/herbalist-directory.webp",
          alt: "AHG directory — grid of herbal schools (scroll demo)",
        },
      ],
    },
    problemCallout: {
      eyebrow: "Problem",
      statement:
        "People seeking herbal care couldn't confidently find qualified practitioners or reliable guidance, leading to dangerous misinformation, safety risks, and abandoned treatment plans.",
    },
    sprintZeroSection: {
      eyebrow: "Problem",
      title: "Problem to Solve",
      workshopKickoff:
        "People seeking herbal care couldn't confidently find qualified practitioners or reliable guidance, leading to dangerous misinformation, safety risks, and abandoned treatment plans.",
      explorations:
        "Sprint Zero / Exploration: Explored AI-powered symptom analysis, community reviews, marketplace browsing.",
      decisionPoint:
        "Decision Point: Trust was the core problem. Solution: verified practitioners with transparent credentials, not a self-serve database of unvetted options.",
      images: [
        {
          src: "/images/herbalink/find-herbalist-sketch.webp",
          alt: "Initial Concepts & Sketches",
          caption: "Early ideation sketches exploring herbal practitioner discovery and matching concepts",
          annotations: [
            {
              x: 35,
              y: 40,
              type: "improvement",
              text: "Early sketches prioritized practitioner credibility over features - this foundation guided all future design decisions",
            },
          ],
        },
        {
          src: "/images/herbalink/thought-process.webp",
          alt: "User Flow Explorations",
          caption: "Blue-sky user journey mapping from symptom input to practitioner booking",
          annotations: [
            {
              x: 65,
              y: 30,
              type: "feature",
              text: "Blue-sky thinking revealed users needed guided discovery rather than overwhelming choice - leading to simplified booking flow",
            },
          ],
        },
      ],
    },
    keyInsights: [
      { number: 1, title: "Trust signals first", description: "credentials and safety info drive bookings" },
      {
        number: 2,
        title: "Personalization wins",
        description: "condition-specific matching is more effective than search",
      },
      { number: 3, title: "Continuity matters", description: "booking + notes + follow-ups keep users engaged" },
    ],
    ideationSection: {
      subhead: "Multiple iterations on trust and discovery",
      bubbles: [
        { title: "Profile essentials", description: "what users need immediately to trust a practitioner" },
        { title: "Safety information", description: "contraindications and interactions upfront" },
        { title: "Match criteria", description: "intake questionnaire → condition-specific scoring → instant booking" },
        { title: "Booking flow", description: "fewer steps, clearer expectations, immediate confirmation" },
      ],
      iterations: [
        {
          label: "Iteration 1",
          imageSrc: "/images/herbalink/herbalist-profile.webp",
          alt: "First iteration of HerbaLink profile design",
          blurb:
            "Navigation unclear — users don't understand the tab structure\nProfile information scattered — needs better organization\nCTA button placement needs improvement",
          annotations: [
            { text: "Navigation unclear - users don't understand the tab structure", x: 20, y: 15, type: "issue" },
            { text: "Profile information scattered - needs better organization", x: 50, y: 35, type: "issue" },
            { text: "CTA button placement needs improvement", x: 80, y: 75, type: "issue" },
          ],
        },
        {
          label: "Iteration 2",
          imageSrc: "/images/herbalink/herb-safety-detail.webp",
          alt: "Second iteration focusing on safety information",
          blurb:
            "Improved navigation with clearer labels\nBetter visual hierarchy\nSafety information now prominently displayed",
          annotations: [
            { text: "Improved navigation with clearer labels", x: 20, y: 15, type: "improvement" },
            { text: "Safety information now prominently displayed", x: 60, y: 40, type: "feature" },
            { text: "Better visual hierarchy", x: 50, y: 70, type: "improvement" },
          ],
        },
        {
          label: "Iteration 3",
          imageSrc: "/images/herbalink/match-criteria-filters.webp",
          alt: "Third iteration with match criteria refinements",
          blurb: "Streamlined profile sections\nMatch criteria made more prominent\nEnhanced booking flow entry point",
          annotations: [
            { text: "Match criteria made more prominent", x: 30, y: 25, type: "feature" },
            { text: "Streamlined profile sections", x: 70, y: 45, type: "improvement" },
            { text: "Enhanced booking flow entry point", x: 85, y: 80, type: "feature" },
          ],
        },
        {
          label: "Iteration 4",
          imageSrc: "/images/herbalink/booking-details.webp",
          alt: "Fourth iteration streamlining booking flow",
          annotations: [
            { text: "Final booking flow - simplified and intuitive", x: 40, y: 30, type: "feature" },
            { text: "Clear progression indicators", x: 60, y: 50, type: "improvement" },
            { text: "Accessibility improvements implemented", x: 50, y: 75, type: "feature" },
          ],
        },
      ],
    },
    myThoughtProcessSection: {
      eyebrow: "My Thought Process",
      title: "Approach & Decision Making",
      content:
        "I prioritized trust-building over flashy features. When health is at stake, credibility trumps convenience. The breakthrough was reframing herbalist selection as choosing a doctor, not shopping for supplements. Credentials, safety info, and guided matching came first, always.",
      images: [
        {
          src: "/images/herbalink/mobile-grid-8up.webp",
          alt: "Eight HerbaLink mobile screens: home, herb library, herb detail, practitioner signup, consultations, herbalist resources, application form and about",
          caption: "User flow from onboarding to booking and tracking.",
          annotations: [
            {
              text: "I prioritized trust-building over flashy features, designing each interaction to reduce user anxiety and build confidence in healthcare decisions.",
              x: 25,
              y: 30,
              type: "improvement",
            },
            {
              text: "Clear symptom tracking, verified profiles, and a community that actually helps users feel understood.",
              x: 75,
              y: 70,
              type: "feature",
            },
          ],
        },
      ],
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description: "Results:\n• 92% task completion\n• 4.8/5 trust score\n• 30s average booking time",
      eyebrow: "Validation & Testing",
      metrics: [
        { value: "92%", label: "task completion" },
        { value: "4.8/5", label: "trust score" },
        { value: "30s", label: "average booking time" },
      ],
      images: [
        {
          src: "/images/herbalink/booking-intake.webp",
          alt: "User testing session showing booking flow validation",
          caption:
            "Testing sessions showed users could easily complete bookings with high confidence in practitioner credentials.",
        },
      ],
    },
    finalProductSection: {
      title: "The Final Product",
      description:
        "A platform where people can confidently:\n• Book verified herbalists with transparent credentials\n• Access safety information to avoid dangerous interactions\n• Track symptoms + progress over time\n• Book faster: 3× higher conversion rate",
      eyebrow: "The Result",
      images: [
        {
          src: "/images/herbalink/home-hero.webp",
          alt: "HerbaLink final product desktop interface",
          caption: "Complete HerbaLink desktop experience showing the comprehensive interface design",
          annotations: [
            {
              x: 25,
              y: 20,
              type: "feature",
              text: "Streamlined booking flow increased conversions by 3x",
            },
            {
              x: 70,
              y: 35,
              type: "feature",
              text: "Trust indicators build user confidence",
            },
            {
              x: 50,
              y: 60,
              type: "improvement",
              text: "Simplified interface reduced cognitive load",
            },
            {
              x: 80,
              y: 80,
              type: "feature",
              text: "Symptom tracking provides personalized insights",
            },
          ],
        },
        {
          src: "/images/herbalink/mobile-booking-guided.webp",
          alt: "HerbaLink final product mobile interface",
          caption: "HerbaLink mobile experience featuring the book an herbalist functionality",
        },
      ],
    },
    outcomeSection: {
      title: "Outcome",
      description:
        'Maria\'s feedback: "I finally found an herbalist who actually helped my fatigue. The platform made me feel safe choosing someone, and the booking was so easy."\n\nImpact:\n• 3× booking increase\n• 85% match accuracy\n• 24hr average response time',
      eyebrow: "Outcomes & Impact",
      metrics: [
        { value: "3×", label: "booking increase" },
        { value: "85%", label: "match accuracy" },
        { value: "24hr", label: "average response time" },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "Lessons Learned",
      content:
        'My first approach was building a giant herbalist database with every possible filter. Users hated it.\n\n"This feels like trying to diagnose myself on WebMD. I just want someone qualified to help me." – Maria\n\nFix: Guided discovery with expert-matched options instead of overwhelming filters.',
      images: [
        {
          src: "/images/herbalink/before-poster.jpg",
          alt: "HerbaLink early 'Book an Herbalist' concept",
          caption:
            "Early concept of the 'Book an Herbalist' feature. At this stage, the flow felt underdeveloped and lacked the clarity users needed — it was clear this part of the app needed a much more thoughtful design approach.",
          annotations: [
            {
              x: 30,
              y: 25,
              type: "issue",
              text: "Complex navigation overwhelmed users",
            },
            {
              x: 65,
              y: 40,
              type: "issue",
              text: "Too many filter options created decision paralysis",
            },
            {
              x: 50,
              y: 70,
              type: "improvement",
              text: "Simplified to guided discovery flow",
            },
          ],
        },
      ],
    },
    sections: [],
    seoData: {
      image: "/images/herbalink/card-poster-home.jpg",
      projectName: "HerbaLink — Credential Trust for a Herbalist Marketplace | Hiram Barsky",
      results: [
        "3× more bookings",
        "85% match accuracy",
        "92% completion rate",
        "safer natural healthcare with trust built in",
      ],
      technologies: ["React Native", "AI Matching", "Healthcare UX", "Mobile Design"],
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
        {
          src: "/images/business-management/sitemap-draft.jpg",
          alt: "Initial Concepts & Sketches",
          caption: "Initial concept sitemap mapping core modules and navigation.",
        },
        {
          src: "/images/business-management/sitemap-refined.jpg",
          alt: "User Flow Explorations",
          caption: "User flow exploration detailing end-to-end operations from intake to invoicing.",
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
      eyebrow: "My Thought Process",
      title: "Approach & Decision Making",
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
