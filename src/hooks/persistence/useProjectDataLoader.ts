
import { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectData } from './types';
import { fetchChangesFromDatabase } from '../database/operations';
import { processChangesData } from '../database/dataProcessor';

export const useProjectDataLoader = (projectId: string) => {
  const [cachedData, setCachedData] = useState<ProjectData>(() => ({
    textContent: {},
    imageReplacements: {},
    imageCaptions: {},
    contentBlocks: {}
  }));
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Enhanced data loader that refreshes from database with strict project isolation
  const loadFreshDataFromDatabase = useCallback(async () => {
    if (!projectId) {
      console.warn('⚠️ No projectId provided, skipping data load');
      return;
    }

    console.log('🔄 Loading fresh data from database for project:', projectId);
    try {
      // CRITICAL: Only fetch changes for THIS specific project
      const rawChanges = await fetchChangesFromDatabase(projectId);
      
      if (rawChanges && rawChanges.length > 0) {
        // Validate that all changes belong to this project
        const validChanges = rawChanges.filter(change => change.project_id === projectId);
        if (validChanges.length !== rawChanges.length) {
          console.warn('⚠️ Filtered out changes that don\'t belong to project:', projectId);
        }
        
        const processedData = processChangesData(validChanges);
        console.log('✅ Fresh data loaded for project:', projectId, {
          textKeys: Object.keys(processedData.textContent),
          imageKeys: Object.keys(processedData.imageReplacements),
          contentKeys: Object.keys(processedData.contentBlocks)
        });
        setCachedData(processedData);
      } else {
        console.log('📭 No data found in database for project:', projectId);
        // Reset to empty state for this project
        setCachedData({
          textContent: {},
          imageReplacements: {},
          imageCaptions: {},
          contentBlocks: {}
        });
      }
    } catch (error) {
      console.error('❌ Error loading fresh data for project:', projectId, error);
    }
  }, [projectId]);

  // Load initial data when projectId changes
  useEffect(() => {
    if (projectId) {
      console.log('🔄 Project ID changed, loading data for:', projectId);
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
