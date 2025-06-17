
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
  
  // Stable callback for loading image state
  const loadImageState = useCallback(async () => {
    if (!mountedRef.current || !src || !projectId || loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setIsLoading(true);
    setHasError(false);
    
    try {
      // First check dev mode changes
      const devData = await getChanges();
      const devReplacement = devData.imageReplacements[src];
      
      if (devReplacement && devReplacement !== src && mountedRef.current) {
        setDisplayedImage(devReplacement);
        setHasDevModeChanges(true);
        return;
      }
      
      // If no dev mode replacement, check published data
      const publishedData = await PublishingService.loadPublishedData(projectId);
      const publishedReplacement = publishedData?.image_replacements?.[src];
      
      if (publishedReplacement && publishedReplacement !== src && mountedRef.current) {
        setDisplayedImage(publishedReplacement);
        setHasDevModeChanges(false);
      } else if (mountedRef.current) {
        setDisplayedImage(src);
        setHasDevModeChanges(false);
      }
    } catch (error) {
      console.error('Error loading image state:', error);
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
  }, [src, projectId, getChanges]);

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
      
      // Handle published changes immediately
      if (detail.published && detail.imageReplacements) {
        const newImageSrc = detail.imageReplacements[src];
        if (newImageSrc && newImageSrc !== displayedImage && mountedRef.current) {
          setDisplayedImage(newImageSrc);
          setHasDevModeChanges(false);
          setHasError(false);
          setIsLoading(false);
          return;
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
  }, [src, projectId, displayedImage, loadImageState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const updateDisplayedImage = useCallback((newSrc: string) => {
    if (!mountedRef.current) return;
    
    console.log('⚡ Immediately updating displayed image:', newSrc.substring(0, 50) + '...');
    setDisplayedImage(newSrc);
    setHasDevModeChanges(true);
    setHasError(false);
    setIsLoading(false);
  }, []);

  const forceRefresh = useCallback(() => {
    if (!mountedRef.current || loadingRef.current) return;
    
    setHasError(false);
    setIsLoading(true);
    
    setTimeout(() => {
      if (mountedRef.current && !loadingRef.current) {
        loadImageState();
      }
    }, 100);
  }, [loadImageState]);

  return {
    displayedImage,
    updateDisplayedImage,
    forceRefresh,
    hasDevModeChanges,
    isLoading,
    hasError
  };
};
