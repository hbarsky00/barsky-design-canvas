
import { StructuredCaseStudySectionProps } from "@/data/types/caseStudy";

interface StructuredCaseStudyData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  heroVideo: {
    src: string;
    poster?: string;
  };
  sections: StructuredCaseStudySectionProps[];
  projectLink?: string;
  gradientClasses?: string;
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

const structuredCaseStudies: Record<string, StructuredCaseStudyData> = {
  "splittime": {
    id: "splittime",
    title: "SplitTime - Time Tracking Solution",
    description: "A comprehensive time tracking and project management application",
    tags: ["React", "TypeScript", "Node.js"],
    heroVideo: {
      src: "/videos/splittime-demo.mp4",
      poster: "/images/splittime-hero.jpg"
    },
    sections: [
      {
        id: "overview",
        title: "Project Overview",
        type: "text",
        content: {
          text: "SplitTime revolutionizes how teams track time and manage projects with intuitive interfaces and powerful analytics."
        }
      }
    ],
    projectLink: "https://splittime.example.com",
    gradientClasses: "from-blue-50 via-slate-50 to-indigo-50",
    seoData: {
      title: "SplitTime Case Study - Time Tracking Solution",
      description: "Learn how we built SplitTime, a comprehensive time tracking application",
      keywords: ["time tracking", "project management", "React", "case study"]
    }
  },
  "herbalink": {
    id: "herbalink",
    title: "HerbaLink - Herbal Medicine Platform",
    description: "Digital platform connecting users with herbal medicine practitioners",
    tags: ["Vue.js", "Laravel", "MySQL"],
    heroVideo: {
      src: "/videos/herbalink-demo.mp4",
      poster: "/images/herbalink-hero.jpg"
    },
    sections: [
      {
        id: "overview",
        title: "Platform Overview",
        type: "text",
        content: {
          text: "HerbaLink bridges traditional herbal medicine with modern digital convenience."
        }
      }
    ],
    projectLink: "https://herbalink.example.com",
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    seoData: {
      title: "HerbaLink Case Study - Herbal Medicine Platform",
      description: "Discover how we created HerbaLink, connecting users with herbal practitioners",
      keywords: ["herbal medicine", "healthcare platform", "Vue.js", "case study"]
    }
  },
  "investor-loan-app": {
    id: "investor-loan-app",
    title: "Investor Loan Application System",
    description: "Streamlined loan application and approval system for investors",
    tags: ["React", "Express", "PostgreSQL"],
    heroVideo: {
      src: "/videos/investor-loan-demo.mp4",
      poster: "/images/investor-loan-hero.jpg"
    },
    sections: [
      {
        id: "overview",
        title: "System Overview",
        type: "text",
        content: {
          text: "A comprehensive loan application system designed for modern investors and lenders."
        }
      }
    ],
    projectLink: "https://investor-loans.example.com",
    gradientClasses: "from-purple-50 via-violet-50 to-indigo-50",
    seoData: {
      title: "Investor Loan App Case Study - Financial Platform",
      description: "How we built a comprehensive loan application system for investors",
      keywords: ["fintech", "loan application", "investors", "React", "case study"]
    }
  },
  "wholesale-distribution": {
    id: "wholesale-distribution",
    title: "Wholesale Distribution Management",
    description: "Complete solution for wholesale distribution operations",
    tags: ["Angular", "Spring Boot", "Oracle"],
    heroVideo: {
      src: "/videos/wholesale-demo.mp4",
      poster: "/images/wholesale-hero.jpg"
    },
    sections: [
      {
        id: "overview",
        title: "Distribution Overview",
        type: "text",
        content: {
          text: "Comprehensive wholesale distribution management system with inventory tracking and order processing."
        }
      }
    ],
    projectLink: "https://wholesale-dist.example.com",
    gradientClasses: "from-orange-50 via-amber-50 to-yellow-50",
    seoData: {
      title: "Wholesale Distribution Case Study - Management System",
      description: "Building a comprehensive wholesale distribution management platform",
      keywords: ["wholesale", "distribution", "inventory", "Angular", "case study"]
    }
  },
  "business-management": {
    id: "business-management",
    title: "Business Management Suite",
    description: "All-in-one business management and analytics platform",
    tags: ["React", "Django", "Redis"],
    heroVideo: {
      src: "/videos/business-mgmt-demo.mp4",
      poster: "/images/business-mgmt-hero.jpg"
    },
    sections: [
      {
        id: "overview",
        title: "Suite Overview",
        type: "text",
        content: {
          text: "Comprehensive business management platform with integrated analytics and reporting capabilities."
        }
      }
    ],
    projectLink: "https://business-suite.example.com",
    gradientClasses: "from-slate-50 via-gray-50 to-zinc-50",
    seoData: {
      title: "Business Management Suite Case Study - Analytics Platform",
      description: "Creating an all-in-one business management and analytics solution",
      keywords: ["business management", "analytics", "React", "Django", "case study"]
    }
  }
};

export function getStructuredCaseStudy(id: string): StructuredCaseStudyData | null {
  return structuredCaseStudies[id] || null;
}

export function getAllStructuredCaseStudies(): StructuredCaseStudyData[] {
  return Object.values(structuredCaseStudies);
}
