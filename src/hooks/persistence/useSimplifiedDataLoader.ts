
import { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectData } from './types';
import { fetchChangesFromDatabase } from '../database/operations';
import { processChangesData } from '../database/dataProcessor';

export const useSimplifiedDataLoader = (projectId: string) => {
  const [cachedData, setCachedData] = useState<ProjectData>(() => ({
    textContent: {},
    imageReplacements: {},
    imageCaptions: {},
    contentBlocks: {}
  }));
  const [forceUpdate, setForceUpdate] = useState(0);
  const initializedRef = useRef(false);

  const loadDataFromDatabase = useCallback(async () => {
    if (!projectId) return;
    
    try {
      console.log('🔄 SimplifiedDataLoader: Loading data for project:', projectId);
      
      const rawChanges = await fetchChangesFromDatabase(projectId);
      if (rawChanges && rawChanges.length > 0) {
        const processedData = processChangesData(rawChanges);
        console.log('✅ Simplified data loaded:', {
          textKeys: Object.keys(processedData.textContent),
          imageKeys: Object.keys(processedData.imageReplacements),
          captionKeys: Object.keys(processedData.imageCaptions)
        });
        setCachedData(processedData);
      } else {
        console.log('📭 No data found in database, keeping current state');
      }
    } catch (error) {
      console.error('❌ Error loading simplified data:', error);
    }
  }, [projectId]);

  // Load initial data
  useEffect(() => {
    if (projectId && !initializedRef.current) {
      loadDataFromDatabase();
      initializedRef.current = true;
    }
  }, [projectId, loadDataFromDatabase]);

  const updateCachedData = useCallback((updater: (prev: ProjectData) => ProjectData) => {
    setCachedData(updater);
    setForceUpdate(prev => prev + 1);
  }, []);

  return {
    cachedData,
    setCachedData,
    updateCachedData,
    loadDataFromDatabase,
    forceUpdate
  };
};
