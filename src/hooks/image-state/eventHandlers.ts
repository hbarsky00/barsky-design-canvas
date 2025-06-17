
import { useCallback } from 'react';

export const useImageEventHandlers = (
  projectId: string,
  src: string,
  displayedImage: string,
  handleLoadImageState: () => Promise<void>,
  isValidPublishedUrl: (url: string) => boolean,
  mountedRef: React.MutableRefObject<boolean>,
  loadingRef: React.MutableRefObject<boolean>,
  setDisplayedImage: (src: string) => void,
  setHasDevModeChanges: (hasChanges: boolean) => void,
  setHasError: (error: boolean) => void,
  setIsLoading: (loading: boolean) => void
) => {
  const updateDisplayedImage = useCallback((newSrc: string, isValidImageUrl: (url: string) => boolean) => {
    if (!mountedRef.current || !newSrc || !isValidImageUrl(newSrc)) {
      console.warn('⚠️ Invalid image update attempt:', {
        mounted: mountedRef.current,
        hasNewSrc: !!newSrc,
        isValid: isValidImageUrl(newSrc)
      });
      return;
    }
    
    console.log('⚡ Immediately updating displayed image from:', src.substring(0, 30) + '...', 'to:', newSrc.substring(0, 30) + '...');
    
    // Immediate UI update
    setDisplayedImage(newSrc);
    setHasDevModeChanges(true);
    setHasError(false);
    setIsLoading(false);
    
    // Dispatch immediate update event
    window.dispatchEvent(new CustomEvent('projectDataUpdated', {
      detail: { 
        projectId,
        src,
        newSrc,
        immediate: true,
        imageReplaced: true,
        changeType: 'image',
        timestamp: Date.now()
      }
    }));
  }, [projectId, src, setDisplayedImage, setHasDevModeChanges, setHasError, setIsLoading, mountedRef]);

  const forceRefresh = useCallback(() => {
    if (!mountedRef.current || loadingRef.current) return;
    
    console.log('🔄 Force refresh triggered for:', src.substring(0, 50) + '...');
    setHasError(false);
    setIsLoading(true);
    
    // Debounced refresh
    setTimeout(() => {
      if (mountedRef.current && !loadingRef.current) {
        handleLoadImageState();
      }
    }, 100);
  }, [src, handleLoadImageState, mountedRef, loadingRef, setHasError, setIsLoading]);

  return {
    updateDisplayedImage,
    forceRefresh
  };
};
