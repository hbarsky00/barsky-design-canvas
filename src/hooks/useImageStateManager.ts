
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { UseImageStateManagerProps, ImageStateManagerReturn } from './image-state/types';
import { useImageValidation } from './image-state/validation';
import { useImageLoader } from './image-state/imageLoader';
import { useImageEventHandlers } from './image-state/eventHandlers';
import { useDevModeDatabase } from './useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';

export const useImageStateManager = ({ src, projectId, imageReplacements }: UseImageStateManagerProps): ImageStateManagerReturn => {
  // Prevent re-initialization by using refs to track if we're already initialized
  const initializedRef = useRef(false);
  const mountedRef = useRef(true);
  const loadingRef = useRef(false);
  
  // Get dev mode database access for real-time updates
  const { getChanges } = useDevModeDatabase(projectId);
  
  // Stable initial state calculation - prioritize dev mode changes over published data
  const initialDisplayedImage = useMemo(() => {
    if (!src) return '';
    return src; // Start with original, let effects handle replacements
  }, [src]);
  
  // State with stable initialization
  const [displayedImage, setDisplayedImage] = useState(initialDisplayedImage);
  const [hasDevModeChanges, setHasDevModeChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [publishedImageSrc, setPublishedImageSrc] = useState<string | null>(null);
  
  // Prevent duplicate logging and processing
  const shouldLog = useRef(true);
  if (shouldLog.current) {
    console.log('🎯 useImageStateManager initialized:', {
      src: src?.substring(0, 50) + '...' || 'no-src',
      projectId,
      hasPublishedReplacement: !!imageReplacements?.[src],
      initialDisplayedImage: initialDisplayedImage?.substring(0, 50) + '...',
      initializedRef: initializedRef.current
    });
    shouldLog.current = false;
  }
  
  const { isValidImageUrl, isValidPublishedUrl } = useImageValidation();
  const { loadImageState } = useImageLoader(projectId, isValidImageUrl, isValidPublishedUrl);
  
  // Load published data on mount and when project changes
  const loadPublishedData = useCallback(async () => {
    if (!src || !projectId) return null;
    
    try {
      const publishedData = await PublishingService.loadPublishedData(projectId);
      const publishedReplacement = publishedData?.image_replacements?.[src];
      
      if (publishedReplacement && publishedReplacement !== src) {
        console.log('📄 Found published replacement for:', src.substring(0, 30) + '...', '->', publishedReplacement.substring(0, 30) + '...');
        setPublishedImageSrc(publishedReplacement);
        return publishedReplacement;
      }
    } catch (error) {
      console.warn('⚠️ Error loading published data:', error);
    }
    
    setPublishedImageSrc(null);
    return null;
  }, [src, projectId]);
  
  // Check for dev mode changes immediately when component mounts - HIGHEST PRIORITY
  const checkDevModeChanges = useCallback(async () => {
    if (!src || !projectId || !mountedRef.current) return false;
    
    try {
      const devChanges = await getChanges();
      const devReplacement = devChanges?.imageReplacements?.[src];
      
      if (devReplacement && devReplacement !== src && isValidImageUrl(devReplacement)) {
        console.log('🔄 Found dev mode replacement (HIGHEST PRIORITY):', src.substring(0, 30) + '...', '->', devReplacement.substring(0, 30) + '...');
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
  
  // Comprehensive image state loading with correct priority order
  const handleLoadImageState = useCallback(async () => {
    if (!mountedRef.current || !src || !projectId || loadingRef.current) {
      return;
    }
    
    loadingRef.current = true;
    setIsLoading(true);
    
    try {
      console.log('🔍 Loading comprehensive image state for:', src.substring(0, 50) + '...');
      
      // PRIORITY 1: Check for dev mode changes (HIGHEST PRIORITY)
      const hasDevChanges = await checkDevModeChanges();
      if (hasDevChanges) {
        console.log('✅ Dev mode changes found - using dev replacement');
        return;
      }
      
      // PRIORITY 2: Check for published data (MEDIUM PRIORITY)
      const publishedReplacement = await loadPublishedData();
      if (publishedReplacement && mountedRef.current) {
        console.log('📄 Using published replacement:', publishedReplacement.substring(0, 50) + '...');
        setDisplayedImage(publishedReplacement);
        setHasDevModeChanges(false);
        setIsLoading(false);
        setHasError(false);
        return;
      }
      
      // PRIORITY 3: Check imageReplacements prop (LOWEST PRIORITY)
      const propReplacement = imageReplacements?.[src];
      if (propReplacement && propReplacement !== src && mountedRef.current) {
        console.log('🔧 Using prop replacement:', propReplacement.substring(0, 50) + '...');
        setDisplayedImage(propReplacement);
        setHasDevModeChanges(false);
        setIsLoading(false);
        setHasError(false);
        return;
      }
      
      // PRIORITY 4: Default to original source
      if (mountedRef.current) {
        console.log('🖼️ Using original source:', src.substring(0, 50) + '...');
        setDisplayedImage(src);
        setHasDevModeChanges(false);
        setIsLoading(false);
        setHasError(false);
      }
      
    } catch (error) {
      console.error('❌ Error in comprehensive image state loading:', error);
      if (mountedRef.current) {
        setDisplayedImage(src);
        setHasDevModeChanges(false);
        setHasError(true);
        setIsLoading(false);
      }
    } finally {
      loadingRef.current = false;
    }
  }, [src, projectId, checkDevModeChanges, loadPublishedData, imageReplacements]);

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

  // Handle immediate prop changes - but only if no dev mode changes exist
  useEffect(() => {
    if (!src || hasDevModeChanges) return;
    
    const propReplacement = imageReplacements?.[src];
    if (propReplacement && propReplacement !== displayedImage) {
      console.log('🔧 Applying immediate prop replacement:', propReplacement.substring(0, 50) + '...');
      setDisplayedImage(propReplacement);
      setIsLoading(false);
      setHasError(false);
    }
  }, [imageReplacements?.[src], hasDevModeChanges, displayedImage, src]);

  // Initial load effect - comprehensive loading
  useEffect(() => {
    if (!src || !projectId || initializedRef.current) {
      return;
    }
    
    // Mark as initialized to prevent multiple runs
    initializedRef.current = true;
    
    // Comprehensive state loading
    const timeoutId = setTimeout(() => {
      if (mountedRef.current && !loadingRef.current) {
        handleLoadImageState();
      }
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, [src, projectId, handleLoadImageState]);

  // Listen for real-time updates with IMMEDIATE response for dev mode changes
  useEffect(() => {
    const handleProjectUpdate = async (e: CustomEvent) => {
      if (!mountedRef.current) return;
      
      const detail = e.detail || {};
      
      // PRIORITY 1: Handle immediate dev mode image replacements (HIGHEST PRIORITY)
      if (detail.src === src && detail.newSrc && detail.immediate && detail.changeType === 'image') {
        console.log('⚡ IMMEDIATE dev mode image update for:', src.substring(0, 30) + '...', '->', detail.newSrc.substring(0, 30) + '...');
        setDisplayedImage(detail.newSrc);
        setHasDevModeChanges(true);
        setHasError(false);
        setIsLoading(false);
        return;
      }
      
      // PRIORITY 2: Handle published changes immediately (HIGH PRIORITY)
      if (detail.published && detail.imageReplacements?.[src]) {
        const newImageSrc = detail.imageReplacements[src];
        console.log('📄 Immediately applying published image change:', newImageSrc.substring(0, 50) + '...');
        setDisplayedImage(newImageSrc);
        setHasDevModeChanges(false);
        setPublishedImageSrc(newImageSrc);
        setHasError(false);
        setIsLoading(false);
        return;
      }
      
      // PRIORITY 3: Handle general image update events
      if (detail.src === src || detail.imageReplaced || (detail.immediate && detail.changeType === 'image')) {
        console.log('🔄 Image update event for our image, reloading state');
        await handleLoadImageState();
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, [src, handleLoadImageState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      initializedRef.current = false;
      shouldLog.current = true;
    };
  }, []);

  // Stable wrapped update function with immediate UI response
  const wrappedUpdateDisplayedImage = useCallback((newSrc: string) => {
    if (!mountedRef.current || !newSrc) return;
    
    console.log('⚡ Immediate image update triggered:', {
      originalSrc: src.substring(0, 30) + '...',
      newSrc: newSrc.substring(0, 30) + '...'
    });
    
    // Immediate UI update with HIGHEST PRIORITY
    setDisplayedImage(newSrc);
    setHasDevModeChanges(true);
    setHasError(false);
    setIsLoading(false);
    
    updateDisplayedImage(newSrc, isValidImageUrl);
  }, [updateDisplayedImage, isValidImageUrl, src]);

  // Stable return object with proper image prioritization
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
