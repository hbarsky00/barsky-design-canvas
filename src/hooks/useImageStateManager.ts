
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';

interface UseImageStateManagerProps {
  src: string;
  projectId: string;
}

export const useImageStateManager = ({ src, projectId }: UseImageStateManagerProps) => {
  const { getChanges } = useDevModeDatabase(projectId);
  const [displayedImage, setDisplayedImage] = useState(src);
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
    hasError
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
    if (!mountedRef.current || !src || !projectId || loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setIsLoading(true);
    setHasError(false);
    
    try {
      console.log('🔍 Loading image state for:', src.substring(0, 50) + '...');
      
      // First check dev mode changes
      const devData = await getChanges();
      const devReplacement = devData.imageReplacements[src];
      
      if (devReplacement && devReplacement !== src && isValidImageUrl(devReplacement) && mountedRef.current) {
        console.log('✅ Using dev mode replacement:', devReplacement.substring(0, 50) + '...');
        setDisplayedImage(devReplacement);
        setHasDevModeChanges(true);
        return;
      }
      
      // If no dev mode replacement, check published data
      const publishedData = await PublishingService.loadPublishedData(projectId);
      const publishedReplacement = publishedData?.image_replacements?.[src];
      
      if (publishedReplacement && publishedReplacement !== src && mountedRef.current) {
        // Strict validation for published URLs - reject data URLs
        if (publishedReplacement.startsWith('data:')) {
          console.warn('⚠️ Found data: URL in published content, ignoring:', publishedReplacement.substring(0, 50) + '...');
          setDisplayedImage(src);
          setHasDevModeChanges(false);
        } else if (isValidPublishedUrl(publishedReplacement)) {
          console.log('📄 Using published replacement:', publishedReplacement.substring(0, 50) + '...');
          setDisplayedImage(publishedReplacement);
          setHasDevModeChanges(false);
        } else {
          console.warn('⚠️ Invalid published URL format:', publishedReplacement);
          setDisplayedImage(src);
          setHasDevModeChanges(false);
        }
      } else if (mountedRef.current) {
        console.log('🖼️ Using original image:', src.substring(0, 50) + '...');
        setDisplayedImage(src);
        setHasDevModeChanges(false);
      }
    } catch (error) {
      console.error('❌ Error loading image state:', error);
      if (mountedRef.current) {
        setDisplayedImage(src);
        setHasDevModeChanges(false);
        setHasError(true);
      }
    } finally {
      loadingRef.current = false;
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [src, projectId, getChanges, isValidImageUrl, isValidPublishedUrl]);

  // Initial load
  useEffect(() => {
    loadImageState();
  }, [loadImageState]);

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
