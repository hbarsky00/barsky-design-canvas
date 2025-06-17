
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';

interface UseImageStateManagerProps {
  src: string;
  projectId: string;
  imageReplacements?: Record<string, string>;
}

export const useImageStateManager = ({ src, projectId, imageReplacements }: UseImageStateManagerProps) => {
  const { getChanges } = useDevModeDatabase(projectId);
  
  // Immediately resolve the image using published replacements if available
  const initialResolvedImage = imageReplacements?.[src] || src;
  const [displayedImage, setDisplayedImage] = useState(initialResolvedImage);
  const [hasDevModeChanges, setHasDevModeChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Start with false if we have replacements
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
  
  // Validate URL helper - more strict for published content
  const isValidImageUrl = useCallback((url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    // Allow data URLs, blob URLs, and HTTP(S) URLs
    return url.startsWith('data:') || 
           url.startsWith('blob:') || 
           url.startsWith('http://') || 
           url.startsWith('https://') ||
           url.startsWith('/');
  }, []);

  // Validate URL for published content (stricter)
  const isValidPublishedUrl = useCallback((url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    // Only allow HTTP(S) URLs and absolute paths for published content
    return url.startsWith('http://') || 
           url.startsWith('https://') ||
           url.startsWith('/');
  }, []);
  
  // Stable callback for loading image state
  const loadImageState = useCallback(async () => {
    if (!mountedRef.current || !src || !projectId) {
      console.log('🔍 Skipping load - component unmounted or missing data');
      if (mountedRef.current) {
        setIsLoading(false);
        setDisplayedImage(src);
      }
      return;
    }

    if (loadingRef.current) {
      console.log('🔍 Skipping load - already loading');
      return;
    }

    // If we already have a published replacement, skip loading unless it's a dev mode check
    if (imageReplacements?.[src] && displayedImage === imageReplacements[src]) {
      console.log('🔍 Already have published replacement, checking for dev mode changes only');
      
      try {
        const devData = await getChanges();
        const devReplacement = devData?.imageReplacements?.[src];
        
        if (devReplacement && devReplacement !== src && isValidImageUrl(devReplacement) && mountedRef.current) {
          console.log('✅ Found dev mode override for published image:', devReplacement.substring(0, 50) + '...');
          setDisplayedImage(devReplacement);
          setHasDevModeChanges(true);
        }
      } catch (error) {
        console.warn('⚠️ Error checking dev mode changes:', error);
      }
      
      setIsLoading(false);
      return;
    }

    loadingRef.current = true;
    setIsLoading(true);
    setHasError(false);
    
    try {
      console.log('🔍 Loading image state for:', src.substring(0, 50) + '...');
      
      // First check dev mode changes
      const devData = await getChanges();
      const devReplacement = devData?.imageReplacements?.[src];
      
      if (devReplacement && devReplacement !== src && isValidImageUrl(devReplacement) && mountedRef.current) {
        console.log('✅ Using dev mode replacement:', devReplacement.substring(0, 50) + '...');
        setDisplayedImage(devReplacement);
        setHasDevModeChanges(true);
        setIsLoading(false);
        return;
      }
      
      // If no dev mode replacement, check published data (only if not already provided)
      if (!imageReplacements?.[src]) {
        const publishedData = await PublishingService.loadPublishedData(projectId);
        const publishedReplacement = publishedData?.image_replacements?.[src];
        
        if (publishedReplacement && publishedReplacement !== src && mountedRef.current) {
          // Strict validation for published URLs - reject data URLs
          if (publishedReplacement.startsWith('data:')) {
            console.warn('⚠️ Found data: URL in published content, using original:', publishedReplacement.substring(0, 50) + '...');
            setDisplayedImage(src);
            setHasDevModeChanges(false);
            setIsLoading(false);
          } else if (isValidPublishedUrl(publishedReplacement)) {
            console.log('📄 Using published replacement:', publishedReplacement.substring(0, 50) + '...');
            setDisplayedImage(publishedReplacement);
            setHasDevModeChanges(false);
            setIsLoading(false);
          } else {
            console.warn('⚠️ Invalid published URL format:', publishedReplacement);
            setDisplayedImage(src);
            setHasDevModeChanges(false);
            setIsLoading(false);
          }
        } else if (mountedRef.current) {
          console.log('🖼️ Using original image:', src.substring(0, 50) + '...');
          setDisplayedImage(src);
          setHasDevModeChanges(false);
          setIsLoading(false);
        }
      } else {
        // We already have published replacement, just finish loading
        setHasDevModeChanges(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('❌ Error loading image state:', error);
      if (mountedRef.current) {
        setDisplayedImage(src);
        setHasDevModeChanges(false);
        setHasError(true);
        setIsLoading(false);
      }
    } finally {
      loadingRef.current = false;
    }
  }, [src, projectId, getChanges, isValidImageUrl, isValidPublishedUrl, imageReplacements, displayedImage]);

  // Initial load with timeout fallback
  useEffect(() => {
    // If we have a published replacement, we can skip the timeout
    if (imageReplacements?.[src]) {
      console.log('🚀 Using provided published replacement:', imageReplacements[src].substring(0, 50) + '...');
      setDisplayedImage(imageReplacements[src]);
      setIsLoading(false);
      setHasDevModeChanges(false);
      
      // Still check for dev mode overrides
      setTimeout(() => {
        if (mountedRef.current && !loadingRef.current) {
          loadImageState();
        }
      }, 100);
      
      return;
    }

    // For images without published replacements, set a much shorter timeout
    const timeoutId = setTimeout(() => {
      if (isLoading && mountedRef.current) {
        console.warn('⚠️ Image loading timeout, falling back to original');
        setDisplayedImage(src);
        setIsLoading(false);
        setHasError(false);
      }
    }, 2000); // Reduced from 5 seconds to 2 seconds

    loadImageState();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadImageState, imageReplacements, src, isLoading]);

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
  }, [src, projectId, displayedImage, loadImageState, isValidPublishedUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const updateDisplayedImage = useCallback((newSrc: string) => {
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
  }, [src, isValidImageUrl]);

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
  }, [loadImageState, src]);

  return {
    displayedImage,
    updateDisplayedImage,
    forceRefresh,
    hasDevModeChanges,
    isLoading,
    hasError,
    isValidUrl: isValidImageUrl(displayedImage)
  };
};
