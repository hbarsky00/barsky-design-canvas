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

  // Load dev mode changes FIRST, then merge with published data as fallback
  useEffect(() => {
    if (!projectId) return;
    
    const loadData = async () => {
      try {
        console.log('🔄 useProjectPersistence: Loading data with DEV MODE PRIORITY for project:', projectId);
        
        // Load dev mode changes FIRST
        const devChanges = await getChanges();
        console.log('📦 Dev mode changes loaded:', {
          textCount: Object.keys(devChanges.textContent).length,
          imageCount: Object.keys(devChanges.imageReplacements).length,
          contentCount: Object.keys(devChanges.contentBlocks).length
        });
        
        // Load published data as fallback only
        const publishedData = await PublishingService.loadPublishedData(projectId);
        console.log('📖 Published data loaded as fallback');
        
        // DEV MODE TAKES ABSOLUTE PRIORITY - published data only fills gaps
        const finalData = {
          textContent: {
            ...(publishedData?.text_content || {}), // Fallback
            ...devChanges.textContent // DEV PRIORITY
          },
          imageReplacements: normalizeImageReplacements({
            ...(publishedData?.image_replacements || {}), // Fallback
            ...devChanges.imageReplacements // DEV PRIORITY
          }),
          contentBlocks: {
            ...(publishedData?.content_blocks || {}), // Fallback
            ...devChanges.contentBlocks // DEV PRIORITY
          }
        };
        
        console.log('✅ Final merged data with DEV PRIORITY:', {
          totalText: Object.keys(finalData.textContent).length,
          totalImages: Object.keys(finalData.imageReplacements).length,
          totalContent: Object.keys(finalData.contentBlocks).length
        });
        
        setCachedData(finalData);
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

  // Handle project updates - ALWAYS prioritize dev mode
  useEffect(() => {
    const handleProjectUpdate = async (e: CustomEvent) => {
      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 useProjectPersistence: Project update detected, reloading DEV FIRST:', e.detail);
        
        try {
          // For any update, reload dev mode changes first
          const devChanges = await getChanges();
          
          // Only load published if this is specifically a published update
          let publishedData = null;
          if (e.detail?.published || e.detail?.allChangesApplied) {
            publishedData = await PublishingService.loadPublishedData(projectId);
          }
          
          // Always prioritize dev mode changes
          const updatedData = {
            textContent: {
              ...(publishedData?.text_content || cachedData.textContent),
              ...devChanges.textContent // DEV ALWAYS WINS
            },
            imageReplacements: normalizeImageReplacements({
              ...(publishedData?.image_replacements || cachedData.imageReplacements),
              ...devChanges.imageReplacements // DEV ALWAYS WINS
            }),
            contentBlocks: {
              ...(publishedData?.content_blocks || cachedData.contentBlocks),
              ...devChanges.contentBlocks // DEV ALWAYS WINS
            }
          };
          
          console.log('✅ Updated data with DEV PRIORITY maintained:', {
            devTextCount: Object.keys(devChanges.textContent).length,
            devImageCount: Object.keys(devChanges.imageReplacements).length
          });
          
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
    console.log('📋 useProjectPersistence: getProjectData returning cached data with DEV PRIORITY');
    return cachedData;
  }, [cachedData, forceUpdate]);

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 useProjectPersistence: Saving text content:', key);
    const success = await saveChange('text', key, content);
    if (success) {
      // Update cached data immediately for instant feedback
      setCachedData(prev => ({
        ...prev,
        textContent: { ...prev.textContent, [key]: content }
      }));
      setLastSaved(new Date());
      console.log('✅ Text content saved and cached');
    }
  }, [saveChange]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('💾 useProjectPersistence: Saving image replacement:', originalSrc, '->', newSrc);
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL replacement save');
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
      console.log('✅ Image replacement saved and cached');
    }
  }, [saveChange]);

  const saveContentBlocks = useCallback(async (sectionKey: string, blocks: any[]) => {
    console.log('💾 useProjectPersistence: Saving content blocks:', sectionKey);
    
    try {
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
        setCachedData(prev => ({
          ...prev,
          contentBlocks: { ...prev.contentBlocks, [sectionKey]: blocks }
        }));
        setLastSaved(new Date());
        console.log('✅ Content blocks saved successfully');
        toast.success('Content saved successfully');
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
    return text;
  }, [cachedData.textContent]);

  const getImageSrc = useCallback((originalSrc: string) => {
    const replacementSrc = cachedData.imageReplacements[originalSrc] || originalSrc;
    return replacementSrc;
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
