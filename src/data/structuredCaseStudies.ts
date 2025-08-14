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
      src: "https://barskyux.com/wp-content/uploads/2025/07/HerbaLink-Book-A-Herbalist-1.mp4",
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
          "People seeking herbal remedies often face conflicting online advice and don't know who to trust. There's no central, verified platform to find qualified herbalists, track symptom improvement, or get tailored guidance. Unlike therapy (where BetterHelp makes it easy to book professionals), herbal care lacked structure, credibility, and outcomes-based support.",
        media: {
          type: 'image',
          src: "https://barskyux.com/wp-content/uploads/2025/07/featureimage-1.png",
          alt: "HerbaLink feature image illustrating the problem context"
        }
      },
      {
        id: "key-gaps",
        title: "🕳️ Key Gaps",
        icon: React.createElement(AlertCircle, { className: "h-6 w-6" }),
        variant: "problem",
        content:
          "The booking interface directly addresses three critical gaps in the herbal wellness market:\n\n• **No way to verify herbalist credibility** - Our platform displays verified credentials, specializations, and expert backgrounds upfront\n• **No symptom tracking tied to outcomes** - Structured consultation types (Initial, Follow-up, Quick Check-in) create clear treatment pathways\n• **No personalized recommendations or guided onboarding** - Health focus areas guide users to the right herbalist match and consultation type",
        media: {
          type: 'image',
          src: "/lovable-uploads/c871430a-1e49-4ac9-bd16-08797ea94e50.png",
          alt: "HerbaLink consultation booking interface showing herbalist verification and guided selection process",
          caption: "Consultation booking interface addressing key gaps with verified herbalists, structured consultation types, and personalized health focus areas."
        }
      },
      {
        id: "quantified-impact",
        title: "📊 Quantified Impact",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content:
          "HerbaLink is currently in active development. Even at this early stage, we've seen strong engagement and behavior change — giving us validation and a foundation to scale from.\n\nWe launched Stage 1 with:\n- Symptom tracking and visual logging\n- Verified herbalist booking flow\n- Personalized herb recommendations\n- Community discussion board\n\nNext phases will include:\n- AI-driven symptom-to-herb matching\n- Long-term health tracking and data export\n- Expanded practitioner insights and care plans",
        media: {
          type: 'video',
          src: "https://barskyux.com/wp-content/uploads/2025/07/herbalink_promo_video.mp4",
          alt: "HerbaLink promo video demonstrating quantified impact",
          videoOptions: { autoplay: true, loop: true, muted: true, controls: false, playsInline: true }
        }
      },
      {
        id: "what-didnt-work",
        title: "❌ What Didn't Work",
        icon: React.createElement(X, { className: "h-6 w-6" }),
        variant: "failed",
        content:
          "Generic Practitioner Discovery: Initial design had a long list of herbalists with no context. Users bounced quickly.\nFix: We added filters (e.g., Stress Relief, Digestive Health), 'Verified' badges, availability, and pricing— all before login.\n\nHidden Symptom Tracker: The tracker was buried and saw minimal use.\nFix: We promoted it to the main nav, added severity sliders, visible progress bars, and linked it to herbal suggestions. Usage tripled.",
        media: {
          type: 'image',
          src: "https://barskyux.com/wp-content/uploads/2025/07/herbalistdemo-2.png",
          alt: "HerbaLink practitioner demo screen illustrating what didn't work"
        }
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
    sections: [
      {
        id: "the-problem",
        title: "🧨 The Problem",
        icon: React.createElement(AlertCircle, { className: "h-6 w-6" }),
        variant: "problem",
        content:
          "A private banking institution was running its entire investor loan operation in Excel.\n\nThat meant:\n- Manual data entry causing frequent compliance risks\n- No audit trails, search, or collaboration\n- Friction between departments and no scalable infrastructure\n- Loan processing was slow, fragmented, and error-prone\n\nAs the bank grew, this fragile system became the bottleneck.",
        media: {
          type: 'image',
          src: "https://barskyux.com/wp-content/uploads/2023/12/excel-document-used-to-save-loan-information.png",
          alt: "Excel document used to save loan information",
          caption: "Excel spreadsheet previously used to manage investor loan data."
        }
      },
      {
        id: "quantified-impact",
        title: "📈 Quantified Impact",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content: "We launched a new platform in 60 days. Here's what changed:",
        metrics: [
          { value: "85%", label: "Fewer manual entry errors", trend: "up" },
          { value: "40%", label: "Faster deal processing times", trend: "up" },
          { value: "80%", label: "User satisfaction (survey)", trend: "up" },
          { value: "200+", label: "Loan orders processed in 2 months", trend: "up" }
        ],
        media: {
          type: 'image',
          src: "https://barskyux.com/wp-content/uploads/2023/12/beforeandafter.png",
          alt: "Before and after metrics comparison for investor loan platform",
          caption: "Before-and-after visualization highlighting error reduction and speed gains."
        }
      },
      {
        id: "what-didnt-work",
        title: "❌ What Didn't Work (and What We Fixed)",
        icon: React.createElement(X, { className: "h-6 w-6" }),
        variant: "failed",
        content:
          "Rebuilding Excel as-is carried clutter and confusion. We shifted to modular card + table views with hierarchy and real-time updates.\n\nAutomating without transparency hurt trust. We added visual confirmations, logs, and rollback controls.\n\nDesigning Add Order like a flat form overwhelmed users. We rebuilt it as a guided, interactive workflow with progressive steps, real-time validation, and clear structure.",
        media: {
          type: 'image',
          src: "https://barskyux.com/wp-content/uploads/2023/12/Loan-Central-Orderbook-View.png",
          alt: "Loan Central order book view in the redesigned platform",
          caption: "Order book view showing modular cards, hierarchy, and real-time updates."
        }
      },
      {
        id: "mistake-1",
        title: "✖ Mistake #1: Rebuilding Excel as-is",
        icon: React.createElement(X, { className: "h-6 w-6" }),
        variant: "failed",
        content:
          "Why it failed: It carried over the clutter and confusion.\nFix: Shifted to modular card + table views with better hierarchy and real-time updates.",
        media: {
          type: 'image',
          src: "/lovable-uploads/150a4488-94c2-481d-a7e3-f3730f963866.png",
          alt: "Enhanced orderbook",
          caption: "Enhanced order book with clearer hierarchy and updates."
        }
      },
      {
        id: "my-thought-process",
        title: "🧠 How I Thought Through It",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content:
          "My goal wasn't just usability — it was trust and control.\n\n- Search that acts like Bloomberg: AI-powered, category-based predictive search with real-time filtering and smart defaults.\n- Dynamic loan order book: Add/edit/remove limits in real time, instant totals, live comments, and full change tracking.\n- Collaboration as a native experience: Comment, assign, and build loan orders together in one place.\n- Compliance built into the UX: Validation rules, audit trails, and guardrails make compliance seamless.",
        media: {
          type: 'image',
          src: "/lovable-uploads/d9596b32-c5a5-42bd-9229-db1b496aeea4.png",
          alt: "Search interface",
          caption: "Predictive, category-based search for fast discovery."
        }
      },
      {
        id: "before-vs-after",
        title: "📊 Before vs. After",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
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
        id: "tech-specs",
        title: "🔧 Tech Specs",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content:
          "- Performance: Core workflows load in under 2 seconds\n- Accessibility: WCAG 2.1 AA compliant\n- Responsive Design: Tablet and desktop\n- Integrations: CRM, compliance systems, internal messaging\n- Cross-browser Support: Chrome, Safari, Firefox, Edge"
      },
      {
        id: "whats-next",
        title: "🚀 What's Next",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content:
          "1. Mobile app for field loan officers\n2. Predictive analytics for loan performance and risk\n3. Open API for future third-party integrations"
      },
      {
        id: "key-takeaways",
        title: "💡 Key Takeaways",
        icon: React.createElement(Lightbulb, { className: "h-6 w-6" }),
        variant: "solution",
        content:
          "What Worked:\n- User testing from day one led to high adoption\n- Familiar mental models enabled a fast learning curve\n- Fast iterations helped course-correct early mistakes\n\nWhat We Overcame:\n- Change resistance from users stuck on Excel\n- Handling complex data without overwhelming the UI\n- Designing within strict regulatory boundaries",
        media: {
          type: 'image',
          src: "/lovable-uploads/ec1458b5-d364-498e-a5ec-4122b62195d3.png",
          alt: "Comprehensive design system",
          caption: "Design system embedded guardrails and clarity."
        }
      },
      {
        id: "outcome",
        title: "🏁 The Outcome",
        icon: React.createElement(TrendingUp, { className: "h-6 w-6" }),
        variant: "impact",
        content:
          "This wasn't about making a prettier interface. It was about building a smarter, more scalable system that helped the business grow — and gave users clarity, speed, and confidence.\n\n\"I don't have to double-check every number now. I just trust it.\"",
        media: {
          type: 'image',
          src: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
          alt: "Loan dashboard",
          caption: "Outcome: clarity, speed, and user confidence."
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
        content: "Pretty dashboards on top of Excel didn't fix duplicated data and reconciliation bottlenecks.",
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
