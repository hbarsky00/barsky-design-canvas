
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { UseImageStateManagerProps, ImageStateManagerReturn } from './image-state/types';
import { useImageValidation } from './image-state/validation';
import { useImageLoader } from './image-state/imageLoader';
import { useImageEventHandlers } from './image-state/eventHandlers';

export const useImageStateManager = ({ src, projectId, imageReplacements }: UseImageStateManagerProps): ImageStateManagerReturn => {
  // Initialize state with proper fallbacks to prevent React errors
  const [displayedImage, setDisplayedImage] = useState<string>(() => {
    if (!src) return '';
    return imageReplacements?.[src] || src;
  });
  
  const [hasDevModeChanges, setHasDevModeChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const mountedRef = useRef(true);
  const loadingRef = useRef(false);
  
  // Debug logging
  console.log('🎯 useImageStateManager:', {
    src: src?.substring(0, 50) + '...' || 'no-src',
    displayedImage: displayedImage?.substring(0, 50) + '...' || 'no-displayed',
    projectId,
    hasDevModeChanges,
    isLoading,
    hasError,
    hasPublishedReplacement: !!imageReplacements?.[src]
  });
  
  const { isValidImageUrl, isValidPublishedUrl } = useImageValidation();
  const { loadImageState } = useImageLoader(projectId, isValidImageUrl, isValidPublishedUrl);
  
  // Stable callback for loading image state
  const handleLoadImageState = useCallback(() => {
    if (!mountedRef.current || !src || !projectId) return;
    
    loadImageState(
      src,
      imageReplacements,
      displayedImage,
      mountedRef,
      loadingRef,
      setDisplayedImage,
      setHasDevModeChanges,
      setIsLoading,
      setHasError
    );
  }, [src, projectId, loadImageState, displayedImage, imageReplacements]);

  const { updateDisplayedImage, forceRefresh } = useImageEventHandlers(
    projectId,
    src,
    displayedImage,
    handleLoadImageState,
    isValidPublishedUrl,
    mountedRef,
    loadingRef,
    setDisplayedImage,
    setHasDevModeChanges,
    setHasError,
    setIsLoading
  );

  // Handle published replacement updates - simplified to prevent loops
  useEffect(() => {
    if (!src || !imageReplacements) return;
    
    const publishedReplacement = imageReplacements[src];
    if (publishedReplacement && publishedReplacement !== displayedImage) {
      console.log('🚀 Applying published replacement:', publishedReplacement.substring(0, 50) + '...');
      setDisplayedImage(publishedReplacement);
      setHasDevModeChanges(false);
      setIsLoading(false);
      setHasError(false);
    }
  }, [src, imageReplacements?.[src]]); // Only depend on the specific replacement

  // Initial load effect - only when necessary
  useEffect(() => {
    if (!src || !projectId || imageReplacements?.[src]) return;
    
    // Prevent immediate loading if we're already loading
    if (loadingRef.current || isLoading) return;

    const timeoutId = setTimeout(() => {
      if (mountedRef.current && !loadingRef.current) {
        handleLoadImageState();
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [src, projectId]); // Minimal dependencies

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const wrappedUpdateDisplayedImage = useCallback((newSrc: string) => {
    if (!mountedRef.current || !newSrc) return;
    updateDisplayedImage(newSrc, isValidImageUrl);
  }, [updateDisplayedImage, isValidImageUrl]);

  return {
    displayedImage: displayedImage || src || '',
    updateDisplayedImage: wrappedUpdateDisplayedImage,
    forceRefresh,
    hasDevModeChanges,
    isLoading,
    hasError,
    isValidUrl: isValidImageUrl(displayedImage || src || '')
  };
};
