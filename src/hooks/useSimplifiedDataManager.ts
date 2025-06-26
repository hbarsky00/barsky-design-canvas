
import React from 'react';
import { useSimplifiedProjectPersistence } from '@/hooks/useSimplifiedProjectPersistence';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';

export const useSimplifiedDataManager = (projectId: string, project: ProjectProps, details: ProjectDetails) => {
  const { getProjectData, forceRefresh, refreshTrigger, getImageSrc } = useSimplifiedProjectPersistence(projectId);
  
  const [componentKey, setComponentKey] = React.useState(0);

  // Listen for project data updates and trigger fresh data loading
  React.useEffect(() => {
    const handleProjectDataUpdate = async (e: CustomEvent) => {
      console.log('🔄 SimplifiedDataManager: Project data updated, refreshing');
      
      if (e.detail?.stayOnPage) {
        console.log('🔒 Staying on current page as requested');
        e.preventDefault?.();
        e.stopPropagation?.();
      }
      
      // Force refresh data from database
      await forceRefresh();
      setComponentKey(prev => prev + 1);
    };

    const handleForceRefresh = async (e: CustomEvent) => {
      console.log('🔄 SimplifiedDataManager: Force refresh triggered');
      await forceRefresh();
      setComponentKey(prev => prev + 1);
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    window.addEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
      window.removeEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    };
  }, [forceRefresh]);

  // Get fresh data every time, including when refreshTrigger changes
  const savedData = React.useMemo(() => {
    console.log('🔄 SimplifiedDataManager: Getting fresh data from persistence layer');
    return getProjectData();
  }, [getProjectData, componentKey, refreshTrigger]);

  const getTextContent = React.useCallback((key: string, fallback: string) => {
    // Check both direct key and prefixed key formats
    const directContent = savedData.textContent[key];
    const prefixedContent = savedData.textContent[`${key}_${projectId}`];
    
    const content = directContent || prefixedContent || fallback;
    console.log(`📖 Getting text content for ${key}:`, content.substring(0, 50) + '...');
    return content;
  }, [savedData.textContent, projectId]);

  // FIXED: Enhanced image replacement with detailed logging
  const getReplacedImageSrc = React.useCallback((originalSrc: string) => {
    const replacedSrc = getImageSrc(originalSrc);
    console.log('🖼️ SimplifiedDataManager: Image replacement check:');
    console.log('  Original:', originalSrc);
    console.log('  Replaced:', replacedSrc);
    console.log('  Has replacement:', replacedSrc !== originalSrc);
    
    return replacedSrc;
  }, [getImageSrc]);

  const updatedProject = React.useMemo(() => {
    console.log('🔄 SimplifiedDataManager: Updating project data with image replacements');
    const originalImageSrc = project.image;
    const updatedImageSrc = getReplacedImageSrc(originalImageSrc);
    
    console.log('🎯 Project image update:');
    console.log('  Original project image:', originalImageSrc);
    console.log('  Updated project image:', updatedImageSrc);
    
    const updatedProjectData = {
      ...project,
      title: getTextContent(`hero_title_${projectId}`, project.title),
      description: getTextContent(`hero_description_${projectId}`, project.description),
      image: updatedImageSrc
    };
    
    console.log('✅ Final updated project image:', updatedProjectData.image);
    return updatedProjectData;
  }, [project, projectId, getTextContent, getReplacedImageSrc]);

  const updatedDetails = React.useMemo(() => {
    console.log('🔄 SimplifiedDataManager: Updating details data');
    
    // FIXED: Properly handle challenge content with correct key format
    const challengeContentKey = `challenge_content_${projectId}`;
    const savedChallengeContent = savedData.textContent[challengeContentKey];
    
    console.log('🔍 Challenge content debug:', {
      key: challengeContentKey,
      saved: savedChallengeContent?.substring(0, 50) + '...',
      original: details.challenge?.substring(0, 50) + '...'
    });
    
    return {
      ...details,
      challenge: savedChallengeContent || details.challenge,
      process: getTextContent(`process_content_${projectId}`, details.process),
      result: getTextContent(`result_content_${projectId}`, details.result)
    };
  }, [details, projectId, getTextContent, savedData.textContent]);

  return {
    updatedProject,
    updatedDetails,
    getReplacedImageSrc,
    componentKey
  };
};
