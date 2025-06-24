
import { useCallback, useState, useEffect } from 'react';
import { ProjectData } from './persistence/types';
import { saveChangeToDatabase } from './database/operations';
import { fetchChangesFromDatabase } from './database/operations';
import { processChangesData } from './database/dataProcessor';

export const useProjectPersistence = (projectId: string) => {
  const [cachedData, setCachedData] = useState<ProjectData>({
    textContent: {},
    imageReplacements: {},
    imageCaptions: {},
    contentBlocks: {}
  });
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
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

  // Listen for project data updates and force refresh from database
  useEffect(() => {
    const handleProjectDataUpdate = async (e: CustomEvent) => {
      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 Project data updated event received, reloading from database');
        await loadFreshDataFromDatabase();
        setRefreshTrigger(prev => prev + 1);
      }
    };

    const handleForceRefresh = async (e: CustomEvent) => {
      console.log('🔄 Force refresh triggered, reloading from database');
      await loadFreshDataFromDatabase();
      setRefreshTrigger(prev => prev + 1);
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
    window.addEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
      window.removeEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    };
  }, [projectId, loadFreshDataFromDatabase]);

  const getProjectData = useCallback((): ProjectData => {
    return cachedData;
  }, [cachedData]);

  const getTextContent = useCallback((key: string, fallback: string = '') => {
    return cachedData.textContent[key] || fallback;
  }, [cachedData.textContent]);

  const getImageSrc = useCallback((originalSrc: string) => {
    return cachedData.imageReplacements[originalSrc] || originalSrc;
  }, [cachedData.imageReplacements]);

  const getImageCaption = useCallback((imageSrc: string, fallback: string = '') => {
    return cachedData.imageCaptions[imageSrc] || fallback;
  }, [cachedData.imageCaptions]);

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 SaveOperations: Saving text content:', key);
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'text', key, content);
      
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        textContent: { ...prev.textContent, [key]: content }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Text content saved successfully');
      
      // Trigger global update event for real-time sync
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          textUpdate: { key, content },
          immediate: true,
          stayOnPage: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving text content:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('💾 SaveOperations: Saving image replacement:', originalSrc.substring(0, 30) + '...', '->', newSrc.substring(0, 30) + '...');
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL replacement save');
      return;
    }
    
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'image', originalSrc, newSrc);
      
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Image replacement saved successfully');
      
      // Trigger global update event for real-time sync
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          imageReplacement: { originalSrc, newSrc },
          immediate: true,
          stayOnPage: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving image replacement:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId]);

  const saveImageCaption = useCallback(async (imageSrc: string, caption: string) => {
    console.log('💾 SaveOperations: Saving image caption:', imageSrc.substring(0, 30) + '...', caption.substring(0, 50) + '...');
    
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'image_caption', imageSrc, caption);
      
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        imageCaptions: { ...prev.imageCaptions, [imageSrc]: caption }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Image caption saved successfully');
      
      // Trigger global update event for real-time sync
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          imageCaptionUpdate: { imageSrc, caption },
          immediate: true,
          stayOnPage: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving image caption:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId]);

  const saveContentBlocks = useCallback(async (sectionKey: string, blocks: any[]) => {
    console.log('💾 SaveOperations: Saving content blocks:', sectionKey);
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'content_block', sectionKey, blocks);
      
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        contentBlocks: { ...prev.contentBlocks, [sectionKey]: blocks }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Content blocks saved successfully');
      
      // Trigger global update event for real-time sync
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          contentBlocks: { sectionKey, blocks },
          immediate: true,
          stayOnPage: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving content blocks:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId]);

  const clearProjectData = useCallback(() => {
    setCachedData({
      textContent: {},
      imageReplacements: {},
      imageCaptions: {},
      contentBlocks: {}
    });
    console.log('🗑️ Cleared project data');
  }, []);

  const forceRefresh = useCallback(async () => {
    console.log('🔄 Force refreshing data from database');
    await loadFreshDataFromDatabase();
  }, [loadFreshDataFromDatabase]);

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
