
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface ProjectData {
  textContent: Record<string, string>;
  imageReplacements: Record<string, string>;
  contentBlocks: Record<string, any[]>;
  lastSaved: string;
}

export const useProjectPersistence = (projectId: string) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const getStorageKey = (key: string) => `project_${projectId}_${key}`;

  const saveProjectData = useCallback(async (data: Partial<ProjectData>) => {
    if (!projectId) {
      console.warn('No projectId provided for saving data');
      return;
    }

    setIsSaving(true);
    try {
      const currentData = getProjectData();
      const updatedData = {
        ...currentData,
        ...data,
        lastSaved: new Date().toISOString()
      };

      // Save each data type separately for better organization
      if (data.textContent) {
        const mergedTextContent = {
          ...currentData.textContent,
          ...data.textContent
        };
        localStorage.setItem(getStorageKey('textContent'), JSON.stringify(mergedTextContent));
        console.log('Saved text content:', mergedTextContent);
      }
      if (data.imageReplacements) {
        const mergedImageReplacements = {
          ...currentData.imageReplacements,
          ...data.imageReplacements
        };
        localStorage.setItem(getStorageKey('imageReplacements'), JSON.stringify(mergedImageReplacements));
        console.log('Saved image replacements:', mergedImageReplacements);
      }
      if (data.contentBlocks) {
        const mergedContentBlocks = {
          ...currentData.contentBlocks,
          ...data.contentBlocks
        };
        localStorage.setItem(getStorageKey('contentBlocks'), JSON.stringify(mergedContentBlocks));
        console.log('Saved content blocks:', mergedContentBlocks);
      }

      localStorage.setItem(getStorageKey('lastSaved'), updatedData.lastSaved);
      
      setLastSaved(new Date());
      toast.success("Changes saved successfully!", {
        description: "Your edits have been preserved and will persist across page refreshes.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to save project data:', error);
      toast.error("Failed to save changes", {
        description: "There was an error saving your edits. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  }, [projectId]);

  const getProjectData = useCallback((): ProjectData => {
    if (!projectId) {
      console.warn('No projectId provided for loading data');
      return {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {},
        lastSaved: ''
      };
    }

    try {
      const textContent = JSON.parse(localStorage.getItem(getStorageKey('textContent')) || '{}');
      const imageReplacements = JSON.parse(localStorage.getItem(getStorageKey('imageReplacements')) || '{}');
      const contentBlocks = JSON.parse(localStorage.getItem(getStorageKey('contentBlocks')) || '{}');
      const lastSaved = localStorage.getItem(getStorageKey('lastSaved')) || '';

      console.log('Loaded project data for', projectId, {
        textContent,
        imageReplacements,
        contentBlocks,
        lastSaved
      });

      return {
        textContent,
        imageReplacements,
        contentBlocks,
        lastSaved
      };
    } catch (error) {
      console.error('Failed to load project data:', error);
      return {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {},
        lastSaved: ''
      };
    }
  }, [projectId]);

  const saveTextContent = useCallback((key: string, value: string) => {
    console.log('Saving text content with key:', key, 'value:', value);
    const currentData = getProjectData();
    const updatedTextContent = {
      ...currentData.textContent,
      [key]: value
    };
    
    saveProjectData({ textContent: updatedTextContent });
  }, [saveProjectData, getProjectData]);

  const getTextContent = useCallback((key: string, fallback: string = '') => {
    const data = getProjectData();
    const value = data.textContent[key] || fallback;
    console.log('Getting text content for key:', key, 'value:', value);
    return value;
  }, [getProjectData]);

  const saveImageReplacement = useCallback((oldSrc: string, newSrc: string) => {
    console.log('Saving image replacement:', oldSrc, '->', newSrc);
    const currentData = getProjectData();
    const updatedImageReplacements = {
      ...currentData.imageReplacements,
      [oldSrc]: newSrc
    };
    
    saveProjectData({ imageReplacements: updatedImageReplacements });
  }, [saveProjectData, getProjectData]);

  const saveContentBlocks = useCallback((sectionKey: string, blocks: any[]) => {
    console.log('Saving content blocks for section:', sectionKey, 'blocks:', blocks);
    const currentData = getProjectData();
    const updatedContentBlocks = {
      ...currentData.contentBlocks,
      [sectionKey]: blocks
    };
    
    saveProjectData({ contentBlocks: updatedContentBlocks });
  }, [saveProjectData, getProjectData]);

  return {
    saveProjectData,
    getProjectData,
    saveTextContent,
    getTextContent,
    saveImageReplacement,
    saveContentBlocks,
    isSaving,
    lastSaved
  };
};
