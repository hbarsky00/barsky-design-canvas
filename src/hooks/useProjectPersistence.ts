
import { useState, useCallback, useEffect } from 'react';
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
  const { saveChange, getChanges, isSaving } = useDevModeDatabase(projectId);

  const getStorageKey = useCallback((key: string) => {
    return `project_${projectId}_${key}`;
  }, [projectId]);

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
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes(`imageOverrides_${projectId}`) || 
          e.key?.includes(`textOverrides_${projectId}`) || 
          e.key?.includes(`contentBlockOverrides_${projectId}`)) {
        console.log('Published overrides changed, forcing refresh');
        setForceUpdate(prev => prev + 1);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    const handleProjectUpdate = (e: CustomEvent) => {
      if (e.detail?.projectId === projectId && e.detail?.published) {
        console.log('Published data updated, forcing refresh');
        setForceUpdate(prev => prev + 1);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, [projectId]);

  const loadPublishedOverrides = useCallback((): ProjectData => {
    const publishedImages = localStorage.getItem(`imageOverrides_${projectId}`);
    const publishedText = localStorage.getItem(`textOverrides_${projectId}`);
    const publishedBlocks = localStorage.getItem(`contentBlockOverrides_${projectId}`);

    const overrides: ProjectData = {
      textContent: {},
      imageReplacements: {},
      contentBlocks: {},
    };

    try {
      if (publishedImages) {
        const parsed = JSON.parse(publishedImages);
        overrides.imageReplacements = normalizeImageReplacements(parsed);
        console.log('Loaded published image overrides:', overrides.imageReplacements);
      }
      if (publishedText) {
        overrides.textContent = JSON.parse(publishedText);
        console.log('Loaded published text overrides:', overrides.textContent);
      }
      if (publishedBlocks) {
        overrides.contentBlocks = JSON.parse(publishedBlocks);
        console.log('Loaded published content block overrides:', overrides.contentBlocks);
      }
    } catch (error) {
      console.error('Error loading published overrides:', error);
    }

    return overrides;
  }, [projectId, normalizeImageReplacements]);

  const getProjectData = useCallback((): ProjectData => {
    try {
      // Always prioritize published overrides
      const publishedOverrides = loadPublishedOverrides();
      
      // For dev changes, we'll fetch them from database when needed
      // For now, return published overrides as the main data
      const mergedData = {
        textContent: { ...publishedOverrides.textContent },
        imageReplacements: { ...publishedOverrides.imageReplacements },
        contentBlocks: { ...publishedOverrides.contentBlocks },
        lastSaved: undefined
      };
      
      console.log('Loaded project data for', projectId, 'with published overrides:', mergedData);
      return mergedData;
    } catch (error) {
      console.error('Failed to load project data:', error);
      return {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {},
      };
    }
  }, [projectId, loadPublishedOverrides, forceUpdate]);

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 Saving text content to database:', key, content);
    const success = await saveChange('text', key, content);
    if (success) {
      setLastSaved(new Date());
      
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { projectId, textChanged: true }
      }));
    }
  }, [saveChange, projectId]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('💾 Saving image replacement to database:', originalSrc, '->', newSrc);
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('Skipping blob URL replacement save:', originalSrc, '->', newSrc);
      return;
    }
    
    if (!newSrc.startsWith('data:') && !newSrc.startsWith('/') && !newSrc.startsWith('http')) {
      console.log('Skipping invalid URL replacement save:', originalSrc, '->', newSrc);
      return;
    }
    
    const success = await saveChange('image', originalSrc, newSrc);
    if (success) {
      setLastSaved(new Date());
      
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { projectId, imageReplaced: true }
      }));
    }
  }, [saveChange, projectId]);

  const saveContentBlocks = useCallback(async (sectionKey: string, blocks: any[]) => {
    console.log('💾 Saving content blocks to database:', sectionKey, blocks);
    const success = await saveChange('content_block', sectionKey, blocks);
    if (success) {
      setLastSaved(new Date());
      
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { projectId, contentBlocksChanged: true }
      }));
    }
  }, [saveChange, projectId]);

  const getTextContent = useCallback((key: string, fallback: string = '') => {
    const data = getProjectData();
    const value = data.textContent[key] || fallback;
    console.log('Getting text content for key:', key, 'value:', value);
    return value;
  }, [getProjectData]);

  const getImageSrc = useCallback((originalSrc: string) => {
    const data = getProjectData();
    const replacementSrc = data.imageReplacements[originalSrc];
    const finalSrc = replacementSrc || originalSrc;
    
    if (replacementSrc) {
      console.log('Using replacement image:', originalSrc, '->', finalSrc.substring(0, 50) + '...');
    }
    
    return finalSrc;
  }, [getProjectData]);

  const clearProjectData = useCallback(() => {
    // For dev mode data, we'll clear from database in the sync hook
    setLastSaved(null);
    console.log('Cleared project data for', projectId);
  }, [projectId]);

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
