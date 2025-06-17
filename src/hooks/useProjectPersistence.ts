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

  // Load both dev mode and published data with priority to published
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
        
        // Prioritize published data over dev mode for images (published is more stable)
        const mergedImageReplacements = {
          ...normalizeImageReplacements(devChanges.imageReplacements),
          ...(publishedData?.image_replacements || {}) // Published takes precedence
        };
        
        // For text content, published data also takes precedence
        const mergedTextContent = {
          ...devChanges.textContent,
          ...(publishedData?.text_content || {}) // Published takes precedence
        };
        
        // For content blocks, merge with published taking precedence
        const mergedContentBlocks = {
          ...devChanges.contentBlocks,
          ...(publishedData?.content_blocks || {}) // Published takes precedence
        };
        
        const newCachedData = {
          textContent: mergedTextContent,
          imageReplacements: mergedImageReplacements,
          contentBlocks: mergedContentBlocks
        };
        
        console.log('📦 useProjectPersistence: Loaded comprehensive merged data:', {
          devImages: Object.keys(devChanges.imageReplacements).length,
          publishedImages: Object.keys(publishedData?.image_replacements || {}).length,
          totalImages: Object.keys(mergedImageReplacements).length,
          devText: Object.keys(devChanges.textContent).length,
          publishedText: Object.keys(publishedData?.text_content || {}).length,
          totalText: Object.keys(mergedTextContent).length,
          prioritySource: 'published-first'
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

  // Handle project updates with comprehensive refresh handling
  useEffect(() => {
    const handleProjectUpdate = async (e: CustomEvent) => {
      if (e.detail?.projectId === projectId || e.detail?.immediate || e.detail?.allChangesApplied) {
        console.log('🔄 useProjectPersistence: Comprehensive project data updated, reloading:', e.detail);
        
        try {
          // If this is a published update, prioritize published data completely
          if (e.detail?.published || e.detail?.allChangesApplied) {
            console.log('🚀 useProjectPersistence: Published/comprehensive update detected, loading published data with priority');
            const publishedData = await PublishingService.loadPublishedData(projectId);
            
            if (publishedData) {
              // For published updates, use published data as the primary source
              const newCachedData = {
                textContent: publishedData.text_content || {},
                imageReplacements: normalizeImageReplacements(publishedData.image_replacements || {}),
                contentBlocks: publishedData.content_blocks || {}
              };
              
              console.log('📄 useProjectPersistence: Using published data as primary source:', {
                images: Object.keys(newCachedData.imageReplacements).length,
                texts: Object.keys(newCachedData.textContent).length,
                contentBlocks: Object.keys(newCachedData.contentBlocks).length
              });
              
              setCachedData(newCachedData);
              setForceUpdate(prev => prev + 1);
              return;
            }
          }
          
          // Regular dev mode update - merge with published as base
          const changes = await getChanges();
          const publishedData = await PublishingService.loadPublishedData(projectId);
          
          // Merge with published data as base
          const mergedData = {
            textContent: {
              ...(publishedData?.text_content || {}),
              ...changes.textContent
            },
            imageReplacements: normalizeImageReplacements({
              ...(publishedData?.image_replacements || {}),
              ...changes.imageReplacements
            }),
            contentBlocks: {
              ...(publishedData?.content_blocks || {}),
              ...changes.contentBlocks
            }
          };
          
          console.log('🔄 useProjectPersistence: Updated with dev mode changes on published base');
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
  }, [cachedData, forceUpdate]); // Include forceUpdate to ensure fresh data

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 useProjectPersistence: Saving text content to database:', key, content);
    const success = await saveChange('text', key, content);
    if (success) {
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        textContent: { ...prev.textContent, [key]: content }
      }));
      setLastSaved(new Date());
      
      console.log('✅ useProjectPersistence: Text content saved successfully');
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
