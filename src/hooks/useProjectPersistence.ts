import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useDevModeDatabase } from './useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';
import { validateContentBlockSize } from './database/contentBlockValidation';

interface ProjectData {
  textContent: Record<string, string>;
  imageReplacements: Record<string, string>;
  contentBlocks: Record<string, any[]>;
  lastSaved?: string;
}

export const useProjectPersistence = (projectId: string) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [forceUpdate, setForceUpdate] = useState(0);
  const initializedRef = useRef(false);
  const [cachedData, setCachedData] = useState<ProjectData>(() => ({
    textContent: {},
    imageReplacements: {},
    contentBlocks: {}
  }));
  
  const { saveChange, getChanges, isLoading } = useDevModeDatabase(projectId);

  // Load both dev mode and published data with priority to DEV MODE for better editing experience
  useEffect(() => {
    if (!projectId) return;
    
    const loadData = async () => {
      try {
        console.log('🔄 useProjectPersistence: Loading comprehensive data for project:', projectId);
        
        // Load both dev mode changes and published data
        const [devChanges, publishedData] = await Promise.all([
          getChanges(),
          PublishingService.loadPublishedData(projectId)
        ]);
        
        // FIXED: Prioritize DEV MODE changes over published data for better editing experience
        const mergedTextContent = {
          ...(publishedData?.text_content || {}), // Published as base
          ...devChanges.textContent // Dev changes take precedence
        };
        
        const mergedImageReplacements = {
          ...normalizeImageReplacements(publishedData?.image_replacements || {}), // Published as base
          ...normalizeImageReplacements(devChanges.imageReplacements) // Dev changes take precedence
        };
        
        const mergedContentBlocks = {
          ...(publishedData?.content_blocks || {}), // Published as base
          ...devChanges.contentBlocks // Dev changes take precedence
        };
        
        const newCachedData = {
          textContent: mergedTextContent,
          imageReplacements: mergedImageReplacements,
          contentBlocks: mergedContentBlocks
        };
        
        console.log('📦 useProjectPersistence: Loaded comprehensive merged data with DEV PRIORITY:', {
          devText: Object.keys(devChanges.textContent).length,
          publishedText: Object.keys(publishedData?.text_content || {}).length,
          totalText: Object.keys(mergedTextContent).length,
          devImages: Object.keys(devChanges.imageReplacements).length,
          publishedImages: Object.keys(publishedData?.image_replacements || {}).length,
          totalImages: Object.keys(mergedImageReplacements).length,
          prioritySource: 'dev-mode-first'
        });
        
        setCachedData(newCachedData);
        initializedRef.current = true;
      } catch (error) {
        console.error('❌ useProjectPersistence: Error loading data:', error);
      }
    };

    loadData();
  }, [projectId, getChanges]);

  const normalizeImageReplacements = useCallback((imageReplacements: any): Record<string, string> => {
    const normalized: Record<string, string> = {};
    
    Object.entries(imageReplacements || {}).forEach(([key, value]) => {
      if (typeof key === 'string' && value) {
        const stringValue = typeof value === 'string' ? value : null;
            
        if (stringValue && typeof stringValue === 'string') {
          if (!key.startsWith('blob:') && !stringValue.startsWith('blob:') && 
              (stringValue.startsWith('data:') || stringValue.startsWith('/') || stringValue.startsWith('http'))) {
            normalized[key] = stringValue;
          }
        }
      }
    });
    
    return normalized;
  }, []);

  // Handle project updates with improved dev mode priority
  useEffect(() => {
    const handleProjectUpdate = async (e: CustomEvent) => {
      if (e.detail?.projectId === projectId || e.detail?.immediate || e.detail?.allChangesApplied) {
        console.log('🔄 useProjectPersistence: Project data updated, reloading with dev priority:', e.detail);
        
        try {
          // For published updates, still use published data as primary
          if (e.detail?.published || e.detail?.allChangesApplied) {
            console.log('🚀 useProjectPersistence: Published update detected, using published data');
            const publishedData = await PublishingService.loadPublishedData(projectId);
            
            if (publishedData) {
              const newCachedData = {
                textContent: publishedData.text_content || {},
                imageReplacements: normalizeImageReplacements(publishedData.image_replacements || {}),
                contentBlocks: publishedData.content_blocks || {}
              };
              
              setCachedData(newCachedData);
              setForceUpdate(prev => prev + 1);
              return;
            }
          }
          
          // For dev mode updates, prioritize dev changes
          const changes = await getChanges();
          const publishedData = await PublishingService.loadPublishedData(projectId);
          
          // FIXED: Dev changes take priority for immediate display
          const mergedData = {
            textContent: {
              ...(publishedData?.text_content || {}),
              ...changes.textContent // Dev takes precedence
            },
            imageReplacements: normalizeImageReplacements({
              ...(publishedData?.image_replacements || {}),
              ...changes.imageReplacements // Dev takes precedence
            }),
            contentBlocks: {
              ...(publishedData?.content_blocks || {}),
              ...changes.contentBlocks // Dev takes precedence
            }
          };
          
          console.log('🔄 useProjectPersistence: Updated with dev mode priority:', {
            textChanges: Object.keys(changes.textContent).length,
            imageChanges: Object.keys(changes.imageReplacements).length,
            contentChanges: Object.keys(changes.contentBlocks).length
          });
          setCachedData(mergedData);
          setForceUpdate(prev => prev + 1);
        } catch (error) {
          console.error('❌ useProjectPersistence: Error reloading data:', error);
        }
      }
    };

    const handleForceRefresh = (e: CustomEvent) => {
      console.log('🔄 useProjectPersistence: Force refresh triggered:', e.detail);
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    window.addEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
      window.removeEventListener('forceComponentRefresh', handleForceRefresh as EventListener);
    };
  }, [projectId, getChanges, normalizeImageReplacements]);

  const getProjectData = useCallback((): ProjectData => {
    console.log('📋 useProjectPersistence: getProjectData called, returning cached data with', {
      textKeys: Object.keys(cachedData.textContent).length,
      imageKeys: Object.keys(cachedData.imageReplacements).length,
      contentKeys: Object.keys(cachedData.contentBlocks).length,
      forceUpdateCount: forceUpdate
    });
    return cachedData;
  }, [cachedData, forceUpdate]);

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 useProjectPersistence: Saving text content to database:', key, content);
    const success = await saveChange('text', key, content);
    if (success) {
      // Update cached data immediately for instant feedback
      setCachedData(prev => ({
        ...prev,
        textContent: { ...prev.textContent, [key]: content }
      }));
      setLastSaved(new Date());
      
      console.log('✅ useProjectPersistence: Text content saved successfully and cache updated');
    } else {
      console.error('❌ useProjectPersistence: Failed to save text content');
    }
  }, [saveChange]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('💾 useProjectPersistence: Saving image replacement to database:', originalSrc, '->', newSrc);
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL replacement save:', originalSrc, '->', newSrc);
      return;
    }
    
    if (!newSrc.startsWith('data:') && !newSrc.startsWith('/') && !newSrc.startsWith('http')) {
      console.log('⚠️ Skipping invalid URL replacement save:', originalSrc, '->', newSrc);
      return;
    }
    
    const success = await saveChange('image', originalSrc, newSrc);
    if (success) {
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
      }));
      setLastSaved(new Date());
      
      console.log('✅ useProjectPersistence: Image replacement saved successfully');
    } else {
      console.error('❌ useProjectPersistence: Failed to save image replacement');
    }
  }, [saveChange]);

  const saveContentBlocks = useCallback(async (sectionKey: string, blocks: any[]) => {
    console.log('💾 useProjectPersistence: Saving content blocks to database:', sectionKey, blocks);
    
    try {
      // Validate content blocks before saving
      const validation = validateContentBlockSize(blocks);
      if (!validation.isValid) {
        console.error('❌ Content blocks validation failed:', validation.error);
        toast.error('Content too large', {
          description: validation.error
        });
        return;
      }
      
      const success = await saveChange('content_block', sectionKey, blocks);
      if (success) {
        // Update cached data immediately
        setCachedData(prev => ({
          ...prev,
          contentBlocks: { ...prev.contentBlocks, [sectionKey]: blocks }
        }));
        setLastSaved(new Date());
        
        console.log('✅ useProjectPersistence: Content blocks saved successfully');
        toast.success('Content saved successfully');
      } else {
        console.error('❌ useProjectPersistence: Failed to save content blocks');
        toast.error('Failed to save content');
      }
    } catch (error) {
      console.error('❌ useProjectPersistence: Error saving content blocks:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save content blocks';
      toast.error('Save failed', {
        description: errorMessage
      });
    }
  }, [saveChange]);

  const getTextContent = useCallback((key: string, fallback: string = '') => {
    const text = cachedData.textContent[key] || fallback;
    console.log('📖 useProjectPersistence: getTextContent for key:', key, 'returning:', text);
    return text;
  }, [cachedData.textContent]);

  const getImageSrc = useCallback((originalSrc: string) => {
    const replacementSrc = cachedData.imageReplacements[originalSrc] || originalSrc;
    console.log('🖼️ useProjectPersistence: getImageSrc for:', originalSrc, 'returning:', replacementSrc);
    return replacementSrc;
  }, [cachedData.imageReplacements]);

  const clearProjectData = useCallback(() => {
    setCachedData({
      textContent: {},
      imageReplacements: {},
      contentBlocks: {}
    });
    setLastSaved(null);
    console.log('🗑️ useProjectPersistence: Cleared project data for', projectId);
  }, [projectId]);

  return {
    saveTextContent,
    saveImageReplacement,
    saveContentBlocks,
    getProjectData,
    getTextContent,
    getImageSrc,
    clearProjectData,
    isSaving: isLoading,
    lastSaved
  };
};
