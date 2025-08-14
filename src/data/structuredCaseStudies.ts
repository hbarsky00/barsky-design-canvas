
import { StructuredCaseStudy } from "./types/structuredCaseStudy";

const structuredCaseStudies: Record<string, StructuredCaseStudy> = {
  "splittime": {
    id: "splittime",
    title: "SplitTime - Time Tracking App",
    description: "A modern time tracking application for freelancers and teams",
    tags: ["Mobile App", "Time Tracking", "Productivity"],
    sections: [
      {
        type: "hero",
        title: "Overview",
        content: {
          text: "SplitTime revolutionizes how freelancers and teams track their work hours with intuitive design and powerful analytics."
        }
      }
    ],
    projectLink: "splittime",
    gradientClasses: "from-blue-50 to-indigo-100",
    seoData: {
      title: "SplitTime - Time Tracking App Case Study",
      description: "A modern time tracking application for freelancers and teams"
    }
  },
  "herbalink": {
    id: "herbalink",
    title: "HerbaLink - Health Platform",
    description: "Connecting patients with herbal medicine practitioners",
    tags: ["Healthcare", "Platform", "Mobile"],
    sections: [
      {
        type: "hero",
        title: "Overview", 
        content: {
          text: "HerbaLink bridges the gap between traditional herbal medicine and modern healthcare needs."
        }
      }
    ],
    projectLink: "herbalink",
    gradientClasses: "from-green-50 to-emerald-100",
    seoData: {
      title: "HerbaLink - Health Platform Case Study",
      description: "Connecting patients with herbal medicine practitioners"
    }
  },
  "investor-loan-app": {
    id: "investor-loan-app",
    title: "Investor Loan Application",
    description: "Streamlined loan application process for real estate investors",
    tags: ["FinTech", "Real Estate", "Application"],
    sections: [
      {
        type: "hero",
        title: "Overview",
        content: {
          text: "Simplified loan application process specifically designed for real estate investors."
        }
      }
    ],
    projectLink: "investor-loan-app",
    gradientClasses: "from-orange-50 to-amber-100",
    seoData: {
      title: "Investor Loan Application Case Study",
      description: "Streamlined loan application process for real estate investors"
    }
  },
  "wholesale-distribution": {
    id: "wholesale-distribution",
    title: "Wholesale Distribution System",
    description: "Modern B2B platform for wholesale distribution management",
    tags: ["B2B", "Distribution", "Enterprise"],
    sections: [
      {
        type: "hero",
        title: "Overview",
        content: {
          text: "Complete wholesale distribution management system designed for modern B2B operations."
        }
      }
    ],
    projectLink: "wholesale-distribution",
    gradientClasses: "from-purple-50 to-violet-100",
    seoData: {
      title: "Wholesale Distribution System Case Study",
      description: "Modern B2B platform for wholesale distribution management"
    }
  },
  "business-management": {
    id: "business-management",
    title: "Business Management Suite",
    description: "Comprehensive business management platform for SMEs",
    tags: ["Business", "Management", "Enterprise"],
    sections: [
      {
        type: "hero",
        title: "Overview",
        content: {
          text: "All-in-one business management platform designed specifically for small and medium enterprises."
        }
      }
    ],
    projectLink: "business-management",
    gradientClasses: "from-slate-50 to-gray-100",
    seoData: {
      title: "Business Management Suite Case Study",
      description: "Comprehensive business management platform for SMEs"
    }
  }
};

export const getStructuredCaseStudy = (id: string): StructuredCaseStudy | null => {
  return structuredCaseStudies[id] || null;
};

export { structuredCaseStudies };
