
import React from 'react';
import { useSimplifiedProjectPersistence } from '@/hooks/useSimplifiedProjectPersistence';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';

export const useSimplifiedDataManager = (projectId: string, project: ProjectProps, details: ProjectDetails) => {
  const { getProjectData, getImageSrc, getTextContent, refreshTrigger } = useSimplifiedProjectPersistence(projectId);
  
  // FIXED: Get fresh data every time refreshTrigger changes
  const savedData = React.useMemo(() => {
    console.log('🔄 useSimplifiedDataManager: Getting fresh data, refreshTrigger:', refreshTrigger);
    return getProjectData();
  }, [getProjectData, refreshTrigger]);

  // Enhanced text content retrieval with multiple key checking
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
      const content = savedData.textContent[testKey] || '';
      if (content && content.trim()) {
        foundContent = content;
        usedKey = testKey;
        break;
      }
    }
    
    const finalContent = foundContent || fallback;
    
    if (foundContent) {
      console.log(`📖 Found saved text content for ${key} using key: ${usedKey}`, finalContent.substring(0, 50) + '...');
    }
    
    return finalContent;
  }, [savedData.textContent, projectId]);

  // Image replacement with logging
  const getReplacedImageSrc = React.useCallback((originalSrc: string) => {
    const replacedSrc = getImageSrc(originalSrc);
    return replacedSrc;
  }, [getImageSrc]);

  const updatedProject = React.useMemo(() => {
    const originalImageSrc = project.image;
    const updatedImageSrc = getReplacedImageSrc(originalImageSrc);
    
    return {
      ...project,
      title: getEnhancedTextContent(`hero_title`, project.title),
      description: getEnhancedTextContent(`hero_description`, project.description),
      image: updatedImageSrc
    };
  }, [project, getEnhancedTextContent, getReplacedImageSrc, refreshTrigger]);

  const updatedDetails = React.useMemo(() => {
    return {
      ...details,
      challenge: getEnhancedTextContent(`challenge_content`, details.challenge),
      process: getEnhancedTextContent(`process_content`, details.process),
      result: getEnhancedTextContent(`result_content`, details.result)
    };
  }, [details, getEnhancedTextContent, refreshTrigger]);

  return {
    updatedProject,
    updatedDetails,
    getReplacedImageSrc,
    componentKey: refreshTrigger // Use refreshTrigger as component key to force re-renders when data changes
  };
};
