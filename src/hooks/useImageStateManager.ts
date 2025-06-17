
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { UseImageStateManagerProps, ImageStateManagerReturn } from './image-state/types';
import { useImageValidation } from './image-state/validation';
import { useImageLoader } from './image-state/imageLoader';
import { useImageEventHandlers } from './image-state/eventHandlers';
import { useDevModeDatabase } from './useDevModeDatabase';

export const useImageStateManager = ({ src, projectId, imageReplacements }: UseImageStateManagerProps): ImageStateManagerReturn => {
  // Prevent re-initialization by using refs to track if we're already initialized
  const initializedRef = useRef(false);
  const mountedRef = useRef(true);
  const loadingRef = useRef(false);
  
  // Get dev mode database access for real-time updates
  const { getChanges } = useDevModeDatabase(projectId);
  
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
  
  // Check for dev mode changes immediately when component mounts
  const checkDevModeChanges = useCallback(async () => {
    if (!src || !projectId || !mountedRef.current) return;
    
    try {
      const devChanges = await getChanges();
      const devReplacement = devChanges?.imageReplacements?.[src];
      
      if (devReplacement && devReplacement !== src && isValidImageUrl(devReplacement)) {
        console.log('🔄 Found dev mode replacement:', devReplacement.substring(0, 50) + '...');
        setDisplayedImage(devReplacement);
        setHasDevModeChanges(true);
        setIsLoading(false);
        setHasError(false);
        return true;
      }
    } catch (error) {
      console.warn('⚠️ Error checking dev mode changes:', error);
    }
    
    return false;
  }, [src, projectId, getChanges, isValidImageUrl]);
  
  // Stable callback for loading image state - memoized to prevent re-creation
  const handleLoadImageState = useCallback(async () => {
    if (!mountedRef.current || !src || !projectId || loadingRef.current) {
      return;
    }
    
    // First check for dev mode changes
    const hasDevChanges = await checkDevModeChanges();
    if (hasDevChanges) return;
    
    // If no dev changes, proceed with normal loading
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
  }, [src, projectId, loadImageState, imageReplacements, checkDevModeChanges, displayedImage]);

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

  // Initial load effect - check dev mode changes first, then load other data
  useEffect(() => {
    if (!src || !projectId || initializedRef.current) {
      return;
    }
    
    // Mark as initialized to prevent multiple runs
    initializedRef.current = true;
    
    // Immediate check for dev mode changes
    checkDevModeChanges().then((hasDevChanges) => {
      if (!hasDevChanges && mountedRef.current && !loadingRef.current) {
        // Only do full load if no dev changes found
        const timeoutId = setTimeout(() => {
          if (mountedRef.current && !loadingRef.current) {
            handleLoadImageState();
          }
        }, 100);
        
        return () => clearTimeout(timeoutId);
      }
    });
  }, [src, projectId, checkDevModeChanges, handleLoadImageState]);

  // Listen for real-time dev mode updates
  useEffect(() => {
    const handleProjectUpdate = async (e: CustomEvent) => {
      if (!mountedRef.current) return;
      
      const detail = e.detail || {};
      
      // If this is an image replacement for our specific image, check immediately
      if (detail.src === src || detail.imageReplaced) {
        console.log('🔄 Image replacement event for our image, checking dev mode changes');
        await checkDevModeChanges();
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, [src, checkDevModeChanges]);

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
