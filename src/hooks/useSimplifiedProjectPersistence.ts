
import { useCallback, useState, useEffect, useRef } from 'react';
import { ProjectData } from './persistence/types';
import { saveChangeToDatabase } from './database/operations';
import { fetchChangesFromDatabase } from './database/operations';
import { processChangesData } from './database/dataProcessor';
import { toast } from 'sonner';

export const useSimplifiedProjectPersistence = (projectId: string) => {
  const [cachedData, setCachedData] = useState<ProjectData>({
    textContent: {},
    imageReplacements: {},
    imageCaptions: {},
    contentBlocks: {}
  });
  const [isSaving, setIsSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const isInitializedRef = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

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

  // Save text content with immediate UI update and proper error handling
  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 Saving text content:', key, content.substring(0, 50) + '...');
    
    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Immediate UI update
    setCachedData(prev => ({
      ...prev,
      textContent: { ...prev.textContent, [key]: content }
    }));
    
    // Force refresh
    setRefreshKey(prev => prev + 1);
    
    // Show saving toast for captions
    if (key.startsWith('img_caption_')) {
      toast.loading('Saving caption...', { id: `save-${key}` });
    } else {
      toast.loading('Saving changes...', { id: `save-${key}` });
    }
    
    // Debounced save to database
    saveTimeoutRef.current = setTimeout(async () => {
      setIsSaving(true);
      try {
        await saveChangeToDatabase(projectId, 'text', key, content);
        console.log('✅ Text saved to database successfully');
        
        if (key.startsWith('img_caption_')) {
          toast.success('Caption saved!', { id: `save-${key}` });
        } else {
          toast.success('Changes saved!', { id: `save-${key}` });
        }
        
        // Dispatch global update event
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId,
            textUpdate: { key, content },
            immediate: true,
            timestamp: Date.now()
          }
        }));
      } catch (error) {
        console.error('❌ Error saving text content:', error);
        
        if (key.startsWith('img_caption_')) {
          toast.error('Failed to save caption', { id: `save-${key}` });
        } else {
          toast.error('Failed to save changes', { id: `save-${key}` });
        }
        
        // Revert UI change on error
        setCachedData(prev => {
          const newTextContent = { ...prev.textContent };
          delete newTextContent[key];
          return { ...prev, textContent: newTextContent };
        });
      } finally {
        setIsSaving(false);
      }
    }, 1000); // 1 second debounce
  }, [projectId]);

  // Save image replacement with immediate UI update and proper error handling
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
    
    // Show saving toast
    toast.loading('Saving image...', { id: `save-img-${originalSrc}` });
    
    setIsSaving(true);
    try {
      await saveChangeToDatabase(projectId, 'image', originalSrc, newSrc);
      console.log('✅ Image saved to database successfully');
      toast.success('Image saved!', { id: `save-img-${originalSrc}` });
      
      // Dispatch global update event
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
      toast.error('Failed to save image', { id: `save-img-${originalSrc}` });
      
      // Revert UI change on error
      setCachedData(prev => {
        const newImageReplacements = { ...prev.imageReplacements };
        delete newImageReplacements[originalSrc];
        return { ...prev, imageReplacements: newImageReplacements };
      });
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

  // Get image caption with img_caption_ prefix support
  const getImageCaption = useCallback((imageSrc: string, fallback: string = '') => {
    // Try with img_caption_ prefix first (new system)
    const captionKey = `img_caption_${imageSrc}`;
    const caption = cachedData.textContent[captionKey] || cachedData.imageCaptions[imageSrc] || fallback;
    return caption;
  }, [cachedData.textContent, cachedData.imageCaptions]);

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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    saveTextContent,
    saveImageReplacement,
    getProjectData,
    getTextContent,
    getImageSrc,
    getImageCaption,
    forceRefresh,
    isSaving,
    refreshTrigger: refreshKey,
    cachedData
  };
};
