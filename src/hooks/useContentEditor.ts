
import { useState, useCallback } from 'react';
import { useProjectPersistence } from './useProjectPersistence';

interface UseContentEditorProps {
  projectId: string;
}

export const useContentEditor = ({ projectId }: UseContentEditorProps) => {
  const { saveTextContent, saveImageReplacement } = useProjectPersistence(projectId);
  const [isSaving, setIsSaving] = useState(false);

  const saveContent = useCallback(async (key: string, content: string) => {
    setIsSaving(true);
    try {
      await saveTextContent(key, content);
      console.log(`Content saved: ${key}`);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  }, [saveTextContent]);

  const saveImageUpdate = useCallback(async (originalSrc: string, newSrc: string) => {
    setIsSaving(true);
    try {
      await saveImageReplacement(originalSrc, newSrc);
      console.log(`Image updated: ${originalSrc} -> ${newSrc}`);
    } catch (error) {
      console.error('Error saving image update:', error);
    } finally {
      setIsSaving(false);
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
