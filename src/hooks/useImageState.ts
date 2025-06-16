
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
  
  console.log('🔍 useImageState initialized for:', { src, projectId });
  
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
        console.log('🔍 Loading image state for:', src, 'in project:', projectId);
        
        // First check dev mode changes
        const devData = await getChanges();
        console.log('📦 Dev mode data for', src, ':', devData.imageReplacements[src] ? 'FOUND' : 'NOT FOUND');
        
        const devReplacement = devData.imageReplacements[src];
        
        if (devReplacement) {
          console.log('✅ Using dev mode replacement for', src);
          setDisplayedImage(devReplacement);
          setHasDevModeChanges(true);
          setIsLoading(false);
          return;
        }
        
        // If no dev mode replacement, check published data
        const publishedData = await PublishingService.loadPublishedData(projectId);
        const publishedReplacement = publishedData?.image_replacements?.[src];
        
        if (publishedReplacement) {
          console.log('📄 Using published replacement for', src);
          setDisplayedImage(publishedReplacement);
          setHasDevModeChanges(false);
        } else {
          console.log('🖼️ Using original image:', src);
          setDisplayedImage(src);
          setHasDevModeChanges(false);
        }
      } catch (error) {
        console.error('❌ Error loading image changes for', src, ':', error);
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
      console.log('🔄 Project data update event received:', e.detail);
      
      // Check if this update is relevant to our image
      const isRelevant = 
        e.detail?.projectId === projectId || 
        e.detail?.published || 
        e.detail?.immediate ||
        e.detail?.src === src;
        
      if (isRelevant) {
        console.log('🔄 Relevant update detected for image:', src, 'refreshing...');
        setRefreshKey(prev => prev + 1);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, [src, projectId]);

  const forceRefresh = () => {
    console.log('🔄 Force refresh triggered for:', src);
    setRefreshKey(prev => prev + 1);
  };

  const updateDisplayedImage = (newSrc: string) => {
    console.log('⚡ Immediately updating displayed image to:', newSrc.substring(0, 50) + '...');
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
