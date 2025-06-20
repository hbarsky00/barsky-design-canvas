
import React from 'react';
import { useSimplifiedProjectPersistence } from './useSimplifiedProjectPersistence';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';

export const useSimplifiedDataManager = (projectId: string, project: ProjectProps, details: ProjectDetails) => {
  const { getTextContent, getImageSrc, refreshTrigger } = useSimplifiedProjectPersistence(projectId);
  
  console.log('🔄 SimplifiedDataManager: Refreshing with trigger:', refreshTrigger);

  // Create updated project data
  const updatedProject = React.useMemo(() => {
    const result = {
      ...project,
      title: getTextContent(`hero_title_${projectId}`, project.title),
      description: getTextContent(`hero_description_${projectId}`, project.description),
      image: getImageSrc(project.image)
    };
    console.log('🔄 Updated project data:', { title: result.title });
    return result;
  }, [project, projectId, getTextContent, getImageSrc, refreshTrigger]);

  // Create updated details data
  const updatedDetails = React.useMemo(() => {
    const result = {
      ...details,
      challenge: getTextContent(`challenge_content_${projectId}`, details.challenge),
      process: getTextContent(`process_content_${projectId}`, details.process),
      result: getTextContent(`result_content_${projectId}`, details.result)
    };
    console.log('🔄 Updated details data');
    return result;
  }, [details, projectId, getTextContent, refreshTrigger]);

  return {
    updatedProject,
    updatedDetails,
    getImageSrc,
    componentKey: refreshTrigger,
    refreshTrigger
  };
};
