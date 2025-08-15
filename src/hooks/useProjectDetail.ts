
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { projectDetails } from "@/data/project-details";
import { ProjectDetails } from "@/data/types/project";
import { trackPageView } from "@/lib/analytics";
import { imageCaptions } from "@/data/imageCaptions";

interface UseProjectDetailResult {
  project: typeof projectsData[0] | null;
  details: ProjectDetails | null;
  projectsData: Array<{ id: string; title: string; image: string; }>;
  imageCaptions: typeof imageCaptions;
  isLoading: boolean;
  error: string | null;
}

export const useProjectDetail = (projectId: string | undefined): UseProjectDetailResult => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get base project and details from static data
  const project = React.useMemo(() => {
    if (!projectId) return null;
    return projectsData.find(p => p.id === projectId) || null;
  }, [projectId]);

  const details = React.useMemo(() => {
    if (!projectId) return null;
    return projectDetails[projectId] || null;
  }, [projectId]);

  // Transform projectsData to match the expected format for navigation
  // Use the exact order from projectsList.ts
  const transformedProjectsData = React.useMemo(() => {
    console.log('🔄 useProjectDetail: Transforming projects data for navigation');
    const transformed = projectsData.map(project => ({
      id: project.id,
      title: project.title,
      image: project.image
    }));
    console.log('🔄 useProjectDetail: Transformed projects in order:', transformed.map(p => `${p.id}: ${p.title}`));
    return transformed;
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    if (!projectId) {
      setError('No project ID provided');
      setIsLoading(false);
      return;
    }

    console.log('🔍 useProjectDetail: Loading project with ID:', projectId);
    
    if (!project) {
      const errorMsg = `Project not found with ID: ${projectId}`;
      console.error(errorMsg);
      setError(errorMsg);
      navigate("/projects");
    } else if (!details) {
      const errorMsg = `Project details not found for ID: ${projectId}`;
      console.error(errorMsg);
      setError(errorMsg);
    } else {
      console.log('✅ useProjectDetail: Project and details found');
      // Track page view
      trackPageView(`/project/${projectId}`, `${project.title} | Barsky Design Portfolio`);
    }
    
    setIsLoading(false);
  }, [projectId, navigate, project, details]);
  
  return { 
    project, 
    details, 
    projectsData: transformedProjectsData, 
    imageCaptions, 
    isLoading, 
    error 
  };
};
