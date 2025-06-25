
import { useSimplifiedDataLoader } from './persistence/useSimplifiedDataLoader';
import { useSimplifiedSaveOperations } from './persistence/useSimplifiedSaveOperations';
import { useSimplifiedGetters } from './persistence/useSimplifiedGetters';
import { useSimplifiedProjectUpdates } from './persistence/useSimplifiedProjectUpdates';
import { SimplifiedProjectPersistenceHooks } from './persistence/simplifiedTypes';

export const useSimplifiedProjectPersistence = (projectId: string): SimplifiedProjectPersistenceHooks => {
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

  const {
    getTextContent,
    getImageSrc,
    getImageCaption
  } = useSimplifiedGetters(cachedData);

  useSimplifiedProjectUpdates(projectId, updateCachedData, loadDataFromDatabase);

  return {
    saveTextContent,
    saveImageReplacement,
    saveImageCaption,
    getTextContent,
    getImageSrc,
    getImageCaption,
    isSaving,
    lastSaved
  };
};
