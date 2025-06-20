
import { useState, useCallback, useEffect } from 'react';
import { getImageCaption } from '@/data/imageCaptions';

export const useSimpleCaptions = (projectId: string) => {
  const [captionCache, setCaptionCache] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Create stable storage keys for both AI captions and publishing system
  const aiStorageKey = `ai_captions_${projectId}`;
  const publishStorageKey = `image_captions_${projectId}`;

  // Load captions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(aiStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCaptionCache(parsed);
        console.log('✅ useSimpleCaptions: Loaded AI captions from storage:', Object.keys(parsed).length);
      }
    } catch (error) {
      console.warn('⚠️ useSimpleCaptions: Failed to load AI captions from storage:', error);
    } finally {
      setIsLoading(false);
    }
  }, [aiStorageKey]);

  // Save captions to BOTH storage systems whenever cache changes
  useEffect(() => {
    if (!isLoading && Object.keys(captionCache).length > 0) {
      try {
        // Save to AI caption system
        localStorage.setItem(aiStorageKey, JSON.stringify(captionCache));
        
        // ALSO save to publishing system with proper format
        const publishingCaptions: Record<string, string> = {};
        Object.entries(captionCache).forEach(([imageSrc, caption]) => {
          // Create the key format expected by publishing system
          const captionKey = `img_caption_${imageSrc.split('/').pop()?.split('.')[0] || Date.now()}`;
          publishingCaptions[captionKey] = caption;
        });
        
        // Merge with existing publishing captions
        const existingPublishCaptions = JSON.parse(localStorage.getItem(publishStorageKey) || '{}');
        const mergedPublishCaptions = { ...existingPublishCaptions, ...publishingCaptions };
        localStorage.setItem(publishStorageKey, JSON.stringify(mergedPublishCaptions));
        
        console.log('💾 useSimpleCaptions: Saved captions to BOTH systems:', {
          aiCaptions: Object.keys(captionCache).length,
          publishCaptions: Object.keys(mergedPublishCaptions).length
        });
      } catch (error) {
        console.warn('⚠️ useSimpleCaptions: Failed to save captions to storage:', error);
      }
    }
  }, [captionCache, aiStorageKey, publishStorageKey, isLoading]);

  const setCaption = useCallback((imageSrc: string, caption: string) => {
    console.log('📝 useSimpleCaptions: Setting AI caption for:', imageSrc.substring(0, 30) + '...', 'to:', caption.substring(0, 50) + '...');
    
    setCaptionCache(prev => {
      const updated = { ...prev, [imageSrc]: caption };
      return updated;
    });
    
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('aiCaptionUpdated', {
      detail: { imageSrc, caption, projectId }
    }));
  }, [projectId]);

  const getCaption = useCallback((imageSrc: string, fallback?: string): string => {
    // First check our AI-generated captions cache (highest priority)
    if (captionCache[imageSrc]) {
      console.log('🤖 useSimpleCaptions: Found AI caption for:', imageSrc.substring(0, 30) + '...');
      return captionCache[imageSrc];
    }
    
    // Then check static captions (lower priority)
    const staticCaption = getImageCaption(imageSrc);
    if (staticCaption && staticCaption !== "Professional project showcase demonstrating innovative solutions and user-centered design") {
      console.log('📚 useSimpleCaptions: Found static caption for:', imageSrc.substring(0, 30) + '...');
      return staticCaption;
    }
    
    // Finally use fallback
    const finalCaption = fallback || staticCaption || "Professional project showcase demonstrating innovative solutions and user-centered design";
    console.log('🔄 useSimpleCaptions: Using fallback caption for:', imageSrc.substring(0, 30) + '...', finalCaption.substring(0, 50) + '...');
    return finalCaption;
  }, [captionCache]);

  const clearAllCaptions = useCallback(() => {
    setCaptionCache({});
    localStorage.removeItem(aiStorageKey);
    localStorage.removeItem(publishStorageKey);
    console.log('🗑️ useSimpleCaptions: Cleared all captions from both systems');
  }, [aiStorageKey, publishStorageKey]);

  const loadCaptions = useCallback(() => {
    return captionCache;
  }, [captionCache]);

  return {
    getCaption,
    setCaption,
    clearAllCaptions,
    loadCaptions,
    captions: captionCache,
    isLoading,
    captionCount: Object.keys(captionCache).length
  };
};
