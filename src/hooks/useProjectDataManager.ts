
import React from 'react';
import { useProjectPersistence } from '@/hooks/useProjectPersistence';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';

export const useProjectDataManager = (projectId: string, project: ProjectProps, details: ProjectDetails) => {
  const { getProjectData } = useProjectPersistence(projectId);
  
  const [updateTrigger, setUpdateTrigger] = React.useState(0);

  React.useEffect(() => {
    const handleProjectDataUpdate = (e: CustomEvent) => {
      console.log('Project data updated, forcing re-render');
      
      if (e.detail?.stayOnPage) {
        console.log('🔒 Staying on current page as requested');
        e.preventDefault?.();
        e.stopPropagation?.();
      }
      
      setUpdateTrigger(prev => prev + 1);
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    };
  }, []);

  const savedData = React.useMemo(() => getProjectData(), [getProjectData, updateTrigger]);

  const getTextContent = React.useCallback((key: string, fallback: string) => {
    return savedData.textContent[key] || fallback;
  }, [savedData.textContent]);

  const getReplacedImageSrc = React.useCallback((originalSrc: string) => {
    return savedData.imageReplacements[originalSrc] || originalSrc;
  }, [savedData.imageReplacements]);

  const updatedProject = React.useMemo(() => ({
    ...project,
    title: getTextContent(`hero_title_${projectId}`, project.title),
    description: getTextContent(`hero_description_${projectId}`, project.description),
    image: getReplacedImageSrc(project.image)
  }), [project, projectId, getTextContent, getReplacedImageSrc]);

  const updatedDetails = React.useMemo(() => ({
    ...details,
    challenge: getTextContent(`challenge_title_${projectId}`, 
      getTextContent(`challenge_content_${projectId}`, details.challenge)),
    process: getTextContent(`process_title_${projectId}`, 
      getTextContent(`process_content_${projectId}`, details.process)),
    result: getTextContent(`result_title_${projectId}`, 
      getTextContent(`result_content_${projectId}`, details.result))
  }), [details, projectId, getTextContent]);

  return {
    updatedProject,
    updatedDetails,
    getReplacedImageSrc
  };
};
