
import { useProjectDataLoader } from './persistence/useProjectDataLoader';
import { useProjectEventHandlers } from './persistence/useProjectEventHandlers';
import { useProjectGetters } from './persistence/useProjectGetters';
import { useProjectSaveOperations } from './persistence/useProjectSaveOperations';
import { useProjectUtilities } from './persistence/useProjectUtilities';

export const useProjectPersistence = (projectId: string) => {
  const {
    cachedData,
    setCachedData,
    loadFreshDataFromDatabase,
    refreshTrigger,
    setRefreshTrigger
  } = useProjectDataLoader(projectId);

  const {
    saveTextContent,
    saveImageReplacement,
    saveImageCaption,
    saveContentBlocks,
    isSaving,
    lastSaved
  } = useProjectSaveOperations(projectId, setCachedData);

  const {
    getProjectData,
    getTextContent,
    getImageSrc,
    getImageCaption
  } = useProjectGetters(cachedData);

  const {
    clearProjectData,
    forceRefresh
  } = useProjectUtilities(setCachedData, loadFreshDataFromDatabase);

  useProjectEventHandlers(projectId, loadFreshDataFromDatabase, setRefreshTrigger);

  return {
    saveTextContent,
    saveImageReplacement,
    saveImageCaption,
    saveContentBlocks,
    getProjectData,
    getTextContent,
    getImageSrc,
    getImageCaption,
    clearProjectData,
    forceRefresh,
    isSaving,
    lastSaved,
    refreshTrigger
  };
};
