
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projects/projectsList";
import { projectDetails, type ProjectDetails } from "@/data/projectsData";
import { trackPageView } from "@/lib/analytics";

interface UseProjectDetailResult {
  project: typeof projectsData[0] | null;
  details: ProjectDetails | null;
  isLoading: boolean;
}

export const useProjectDetail = (projectId: string | undefined): UseProjectDetailResult => {
  const navigate = useNavigate();
  const [project, setProject] = useState<typeof projectsData[0] | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Reset loading state when project ID changes
    setIsLoading(true);
    
    // Find the project based on the URL parameter
    const foundProject = projectsData.find(p => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
      const projectDetail = projectDetails[projectId as string];
      
      if (!projectDetail) {
        console.error(`Project details not found for ID: ${projectId}`);
      } else {
        setDetails(projectDetail);
      }
      
      // Track page view
      trackPageView(`/project/${projectId}`, `${foundProject.title} | Hiram Barsky Portfolio`);
    } else {
      console.error(`Project not found with ID: ${projectId}`);
      // If project not found, redirect to all projects page
      navigate("/projects");
    }
    
    setIsLoading(false);
  }, [projectId, navigate]);
  
  return { project, details, isLoading };
};
