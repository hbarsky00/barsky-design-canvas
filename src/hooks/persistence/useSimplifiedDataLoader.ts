
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
  const lastLoadTimeRef = useRef(0);

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
        
        // Update cached data and force component refresh
        setCachedData(processedData);
        setForceUpdate(prev => prev + 1);
        lastLoadTimeRef.current = Date.now();
        
        // Force all components to refresh with new data
        window.dispatchEvent(new CustomEvent('projectDataLoaded', {
          detail: { 
            projectId, 
            data: processedData,
            timestamp: Date.now()
          }
        }));
        
      } else {
        console.log('📭 No data found in database, keeping current state');
      }
    } catch (error) {
      console.error('❌ Error loading simplified data:', error);
    }
  }, [projectId]);

  // Load initial data and on project changes
  useEffect(() => {
    if (projectId && !initializedRef.current) {
      console.log('🚀 Initial data load for project:', projectId);
      loadDataFromDatabase();
      initializedRef.current = true;
    }
  }, [projectId, loadDataFromDatabase]);

  // Listen for page refresh and reload data
  useEffect(() => {
    const handlePageShow = () => {
      console.log('📄 Page shown, checking if data needs refresh');
      const timeSinceLastLoad = Date.now() - lastLoadTimeRef.current;
      // If more than 1 second since last load, refresh data
      if (timeSinceLastLoad > 1000) {
        console.log('🔄 Refreshing data after page navigation');
        loadDataFromDatabase();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ Page became visible, refreshing data');
        loadDataFromDatabase();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadDataFromDatabase]);

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
