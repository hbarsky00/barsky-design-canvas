
import { ProjectDetails } from "../types/project";

export const financetrackerDetails: ProjectDetails = {
  client: "FinanceTracker Startup",
  duration: "5 months",
  role: "Lead Product Designer", 
  projectLink: "https://figma.com/financetracker-app",
  problem: "Many people struggle with personal finance management due to complex tools, lack of insights, and difficulty maintaining consistent tracking habits.",
  solution: "An intuitive mobile-first application that automates expense tracking, provides intelligent financial insights, and gamifies savings goals to encourage healthy financial habits.",
  keyFeatures: [
    "Automated expense categorization",
    "Smart budget recommendations", 
    "Goal-based savings tracking",
    "Investment portfolio overview",
    "Bill reminder notifications",
    "Financial health scoring"
  ],
  technologies: ["React Native", "Python", "TensorFlow", "Plaid API", "Firebase", "Chart.js"],
  challenges: [
    "Bank integration security",
    "Complex financial data visualization",
    "Cross-platform consistency",
    "Real-time data synchronization"
  ],
  outcomes: [
    "95% user retention after 3 months",
    "Average 23% increase in user savings",
    "4.8/5 App Store rating",
    "Featured in Apple's 'Apps We Love'"
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      caption: "Personal finance dashboard displaying expense tracking, budget analysis, and savings goals with intuitive data visualizations"
    },
    {
      src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      caption: "Mobile app interface showing automated expense categorization and smart spending insights for better financial decision making"
    },
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      caption: "Financial analytics and reporting features displaying investment performance, spending patterns, and goal progress tracking"
    }
  ],
  designProcess: {
    research: "Surveyed 200+ users about financial habits, analyzed competitor apps, and studied behavioral finance principles to inform design decisions.",
    wireframes: "Developed user journey maps and wireframes focusing on habit formation and progressive disclosure of complex financial data.",
    prototyping: "Created interactive prototypes with micro-interactions and animations to make financial management engaging and accessible.",
    testing: "Conducted A/B tests on key features and performed usability testing with users of varying financial literacy levels."
  },
  userPersonas: [
    {
      name: "Jessica Rodriguez",
      age: 28,
      role: "Young Professional",
      goals: ["Build emergency fund", "Track daily expenses", "Learn about investing"],
      frustrations: ["Forgetting to log expenses", "Complex financial advice", "Overwhelming investment options"]
    },
    {
      name: "Robert Kim",
      age: 35,
      role: "Family Man & Homeowner",
      goals: ["Manage family budget", "Save for children's education", "Track mortgage and investments"],
      frustrations: ["Multiple financial accounts", "Complex budgeting tools", "Lack of automation"]
    }
  ]
};
