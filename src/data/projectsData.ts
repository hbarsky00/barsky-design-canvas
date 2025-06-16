
import { ProjectProps } from "@/components/ProjectCard";
import { imageCaptions } from "./imageCaptions";

export const projectsData: ProjectProps[] = [
  {
    id: "medication-app",
    title: "Medication Management App",
    description: "A comprehensive mobile application designed to help diabetic patients manage their medication schedules, track health metrics, and coordinate with healthcare providers.",
    image: "/lovable-uploads/5faa6be9-9602-4fd5-8dff-4f95864e7142.png",
    tags: ["Mobile App Design", "Healthcare", "UX/UI Design", "Accessibility"],
    featured: true,
    category: "mobile"
  },
  {
    id: "investor-loan-app",
    title: "Investor Loan Management Platform",
    description: "A sophisticated banking interface that transforms complex Excel workflows into an intuitive digital platform for loan officers managing millions in transactions.",
    image: "/lovable-uploads/b49f4918-37cd-4ffa-bae3-2468e22f2fce.png",
    tags: ["Web Development", "Financial Technology", "UX/UI Design", "Data Visualization"],
    featured: true,
    category: "web"
  },
  {
    id: "dae-search",
    title: "Enterprise Data Catalog",
    description: "A Bloomberg-inspired data discovery platform with AI-powered search capabilities for navigating complex enterprise datasets.",
    image: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
    tags: ["Web Development", "Data Analytics", "Enterprise Software", "AI/ML Integration"],
    featured: true,
    category: "web"
  },
  {
    id: "splittime",
    title: "Co-Parenting Communication Platform",
    description: "A secure platform designed to facilitate positive communication and coordination between co-parents for their children's well-being.",
    image: "/lovable-uploads/27fba121-19a6-475b-977a-925861f25ff2.png",
    tags: ["Mobile App Design", "Social Platform", "UX/UI Design", "Family Technology"],
    featured: false,
    category: "mobile"
  },
  {
    id: "herbalink",
    title: "Herbalist Connection Platform",
    description: "A platform connecting patients with certified herbalists and traditional medicine practitioners, bridging ancient wisdom with modern technology.",
    image: "/lovable-uploads/518c2c32-ef4d-43f6-888e-f4dc1d45a422.png",
    tags: ["Web Development", "Healthcare", "Marketplace Design", "Traditional Medicine"],
    featured: false,
    category: "web"
  },
  {
    id: "gold2crypto",
    title: "Gold to Crypto Trading Platform",
    description: "A trading platform designed specifically for traditional gold investors looking to transition into cryptocurrency investments with familiar interfaces.",
    image: "/lovable-uploads/7ca9117b-f843-4407-876d-90bbd289f24e.png",
    tags: ["Web Development", "Financial Technology", "Trading Platform", "Cryptocurrency"],
    featured: false,
    category: "web"
  },
  {
    id: "barskyjoint",
    title: "Dual-Format Food Service App",
    description: "An innovative food service application supporting both mobile food truck operations and traditional restaurant formats with real-time location tracking.",
    image: "/lovable-uploads/dbed92d3-b001-4854-bf76-b4c7ae74de29.png",
    tags: ["Mobile App Design", "Food & Beverage", "Location Services", "E-commerce"],
    featured: false,
    category: "mobile"
  },
  {
    id: "spectrum",
    title: "Accessible Custom Apparel Platform",
    description: "An inclusive custom apparel design platform built with comprehensive accessibility features to serve users with diverse abilities and needs.",
    image: "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png",
    tags: ["Web Development", "E-commerce", "Accessibility", "Custom Design Tools"],
    featured: false,
    category: "web"
  }
];

// Export image captions for use across the application
export { imageCaptions };

// Export project details - import from the project-details index
export { projectDetails } from "./project-details";
export type { ProjectDetails } from "./types/project";
