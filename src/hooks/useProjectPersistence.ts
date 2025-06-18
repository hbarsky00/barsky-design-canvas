import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useDevModeDatabase } from './useDevModeDatabase';
import { useOptimizedSync } from './useOptimizedSync';
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
  
  const { getChanges, isLoading } = useDevModeDatabase(projectId);
  const { queueChange } = useOptimizedSync(projectId);

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

  // CRITICAL FIX: Load published data FIRST, then overlay dev changes
  useEffect(() => {
    if (!projectId) return;
    
    const loadData = async () => {
      try {
        console.log('🔄 useProjectPersistence: Loading data with PUBLISHED FIRST approach for project:', projectId);
        
        // Load published data FIRST as the base
        let publishedData = null;
        try {
          publishedData = await PublishingService.loadPublishedData(projectId);
          console.log('📦 Published data loaded as base:', {
            textCount: Object.keys(publishedData?.text_content || {}).length,
            imageCount: Object.keys(publishedData?.image_replacements || {}).length,
            contentCount: Object.keys(publishedData?.content_blocks || {}).length
          });
        } catch (error) {
          console.warn('⚠️ Could not load published data, using empty base:', error);
        }
        
        // Load dev changes as overlays on top of published data
        const devChanges = await getChanges();
        console.log('🔧 Dev mode overlays loaded:', {
          textCount: Object.keys(devChanges.textContent).length,
          imageCount: Object.keys(devChanges.imageReplacements).length,
          contentCount: Object.keys(devChanges.contentBlocks).length
        });
        
        // PUBLISHED DATA AS BASE, dev changes as overlay
        const finalData = {
          textContent: {
            ...(publishedData?.text_content || {}),
            ...devChanges.textContent  // Dev changes overlay on published
          },
          imageReplacements: normalizeImageReplacements({
            ...(publishedData?.image_replacements || {}),
            ...devChanges.imageReplacements  // Dev changes overlay on published
          }),
          contentBlocks: {
            ...(publishedData?.content_blocks || {}),
            ...devChanges.contentBlocks  // Dev changes overlay on published
          }
        };
        
        console.log('✅ Final data with published base + dev overlays:', {
          textKeys: Object.keys(finalData.textContent),
          imageKeys: Object.keys(finalData.imageReplacements),
          contentKeys: Object.keys(finalData.contentBlocks)
        });
        
        setCachedData(finalData);
        initializedRef.current = true;
      } catch (error) {
        console.error('❌ useProjectPersistence: Error loading data:', error);
      }
    };

    loadData();
  }, [projectId, getChanges, normalizeImageReplacements]);

  // Handle project updates with proper published/dev state management
  useEffect(() => {
    const handleProjectUpdate = async (e: CustomEvent) => {
      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 useProjectPersistence: Update detected:', e.detail);
        
        try {
          // If this is a publish event, reload published data first
          let publishedData = cachedData;
          if (e.detail?.published) {
            console.log('📤 This is a publish event - reloading published data');
            try {
              const freshPublished = await PublishingService.loadPublishedData(projectId);
              if (freshPublished) {
                publishedData = {
                  textContent: freshPublished.text_content || {},
                  imageReplacements: normalizeImageReplacements(freshPublished.image_replacements || {}),
                  contentBlocks: freshPublished.content_blocks || {}
                };
                console.log('✅ Fresh published data loaded:', {
                  images: Object.keys(publishedData.imageReplacements).length
                });
              }
            } catch (error) {
              console.warn('⚠️ Could not reload published data, keeping current');
            }
          }
          
          // Load current dev changes (may be empty after publish)
          const devChanges = await getChanges();
          console.log('🔧 Current dev changes after update:', {
            images: Object.keys(devChanges.imageReplacements).length
          });
          
          // Combine published base + dev overlays
          const updatedData = {
            textContent: {
              ...publishedData.textContent,
              ...devChanges.textContent
            },
            imageReplacements: normalizeImageReplacements({
              ...publishedData.imageReplacements,
              ...devChanges.imageReplacements
            }),
            contentBlocks: {
              ...publishedData.contentBlocks,
              ...devChanges.contentBlocks
            }
          };
          
          console.log('✅ Data updated - final image replacements:', Object.keys(updatedData.imageReplacements));
          setCachedData(updatedData);
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
  }, [projectId, getChanges, normalizeImageReplacements, cachedData]);

  const getProjectData = useCallback((): ProjectData => {
    return cachedData;
  }, [cachedData, forceUpdate]);

  // Optimized save functions using the queue system
  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 useProjectPersistence: Queuing text content:', key);
    queueChange('text', key, content);
    
    // Update cached data immediately for UI responsiveness
    setCachedData(prev => ({
      ...prev,
      textContent: { ...prev.textContent, [key]: content }
    }));
    setLastSaved(new Date());
    console.log('✅ Text content queued and cached');
  }, [queueChange]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('💾 useProjectPersistence: Queuing image replacement:', originalSrc.substring(0, 30) + '...', '->', newSrc.substring(0, 30) + '...');
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL replacement save');
      return;
    }
    
    queueChange('image', originalSrc, newSrc);
    
    // Update cached data immediately for UI responsiveness
    setCachedData(prev => ({
      ...prev,
      imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
    }));
    setLastSaved(new Date());
    console.log('✅ Image replacement queued and cached - total replacements:', Object.keys(cachedData.imageReplacements).length + 1);
  }, [queueChange, cachedData.imageReplacements]);

  const saveContentBlocks = useCallback(async (sectionKey: string, blocks: any[]) => {
    console.log('💾 useProjectPersistence: Queuing content blocks:', sectionKey);
    
    try {
      const validation = validateContentBlockSize(blocks);
      if (!validation.isValid) {
        console.error('❌ Content blocks validation failed:', validation.error);
        toast.error('Content too large', {
          description: validation.error
        });
        return;
      }
      
      queueChange('content_block', sectionKey, blocks);
      
      setCachedData(prev => ({
        ...prev,
        contentBlocks: { ...prev.contentBlocks, [sectionKey]: blocks }
      }));
      setLastSaved(new Date());
      console.log('✅ Content blocks queued successfully');
      toast.success('Content queued for sync');
    } catch (error) {
      console.error('❌ useProjectPersistence: Error queuing content blocks:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to queue content blocks';
      toast.error('Queue failed', {
        description: errorMessage
      });
    }
  }, [queueChange]);

  const getTextContent = useCallback((key: string, fallback: string = '') => {
    return cachedData.textContent[key] || fallback;
  }, [cachedData.textContent]);

  const getImageSrc = useCallback((originalSrc: string) => {
    const replacement = cachedData.imageReplacements[originalSrc];
    console.log('🖼️ getImageSrc:', originalSrc.substring(0, 30) + '...', replacement ? '-> ' + replacement.substring(0, 30) + '...' : '(no replacement)');
    return replacement || originalSrc;
  }, [cachedData.imageReplacements]);

  const clearProjectData = useCallback(() => {
    setCachedData({
      textContent: {},
      imageReplacements: {},
      contentBlocks: {}
    });
    setLastSaved(null);
    console.log('🗑️ useProjectPersistence: Cleared project data');
  }, []);

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
