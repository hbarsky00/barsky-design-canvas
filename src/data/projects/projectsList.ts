
import { ProjectProps } from "@/components/ProjectCard";
import { medicationAppProject } from "./medicationApp";

export const projectsData: ProjectProps[] = [
  medicationAppProject,
  {
    id: "investor-loan-app",
    title: "Investor Loan App",
    description: "Modernizing Excel-based loan management for a private banking institution with automated workflows and AI-powered search capabilities.",
    image: "/lovable-uploads/e9e3caf3-dcd1-49ed-a465-44657fb60850.png",
    tags: ["UX Research", "UI Design", "Banking", "Excel Automation", "Financial Technology"],
    featured: true
  },
  {
    id: "dae-search",
    title: "DAE Search Platform",
    description: "Building a comprehensive data exploration platform with advanced search capabilities and user-friendly interface design.",
    image: "/lovable-uploads/4cdd5e0d-f7c9-4d83-b760-08ffe57f27f4.png",
    tags: ["Data Platform", "Search Design", "UX Research", "Information Architecture"],
    featured: true
  },
  {
    id: "splittime",
    title: "SplitTime Co-Parenting App",
    description: "Designing a comprehensive co-parenting platform that simplifies custody scheduling, communication, and child welfare tracking.",
    image: "/lovable-uploads/716b7cef-a40b-4d2a-a4db-6a360313a63a.png",
    tags: ["Mobile App", "UX Research", "Family Tech", "Communication Design"],
    featured: true
  },
  {
    id: "herbalink",
    title: "HerbaLink Wellness Platform",
    description: "Creating a comprehensive herbal medicine platform connecting users with certified practitioners and personalized wellness tracking.",
    image: "/lovable-uploads/8df73511-1861-490b-a280-b6b75c419522.png",
    tags: ["Healthcare", "Wellness", "Mobile Design", "Telemedicine", "User Experience"],
    featured: false
  },
  {
    id: "gold2crypto",
    title: "Gold2Crypto Trading Platform",
    description: "Designing an intuitive cryptocurrency trading interface with advanced market analysis and security-focused user experience.",
    image: "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png",
    tags: ["Fintech", "Trading", "Crypto", "Security Design", "Data Visualization"],
    featured: false
  },
  {
    id: "barskyjoint",
    title: "Barsky Joint Restaurant App",
    description: "Developing a food truck location app and restaurant website with integrated ordering and social features.",
    image: "/lovable-uploads/ca0ed7f2-7f32-4ed9-a558-e1c3a718e711.png",
    tags: ["Food Tech", "Mobile App", "Restaurant", "Location Services", "Social Features"],
    featured: false
  },
  {
    id: "spectrum",
    title: "Spectrum Apparel Store",
    description: "Building an accessible e-commerce platform for custom apparel with inclusive design principles and seamless user experience.",
    image: "/lovable-uploads/56a3b260-72d5-4b69-879b-9280e1731be7.png",
    tags: ["E-commerce", "Accessibility", "Custom Design", "Inclusive UX", "Retail"],
    featured: false
  }
];
