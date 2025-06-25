
import { useCallback, useState } from 'react';
import { saveChangeToDatabase } from '../database/operations';
import { ProjectData } from './types';

export const useProjectSaveOperations = (
  projectId: string,
  setCachedData: (updater: (prev: ProjectData) => ProjectData) => void
) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 SaveOperations: Saving text content:', key);
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'text', key, content);
      
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        textContent: { ...prev.textContent, [key]: content }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Text content saved successfully');
      
      // Trigger global update event for real-time sync
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          textUpdate: { key, content },
          immediate: true,
          stayOnPage: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving text content:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, setCachedData]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('💾 SaveOperations: Saving image replacement:', originalSrc.substring(0, 30) + '...', '->', newSrc.substring(0, 30) + '...');
    
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
      
      // Trigger global update event for real-time sync
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          imageReplacement: { originalSrc, newSrc },
          immediate: true,
          stayOnPage: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving image replacement:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, setCachedData]);

  const saveImageCaption = useCallback(async (imageSrc: string, caption: string) => {
    console.log('💾 SaveOperations: Saving image caption:', imageSrc.substring(0, 30) + '...', caption.substring(0, 50) + '...');
    
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'image_caption', imageSrc, caption);
      
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        imageCaptions: { ...prev.imageCaptions, [imageSrc]: caption }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Image caption saved successfully');
      
      // Trigger global update event for real-time sync
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          imageCaptionUpdate: { imageSrc, caption },
          immediate: true,
          stayOnPage: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving image caption:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, setCachedData]);

  const saveContentBlocks = useCallback(async (sectionKey: string, blocks: any[]) => {
    console.log('💾 SaveOperations: Saving content blocks:', sectionKey);
    setIsSaving(true);
    
    try {
      await saveChangeToDatabase(projectId, 'content_block', sectionKey, blocks);
      
      // Update cached data immediately
      setCachedData(prev => ({
        ...prev,
        contentBlocks: { ...prev.contentBlocks, [sectionKey]: blocks }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Content blocks saved successfully');
      
      // Trigger global update event for real-time sync
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          contentBlocks: { sectionKey, blocks },
          immediate: true,
          stayOnPage: true,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error('❌ Error saving content blocks:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, setCachedData]);

  return {
    saveTextContent,
    saveImageReplacement,
    saveImageCaption,
    saveContentBlocks,
    isSaving,
    lastSaved
  };
};
