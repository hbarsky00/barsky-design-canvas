
import { useState, useCallback, useEffect } from 'react';

interface ProjectData {
  textContent: Record<string, string>;
  imageReplacements: Record<string, string>;
  contentBlocks: Record<string, any[]>;
  lastSaved?: string;
}

export const useProjectPersistence = (projectId: string) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const getStorageKey = useCallback((key: string) => {
    return `project_${projectId}_${key}`;
  }, [projectId]);

  const getProjectData = useCallback((): ProjectData => {
    try {
      const stored = localStorage.getItem(getStorageKey('data'));
      const data = stored ? JSON.parse(stored) : {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {},
      };
      
      // Clean up invalid blob URLs from imageReplacements
      const cleanedImageReplacements: Record<string, string> = {};
      Object.entries(data.imageReplacements || {}).forEach(([key, value]) => {
        // Only keep replacements where both key and value are valid URLs
        if (typeof key === 'string' && typeof value === 'string') {
          // Filter out any blob URLs or invalid URLs
          if (!key.startsWith('blob:') && !value.startsWith('blob:') && 
              (value.startsWith('/') || value.startsWith('http'))) {
            cleanedImageReplacements[key] = value;
          } else {
            console.log('Removing invalid URL mapping:', key, '->', value);
          }
        }
      });
      
      const cleanedData = {
        ...data,
        imageReplacements: cleanedImageReplacements
      };
      
      console.log('Loaded project data for', projectId, cleanedData);
      return cleanedData;
    } catch (error) {
      console.error('Failed to load project data:', error);
      return {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {},
      };
    }
  }, [projectId, getStorageKey]);

  const saveProjectData = useCallback((data: ProjectData) => {
    try {
      setIsSaving(true);
      const dataToSave = {
        ...data,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem(getStorageKey('data'), JSON.stringify(dataToSave));
      setLastSaved(new Date());
      console.log('Saved project data for', projectId, dataToSave);
      
      // Dispatch event to notify other components of the change
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { projectId, data: dataToSave }
      }));
    } catch (error) {
      console.error('Failed to save project data:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, getStorageKey]);

  const saveTextContent = useCallback((key: string, content: string) => {
    const currentData = getProjectData();
    const updatedData = {
      ...currentData,
      textContent: {
        ...currentData.textContent,
        [key]: content
      }
    };
    saveProjectData(updatedData);
  }, [getProjectData, saveProjectData]);

  const saveImageReplacement = useCallback((originalSrc: string, newSrc: string) => {
    // Don't save blob URL replacements or invalid URLs
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:') ||
        (!newSrc.startsWith('/') && !newSrc.startsWith('http'))) {
      console.log('Skipping invalid URL replacement save:', originalSrc, '->', newSrc);
      return;
    }
    
    const currentData = getProjectData();
    const updatedData = {
      ...currentData,
      imageReplacements: {
        ...currentData.imageReplacements,
        [originalSrc]: newSrc
      }
    };
    saveProjectData(updatedData);
    console.log('Saved image replacement:', originalSrc, '->', newSrc);
  }, [getProjectData, saveProjectData]);

  const saveContentBlocks = useCallback((sectionKey: string, blocks: any[]) => {
    const currentData = getProjectData();
    const updatedData = {
      ...currentData,
      contentBlocks: {
        ...currentData.contentBlocks,
        [sectionKey]: blocks
      }
    };
    saveProjectData(updatedData);
  }, [getProjectData, saveProjectData]);

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
      console.log('Using replacement image:', originalSrc, '->', finalSrc);
    }
    
    return finalSrc;
  }, [getProjectData]);

  const clearProjectData = useCallback(() => {
    try {
      localStorage.removeItem(getStorageKey('data'));
      setLastSaved(null);
      console.log('Cleared project data for', projectId);
    } catch (error) {
      console.error('Failed to clear project data:', error);
    }
  }, [projectId, getStorageKey]);

  // Load last saved timestamp on mount
  useEffect(() => {
    const data = getProjectData();
    if (data.lastSaved) {
      setLastSaved(new Date(data.lastSaved));
    }
  }, [getProjectData]);

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
