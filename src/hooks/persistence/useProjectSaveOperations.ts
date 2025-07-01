
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
    if (!projectId) {
      console.error('❌ Cannot save: No projectId provided');
      return;
    }

    console.log('💾 SaveOperations: Saving text content for project:', projectId, 'key:', key);
    setIsSaving(true);
    
    try {
      // CRITICAL: Always include projectId in the save operation
      await saveChangeToDatabase(projectId, 'text', key, content);
      
      // Update cached data immediately with project isolation
      setCachedData(prev => ({
        ...prev,
        textContent: { ...prev.textContent, [key]: content }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Text content saved successfully for project:', projectId);
      
      // Trigger global update event with strict project scoping
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
      console.error('❌ Error saving text content for project:', projectId, error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, setCachedData]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    if (!projectId) {
      console.error('❌ Cannot save: No projectId provided');
      return;
    }

    console.log('💾 SaveOperations: Saving image replacement for project:', projectId);
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL replacement save');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // CRITICAL: Always include projectId in the save operation
      await saveChangeToDatabase(projectId, 'image', originalSrc, newSrc);
      
      // Update cached data immediately with project isolation
      setCachedData(prev => ({
        ...prev,
        imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Image replacement saved successfully for project:', projectId);
      
      // Trigger global update event with strict project scoping
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
      console.error('❌ Error saving image replacement for project:', projectId, error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, setCachedData]);

  const saveImageCaption = useCallback(async (imageSrc: string, caption: string) => {
    if (!projectId) {
      console.error('❌ Cannot save: No projectId provided');
      return;
    }

    console.log('💾 SaveOperations: Saving image caption for project:', projectId);
    
    setIsSaving(true);
    
    try {
      // CRITICAL: Always include projectId in the save operation
      await saveChangeToDatabase(projectId, 'image_caption', imageSrc, caption);
      
      // Update cached data immediately with project isolation
      setCachedData(prev => ({
        ...prev,
        imageCaptions: { ...prev.imageCaptions, [imageSrc]: caption }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Image caption saved successfully for project:', projectId);
      
      // Trigger global update event with strict project scoping
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
      console.error('❌ Error saving image caption for project:', projectId, error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, setCachedData]);

  const saveContentBlocks = useCallback(async (sectionKey: string, blocks: any[]) => {
    if (!projectId) {
      console.error('❌ Cannot save: No projectId provided');
      return;
    }

    console.log('💾 SaveOperations: Saving content blocks for project:', projectId);
    setIsSaving(true);
    
    try {
      // CRITICAL: Always include projectId in the save operation
      await saveChangeToDatabase(projectId, 'content_block', sectionKey, blocks);
      
      // Update cached data immediately with project isolation
      setCachedData(prev => ({
        ...prev,
        contentBlocks: { ...prev.contentBlocks, [sectionKey]: blocks }
      }));
      
      setLastSaved(new Date());
      console.log('✅ Content blocks saved successfully for project:', projectId);
      
      // Trigger global update event with strict project scoping
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
      console.error('❌ Error saving content blocks for project:', projectId, error);
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
