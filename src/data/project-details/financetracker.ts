
import { ProjectDetails } from "../types/project";

export const financetrackerDetails: ProjectDetails = {
  client: "FinanceTracker Startup",
  duration: "5 months",
  role: "Lead Product Designer", 
  projectLink: "https://figma.com/financetracker-app",
  challenge: "Many people struggle with personal finance management due to complex tools, lack of insights, and difficulty maintaining consistent tracking habits.",
  process: "I conducted comprehensive user research, developed intuitive mobile-first designs, and created an application that automates expense tracking, provides intelligent financial insights, and gamifies savings goals to encourage healthy financial habits.",
  result: "The application achieved 95% user retention after 3 months, with users seeing an average 23% increase in savings. It received a 4.8/5 App Store rating and was featured in Apple's 'Apps We Love'.",
  technologies: ["React Native", "Python", "TensorFlow", "Plaid API", "Firebase", "Chart.js"],
  imageConfig: {
    challenge: {
      beforeHeader: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    process: {
      beforeHeader: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    result: {
      beforeHeader: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    }
  }
};
