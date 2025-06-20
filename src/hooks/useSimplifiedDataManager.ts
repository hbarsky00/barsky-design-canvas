
import React from 'react';
import { useSimplifiedProjectPersistence } from './useSimplifiedProjectPersistence';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';

export const useSimplifiedDataManager = (projectId: string, project: ProjectProps, details: ProjectDetails) => {
  const { getProjectData, getTextContent, getImageSrc, forceRefresh, refreshTrigger, cachedData } = useSimplifiedProjectPersistence(projectId);
  
  const [componentKey, setComponentKey] = React.useState(0);

  // Listen for real-time updates
  React.useEffect(() => {
    const handleUpdate = async (e: CustomEvent) => {
      console.log('🔄 SimplifiedDataManager: Update event received:', e.detail);
      
      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 Forcing component refresh for real-time update');
        await forceRefresh();
        setComponentKey(prev => prev + 1);
      }
    };

    window.addEventListener('projectDataUpdated', handleUpdate as EventListener);
    window.addEventListener('forceComponentRefresh', handleUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleUpdate as EventListener);
      window.removeEventListener('forceComponentRefresh', handleUpdate as EventListener);
    };
  }, [projectId, forceRefresh]);

  // Update component when refresh trigger changes
  React.useEffect(() => {
    console.log('🔄 SimplifiedDataManager: Refresh trigger changed, updating component');
    setComponentKey(prev => prev + 1);
  }, [refreshTrigger]);

  // Create updated project data
  const updatedProject = React.useMemo(() => {
    console.log('🔄 SimplifiedDataManager: Creating updated project data');
    return {
      ...project,
      title: getTextContent(`hero_title_${projectId}`, project.title),
      description: getTextContent(`hero_description_${projectId}`, project.description),
      image: getImageSrc(project.image)
    };
  }, [project, projectId, getTextContent, getImageSrc, cachedData]);

  // Create updated details data
  const updatedDetails = React.useMemo(() => {
    console.log('🔄 SimplifiedDataManager: Creating updated details data');
    return {
      ...details,
      challenge: getTextContent(`challenge_content_${projectId}`, details.challenge),
      process: getTextContent(`process_content_${projectId}`, details.process),
      result: getTextContent(`result_content_${projectId}`, details.result)
    };
  }, [details, projectId, getTextContent, cachedData]);

  return {
    updatedProject,
    updatedDetails,
    getImageSrc,
    componentKey,
    refreshTrigger
  };
};
