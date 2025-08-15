
import { StructuredCaseStudy } from "@/data/types/caseStudy";

export const structuredCaseStudies: Record<string, StructuredCaseStudy> = {
  "herbalink": {
    id: "herbalink",
    title: "HerbaLink Marketplace",
    description: "A trusted platform connecting herb enthusiasts with quality suppliers through verification and education.",
    tags: ["UX Design", "E-commerce", "Marketplace"],
    heroVideo: {
      src: "/videos/herbalink-hero.mp4",
      poster: "https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png",
      alt: "HerbaLink marketplace overview"
    },
    sections: [
      {
        id: "overview",
        type: "hero",
        title: "Project Overview",
        content: "HerbaLink needed a complete digital transformation to connect herb enthusiasts with quality suppliers."
      }
    ],
    projectLink: "https://herbalink.example.com",
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    seoData: {
      description: "Case study: HerbaLink marketplace design and development",
      keywords: ["UX Design", "E-commerce", "Marketplace"]
    }
  },
  "splittime": {
    id: "splittime",
    title: "SplitTime Tracking",
    description: "Revolutionary time tracking platform designed for remote teams with intuitive workflows.",
    tags: ["Product Design", "SaaS", "Remote Work"],
    heroVideo: {
      src: "/videos/splittime-hero.mp4",
      poster: "https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png",
      alt: "SplitTime tracking interface"
    },
    sections: [
      {
        id: "overview",
        type: "hero",
        title: "Project Overview",
        content: "SplitTime needed to revolutionize time tracking for remote teams."
      }
    ],
    projectLink: "https://splittime.example.com",
    gradientClasses: "from-blue-50 via-indigo-50 to-purple-50"
  },
  "business-management": {
    id: "business-management",
    title: "Business Management System",
    description: "Comprehensive business management platform for small to medium enterprises.",
    tags: ["Enterprise", "Business Management", "Dashboard"],
    heroVideo: {
      src: "/videos/business-management-hero.mp4",
      poster: "https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png",
      alt: "Business management dashboard"
    },
    sections: [
      {
        id: "overview",
        type: "hero",
        title: "Project Overview",
        content: "A comprehensive business management solution."
      }
    ],
    projectLink: "https://business-management.example.com",
    gradientClasses: "from-gray-50 via-slate-50 to-zinc-50"
  },
  "investor-loan-app": {
    id: "investor-loan-app",
    title: "Investor Loan App",
    description: "Mobile-first platform connecting investors with loan opportunities.",
    tags: ["FinTech", "Mobile App", "Investment"],
    heroVideo: {
      src: "/videos/investor-loan-hero.mp4",
      poster: "https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png",
      alt: "Investor loan application interface"
    },
    sections: [
      {
        id: "overview",
        type: "hero",
        title: "Project Overview",
        content: "Mobile-first platform for investment opportunities."
      }
    ],
    projectLink: "https://investor-loan.example.com",
    gradientClasses: "from-amber-50 via-yellow-50 to-orange-50"
  },
  "wholesale-distribution": {
    id: "wholesale-distribution",
    title: "Wholesale Distribution Platform",
    description: "Modern B2B ordering system that streamlined operations for a wholesale distribution company.",
    tags: ["B2B", "Enterprise", "Process Optimization"],
    heroVideo: {
      src: "/videos/wholesale-distribution-hero.mp4",
      poster: "https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png",
      alt: "Wholesale distribution platform overview"
    },
    sections: [
      {
        id: "overview",
        type: "hero",
        title: "Project Overview",
        content: "Modernizing wholesale distribution operations."
      }
    ],
    projectLink: "https://wholesale-distribution.example.com",
    gradientClasses: "from-red-50 via-rose-50 to-pink-50"
  }
};

export const getStructuredCaseStudy = (id: string): StructuredCaseStudy | null => {
  return structuredCaseStudies[id] || null;
};
