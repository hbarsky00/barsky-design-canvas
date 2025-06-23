
import { useState, useEffect } from 'react';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';

export const useSimplifiedDataManager = (
  projectId: string,
  project: ProjectProps,
  details: ProjectDetails
) => {
  const [componentKey, setComponentKey] = useState(0);

  // Just return the original data without complex transformations
  const updatedProject = project;
  const updatedDetails = details;

  useEffect(() => {
    // Only update component key if there are actual changes
    const handleUpdate = (e: CustomEvent) => {
      if (e.detail?.projectId === projectId) {
        console.log('🔄 useSimplifiedDataManager: Simple update triggered');
        setComponentKey(prev => prev + 1);
      }
    };

    window.addEventListener('projectDataUpdated', handleUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleUpdate as EventListener);
    };
  }, [projectId]);

  return {
    updatedProject,
    updatedDetails,
    componentKey
  };
};
