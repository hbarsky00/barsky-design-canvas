
import { useSimplifiedDataLoader } from './persistence/useSimplifiedDataLoader';
import { useSimplifiedSaveOperations } from './persistence/useSimplifiedSaveOperations';
import { useSimplifiedProjectUpdates } from './persistence/useSimplifiedProjectUpdates';

export const useSimplifiedProjectPersistence = (projectId: string) => {
  const {
    cachedData,
    updateCachedData,
    loadDataFromDatabase
  } = useSimplifiedDataLoader(projectId);

  const {
    saveTextContent,
    saveImageReplacement,
    saveImageCaption,
    isSaving,
    lastSaved
  } = useSimplifiedSaveOperations(projectId, updateCachedData);

  useSimplifiedProjectUpdates(projectId, updateCachedData, loadDataFromDatabase);

  // Enhanced getter for image captions that checks multiple sources
  const getImageCaption = (imageSrc: string): string => {
    // Check database captions first (with img_caption_ prefix)
    const captionKey = `img_caption_${imageSrc}`;
    const dbCaption = cachedData.textContent[captionKey];
    if (dbCaption) {
      console.log('📖 Found caption in database:', captionKey, dbCaption);
      return dbCaption;
    }

    // Check direct caption storage
    const directCaption = cachedData.imageCaptions[imageSrc];
    if (directCaption) {
      console.log('📖 Found direct caption:', imageSrc, directCaption);
      return directCaption;
    }

    // Check localStorage as fallback
    try {
      const imageCaptionStorageKey = `image_captions_${projectId}`;
      const localCaptions = JSON.parse(localStorage.getItem(imageCaptionStorageKey) || '{}');
      const localCaption = localCaptions[imageSrc];
      if (localCaption) {
        console.log('📖 Found caption in localStorage:', imageSrc, localCaption);
        return localCaption;
      }
    } catch (error) {
      console.warn('⚠️ Error reading captions from localStorage:', error);
    }

    console.log('📖 No caption found for:', imageSrc);
    return '';
  };

  const getTextContent = (key: string, fallback: string = ''): string => {
    return cachedData.textContent[key] || fallback;
  };

  const getImageSrc = (originalSrc: string): string => {
    return cachedData.imageReplacements[originalSrc] || originalSrc;
  };

  return {
    saveTextContent,
    saveImageReplacement,
    saveImageCaption,
    getTextContent,
    getImageSrc,
    getImageCaption,
    isSaving,
    lastSaved,
    cachedData
  };
};
