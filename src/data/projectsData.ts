
export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export const projectsData: ProjectProps[] = [
  {
    id: "splittime",
    title: "SplitTime - Time Tracking App",
    description: "A modern time tracking application for freelancers and teams",
    image: "/api/placeholder/800/600",
    tags: ["Mobile App", "Time Tracking", "Productivity"]
  },
  {
    id: "herbalink", 
    title: "HerbaLink - Health Platform",
    description: "Connecting patients with herbal medicine practitioners",
    image: "/api/placeholder/800/600",
    tags: ["Healthcare", "Platform", "Mobile"]
  },
  {
    id: "investor-loan-app",
    title: "Investor Loan Application", 
    description: "Streamlined loan application process for real estate investors",
    image: "/api/placeholder/800/600",
    tags: ["FinTech", "Real Estate", "Application"]
  },
  {
    id: "wholesale-distribution",
    title: "Wholesale Distribution System",
    description: "Modern B2B platform for wholesale distribution management", 
    image: "/api/placeholder/800/600",
    tags: ["B2B", "Distribution", "Enterprise"]
  },
  {
    id: "business-management",
    title: "Business Management Suite",
    description: "Comprehensive business management platform for SMEs",
    image: "/api/placeholder/800/600", 
    tags: ["Business", "Management", "Enterprise"]
  }
];
