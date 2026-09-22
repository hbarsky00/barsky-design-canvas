
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
  const loadingRef = useRef(false);

  const loadDataFromDatabase = useCallback(async () => {
    if (!projectId || loadingRef.current) return;
    
    loadingRef.current = true;
    
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
        setForceUpdate(prev => prev + 1);
        
      } else {
        console.log('📭 No data found in database, keeping current state');
      }
    } catch (error) {
      console.error('❌ Error loading simplified data:', error);
    } finally {
      loadingRef.current = false;
    }
  }, [projectId]);

  // Load initial data only once
  useEffect(() => {
    if (projectId && !initializedRef.current) {
      console.log('🚀 Initial data load for project:', projectId);
      loadDataFromDatabase();
      initializedRef.current = true;
    }
  }, [projectId, loadDataFromDatabase]);

  // FIXED: Listen for project updates and reload data when needed
  useEffect(() => {
    const handleProjectUpdate = async (e: CustomEvent) => {
      if (e.detail?.projectId === projectId) {
        console.log('🔄 SimplifiedDataLoader: Project update detected, reloading data');
        // Add a small delay to avoid flickering
        setTimeout(() => {
          loadDataFromDatabase();
        }, 100);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
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
