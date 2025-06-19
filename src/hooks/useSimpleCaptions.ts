
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface CaptionData {
  [imageSrc: string]: string;
}

export const useSimpleCaptions = (projectId: string) => {
  const [captions, setCaptions] = useState<CaptionData>({});
  const [isSaving, setIsSaving] = useState(false);

  // Create a stable caption key from image src
  const createCaptionKey = useCallback((imageSrc: string): string => {
    // Extract filename and create a clean key
    const filename = imageSrc.split('/').pop() || 'unknown';
    return filename.replace(/[^a-zA-Z0-9]/g, '_');
  }, []);

  // Get caption for an image
  const getCaption = useCallback((imageSrc: string, fallback?: string): string => {
    const key = createCaptionKey(imageSrc);
    return captions[key] || fallback || 'Click to add a caption...';
  }, [captions, createCaptionKey]);

  // Save caption directly to localStorage for immediate persistence
  const saveCaption = useCallback(async (imageSrc: string, caption: string) => {
    const key = createCaptionKey(imageSrc);
    
    setIsSaving(true);
    try {
      // Update local state immediately
      setCaptions(prev => ({ ...prev, [key]: caption }));
      
      // Save to localStorage for persistence
      const storageKey = `captions_${projectId}`;
      const existingCaptions = JSON.parse(localStorage.getItem(storageKey) || '{}');
      const updatedCaptions = { ...existingCaptions, [key]: caption };
      localStorage.setItem(storageKey, JSON.stringify(updatedCaptions));
      
      console.log('✅ Caption saved to localStorage:', key, caption.substring(0, 50) + '...');
      toast.success('Caption saved!', { duration: 1000 });
      
      return true;
    } catch (error) {
      console.error('❌ Error saving caption:', error);
      toast.error('Failed to save caption');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [projectId, createCaptionKey]);

  // Load captions from localStorage on init
  const loadCaptions = useCallback(() => {
    try {
      const storageKey = `captions_${projectId}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsedCaptions = JSON.parse(saved);
        setCaptions(parsedCaptions);
        console.log('📖 Loaded captions from localStorage:', Object.keys(parsedCaptions).length);
      }
    } catch (error) {
      console.error('❌ Error loading captions:', error);
    }
  }, [projectId]);

  // Export captions to copy-paste format
  const exportCaptions = useCallback(() => {
    const captionEntries = Object.entries(captions)
      .filter(([_, caption]) => caption && caption !== 'Click to add a caption...')
      .map(([key, caption]) => `"${key}": "${caption.replace(/"/g, '\\"')}"`)
      .join(',\n  ');
    
    const exportText = `{\n  ${captionEntries}\n}`;
    
    navigator.clipboard.writeText(exportText).then(() => {
      toast.success('Captions copied to clipboard!', {
        description: 'You can paste this into your project files'
      });
    });
  }, [captions]);

  return {
    captions,
    getCaption,
    saveCaption,
    loadCaptions,
    exportCaptions,
    isSaving
  };
};
