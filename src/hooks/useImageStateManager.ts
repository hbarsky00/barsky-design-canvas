
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { UseImageStateManagerProps, ImageStateManagerReturn } from './image-state/types';
import { useImageValidation } from './image-state/validation';
import { useImageLoader } from './image-state/imageLoader';
import { useImageEventHandlers } from './image-state/eventHandlers';

export const useImageStateManager = ({ src, projectId, imageReplacements }: UseImageStateManagerProps): ImageStateManagerReturn => {
  // Stable initial state calculation
  const initialImage = useMemo(() => {
    return imageReplacements?.[src] || src;
  }, [src, imageReplacements]);

  const [displayedImage, setDisplayedImage] = useState(initialImage);
  const [hasDevModeChanges, setHasDevModeChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const mountedRef = useRef(true);
  const loadingRef = useRef(false);
  
  // Debug logging
  console.log('🎯 useImageStateManager:', {
    src: src.substring(0, 50) + '...',
    displayedImage: displayedImage.substring(0, 50) + '...',
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
    if (!mountedRef.current) return;
    
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
  }, [src, projectId, loadImageState]);

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

  // Handle published replacement updates
  useEffect(() => {
    const publishedReplacement = imageReplacements?.[src];
    if (publishedReplacement && publishedReplacement !== displayedImage) {
      console.log('🚀 Applying published replacement:', publishedReplacement.substring(0, 50) + '...');
      setDisplayedImage(publishedReplacement);
      setHasDevModeChanges(false);
      setIsLoading(false);
      setHasError(false);
      return;
    }
  }, [src, imageReplacements]);

  // Initial load effect - simplified
  useEffect(() => {
    if (!src || !projectId) return;
    
    // If we already have a published replacement, don't load
    if (imageReplacements?.[src]) {
      console.log('✅ Using published replacement, skipping load');
      return;
    }

    // Only load dev mode changes if we don't have a published replacement
    const timeoutId = setTimeout(() => {
      if (mountedRef.current && !loadingRef.current) {
        setIsLoading(true);
        handleLoadImageState();
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [src, projectId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const wrappedUpdateDisplayedImage = useCallback((newSrc: string) => {
    if (!mountedRef.current) return;
    updateDisplayedImage(newSrc, isValidImageUrl);
  }, [updateDisplayedImage, isValidImageUrl]);

  return {
    displayedImage,
    updateDisplayedImage: wrappedUpdateDisplayedImage,
    forceRefresh,
    hasDevModeChanges,
    isLoading,
    hasError,
    isValidUrl: isValidImageUrl(displayedImage)
  };
};
