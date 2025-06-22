
import { useCallback } from 'react';
import { useSimplifiedProjectPersistence } from './useSimplifiedProjectPersistence';
import { toast } from 'sonner';

interface UseSimplifiedContentEditorProps {
  projectId: string;
}

export const useSimplifiedContentEditor = ({ projectId }: UseSimplifiedContentEditorProps) => {
  const { saveTextContent, saveImageReplacement } = useSimplifiedProjectPersistence(projectId);

  const handleSectionContentSave = useCallback(async (
    section: string, 
    type: 'title' | 'content', 
    content: string
  ) => {
    const key = `${section}_${type}_${projectId}`;
    console.log('💾 SimplifiedContentEditor: Saving section content:', { section, type, key, content: content.substring(0, 50) + '...' });
    
    try {
      await saveTextContent(key, content);
      console.log('✅ Section content saved successfully');
    } catch (error) {
      console.error('❌ Error saving section content:', error);
      toast.error('Failed to save content');
    }
  }, [projectId, saveTextContent]);

  const handleSectionImageUpdate = useCallback(async (
    section: string,
    originalSrc: string,
    newSrc: string
  ) => {
    console.log('🖼️ SimplifiedContentEditor: Updating section image:', { section, originalSrc: originalSrc.substring(0, 30) + '...', newSrc: newSrc.substring(0, 30) + '...' });
    
    try {
      await saveImageReplacement(originalSrc, newSrc);
      console.log('✅ Section image updated successfully');
    } catch (error) {
      console.error('❌ Error updating section image:', error);
      toast.error('Failed to update image');
    }
  }, [saveImageReplacement]);

  return {
    handleSectionContentSave,
    handleSectionImageUpdate
  };
};
