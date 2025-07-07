import { ProjectVariable } from "./types";

export const investorLoanAppVariables: ProjectVariable = {
  projectTitle: "Investor Loan Management Platform",
  projectSubtitle: "Portfolio Tracking and Automated Reporting",
  timeline: "1.5 years",
  role: "Lead Product Designer & Product Strategist",
  industry: "FinTech/Real Estate",
  client: "Private Banking Institution",

  challenge: {
    heading: "The Problem",
    description: "Real estate investors were drowning in data. Multiple spreadsheets, manual calculations, and scattered loan information created a productivity nightmare that was costing them deals.",
    painPoints: [
      "Entirely manual loan management system built on Excel spreadsheets",
      "Significant operational bottlenecks preventing business growth",
      "Multiple spreadsheets and manual calculations creating inefficiency",
      "Scattered loan information across different systems",
      "High error rates in manual data entry and processing",
      "Lack of centralized portfolio overview and real-time insights"
    ]
  },

  process: {
    heading: "From Chaos to Intelligence",
    description: "My approach combined comprehensive user journey mapping with AI-powered data visualization. Instead of overwhelming users with information, I created intelligent dashboards that surface the right insights at the right time.",
    steps: [
      "Research: Analyzed existing Excel-based workflows and pain points",
      "Strategy: Designed intelligent dashboard system prioritizing critical information",
      "Prototyping: Created banking-specific UI patterns in Balsamiq and Figma",
      "Implementation: Integrated AG Grid and predictive AI search capabilities"
    ],
    keyInnovations: [
      "Intelligent dashboard system that prioritizes critical loan information",
      "Automated data validation eliminating 85% of manual entry errors",
      "Centralized loan tracking with real-time status updates",
      "Streamlined approval workflows reducing processing time by 43%",
      "Advanced search and filtering for immediate loan portfolio insights",
      "Professional banking UI emphasizing trust and data accuracy"
    ]
  },

  solution: {
    heading: "The Solution",
    description: "A unified, intelligent system that Banking professionals could trust and adopt immediately, transforming scattered Excel data into actionable insights.",
    features: [
      "Centralized loan portfolio dashboard with real-time updates",
      "Automated data validation and error prevention systems",
      "Advanced search and filtering for instant information retrieval",
      "Streamlined approval workflows with status tracking",
      "Professional banking interface design optimized for trust and accuracy"
    ]
  },

  results: {
    heading: "Business Transformation",
    description: "43% faster loan processing, 67% reduction in user errors. This wasn't just a design improvement—it was a business multiplier.",
    metrics: [
      "43% faster loan processing within first 60 days of deployment",
      "67% reduction in user errors through automated validation systems",
      "Investors could now manage 3x more properties with the same effort",
      "User training time reduced by 78% due to intuitive interface design",
      "Manual error correction time reduced from 8 hours/week to 1 hour/week",
      "Loan approval cycle shortened from 5 days to 2.8 days average",
      "Client satisfaction scores increased by 89% post-implementation",
      "312% ROI within first year of implementation"
    ],
    testimonials: [
      "I can finally see our entire loan portfolio in one view—game changer for decision making",
      "The automated validation caught errors I would have missed for weeks",
      "Processing loans is now enjoyable instead of stressful"
    ],
    longTermImpact: [
      "Platform eliminated need for 2 additional data entry specialists",
      "Scalable architecture supports 500% growth in loan volume",
      "Bank expanded to 3 new markets using the scalable platform",
      "Foundation established for advanced analytics and automated reporting"
    ]
  },

  techStack: [
    "User Research", "Figma", "Balsamiq", "AG Grid", "Predictive AI Search", 
    "Banking Product Design", "Financial Data Visualization", "Excel Automation", "Order Management Systems"
  ],

  imageConfig: {
    hero: "/lovable-uploads/792b1203-fb09-429d-9a0a-bbf7e173dcdb.png",
    challenge: ["/lovable-uploads/e1d0b229-0ec0-4f02-a551-437bd38393e5.png"],
    process: [
      "/lovable-uploads/539fc1c8-ca24-465a-b189-653e03404112.png",
      "/lovable-uploads/ec1458b5-d364-498e-a5ec-4122b62195d3.png"
    ],
    results: ["/lovable-uploads/7a8b4364-8a51-4c15-9e30-ab0352103ba1.png"]
  }
};