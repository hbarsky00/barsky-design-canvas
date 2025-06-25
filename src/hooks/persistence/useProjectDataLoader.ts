
import { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectData } from './types';
import { fetchChangesFromDatabase } from '../database/operations';
import { processChangesData } from '../database/dataProcessor';

export const useProjectDataLoader = (projectId: string) => {
  const [cachedData, setCachedData] = useState<ProjectData>({
    textContent: {},
    imageReplacements: {},
    imageCaptions: {},
    contentBlocks: {}
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Enhanced data loader that refreshes from database
  const loadFreshDataFromDatabase = useCallback(async () => {
    console.log('🔄 Loading fresh data from database for project:', projectId);
    try {
      const rawChanges = await fetchChangesFromDatabase(projectId);
      if (rawChanges && rawChanges.length > 0) {
        const processedData = processChangesData(rawChanges);
        console.log('✅ Fresh data loaded:', {
          textKeys: Object.keys(processedData.textContent),
          imageKeys: Object.keys(processedData.imageReplacements),
          contentKeys: Object.keys(processedData.contentBlocks)
        });
        setCachedData(processedData);
      } else {
        console.log('📭 No data found in database, keeping current state');
      }
    } catch (error) {
      console.error('❌ Error loading fresh data:', error);
    }
  }, [projectId]);

  // Load initial data
  useEffect(() => {
    if (projectId) {
      loadFreshDataFromDatabase();
    }
  }, [projectId, loadFreshDataFromDatabase]);

  return {
    cachedData,
    setCachedData,
    loadFreshDataFromDatabase,
    refreshTrigger,
    setRefreshTrigger
  };
};
