
import { useCallback } from 'react';
import { ProjectData } from './persistence/types';

export const useProjectPersistence = (projectId: string) => {
  const getProjectData = useCallback((): ProjectData => {
    return {
      textContent: {},
      imageReplacements: {},
      contentBlocks: {}
    };
  }, []);

  const getTextContent = useCallback((key: string, fallback: string = '') => {
    return fallback;
  }, []);

  const getImageSrc = useCallback((originalSrc: string) => {
    return originalSrc;
  }, []);

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('SaveOperations: Saving text content:', key);
  }, []);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('SaveOperations: Saving image replacement:', originalSrc);
  }, []);

  const saveContentBlocks = useCallback(async (sectionKey: string, blocks: any[]) => {
    console.log('SaveOperations: Saving content blocks:', sectionKey);
  }, []);

  const clearProjectData = useCallback(() => {
    console.log('Cleared project data');
  }, []);

  return {
    saveTextContent,
    saveImageReplacement,
    saveContentBlocks,
    getProjectData,
    getTextContent,
    getImageSrc,
    clearProjectData,
    isSaving: false,
    lastSaved: null
  };
};
