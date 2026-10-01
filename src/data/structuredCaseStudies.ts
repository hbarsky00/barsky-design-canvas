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
          src: "/images/dae-search/research-interviews.webp",
          alt: "Research summary board: 12 user interviews with analysts, consultants and data stewards, 4 personas, 25+ real search scenarios, with verbatim quotes and five key insights",
        },
        {
          src: "/images/dae-search/research-current-experience.webp",
          alt: "Annotated walkthrough of the existing DAE search screen marking where users lost the thread, with four key findings and interview quotes",
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
          alt: "Hand sketches of the advanced search modal, entity selection, and filtered result tables",
          caption: "First pass on paper: advanced search, entity selection, and how results get filtered",
        },
        {
          src: "/images/dae-search/lofi-user-flow.webp",
          alt: "Low-fidelity desktop wireframes for six core screens: landing and search, search results, dataset details, schema view, lineage view, and request access",
          caption: "Low-fidelity wireframes for the six core screens, used to validate the flow before visual design",
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
      eyebrow: "Approach & Decision Making",
      title: "My Thought Process",
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
            '"I found this herbalist on Instagram who promised to cure my anxiety with a $200 tincture. Turns out she had zero credentials and the herbs made me violently sick." – Sarah, 32, anxiety and sleep support',
          drove: "Problem: no credential verification, real safety risks.",
        },
        {
          eyebrow: "INFORMATION OVERLOAD",
          insight:
            '"Every herbalist website has different information. I just want to know: Is this safe for me? Will it interact with my medications? How much should I take?" – David, 41, digestive issues',
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
          src: "/images/herbalink/research-interviews.webp",
          alt: "User research board: 12 people seeking natural support and 8 practicing herbalists interviewed, with key insights, sample quotes, common goals and pain points",
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
          src: "/images/herbalink/research-affinity-map.webp",
          alt: "Affinity map grouping interview notes into trust and credibility, finding the right practitioner, symptoms and needs, education, and booking and access, ending on the synthesis: don't build another directory, build trust into discovery",
          caption:
            "Every interview note on one wall, grouped — and the line the whole project came out of.",
        },
        {
          src: "/images/herbalink/lofi-core-flow.webp",
          alt: "Low-fidelity wireframes of the core mobile flow — home, search and filter, profile, date and time, confirm details, payment, confirmation — plus the desktop landing, results and profile screens",
          caption: "Low-fidelity core flow, mobile and desktop, used to test discovery and booking before any visual design",
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
      // Was four "iterations", but only two distinct screens. Iteration 3 was the
      // same directory screenshot as Iteration 1 (2.78% of pixels differed) and
      // Iteration 4 was byte-for-byte the same screen as the user-testing image
      // below (0.00%). Both removed rather than presenting one screenshot as
      // three separate rounds of design work.
      iterations: [],
    },
    myThoughtProcessSection: {
      eyebrow: "Approach & Decision Making",
      title: "My Thought Process",
      content:
        "I prioritized trust-building over flashy features. When health is at stake, credibility trumps convenience. The breakthrough was reframing herbalist selection as choosing a doctor, not shopping for supplements. Credentials, safety info, and guided matching came first, always.",
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
          src: "/images/herbalink/end-to-end-journey.webp",
          alt:
            "The eight steps people were taken through in testing — onboarding, explore, search and filter, view profile, book a session, confirm, the session itself, then ongoing support — with the messaging, appointments, prescriptions, progress tracking, rebooking and review screens underneath",
          caption:
            "The whole journey people were asked to complete, from creating an account to leaving a review.",
        },
      ],
    },
    finalProductSection: {
      title: "The Final Product",
      description:
        "A platform where people can confidently:\n• Book verified herbalists with transparent credentials\n• Access safety information to avoid dangerous interactions\n• Track symptoms + progress over time\n• Book faster: 3× higher conversion rate",
      eyebrow: "The Result",
    },
    outcomeSection: {
      title: "Outcome",
      description:
        'Leah\'s feedback: "I finally found an herbalist who actually helped my fatigue. The platform made me feel safe choosing someone, and the booking was so easy."\n\nImpact:\n• 3× booking increase\n• 85% match accuracy\n• 24hr average response time',
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
        'My first approach was building a giant herbalist database with every possible filter. Users hated it.\n\n"This feels like trying to diagnose myself on WebMD. I just want someone qualified to help me." – Leah, 28, general wellness\n\nFix: Guided discovery with expert-matched options instead of overwhelming filters.',
    },
    sections: [],
    seoData: {
      image: "/images/herbalink/high-fidelity-prototype.webp",
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
  catchbuddy: {
    id: "catchbuddy",
    title: "CatchBuddy: Trust Is the Product, Not a Settings Page",
    description:
      "The easy part is getting two strangers to agree to meet in a park; the difficult part is getting them to feel safe while doing so.",
    tags: ["AI-Assisted Product", "Trust & Safety", "Mobile-First", "Solo Build"],
    techStack: {
      devStack: ["React", "TypeScript", "Vite", "Supabase", "Stripe", "Tailwind"],
      designTools: ["Figma"],
    },
    gradientClasses: "from-orange-50 via-amber-50 to-yellow-50",
    projectLink: "https://catchbuddy.fit",
    heroVideo: {
      src: "/catchbuddy-card.mp4",
      poster: "/images/catchbuddy/phones-three-up.webp",
      alt: "Three CatchBuddy phone screens: nearby games, the map view, and a game detail with who is going",
    },
    researchSection: {
      subhead:
        "Most People Just Want a Game on Saturday\n\nPickup sports are declining in urban areas, and the apps designed to address this problem all assume that you want to take part in a full season, with all the commitment and the fixed schedule and the regular team that such a season entails. What most people actually want is a game on Saturday.",
      blurb:
        "It wasn't the scheduling that was the issue; the problem was getting two complete strangers to agree to meet at a park and both of them feeling comfortable about it, and that's a matter of trust rather than one of the calendar.",
      emergingThemes: [
        {
          eyebrow: "THE WRONG FRAME",
          insight: "Existing apps assume a season, a fixed schedule and a regular team.",
          drove: "A front door built around one game on Saturday.",
        },
        {
          eyebrow: "TRUST, NOT CALENDAR",
          insight: "The blocker is two strangers agreeing to meet and both feeling comfortable.",
          drove: "The safety layer shipped in v1 instead of being added later.",
        },
        {
          eyebrow: "THE DATING-APP READ",
          insight: 'Testers always read "Matches" as referring to a dating app.',
          drove: 'Renamed to "Browse" and "Players". The match scores stayed.',
        },
      ],
      researchImages: [
        {
          src: "/images/catchbuddy/research-why-people-dont-play.webp",
          alt:
            "Research board: who I talked to — casual players, parents, regular pickup players and people returning to sport — with interview highlights, common pain points, and the synthesis that moved the problem from scheduling to trust and safety",
          caption:
            "The hypothesis going in was scheduling. The interviews moved it to trust and safety.",
        },
      ],
    },
    problemCallout: {
      eyebrow: "Problem to Solve",
      statement:
        "Getting two strangers to agree to meet at a park is easy. Getting them to feel fine about it is the entire product.",
    },
    keyInsights: [
      {
        number: 1,
        title: "A parent verifies before a kid can post",
        description:
          "A child won't be allowed to post a game until their parent has been verified. The panic button can be reached from any screen while playing.",
      },
      {
        number: 2,
        title: "The restriction is the feature",
        description:
          "Meeting points come from a list I curated, so no one can drop a pin on an address of their own choosing. That one is often the subject of debate; it would be more flexible to let people add their own locations, and I still won't do it.",
      },
      {
        number: 3,
        title: "Safety first, or it becomes a settings screen",
        description:
          "In version 1 the safety layer was the first thing included, because every product I've seen that added it later ended up with a settings screen no one opened.",
      },
    ],
    ideationSection: {
      subhead: "A Parent Verifies Before a Kid Can Post",
      bubbles: [
        { title: "Sign up", description: "13+ age gate as the first checkpoint" },
        { title: "Under 18", description: "asks a parent to verify before posting" },
        { title: "Every game", description: "a curated meeting place and a panic button" },
        { title: "Any screen", description: "panic button reachable while playing" },
      ],
      wireframeImage: {
        src: "/images/catchbuddy/ideation-to-prototype.webp",
        alt:
          "Ideation through to prototype: sticky-note ideas grouped into features, safety and community, then five low-fidelity wireframes for discovering a game, creating one, viewing details, messaging and the player profile, then the same five screens as a high-fidelity prototype",
        caption:
          "Ideas grouped into features, safety and community, then the same five screens taken from wireframe to prototype.",
      },
    },
    myThoughtProcessSection: {
      eyebrow: "AI-ASSISTED BUILD",
      title: "What AI Did, and What It Couldn't",
      content:
        "The AI carried out the preparation of the RLS policies, the Supabase migrations, the Stripe integration and the OAuth flow, which represents a major part of the project, and it did so quickly. It wasn't clear who was allowed in, who was gatekept, and what a stranger would see about another stranger before agreeing to meet; those cases were the ones I handled manually. Although, one thing an AI security review did pick up on that I otherwise would have missed was a recursive RLS policy which would have led to data being leaked in production.",
      images: [
        {
          src: "/images/catchbuddy/hifi-create-and-community.webp",
          alt: "Create a game, review the details and confirm it is live; then the player profile with its verification badge, in-app messaging, and the community feed",
          caption: "Posting a game, and what one stranger can see about another before agreeing to meet.",
        },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: "What I Cut",
      title: "What I Cut",
      content:
        'People always read "Matches" as referring to a dating service; it\'s now called "Browse" and "Players". I created a Quick Start wizard which was not wanted, saw testers skip it every time, and eventually removed it. Support for Apple, Outlook and ICS calendars was developed and then removed, since hardly anyone used them and I would have had to maintain three integrations indefinitely for those few who did.',
        },
    finalProductSection: {
      eyebrow: "The Design System",
      title: "The Design System",
      description:
        "I warmed up the palette, since a trustworthy product that looks like a fintech dashboard comes across as a company, and this one needed to look like a neighbour. The safety states have been part of the same system since v1, rather than appearing later as status chips bolted on the side.",
      images: [
        {
          src: "/images/catchbuddy/desktop-case-study.webp",
          alt:
            "Desktop case-study board: why people don't play, the ideation sketches, and the high-fidelity desktop prototype with the results list and map side by side",
          caption:
            "The warm ground and the single green, doing their job on the finished desktop screen.",
        },
      ],
      video: {
        src: "/catchbuddy-walkthrough.mp4",
        title: "CatchBuddy walkthrough",
        caption:
          "The complete walkthrough, narrated: posting the game, selecting a park, choosing equipment and preferences, then the safety features — emergency contacts, phone verification, and the minor gate.",
      },
    },
    outcomeSection: {
      eyebrow: "Where It Landed",
      title: "Where It Landed",
      description:
        "Shipped, including auth, RLS, Stripe, Google OAuth, real-time updates, the minor-approval process and the curated meeting spots — all of which I designed and built. In version 1 the safety layer was the first thing to be included, since all the products I've seen which added it later ended up with a settings screen that no one opened.",
    },
    clientTestimonial: {
      quote:
        "Unmatched in his ability to translate the often vague ideas from clients into beautiful, simple-to-use products.",
      author: "Daanish",
      // ClientTestimonial reads `title`, not `role`. As `role` it rendered as
      // "Daanish" above a bare " at Tata Consultancy Services".
      title: "Business Delivery Partner",
      company: "Tata Consultancy Services",
    },
    sections: [],
    seoData: {
      image: "/images/og/catchbuddy.png",
      projectName: "CatchBuddy — Trust Is the Product, Not a Settings Page | Hiram Barsky",
      results: [
        "Safety layer shipped in v1: 13+ gate, parent verification before a minor can post, panic button on every screen",
        "Curated meeting spots — no user-dropped pins",
        "Auth, RLS, Stripe, Google OAuth and real-time updates, designed and built solo",
      ],
      technologies: ["React", "TypeScript", "Vite", "Supabase", "Stripe", "Tailwind"],
      path: "/project/catchbuddy",
    },
  },

  "business-management": {
    id: "business-management",
    title: "One System Instead of Six: Cutting Operation Errors by 68%",
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
          src: "/images/business-management/v2/research-small-business-owners.webp",
          alt: "Research board: interviews with owners of landscaping, cleaning and home-services businesses, four key insights about tool sprawl, disconnected scheduling and invoicing, the missing today view, and manual error, alongside the common pain points",
          caption: "Interviews with owners, and the four things every one of them said.",
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
        // Both sitemap diagrams are gone now — Hiram called the chart ugly and
        // asked for the low-fidelity flow in its place.
        {
          src: "/images/business-management/v2/lofi-end-to-end-flow.webp",
          alt:
            "Low-fidelity wireframes of the end-to-end flow: sign in, today dashboard, create a job, schedule it, confirm, see it land on the calendar, open job details, create the invoice, and send it",
          caption:
            "The whole loop in wireframe — sign in to invoice sent — before any of it was styled.",
        },
        {
          src: "/images/business-management/v2/exploration-board.webp",
          alt: "Exploration board: interview themes on sticky notes, hand-drawn wireframes of the six core screens, the low-fidelity dashboard, schedule, client and invoice layouts, and the high-fidelity dashboard, scheduling and clients-and-invoices designs",
          caption: "Sticky notes to sketches to screens — the whole arc the decision came out of.",
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
    },
    finalProductSection: {
      title: "The Final Product",
      description:
        "Unified platform with: Smart priority dashboard, Automated invoicing, Connected scheduling, Error reduction by 68%",
      eyebrow: "The Result",
      images: [
        {
          src: "/images/business-management/v2/case-study-board.webp",
          alt:
            "Case study board: the research interviews and key insights, the ideation sketches, the low-fidelity wireframes, and the finished dashboard, scheduling and clients-and-invoices screens",
          caption: "Research through to finished screens, on one board.",
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
        "/images/business-management/v2/hifi-end-to-end-flow.webp",
      projectName: "One System Instead of Six: Cutting Operation Errors by 68%",
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
    heroMetrics: [
      { value: "6", label: "Workflow steps" },
      { value: "4", label: "Roles designed for" },
      { value: "1", label: "Honest open problem" },
    ],
    // Every section's subhead below is the line printed on that board, used
    // verbatim rather than written here.
    researchSection: {
      subhead:
        "Understanding real user needs.\nWe explored how professionals currently create emails, where they get stuck, and what would make the process faster, easier, and more effective.",
      emergingThemes: [],
      researchImages: [
        {
          src: "/images/email-creation-ai/research.webp",
          alt: "Research board: 8 user interviews, 12 key pain points, and the finding that 100% wanted faster, higher-quality emails with less effort, alongside the key insights and a quote from a product manager",
        },
      ],
    },
    ideationSection: {
      subhead:
        "Exploring ideas and possibilities. We brainstormed different ways AI could help users create better emails, from quick actions to full conversational experiences.",
      bubbles: [],
      wireframeImage: {
        src: "/images/email-creation-ai/ideation.webp",
        alt: "Ideation board: sticky notes for natural language input, turning meeting notes into email, tone options, template library, AI chat refinement and one-click customization, with the concept list and initial sketches",
        caption: "Key concepts explored, and the first concept sketches they turned into.",
      },
      iterations: [
        {
          label: "Low-Fidelity Mockups",
          imageSrc: "/images/email-creation-ai/low-fidelity.webp",
          alt: "Low-fidelity wireframes of the six core screens: landing, the write prompt, results, template library, edit and refine, and export",
          blurb: "Early wireframes to validate the flow — layout, content hierarchy and key interactions.",
        },
      ],
    },
    myThoughtProcessSection: {
      eyebrow: "Process",
      title: "From concept to a clear experience",
      content:
        "We defined the user flow, core features, and interaction model to create a simple, powerful experience that works for a wide range of users.",
      images: [
        {
          src: "/images/email-creation-ai/process.webp",
          alt: "Process board: enter prompt, refine with AI, review and edit, copy or send — mapped against the landing, create, refine and preview screens, with the core features listed",
        },
      ],
    },
    finalProductSection: {
      eyebrow: "Final Mockups",
      title: "A complete, polished experience",
      description:
        "The final design delivers a seamless, end-to-end experience for creating, refining, and sending high-quality emails with AI.",
      images: [
        {
          src: "/images/email-creation-ai/final-mockups.webp",
          alt: "Final mockups: the template library, the create-email panel, and the generated email ready to copy or open in a mail client",
        },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: "What I Haven't Solved",
      title: "Step 6 — the MLR review experience",
      content:
        "I designed the AI outputs (RV PDF, annotations panel, based-on declaration) but not the review experience itself — how MLR reviewers annotate, reject, and approve claims with legal accountability. That's the hardest part of pharma email and would need direct research with MLR and legal.",
      images: [],
    },
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
    sections: [],
    seoData: {
      image: "/images/email-creation-ai/high-fidelity.webp",
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
