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
    projectLink: "http://herbalink.live",
    heroVideo: {
      src: "herbalink-demo.mp4",
      poster: "https://i0.wp.com/barskyux.com/wp-content/uploads/2025/07/featureimage-1.png?fit=768%2C576&ssl=1",
      alt: "HerbaLink feature overview"
    },
    sections: [
      {
        id: "the-problem",
        title: "🧩 The Problem",
        icon: React.createElement(AlertCircle, { className: "h-6 w-6" }),
        variant: "problem",
        content:
          "People seeking herbal remedies often face conflicting online advice and don't know who to trust. There's no central, verified platform to find qualified herbalists, track symptom improvement, or get tailored guidance. Unlike therapy (where BetterHelp makes it easy to book professionals), herbal care lacked structure, credibility, and outcomes-based support."
      },
      {
        id: "key-gaps",
        title: "🕳️ Key Gaps",
        icon: React.createElement(AlertCircle, { className: "h-6 w-6" }),
        variant: "problem",
        content:
          "Key gaps:\n- No way to verify herbalist credibility\n- No symptom tracking tied to outcomes\n- No personalized recommendations or guided onboarding"
      },
      {
        id: "quantified-impact",
        title: "📊 Quantified Impact",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content:
          "HerbaLink is currently in active development. Even at this early stage, we've seen strong engagement and behavior change — giving us validation and a foundation to scale from.\n\nWe launched Stage 1 with:\n- Symptom tracking and visual logging\n- Verified herbalist booking flow\n- Personalized herb recommendations\n- Community discussion board\n\nNext phases will include:\n- AI-driven symptom-to-herb matching\n- Long-term health tracking and data export\n- Expanded practitioner insights and care plans"
      },
      {
        id: "what-didnt-work",
        title: "❌ What Didn't Work",
        icon: React.createElement(X, { className: "h-6 w-6" }),
        variant: "failed",
        content:
          "Generic Practitioner Discovery: Initial design had a long list of herbalists with no context. Users bounced quickly.\nFix: We added filters (e.g., Stress Relief, Digestive Health), 'Verified' badges, availability, and pricing— all before login.\n\nHidden Symptom Tracker: The tracker was buried and saw minimal use.\nFix: We promoted it to the main nav, added severity sliders, visible progress bars, and linked it to herbal suggestions. Usage tripled."
      },
      {
        id: "my-thought-process",
        title: "🧠 My Thought Process",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content:
          "I designed HerbaLink as a platform built on trust, not just features. By prioritizing outcomes over aesthetics and uncovering user pain points, I focused on usability, credibility, and retention. The result: simple onboarding, clear symptom tracking, and a community that builds confidence.",
        media: {
          type: 'image',
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2025/07/UserFlow.png?fit=1232%2C928&ssl=1",
          alt: "HerbaLink user flow from onboarding to booking",
          caption: "User flow from onboarding to booking and tracking."
        }
      },
      {
        id: "final-product",
        title: "🎯 The Final Product",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content:
          "Users can book verified herbalists by need, rating, and availability; log symptoms and track progress over time; get data-informed herbal suggestions; join a growing community of trusted practitioners and peers.",
        media: {
          type: 'image',
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2025/07/featureimage-1.png?fit=768%2C576&ssl=1",
          alt: "HerbaLink feature overview",
          caption: "Feature overview highlighting booking, tracking, and guidance."
        }
      },
      {
        id: "outcome",
        title: "🏁 Outcome",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content:
          "We built a strong foundation for outcomes, validating the model and setting up a roadmap to scale with AI, long-term tracking, and practitioner insights."
      }
    ],
    seoData: {
      image: "https://i0.wp.com/barskyux.com/wp-content/uploads/2025/07/featureimage-1.png?fit=768%2C576&ssl=1",
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
    sections: [
      {
        id: "the-problem",
        title: "🧩 The Problem",
        icon: React.createElement(AlertCircle, { className: "h-6 w-6" }),
        variant: "problem",
        content: "Separated parents face significant challenges in coordinating childcare responsibilities, often leading to miscommunication, scheduling conflicts, and increased tension. Traditional communication methods like text messages and emails can exacerbate these issues, especially when co-parenting relationships are already strained."
      },
      {
        id: "competitive-analysis",
        title: "📊 Competitive Analysis",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content: "Despite current offerings, a significant gap was found in features addressing conflict resolution, emotional support, and clear, structured communication. Users often reported that existing tools, while functional, lacked mechanisms to de-escalate tension or provide guidance in high-conflict situations.",
        media: {
          type: 'image',
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Screenshot-2025-01-28-at-9.38.41%E2%80%AFAM-e1748467110283.png?fit=800%2C367&ssl=1",
          alt: "Competitive analysis comparison of co-parenting tools",
          caption: "Competitive analysis highlighted missing conflict-resolution features."
        }
      },
      {
        id: "research-and-discovery",
        title: "🔎 Research and Discovery",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content: "Research and discovery process with comprehensive user research methodology.",
        media: {
          type: 'image',
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Research-and-Discovery-2.png?fit=2400%2C1770&ssl=1",
          alt: "Research and discovery artifacts and insights",
          caption: "Research synthesis revealed core pain points and opportunities."
        }
      },
      {
        id: "what-i-did",
        title: "🛠️ What I Did",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content: "Transitioning from initial concepts, we developed low-fidelity mockups and wireframes to outline the app's core structure and user flow. This stage allowed us to rapidly iterate on design ideas, focusing on functionality and information hierarchy without getting bogged down in visual details.\n\nBy sketching out screens for features like the shared calendar, messaging, and document sharing, we established the foundational blueprint for the app, ensuring all essential components were logically placed and accessible.",
        media: {
          type: 'image',
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/iMh4BEwy33n8p2KC-PDr3.png",
          alt: "Low-fidelity wireframes and flows for Splittime",
          caption: "Wireframes established core structure and user flows early."
        }
      },
      {
        id: "usability-testing",
        title: "✅ Usability Testing",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content: "Testing revealed that users particularly valued features that helped them communicate more effectively with their co-parent. The tone analysis feature received especially positive feedback, with users reporting it helped them \"step back\" from emotional responses."
      },
      {
        id: "key-features",
        title: "✨ Key Features",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content: "I designed a child-focused dashboard that centralizes information about medical appointments, school events, activities, and emergency contacts, ensuring that both parents have equal access to critical information about their children.\n\nThe visual design strategy deliberately employs a calming color palette dominated by blues and grays to reduce emotional responses during potentially stressful interactions. Typography and spacing were carefully selected to maximize readability in high-stress situations, when cognitive capacity may be reduced.",
        media: {
          type: 'image',
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/DashboardPRIMARY.png",
          alt: "Child-focused dashboard centralizing critical family info",
          caption: "Dashboard centralizes family info for equal access across parents."
        }
      },
      {
        id: "the-results",
        title: "🏁 The Results",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content: "Beyond these quantitative metrics, qualitative improvements included reduced stress for parents, better coordination of children's activities, improved documentation, enhanced transparency, and most importantly, a stronger focus on children's wellbeing rather than parental conflict."
      },
      {
        id: "lessons-learned",
        title: "📚 Lessons Learned",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content: "Perhaps the most significant insight was how thoughtful design can transform digital interactions from sources of conflict into opportunities for cooperation. By designing with emotional intelligence, we created a platform that not only solved practical problems but actually improved human relationships.",
        media: {
          type: 'image',
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Lessons-Learned-2.png",
          alt: "Summary of key lessons learned from Splittime",
          caption: "Designing with emotional intelligence improved cooperation."
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
