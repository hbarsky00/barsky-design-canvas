
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { validateContentBlockSize } from '../database/contentBlockValidation';
import { ProjectData } from './types';

export const useSaveOperations = (
  queueChange: (type: 'text' | 'image' | 'content_block', key: string, value: any) => void,
  updateCachedData: (updater: (prev: ProjectData) => ProjectData) => void
) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveTextContent = useCallback(async (key: string, content: string) => {
    console.log('💾 SaveOperations: Queuing text content:', key);
    queueChange('text', key, content);
    
    // Update cached data immediately for UI responsiveness
    updateCachedData(prev => ({
      ...prev,
      textContent: { ...prev.textContent, [key]: content }
    }));
    setLastSaved(new Date());
    console.log('✅ Text content queued and cached');
  }, [queueChange, updateCachedData]);

  const saveImageReplacement = useCallback(async (originalSrc: string, newSrc: string) => {
    console.log('💾 SaveOperations: Queuing image replacement:', originalSrc.substring(0, 30) + '...', '->', newSrc.substring(0, 30) + '...');
    
    if (originalSrc.startsWith('blob:') || newSrc.startsWith('blob:')) {
      console.log('⚠️ Skipping blob URL replacement save');
      return;
    }
    
    queueChange('image', originalSrc, newSrc);
    
    // Update cached data immediately for UI responsiveness
    updateCachedData(prev => ({
      ...prev,
      imageReplacements: { ...prev.imageReplacements, [originalSrc]: newSrc }
    }));
    setLastSaved(new Date());
    console.log('✅ Image replacement queued and cached');
  }, [queueChange, updateCachedData]);

  const saveContentBlocks = useCallback(async (sectionKey: string, blocks: any[]) => {
    console.log('💾 SaveOperations: Queuing content blocks:', sectionKey);
    
    try {
      const validation = validateContentBlockSize(blocks);
      if (!validation.isValid) {
        console.error('❌ Content blocks validation failed:', validation.error);
        toast.error('Content too large', {
          description: validation.error
        });
        return;
      }
      
      queueChange('content_block', sectionKey, blocks);
      
      updateCachedData(prev => ({
        ...prev,
        contentBlocks: { ...prev.contentBlocks, [sectionKey]: blocks }
      }));
      setLastSaved(new Date());
      console.log('✅ Content blocks queued successfully');
      toast.success('Content queued for sync');
    } catch (error) {
      console.error('❌ SaveOperations: Error queuing content blocks:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to queue content blocks';
      toast.error('Queue failed', {
        description: errorMessage
      });
    }
  }, [queueChange, updateCachedData]);

  return {
    saveTextContent,
    saveImageReplacement,
    saveContentBlocks,
    lastSaved
  };
};
