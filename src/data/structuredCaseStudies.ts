
import { StructuredCaseStudy } from "./types/structuredCaseStudy";
import { FileText, Target, Lightbulb, TrendingUp } from "lucide-react";

const structuredCaseStudiesData: Record<string, StructuredCaseStudy> = {
  "splittime": {
    id: "splittime",
    title: "SplitTime - Time Tracking App",
    description: "A comprehensive time tracking solution for freelancers and teams",
    tags: ["Mobile App", "UX/UI Design", "React Native"],
    sections: [
      {
        id: "problem",
        title: "The Problem",
        type: "problem",
        icon: FileText,
        content: {
          text: "Freelancers and small teams struggle with accurate time tracking and project management."
        }
      },
      {
        id: "solution",
        title: "Our Solution",
        type: "solution",
        icon: Lightbulb,
        content: {
          text: "We developed an intuitive mobile app that makes time tracking effortless and accurate."
        }
      },
      {
        id: "impact",
        title: "The Impact",
        type: "impact",
        icon: TrendingUp,
        content: {
          text: "Users reported 40% improvement in time tracking accuracy and 25% increase in productivity."
        }
      }
    ],
    projectLink: "splittime",
    gradientClasses: "from-blue-50 to-indigo-50",
    seoData: {
      title: "SplitTime Case Study - Mobile Time Tracking App",
      description: "How we designed and developed a comprehensive time tracking solution for freelancers and teams",
      keywords: ["time tracking", "mobile app", "UX design", "productivity"]
    }
  },
  "herbalink": {
    id: "herbalink",
    title: "HerbaLink - Health Platform",
    description: "A digital health platform connecting patients with herbal medicine practitioners",
    tags: ["Web App", "Healthcare", "React"],
    sections: [
      {
        id: "problem",
        title: "The Challenge",
        type: "problem",
        icon: FileText,
        content: {
          text: "Patients had difficulty finding qualified herbal medicine practitioners and managing their health journey."
        }
      },
      {
        id: "solution",
        title: "Our Approach",
        type: "solution",
        icon: Lightbulb,
        content: {
          text: "We created a comprehensive platform that connects patients with practitioners and provides health tracking tools."
        }
      },
      {
        id: "impact",
        title: "Results",
        type: "impact",
        icon: TrendingUp,
        content: {
          text: "The platform facilitated over 1000 patient-practitioner connections in the first year."
        }
      }
    ],
    projectLink: "herbalink",
    gradientClasses: "from-green-50 to-emerald-50",
    seoData: {
      title: "HerbaLink Case Study - Digital Health Platform",
      description: "Building a platform to connect patients with herbal medicine practitioners",
      keywords: ["healthcare", "web platform", "patient care", "herbal medicine"]
    }
  },
  "investor-loan-app": {
    id: "investor-loan-app",
    title: "Investor Loan Management",
    description: "A fintech solution for managing investor loans and portfolios",
    tags: ["Fintech", "Web App", "Investment"],
    sections: [
      {
        id: "problem",
        title: "The Problem",
        type: "problem",
        icon: FileText,
        content: {
          text: "Investors needed a streamlined way to manage multiple loans and track returns."
        }
      },
      {
        id: "solution",
        title: "Solution",
        type: "solution",
        icon: Lightbulb,
        content: {
          text: "We built a comprehensive loan management platform with real-time analytics and reporting."
        }
      },
      {
        id: "impact",
        title: "Impact",
        type: "impact",
        icon: TrendingUp,
        content: {
          text: "Reduced loan processing time by 60% and improved investor satisfaction scores by 35%."
        }
      }
    ],
    projectLink: "investor-loan-app",
    gradientClasses: "from-purple-50 to-violet-50",
    seoData: {
      title: "Investor Loan App Case Study - Fintech Solution",
      description: "Developing a comprehensive loan management platform for investors",
      keywords: ["fintech", "loan management", "investment", "portfolio tracking"]
    }
  },
  "wholesale-distribution": {
    id: "wholesale-distribution",
    title: "Wholesale Distribution System",
    description: "An enterprise solution for wholesale distribution management",
    tags: ["Enterprise", "B2B", "Supply Chain"],
    sections: [
      {
        id: "problem",
        title: "Challenge",
        type: "problem",
        icon: FileText,
        content: {
          text: "Complex wholesale operations needed better inventory and order management systems."
        }
      },
      {
        id: "solution",
        title: "Solution",
        type: "solution",
        icon: Lightbulb,
        content: {
          text: "We developed an integrated distribution management system with real-time tracking."
        }
      },
      {
        id: "impact",
        title: "Results",
        type: "impact",
        icon: TrendingUp,
        content: {
          text: "Improved operational efficiency by 45% and reduced inventory costs by 30%."
        }
      }
    ],
    projectLink: "wholesale-distribution",
    gradientClasses: "from-orange-50 to-red-50",
    seoData: {
      title: "Wholesale Distribution System Case Study",
      description: "Enterprise solution for wholesale distribution and supply chain management",
      keywords: ["wholesale", "distribution", "supply chain", "enterprise software"]
    }
  },
  "business-management": {
    id: "business-management",
    title: "Business Management Platform",
    description: "A comprehensive business management solution for SMEs",
    tags: ["Business Software", "CRM", "Management"],
    sections: [
      {
        id: "problem",
        title: "The Challenge",
        type: "problem",
        icon: FileText,
        content: {
          text: "Small and medium enterprises needed an all-in-one business management solution."
        }
      },
      {
        id: "solution",
        title: "Our Solution",
        type: "solution",
        icon: Lightbulb,
        content: {
          text: "We created a unified platform combining CRM, project management, and financial tracking."
        }
      },
      {
        id: "impact",
        title: "Impact",
        type: "impact",
        icon: TrendingUp,
        content: {
          text: "Helped businesses reduce administrative overhead by 50% and improve customer retention by 25%."
        }
      }
    ],
    projectLink: "business-management",
    gradientClasses: "from-teal-50 to-cyan-50",
    seoData: {
      title: "Business Management Platform Case Study",
      description: "Comprehensive business management solution for small and medium enterprises",
      keywords: ["business management", "CRM", "SME software", "project management"]
    }
  }
};

export const getStructuredCaseStudy = (id: string): StructuredCaseStudy | null => {
  return structuredCaseStudiesData[id] || null;
};

export const getAllStructuredCaseStudies = (): StructuredCaseStudy[] => {
  return Object.values(structuredCaseStudiesData);
};

export const getStructuredCaseStudiesMap = (): Record<string, StructuredCaseStudy> => {
  return structuredCaseStudiesData;
};
