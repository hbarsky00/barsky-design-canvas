
import { useCallback } from 'react';
import { useSimplifiedProjectPersistence } from './useSimplifiedProjectPersistence';
import { toast } from 'sonner';

interface UseSimplifiedContentEditorProps {
  projectId: string;
}

export const useSimplifiedContentEditor = ({ projectId }: UseSimplifiedContentEditorProps) => {
  const { saveTextContent, saveImageReplacement } = useSimplifiedProjectPersistence(projectId);

  const handleSectionContentSave = useCallback(async (section: string, type: 'title' | 'content', content: string) => {
    const key = `${section}_${type}_${projectId}`;
    console.log(`💾 SimplifiedContentEditor: Saving ${section} ${type}:`, content.substring(0, 50) + '...');
    
    try {
      await saveTextContent(key, content);
      toast.success(`${section} ${type} saved successfully`);
      console.log(`✅ ${section} ${type} saved and events dispatched`);
      
    } catch (error) {
      console.error(`❌ Error saving ${section} ${type}:`, error);
      toast.error(`Failed to save ${section} ${type}`);
    }
  }, [projectId, saveTextContent]);

  const handleSectionImageUpdate = useCallback(async (section: string, originalSrc: string, newSrc: string) => {
    console.log(`🖼️ SimplifiedContentEditor: Updating ${section} image:`, originalSrc.substring(0, 30) + '...', '->', newSrc.substring(0, 30) + '...');
    
    try {
      await saveImageReplacement(originalSrc, newSrc);
      toast.success(`${section} image updated successfully`);
      console.log(`✅ ${section} image updated and events dispatched`);
      
    } catch (error) {
      console.error(`❌ Error updating ${section} image:`, error);
      toast.error(`Failed to update ${section} image`);
    }
  }, [projectId, saveImageReplacement]);

  return {
    handleSectionContentSave,
    handleSectionImageUpdate
  };
};
