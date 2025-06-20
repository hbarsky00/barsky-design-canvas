
import { useCallback, useState, useEffect } from 'react';
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
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  console.log('🔧 SimplifiedProjectPersistence: Hook initialized for project:', projectId);

  // Load fresh data from database
  const loadDataFromDatabase = useCallback(async () => {
    if (!projectId) return;
    
    console.log('📥 Loading fresh data from database for:', projectId);
    try {
      const rawChanges = await fetchChangesFromDatabase(projectId);
      if (rawChanges && rawChanges.length > 0) {
        const processedData = processChangesData(rawChanges);
        console.log('✅ Fresh data loaded successfully:', {
          textKeys: Object.keys(processedData.textContent),
          imageKeys: Object.keys(processedData.imageReplacements),
          contentKeys: Object.keys(processedData.contentBlocks)
        });
        setCachedData(processedData);
        setRefreshTrigger(prev => prev + 1);
      } else {
        console.log('📭 No changes found in database');
      }
    } catch (error) {
      console.error('❌ Error loading data from database:', error);
    }
  }, [projectId]);

  // Initial data load
  useEffect(() => {
    loadDataFromDatabase();
  }, [loadDataFromDatabase]);

  // Save text content with immediate feedback
  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 Saving text content:', key, content.substring(0, 50) + '...');
    setIsSaving(true);
    
    try {
      // Save to database first
      await saveChangeToDatabase(projectId, 'text', key, content);
      console.log('✅ Text saved to database successfully');
      
      // Update local cache immediately
      setCachedData(prev => ({
        ...prev,
        textContent: { ...prev.textContent, [key]: content }
      }));
      
      // Force refresh and trigger events
      setRefreshTrigger(prev => prev + 1);
      
      // Dispatch update event for real-time sync
      setTimeout(() => {
        console.log('📡 Dispatching update event for text save');
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId,
            textUpdate: { key, content },
            immediate: true,
            timestamp: Date.now()
          }
        }));
      }, 100);
      
    } catch (error) {
      console.error('❌ Error saving text content:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [projectId]);

  // Save image replacement with immediate feedback
  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('🖼️ Saving image replacement:', originalSrc.substring(0, 30), '->', newSrc.substring(0, 30));
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL save');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Save to database first
      await saveChangeToDatabase(projectId, 'image', originalSrc, newSrc);
      console.log('✅ Image saved to database successfully');
      
      // Update local cache immediately
      setCachedData(prev => ({
        ...prev,
        imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
      }));
      
      // Force refresh and trigger events
      setRefreshTrigger(prev => prev + 1);
      
      // Dispatch update event for real-time sync
      setTimeout(() => {
        console.log('📡 Dispatching update event for image save');
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId,
            imageReplacement: { originalSrc, newSrc },
            immediate: true,
            timestamp: Date.now()
          }
        }));
      }, 100);
      
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
    console.log(`📖 Getting text content for ${key}:`, content.substring(0, 50) + '...');
    return content;
  }, [cachedData.textContent]);

  // Get image with replacement
  const getImageSrc = useCallback((originalSrc: string) => {
    const replacedSrc = cachedData.imageReplacements[originalSrc] || originalSrc;
    if (replacedSrc !== originalSrc) {
      console.log(`🖼️ Image replacement found: ${originalSrc.substring(0, 30)}... -> ${replacedSrc.substring(0, 30)}...`);
    }
    return replacedSrc;
  }, [cachedData.imageReplacements]);

  // Force refresh from database
  const forceRefresh = useCallback(async () => {
    console.log('🔄 Force refresh triggered');
    await loadDataFromDatabase();
  }, [loadDataFromDatabase]);

  return {
    saveTextContent,
    saveImageReplacement,
    getProjectData,
    getTextContent,
    getImageSrc,
    forceRefresh,
    isSaving,
    refreshTrigger,
    cachedData
  };
};
