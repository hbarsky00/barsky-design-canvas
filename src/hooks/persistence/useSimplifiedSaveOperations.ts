
import { useCallback, useState } from 'react';
import { saveChangeToDatabase } from '../database/operations';
import { SimplifiedProjectData } from './simplifiedTypes';

export const useSimplifiedSaveOperations = (
  projectId: string,
  setCachedData: (updater: (prev: SimplifiedProjectData) => SimplifiedProjectData) => void
) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 SimplifiedSaveOperations: Saving text content:', key, content.substring(0, 50) + '...');
    setIsSaving(true);
    
    try {
      // ENHANCED: Save with the exact key provided, no modifications
      await saveChangeToDatabase(projectId, 'text', key, content);
      
      // Update cached data immediately with multiple key formats for compatibility
      setCachedData(prev => {
        const updated = {
          ...prev,
          textContent: { 
            ...prev.textContent, 
            [key]: content,
            // Also store with project ID suffix for backward compatibility
            [`${key}_${projectId}`]: content
          }
        };
        
        console.log('📊 Updated cached data with keys:', [key, `${key}_${projectId}`]);
        console.log('📊 All cached textContent keys:', Object.keys(updated.textContent));
        
        return updated;
      });
      
      setLastSaved(new Date());
      console.log('✅ Text content saved and cached successfully with key:', key);
      
    } catch (error) {
      console.error('❌ Error saving text content:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [projectId, setCachedData]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('💾 SimplifiedSaveOperations: Saving image replacement:', originalSrc.substring(0, 30) + '...', '->', newSrc.substring(0, 30) + '...');
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL replacement save');
      return;
    }
    
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'image', originalSrc, newSrc);
      
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Image replacement saved successfully');
      
    } catch (error) {
      console.error('❌ Error saving image replacement:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [projectId, setCachedData]);

  const saveImageCaption = useCallback(async (imageSrc: string, caption: string) => {
    console.log('💾 SimplifiedSaveOperations: Saving image caption:', imageSrc.substring(0, 30) + '...', caption.substring(0, 50) + '...');
    
    setIsSaving(true);
    
    try {
      // Use img_caption_ prefix for consistency with publishing system
      const captionKey = `img_caption_${imageSrc}`;
      await saveChangeToDatabase(projectId, 'image_caption', captionKey, caption);
      
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        imageCaptions: { ...prev.imageCaptions, [imageSrc]: caption }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Image caption saved successfully');
      
    } catch (error) {
      console.error('❌ Error saving image caption:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [projectId, setCachedData]);

  return {
    saveTextContent,
    saveImageReplacement,
    saveImageCaption,
    isSaving,
    lastSaved
  };
};
