import React from "react";
import { AlertCircle, TrendingUp, X, Lightbulb } from "lucide-react";
import { StructuredCaseStudySectionProps } from "@/components/case-study/structured/StructuredCaseStudySection";

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
    projectLink: "https://herbalink.live",
    heroVideo: {
      src: "herbalink-demo.mp4",
      poster: "/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png",
      alt: "HerbaLink app demonstration showing herbalist matching process"
    },
    sections: [
      {
        id: "the-problem",
        title: "🧩 The Problem",
        icon: React.createElement(AlertCircle, { className: "h-6 w-6" }),
        variant: "problem",
        content: "Users couldn't find trustworthy herbalists online due to fragmented directories and no verification system. Rural communities especially suffered from lack of access to qualified natural health practitioners, while practitioners struggled to reach patients who needed their expertise.",
        media: {
          type: 'image',
          src: "/lovable-uploads/635f7690-e7c5-4e2f-8260-099c3bde45ca.png",
          alt: "Healthcare professional illustration showing the digital transformation needed",
          caption: "Traditional healthcare gaps in natural medicine accessibility"
        }
      },
      {
        id: "quantified-impact",
        title: "📊 Quantified Impact",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content: "The platform delivered measurable improvements across all key metrics, fundamentally changing how users connect with herbalists and transforming the natural healthcare landscape.",
        metrics: [
          { value: "3x", label: "Increase in booking rates", trend: "up" },
          { value: "85%", label: "Users find ideal match in first 3 recommendations", trend: "up" },
          { value: "78%", label: "User satisfaction with match quality", trend: "up" },
          { value: "50%", label: "Faster decision-making through improved filters", trend: "up" }
        ],
        media: {
          type: 'image',
          src: "/lovable-uploads/0afc5405-ec7b-4938-a467-96cf505b98d8.png",
          alt: "HerbaLink mobile app interface showing complete user journey",
          caption: "Complete user journey from discovery to booking"
        }
      },
      {
        id: "what-didnt-work",
        title: "❌ What Didn't Work",
        icon: React.createElement(X, { className: "h-6 w-6" }),
        variant: "failed",
        content: "The initial map-first layout confused users and buried essential trust signals like expert credentials and reviews. Users couldn't quickly assess practitioner quality, leading to decision paralysis and low conversion rates.",
        media: {
          type: 'comparison',
          beforeSrc: "/lovable-uploads/89eee613-3026-4f07-a961-8171af9bbe97.png",
          src: "/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png",
          alt: "UI comparison showing before and after redesign",
          caption: "Before: Confusing map layout vs After: Clear card-based directory"
        }
      },
      {
        id: "my-thought-process",
        title: "🧠 My Thought Process",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content: "I asked myself: what would make ME trust a health platform? Trust signals, verified credentials, and authentic reviews had to come before pricing. The solution became a card-based directory that prioritized transparency and built confidence through clear practitioner verification.",
        media: {
          type: 'image',
          src: "/lovable-uploads/4877fa82-46fd-47bf-a10c-1ed97207e289.png",
          alt: "AI-enhanced development workflow from conversation to deployment",
          caption: "AI-enhanced development process from concept to live platform"
        },
        tags: ["UXDesign", "TrustSignals", "UserResearch", "AIMatching"]
      }
    ],
    seoData: {
      image: "/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png",
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
      poster: "/placeholder.svg",
      alt: "SplitTime co-parenting app demonstration"
    },
    sections: [
      {
        id: "the-problem",
        title: "🧩 The Problem",
        icon: React.createElement(AlertCircle, { className: "h-6 w-6" }),
        variant: "problem",
        content: "Co-parents were fighting constantly over miscommunication around pickups, events, and appointments. Family courts needed a neutral platform to reduce conflict and keep the focus on children's needs rather than parental disputes.",
        media: {
          type: 'image',
          src: "/placeholder.svg",
          alt: "Court paperwork and calendar chaos in co-parenting",
          caption: "Traditional co-parenting communication challenges"
        }
      },
      {
        id: "quantified-impact",
        title: "📊 Quantified Impact",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content: "The platform fundamentally changed how separated families communicate, creating measurable improvements in family dynamics and legal compliance.",
        metrics: [
          { value: "40%", label: "Reduction in reported conflicts", trend: "down" },
          { value: "62%", label: "Decrease in message volume", trend: "down" },
          { value: "300%", label: "Increase in calendar usage", trend: "up" },
          { value: "90%", label: "Parents avoided at least one argument per month", trend: "up" }
        ]
      },
      {
        id: "what-didnt-work",
        title: "❌ What Didn't Work",
        icon: React.createElement(X, { className: "h-6 w-6" }),
        variant: "failed",
        content: "Chat features amplified conflict instead of reducing it. Too many features overwhelmed already stressed parents. The breakthrough came when we simplified to just calendar + permissions - focusing on action over conversation.",
        media: {
          type: 'image',
          src: "/placeholder.svg",
          alt: "Old UI showing chat-heavy design that was removed",
          caption: "Removed: Chat-heavy interface that increased tension"
        }
      },
      {
        id: "my-thought-process",
        title: "🧠 My Thought Process",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content: "This wasn't about UX delight—it was emotional safety. I interviewed family lawyers and judges to design for neutrality and equal control for both parents. Every interaction had to reduce tension, not create it.",
        tags: ["NeutralDesign", "FamilyLaw", "ConflictReduction", "UserSafety"]
      }
    ]
  }
,
  "investor-loan-app": {
    id: "investor-loan-app",
    title: "Smarter Portfolio Decisions: Investor Loan App",
    description: "Replaced spreadsheet chaos with a centralized portfolio tool, enabling faster ROI decisions and fewer manual errors.",
    tags: ["FinTech", "Analytics", "WebApp"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    heroVideo: {
      src: "investor-loan-demo.mp4",
      poster: "/placeholder.svg",
      alt: "Investor loan app dashboard walkthrough"
    },
    sections: [
      {
        id: "the-problem",
        title: "🧩 The Problem",
        icon: React.createElement(AlertCircle, { className: "h-6 w-6" }),
        variant: "problem",
        content: "Investors tracked multi-property portfolios in fragmented spreadsheets, creating version conflicts, slow analysis, and costly mistakes.",
        media: {
          type: 'image',
          src: "/placeholder.svg",
          alt: "Scattered spreadsheets and inconsistent portfolio data",
          caption: "Fragmented spreadsheets made portfolio analysis error-prone."
        }
      },
      {
        id: "quantified-impact",
        title: "📊 Quantified Impact",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content: "A unified analytics layer accelerated decision-making and improved accuracy across KPI tracking.",
        metrics: [
          { value: "70%", label: "Faster ROI analysis", trend: "up" },
          { value: "-80%", label: "Manual reconciliation time", trend: "down" },
          { value: "+35%", label: "Deal evaluation throughput", trend: "up" },
          { value: "98%", label: "Data consistency across assets", trend: "up" }
        ]
      },
      {
        id: "what-didnt-work",
        title: "❌ What Didn't Work",
        icon: React.createElement(X, { className: "h-6 w-6" }),
        variant: "failed",
        content: "Trying to retrofit spreadsheets with automations added complexity without fixing core data integrity issues.",
        media: {
          type: 'image',
          src: "/placeholder.svg",
          alt: "Overcomplicated spreadsheet automation",
          caption: "Automating spreadsheets increased complexity without reliability."
        }
      },
      {
        id: "my-thought-process",
        title: "🧠 My Thought Process",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content: "Built a source-of-truth model with standardized metrics and scenario tools for confident, faster decisions.",
        tags: ["FinTechUX", "DecisionSupport", "DataModeling", "Automation"]
      }
    ],
    seoData: {
      image: "/placeholder.svg",
      projectName: "Investor Loan App",
      results: ["70% faster ROI analysis", "Data integrity at scale"],
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
    sections: [
      {
        id: "the-problem",
        title: "🧩 The Problem",
        icon: React.createElement(AlertCircle, { className: "h-6 w-6" }),
        variant: "problem",
        content: "Teams managed 200+ weekly orders in Excel, leading to 15% errors, slow reconciliation, and risk to key accounts.",
        media: {
          type: 'image',
          src: "/placeholder.svg",
          alt: "Manual order tracking in spreadsheets",
          caption: "Excel-based operations caused avoidable errors and delays."
        }
      },
      {
        id: "quantified-impact",
        title: "📊 Quantified Impact",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content: "A custom system eliminated duplicate entry and surfaced real-time status for every order.",
        metrics: [
          { value: "95%", label: "Reduction in manual entry", trend: "down" },
          { value: "500%", label: "Faster order processing", trend: "up" },
          { value: "99.7%", label: "Order accuracy", trend: "up" },
          { value: "+34%", label: "Revenue growth (6 months)", trend: "up" }
        ]
      },
      {
        id: "what-didnt-work",
        title: "❌ What Didn't Work",
        icon: React.createElement(X, { className: "h-6 w-6" }),
        variant: "failed",
        content: "Pretty dashboards on top of Excel didn’t fix duplicated data and reconciliation bottlenecks.",
        media: {
          type: 'image',
          src: "/placeholder.svg",
          alt: "Ineffective dashboard layered over spreadsheets",
          caption: "Cosmetic UI changes failed to solve process flaws."
        }
      },
      {
        id: "my-thought-process",
        title: "🧠 My Thought Process",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content: "Shadowed operations, rebuilt workflows as data pipelines, and automated repetitive work end-to-end.",
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
  }
};

export const getStructuredCaseStudy = (id: string): StructuredCaseStudyData | null => {
  return structuredCaseStudies[id] || null;
};
