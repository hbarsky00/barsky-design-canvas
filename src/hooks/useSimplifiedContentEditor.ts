
import { useCallback } from 'react';
import { useSimplifiedProjectPersistence } from '@/hooks/useSimplifiedProjectPersistence';

interface UseSimplifiedContentEditorProps {
  projectId: string;
}

export const useSimplifiedContentEditor = ({ projectId }: UseSimplifiedContentEditorProps) => {
  const { saveTextContent, saveImageReplacement } = useSimplifiedProjectPersistence(projectId);

  const handleSectionContentSave = useCallback(async (section: string, type: 'title' | 'content' | 'text', content: string, textKey?: string) => {
    console.log(`💾 Saving ${section} ${type}:`, content.substring(0, 50) + '...');
    
    try {
      // ENHANCED: Use standardized key format without project ID suffix to match retrieval
      let key: string;
      if (textKey) {
        // Use custom textKey as-is (for text sections between images)
        key = textKey;
      } else if (type === 'title') {
        key = `${section}_title`;
      } else {
        key = `${section}_content`;
      }
      
      console.log('🔑 Using standardized save key:', key);
      
      await saveTextContent(key, content);
      console.log('✅ Content saved successfully with key:', key);
      
      // Force immediate refresh to show saved content
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          section,
          type,
          content,
          key,
          immediate: true,
          stayOnPage: true,
          timestamp: Date.now()
        }
      }));
      
    } catch (error) {
      console.error('❌ Error saving content:', error);
    }
  }, [projectId, saveTextContent]);

  const handleSectionImageUpdate = useCallback(async (section: string, originalSrc: string, newSrc: string) => {
    console.log(`🖼️ Updating ${section} image:`, originalSrc.substring(0, 30) + '...', '->', newSrc.substring(0, 30) + '...');
    
    try {
      await saveImageReplacement(originalSrc, newSrc);
      console.log('✅ Image replacement saved successfully');
      
      // Force immediate refresh to show replaced image
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          section,
          imageReplacement: { originalSrc, newSrc },
          immediate: true,
          stayOnPage: true,
          timestamp: Date.now()
        }
      }));
      
    } catch (error) {
      console.error('❌ Error saving image replacement:', error);
    }
  }, [projectId, saveImageReplacement]);

  return {
    handleSectionContentSave,
    handleSectionImageUpdate
  };
};
