import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

interface ProjectData {
  textContent: Record<string, string>;
  imageReplacements: Record<string, string>;
  contentBlocks: Record<string, any[]>;
  lastSaved?: string;
}

export const useProjectPersistence = (projectId: string) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  const getStorageKey = useCallback((key: string) => {
    return `project_${projectId}_${key}`;
  }, [projectId]);

  const safeSetItem = useCallback((key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn(`Storage quota exceeded for ${key}, data may be truncated`);
        
        // Try to save a simplified version without large images
        try {
          const data = JSON.parse(value);
          if (data.imageReplacements) {
            // Filter out data URLs that are too large
            const filteredImages: Record<string, string> = {};
            Object.entries(data.imageReplacements).forEach(([k, v]) => {
              if (typeof v === 'string' && !v.startsWith('data:')) {
                filteredImages[k] = v;
              }
            });
            data.imageReplacements = filteredImages;
            
            const simplifiedValue = JSON.stringify(data);
            localStorage.setItem(key, simplifiedValue);
            return true;
          }
        } catch (simplifyError) {
          console.error('Failed to simplify data:', simplifyError);
        }
      }
      console.error('Storage error:', error);
      return false;
    }
  }, []);

  const normalizeImageReplacements = useCallback((imageReplacements: any): Record<string, string> => {
    const normalized: Record<string, string> = {};
    
    Object.entries(imageReplacements || {}).forEach(([key, value]) => {
      if (typeof key === 'string' && value) {
        // Handle both object format {_type: "String", value: "..."} and direct string values
        const stringValue = typeof value === 'object' && value !== null && 
          '_type' in value && (value as any)._type === 'String' && 'value' in value
          ? (value as { _type: string; value: string }).value 
          : typeof value === 'string' 
            ? value 
            : null;
            
        if (stringValue && typeof stringValue === 'string') {
          // Keep data URLs and regular URLs, filter out blob URLs
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
    
    // Also listen for manual refresh events
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
      
      // Load dev mode changes
      const stored = localStorage.getItem(getStorageKey('data'));
      const devData = stored ? JSON.parse(stored) : {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {},
      };
      
      // Merge with published taking precedence
      const mergedData = {
        textContent: { ...devData.textContent, ...publishedOverrides.textContent },
        imageReplacements: { 
          ...normalizeImageReplacements(devData.imageReplacements), 
          ...publishedOverrides.imageReplacements 
        },
        contentBlocks: { ...devData.contentBlocks, ...publishedOverrides.contentBlocks },
        lastSaved: devData.lastSaved
      };
      
      console.log('Loaded merged project data for', projectId, 'with published overrides:', mergedData);
      return mergedData;
    } catch (error) {
      console.error('Failed to load project data:', error);
      return {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {},
      };
    }
  }, [projectId, getStorageKey, normalizeImageReplacements, loadPublishedOverrides, forceUpdate]);

  const saveProjectData = useCallback((data: ProjectData) => {
    try {
      setIsSaving(true);
      
      // Normalize image replacements before saving
      const normalizedData = {
        ...data,
        imageReplacements: normalizeImageReplacements(data.imageReplacements),
        lastSaved: new Date().toISOString()
      };
      
      const success = safeSetItem(getStorageKey('data'), JSON.stringify(normalizedData));
      
      if (success) {
        setLastSaved(new Date());
        console.log('Saved project data for', projectId, normalizedData);
        
        // Dispatch event to notify other components of the change
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { projectId, data: normalizedData }
        }));
      } else {
        console.warn('Failed to save project data due to storage limitations');
        toast.error("Storage limit reached", {
          description: "Unable to save changes due to browser storage limitations. Try publishing your changes to free up space."
        });
      }
    } catch (error) {
      console.error('Failed to save project data:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, getStorageKey, normalizeImageReplacements, safeSetItem]);

  const saveTextContent = useCallback((key: string, content: string) => {
    console.log('Saving text content:', key, content);
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
    console.log('Saving image replacement:', originalSrc, '->', newSrc);
    
    // Accept data URLs (base64 encoded images) and regular URLs, reject blob URLs
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('Skipping blob URL replacement save:', originalSrc, '->', newSrc);
      return;
    }
    
    if (!newSrc.startsWith('data:') && !newSrc.startsWith('/') && !newSrc.startsWith('http')) {
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
    console.log('Saved image replacement:', originalSrc, '->', newSrc.substring(0, 50) + '...');
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
      console.log('Using replacement image:', originalSrc, '->', finalSrc.substring(0, 50) + '...');
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
