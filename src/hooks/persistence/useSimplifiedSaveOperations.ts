
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
      await saveChangeToDatabase(projectId, 'text', key, content);
      
      setCachedData(prev => {
        const updated = {
          ...prev,
          textContent: { ...prev.textContent, [key]: content }
        };
        
        console.log('📊 Updated cached data with key:', key);
        
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
    console.log('💾 SimplifiedSaveOperations: Saving image replacement to database:', originalSrc.substring(0, 30) + '...', '->', newSrc.substring(0, 30) + '...');
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL replacement save');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Save to database first
      await saveChangeToDatabase(projectId, 'image', originalSrc, newSrc);
      console.log('✅ Image replacement saved to database successfully');
      
      // Update cached data immediately after successful database save
      setCachedData(prev => {
        const updated = {
          ...prev,
          imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
        };
        
        console.log('📊 Updated cached image replacements:', Object.keys(updated.imageReplacements).length, 'total');
        
        return updated;
      });
      
      setLastSaved(new Date());
      console.log('✅ Image replacement cached successfully');
      
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
