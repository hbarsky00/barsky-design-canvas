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
  emergingThemes: EmergingTheme[];
  researchImage?: string;
  researchImageAlt?: string;
  researchImages?: { src: string; alt: string; }[];
}

export interface IdeationBubble {
  title: string;
  description: string;
}

export interface IdeationIteration {
  label: string;
  imageSrc: string;
  alt: string;
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
  researchSection?: ResearchSection;
  problemCallout?: {
    eyebrow: string;
    statement: string;
  };
  keyInsights?: {
    number: number;
    title: string;
    description: string;
  }[];
  ideationSection?: IdeationSection;
  myThoughtProcessSection?: {
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
    description: string;
    metrics?: Array<{
      label: string;
      value: string;
      description?: string;
    }>;
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
  "herbalink": {
    id: "herbalink",
    title: "3x More Bookings: How I Connected Users to Certified Herbalists",
    description: "Connected users to certified herbalists across the country and increased booking rates by 3x through AI-powered matching and streamlined UX.",
    tags: ["GenAI", "HealthTech", "iOS", "Android", "WebApp"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    projectLink: "http://herbalink.live",
    heroVideo: {
      src: "https://barskyux.com/wp-content/uploads/2025/07/HerbaLink-Book-A-Herbalist-1.mp4",
      poster: "https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png",
      alt: "HerbaLink feature overview"
    },
    researchSection: {
      subhead: "User and practitioner interviews surfaced safety concerns and low trust in unverified remedies.",
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
    keyInsights: [
      { number: 1, title: "Trust signals first", description: "Verified practitioners and clear bios drive confidence." },
      { number: 2, title: "Personalization", description: "Intake and history enable better practitioner matching." },
      { number: 3, title: "Continuity of care", description: "Booking, notes, and follow-ups keep users engaged." }
    ],
    ideationSection: {
      subhead: "We explored profile, safety, matching, and booking flows—tight loops to validate trust and speed.",
      bubbles: [
        { title: "Profile essentials", description: "What users need at a glance" },
        { title: "Safety info", description: "Contraindications and dosage clarity" },
        { title: "Match criteria", description: "Condition, modality, availability" },
        { title: "Booking flow", description: "Fewer steps, clearer expectations" }
      ],
      iterations: [
        { label: "Iteration 1", imageSrc: "https://barskyux.com/wp-content/uploads/2025/07/Screenshot-2025-07-13-at-9.50.22-PM.png", alt: "First iteration of HerbaLink profile design" },
        { label: "Iteration 2", imageSrc: "https://barskyux.com/wp-content/uploads/2025/07/herbalistopening.jpg", alt: "Second iteration focusing on safety information" },
        { label: "Iteration 3", imageSrc: "https://barskyux.com/wp-content/uploads/2025/07/Herbalinkpromo.jpg", alt: "Third iteration with match criteria refinements" },
        { label: "Iteration 4", imageSrc: "https://barskyux.com/wp-content/uploads/2025/07/Book-Herablist-Symptom-Tracker-and-My-Profile.png", alt: "Fourth iteration streamlining booking flow" }
      ]
    },
    myThoughtProcessSection: {
      content: "I designed HerbaLink as a platform built on trust, not just features. By prioritizing outcomes over aesthetics and uncovering user pain points, I focused on usability, credibility, and retention. The result: simple onboarding, clear symptom tracking, and a community that builds confidence.",
      images: [
        {
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2025/07/UserFlow.png?fit=1232%2C928&ssl=1",
          alt: "HerbaLink user flow from onboarding to booking",
          caption: "User flow from onboarding to booking and tracking."
        }
      ]
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description: "Testing with both practitioners and patients validated our trust-focused approach and revealed key usability improvements for the booking flow.",
      eyebrow: "VALIDATION & TESTING",
      metrics: [
        { value: "92%", label: "Task Completion" },
        { value: "4.8/5", label: "Trust Score" },
        { value: "30s", label: "Avg. Booking Time" }
      ],
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/herbalink-book-an-herbalist-scaled.png",
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
          caption: "Complete HerbaLink desktop experience showing the comprehensive interface design"
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
      description: "We built a strong foundation for outcomes, validating the model and setting up a roadmap to scale with AI, long-term tracking, and practitioner insights.",
      eyebrow: "OUTCOMES & IMPACT",
      metrics: [
        { value: "3x", label: "Booking Rate Increase" },
        { value: "85%", label: "Match Accuracy" },
        { value: "24hr", label: "Response Time" }
      ],
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/symptomtrackermobile.png",
          alt: "HerbaLink conversation with herbalist and symptom tracker interface"
        }
      ]
    },
    whatDidntWorkSection: {
      title: "What Didn't Work",
      description: "Early prototypes focused too heavily on complex categorization systems and overwhelming information architecture. Users needed simple, guided discovery rather than comprehensive databases.",
      eyebrow: "LESSONS LEARNED",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/07/herbalistdemo-2.png",
          alt: "HerbaLink early 'Book an Herbalist' concept",
          caption: "Early concept of the 'Book an Herbalist' feature. At this stage, the flow felt underdeveloped and lacked the clarity users needed — it was clear this part of the app needed a much more thoughtful design approach."
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
    title: "40% Less Conflict: Designing Neutral Co-Parenting Tools",
    description: "Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools designed for high-stress family situations.",
    tags: ["FamilyTech", "iOS", "Android", "LegalUX", "ConflictReduction"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    projectLink: "https://splittime.pro",
    heroVideo: {
      src: "",
      poster: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1",
      alt: "Splittime co-parenting app hero overview"
    },
    researchSection: {
      subhead: "Interviews and walkthroughs with co-parents revealed decision fatigue from fragmented schedules, expenses, and agreements.",
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
        researchImage: "https://barskydesign.pro/media/REPLACE-ME-top.jpg",
        researchImageAlt: "Research artifact — TOP (replace this URL)",
        researchImages: [
          {
            src: "https://barskydesign.pro/media/REPLACE-ME-bottom.jpg",
            alt: "Research artifact — BOTTOM (replace this URL)"
          }
        ]
    },
    problemCallout: {
      eyebrow: "Problem to Solve",
      statement: "Co-parents lack a single source of truth for schedules, expenses, and decisions—causing miscommunication, missed pickups, and ongoing conflict."
    },
    keyInsights: [
      { number: 1, title: "Single source of truth", description: "One shared schedule and ledger eliminates disputes." },
      { number: 2, title: "Consent & clarity", description: "Approvals and change logs build trust between co-parents." },
      { number: 3, title: "Calm communication", description: "Neutral templates reduce conflict and decision fatigue." }
    ],
    ideationSection: {
      subhead: "We tested calendar, approvals, expenses, and messaging to reduce conflict and missed handoffs.",
      bubbles: [
        { title: "Today's schedule", description: "Hand-offs, locations, changes" },
        { title: "Approvals", description: "Requests, confirmations, history" },
        { title: "Expenses", description: "Shared ledger with receipts" },
        { title: "Messaging", description: "Tone-safe templates" }
      ],
      iterations: [
        { label: "Iteration 1", imageSrc: "/media/splittime/ideation-1.jpg", alt: "First iteration of Splittime calendar view" },
        { label: "Iteration 2", imageSrc: "/media/splittime/ideation-2.jpg", alt: "Second iteration with approval flows" },
        { label: "Iteration 3", imageSrc: "/media/splittime/ideation-3.jpg", alt: "Third iteration adding expense tracking" },
        { label: "Iteration 4", imageSrc: "/media/splittime/ideation-4.jpg", alt: "Fourth iteration with messaging templates" },
        { label: "Iteration 5", imageSrc: "/media/splittime/ideation-5.jpg", alt: "Final iteration with unified interface" }
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
          caption: "Testing sessions validated our neutral communication approach and approval workflow design."
        }
      ]
    },
    finalProductSection: {
      title: "The Final Product",
      description: "A co-parenting platform that prioritizes children's wellbeing through clear communication, shared scheduling, and conflict reduction tools that help separated families coordinate effectively.",
      eyebrow: "THE RESULT",
      images: [
        {
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1",
          alt: "Splittime final product showing co-parenting interface",
          caption: "Complete Splittime platform enabling conflict-free co-parenting coordination"
        }
      ]
    },
    outcomeSection: {
      title: "Outcome",
      description: "Splittime transformed how separated families communicate and coordinate, creating a foundation for healthier relationships and better outcomes for children.",
      eyebrow: "OUTCOMES & IMPACT",
      metrics: [
        { value: "40%", label: "Conflict Reduction" },
        { value: "90%", label: "User Satisfaction" },
        { value: "24hr", label: "Response Time" }
      ],
      images: [
        {
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/splittime-user-flow.png",
          alt: "Splittime user satisfaction metrics and communication improvements"
        }
      ]
    },
    sections: [
      {
        id: "my-thought-process",
        title: "My Thought Process",
        icon: Sparkles,
        variant: "solution",
        content: "Co-parenting apps often fail because they focus on features rather than emotions. I designed Splittime around conflict reduction first—neutral language, clear boundaries, and shared accountability. The result was a platform that helps families communicate better, not just organize better.",
        media: {
          type: 'image',
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/splittime-user-flow.png",
          alt: "Splittime user flow diagram showing communication patterns",
          caption: "User flow focused on conflict reduction and neutral communication."
        }
      }
    ],
    seoData: {
      image: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1",
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
      poster: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
      alt: "Investor loan platform dashboard"
    },
    researchSection: {
      subhead: "Shadowing loan officers and error-log reviews showed spreadsheet mistakes, slow retrieval, and no audit trail.",
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
        researchImage: "https://barskydesign.pro/media/REPLACE-ME-top.jpg",
        researchImageAlt: "Research artifact — TOP (replace this URL)",
        researchImages: [
          {
            src: "https://barskydesign.pro/media/REPLACE-ME-bottom.jpg",
            alt: "Research artifact — BOTTOM (replace this URL)"
          }
        ]
    },
    problemCallout: {
      eyebrow: "Problem to Solve",
      statement: "Loan teams rely on error-prone spreadsheets with no audit trail—creating compliance risk, slow processing, and low trust in the data."
    },
    keyInsights: [
      { number: 1, title: "Trust through validation", description: "Real-time checks prevent errors and rework." },
      { number: 2, title: "Predictive findability", description: "Bloomberg-style search beats complex filters." },
      { number: 3, title: "Guided orders", description: "Stepwise flows reduce mistakes vs. flat forms." }
    ],
    ideationSection: {
      subhead: "We shaped deal findability, order building, validation, and collaboration around compliance.",
      bubbles: [
        { title: "Deal summary", description: "Status, limits, totals" },
        { title: "Predictive search", description: "Category-aware, smart defaults" },
        { title: "Order builder", description: "Guided steps, fewer errors" },
        { title: "Audit & comments", description: "History and collaboration" }
      ],
      iterations: [
        { label: "Iteration 1", imageSrc: "/media/investment/ideation-1.jpg", alt: "First iteration of deal summary interface" },
        { label: "Iteration 2", imageSrc: "/media/investment/ideation-2.jpg", alt: "Second iteration with predictive search" },
        { label: "Iteration 3", imageSrc: "/media/investment/ideation-3.jpg", alt: "Third iteration of guided order builder" },
        { label: "Iteration 4", imageSrc: "/media/investment/ideation-4.jpg", alt: "Fourth iteration with audit and comments" },
        { label: "Iteration 5", imageSrc: "/media/investment/ideation-5.jpg", alt: "Final iteration with integrated workflow" }
      ]
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description: "Testing with loan officers validated our automation approach and revealed critical workflow improvements for compliance and speed.",
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
          caption: "Testing sessions confirmed our automated validation approach significantly reduced processing errors."
        }
      ]
    },
    finalProductSection: {
      title: "The Final Product",
      description: "A comprehensive loan management platform that replaced error-prone Excel workflows with intelligent automation, real-time validation, and transparent audit trails for complete operational confidence.",
      eyebrow: "THE RESULT",
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
      description: "Transformed loan operations from manual, error-prone processes to intelligent, automated workflows that scale with business growth while maintaining complete accuracy and compliance.",
      eyebrow: "OUTCOMES & IMPACT",
      metrics: [
        { value: "85%", label: "Fewer Errors" },
        { value: "40%", label: "Faster Processing" },
        { value: "200+", label: "Orders in 2 Months" }
      ],
      images: [
        {
          src: "/lovable-uploads/6e0291a5-2519-4b89-8402-44a9b8a27cf0.png",
          alt: "Investor loan platform user workflow and process improvements"
        }
      ]
    },
    sections: [
      {
        id: "before-vs-after",
        title: "Before vs. After",
        icon: Target,
        variant: "solution",
        eyebrow: "TRANSFORMATION",
        content:
          "Excel System → New Platform:\n- Manual entry, frequent errors → Automated workflows with validation\n- No collaboration → In-app commenting and shared loan orders\n- Flat spreadsheets → Card + table views with live syncing\n- No audit history → Full visual audit logs\n- No search → AI-powered predictive search",
        media: {
          type: 'image',
          src: "/lovable-uploads/6e0291a5-2519-4b89-8402-44a9b8a27cf0.png",
          alt: "User workflow",
          caption: "Streamlined end-to-end workflow across roles."
        }
      },
      {
        id: "my-thought-process",
        title: "My Thought Process", 
        icon: Sparkles,
        variant: "solution",
        content: "I approached this as a process problem, not a UI problem. By shadowing loan officers and mapping their actual workflows, I identified the core pain points: data fragmentation, manual errors, and lack of audit trails. The solution prioritized automation, validation, and transparency over flashy interfaces.",
        media: {
          type: 'image',
          src: "/lovable-uploads/investor-loan-thought-process.png",
          alt: "Investor loan app workflow mapping and process analysis",
          caption: "Process mapping revealed automation opportunities and error reduction points."
        }
      }
    ],
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
  "wholesale-distribution": {
    id: "wholesale-distribution",
    title: "95% Less Manual Work: Wholesale Distribution Transformation",
    description: "Turned error-prone Excel operations into an AI-assisted workflow with near-perfect accuracy and speed.",
    tags: ["Automation", "AI", "Operations", "WebApp"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    projectLink: "https://in-situ-quickbooks-flow.lovable.app/",
    heroVideo: {
      src: "wholesale-demo.mp4",
      poster: "/placeholder.svg",
      alt: "Wholesale operations dashboard walkthrough"
    },
    keyInsights: [
      { number: 1, title: "Process over interface", description: "Fixing workflows beats pretty dashboards on broken systems." },
      { number: 2, title: "Data pipelines win", description: "Automated flows eliminate human error and speed." },
      { number: 3, title: "End-to-end thinking", description: "From order to reconciliation in one unified system." }
    ],
    ideationSection: {
      subhead: "We prototyped order capture, validation, routing, and reconciliation to eliminate Excel entirely.",
      bubbles: [
        { title: "Order capture", description: "Smart forms, auto-completion" },
        { title: "Validation", description: "Real-time checks, error prevention" },
        { title: "Routing", description: "Automated workflows, approvals" },
        { title: "Reconciliation", description: "Live tracking, instant totals" }
      ],
      iterations: [
        { label: "Iteration 1", imageSrc: "/media/wholesale/ideation-1.jpg", alt: "First iteration of order capture interface" },
        { label: "Iteration 2", imageSrc: "/media/wholesale/ideation-2.jpg", alt: "Second iteration with validation features" },
        { label: "Iteration 3", imageSrc: "/media/wholesale/ideation-3.jpg", alt: "Third iteration adding routing automation" },
        { label: "Iteration 4", imageSrc: "/media/wholesale/ideation-4.jpg", alt: "Fourth iteration with reconciliation dashboard" },
        { label: "Iteration 5", imageSrc: "/media/wholesale/ideation-5.jpg", alt: "Final iteration with complete pipeline" }
      ]
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description: "Testing with distribution teams confirmed our AI-assisted approach eliminated manual errors and dramatically improved processing speed.",
      eyebrow: "VALIDATION & TESTING",
      metrics: [
        { value: "98%", label: "Accuracy Rate" },
        { value: "95%", label: "Less Manual Work" },
        { value: "10s", label: "Order Processing" }
      ],
      images: [
        {
          src: "/placeholder.svg",
          alt: "User testing session showing distribution workflow validation",
          caption: "Testing confirmed our automation approach eliminated manual Excel processes entirely."
        }
      ]
    },
    finalProductSection: {
      title: "The Final Product",
      description: "An intelligent wholesale distribution platform that eliminated manual Excel processes through AI-assisted workflows, achieving near-perfect accuracy and dramatically increased speed.",
      eyebrow: "THE RESULT",
      images: [
        {
          src: "/placeholder.svg",
          alt: "Wholesale distribution platform final interface",
          caption: "Complete AI-powered distribution system replacing manual Excel workflows"
        }
      ]
    },
    outcomeSection: {
      title: "Outcome",
      description: "Transformed wholesale operations from error-prone manual processes to intelligent automated workflows, delivering unprecedented accuracy and efficiency gains.",
      eyebrow: "OUTCOMES & IMPACT",
      metrics: [
        { value: "95%", label: "Less Manual Work" },
        { value: "500%", label: "Faster Processing" },
        { value: "99.7%", label: "Accuracy Rate" }
      ],
      images: [
        {
          src: "/wholesale-thought-process.png",
          alt: "Wholesale distribution transformation results and automation benefits"
        }
      ]
    },
    sections: [
      {
        id: "the-problem",
        title: "The Problem",
        icon: AlertTriangle,
        variant: "problem",
        eyebrow: "CHALLENGE",
        content: "Teams managed 200+ weekly orders in Excel, leading to 15% errors, slow reconciliation, and risk to key accounts.",
        media: {
          type: 'image',
          src: "/placeholder.svg",
          alt: "Manual order tracking in spreadsheets",
          caption: "Excel-based operations caused avoidable errors and delays."
        }
      },
      {
        id: "my-thought-process",
        title: "My Thought Process",
        icon: Sparkles,
        variant: "solution",
        content: "I treated this as a systems transformation, not just a digital upgrade. By shadowing operations teams and mapping their workflows end-to-end, I identified where manual processes created bottlenecks and errors. The solution focused on intelligent automation and data pipelines that eliminated repetitive work while maintaining accuracy.",
        media: {
          type: 'image',
          src: "/wholesale-thought-process.png",
          alt: "Wholesale distribution workflow analysis and automation points",
          caption: "End-to-end process mapping revealed automation opportunities across the entire distribution pipeline."
        },
        tags: ["ProcessDesign", "Automation", "DataPipelines", "AIEnablement"]
      }
    ],
    seoData: {
      image: "/placeholder.svg",
      projectName: "Wholesale Distribution",
      results: ["95% less manual work", "500% faster processing", "99.7% accuracy"],
      technologies: ["React", "Automation", "AI"],
      path: "/project/wholesale-distribution"
    }
  },
  "business-management": {
    id: "business-management",
    title: "68% Fewer Errors: Streamlining Enterprise Operations",
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    tags: ["Enterprise", "Operations", "WebApp", "Mobile"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    projectLink: "https://in-situ-quickbooks-flow.lovable.app/",
    heroVideo: {
      src: "https://barskyux.com/wp-content/uploads/2025/07/businessmanagement.mp4",
      poster: "https://barskyux.com/wp-content/uploads/2025/08/promoimagefull.png",
      alt: "Business management system promotional overview"
    },
    researchSection: {
      subhead: "Surveys and workflow audits showed owners switching between disconnected tools and duplicating data.",
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
      researchImage: "https://barskydesign.pro/media/REPLACE-ME-top.jpg",
      researchImageAlt: "Research artifact — TOP (replace this URL)",
      researchImages: [
        {
          src: "https://barskydesign.pro/media/REPLACE-ME-bottom.jpg",
          alt: "Research artifact — BOTTOM (replace this URL)"
        }
      ]
    },
    problemCallout: {
      eyebrow: "Problem to Solve",
      statement: "Small businesses juggle disconnected tools for scheduling, invoicing, and tasks—wasting hours weekly and leaking revenue."
    },
    keyInsights: [
      { number: 1, title: "One platform", description: "Consolidating core ops cuts tool chaos." },
      { number: 2, title: "Automation wins", description: "Recurring invoices and reminders save hours weekly." },
      { number: 3, title: "Priority at a glance", description: "A single dashboard surfaces what needs attention now." }
    ],
    ideationSection: {
      subhead: "We iterated on a simple \"run the day\" loop—dashboard, tasks, invoices, and scheduling.",
      bubbles: [
        { title: "Dashboard KPIs", description: "Cash flow and alerts" },
        { title: "Tasks", description: "Today, overdue, owners" },
        { title: "Invoices", description: "Draft → sent → paid" },
        { title: "Scheduling", description: "Availability and bookings" }
      ],
      iterations: [
        { label: "Iteration 1", imageSrc: "/media/biz/ideation-1.jpg", alt: "First iteration of business dashboard" },
        { label: "Iteration 2", imageSrc: "/media/biz/ideation-2.jpg", alt: "Second iteration with task management" },
        { label: "Iteration 3", imageSrc: "/media/biz/ideation-3.jpg", alt: "Third iteration adding invoice workflow" },
        { label: "Iteration 4", imageSrc: "/media/biz/ideation-4.jpg", alt: "Fourth iteration with scheduling integration" },
        { label: "Iteration 5", imageSrc: "/media/biz/ideation-5.jpg", alt: "Final iteration with unified operations" }
      ]
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description: "Testing with small business owners validated our unified platform approach and revealed key workflow improvements for daily operations.",
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
          caption: "Testing sessions confirmed our unified approach significantly improved daily operations efficiency."
        }
      ]
    },
    finalProductSection: {
      title: "The Final Product",
      description: "A unified business management platform that consolidates scheduling, invoicing, and task management into one intelligent system, eliminating tool chaos and manual errors.",
      eyebrow: "THE RESULT",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/promoimagefull.png",
          alt: "Business management system final interface",
          caption: "Complete business management platform with unified operations and automated workflows"
        }
      ]
    },
    outcomeSection: {
      title: "Outcome",
      description: "Transformed small business operations from chaotic multi-tool workflows to streamlined automation, delivering significant error reduction and operational efficiency gains.",
      eyebrow: "OUTCOMES & IMPACT",
      metrics: [
        { value: "68%", label: "Fewer Errors" },
        { value: "35%", label: "Faster Processing" },
        { value: "90%", label: "User Satisfaction" }
      ],
      images: [
        {
          src: "/lovable-uploads/quickflow_process_flow.svg",
          alt: "Business management system operational improvements and metrics"
        }
      ]
    },
    sections: [
      {
        id: "my-thought-process",
        title: "My Thought Process",
        icon: Sparkles,
        variant: "solution",
        content: "I designed this system around operational efficiency, not feature complexity. By understanding how small businesses actually work—jumping between tools, forgetting follow-ups, and losing revenue to manual errors—I created a unified platform that thinks like a business owner.",
        media: {
          type: 'image',
          src: "https://barskyux.com/wp-content/uploads/2025/08/promoimagefull.png",
          alt: "Business management system design thinking and operational focus",
          caption: "Unified platform designed around real business workflows and pain points."
        }
      }
    ],
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
