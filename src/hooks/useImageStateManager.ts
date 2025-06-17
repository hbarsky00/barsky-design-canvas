
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { UseImageStateManagerProps, ImageStateManagerReturn } from './image-state/types';
import { useImageValidation } from './image-state/validation';
import { useImageLoader } from './image-state/imageLoader';
import { useImageEventHandlers } from './image-state/eventHandlers';

export const useImageStateManager = ({ src, projectId, imageReplacements }: UseImageStateManagerProps): ImageStateManagerReturn => {
  // Prevent re-initialization by using refs to track if we're already initialized
  const initializedRef = useRef(false);
  const mountedRef = useRef(true);
  const loadingRef = useRef(false);
  
  // Stable initial state calculation
  const initialDisplayedImage = useMemo(() => {
    if (!src) return '';
    return imageReplacements?.[src] || src;
  }, [src, imageReplacements?.[src]]); // Only depend on the specific replacement
  
  // State with stable initialization
  const [displayedImage, setDisplayedImage] = useState(initialDisplayedImage);
  const [hasDevModeChanges, setHasDevModeChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Prevent duplicate logging and processing
  const shouldLog = useRef(true);
  if (shouldLog.current) {
    console.log('🎯 useImageStateManager initialized:', {
      src: src?.substring(0, 50) + '...' || 'no-src',
      projectId,
      hasPublishedReplacement: !!imageReplacements?.[src],
      initializedRef: initializedRef.current
    });
    shouldLog.current = false;
  }
  
  const { isValidImageUrl, isValidPublishedUrl } = useImageValidation();
  const { loadImageState } = useImageLoader(projectId, isValidImageUrl, isValidPublishedUrl);
  
  // Stable callback for loading image state - memoized to prevent re-creation
  const handleLoadImageState = useCallback(() => {
    if (!mountedRef.current || !src || !projectId || loadingRef.current) {
      return;
    }
    
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
  }, [src, projectId, loadImageState, imageReplacements]); // Removed displayedImage from deps

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

  // Handle published replacement updates - only when the specific replacement changes
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
  }, [imageReplacements?.[src]]); // Only the specific replacement, not displayedImage

  // Initial load effect - only run once when absolutely necessary
  useEffect(() => {
    if (!src || !projectId || imageReplacements?.[src] || initializedRef.current) {
      return;
    }
    
    // Mark as initialized to prevent multiple runs
    initializedRef.current = true;
    
    // Prevent immediate loading if we're already loading
    if (loadingRef.current || isLoading) return;

    const timeoutId = setTimeout(() => {
      if (mountedRef.current && !loadingRef.current) {
        handleLoadImageState();
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [src, projectId]); // Minimal dependencies, no handleLoadImageState

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      initializedRef.current = false;
      shouldLog.current = true;
    };
  }, []);

  // Stable wrapped update function
  const wrappedUpdateDisplayedImage = useCallback((newSrc: string) => {
    if (!mountedRef.current || !newSrc) return;
    updateDisplayedImage(newSrc, isValidImageUrl);
  }, [updateDisplayedImage, isValidImageUrl]);

  // Stable return object
  return useMemo(() => ({
    displayedImage: displayedImage || src || '',
    updateDisplayedImage: wrappedUpdateDisplayedImage,
    forceRefresh,
    hasDevModeChanges,
    isLoading,
    hasError,
    isValidUrl: isValidImageUrl(displayedImage || src || '')
  }), [displayedImage, src, wrappedUpdateDisplayedImage, forceRefresh, hasDevModeChanges, isLoading, hasError, isValidImageUrl]);
};
