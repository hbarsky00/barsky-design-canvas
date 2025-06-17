
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastPublishedState, setLastPublishedState] = useState<string | null>(null);
  const loadingRef = useRef(false);
  const mountedRef = useRef(true);
  
  console.log('🔍 useImageState initialized for:', { src: src.substring(0, 50) + '...', projectId });
  
  // Load image with priority: dev mode > published > original
  useEffect(() => {
    if (!mountedRef.current) return;
    
    const loadImage = async () => {
      if (!src || !projectId || loadingRef.current) {
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
        
        if (devReplacement && devReplacement !== src) {
          console.log('✅ Using dev mode replacement for', src.substring(0, 30) + '...');
          if (mountedRef.current) {
            setDisplayedImage(devReplacement);
            setHasDevModeChanges(true);
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
          }
        } else {
          console.log('🖼️ Using original image:', src.substring(0, 50) + '...');
          if (mountedRef.current) {
            setDisplayedImage(src);
            setHasDevModeChanges(false);
            setLastPublishedState(src);
          }
        }
      } catch (error) {
        console.error('❌ Error loading image changes for', src.substring(0, 50) + '...', ':', error);
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
    };
    
    loadImage();
  }, [src, projectId]); // Removed getChanges from dependencies to prevent infinite loops

  // Listen for project data updates
  useEffect(() => {
    if (!mountedRef.current) return;
    
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
          return;
        }
      }
      
      // Handle other updates with appropriate delays
      const isRelevant = 
        detail.projectId === projectId || 
        detail.immediate ||
        detail.src === src ||
        detail.imageReplaced;
        
      if (isRelevant && !loadingRef.current) {
        console.log('🔄 Relevant update detected for image:', src.substring(0, 50) + '...', 'refreshing...');
        setHasError(false);
        
        // Trigger a reload of image state
        setTimeout(async () => {
          if (!mountedRef.current || loadingRef.current) return;
          
          try {
            loadingRef.current = true;
            const devData = await getChanges();
            const devReplacement = devData.imageReplacements[src];
            
            if (devReplacement && devReplacement !== src) {
              setDisplayedImage(devReplacement);
              setHasDevModeChanges(true);
            }
          } catch (error) {
            console.error('Error updating image:', error);
          } finally {
            loadingRef.current = false;
          }
        }, 100);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
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
    
    // Reset to original and reload
    setTimeout(async () => {
      if (!mountedRef.current) return;
      
      try {
        loadingRef.current = true;
        const devData = await getChanges();
        const devReplacement = devData.imageReplacements[src];
        
        if (devReplacement && devReplacement !== src) {
          setDisplayedImage(devReplacement);
          setHasDevModeChanges(true);
        } else {
          const publishedData = await PublishingService.loadPublishedData(projectId);
          const publishedReplacement = publishedData?.image_replacements?.[src];
          
          if (publishedReplacement && publishedReplacement !== src) {
            setDisplayedImage(publishedReplacement);
            setHasDevModeChanges(false);
          } else {
            setDisplayedImage(src);
            setHasDevModeChanges(false);
          }
        }
      } catch (error) {
        console.error('Error during force refresh:', error);
        setDisplayedImage(src);
        setHasError(true);
      } finally {
        loadingRef.current = false;
      }
    }, 50);
  };

  const updateDisplayedImage = (newSrc: string) => {
    if (!mountedRef.current) return;
    
    console.log('⚡ Immediately updating displayed image from:', src.substring(0, 30) + '...', 'to:', newSrc.substring(0, 30) + '...');
    setDisplayedImage(newSrc);
    setHasDevModeChanges(true);
    setHasError(false);
  };

  return {
    displayedImage,
    forceRefresh,
    updateDisplayedImage,
    hasDevModeChanges,
    isLoading,
    hasError,
    lastPublishedState
  };
};
