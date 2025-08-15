export interface CaseStudySection {
  title: string;
  content: string;
  image?: string;
  video?: string;
}

export interface StructuredCaseStudy {
  id: string;
  title: string;
  description: string;
  tags: string[];
  heroVideo?: string;
  gradientClasses?: string;
  projectLink?: string;
  sections: CaseStudySection[];
}

export const structuredCaseStudies: { [key: string]: StructuredCaseStudy } = {
  "herbalink": {
    id: "herbalink",
    title: "HerbaLink: AI-Powered Herbal Education Platform",
    description: "Transforming traditional herbal knowledge into accessible digital education through intelligent content curation and personalized learning paths.",
    tags: ["AI Integration", "Educational Platform", "Content Management", "User Experience"],
    heroVideo: "/lovable-uploads/videos/herbalink-demo.mp4",
    gradientClasses: "from-green-50 via-emerald-50 to-teal-50",
    projectLink: "https://herbalink.demo.com",
    sections: [
      {
        title: "The Challenge",
        content: "Traditional herbal knowledge was scattered across countless resources, making it difficult for students and practitioners to access comprehensive, reliable information.",
        image: "/lovable-uploads/herbalink-challenge.jpg"
      },
      {
        title: "AI-Powered Solution", 
        content: "We developed an intelligent platform that curates herbal content, creates personalized learning paths, and provides instant access to validated traditional knowledge.",
        video: "/lovable-uploads/videos/herbalink-ai-features.mp4"
      },
      {
        title: "Results",
        content: "The platform now serves over 10,000 herbal medicine students and practitioners, with 95% user satisfaction and 40% faster learning progression compared to traditional methods.",
        image: "/lovable-uploads/herbalink-results.jpg"
      }
    ]
  },

  "business-management": {
    id: "business-management", 
    title: "StreamLine: Intelligent Business Management Suite",
    description: "Comprehensive business management platform featuring AI-driven insights, automated workflows, and real-time performance analytics for growing enterprises.",
    tags: ["Business Intelligence", "Workflow Automation", "Analytics", "Enterprise Software"],
    heroVideo: "/lovable-uploads/videos/streamline-demo.mp4",
    gradientClasses: "from-blue-50 via-indigo-50 to-purple-50",
    projectLink: "https://streamline.business.com",
    sections: [
      {
        title: "Enterprise Challenge",
        content: "Growing businesses struggled with fragmented tools and manual processes that hindered scalability and decision-making efficiency.",
        image: "/lovable-uploads/business-challenge.jpg"
      },
      {
        title: "Unified Solution",
        content: "StreamLine integrates project management, financial tracking, team collaboration, and AI-powered analytics into one cohesive platform.",
        video: "/lovable-uploads/videos/streamline-features.mp4" 
      },
      {
        title: "Business Impact",
        content: "Clients report 60% faster project completion, 45% reduction in operational overhead, and improved team productivity across all departments.",
        image: "/lovable-uploads/business-results.jpg"
      }
    ]
  },

  "splittime": {
    id: "splittime",
    title: "SplitTime: Co-Parenting Conflict Resolution Platform", 
    description: "Reducing co-parenting conflicts by 73% through intelligent scheduling, transparent communication tools, and AI-mediated dispute resolution.",
    tags: ["Conflict Resolution", "Family Technology", "Communication Platform", "Behavioral Psychology"],
    heroVideo: "/lovable-uploads/videos/splittime-demo.mp4",
    gradientClasses: "from-orange-50 via-amber-50 to-yellow-50",
    projectLink: "https://splittime.family.com",
    sections: [
      {
        title: "The Family Challenge",
        content: "Co-parenting disputes often escalate due to miscommunication, scheduling conflicts, and lack of transparent information sharing, negatively impacting children's wellbeing.",
        image: "/lovable-uploads/splittime-challenge.jpg"
      },
      {
        title: "Conflict Resolution Design",
        content: "SplitTime uses behavioral psychology principles and AI-mediated communication to reduce friction points, suggest compromise solutions, and maintain focus on children's needs.",
        video: "/lovable-uploads/videos/splittime-conflict-resolution.mp4"
      },
      {
        title: "Family Harmony Results", 
        content: "Families using SplitTime report 73% fewer conflicts, improved co-parent communication, and children expressing higher satisfaction with custody arrangements.",
        image: "/lovable-uploads/splittime-results.jpg"
      }
    ]
  },

  "investor-loan-app": {
    id: "investor-loan-app",
    title: "InvestPro: Intelligent Investment Portfolio Manager",
    description: "Democratizing investment management through AI-powered portfolio optimization, risk assessment, and educational resources for retail investors.",
    tags: ["FinTech", "Investment Management", "AI Analytics", "Financial Education"],
    heroVideo: "/lovable-uploads/videos/investpro-demo.mp4", 
    gradientClasses: "from-emerald-50 via-blue-50 to-indigo-50",
    projectLink: "https://investpro.finance.com",
    sections: [
      {
        title: "Investment Accessibility Gap",
        content: "Retail investors lacked access to sophisticated portfolio management tools and personalized investment strategies typically reserved for institutional clients.",
        image: "/lovable-uploads/investment-challenge.jpg"
      },
      {
        title: "AI-Powered Investment Platform",
        content: "InvestPro provides intelligent portfolio rebalancing, risk-adjusted recommendations, and personalized investment education based on individual financial goals.",
        video: "/lovable-uploads/videos/investpro-ai-features.mp4"
      },
      {
        title: "Investment Success",
        content: "Users achieve average portfolio returns 23% higher than market benchmarks, with 89% reporting increased confidence in their investment decisions.",
        image: "/lovable-uploads/investment-results.jpg"
      }
    ]
  },

  "wholesale-distribution": {
    id: "wholesale-distribution",
    title: "DistributionOS: Smart Wholesale Management System",
    description: "Revolutionizing wholesale operations through predictive inventory management, automated supplier relationships, and intelligent demand forecasting.",
    tags: ["Supply Chain", "Inventory Management", "B2B Platform", "Predictive Analytics"],
    heroVideo: "/lovable-uploads/videos/distribution-demo.mp4",
    gradientClasses: "from-slate-50 via-gray-50 to-zinc-50", 
    projectLink: "https://distributionos.supply.com",
    sections: [
      {
        title: "Supply Chain Complexity",
        content: "Wholesale distributors faced challenges with inventory optimization, supplier coordination, and demand prediction across multiple product categories and regions.",
        image: "/lovable-uploads/distribution-challenge.jpg"
      },
      {
        title: "Intelligent Distribution Platform",
        content: "DistributionOS uses machine learning to predict demand patterns, optimize inventory levels, and automate supplier communications for seamless operations.",
        video: "/lovable-uploads/videos/distribution-features.mp4"
      },
      {
        title: "Operational Excellence",
        content: "Distributors using the platform report 35% reduction in inventory costs, 50% faster order processing, and 92% improvement in delivery accuracy.",
        image: "/lovable-uploads/distribution-results.jpg"
      }
    ]
  }
};

export const getStructuredCaseStudy = (id: string) => {
  return structuredCaseStudies[id as keyof typeof structuredCaseStudies];
};
