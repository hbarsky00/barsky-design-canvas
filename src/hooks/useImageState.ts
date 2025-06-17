
import { useState, useEffect, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [hasError, setHasError] = useState(false);
  const [lastPublishedState, setLastPublishedState] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const loadingRef = useRef(false);
  const mountedRef = useRef(true);
  
  console.log('🔍 useImageState initialized for:', { src: src.substring(0, 50) + '...', projectId });
  
  // Load image with priority: dev mode > published > original
  useEffect(() => {
    if (!mountedRef.current || !src || !projectId) {
      setIsLoading(false);
      return;
    }

    // Prevent concurrent loads
    if (loadingRef.current) {
      return;
    }

    const loadImage = async () => {
      loadingRef.current = true;
      setIsLoading(true);
      setHasError(false);
      
      try {
        console.log('🔍 Loading image state for:', src.substring(0, 50) + '...', 'in project:', projectId);
        
        // First check dev mode changes
        const devData = await getChanges();
        const devReplacement = devData.imageReplacements[src];
        
        if (devReplacement && devReplacement !== src) {
          console.log('✅ Using dev mode replacement for', src.substring(0, 30) + '...');
          if (mountedRef.current) {
            setDisplayedImage(devReplacement);
            setHasDevModeChanges(true);
            setRefreshKey(prev => prev + 1);
          }
          return;
        }
        
        // If no dev mode replacement, check published data
        const publishedData = await PublishingService.loadPublishedData(projectId);
        const publishedReplacement = publishedData?.image_replacements?.[src];
        
        if (publishedReplacement && publishedReplacement !== src) {
          console.log('📄 Using published replacement for', src.substring(0, 30) + '...');
          if (mountedRef.current) {
            setDisplayedImage(publishedReplacement);
            setHasDevModeChanges(false);
            setLastPublishedState(publishedReplacement);
            setRefreshKey(prev => prev + 1);
          }
        } else {
          console.log('🖼️ Using original image:', src.substring(0, 50) + '...');
          if (mountedRef.current) {
            setDisplayedImage(src);
            setHasDevModeChanges(false);
            setLastPublishedState(src);
            setRefreshKey(prev => prev + 1);
          }
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
    };
    
    loadImage();
  }, [src, projectId, getChanges]); // Added getChanges to dependencies

  // Listen for project data updates with debouncing
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
        if (newImageSrc && newImageSrc !== displayedImage) {
          console.log('📄 Immediately applying published image change:', src.substring(0, 30) + '...', '->', newImageSrc.substring(0, 30) + '...');
          setDisplayedImage(newImageSrc);
          setHasDevModeChanges(false);
          setLastPublishedState(newImageSrc);
          setHasError(false);
          setIsLoading(false); // Ensure loading is cleared
          setRefreshKey(prev => prev + 1);
          return;
        }
      }
      
      // Handle other updates with debouncing to prevent queue overflow
      const isRelevant = 
        detail.projectId === projectId || 
        detail.immediate ||
        detail.src === src ||
        detail.imageReplaced;
        
      if (isRelevant && !loadingRef.current) {
        console.log('🔄 Relevant update detected for image:', src.substring(0, 50) + '...', 'scheduling refresh...');
        setHasError(false);
        
        // Clear existing timeout to debounce updates
        if (updateTimeout) {
          clearTimeout(updateTimeout);
        }
        
        // Debounced update to prevent queue overflow
        updateTimeout = setTimeout(async () => {
          if (!mountedRef.current || loadingRef.current) return;
          
          try {
            loadingRef.current = true;
            const devData = await getChanges();
            const devReplacement = devData.imageReplacements[src];
            
            if (devReplacement && devReplacement !== src && mountedRef.current) {
              setDisplayedImage(devReplacement);
              setHasDevModeChanges(true);
              setRefreshKey(prev => prev + 1);
            }
          } catch (error) {
            console.error('Error updating image:', error);
            if (mountedRef.current) {
              setHasError(true);
            }
          } finally {
            loadingRef.current = false;
            // Always clear loading state
            if (mountedRef.current) {
              setIsLoading(false);
            }
          }
        }, 100);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
    };
  }, [src, projectId, displayedImage, getChanges]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const forceRefresh = () => {
    if (!mountedRef.current || loadingRef.current) return;
    
    console.log('🔄 Force refresh triggered for:', src.substring(0, 50) + '...');
    setHasError(false);
    setIsLoading(true); // Set loading when refreshing
    setRefreshKey(prev => prev + 1);
    
    // Reset to original and reload with debouncing
    setTimeout(async () => {
      if (!mountedRef.current || loadingRef.current) return;
      
      try {
        loadingRef.current = true;
        const devData = await getChanges();
        const devReplacement = devData.imageReplacements[src];
        
        if (devReplacement && devReplacement !== src && mountedRef.current) {
          setDisplayedImage(devReplacement);
          setHasDevModeChanges(true);
        } else {
          const publishedData = await PublishingService.loadPublishedData(projectId);
          const publishedReplacement = publishedData?.image_replacements?.[src];
          
          if (publishedReplacement && publishedReplacement !== src && mountedRef.current) {
            setDisplayedImage(publishedReplacement);
            setHasDevModeChanges(false);
          } else if (mountedRef.current) {
            setDisplayedImage(src);
            setHasDevModeChanges(false);
          }
        }
      } catch (error) {
        console.error('Error during force refresh:', error);
        if (mountedRef.current) {
          setDisplayedImage(src);
          setHasError(true);
        }
      } finally {
        loadingRef.current = false;
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    }, 50);
  };

  const updateDisplayedImage = (newSrc: string) => {
    if (!mountedRef.current) return;
    
    console.log('⚡ Immediately updating displayed image from:', src.substring(0, 30) + '...', 'to:', newSrc.substring(0, 30) + '...');
    setDisplayedImage(newSrc);
    setHasDevModeChanges(true);
    setHasError(false);
    setIsLoading(false); // Clear loading when updating image
    setRefreshKey(prev => prev + 1);
  };

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
