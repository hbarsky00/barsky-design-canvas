
import { useCallback, useState, useEffect, useRef } from 'react';
import { ProjectData } from './persistence/types';
import { saveChangeToDatabase } from './database/operations';
import { fetchChangesFromDatabase } from './database/operations';
import { processChangesData } from './database/dataProcessor';

export const useSimplifiedProjectPersistence = (projectId: string) => {
  const [cachedData, setCachedData] = useState<ProjectData>({
    textContent: {},
    imageReplacements: {},
    contentBlocks: {}
  });
  const [isSaving, setIsSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const isInitializedRef = useRef(false);

  console.log('🔧 SimplifiedProjectPersistence: Hook initialized for project:', projectId);

  // Load initial data from database once
  useEffect(() => {
    if (!projectId || isInitializedRef.current) return;
    
    const loadInitialData = async () => {
      console.log('📥 Loading initial data from database for:', projectId);
      try {
        const rawChanges = await fetchChangesFromDatabase(projectId);
        if (rawChanges && rawChanges.length > 0) {
          const processedData = processChangesData(rawChanges);
          console.log('✅ Initial data loaded successfully:', {
            textKeys: Object.keys(processedData.textContent),
            imageKeys: Object.keys(processedData.imageReplacements)
          });
          setCachedData(processedData);
        } else {
          console.log('📭 No initial changes found in database');
        }
        isInitializedRef.current = true;
      } catch (error) {
        console.error('❌ Error loading initial data:', error);
        isInitializedRef.current = true;
      }
    };

    loadInitialData();
  }, [projectId]);

  // Save text content with immediate UI update
  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 Saving text content:', key, content.substring(0, 50) + '...');
    
    // Immediate UI update
    setCachedData(prev => ({
      ...prev,
      textContent: { ...prev.textContent, [key]: content }
    }));
    
    // Force refresh
    setRefreshKey(prev => prev + 1);
    
    setIsSaving(true);
    try {
      await saveChangeToDatabase(projectId, 'text', key, content);
      console.log('✅ Text saved to database successfully');
    } catch (error) {
      console.error('❌ Error saving text content:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [projectId]);

  // Save image replacement with immediate UI update
  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('🖼️ Saving image replacement:', originalSrc.substring(0, 30), '->', newSrc.substring(0, 30));
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL save');
      return;
    }
    
    // Immediate UI update
    setCachedData(prev => ({
      ...prev,
      imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
    }));
    
    // Force refresh
    setRefreshKey(prev => prev + 1);
    
    setIsSaving(true);
    try {
      await saveChangeToDatabase(projectId, 'image', originalSrc, newSrc);
      console.log('✅ Image saved to database successfully');
    } catch (error) {
      console.error('❌ Error saving image replacement:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [projectId]);

  // Get current project data
  const getProjectData = useCallback((): ProjectData => {
    return cachedData;
  }, [cachedData]);

  // Get text content with fallback
  const getTextContent = useCallback((key: string, fallback: string = '') => {
    const content = cachedData.textContent[key] || fallback;
    return content;
  }, [cachedData.textContent]);

  // Get image with replacement
  const getImageSrc = useCallback((originalSrc: string) => {
    const replacedSrc = cachedData.imageReplacements[originalSrc] || originalSrc;
    return replacedSrc;
  }, [cachedData.imageReplacements]);

  // Force refresh from database
  const forceRefresh = useCallback(async () => {
    console.log('🔄 Force refresh triggered');
    try {
      const rawChanges = await fetchChangesFromDatabase(projectId);
      if (rawChanges && rawChanges.length > 0) {
        const processedData = processChangesData(rawChanges);
        setCachedData(processedData);
        setRefreshKey(prev => prev + 1);
      }
    } catch (error) {
      console.error('❌ Error during force refresh:', error);
    }
  }, [projectId]);

  return {
    saveTextContent,
    saveImageReplacement,
    getProjectData,
    getTextContent,
    getImageSrc,
    forceRefresh,
    isSaving,
    refreshTrigger: refreshKey,
    cachedData
  };
};
