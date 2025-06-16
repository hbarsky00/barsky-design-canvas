
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
  const { saveChange, getChanges, isLoading } = useDevModeDatabase(projectId);

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
    const handleProjectUpdate = (e: CustomEvent) => {
      if (e.detail?.projectId === projectId && e.detail?.published) {
        console.log('Published data updated, forcing refresh');
        setForceUpdate(prev => prev + 1);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, [projectId]);

  const getProjectData = useCallback((): ProjectData => {
    try {
      // Return empty data structure - all data now comes from database
      const mergedData = {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {},
        lastSaved: undefined
      };
      
      console.log('Loaded project data for', projectId, '- all data now managed via database');
      return mergedData;
    } catch (error) {
      console.error('Failed to load project data:', error);
      return {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {},
      };
    }
  }, [projectId, forceUpdate]);

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
    // Text content is now managed via database and EditableText component
    console.log('Getting text content for key:', key, 'fallback:', fallback);
    return fallback;
  }, []);

  const getImageSrc = useCallback((originalSrc: string) => {
    // Image replacements are now managed via database and useImageState hook
    console.log('Getting image src for:', originalSrc);
    return originalSrc;
  }, []);

  const clearProjectData = useCallback(() => {
    // Data is now cleared via database operations in sync hook
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
    isSaving: isLoading,
    lastSaved
  };
};
