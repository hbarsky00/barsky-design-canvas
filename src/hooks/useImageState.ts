
import { useState, useEffect } from 'react';
import { useProjectPersistence } from '@/hooks/useProjectPersistence';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';

interface UseImageStateProps {
  src: string;
  projectId: string;
}

export const useImageState = ({ src, projectId }: UseImageStateProps) => {
  const { getProjectData } = useProjectPersistence(projectId);
  const { getChanges } = useDevModeDatabase(projectId);
  const [refreshKey, setRefreshKey] = useState(0);
  const [displayedImage, setDisplayedImage] = useState(src);
  const [hasDevModeChanges, setHasDevModeChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load image with priority: dev mode > published > original
  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      try {
        console.log('🔍 Loading image state for:', src);
        
        // First check dev mode changes
        const devData = await getChanges();
        const devReplacement = devData.imageReplacements[src];
        
        if (devReplacement) {
          console.log('✅ Using dev mode replacement:', src, '->', devReplacement.substring(0, 50) + '...');
          setDisplayedImage(devReplacement);
          setHasDevModeChanges(true);
          setIsLoading(false);
          return;
        }
        
        // If no dev mode replacement, check published data
        const publishedData = getProjectData();
        const publishedReplacement = publishedData.imageReplacements[src];
        
        if (publishedReplacement) {
          console.log('📄 Using published replacement:', src, '->', publishedReplacement.substring(0, 50) + '...');
          setDisplayedImage(publishedReplacement);
          setHasDevModeChanges(false);
        } else {
          console.log('🖼️ Using original image:', src);
          setDisplayedImage(src);
          setHasDevModeChanges(false);
        }
      } catch (error) {
        console.error('❌ Error loading image changes:', error);
        // Fallback to published or original
        const publishedData = getProjectData();
        const finalSrc = publishedData.imageReplacements[src] || src;
        setDisplayedImage(finalSrc);
        setHasDevModeChanges(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadImage();
  }, [src, getChanges, getProjectData, refreshKey]);

  // Listen for project data updates
  useEffect(() => {
    const handleProjectUpdate = (e: CustomEvent) => {
      if (e.detail?.projectId === projectId) {
        console.log('🔄 Project data updated, refreshing image state for:', src);
        setRefreshKey(prev => prev + 1);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes(`imageOverrides_${projectId}`) && e.newValue) {
        console.log('💾 Storage changed for project:', projectId);
        setRefreshKey(prev => prev + 1);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
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
