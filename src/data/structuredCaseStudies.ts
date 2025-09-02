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
  researchImages?: { src: string; alt: string; caption?: string; annotations?: ImageAnnotation[]; }[];
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
  annotations?: ImageAnnotation[];
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
      annotations?: ImageAnnotation[];
    }>;
  };
  keyInsights?: {
    number: number;
    title: string;
    description: string;
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
      annotations?: ImageAnnotation[];
    }>;
  };
  userTestingSection?: {
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
    id: "crypto",
    title: "Trading Without Friction – Crypto App Case Study",
    description: "How a dual-mode crypto app turned churn into growth by serving both novices and pros",
    tags: ["Fintech", "Crypto", "Mobile & Web", "Product Design", "Research", "Prototyping"],
    gradientClasses: "from-blue-50 via-indigo-50 to-purple-50",
    heroVideo: {
      src: "/lovable-uploads/crypto-hero.mp4",
      poster: "https://barskyux.com/wp-content/uploads/2025/08/CryptoFeatureimage.png",
      alt: "Crypto trading platform overview"
    },
    heroMetrics: [
      { value: "+35%", label: "Onboarding Conversion" },
      { value: "–40%", label: "Time-to-First-Trade" },
      { value: "–45%", label: "Order Errors" },
      { value: "+25%", label: "Pro Trader Retention" }
    ],
      researchSection: {
        subhead: "Interviews and competitive analysis revealed beginner barriers and pro constraints.",
        blurb: "Insights drove a dual-mode approach.",
        researchImages: [
          {
            src: "https://barskyux.com/wp-content/uploads/2025/08/competetive-2.png",
            alt: "Competitive Analysis of Crypto Apps"
          },
          {
            src: "https://barskyux.com/wp-content/uploads/2025/09/cryptotrade_site_map_flowchart_better.png",
            alt: "User Flow Chart for Crypto App",
            caption: "User Flow Chart for Crypto App"
          }
        ],
        emergingThemes: [
          {
            eyebrow: "BEGINNER BARRIERS",
            insight: "Drove guided trading mode with safety rails.",
            drove: "Guided trading mode with clear explanations and safety rails."
          },
          {
            eyebrow: "PRO LIMITATIONS",
            insight: "Drove advanced panel with hotkeys, presets, and live order book.",
            drove: "Advanced panel with hotkeys, presets, and live order book."
          },
          {
            eyebrow: "COMPETITIVE GAPS",
            insight: "Drove a dual-mode approach serving both audiences.",
            drove: "Dual-mode approach serving both audiences in one platform."
          }
        ]
      },
    problemCallout: {
      eyebrow: "Problem",
      statement: "Novices abandon onboarding; pros churn after early trades. The business loses both first deposits and high-volume activity—two critical revenue streams."
    },
    sprintZeroSection: {
      eyebrow: "Sprint Zero",
      title: "Foundation & Principles",
      workshopKickoff: "1. Trust is visible → show security upfront. 2. Speed is retention → every tap matters. 3. Guided simplicity → confidence without hand-holding.",
      explorations: "I designed three different dashboard layouts, focusing on what mattered most to users. After gathering feedback, I chose the second option.",
      decisionPoint: "Focus on a dual-mode design serving both novice and expert traders.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/09/A-or-B-for-Low-Res-Mockups.png",
          alt: "Initial concepts and sketches for crypto onboarding",
          caption: "Foundation and principles guiding the dual-mode crypto platform design"
        },
        {
          src: "https://www.loom.com/share/6b30e410c7394757956b9f6f2d10d10f?sid=75203801-3262-4a46-a502-41a55aa8839c",
          alt: "Decision point video demonstration",
          caption: "Video walkthrough of key decision points in the design process"
        }
      ]
    },
    keyInsights: [
      {
        number: 1,
        title: "Dual-mode clarity wins",
        description: "Guided Quick Trade + Pro Panel."
      },
      {
        number: 2, 
        title: "Plain language ↑ adoption ~30%",
        description: "translating jargon reduced confusion."
      },
      {
        number: 3,
        title: "One dashboard > many",
        description: "quick actions + deep links beat scattered navigation."
      }
    ],
    myThoughtProcessSection: {
      eyebrow: "My Thought Process",
      title: "",
      content: "Design for the extremes: the hesitant first-timer and the speed-driven trader. Progressive disclosure: hide complexity until requested. Latency = UX: live quotes, optimistic states, visible sync timers. Confidence and speed weren't opposites—they were interdependent.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/09/Crypto-Mockups-for-homepagedashboard.png",
          alt: "Design thinking process for crypto platform",
          caption: "Thought process visualization showing design decisions for crypto trading platform"
        }
      ]
    },
    ideationSection: {
      subhead: "Core Features & Interface Design",
      bubbles: [
        {
          title: "Dashboard",
          description: "Portfolio, movers, quick trade, security score."
        },
        {
          title: "Trading",
          description: "Quick Trade (guided) + Pro Panel (hotkeys, presets, live order book)."
        }
      ],
      iterations: [
        {
          label: "Landing Page Decision",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/Buy-and-Sell-Bitcoin-scaled.png",
          alt: "Landing page design iteration showing user-friendly crypto onboarding",
          annotations: [
            { text: "Simplified entry flow reduces barrier to first trade", x: 30, y: 25, type: "improvement" },
            { text: "Trust indicators prominently displayed", x: 70, y: 45, type: "feature" }
          ]
        },
        {
          label: "Trading Flow",
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/09/Trading-Crypto-Low-Res.png",
          alt: "Trading view showing guided user experience for crypto users",
          annotations: [
            { text: "Progressive disclosure prevents information overload", x: 40, y: 30, type: "improvement" },
            { text: "Dual-mode design caters to both novice and expert traders", x: 60, y: 65, type: "feature" }
          ]
        }
      ]
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "",
      content: "One-size trade form ↑ errors 60%. Global alerts overwhelmed; asset-level solved it. Over-frequent MFA doubled abandonment; risk-based triggers fixed it.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/iphonelearning.png",
          alt: "Early crypto design that didn't work well",
          caption: "Learning from design iterations that didn't meet user needs"
        }
      ]
    },
    userTestingSection: {
      title: "Validation & Testing",
      eyebrow: "Testing",
      description: "Prototype sessions showed: Time-to-first-trade ↓ to 3 minutes (vs 8 competitors). Order errors ↓ 45%. 75% of testers trusted this app more than their current platform.",
      metrics: [
        { value: "3 min", label: "Time-to-first-trade" },
        { value: "↓45%", label: "Order errors" },
        { value: "75%", label: "Trusted more" }
      ]
    },
    outcomeSection: {
      title: "Outcome & Impact",
      eyebrow: "Results",
      description: "Instead of splitting audiences, the app united them—delivering growth, retention, and stronger brand trust.",
      metrics: [
        { value: "+35%", label: "Onboarding conversion" },
        { value: "↓40%", label: "Time-to-first-trade" },
        { value: "↓45%", label: "Order errors" },
        { value: "+25%", label: "Pro trader retention" },
        { value: "+40%", label: "Portfolio engagement (users checked balances daily, not weekly)" }
      ],
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/Onboarding-Section.png",
          alt: "Finished crypto trading product showing successful outcomes",
          caption: "Final product demonstrating the successful dual-mode crypto trading platform"
        }
      ]
    },
    sections: [],
    seoData: {
      image: "https://barskyux.com/wp-content/uploads/2025/08/Promo-Image.jpg",
      projectName: "Trading Without Friction",
      results: [
        "35% increase in onboarding conversion",
        "40% reduction in time-to-first-trade", 
        "45% reduction in order errors",
        "25% increase in pro trader retention"
      ],
      technologies: ["React", "TypeScript", "Node.js", "WebSocket", "REST API"],
      path: "/project/crypto"
    }
  },
  "herbalink": {
    id: "herbalink",
    title: "HerbaLink – 3× More Bookings for Certified Herbalists",
    description: "HerbaLink connects people with vetted herbalists and reliable resources. Many users relied on unverified sources, creating risks. The vision: build a discovery and booking platform with credibility at its core. The outcome: safe, trustworthy access to natural health practitioners and remedies.",
    tags: ["Blue Sky", "Design Thinking", "GenAI", "WebApp", "Mobile"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    projectLink: "http://herbalink.live",
    heroVideo: {
      src: "https://barskyux.com/wp-content/uploads/2025/07/HerbaLink-Book-A-Herbalist-1.mp4",
      poster: "https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png",
      alt: "HerbaLink feature overview"
    },
    researchSection: {
      subhead: "User and practitioner interviews surfaced safety concerns and low trust in unverified remedies.",
      blurb: "Trust gaps found.",
      emergingThemes: [
        {
          eyebrow: "ESSENTIALS TO KNOW",
          insight: "People want indications, contraindications, and dosage at a glance.",
          drove: "Safety blocks on profiles and treatment pages."
        },
        {
          eyebrow: "PERSONALIZATION",
          insight: "Matching must consider condition, modality, and availability.",
          drove: "Intake → match scoring, filters, and instant booking."
        },
        {
          eyebrow: "TRUST & TRANSPARENCY",
          insight: "Credentials and sources must be visible.",
          drove: "Verification badges, linked credentials, and sourced education content."
        }
      ],
      researchImages: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/AHG-directory-2025-release-animation-1.gif",
          alt: "AHG directory — grid of herbal schools (scroll demo)"
        },
        {
          src: "/zocdoc-signup.png",
          alt: "Zocdoc signup screen interface"
        }
      ]
    },
    problemCallout: {
      eyebrow: "Problem to Solve",
      statement: "People seeking herbal care can't confidently find vetted practitioners or guidance—leading to misinformation, safety risks, and abandoned care."
    },
    sprintZeroSection: {
      eyebrow: "0 → 1 EXPLORATION",
      title: "Sprint Zero: Blue-Sky Thinking",
      workshopKickoff: "Early sketches prioritized practitioner credibility over features.",
      explorations: "I explored blue-sky concepts ranging from AI-powered symptom analysis to community-driven peer reviews. Early sketches included marketplace-style browsing, chat-first consultations, and comprehensive health tracking. I tested divergent ideas like gamified health journeys and social proof through community testimonials to understand what resonated most with users seeking herbal care.",
      decisionPoint: "I chose to focus the platform on practitioners after seeing that users valued expert guidance most. I made verified credentials, clear safety details, and simple booking the core features. This approach built trust and avoided overwhelming users with too many choices or complicated tracking tools.\nBlue-sky thinking revealed users needed guided discovery rather than exhaustive, self-serve databases.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/findanherbalistsketch.png",
          alt: "Initial Concepts & Sketches",
          caption: "Early ideation sketches exploring herbal practitioner discovery and matching concepts",
          annotations: [
            {
              x: 35,
              y: 40,
              type: "improvement",
              text: "Early sketches prioritized practitioner credibility over features - this foundation guided all future design decisions"
            }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-19-2025-11_19_58-PM.png",
          alt: "User Flow Explorations", 
          caption: "Blue-sky user journey mapping from symptom input to practitioner booking",
          annotations: [
            {
              x: 65,
              y: 30,
              type: "feature",
              text: "Blue-sky thinking revealed users needed guided discovery rather than overwhelming choice - leading to simplified booking flow"
            }
          ]
        }
      ]
    },
    keyInsights: [
      { number: 1, title: "Trust signals first", description: "Verified practitioners and clear bios drive confidence." },
      { number: 2, title: "Personalization", description: "Intake and history enable better practitioner matching." },
      { number: 3, title: "Continuity of care", description: "Booking, notes, and follow-ups keep users engaged." }
    ],
    ideationSection: {
      subhead: "I explored profile, safety, matching, and booking flows—tight loops to validate trust and speed.",
      bubbles: [
        { title: "Profile essentials", description: "What users need at a glance" },
        { title: "Safety info", description: "Contraindications and dosage clarity" },
        { title: "Match criteria", description: "Condition, modality, availability" },
        { title: "Booking flow", description: "Fewer steps, clearer expectations" }
      ],
      iterations: [
        { 
          label: "Iteration 1", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/uxpilot-design-1755661047658-scaled.png", 
          alt: "First iteration of HerbaLink profile design",
          blurb: "Navigation unclear — users don't understand the tab structure\nProfile information scattered — needs better organization\nCTA button placement needs improvement",
          annotations: [
            { text: "Navigation unclear - users don't understand the tab structure", x: 20, y: 15, type: "issue" },
            { text: "Profile information scattered - needs better organization", x: 50, y: 35, type: "issue" },
            { text: "CTA button placement needs improvement", x: 80, y: 75, type: "issue" }
          ]
        },
        { 
          label: "Iteration 2", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/uxpilot-design-1755661017299-scaled.png", 
          alt: "Second iteration focusing on safety information",
          blurb: "Improved navigation with clearer labels\nBetter visual hierarchy\nSafety information now prominently displayed",
          annotations: [
            { text: "Improved navigation with clearer labels", x: 20, y: 15, type: "improvement" },
            { text: "Safety information now prominently displayed", x: 60, y: 40, type: "feature" },
            { text: "Better visual hierarchy", x: 50, y: 70, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 3", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/uxpilot-design-1755661070914-scaled.png", 
          alt: "Third iteration with match criteria refinements",
          blurb: "Streamlined profile sections\nMatch criteria made more prominent\nEnhanced booking flow entry point",
          annotations: [
            { text: "Match criteria made more prominent", x: 30, y: 25, type: "feature" },
            { text: "Streamlined profile sections", x: 70, y: 45, type: "improvement" },
            { text: "Enhanced booking flow entry point", x: 85, y: 80, type: "feature" }
          ]
        },
        { 
          label: "Iteration 4", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/uxpilot-design-1755661102386.png", 
          alt: "Fourth iteration streamlining booking flow",
          annotations: [
            { text: "Final booking flow - simplified and intuitive", x: 40, y: 30, type: "feature" },
            { text: "Clear progression indicators", x: 60, y: 50, type: "improvement" },
            { text: "Accessibility improvements implemented", x: 50, y: 75, type: "feature" }
          ]
        }
      ]
    },
    myThoughtProcessSection: {
      eyebrow: "APPROACH & DECISION MAKING",
      title: "My Thought Process",
      content: "I prioritized trust-building over flashy features. Building trust is more important than adding lots of features when connecting people with healthcare providers. I focused on making every interaction credible and reassuring by using clear symptom tracking and verified herbalist profiles. The result: 3x higher booking rates through clear symptom tracking and verified profiles.",
      images: [
        {
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2025/07/UserFlow.png?fit=1232%2C928&ssl=1",
          alt: "HerbaLink user flow from onboarding to booking",
          caption: "User flow from onboarding to booking and tracking.",
          annotations: [
            { text: "I prioritized trust-building over flashy features, designing each interaction to reduce user anxiety and build confidence in healthcare decisions.", x: 25, y: 30, type: "improvement" },
            { text: "The result: 3x higher booking rates through clear symptom tracking, verified profiles, and a community that actually helps users feel understood.", x: 75, y: 70, type: "feature" }
          ]
        }
      ]
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description: "Testing with both practitioners and patients validated the trust-focused approach and revealed key usability improvements for the booking flow.",
      eyebrow: "VALIDATION & TESTING",
      metrics: [
        { value: "92%", label: "Task Completion" },
        { value: "4.8/5", label: "Trust Score" },
        { value: "30s", label: "Avg. Booking Time" }
      ],
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/Symptom-Trackerupdate-scaled.png",
          alt: "User testing session showing booking flow validation",
          caption: "Testing sessions showed users could easily complete bookings with high confidence in practitioner credentials."
        }
      ]
    },
    finalProductSection: {
      title: "The Final Product",
      description: "Users can book verified herbalists by need, rating, and availability; log symptoms and track progress over time; get data-informed herbal suggestions; join a growing community of trusted practitioners and peers.",
      eyebrow: "THE RESULT",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/macbookpro.png",
          alt: "HerbaLink final product desktop interface",
          caption: "Complete HerbaLink desktop experience showing the comprehensive interface design",
          annotations: [
            {
              x: 25,
              y: 20,
              type: "feature",
              text: "Streamlined booking flow increased conversions by 3x"
            },
            {
              x: 70,
              y: 35,
              type: "feature",
              text: "Trust indicators build user confidence"
            },
            {
              x: 50,
              y: 60,
              type: "improvement",
              text: "Simplified interface reduced cognitive load"
            },
            {
              x: 80,
              y: 80,
              type: "feature",
              text: "Symptom tracking provides personalized insights"
            }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/herbalink-book-an-herbalist-scaled.png",
          alt: "HerbaLink final product mobile interface",
          caption: "HerbaLink mobile experience featuring the book an herbalist functionality"
        }
      ]
    },
    outcomeSection: {
      title: "Outcome",
      description: "I set up a solid base for results, confirmed the model works, and created a plan to grow with AI, long-term tracking, and insights from practitioners.",
      eyebrow: "OUTCOMES & IMPACT",
      metrics: [
        { value: "3x", label: "Booking Rate Increase" },
        { value: "85%", label: "Match Accuracy" },
        { value: "24hr", label: "Response Time" }
      ],
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/symptomtrackermobile.png",
          alt: "HerbaLink conversation with herbalist and symptom tracker interface",
          caption: "HerbaLink conversation with herbalist and symptom tracker interface"
        }
      ]
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "Lessons Learned",
      content: "At first, the prototypes were too complex, with too many categories and confusing layouts. Users wanted a simple, guided way to find what they needed, not a huge database.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/07/herbalistdemo-2.png",
          alt: "HerbaLink early 'Book an Herbalist' concept",
          caption: "Early concept of the 'Book an Herbalist' feature. At this stage, the flow felt underdeveloped and lacked the clarity users needed — it was clear this part of the app needed a much more thoughtful design approach.",
          annotations: [
            {
              x: 30,
              y: 25,
              type: "issue",
              text: "Complex navigation overwhelmed users"
            },
            {
              x: 65,
              y: 40,
              type: "issue",
              text: "Too many filter options created decision paralysis"
            },
            {
              x: 50,
              y: 70,
              type: "improvement",
              text: "Simplified to guided discovery flow"
            }
          ]
        }
      ]
    },
    sections: [],
    seoData: {
      image: "https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png",
      projectName: "HerbaLink",
      results: ["3x booking increase", "85% match accuracy", "AI-powered recommendations"],
      technologies: ["React Native", "AI Matching", "Healthcare UX", "Mobile Design"],
      path: "/project/herbalink"
    }
  },
  "splittime": {
    id: "splittime",
    title: "SplitTime – Simplifying Co-Parenting with Better Planning",
    description: "Built a co-parenting app to reduce scheduling conflicts. Early tests showed a 40% decrease in communication breakdowns.",
    tags: ["Blue Sky", "Design Thinking", "iOS→Android", "Legal UX", "WebApp"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    projectLink: "https://splittime.pro",
    heroVideo: {
      src: "",
      poster: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1",
      alt: "Splittime co-parenting app hero overview"
    },
    researchSection: {
      subhead: "SplitTime is a co-parenting app designed to simplify shared custody, expenses, and communication. Parents were relying on texts and spreadsheets, leading to miscommunication and stress. The vision is to create a neutral and trustworthy tool that reduces conflict and fosters trust between co-parents.",
      blurb: "Tools create conflict.",
      emergingThemes: [
        {
          eyebrow: "ESSENTIALS TO KNOW",
          insight: "Families need today's pickups, locations, and changes at a glance.",
          drove: "Shared calendar + unified timeline for events, notes, and expenses."
        },
        {
          eyebrow: "CONFIRMATIONS & APPROVALS",
          insight: "Changes were often disputed or missed.",
          drove: "Request/approve flows with stamped history and notifications."
        },
        {
          eyebrow: "TONE-SAFE COMMUNICATION",
          insight: "Escalations came from ad-hoc texts.",
          drove: "In-app templates and reminders that keep language neutral."
        }
      ],
        researchVideo: "https://www.loom.com/share/fc0904a5d0d840389f0b474c29806b37?sid=0b69a583-a511-448e-92f1-1861e98d3070"
    },
    problemCallout: {
      eyebrow: "Problem to Solve",
      statement: "Co-parents often lack a single source of truth for schedules, expenses, and decisions, leading to miscommunication, missed pickups, and ongoing conflict."
    },
    sprintZeroSection: {
      eyebrow: "0 → 1 EXPLORATION",
      title: "Sprint Zero: Blue-Sky Thinking",
      workshopKickoff: "Early brainstorming on co-parenting communication tools and conflict reduction strategies.",
      explorations: "I explored blue-sky concepts ranging from AI-powered communication filtering to gamified cooperation tracking. Early sketches included therapeutic check-ins, mood tracking, and automated conflict de-escalation. I tested divergent ideas like neutral third-party mediation and child-focused decision frameworks to understand what would genuinely reduce tension between co-parents.",
      decisionPoint: "I decided to focus on a neutral communication platform after seeing that most conflicts came from unclear tone and expectations. I chose structured templates, approval workflows, and transparent history to build accountability through clarity, instead of adding features that might make things harder.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/Dashboard0.jpg",
          alt: "Initial Concepts & Sketches",
          caption: "Early brainstorming on co-parenting communication tools and conflict reduction strategies"
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/wireframing-1.webp",
          alt: "User Flow Explorations",
          caption: "Blue-sky exploration of scheduling workflows and neutral communication patterns"
        }
      ]
    },
    keyInsights: [
      { number: 1, title: "Single source of truth", description: "One shared schedule and ledger eliminates disputes." },
      { number: 2, title: "Consent & clarity", description: "Approvals and change logs build trust between co-parents." },
      { number: 3, title: "Calm communication", description: "Neutral templates reduce conflict and decision fatigue." }
    ],
    ideationSection: {
      subhead: "I tested calendar, approvals, expenses, and messaging to reduce conflict and missed handoffs.",
      bubbles: [
        { title: "Today's schedule", description: "Hand-offs, locations, changes" },
        { title: "Approvals", description: "Requests, confirmations, history" },
        { title: "Expenses", description: "Shared ledger with receipts" },
        { title: "Messaging", description: "Tone-safe templates" }
      ],
      iterations: [
        { 
          label: "Iteration 1", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/Dashboard1st.png", 
          alt: "First iteration of Splittime calendar view",
          blurb: "Calendar layout too dense — overwhelming for stressed parents\nNo clear distinction between confirmed and pending events",
          annotations: [
            { text: "Calendar layout too dense - overwhelming for stressed parents", x: 50, y: 30, type: "issue" },
            { text: "No clear distinction between confirmed vs pending events", x: 70, y: 50, type: "issue" }
          ]
        },
        { 
          label: "Iteration 2", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2024/01/DashboardPRIMARY.png", 
          alt: "Second iteration with approval flows",
          blurb: "Added approval status indicators for clarity\nSimplified calendar view reduces cognitive load",
          annotations: [
            { text: "Added approval status indicators for clarity", x: 40, y: 25, type: "improvement" },
            { text: "Simplified calendar view reduces cognitive load", x: 60, y: 45, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 3", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/DashboardPRIMARY.png", 
          alt: "Third iteration adding expense tracking",
          blurb: "Integrated expense tracking streamlines workflow\nReceipt upload system improves transparency",
          annotations: [
            { text: "Integrated expense tracking streamlines workflow", x: 30, y: 60, type: "feature" },
            { text: "Receipt upload system improves transparency", x: 80, y: 40, type: "feature" }
          ]
        },
        { 
          label: "Iteration 4", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/iteration4.png", 
          alt: "Fourth iteration with messaging templates",
          blurb: "Neutral tone suggestions prevent escalation\nTemplate messaging reduces conflict potential",
          annotations: [
            { text: "Template messaging reduces conflict potential", x: 45, y: 35, type: "feature" },
            { text: "Neutral tone suggestions prevent escalation", x: 65, y: 65, type: "improvement" }
          ]
        }
      ]
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description: "Testing with divorced co-parents revealed the importance of neutral communication tools and clear approval workflows to prevent misunderstandings.",
      eyebrow: "VALIDATION & TESTING",
      metrics: [
        { value: "89%", label: "Usability Score" },
        { value: "40%", label: "Conflict Reduction" },
        { value: "2min", label: "Avg. Request Time" }
      ],
      images: [
        {
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1",
          alt: "User testing session showing co-parenting workflow validation",
          caption: "Testing sessions validated my neutral communication approach and approval workflow design."
        }
      ]
    },
    finalProductSection: {
      title: "The Final Product",
      description: "A co-parenting platform that prioritizes children's wellbeing through clear communication, shared scheduling, and conflict reduction tools that help separated families coordinate effectively.",
      eyebrow: "THE RESULT",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/1.Dashboard.png",
          alt: "Splittime Dashboard",
          caption: "Main dashboard showing overview of all co-parenting activities and quick actions",
          annotations: [
            {
              x: 25,
              y: 20,
              type: "feature",
              text: "Activity timeline provides instant overview of recent co-parenting interactions without overwhelming detail"
            },
            {
              x: 75,
              y: 35,
              type: "improvement",
              text: "Quick stats reduce anxiety by showing positive progress metrics like timely pickups and resolved issues"
            },
            {
              x: 50,
              y: 65,
              type: "feature",
              text: "Primary navigation emphasizes children-first organization over parent-centric views"
            },
            {
              x: 80,
              y: 80,
              type: "improvement",
              text: "Quick action buttons enable immediate task completion without deep navigation"
            }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/2.Dashboard-Add.png",
          alt: "Dashboard Add Function",
          caption: "Add new events, expenses, or messages directly from the dashboard",
          annotations: [
            {
              x: 40,
              y: 30,
              type: "feature",
              text: "Modal overlay keeps users in context while adding new items, reducing cognitive load"
            },
            {
              x: 60,
              y: 50,
              type: "improvement",
              text: "Clear categorization prevents mix-ups between schedules, expenses, and communications"
            },
            {
              x: 70,
              y: 75,
              type: "feature",
              text: "Smart defaults and autocomplete reduce friction in high-stress co-parenting moments"
            }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/3.calendar.png",
          alt: "Calendar View",
          caption: "Shared calendar ensuring both parents stay coordinated on schedules",
          annotations: [
            {
              x: 30,
              y: 25,
              type: "improvement",
              text: "Color-coded custody periods eliminate confusion about who has the children when"
            },
            {
              x: 65,
              y: 40,
              type: "feature",
              text: "Both parents see identical information, preventing 'he said, she said' scheduling conflicts"
            },
            {
              x: 50,
              y: 70,
              type: "improvement",
              text: "Visual scheduling reduces text-based miscommunication that often leads to conflict"
            }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/4.Expenses.png",
          alt: "Expenses Tracking",
          caption: "Track and split child-related expenses with transparent documentation",
          annotations: [
            {
              x: 35,
              y: 30,
              type: "feature",
              text: "Receipt uploads provide transparent documentation, eliminating disputes about spending"
            },
            {
              x: 70,
              y: 45,
              type: "improvement",
              text: "Automatic splitting calculations remove emotional negotiation from financial discussions"
            },
            {
              x: 55,
              y: 75,
              type: "feature",
              text: "Spending categories help parents understand child-related expenses and plan budgets"
            }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/5.Documents.png",
          alt: "Documents Storage",
          caption: "Centralized document storage for important child-related paperwork",
          annotations: [
            {
              x: 40,
              y: 25,
              type: "improvement",
              text: "Centralized storage ensures both parents access the same current documents and information"
            },
            {
              x: 60,
              y: 50,
              type: "feature",
              text: "Smart organization by child and category makes critical documents findable during emergencies"
            },
            {
              x: 75,
              y: 75,
              type: "improvement",
              text: "Version control prevents confusion about outdated medical forms or legal documents"
            }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/6.Messages.png",
          alt: "Messaging System",
          caption: "Neutral messaging interface designed to reduce conflict and misunderstandings",
          annotations: [
            {
              x: 30,
              y: 30,
              type: "improvement",
              text: "Neutral interface design discourages emotional escalation in written communication"
            },
            {
              x: 65,
              y: 45,
              type: "feature",
              text: "Message threading keeps conversations organized and prevents misunderstandings"
            },
            {
              x: 50,
              y: 70,
              type: "improvement",
              text: "Read receipts and timestamps create accountability without being intrusive"
            }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/7.ChildProfile.png",
          alt: "Child Profile",
          caption: "Detailed child profile with important information accessible to both parents",
          annotations: [
            {
              x: 35,
              y: 25,
              type: "feature",
              text: "Comprehensive child information ensures both parents stay informed about development and needs"
            },
            {
              x: 70,
              y: 40,
              type: "improvement",
              text: "Medical information, preferences, and emergency contacts are always current and accessible"
            },
            {
              x: 55,
              y: 70,
              type: "feature",
              text: "Growth tracking and milestone documentation helps both parents stay connected to child's development"
            }
          ]
        }
      ]
    },
    outcomeSection: {
      title: "Outcome",
      description: "SplitTime changed the way separated families communicate and work together. It helped build healthier relationships and led to better outcomes for children.",
      eyebrow: "OUTCOMES & IMPACT",
      metrics: [
        { value: "40%", label: "Conflict Reduction" },
        { value: "90%", label: "User Satisfaction" },
        { value: "24hr", label: "Response Time" }
      ],
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/signupscree.png",
          alt: "Splittime signup screen showing the successful outcome interface"
        }
      ]
    },
    myThoughtProcessSection: {
      eyebrow: "APPROACH & DECISION MAKING",
      title: "My Thought Process",
      content: "I designed around conflict reduction first, using neutral language and clear boundaries. Many co-parenting apps miss the mark by focusing on features instead of how people feel. I built SplitTime to reduce conflict first, using neutral language, clear boundaries, and shared accountability. The result: 40% less co-parenting conflict through a platform that helps families communicate better—not just stay organized.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2016/08/ideation_phase_design.png",
          alt: "Splittime user satisfaction metrics and communication improvements",
          caption: "Ideation phase explorations mapping Splittime’s core user flows and interaction patterns.",
          annotations: [
            { text: "I designed around conflict reduction first, using neutral language and clear boundaries to help families communicate instead of argue.", x: 30, y: 25, type: "improvement" },
            { text: "The result: 40% less co-parenting conflict through a platform that prioritizes emotional well-being over feature complexity.", x: 70, y: 75, type: "feature" }
          ]
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
          caption: "Early design attempts included too many features, overwhelming stressed co-parents",
          annotations: [
            {
              x: 40,
              y: 30,
              type: "issue",
              text: "Too many options created decision paralysis"
            },
            {
              x: 65,
              y: 50,
              type: "issue", 
              text: "Complex interface increased stress levels"
            },
            {
              x: 50,
              y: 75,
              type: "improvement",
              text: "Simplified to core conflict-reduction features"
            }
          ]
        }
      ]
    },
    sections: [],
    seoData: {
      image: "https://barskyux.com/wp-content/uploads/2025/08/studiodisplaynewlook.png",
      projectName: "Splittime App",
      results: ["Reduced stress and conflict", "Improved coordination and transparency"],
      technologies: ["iOS", "Android", "WebApp"],
      path: "/project/splittime"
    }
  },
  "investor-loan-app": {
    id: "investor-loan-app",
    title: "Redesigning Loans: 85% Fewer Errors, 40% Faster",
    description:
      "How I led a banking platform redesign that replaced Excel and scaled operations with speed, accuracy, and trust.",
    tags: ["FinTech", "Analytics", "WebApp"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    heroVideo: {
      src: "investor-loan-demo.mp4",
      poster: "https://barskyux.com/wp-content/uploads/2025/08/analysisdashboard-1.png",
      alt: "Investor loan platform dashboard"
    },
    researchSection: {
      subhead: "A private bank was managing investor loans in Excel, leading to errors, compliance risks, and delays. I designed a scalable loan platform with predictive search, guided workflows, and collaboration. The impact: 85% fewer errors, 40% faster processing, and restored trust from staff and regulators.",
      blurb: "Excel caused errors.",
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
          drove: "Stepwise flow; actions disabled until lender selection; real-time feedback."
        }
      ],
      researchImages: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/excelterror.jpg",
          alt: "Excel-based loan tracking spreadsheet with inconsistent fields and manual totals",
        }
      ]
    },
    problemCallout: {
      eyebrow: "Problem to Solve",
      statement: "Loan teams rely on error-prone spreadsheets with no audit trail, creating compliance risks, slow processing, and low trust in the data."
    },
    sprintZeroSection: {
      eyebrow: "0 → 1 EXPLORATION",
      title: "Sprint Zero: Blue-Sky Thinking",
      workshopKickoff: "Initial Concepts & Sketches — Placeholder — replace with final image.",
      explorations: "Early exploration of loan processing workflows and automated validation concepts.",
      decisionPoint: "I decided to build an intelligent workflow platform after seeing that most errors came from manual data entry and missing validation. I focused on automated checks, guided workflows, and clear audit trails to build trust through transparency and accuracy, instead of adding complex financial modeling features.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2023/12/BookBuilder-Low-Fidelity.png",
          alt: "Low-fidelity order builder wireframe for loan workflows",
          caption: "",
          annotations: [
            { text: "Stepwise order stages", x: 25, y: 20, type: "feature" },
            { text: "Required fields first", x: 60, y: 35, type: "improvement" },
            { text: "Validation badges", x: 40, y: 60, type: "feature" },
            { text: "Review & submit gate", x: 75, y: 80, type: "improvement" }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2023/12/whiteboarding.png",
          alt: "Whiteboard mapping of loan lifecycle from application to audit",
          caption: "",
          annotations: [
            { text: "Intake to screening", x: 20, y: 25, type: "feature" },
            { text: "Lender selection", x: 40, y: 40, type: "feature" },
            { text: "Order build & validate", x: 60, y: 30, type: "improvement" },
            { text: "Approval & booking", x: 75, y: 60, type: "feature" },
            { text: "Audit trail & monitoring", x: 50, y: 80, type: "improvement" }
          ]
        }
      ]
    },
    keyInsights: [
      { number: 1, title: "Trust through validation", description: "Real-time checks prevent errors and rework." },
      { number: 2, title: "Predictive findability", description: "Bloomberg-style search beats complex filters." },
      { number: 3, title: "Guided orders", description: "Stepwise flows reduce mistakes vs. flat forms." }
    ],
    ideationSection: {
      subhead: "I optimized deal findability, order building, validation, and collaboration to ensure compliance.",
      bubbles: [
        { title: "Deal summary", description: "Status, limits, totals" },
        { title: "Predictive search", description: "Category-aware, smart defaults" },
        { title: "Order builder", description: "Guided steps, fewer errors" },
        { title: "Audit & comments", description: "History and collaboration" }
      ],
      iterations: [
        { 
          label: "Iteration 1", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2023/12/Orderbook-ViewAddOrderDefault.png", 
          alt: "Early orderbook view with Add Order entry point and sparse validation",
          blurb: "Deal information is scattered — lacks a clear hierarchy\nNo real-time validation causes errors downstream",
          annotations: [
            { text: "Add Order entry", x: 30, y: 20, type: "feature" },
            { text: "Unclear field priority", x: 60, y: 45, type: "issue" },
            { text: "No inline checks", x: 50, y: 75, type: "issue" }
          ]
        },
        { 
          label: "Iteration 2", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2023/12/Add-Order-Default.png", 
          alt: "Add Order default form with clearer required fields and disabled actions",
          blurb: "Contextual filters reduce search time\nBloomberg-style search improves findability",
          annotations: [
            { text: "Required field indicators", x: 25, y: 30, type: "improvement" },
            { text: "Disabled submit until ready", x: 65, y: 50, type: "feature" },
            { text: "Contextual field help", x: 50, y: 75, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 3", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2023/12/Loan-Central-Orderbook-View.png", 
          alt: "Orderbook overview with real-time totals and status cues",
          blurb: "Real-time totals reduce calculation errors\nStep-by-step guidance prevents premature inputs",
          annotations: [
            { text: "Live totals", x: 35, y: 25, type: "feature" },
            { text: "Status chips", x: 65, y: 40, type: "improvement" },
            { text: "Inline validation states", x: 50, y: 70, type: "feature" }
          ]
        },
        { 
          label: "Iteration 4", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/uxpilot-design-1756062219098-scaled.png", 
          alt: "High-fidelity UI showing guided steps and validation feedback",
          blurb: "Collaborative comments improve team coordination\nImmutable audit trail meets compliance needs",
          annotations: [
            { text: "Step indicator", x: 30, y: 20, type: "feature" },
            { text: "Error prevention copy", x: 60, y: 45, type: "improvement" },
            { text: "Confirm & audit link", x: 70, y: 75, type: "feature" }
          ]
        }
      ]
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description: "Testing with loan officers validated my automation approach and revealed critical workflow improvements for compliance and speed.",
      eyebrow: "VALIDATION & TESTING",
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
      title: "The Final Product",
      description: "We built a loan management platform that replaced error-prone Excel workflows with smart automation, real-time checks, and clear audit trails. This gave the team full confidence in their operations.",
      eyebrow: "THE RESULT",
      images: [
        {
          src: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
          alt: "Investor loan platform dashboard final interface",
          caption: "Complete loan management platform with automated workflows and real-time validation",
          annotations: [
            {
              x: 20,
              y: 25,
              type: "feature",
              text: "Bloomberg-style search reduced lookup time by 60%"
            },
            {
              x: 70,
              y: 20,
              type: "feature",
              text: "Real-time validation prevented 85% of errors"
            },
            {
              x: 50,
              y: 60,
              type: "improvement",
              text: "Guided workflows eliminated premature inputs"
            },
            {
              x: 80,
              y: 80,
              type: "feature",
              text: "Audit trails ensure compliance transparency"
            }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2023/12/My-Deals-list-view.png",
          alt: "My Deals list view with quick filters, status chips, and bulk actions",
          caption: "",
          annotations: [
            {
              x: 25,
              y: 20,
              type: "feature",
              text: "Quick lender/status filters"
            },
            {
              x: 60,
              y: 40,
              type: "improvement",
              text: "Risk/progress status chips"
            },
            {
              x: 80,
              y: 70,
              type: "feature",
              text: "Bulk actions for common updates"
            }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2023/12/Loan-Deals-1.png",
          alt: "Loan deals table with summary sidebar, inline validation, and audit trail",
          caption: "",
          annotations: [
            {
              x: 30,
              y: 25,
              type: "feature",
              text: "Summary limits & totals"
            },
            {
              x: 65,
              y: 45,
              type: "improvement",
              text: "Inline validation prompts"
            },
            {
              x: 50,
              y: 75,
              type: "feature",
              text: "Change log & audit history"
            }
          ]
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2023/12/Just-Orderbook.png",
          alt: "Orderbook screen emphasizing guided steps and real-time totals",
          caption: "",
          annotations: [
            {
              x: 35,
              y: 20,
              type: "feature",
              text: "Guided step progression"
            },
            {
              x: 70,
              y: 40,
              type: "improvement",
              text: "Real-time total checks"
            },
            {
              x: 55,
              y: 70,
              type: "feature",
              text: "Reviewer comments thread"
            }
          ]
        }
      ]
    },
    outcomeSection: {
      title: "Outcome",
      description: "We transformed loan operations from slow, manual work into automated workflows that scale with the business, ensuring accuracy and compliance.",
      eyebrow: "OUTCOMES & IMPACT",
      metrics: [
        { value: "85%", label: "Fewer Errors" },
        { value: "40%", label: "Faster Processing" },
        { value: "200+", label: "Orders in 2 Months" }
      ],
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/analysisdashboard.png",
          alt: "Analysis dashboard showing the successful loan processing outcomes",
          caption: "",
          annotations: [
            {
              x: 30,
              y: 25,
              type: "feature",
              text: "Validation at each step"
            },
            {
              x: 65,
              y: 50,
              type: "improvement",
              text: "Submit only when complete"
            },
            {
              x: 50,
              y: 75,
              type: "feature",
              text: "Audit-ready artifacts"
            }
          ]
        }
      ]
    },
    myThoughtProcessSection: {
      eyebrow: "APPROACH & DECISION MAKING",
      title: "My Thought Process",
      content: "I saw this as a process problem, not just a UI issue. By shadowing loan officers and mapping their real workflows, I found the main problems were scattered data, manual mistakes, and missing audit trails. My solution focused on automation, validation, and transparency instead of flashy design.",
      images: [
        {
          src: "/lovable-uploads/6e0291a5-2519-4b89-8402-44a9b8a27cf0.png",
          alt: "Investor loan platform user workflow and process improvements",
          annotations: [
            { text: "I treated this as a workflow problem, not a design problem—shadowing loan officers to understand where manual processes created real bottlenecks.", x: 25, y: 35, type: "improvement" },
            { text: "The result: intelligent automation and transparent audit trails that eliminated data fragmentation and built trust through accountability.", x: 75, y: 65, type: "feature" }
          ]
        }
      ]
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "Learning from Challenges",
      content: "Excel System → New Platform: Manual entry, frequent errors → Automated workflows with validation. No collaboration → In-app commenting and shared loan orders. Flat spreadsheets → Card + table views with live syncing. No audit history → Full visual audit logs. No search → AI-powered predictive search.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/uxpilot-design-1756062303031-scaled.png",
          alt: "Collage highlighting legacy manual steps and fragmentation",
          caption: "",
          annotations: [
            {
              x: 30,
              y: 25,
              type: "issue",
              text: "Multiple sources of truth"
            },
            {
              x: 60,
              y: 50,
              type: "issue",
              text: "Manual reconciliation"
            },
            {
              x: 50,
              y: 75,
              type: "issue",
              text: "Compliance blind spots"
            }
          ]
        }
      ]
    },
    sections: [],
    seoData: {
      image: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
      projectName: "Investor Loan App",
      results: [
        "85% fewer errors",
        "40% faster processing",
        "80% satisfaction",
        "200+ orders in 2 months"
      ],
      technologies: ["React", "Data Visualization", "Automation"],
      path: "/project/investor-loan-app"
    }
  },
  "business-management": {
    id: "business-management",
    title: "Using Design Thinking to Reduce Enterprise Operation Errors by 68%",
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    tags: ["Blue Sky", "Design Thinking", "Enterprise", "WebApp", "Mobile"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    projectLink: "https://in-situ-quickbooks-flow.lovable.app/",
    heroVideo: {
      src: "https://barskyux.com/wp-content/uploads/2025/07/businessmanagement.mp4",
      poster: "https://barskyux.com/wp-content/uploads/2025/08/promoimagefull.png",
      alt: "Business management system promotional overview"
    },
    researchSection: {
      subhead: "Small businesses often had to juggle different tools for scheduling, invoicing, and tasks. To solve this, I created a single platform that brings everything together. My goal was to cut down on admin work and give owners more time back. In the end, users spent 35% less time on manual tasks.",
      blurb: "Tools caused chaos.",
        emergingThemes: [
        {
          eyebrow: "CONSOLIDATION",
          insight: "Scheduling, invoicing, and tasks lived in separate systems.",
          drove: "Unified dashboard with linked records."
        },
        {
          eyebrow: "AUTOMATION",
          insight: "Recurring work (invoices, reminders) was manual.",
          drove: "Recurrence, templates, and smart reminders."
        },
        {
          eyebrow: "VISIBILITY & PRIORITY",
          insight: "Hard to see what needs attention now.",
          drove: "'Today' view with aging statuses and alerts."
        }
      ],
      researchImage: "https://barskyux.com/wp-content/uploads/2025/07/Screenshot-2025-07-18-at-12.02.14-PM.png?v=20250122",
      researchImageAlt: "Inventory audit screenshot showing data fragmentation across tools",
      researchImages: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/07/AutomatedInventoryTrackingSystem-Claude-8July2025-ezgif.com-video-to-gif-converter.gif",
          alt: "Animated workflow of automated inventory tracking system"
        }
      ]
    },
    problemCallout: {
      eyebrow: "Problem to Solve",
      statement: "Small businesses often juggle disconnected tools for scheduling, invoicing, and tasks, wasting hours weekly and losing revenue."
    },
    sprintZeroSection: {
      eyebrow: "0 → 1 EXPLORATION",
      title: "Sprint Zero: Blue-Sky Thinking",
      workshopKickoff: "Initial concept sitemap mapping core modules and navigation.",
      explorations: "I explored blue-sky concepts ranging from AI-powered workflow automation to intelligent business insights. Early sketches included predictive cash flow modeling, automated client follow-ups, and integrated marketing campaigns. I tested divergent ideas like voice-controlled task management and smart scheduling optimization to understand what would genuinely improve daily business operations.",
      decisionPoint: "I decided to build a unified operations platform after seeing that most problems came from switching between tools and re-entering data. I focused on bringing core functions together, automating repetitive work, and making daily priorities clear. This approach created efficiency by integrating features, not by adding more complexity.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/07/sitemap.png",
          alt: "Initial Concepts & Sketches",
          caption: "Initial concept sitemap mapping core modules and navigation."
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/uxpilot-design-1755796640970-scaled.png",
          alt: "User Flow Explorations",
          caption: "User flow exploration detailing end-to-end operations from intake to invoicing."
        }
      ]
    },
    keyInsights: [
      { number: 1, title: "One platform", description: "Consolidating core ops cuts tool chaos." },
      { number: 2, title: "Automation wins", description: "Recurring invoices and reminders save hours weekly." },
      { number: 3, title: "Priority at a glance", description: "A single dashboard surfaces what needs attention now." }
    ],
    ideationSection: {
      subhead: "I iterated on a simple \"run the day\" loop, encompassing dashboard, tasks, invoices, and scheduling.",
      bubbles: [
        { title: "Dashboard KPIs", description: "Cash flow and alerts" },
        { title: "Tasks", description: "Today, overdue, owners" },
        { title: "Invoices", description: "Draft → sent → paid" },
        { title: "Scheduling", description: "Availability and bookings" }
      ],
      iterations: [
        { 
          label: "Iteration 1", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/image_0.png", 
          alt: "First iteration of business dashboard",
          blurb: "Information overload — too many metrics at once\nNo clear priority hierarchy for daily tasks",
          annotations: [
            { text: "Information overload - too many metrics at once", x: 50, y: 30, type: "issue" },
            { text: "No clear priority hierarchy for daily tasks", x: 70, y: 60, type: "issue" }
          ]
        },
        { 
          label: "Iteration 2", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/image_1.png", 
          alt: "Second iteration with task management",
          blurb: "\"Today\" view focuses on immediate actions\nTask prioritization system added for clarity",
          annotations: [
            { text: "Task prioritization system added for clarity", x: 35, y: 25, type: "feature" },
            { text: "Today view focuses on immediate actions", x: 80, y: 50, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 3", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/image_2.png", 
          alt: "Third iteration adding invoice workflow",
          blurb: "Template system ensures consistency\nAutomated invoice generation saves hours",
          annotations: [
            { text: "Automated invoice generation saves hours", x: 40, y: 35, type: "feature" },
            { text: "Template system ensures consistency", x: 65, y: 65, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 4", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/image_3.png", 
          alt: "Fourth iteration with scheduling integration",
          blurb: "Linked records reduce duplicate data entry\nIntegrated scheduling eliminates tool switching",
          annotations: [
            { text: "Integrated scheduling eliminates tool switching", x: 50, y: 25, type: "feature" },
            { text: "Linked records reduce duplicate data entry", x: 60, y: 70, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 5", 
          imageSrc: "/media/biz/ideation-5.jpg", 
          alt: "Final iteration with unified operations",
          annotations: [
            { text: "Unified operations platform reduces errors by 68%", x: 45, y: 30, type: "feature" },
            { text: "Smart automation handles recurring tasks", x: 55, y: 60, type: "improvement" }
          ]
        }
      ]
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description: "Testing with small business owners validated my unified platform approach and revealed key workflow improvements for daily operations.",
      eyebrow: "VALIDATION & TESTING",
      metrics: [
        { value: "90%", label: "User Satisfaction" },
        { value: "68%", label: "Fewer Errors" },
        { value: "5min", label: "Daily Setup" }
      ],
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/promoimagefull.png",
          alt: "User testing session showing business management workflow validation",
          caption: "Testing sessions confirmed my unified approach significantly improved daily operations efficiency."
        }
      ]
    },
    finalProductSection: {
      title: "The Final Product",
      description: "A unified business management platform that consolidates scheduling, invoicing, and task management into one intelligent system, eliminating tool chaos and manual errors.",
      eyebrow: "THE RESULT",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/07/993shots_so.png",
          alt: "Business management system final interface",
          caption: "Complete business management platform with unified operations and automated workflows",
          annotations: [
            {
              x: 20,
              y: 25,
              type: "feature",
              text: "Unified dashboard eliminated tool switching"
            },
            {
              x: 70,
              y: 20,
              type: "feature",
              text: "Automated invoicing reduced errors by 68%"
            },
            {
              x: 50,
              y: 60,
              type: "improvement",
              text: "Smart priority system surfaces urgent tasks"
            },
            {
              x: 80,
              y: 80,
              type: "feature",
              text: "Integrated scheduling prevents double-booking"
            }
          ]
        }
      ]
    },
    outcomeSection: {
      title: "Outcome",
      description: "I helped small businesses move from messy, multi-tool workflows to a smoother, automated system. This change led to fewer errors and made daily operations much more efficient.",
      eyebrow: "OUTCOMES & IMPACT",
      metrics: [
        { value: "68%", label: "Fewer Errors" },
        { value: "35%", label: "Faster Processing" },
        { value: "90%", label: "User Satisfaction" }
      ],
      images: [
        {
          src: "https://www.loom.com/share/6b2dbd5672944f3b8bbaea71335afab7?sid=f9fa11c9-9c89-440b-bbc8-8eca0aa7c524",
          alt: "Business management system full user journey demonstration",
          caption: "Complete user journey showing the full process in high fidelity"
        }
      ]
    },
    myThoughtProcessSection: {
      eyebrow: "APPROACH & DECISION MAKING",
      title: "My Thought Process",
      content: "I focused on making the system efficient, not overloaded with features. By learning how small businesses really operate—switching between tools, missing follow-ups, and losing money to manual mistakes—I built a platform that works the way business owners do. The result: a unified platform that thinks like a business owner and reduces busywork through smart defaults and automation.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-21-2025-01_29_46-PM.png",
          alt: "Business management system operational improvements and metrics",
          annotations: [
            { text: "I designed around how small businesses actually work—jumping between tools and losing revenue to forgotten follow-ups and manual errors.", x: 25, y: 40, type: "improvement" },
            { text: "The result: a unified platform that thinks like a business owner, automatically handling the details so teams can focus on growth.", x: 75, y: 60, type: "feature" }
          ]
        }
      ]
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "Lessons Learned",
      content: "Initially, I added too many customization options, which made the platform confusing for users. I learned that offering smart defaults with a few key options made the platform both strong and easy for business owners to use.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/uxpilot-design-1755798369735-scaled.png",
          alt: "Early business management interface with feature overload",
          caption: "Early designs included too many customization options, overwhelming busy business owners",
          annotations: [
            {
              x: 35,
              y: 30,
              type: "issue",
              text: "Too many options created decision paralysis"
            },
            {
              x: 60,
              y: 50,
              type: "issue",
              text: "Complex settings overwhelmed users"
            },
            {
              x: 50,
              y: 75,
              type: "improvement",
              text: "Smart defaults with selective customization"
            }
          ]
        }
      ]
    },
    sections: [],
    seoData: {
      image: "https://barskyux.com/wp-content/uploads/2025/08/promoimagefull.png",
      projectName: "Business Management System",
      results: ["68% fewer errors", "35% faster processing", "90% satisfaction", "100% uptime"],
      technologies: ["React", "Mobile", "Enterprise", "Operations"],
      path: "/project/business-management"
    }
  }
};

export const getStructuredCaseStudy = (id: string): StructuredCaseStudyData | null => {
  return structuredCaseStudies[id] || null;
};
