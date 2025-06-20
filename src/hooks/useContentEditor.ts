
import { useState, useCallback } from 'react';
import { useProjectPersistence } from './useProjectPersistence';
import { toast } from 'sonner';

interface UseContentEditorProps {
  projectId: string;
}

export const useContentEditor = ({ projectId }: UseContentEditorProps) => {
  const { saveTextContent, saveImageReplacement, isSaving } = useProjectPersistence(projectId);

  const saveContent = useCallback(async (key: string, content: string) => {
    try {
      await saveTextContent(key, content);
      console.log(`Content saved: ${key}`);
      toast.success('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    }
  }, [saveTextContent]);

  const saveImageUpdate = useCallback(async (originalSrc: string, newSrc: string) => {
    try {
      await saveImageReplacement(originalSrc, newSrc);
      console.log(`Image updated: ${originalSrc} -> ${newSrc}`);
      toast.success('Image updated successfully');
    } catch (error) {
      console.error('Error saving image update:', error);
      toast.error('Failed to save image update');
    }
  }, [saveImageReplacement]);

  const handleSectionContentSave = useCallback((sectionKey: string, contentKey: string, content: string) => {
    const fullKey = `${sectionKey}_${contentKey}_${projectId}`;
    return saveContent(fullKey, content);
  }, [saveContent, projectId]);

  const handleSectionImageUpdate = useCallback((sectionKey: string, originalSrc: string, newSrc: string) => {
    return saveImageUpdate(originalSrc, newSrc);
  }, [saveImageUpdate]);

  return {
    saveContent,
    saveImageUpdate,
    handleSectionContentSave,
    handleSectionImageUpdate,
    isSaving
  };
};
