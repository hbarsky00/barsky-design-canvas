
import { useState, useEffect, useRef } from 'react';
import { UseImageStateManagerProps, ImageStateManagerReturn } from './image-state/types';
import { useImageValidation } from './image-state/validation';
import { useImageLoader } from './image-state/imageLoader';
import { useImageEventHandlers } from './image-state/eventHandlers';

export const useImageStateManager = ({ src, projectId, imageReplacements }: UseImageStateManagerProps): ImageStateManagerReturn => {
  // Immediately resolve the image using published replacements if available
  const initialResolvedImage = imageReplacements?.[src] || src;
  const [displayedImage, setDisplayedImage] = useState(initialResolvedImage);
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
  
  // Wrap loadImageState with current state
  const wrappedLoadImageState = () => {
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
  };

  const { updateDisplayedImage, forceRefresh } = useImageEventHandlers(
    projectId,
    src,
    displayedImage,
    wrappedLoadImageState,
    isValidPublishedUrl,
    mountedRef,
    loadingRef,
    setDisplayedImage,
    setHasDevModeChanges,
    setHasError,
    setIsLoading
  );

  // Initial load with timeout fallback
  useEffect(() => {
    // If we have a published replacement, we can skip the loading state entirely
    if (imageReplacements?.[src]) {
      console.log('🚀 Using provided published replacement:', imageReplacements[src].substring(0, 50) + '...');
      setDisplayedImage(imageReplacements[src]);
      setIsLoading(false);
      setHasDevModeChanges(false);
      
      // Still check for dev mode overrides but don't show loading
      setTimeout(() => {
        if (mountedRef.current && !loadingRef.current) {
          wrappedLoadImageState();
        }
      }, 100);
      
      return;
    }

    // For images without published replacements, start loading immediately
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      if (mountedRef.current && loadingRef.current) {
        console.warn('⚠️ Image loading timeout, falling back to original');
        setDisplayedImage(src);
        setIsLoading(false);
        setHasError(false);
        loadingRef.current = false;
      }
    }, 3000);

    wrappedLoadImageState();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [src, projectId, imageReplacements]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const wrappedUpdateDisplayedImage = (newSrc: string) => {
    updateDisplayedImage(newSrc, isValidImageUrl);
  };

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
