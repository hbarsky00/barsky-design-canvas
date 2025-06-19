
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface CaptionData {
  [imageSrc: string]: string;
}

export const useSimpleCaptions = (projectId: string) => {
  const [captions, setCaptions] = useState<CaptionData>({});
  const [isSaving, setIsSaving] = useState(false);

  // Create a stable caption key from image src - ENSURE ABSOLUTE UNIQUENESS
  const createCaptionKey = useCallback((imageSrc: string): string => {
    // Use a hash of the full URL to ensure uniqueness + readable part
    const fullUrl = imageSrc;
    const filename = imageSrc.split('/').pop() || 'unknown';
    const cleanName = filename.replace(/[^a-zA-Z0-9]/g, '_');
    
    // Create a simple hash of the full URL for uniqueness
    let hash = 0;
    for (let i = 0; i < fullUrl.length; i++) {
      const char = fullUrl.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    const hashStr = Math.abs(hash).toString(36);
    
    const key = `img_caption_${cleanName}_${hashStr}`;
    console.log('🔑 Caption key created:', {
      originalSrc: imageSrc.substring(0, 50) + '...',
      filename,
      cleanName,
      hash: hashStr,
      finalKey: key
    });
    
    return key;
  }, []);

  // Get caption for an image
  const getCaption = useCallback((imageSrc: string, fallback?: string): string => {
    const key = createCaptionKey(imageSrc);
    const caption = captions[key] || fallback || 'Click to add a caption...';
    
    console.log('📖 Getting caption:', {
      imageSrc: imageSrc.substring(0, 50) + '...',
      key,
      caption: caption.substring(0, 30) + '...',
      allKeys: Object.keys(captions)
    });
    
    return caption;
  }, [captions, createCaptionKey]);

  // Save caption directly to localStorage for immediate persistence
  const saveCaption = useCallback(async (imageSrc: string, caption: string) => {
    const key = createCaptionKey(imageSrc);
    
    console.log('💾 Saving caption:', {
      imageSrc: imageSrc.substring(0, 50) + '...',
      key,
      caption: caption.substring(0, 50) + '...'
    });
    
    setIsSaving(true);
    try {
      // Update local state immediately
      setCaptions(prev => {
        const updated = { ...prev, [key]: caption };
        console.log('🔄 Updated captions state:', {
          oldKeys: Object.keys(prev),
          newKeys: Object.keys(updated),
          addedKey: key
        });
        return updated;
      });
      
      // Save to localStorage for persistence with COMPLETELY ISOLATED storage key
      const storageKey = `image_captions_${projectId}`;
      const existingCaptions = JSON.parse(localStorage.getItem(storageKey) || '{}');
      const updatedCaptions = { ...existingCaptions, [key]: caption };
      localStorage.setItem(storageKey, JSON.stringify(updatedCaptions));
      
      console.log('✅ Image caption saved to localStorage:', {
        storageKey,
        key,
        caption: caption.substring(0, 50) + '...',
        totalCaptions: Object.keys(updatedCaptions).length
      });
      
      toast.success('Caption saved!', { duration: 1000 });
      
      return true;
    } catch (error) {
      console.error('❌ Error saving image caption:', error);
      toast.error('Failed to save caption');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [projectId, createCaptionKey]);

  // Load captions from localStorage on init
  const loadCaptions = useCallback(() => {
    try {
      const storageKey = `image_captions_${projectId}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsedCaptions = JSON.parse(saved);
        setCaptions(parsedCaptions);
        console.log('📖 Loaded image captions from localStorage:', {
          storageKey,
          count: Object.keys(parsedCaptions).length,
          keys: Object.keys(parsedCaptions),
          captions: parsedCaptions
        });
      } else {
        console.log('📖 No existing captions found in localStorage for:', storageKey);
      }
    } catch (error) {
      console.error('❌ Error loading image captions:', error);
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
      toast.success('Image captions copied to clipboard!', {
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
