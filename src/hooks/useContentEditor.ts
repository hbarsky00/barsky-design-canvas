
import { useCallback } from 'react';
import { useProjectPersistence } from './useProjectPersistence';
import { toast } from 'sonner';

interface UseContentEditorProps {
  projectId: string;
}

export const useContentEditor = ({ projectId }: UseContentEditorProps) => {
  const { saveTextContent, saveImageReplacement } = useProjectPersistence(projectId);

  const handleSectionContentSave = useCallback(async (section: string, type: 'title' | 'content', content: string) => {
    const key = `${section}_${type}_${projectId}`;
    console.log(`💾 Saving ${section} ${type}:`, content.substring(0, 50) + '...');
    
    try {
      await saveTextContent(key, content);
      toast.success(`${section} ${type} saved successfully`);
      
      // Trigger immediate UI refresh
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('forceComponentRefresh', {
          detail: { 
            projectId, 
            section, 
            type, 
            immediate: true,
            stayOnPage: true,
            timestamp: Date.now() 
          }
        }));
      }, 100);
      
    } catch (error) {
      console.error(`❌ Error saving ${section} ${type}:`, error);
      toast.error(`Failed to save ${section} ${type}`);
    }
  }, [projectId, saveTextContent]);

  const handleSectionImageUpdate = useCallback(async (section: string, originalSrc: string, newSrc: string) => {
    console.log(`🖼️ Updating ${section} image:`, originalSrc.substring(0, 30) + '...', '->', newSrc.substring(0, 30) + '...');
    
    try {
      await saveImageReplacement(originalSrc, newSrc);
      toast.success(`${section} image updated successfully`);
      
      // Trigger immediate UI refresh
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('forceComponentRefresh', {
          detail: { 
            projectId, 
            section, 
            imageUpdate: { originalSrc, newSrc },
            immediate: true,
            stayOnPage: true,
            timestamp: Date.now() 
          }
        }));
      }, 100);
      
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
