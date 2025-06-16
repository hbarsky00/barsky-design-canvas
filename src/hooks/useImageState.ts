import { useState, useEffect, useMemo } from 'react';
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
  const [devModeImage, setDevModeImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check for dev mode changes asynchronously and prioritize them
  useEffect(() => {
    const checkDevModeChanges = async () => {
      setIsLoading(true);
      try {
        console.log('🔍 Checking dev mode changes for:', src);
        const devData = await getChanges();
        const devReplacement = devData.imageReplacements[src];
        
        if (devReplacement) {
          console.log('✅ Using dev mode replacement:', src, '->', devReplacement.substring(0, 50) + '...');
          setDevModeImage(devReplacement);
          setDisplayedImage(devReplacement);
          setIsLoading(false);
          return;
        }
        
        // If no dev mode replacement, check published data
        const publishedData = getProjectData();
        const publishedReplacement = publishedData.imageReplacements[src];
        
        if (publishedReplacement) {
          console.log('📄 Using published replacement:', src, '->', publishedReplacement.substring(0, 50) + '...');
          setDisplayedImage(publishedReplacement);
        } else {
          console.log('🖼️ Using original image:', src);
          setDisplayedImage(src);
        }
        
        setDevModeImage(null);
      } catch (error) {
        console.error('❌ Error loading image changes:', error);
        // Fallback to published or original
        const publishedData = getProjectData();
        const finalSrc = publishedData.imageReplacements[src] || src;
        setDisplayedImage(finalSrc);
        setDevModeImage(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkDevModeChanges();
  }, [src, getChanges, getProjectData, refreshKey]);

  // Listen for project data updates
  useEffect(() => {
    const handleProjectUpdate = (e: CustomEvent) => {
      if (e.detail?.projectId === projectId && 
          (e.detail?.imageReplaced || e.detail?.immediate)) {
        console.log('🔄 Project data updated, refreshing image state for:', src);
        
        // If this specific image was updated, use the new source immediately
        if (e.detail?.src === src && e.detail?.newSrc) {
          console.log('⚡ Immediate update for specific image:', src, '->', e.detail.newSrc);
          setDisplayedImage(e.detail.newSrc);
          setDevModeImage(e.detail.newSrc);
        } else {
          // Otherwise, trigger a general refresh
          setRefreshKey(prev => prev + 1);
        }
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
    setDevModeImage(newSrc);
  };

  return {
    displayedImage,
    refreshKey,
    forceRefresh,
    updateDisplayedImage,
    hasDevModeChanges: devModeImage !== null,
    isLoading
  };
};
