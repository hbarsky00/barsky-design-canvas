
import { useState, useEffect } from 'react';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';

interface UseImageStateProps {
  src: string;
  projectId: string;
}

export const useImageState = ({ src, projectId }: UseImageStateProps) => {
  const { getChanges } = useDevModeDatabase(projectId);
  const [refreshKey, setRefreshKey] = useState(0);
  const [displayedImage, setDisplayedImage] = useState(src);
  const [hasDevModeChanges, setHasDevModeChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  console.log('🔍 useImageState initialized for:', { src: src.substring(0, 50) + '...', projectId });
  
  // Load image with priority: dev mode > published > original
  useEffect(() => {
    const loadImage = async () => {
      if (!src || !projectId) {
        console.log('⚠️ useImageState: Missing src or projectId, using original:', src);
        setDisplayedImage(src);
        setHasDevModeChanges(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log('🔍 Loading image state for:', src.substring(0, 50) + '...', 'in project:', projectId);
        
        // First check dev mode changes
        const devData = await getChanges();
        console.log('📦 Dev mode data for', src.substring(0, 50) + '...', ':', devData.imageReplacements[src] ? 'FOUND' : 'NOT FOUND');
        
        const devReplacement = devData.imageReplacements[src];
        
        if (devReplacement && devReplacement !== src) {
          console.log('✅ Using dev mode replacement for', src.substring(0, 30) + '...');
          setDisplayedImage(devReplacement);
          setHasDevModeChanges(true);
          setIsLoading(false);
          return;
        }
        
        // If no dev mode replacement, check published data
        const publishedData = await PublishingService.loadPublishedData(projectId);
        const publishedReplacement = publishedData?.image_replacements?.[src];
        
        if (publishedReplacement && publishedReplacement !== src) {
          console.log('📄 Using published replacement for', src.substring(0, 30) + '...');
          setDisplayedImage(publishedReplacement);
          setHasDevModeChanges(false);
        } else {
          console.log('🖼️ Using original image:', src.substring(0, 50) + '...');
          setDisplayedImage(src);
          setHasDevModeChanges(false);
        }
      } catch (error) {
        console.error('❌ Error loading image changes for', src.substring(0, 50) + '...', ':', error);
        // Fallback to original
        setDisplayedImage(src);
        setHasDevModeChanges(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadImage();
  }, [src, getChanges, projectId, refreshKey]);

  // Listen for project data updates with more specific handling
  useEffect(() => {
    const handleProjectUpdate = (e: CustomEvent) => {
      console.log('🔄 Project data update event received for image:', src.substring(0, 50) + '...', e.detail);
      
      // Check if this update is relevant to our image or is a general update
      const isRelevant = 
        e.detail?.projectId === projectId || 
        e.detail?.published || 
        e.detail?.immediate ||
        e.detail?.src === src ||
        e.detail?.imageReplaced; // Added this check
        
      if (isRelevant) {
        console.log('🔄 Relevant update detected for image:', src.substring(0, 50) + '...', 'refreshing...');
        // Add a small delay to ensure database is updated
        setTimeout(() => {
          setRefreshKey(prev => prev + 1);
        }, 100);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, [src, projectId]);

  const forceRefresh = () => {
    console.log('🔄 Force refresh triggered for:', src.substring(0, 50) + '...');
    setRefreshKey(prev => prev + 1);
  };

  const updateDisplayedImage = (newSrc: string) => {
    console.log('⚡ Immediately updating displayed image from:', src.substring(0, 30) + '...', 'to:', newSrc.substring(0, 30) + '...');
    setDisplayedImage(newSrc);
    setHasDevModeChanges(true);
  };

  return {
    displayedImage,
    refreshKey,
    forceRefresh,
    updateDisplayedImage,
    hasDevModeChanges,
    isLoading
  };
};
