
import { useCallback } from 'react';
import { ProjectData } from './types';

export const useProjectUtilities = (
  setCachedData: (updater: (prev: ProjectData) => ProjectData) => void,
  loadFreshDataFromDatabase: () => Promise<void>
) => {
  const clearProjectData = useCallback(() => {
    setCachedData({
      textContent: {},
      imageReplacements: {},
      imageCaptions: {},
      contentBlocks: {}
    });
    console.log('🗑️ Cleared project data');
  }, [setCachedData]);

  const forceRefresh = useCallback(async () => {
    console.log('🔄 Force refreshing data from database');
    await loadFreshDataFromDatabase();
  }, [loadFreshDataFromDatabase]);

  return {
    clearProjectData,
    forceRefresh
  };
};
