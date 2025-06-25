
import { ProjectProps } from "@/components/ProjectCard";

export const projectsData: ProjectProps[] = [
  {
    id: "medication-app",
    title: "Medication Management App",
    description: "A comprehensive diabetes management application that helps patients track medications, schedule appointments, and monitor their health with an intuitive, accessible interface.",
    image: "/lovable-uploads/5e00c1b3-3845-412a-820e-b841d8fc0637.png",
    category: "Healthcare Technology",
    year: "2023",
    tags: ["UX/UI Design", "Mobile App", "Healthcare", "React Native"]
  },
  {
    id: "investor-loan-app",
    title: "Private Money Lending Platform",
    description: "A sophisticated financial platform connecting private lenders with real estate investors, featuring automated underwriting, document management, and portfolio tracking.",
    image: "/lovable-uploads/e2bdc9bb-5f83-4a5a-b2ed-1ca6a5219890.png",
    category: "Financial Technology",
    year: "2023",
    tags: ["UX/UI Design", "Web App", "FinTech", "React"]
  },
  {
    id: "herbalink",
    title: "Herbalink E-commerce Platform",
    description: "A modern e-commerce solution for herbal products featuring advanced product filtering, secure payments, and comprehensive inventory management.",
    image: "/lovable-uploads/8847c151-cc21-4e47-af62-b048390cdefb.png",
    category: "E-commerce",
    year: "2023",
    tags: ["UX/UI Design", "E-commerce", "Web App", "React"]
  },
  {
    id: "splittime",
    title: "Splittime Employee Management",
    description: "An innovative employee scheduling and management platform designed for restaurants and hospitality businesses, featuring shift planning, time tracking, and team communication.",
    image: "/lovable-uploads/7a9c8543-57e2-4048-b200-5fa7a1f0b8a3.png",
    category: "Business Management",
    year: "2023",
    tags: ["UX/UI Design", "Business Tools", "Web App", "React"]
  },
  {
    id: "barskyjoint",
    title: "Barsky Joint Restaurant",
    description: "A vibrant restaurant website featuring online ordering, table reservations, and an engaging digital menu experience with seamless mobile optimization.",
    image: "/lovable-uploads/f604a63a-fa98-4d5e-abac-418c139487d1.png",
    category: "Restaurant & Hospitality",
    year: "2023",
    tags: ["UX/UI Design", "Restaurant", "Web Design", "React"]
  }
];

// Enhanced logging for debugging
console.log('📋 Projects list loaded successfully:', {
  totalProjects: projectsData.length,
  projectIds: projectsData.map(p => p.id),
  medicationAppFound: !!projectsData.find(p => p.id === "medication-app"),
  medicationAppData: projectsData.find(p => p.id === "medication-app")
});
