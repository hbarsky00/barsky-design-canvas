
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
    if (!projectId) return;

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
        localStorage.setItem(getStorageKey('textContent'), JSON.stringify(data.textContent));
      }
      if (data.imageReplacements) {
        localStorage.setItem(getStorageKey('imageReplacements'), JSON.stringify(data.imageReplacements));
      }
      if (data.contentBlocks) {
        localStorage.setItem(getStorageKey('contentBlocks'), JSON.stringify(data.contentBlocks));
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
    try {
      const textContent = JSON.parse(localStorage.getItem(getStorageKey('textContent')) || '{}');
      const imageReplacements = JSON.parse(localStorage.getItem(getStorageKey('imageReplacements')) || '{}');
      const contentBlocks = JSON.parse(localStorage.getItem(getStorageKey('contentBlocks')) || '{}');
      const lastSaved = localStorage.getItem(getStorageKey('lastSaved')) || '';

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
    const currentData = getProjectData();
    const updatedTextContent = {
      ...currentData.textContent,
      [key]: value
    };
    
    saveProjectData({ textContent: updatedTextContent });
  }, [saveProjectData, getProjectData]);

  const saveImageReplacement = useCallback((oldSrc: string, newSrc: string) => {
    const currentData = getProjectData();
    const updatedImageReplacements = {
      ...currentData.imageReplacements,
      [oldSrc]: newSrc
    };
    
    saveProjectData({ imageReplacements: updatedImageReplacements });
  }, [saveProjectData, getProjectData]);

  const saveContentBlocks = useCallback((sectionKey: string, blocks: any[]) => {
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
    saveImageReplacement,
    saveContentBlocks,
    isSaving,
    lastSaved
  };
};
