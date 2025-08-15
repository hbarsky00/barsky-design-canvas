
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectDetails } from "@/data/types/project";

// Mock project data
const mockProjectsData = [
  {
    id: "splittime",
    title: "SplitTime - Time Tracking App",
    description: "A comprehensive time tracking solution for freelancers and teams",
    image: "/placeholder.svg",
    tags: ["Mobile App", "UX/UI Design", "React Native"]
  },
  {
    id: "herbalink",
    title: "HerbaLink - Health Platform",
    description: "A digital health platform connecting patients with herbal medicine practitioners",
    image: "/placeholder.svg",
    tags: ["Web App", "Healthcare", "React"]
  },
  {
    id: "investor-loan-app",
    title: "Investor Loan Management",
    description: "A fintech solution for managing investor loans and portfolios",
    image: "/placeholder.svg",
    tags: ["Fintech", "Web App", "Investment"]
  },
  {
    id: "wholesale-distribution",
    title: "Wholesale Distribution System",
    description: "An enterprise solution for wholesale distribution management",
    image: "/placeholder.svg",
    tags: ["Enterprise", "B2B", "Supply Chain"]
  },
  {
    id: "business-management",
    title: "Business Management Platform",
    description: "A comprehensive business management solution for SMEs",
    image: "/placeholder.svg",
    tags: ["Business Software", "CRM", "Management"]
  }
];

// Mock project details
const mockProjectDetails: Record<string, ProjectDetails> = {
  "business-management": {
    challenge: "Small and medium enterprises were struggling with fragmented business processes, using multiple disconnected tools for customer management, project tracking, and financial oversight.",
    process: "We conducted extensive user research with SME owners and employees to understand their workflow pain points. Through iterative design and testing, we created a unified platform that integrates all essential business functions.",
    result: "The platform successfully reduced administrative overhead by 50% and improved customer retention by 25%. Users reported significant time savings and better business insights.",
    technologies: ["React", "Node.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    duration: "6 months",
    client: "Internal Project",
    role: "Lead Product Designer & Developer"
  }
};

interface UseProjectDetailResult {
  project: typeof mockProjectsData[0] | null;
  details: ProjectDetails | null;
  isLoading: boolean;
  error: string | null;
}

export const useProjectDetail = (projectId: string | undefined): UseProjectDetailResult => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const project = React.useMemo(() => {
    if (!projectId) return null;
    return mockProjectsData.find(p => p.id === projectId) || null;
  }, [projectId]);

  const details = React.useMemo(() => {
    if (!projectId) return null;
    return mockProjectDetails[projectId] || null;
  }, [projectId]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    if (!projectId) {
      setError('No project ID provided');
      setIsLoading(false);
      return;
    }

    if (!project) {
      const errorMsg = `Project not found with ID: ${projectId}`;
      console.error(errorMsg);
      setError(errorMsg);
      navigate("/projects");
    } else if (!details) {
      const errorMsg = `Project details not found for ID: ${projectId}`;
      console.error(errorMsg);
      setError(errorMsg);
    }
    
    setIsLoading(false);
  }, [projectId, navigate, project, details]);
  
  return { 
    project, 
    details, 
    isLoading, 
    error 
  };
};
