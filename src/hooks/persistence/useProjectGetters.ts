
import { useCallback } from 'react';
import { ProjectData } from './types';

export const useProjectGetters = (cachedData: ProjectData) => {
  const getProjectData = useCallback((): ProjectData => {
    return cachedData;
  }, [cachedData]);

  const getTextContent = useCallback((key: string, fallback: string = '') => {
    return cachedData.textContent[key] || fallback;
  }, [cachedData.textContent]);

  const getImageSrc = useCallback((originalSrc: string) => {
    return cachedData.imageReplacements[originalSrc] || originalSrc;
  }, [cachedData.imageReplacements]);

  const getImageCaption = useCallback((imageSrc: string, fallback: string = '') => {
    return cachedData.imageCaptions[imageSrc] || fallback;
  }, [cachedData.imageCaptions]);

  return {
    getProjectData,
    getTextContent,
    getImageSrc,
    getImageCaption
  };
};
