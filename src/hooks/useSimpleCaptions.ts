
import { useState, useCallback, useEffect } from 'react';
import { getImageCaption } from '@/data/imageCaptions';

export const useSimpleCaptions = (projectId: string) => {
  const [captionCache, setCaptionCache] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Create stable storage keys for AI captions only (no publishing system interference)
  const aiStorageKey = `ai_captions_${projectId}`;

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

  // Save captions to AI storage only when cache changes
  useEffect(() => {
    if (!isLoading && Object.keys(captionCache).length > 0) {
      try {
        // Save to AI caption system only
        localStorage.setItem(aiStorageKey, JSON.stringify(captionCache));
        
        console.log('💾 useSimpleCaptions: Saved AI captions to storage:', {
          aiCaptions: Object.keys(captionCache).length
        });
      } catch (error) {
        console.warn('⚠️ useSimpleCaptions: Failed to save captions to storage:', error);
      }
    }
  }, [captionCache, aiStorageKey, isLoading]);

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
    // CRITICAL: AI-generated captions MUST ALWAYS have highest priority
    if (captionCache[imageSrc]) {
      console.log('🤖 useSimpleCaptions: Using AI caption (PRIORITY) for:', imageSrc.substring(0, 30) + '...');
      return captionCache[imageSrc];
    }
    
    // Check static captions only if no AI caption exists
    const staticCaption = getImageCaption(imageSrc);
    if (staticCaption && staticCaption !== "Professional project showcase demonstrating innovative solutions and user-centered design") {
      console.log('📚 useSimpleCaptions: Using static caption for:', imageSrc.substring(0, 30) + '...');
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
    console.log('🗑️ useSimpleCaptions: Cleared all AI captions');
  }, [aiStorageKey]);

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
