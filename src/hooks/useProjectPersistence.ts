
import { useCallback, useState, useEffect } from 'react';
import { ProjectData } from './persistence/types';
import { saveChangeToDatabase } from './database/operations';
import { fetchChangesFromDatabase } from './database/operations';
import { processChangesData } from './database/dataProcessor';

export const useProjectPersistence = (projectId: string) => {
  const [cachedData, setCachedData] = useState<ProjectData>({
    textContent: {},
    imageReplacements: {},
    contentBlocks: {}
  });
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const rawChanges = await fetchChangesFromDatabase(projectId);
        if (rawChanges && rawChanges.length > 0) {
          const processedData = processChangesData(rawChanges);
          setCachedData(processedData);
        }
      } catch (error) {
        console.error('Error loading project data:', error);
      }
    };

    if (projectId) {
      loadData();
    }
  }, [projectId]);

  const getProjectData = useCallback((): ProjectData => {
    return cachedData;
  }, [cachedData]);

  const getTextContent = useCallback((key: string, fallback: string = '') => {
    return cachedData.textContent[key] || fallback;
  }, [cachedData.textContent]);

  const getImageSrc = useCallback((originalSrc: string) => {
    return cachedData.imageReplacements[originalSrc] || originalSrc;
  }, [cachedData.imageReplacements]);

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('SaveOperations: Saving text content:', key);
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'text', key, content);
      
      // Update cached data
      setCachedData(prev => ({
        ...prev,
        textContent: { ...prev.textContent, [key]: content }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Text content saved successfully');
    } catch (error) {
      console.error('❌ Error saving text content:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('SaveOperations: Saving image replacement:', originalSrc.substring(0, 30) + '...', '->', newSrc.substring(0, 30) + '...');
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL replacement save');
      return;
    }
    
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'image', originalSrc, newSrc);
      
      // Update cached data
      setCachedData(prev => ({
        ...prev,
        imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Image replacement saved successfully');
      
      // Trigger a global update event
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          imageReplacement: { originalSrc, newSrc },
          immediate: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving image replacement:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId]);

  const saveContentBlocks = useCallback(async (sectionKey: string, blocks: any[]) => {
    console.log('SaveOperations: Saving content blocks:', sectionKey);
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'content_block', sectionKey, blocks);
      
      // Update cached data
      setCachedData(prev => ({
        ...prev,
        contentBlocks: { ...prev.contentBlocks, [sectionKey]: blocks }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Content blocks saved successfully');
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
      contentBlocks: {}
    });
    console.log('Cleared project data');
  }, []);

  return {
    saveTextContent,
    saveImageReplacement,
    saveContentBlocks,
    getProjectData,
    getTextContent,
    getImageSrc,
    clearProjectData,
    isSaving,
    lastSaved
  };
};
