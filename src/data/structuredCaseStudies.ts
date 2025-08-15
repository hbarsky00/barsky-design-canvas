
import { StructuredCaseStudy } from "@/data/types/caseStudy";

const caseStudies: Record<string, StructuredCaseStudy> = {
  "herbalink": {
    id: "herbalink",
    title: "HerbaLink Marketplace",
    description: "A trusted platform connecting herb enthusiasts with quality suppliers through verification and education.",
    tags: ["UX Design", "E-commerce", "Marketplace"],
    heroVideo: {
      src: "https://barskydesign.pro/videos/herbalink-demo.mp4",
      poster: "https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png",
      alt: "HerbaLink marketplace demonstration"
    },
    sections: [
      {
        id: "challenge",
        type: "content",
        title: "The Challenge",
        content: "Creating a trusted platform for herb enthusiasts to connect with quality suppliers in a market plagued by misinformation and unverified products."
      },
      {
        id: "solution",
        type: "content", 
        title: "The Solution",
        content: "Designed an intuitive verification system combined with educational content workflows that help users make informed decisions about herbal products."
      },
      {
        id: "results",
        type: "metrics",
        title: "Results",
        metrics: [
          { value: "40%", label: "Increase in User Trust" },
          { value: "60%", label: "More Verified Suppliers" },
          { value: "3x", label: "User Engagement Growth" }
        ]
      }
    ],
    seoData: {
      description: "Case study: HerbaLink marketplace connecting herb enthusiasts with verified suppliers",
      keywords: ["UX design", "marketplace design", "e-commerce platform"]
    }
  },
  
  "splittime": {
    id: "splittime",
    title: "SplitTime Tracking",
    description: "Revolutionary time tracking platform designed for remote teams with intuitive workflows.",
    tags: ["Product Design", "SaaS", "Remote Work"],
    heroVideo: {
      src: "https://barskydesign.pro/videos/splittime-demo.mp4",
      poster: "https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png",
      alt: "SplitTime tracking application interface"
    },
    sections: [
      {
        id: "challenge",
        type: "content",
        title: "The Challenge", 
        content: "Designing an intuitive time tracking solution for remote teams struggling with productivity measurement and project management."
      },
      {
        id: "process",
        type: "content",
        title: "Design Process",
        content: "Analyzed existing time tracking tools, conducted user interviews with remote workers, and prototyped streamlined workflows that eliminate friction."
      },
      {
        id: "results",
        type: "metrics",
        title: "Impact",
        metrics: [
          { value: "40%", label: "Productivity Increase" },
          { value: "25%", label: "Time Saved Daily" },
          { value: "90%", label: "User Satisfaction" }
        ]
      }
    ],
    seoData: {
      description: "Case study: SplitTime tracking app revolutionizing remote team productivity",
      keywords: ["time tracking", "remote work", "productivity app design"]
    }
  },

  "business-management": {
    id: "business-management", 
    title: "Business Management Platform",
    description: "Comprehensive business management solution unifying operations for small businesses.",
    tags: ["Enterprise Design", "Business Tools", "Process Optimization"],
    heroVideo: {
      src: "https://barskydesign.pro/videos/business-mgmt-demo.mp4",
      poster: "https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png",
      alt: "Business management dashboard overview"
    },
    sections: [
      {
        id: "overview",
        type: "content",
        title: "Project Overview",
        content: "Creating a comprehensive business management solution for small businesses struggling with fragmented tools and inefficient processes."
      },
      {
        id: "approach",
        type: "content", 
        title: "Design Approach",
        content: "Conducted market research, designed modular architecture, and created intuitive workflows for various business functions including inventory, CRM, and analytics."
      },
      {
        id: "outcome",
        type: "metrics",
        title: "Business Impact",
        metrics: [
          { value: "50%", label: "Process Efficiency Gain" },
          { value: "30%", label: "Cost Reduction" },
          { value: "85%", label: "User Adoption Rate" }
        ]
      }
    ],
    seoData: {
      description: "Case study: Business management platform streamlining small business operations",
      keywords: ["business management", "enterprise design", "workflow optimization"]
    }
  },

  "investor-loan-app": {
    id: "investor-loan-app",
    title: "Investor Loan Portfolio",
    description: "Sophisticated loan management platform for investors with complex portfolio tracking needs.",
    tags: ["FinTech", "Data Visualization", "Portfolio Management"],
    heroVideo: {
      src: "https://barskydesign.pro/videos/investor-loan-demo.mp4",
      poster: "https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png",
      alt: "Investor loan portfolio dashboard"
    },
    sections: [
      {
        id: "challenge",
        type: "content",
        title: "The Challenge",
        content: "Designing a sophisticated loan management platform for investors dealing with complex portfolio tracking and risk assessment requirements."
      },
      {
        id: "solution",
        type: "content",
        title: "Design Solution", 
        content: "Analyzed financial workflows, created intuitive data visualization systems, and designed secure user interfaces optimized for sensitive financial data."
      },
      {
        id: "impact",
        type: "metrics",
        title: "Results Achieved",
        metrics: [
          { value: "35%", label: "Faster Risk Assessment" },
          { value: "60%", label: "Improved Portfolio Visibility" },
          { value: "45%", label: "Decision Speed Increase" }
        ]
      }
    ],
    seoData: {
      description: "Case study: Investor loan portfolio management platform design",
      keywords: ["fintech design", "portfolio management", "financial dashboard"]
    }
  },

  "wholesale-distribution": {
    id: "wholesale-distribution",
    title: "Wholesale Distribution Platform", 
    description: "Modern B2B ordering system that streamlined operations for a wholesale distribution company.",
    tags: ["B2B", "Enterprise", "Process Optimization"],
    heroVideo: {
      src: "https://barskydesign.pro/videos/wholesale-demo.mp4", 
      poster: "https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png",
      alt: "Wholesale distribution platform interface"
    },
    sections: [
      {
        id: "challenge",
        type: "content",
        title: "Business Challenge",
        content: "Modernizing a traditional B2B ordering system for a wholesale distribution company struggling with manual processes and outdated technology."
      },
      {
        id: "approach",
        type: "content",
        title: "Solution Approach", 
        content: "Mapped existing workflows, interviewed stakeholders, designed user-centered interfaces, and implemented AI-powered automation features to eliminate bottlenecks."
      },
      {
        id: "results",
        type: "metrics",
        title: "Business Impact",
        metrics: [
          { value: "70%", label: "Manual Task Reduction" },
          { value: "50%", label: "Order Processing Speed" },
          { value: "95%", label: "User Satisfaction Score" }
        ]
      }
    ],
    seoData: {
      description: "Case study: AI-powered wholesale distribution platform transformation",
      keywords: ["B2B platform", "wholesale distribution", "AI automation"]
    }
  }
};

export function getStructuredCaseStudy(id: string): StructuredCaseStudy | null {
  return caseStudies[id] || null;
}

export function getAllStructuredCaseStudies(): StructuredCaseStudy[] {
  return Object.values(caseStudies);
}
