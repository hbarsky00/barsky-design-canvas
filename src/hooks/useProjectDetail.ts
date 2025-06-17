
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projects/projectsList";
import { projectDetails } from "@/data/project-details";
import { ProjectDetails } from "@/data/types/project";
import { trackPageView } from "@/lib/analytics";
import { imageCaptions } from "@/data/imageCaptions";

interface UseProjectDetailResult {
  project: typeof projectsData[0] | null;
  details: ProjectDetails | null;
  projectsData: typeof projectsData;
  imageCaptions: typeof imageCaptions;
  isLoading: boolean;
  error: string | null;
}

export const useProjectDetail = (projectId: string | undefined): UseProjectDetailResult => {
  const navigate = useNavigate();
  const [project, setProject] = useState<typeof projectsData[0] | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Reset loading state when project ID changes
    setIsLoading(true);
    setError(null);
    
    // Find the project based on the URL parameter
    const foundProject = projectsData.find(p => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
      const projectDetail = projectDetails[projectId as string];
      
      if (!projectDetail) {
        const errorMsg = `Project details not found for ID: ${projectId}`;
        console.error(errorMsg);
        setError(errorMsg);
      } else {
        setDetails(projectDetail);
      }
      
      // Track page view
      trackPageView(`/project/${projectId}`, `${foundProject.title} | Hiram Barsky Portfolio`);
    } else {
      const errorMsg = `Project not found with ID: ${projectId}`;
      console.error(errorMsg);
      setError(errorMsg);
      // If project not found, redirect to all projects page
      navigate("/projects");
    }
    
    setIsLoading(false);
  }, [projectId, navigate]);
  
  return { 
    project, 
    details, 
    projectsData, 
    imageCaptions, 
    isLoading, 
    error 
  };
};
