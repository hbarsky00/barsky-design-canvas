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
  researchImages?: { src: string; alt: string; }[];
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
    title: "Using Design Thinking to Achieve 3x More Bookings for Certified Herbalists",
    description: "Connected users to certified herbalists across the country and increased booking rates by 3x through AI-powered matching and streamlined UX.",
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
      workshopKickoff: "I initiated discovery sessions with potential users and herbalists to understand the core friction points. Through design sprints, I framed the problem around trust, safety, and accessibility—not just practitioner availability. This foundation helped establish that matching algorithms needed to prioritize credentials and safety information over proximity alone.",
      explorations: "I explored blue-sky concepts ranging from AI-powered symptom analysis to community-driven peer reviews. Early sketches included marketplace-style browsing, chat-first consultations, and comprehensive health tracking. I tested divergent ideas like gamified health journeys and social proof through community testimonials to understand what resonated most with users seeking herbal care.",
      decisionPoint: "I converged on a practitioner-focused platform after validating that users prioritized expert guidance over self-directed exploration. The decision centered on verified credentials, clear safety information, and streamlined booking—creating trust through transparency rather than overwhelming users with too many options or complex health tracking features.",
      images: [
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/findanherbalistsketch.png",
          alt: "Initial Concepts & Sketches",
          caption: "Early ideation sketches exploring herbal practitioner discovery and matching concepts"
        },
        {
          src: "https://barskyux.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-19-2025-11_19_58-PM.png",
          alt: "User Flow Explorations", 
          caption: "Blue-sky user journey mapping from symptom input to practitioner booking"
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
      eyebrow: "Process",
      title: "My Thought Process",
      content: "Trust beats features when connecting people with healthcare providers. I designed every interaction to build credibility and reduce anxiety through clear symptom tracking and verified herbalist profiles.",
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
      description: "Testing with both practitioners and patients validated my trust-focused approach and revealed key usability improvements for the booking flow.",
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
      description: "I built a strong foundation for outcomes, validating the model and setting up a roadmap to scale with AI, long-term tracking, and practitioner insights.",
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
      eyebrow: "What Didn't Work",
      title: "Lessons Learned",
      content: "Early prototypes focused too heavily on complex categorization systems and overwhelming information architecture. Users needed simple, guided discovery rather than comprehensive databases.",
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
    title: "Design Thinking Approach to Reducing Co-Parenting Conflict by 40%",
    description: "Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools designed for high-stress family situations.",
    tags: ["Blue Sky", "Design Thinking", "iOS→Android", "Legal UX", "WebApp"],
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    projectLink: "https://splittime.pro",
    heroVideo: {
      src: "",
      poster: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1",
      alt: "Splittime co-parenting app hero overview"
    },
    researchSection: {
      subhead: "Interviews and walkthroughs with co-parents revealed decision fatigue from fragmented schedules, expenses, and agreements.",
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
      statement: "Co-parents lack a single source of truth for schedules, expenses, and decisions—causing miscommunication, missed pickups, and ongoing conflict."
    },
    sprintZeroSection: {
      eyebrow: "0 → 1 EXPLORATION",
      title: "Sprint Zero: Blue-Sky Thinking",
      workshopKickoff: "I conducted discovery workshops with divorced co-parents and family mediators to understand the emotional and logistical challenges. Through design sprints, I framed the problem around communication tone and shared accountability—not just scheduling tools. This foundation established that the solution needed to address conflict prevention, not just organization.",
      explorations: "I explored blue-sky concepts ranging from AI-powered communication filtering to gamified cooperation tracking. Early sketches included therapeutic check-ins, mood tracking, and automated conflict de-escalation. I tested divergent ideas like neutral third-party mediation and child-focused decision frameworks to understand what would genuinely reduce tension between co-parents.",
      decisionPoint: "I converged on a neutral communication platform after validating that most conflicts arose from misunderstood tone and unclear expectations. The decision centered on structured templates, approval workflows, and transparent history—creating accountability through clarity rather than adding more complex features that could increase friction.",
      images: [
        {
          src: "placeholder",
          alt: "Initial Concepts & Sketches",
          caption: "Early brainstorming on co-parenting communication tools and conflict reduction strategies"
        },
        {
          src: "placeholder",
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
          blurb: "Too overwhelming.",
          annotations: [
            { text: "Calendar layout too dense - overwhelming for stressed parents", x: 50, y: 30, type: "issue" },
            { text: "No clear distinction between confirmed vs pending events", x: 70, y: 50, type: "issue" }
          ]
        },
        { 
          label: "Iteration 2", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2024/01/DashboardPRIMARY.png", 
          alt: "Second iteration with approval flows",
          blurb: "Added clarity.",
          annotations: [
            { text: "Added approval status indicators for clarity", x: 40, y: 25, type: "improvement" },
            { text: "Simplified calendar view reduces cognitive load", x: 60, y: 45, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 3", 
          imageSrc: "/media/splittime/ideation-3.jpg", 
          alt: "Third iteration adding expense tracking",
          blurb: "Added expenses.",
          annotations: [
            { text: "Integrated expense tracking streamlines workflow", x: 30, y: 60, type: "feature" },
            { text: "Receipt upload system improves transparency", x: 80, y: 40, type: "feature" }
          ]
        },
        { 
          label: "Iteration 4", 
          imageSrc: "https://barskyux.com/wp-content/uploads/2025/08/iteration4.png", 
          alt: "Fourth iteration with messaging templates",
          blurb: "Reduced conflict.",
          annotations: [
            { text: "Template messaging reduces conflict potential", x: 45, y: 35, type: "feature" },
            { text: "Neutral tone suggestions prevent escalation", x: 65, y: 65, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 5", 
          imageSrc: "/media/splittime/ideation-5.jpg", 
          alt: "Final iteration with unified interface",
          annotations: [
            { text: "Unified interface brings all features together seamlessly", x: 50, y: 30, type: "feature" },
            { text: "Clean information hierarchy reduces decision fatigue", x: 40, y: 70, type: "improvement" }
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
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1",
          alt: "Splittime final product showing co-parenting interface",
          caption: "Complete Splittime platform enabling conflict-free co-parenting coordination",
          annotations: [
            {
              x: 30,
              y: 20,
              type: "feature",
              text: "Neutral messaging templates reduced conflict by 40%"
            },
            {
              x: 70,
              y: 35,
              type: "feature",
              text: "Approval workflows prevent misunderstandings"
            },
            {
              x: 50,
              y: 60,
              type: "improvement",
              text: "Simplified scheduling reduced decision fatigue"
            },
            {
              x: 25,
              y: 80,
              type: "feature",
              text: "Expense tracking creates transparency"
            }
          ]
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
    myThoughtProcessSection: {
      eyebrow: "Process",
      title: "My Thought Process",
      content: "Co-parenting apps often fail because they focus on features rather than emotions. I designed Splittime around conflict reduction first—neutral language, clear boundaries, and shared accountability. The result was a platform that helps families communicate better, not just organize better.",
      images: [
        {
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/splittime-user-flow.png",
          alt: "Splittime user satisfaction metrics and communication improvements",
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
      content: "Initially, I tried to include too many features in the scheduling interface, which made it overwhelming for users. I learned to prioritize core functionality and gradually introduce advanced features based on user feedback.",
      images: [
        {
          src: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/splittime-early-concept.jpg",
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
      poster: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
      alt: "Investor loan platform dashboard"
    },
    researchSection: {
      subhead: "Shadowing loan officers and error-log reviews showed spreadsheet mistakes, slow retrieval, and no audit trail.",
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
    sprintZeroSection: {
      eyebrow: "0 → 1 EXPLORATION",
      title: "Sprint Zero: Blue-Sky Thinking",
      workshopKickoff: "I conducted discovery sessions with loan officers and risk managers to understand the operational and compliance challenges. Through design sprints, I framed the problem around data accuracy and audit trails—not just workflow efficiency. This foundation established that the solution needed to prioritize automated validation and transparent tracking over simple digitization.",
      explorations: "I explored blue-sky concepts ranging from AI-powered risk assessment to blockchain-based audit trails. Early sketches included predictive lending models, automated compliance checks, and integrated decision support systems. I tested divergent ideas like smart contract validation and real-time portfolio analytics to understand what would genuinely improve lending operations and reduce risk.",
      decisionPoint: "I converged on an intelligent workflow platform after validating that most errors stemmed from manual data entry and lack of validation checks. The decision centered on automated validation, guided workflows, and comprehensive audit trails—creating trust through transparency and accuracy rather than overwhelming users with complex financial modeling features.",
      images: [
        {
          src: "placeholder",
          alt: "Initial Concepts & Sketches",
          caption: "Early exploration of loan processing workflows and automated validation concepts"
        },
        {
          src: "placeholder",
          alt: "User Flow Explorations",
          caption: "Blue-sky mapping of lending operations from application to approval and audit"
        }
      ]
    },
    keyInsights: [
      { number: 1, title: "Trust through validation", description: "Real-time checks prevent errors and rework." },
      { number: 2, title: "Predictive findability", description: "Bloomberg-style search beats complex filters." },
      { number: 3, title: "Guided orders", description: "Stepwise flows reduce mistakes vs. flat forms." }
    ],
    ideationSection: {
      subhead: "I shaped deal findability, order building, validation, and collaboration around compliance.",
      bubbles: [
        { title: "Deal summary", description: "Status, limits, totals" },
        { title: "Predictive search", description: "Category-aware, smart defaults" },
        { title: "Order builder", description: "Guided steps, fewer errors" },
        { title: "Audit & comments", description: "History and collaboration" }
      ],
      iterations: [
        { 
          label: "Iteration 1", 
          imageSrc: "/media/investment/ideation-1.jpg", 
          alt: "First iteration of deal summary interface",
          annotations: [
            { text: "Deal information scattered - lacks clear hierarchy", x: 60, y: 30, type: "issue" },
            { text: "No real-time validation causes errors downstream", x: 40, y: 70, type: "issue" }
          ]
        },
        { 
          label: "Iteration 2", 
          imageSrc: "/media/investment/ideation-2.jpg", 
          alt: "Second iteration with predictive search",
          annotations: [
            { text: "Bloomberg-style search improves findability", x: 30, y: 20, type: "feature" },
            { text: "Contextual filters reduce search time", x: 70, y: 40, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 3", 
          imageSrc: "/media/investment/ideation-3.jpg", 
          alt: "Third iteration of guided order builder",
          annotations: [
            { text: "Step-by-step guidance prevents premature inputs", x: 50, y: 35, type: "feature" },
            { text: "Real-time totals reduce calculation errors", x: 80, y: 60, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 4", 
          imageSrc: "/media/investment/ideation-4.jpg", 
          alt: "Fourth iteration with audit and comments",
          annotations: [
            { text: "Immutable audit trail meets compliance needs", x: 45, y: 25, type: "feature" },
            { text: "Collaborative comments improve team coordination", x: 60, y: 75, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 5", 
          imageSrc: "/media/investment/ideation-5.jpg", 
          alt: "Final iteration with integrated workflow",
          annotations: [
            { text: "Integrated workflow eliminates context switching", x: 40, y: 40, type: "feature" },
            { text: "85% error reduction through automated validation", x: 70, y: 20, type: "improvement" }
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
      description: "A comprehensive loan management platform that replaced error-prone Excel workflows with intelligent automation, real-time validation, and transparent audit trails for complete operational confidence.",
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
    myThoughtProcessSection: {
      eyebrow: "Process",
      title: "My Thought Process",
      content: "I approached this as a process problem, not a UI problem. By shadowing loan officers and mapping their actual workflows, I identified the core pain points: data fragmentation, manual errors, and lack of audit trails. The solution prioritized automation, validation, and transparency over flashy interfaces.",
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
          src: "/lovable-uploads/excel-workflow-errors.png",
          alt: "Excel-based loan workflow showing manual error points",
          caption: "Original Excel-based workflows were prone to calculation errors and lacked audit trails",
          annotations: [
            {
              x: 35,
              y: 30,
              type: "issue",
              text: "Manual calculations led to frequent errors"
            },
            {
              x: 60,
              y: 50,
              type: "issue",
              text: "No audit trail created compliance risk"
            },
            {
              x: 45,
              y: 75,
              type: "improvement",
              text: "Automated validation eliminated 85% of errors"
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
    sprintZeroSection: {
      eyebrow: "0 → 1 EXPLORATION",
      title: "Sprint Zero: Blue-Sky Thinking", 
      workshopKickoff: "I initiated discovery sessions with operations teams and distribution managers to understand the manual workflow challenges. Through design sprints, I framed the problem around process automation and error elimination—not just interface improvements. This foundation revealed that the solution needed to replace entire manual workflows, not just digitize existing processes.",
      explorations: "I explored blue-sky concepts ranging from AI-powered order prediction to fully automated reconciliation systems. Early sketches included intelligent inventory management, predictive demand forecasting, and automated quality control. I tested divergent ideas like machine learning optimization and real-time supply chain tracking to understand what would genuinely transform wholesale operations.",
      decisionPoint: "I converged on an end-to-end automation platform after validating that manual Excel processes were the root cause of errors and delays. The decision centered on intelligent workflows, automated validation, and seamless data pipelines—creating efficiency through elimination of manual work rather than adding more tools to manage.",
      images: [
        {
          src: "placeholder",
          alt: "Initial Concepts & Sketches",
          caption: "Early brainstorming on wholesale automation and process optimization strategies"
        },
        {
          src: "placeholder", 
          alt: "User Flow Explorations",
          caption: "Blue-sky exploration of order-to-fulfillment workflows and automated validation systems"
        }
      ]
    },
    keyInsights: [
      { number: 1, title: "Process over interface", description: "Fixing workflows beats pretty dashboards on broken systems." },
      { number: 2, title: "Data pipelines win", description: "Automated flows eliminate human error and speed." },
      { number: 3, title: "End-to-end thinking", description: "From order to reconciliation in one unified system." }
    ],
    ideationSection: {
      subhead: "I prototyped order capture, validation, routing, and reconciliation to eliminate Excel entirely.",
      bubbles: [
        { title: "Order capture", description: "Smart forms, auto-completion" },
        { title: "Validation", description: "Real-time checks, error prevention" },
        { title: "Routing", description: "Automated workflows, approvals" },
        { title: "Reconciliation", description: "Live tracking, instant totals" }
      ],
      iterations: [
        { 
          label: "Iteration 1", 
          imageSrc: "/media/wholesale/ideation-1.jpg", 
          alt: "First iteration of order capture interface",
          annotations: [
            { text: "Manual data entry prone to frequent errors", x: 45, y: 40, type: "issue" },
            { text: "No validation leads to downstream problems", x: 70, y: 60, type: "issue" }
          ]
        },
        { 
          label: "Iteration 2", 
          imageSrc: "/media/wholesale/ideation-2.jpg", 
          alt: "Second iteration with validation features",
          annotations: [
            { text: "Real-time validation prevents bad data entry", x: 30, y: 25, type: "feature" },
            { text: "Smart form completion reduces manual work", x: 80, y: 45, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 3", 
          imageSrc: "/media/wholesale/ideation-3.jpg", 
          alt: "Third iteration adding routing automation",
          annotations: [
            { text: "Automated routing eliminates manual assignment", x: 50, y: 30, type: "feature" },
            { text: "Approval workflows ensure proper oversight", x: 60, y: 70, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 4", 
          imageSrc: "/media/wholesale/ideation-4.jpg", 
          alt: "Fourth iteration with reconciliation dashboard",
          annotations: [
            { text: "Live tracking replaces Excel reconciliation", x: 40, y: 35, type: "feature" },
            { text: "Instant totals provide immediate accuracy", x: 75, y: 55, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 5", 
          imageSrc: "/media/wholesale/ideation-5.jpg", 
          alt: "Final iteration with complete pipeline",
          annotations: [
            { text: "Complete automation achieves 95% manual work reduction", x: 45, y: 25, type: "feature" },
            { text: "End-to-end pipeline eliminates context switching", x: 55, y: 65, type: "improvement" }
          ]
        }
      ]
    },
    userTestingSection: {
      title: "User Testing & Validation",
      description: "Testing with distribution teams confirmed my AI-assisted approach eliminated manual errors and dramatically improved processing speed.",
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
          caption: "Testing confirmed my automation approach eliminated manual Excel processes entirely."
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
          caption: "Complete AI-powered distribution system replacing manual Excel workflows",
          annotations: [
            {
              x: 25,
              y: 20,
              type: "feature",
              text: "AI-assisted order capture reduced errors by 95%"
            },
            {
              x: 70,
              y: 30,
              type: "feature",
              text: "Automated routing eliminated manual assignment"
            },
            {
              x: 50,
              y: 65,
              type: "improvement",
              text: "Real-time reconciliation replaced Excel tracking"
            },
            {
              x: 80,
              y: 80,
              type: "feature",
              text: "500% faster processing through automation"
            }
          ]
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
    myThoughtProcessSection: {
      eyebrow: "Process",
      title: "My Thought Process",
      content: "I treated this as a systems transformation, not just a digital upgrade. By shadowing operations teams and mapping their workflows end-to-end, I identified where manual processes created bottlenecks and errors. The solution focused on intelligent automation and data pipelines that eliminated repetitive work while maintaining accuracy.",
      images: [
        {
          src: "/wholesale-thought-process.png",
          alt: "Wholesale distribution transformation results and automation benefits",
          annotations: [
            { text: "I approached this as systems transformation, mapping end-to-end workflows to identify where manual processes created costly bottlenecks and errors.", x: 30, y: 30, type: "improvement" },
            { text: "The result: intelligent automation that eliminated 68% of manual entry errors while maintaining the accuracy teams needed for critical operations.", x: 70, y: 70, type: "feature" }
          ]
        }
      ]
    },
    whatDidntWorkSection: {
      eyebrow: "What Didn't Work",
      title: "Overcoming Challenges",
      content: "Teams managed 200+ weekly orders in Excel, leading to 15% errors, slow reconciliation, and risk to key accounts. Excel-based operations caused avoidable errors and delays.",
      images: [
        {
          src: "/wholesale-excel-challenges.png",
          alt: "Excel-based wholesale operations showing manual error points",
          caption: "Excel workflows created bottlenecks with 200+ weekly orders leading to 15% error rate",
          annotations: [
            {
              x: 40,
              y: 25,
              type: "issue",
              text: "Manual data entry created 15% error rate"
            },
            {
              x: 65,
              y: 45,
              type: "issue",
              text: "Slow reconciliation risked key accounts"
            },
            {
              x: 50,
              y: 75,
              type: "improvement",
              text: "AI automation achieved 99.7% accuracy"
            }
          ]
        }
      ]
    },
    sections: [],
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
      subhead: "Surveys and workflow audits showed owners switching between disconnected tools and duplicating data.",
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
    sprintZeroSection: {
      eyebrow: "0 → 1 EXPLORATION",
      title: "Sprint Zero: Blue-Sky Thinking",
      workshopKickoff: "I initiated discovery sessions with small business owners to understand their daily operational challenges. Through design sprints, I framed the problem around context switching and duplicate data entry—not just tool organization. This foundation revealed that the solution needed to eliminate workflow fragmentation while maintaining business process flexibility.",
      explorations: "I explored blue-sky concepts ranging from AI-powered workflow automation to intelligent business insights. Early sketches included predictive cash flow modeling, automated client follow-ups, and integrated marketing campaigns. I tested divergent ideas like voice-controlled task management and smart scheduling optimization to understand what would genuinely improve daily business operations.",
      decisionPoint: "I converged on a unified operations platform after validating that most inefficiencies came from switching between disconnected tools and re-entering the same data. The decision centered on consolidating core functions, automating repetitive tasks, and providing clear daily priorities—creating efficiency through integration rather than adding more specialized features.",
      images: [
        {
          src: "placeholder",
          alt: "Initial Concepts & Sketches",
          caption: "Early ideation on business management consolidation and workflow optimization"
        },
        {
          src: "placeholder",
          alt: "User Flow Explorations",
          caption: "Blue-sky exploration of unified operations and automated task management workflows"
        }
      ]
    },
    keyInsights: [
      { number: 1, title: "One platform", description: "Consolidating core ops cuts tool chaos." },
      { number: 2, title: "Automation wins", description: "Recurring invoices and reminders save hours weekly." },
      { number: 3, title: "Priority at a glance", description: "A single dashboard surfaces what needs attention now." }
    ],
    ideationSection: {
      subhead: "I iterated on a simple \"run the day\" loop—dashboard, tasks, invoices, and scheduling.",
      bubbles: [
        { title: "Dashboard KPIs", description: "Cash flow and alerts" },
        { title: "Tasks", description: "Today, overdue, owners" },
        { title: "Invoices", description: "Draft → sent → paid" },
        { title: "Scheduling", description: "Availability and bookings" }
      ],
      iterations: [
        { 
          label: "Iteration 1", 
          imageSrc: "/media/biz/ideation-1.jpg", 
          alt: "First iteration of business dashboard",
          annotations: [
            { text: "Information overload - too many metrics at once", x: 50, y: 30, type: "issue" },
            { text: "No clear priority hierarchy for daily tasks", x: 70, y: 60, type: "issue" }
          ]
        },
        { 
          label: "Iteration 2", 
          imageSrc: "/media/biz/ideation-2.jpg", 
          alt: "Second iteration with task management",
          annotations: [
            { text: "Task prioritization system added for clarity", x: 35, y: 25, type: "feature" },
            { text: "Today view focuses on immediate actions", x: 80, y: 50, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 3", 
          imageSrc: "/media/biz/ideation-3.jpg", 
          alt: "Third iteration adding invoice workflow",
          annotations: [
            { text: "Automated invoice generation saves hours", x: 40, y: 35, type: "feature" },
            { text: "Template system ensures consistency", x: 65, y: 65, type: "improvement" }
          ]
        },
        { 
          label: "Iteration 4", 
          imageSrc: "/media/biz/ideation-4.jpg", 
          alt: "Fourth iteration with scheduling integration",
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
          src: "https://barskyux.com/wp-content/uploads/2025/08/promoimagefull.png",
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
    myThoughtProcessSection: {
      eyebrow: "Process",
      title: "My Thought Process",
      content: "I designed this system around operational efficiency, not feature complexity. By understanding how small businesses actually work—jumping between tools, forgetting follow-ups, and losing revenue to manual errors—I created a unified platform that thinks like a business owner.",
      images: [
        {
          src: "/lovable-uploads/quickflow_process_flow.svg",
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
      content: "Initially, I tried to create too many customization options, which overwhelmed users. I learned to provide smart defaults with selective customization options, making the platform powerful yet approachable for business owners.",
      images: [
        {
          src: "/business-management-early-concept.png",
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
