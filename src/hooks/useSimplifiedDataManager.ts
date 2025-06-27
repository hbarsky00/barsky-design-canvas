
import React from 'react';
import { useSimplifiedProjectPersistence } from '@/hooks/useSimplifiedProjectPersistence';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';

export const useSimplifiedDataManager = (projectId: string, project: ProjectProps, details: ProjectDetails) => {
  const { getProjectData, forceRefresh, refreshTrigger, getImageSrc, getTextContent } = useSimplifiedProjectPersistence(projectId);
  
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

  // ENHANCED: Improved text content retrieval with comprehensive key checking
  const getEnhancedTextContent = React.useCallback((key: string, fallback: string) => {
    // Try multiple key formats to ensure we find saved content
    const possibleKeys = [
      key, // Direct key
      `${key}_${projectId}`, // Prefixed with project ID
      key.replace(`_${projectId}`, ''), // Remove project ID if present
    ];
    
    let foundContent = '';
    let usedKey = '';
    
    for (const testKey of possibleKeys) {
      const content = getTextContent(testKey, '');
      if (content && content.trim()) {
        foundContent = content;
        usedKey = testKey;
        break;
      }
    }
    
    const finalContent = foundContent || fallback;
    
    if (foundContent) {
      console.log(`📖 Found saved text content for ${key} using key: ${usedKey}`, finalContent.substring(0, 50) + '...');
    } else {
      console.log(`📖 No saved content found for ${key}, using fallback`);
    }
    
    return finalContent;
  }, [getTextContent, projectId]);

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
    console.log('🔄 SimplifiedDataManager: Updating project data with enhanced text retrieval');
    const originalImageSrc = project.image;
    const updatedImageSrc = getReplacedImageSrc(originalImageSrc);
    
    console.log('🎯 Project content update:');
    console.log('  Original project title:', project.title);
    console.log('  Original project description:', project.description.substring(0, 50) + '...');
    console.log('  Original project image:', originalImageSrc);
    console.log('  Updated project image:', updatedImageSrc);
    
    const updatedProjectData = {
      ...project,
      title: getEnhancedTextContent(`hero_title`, project.title),
      description: getEnhancedTextContent(`hero_description`, project.description),
      image: updatedImageSrc
    };
    
    console.log('✅ Final updated project data:');
    console.log('  Title:', updatedProjectData.title);
    console.log('  Description:', updatedProjectData.description.substring(0, 50) + '...');
    console.log('  Image:', updatedProjectData.image);
    
    return updatedProjectData;
  }, [project, getEnhancedTextContent, getReplacedImageSrc]);

  const updatedDetails = React.useMemo(() => {
    console.log('🔄 SimplifiedDataManager: Updating details data with enhanced text retrieval');
    
    console.log('🔍 Details content debug:');
    console.log('  Original challenge:', details.challenge?.substring(0, 50) + '...');
    console.log('  Original process:', details.process?.substring(0, 50) + '...');
    console.log('  Original result:', details.result?.substring(0, 50) + '...');
    
    const updatedDetailsData = {
      ...details,
      challenge: getEnhancedTextContent(`challenge_content`, details.challenge),
      process: getEnhancedTextContent(`process_content`, details.process),
      result: getEnhancedTextContent(`result_content`, details.result)
    };
    
    console.log('✅ Final updated details:');
    console.log('  Challenge:', updatedDetailsData.challenge?.substring(0, 50) + '...');
    console.log('  Process:', updatedDetailsData.process?.substring(0, 50) + '...');
    console.log('  Result:', updatedDetailsData.result?.substring(0, 50) + '...');
    
    return updatedDetailsData;
  }, [details, getEnhancedTextContent]);

  return {
    updatedProject,
    updatedDetails,
    getReplacedImageSrc,
    componentKey
  };
};
