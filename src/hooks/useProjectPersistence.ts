
import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useDevModeDatabase } from './useDevModeDatabase';

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

  // Load data from database on mount and when projectId changes
  useEffect(() => {
    if (!projectId) return;
    
    const loadData = async () => {
      try {
        console.log('🔄 useProjectPersistence: Loading data for project:', projectId);
        const changes = await getChanges();
        
        const newCachedData = {
          textContent: changes.textContent,
          imageReplacements: normalizeImageReplacements(changes.imageReplacements),
          contentBlocks: changes.contentBlocks
        };
        
        console.log('📦 useProjectPersistence: Loaded data:', newCachedData);
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

  // Force refresh when published overrides change
  useEffect(() => {
    const handleProjectUpdate = async (e: CustomEvent) => {
      if (e.detail?.projectId === projectId || e.detail?.immediate) {
        console.log('🔄 useProjectPersistence: Project data updated, reloading from database');
        try {
          const changes = await getChanges();
          setCachedData({
            textContent: changes.textContent,
            imageReplacements: normalizeImageReplacements(changes.imageReplacements),
            contentBlocks: changes.contentBlocks
          });
          setForceUpdate(prev => prev + 1);
        } catch (error) {
          console.error('❌ useProjectPersistence: Error reloading data:', error);
        }
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, [projectId, getChanges, normalizeImageReplacements]);

  const getProjectData = useCallback((): ProjectData => {
    console.log('📋 useProjectPersistence: getProjectData called, returning cached data:', cachedData);
    return cachedData;
  }, [cachedData]);

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
    const success = await saveChange('content_block', sectionKey, blocks);
    if (success) {
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        contentBlocks: { ...prev.contentBlocks, [sectionKey]: blocks }
      }));
      setLastSaved(new Date());
      
      console.log('✅ useProjectPersistence: Content blocks saved successfully');
    } else {
      console.error('❌ useProjectPersistence: Failed to save content blocks');
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
