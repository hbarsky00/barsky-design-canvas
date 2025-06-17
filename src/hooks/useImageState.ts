
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';

interface UseImageStateProps {
  src: string;
  projectId: string;
}

export const useImageState = ({ src, projectId }: UseImageStateProps) => {
  const { getChanges } = useDevModeDatabase(projectId);
  const [displayedImage, setDisplayedImage] = useState(src);
  const [hasDevModeChanges, setHasDevModeChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [lastPublishedState, setLastPublishedState] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const loadingRef = useRef(false);
  const mountedRef = useRef(true);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  console.log('🔍 useImageState initialized for:', { src: src.substring(0, 50) + '...', projectId });
  
  // Stable callback for loading image state
  const loadImageState = useCallback(async () => {
    if (!mountedRef.current || !src || !projectId || loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setIsLoading(true);
    setHasError(false);
    
    try {
      console.log('🔍 Loading image state for:', src.substring(0, 50) + '...', 'in project:', projectId);
      
      // First check dev mode changes
      const devData = await getChanges();
      const devReplacement = devData.imageReplacements[src];
      
      if (devReplacement && devReplacement !== src && mountedRef.current) {
        console.log('✅ Using dev mode replacement for', src.substring(0, 30) + '...');
        setDisplayedImage(devReplacement);
        setHasDevModeChanges(true);
        setRefreshKey(prev => prev + 1);
        return;
      }
      
      // If no dev mode replacement, check published data
      const publishedData = await PublishingService.loadPublishedData(projectId);
      const publishedReplacement = publishedData?.image_replacements?.[src];
      
      if (publishedReplacement && publishedReplacement !== src && mountedRef.current) {
        console.log('📄 Using published replacement for', src.substring(0, 30) + '...');
        setDisplayedImage(publishedReplacement);
        setHasDevModeChanges(false);
        setLastPublishedState(publishedReplacement);
        setRefreshKey(prev => prev + 1);
      } else if (mountedRef.current) {
        console.log('🖼️ Using original image:', src.substring(0, 50) + '...');
        setDisplayedImage(src);
        setHasDevModeChanges(false);
        setLastPublishedState(src);
        setRefreshKey(prev => prev + 1);
      }
    } catch (error) {
      console.error('❌ Error loading image changes for', src.substring(0, 50) + '...', ':', error);
      if (mountedRef.current) {
        setDisplayedImage(src);
        setHasDevModeChanges(false);
        setHasError(true);
        setRefreshKey(prev => prev + 1);
      }
    } finally {
      loadingRef.current = false;
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [src, projectId, getChanges]);

  // Load image with debouncing to prevent queue overflow
  useEffect(() => {
    if (!mountedRef.current || !src || !projectId) {
      setIsLoading(false);
      return;
    }

    // Clear any existing timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }

    // Debounce the load operation
    loadTimeoutRef.current = setTimeout(() => {
      loadImageState();
    }, 50);

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [loadImageState]);

  // Listen for project data updates with proper debouncing
  useEffect(() => {
    if (!mountedRef.current) return;
    
    let updateTimeout: NodeJS.Timeout;
    
    const handleProjectUpdate = (e: CustomEvent) => {
      if (!mountedRef.current) return;
      
      const detail = e.detail || {};
      console.log('🔄 Project data update event received for image:', src.substring(0, 50) + '...', detail);
      
      // Handle published changes immediately
      if (detail.published && detail.imageReplacements) {
        const newImageSrc = detail.imageReplacements[src];
        if (newImageSrc && newImageSrc !== displayedImage && mountedRef.current) {
          console.log('📄 Immediately applying published image change:', src.substring(0, 30) + '...', '->', newImageSrc.substring(0, 30) + '...');
          setDisplayedImage(newImageSrc);
          setHasDevModeChanges(false);
          setLastPublishedState(newImageSrc);
          setHasError(false);
          setIsLoading(false);
          setRefreshKey(prev => prev + 1);
          return;
        }
      }
      
      // Handle other updates with debouncing
      const isRelevant = 
        detail.projectId === projectId || 
        detail.immediate ||
        detail.src === src ||
        detail.imageReplaced;
        
      if (isRelevant && !loadingRef.current) {
        console.log('🔄 Relevant update detected for image:', src.substring(0, 50) + '...', 'scheduling refresh...');
        setHasError(false);
        
        // Clear existing timeout
        if (updateTimeout) {
          clearTimeout(updateTimeout);
        }
        
        // Debounced update to prevent queue overflow
        updateTimeout = setTimeout(() => {
          if (mountedRef.current && !loadingRef.current) {
            loadImageState();
          }
        }, 150);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
    };
  }, [src, projectId, displayedImage, loadImageState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, []);

  const forceRefresh = useCallback(() => {
    if (!mountedRef.current || loadingRef.current) return;
    
    console.log('🔄 Force refresh triggered for:', src.substring(0, 50) + '...');
    setHasError(false);
    setIsLoading(true);
    setRefreshKey(prev => prev + 1);
    
    // Debounced refresh
    setTimeout(() => {
      if (mountedRef.current && !loadingRef.current) {
        loadImageState();
      }
    }, 100);
  }, [src, loadImageState]);

  const updateDisplayedImage = useCallback((newSrc: string) => {
    if (!mountedRef.current) return;
    
    console.log('⚡ Immediately updating displayed image from:', src.substring(0, 30) + '...', 'to:', newSrc.substring(0, 30) + '...');
    setDisplayedImage(newSrc);
    setHasDevModeChanges(true);
    setHasError(false);
    setIsLoading(false);
    setRefreshKey(prev => prev + 1);
  }, [src]);

  return {
    displayedImage,
    forceRefresh,
    updateDisplayedImage,
    hasDevModeChanges,
    isLoading,
    hasError,
    lastPublishedState,
    refreshKey
  };
};
