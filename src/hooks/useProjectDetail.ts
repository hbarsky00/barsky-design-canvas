
import { useState, useEffect } from "react";
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
  const [project, setProject] = useState<typeof projectsData[0] | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get persistence hooks for loading saved data
  const { getTextContent, getImageSrc, forceRefresh } = useSimplifiedProjectPersistence(projectId || '');
  
  useEffect(() => {
    // Reset loading state when project ID changes
    setIsLoading(true);
    setError(null);
    
    if (!projectId) {
      setError('No project ID provided');
      setIsLoading(false);
      return;
    }

    console.log('🔍 useProjectDetail: Loading project with ID:', projectId);
    
    // Find the project based on the URL parameter
    const foundProject = projectsData.find(p => p.id === projectId);
    if (foundProject) {
      // Apply any saved text content to project data
      const updatedProject = {
        ...foundProject,
        title: getTextContent(`hero_title_${projectId}`, foundProject.title),
        description: getTextContent(`hero_description_${projectId}`, foundProject.description),
        image: getImageSrc(foundProject.image)
      };
      
      console.log('✅ useProjectDetail: Project found and updated:', {
        originalTitle: foundProject.title,
        updatedTitle: updatedProject.title,
        originalDescription: foundProject.description.substring(0, 50) + '...',
        updatedDescription: updatedProject.description.substring(0, 50) + '...'
      });
      
      setProject(updatedProject);
      
      const projectDetail = projectDetails[projectId as string];
      
      if (!projectDetail) {
        const errorMsg = `Project details not found for ID: ${projectId}`;
        console.error(errorMsg);
        setError(errorMsg);
      } else {
        // Apply any saved content to project details
        const updatedDetails = {
          ...projectDetail,
          challenge: getTextContent(`challenge_content_${projectId}`, projectDetail.challenge),
          process: getTextContent(`process_content_${projectId}`, projectDetail.process),
          result: getTextContent(`result_content_${projectId}`, projectDetail.result)
        };
        
        console.log('✅ useProjectDetail: Details found and updated:', {
          originalChallenge: projectDetail.challenge.substring(0, 50) + '...',
          updatedChallenge: updatedDetails.challenge.substring(0, 50) + '...'
        });
        
        setDetails(updatedDetails);
      }
      
      // Track page view
      trackPageView(`/project/${projectId}`, `${updatedProject.title} | Barsky Design Portfolio`);
    } else {
      const errorMsg = `Project not found with ID: ${projectId}`;
      console.error(errorMsg);
      setError(errorMsg);
      // If project not found, redirect to all projects page
      navigate("/projects");
    }
    
    setIsLoading(false);
  }, [projectId, navigate, getTextContent, getImageSrc]);

  // Listen for data updates and reload when changes occur
  useEffect(() => {
    const handleDataUpdate = async () => {
      console.log('🔄 useProjectDetail: Data updated, refreshing...');
      await forceRefresh();
      
      // Trigger a re-render by updating the loading state briefly
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 100);
    };

    window.addEventListener('projectDataUpdated', handleDataUpdate);
    window.addEventListener('forceComponentRefresh', handleDataUpdate);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleDataUpdate);
      window.removeEventListener('forceComponentRefresh', handleDataUpdate);
    };
  }, [forceRefresh]);
  
  return { 
    project, 
    details, 
    projectsData, 
    imageCaptions, 
    isLoading, 
    error 
  };
};
