
import { useCallback, useState } from 'react';
import { saveChangeToDatabase } from '../database/operations';
import { ProjectData } from './types';

export const useSimplifiedSaveOperations = (
  projectId: string,
  updateCachedData: (updater: (prev: ProjectData) => ProjectData) => void
) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 SimplifiedSave: Saving text content:', key);
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'text', key, content);
      
      updateCachedData(prev => ({
        ...prev,
        textContent: { ...prev.textContent, [key]: content }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Text content saved successfully');
      
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          textUpdate: { key, content },
          immediate: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving text content:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [projectId, updateCachedData]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('💾 SimplifiedSave: Saving image replacement:', originalSrc.substring(0, 30) + '...');
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL replacement save');
      return;
    }
    
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'image', originalSrc, newSrc);
      
      updateCachedData(prev => ({
        ...prev,
        imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Image replacement saved successfully');
      
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          imageReplacement: { originalSrc, newSrc },
          immediate: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving image replacement:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [projectId, updateCachedData]);

  const saveImageCaption = useCallback(async (imageSrc: string, caption: string) => {
    console.log('💾 SimplifiedSave: Saving image caption:', imageSrc.substring(0, 30) + '...');
    
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'image_caption', imageSrc, caption);
      
      updateCachedData(prev => ({
        ...prev,
        imageCaptions: { ...prev.imageCaptions, [imageSrc]: caption }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Image caption saved successfully');
      
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          imageCaptionUpdate: { imageSrc, caption },
          immediate: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving image caption:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [projectId, updateCachedData]);

  return {
    saveTextContent,
    saveImageReplacement,
    saveImageCaption,
    isSaving,
    lastSaved
  };
};
