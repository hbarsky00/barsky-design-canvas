
import { useEffect, useCallback } from 'react';

export const useImageEventHandlers = (
  projectId: string,
  src: string,
  displayedImage: string,
  loadImageState: any,
  isValidPublishedUrl: (url: string) => boolean,
  mountedRef: React.MutableRefObject<boolean>,
  loadingRef: React.MutableRefObject<boolean>,
  setDisplayedImage: (src: string) => void,
  setHasDevModeChanges: (hasChanges: boolean) => void,
  setHasError: (error: boolean) => void,
  setIsLoading: (loading: boolean) => void
) => {
  // Listen for updates
  useEffect(() => {
    if (!mountedRef.current) return;
    
    const handleProjectUpdate = (e: CustomEvent) => {
      if (!mountedRef.current) return;
      
      const detail = e.detail || {};
      console.log('🔄 Project update event:', detail);
      
      // Handle published changes immediately
      if (detail.published && detail.imageReplacements) {
        const newImageSrc = detail.imageReplacements[src];
        if (newImageSrc && newImageSrc !== displayedImage && mountedRef.current) {
          // Validate published URL
          if (newImageSrc.startsWith('data:')) {
            console.warn('⚠️ Received data: URL in published update, ignoring');
            return;
          }
          
          if (isValidPublishedUrl(newImageSrc)) {
            console.log('📄 Immediately applying published change:', newImageSrc.substring(0, 50) + '...');
            setDisplayedImage(newImageSrc);
            setHasDevModeChanges(false);
            setHasError(false);
            setIsLoading(false);
            return;
          }
        }
      }
      
      // Handle other updates
      const isRelevant = 
        detail.projectId === projectId || 
        detail.immediate ||
        detail.src === src ||
        detail.imageReplaced;
        
      if (isRelevant && !loadingRef.current) {
        setHasError(false);
        setTimeout(() => {
          if (mountedRef.current && !loadingRef.current) {
            loadImageState();
          }
        }, 100);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, [src, projectId, displayedImage, loadImageState, isValidPublishedUrl, mountedRef, loadingRef, setDisplayedImage, setHasDevModeChanges, setHasError, setIsLoading]);

  const updateDisplayedImage = useCallback((newSrc: string, isValidImageUrl: (url: string) => boolean) => {
    if (!mountedRef.current) return;
    
    console.log('⚡ Immediately updating displayed image:', {
      from: src.substring(0, 30) + '...',
      to: newSrc.substring(0, 30) + '...',
      isValid: isValidImageUrl(newSrc)
    });
    
    if (isValidImageUrl(newSrc)) {
      setDisplayedImage(newSrc);
      setHasDevModeChanges(true);
      setHasError(false);
      setIsLoading(false);
    } else {
      console.error('❌ Invalid image URL provided:', newSrc);
      setHasError(true);
      setIsLoading(false);
    }
  }, [src, mountedRef, setDisplayedImage, setHasDevModeChanges, setHasError, setIsLoading]);

  const forceRefresh = useCallback(() => {
    if (!mountedRef.current || loadingRef.current) return;
    
    console.log('🔄 Force refresh triggered for:', src.substring(0, 50) + '...');
    setHasError(false);
    setIsLoading(true);
    
    setTimeout(() => {
      if (mountedRef.current && !loadingRef.current) {
        loadImageState();
      }
    }, 100);
  }, [loadImageState, src, mountedRef, loadingRef, setHasError, setIsLoading]);

  return {
    updateDisplayedImage,
    forceRefresh
  };
};
