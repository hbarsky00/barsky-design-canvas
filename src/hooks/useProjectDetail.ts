import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projects/projectsList";
import { projectDetails } from "@/data/project-details";
import { ProjectDetails } from "@/data/types/project";
import { trackPageView } from "@/lib/analytics";
import { imageCaptions } from "@/data/imageCaptions";
import { useSimplifiedProjectPersistence } from "./useSimplifiedProjectPersistence";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get persistence hooks for loading saved data
  const { getTextContent, getImageSrc, refreshTrigger } = useSimplifiedProjectPersistence(projectId || '');
  
  // Get base project and details from static data
  const baseProject = React.useMemo(() => {
    if (!projectId) return null;
    return projectsData.find(p => p.id === projectId) || null;
  }, [projectId]);

  const baseDetails = React.useMemo(() => {
    if (!projectId) return null;
    return projectDetails[projectId] || null;
  }, [projectId]);

  // Create updated project with saved changes
  const project = React.useMemo(() => {
    if (!baseProject || !projectId) return null;
    
    return {
      ...baseProject,
      title: getTextContent(`hero_title_${projectId}`, baseProject.title),
      description: getTextContent(`hero_description_${projectId}`, baseProject.description),
      image: getImageSrc(baseProject.image)
    };
  }, [baseProject, projectId, getTextContent, getImageSrc, refreshTrigger]);

  // Create updated details with saved changes
  const details = React.useMemo(() => {
    if (!baseDetails || !projectId) return null;
    
    return {
      ...baseDetails,
      challenge: getTextContent(`challenge_content_${projectId}`, baseDetails.challenge),
      process: getTextContent(`process_content_${projectId}`, baseDetails.process),
      result: getTextContent(`result_content_${projectId}`, baseDetails.result)
    };
  }, [baseDetails, projectId, getTextContent, refreshTrigger]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    if (!projectId) {
      setError('No project ID provided');
      setIsLoading(false);
      return;
    }

    console.log('🔍 useProjectDetail: Loading project with ID:', projectId);
    
    if (!baseProject) {
      const errorMsg = `Project not found with ID: ${projectId}`;
      console.error(errorMsg);
      setError(errorMsg);
      navigate("/projects");
    } else if (!baseDetails) {
      const errorMsg = `Project details not found for ID: ${projectId}`;
      console.error(errorMsg);
      setError(errorMsg);
    } else {
      console.log('✅ useProjectDetail: Project and details found');
      // Track page view
      trackPageView(`/project/${projectId}`, `${project?.title || baseProject.title} | Barsky Design Portfolio`);
    }
    
    setIsLoading(false);
  }, [projectId, navigate, baseProject, baseDetails]);
  
  return { 
    project, 
    details, 
    projectsData, 
    imageCaptions, 
    isLoading, 
    error 
  };
};
