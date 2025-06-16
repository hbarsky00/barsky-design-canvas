
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
  
  // Check for dev mode changes asynchronously and prioritize them
  useEffect(() => {
    const checkDevModeChanges = async () => {
      try {
        const devData = await getChanges();
        const devReplacement = devData.imageReplacements[src];
        
        if (devReplacement) {
          console.log('useImageState: Using dev mode replacement:', src, '->', devReplacement.substring(0, 50) + '...');
          setDevModeImage(devReplacement);
          setDisplayedImage(devReplacement);
          return;
        }
        
        // If no dev mode replacement, check published data
        const publishedData = getProjectData();
        const publishedReplacement = publishedData.imageReplacements[src];
        
        if (publishedReplacement) {
          console.log('useImageState: Using published replacement:', src, '->', publishedReplacement.substring(0, 50) + '...');
          setDisplayedImage(publishedReplacement);
        } else {
          console.log('useImageState: Using original image:', src);
          setDisplayedImage(src);
        }
        
        setDevModeImage(null);
      } catch (error) {
        console.error('Error loading image changes:', error);
        // Fallback to published or original
        const publishedData = getProjectData();
        const finalSrc = publishedData.imageReplacements[src] || src;
        setDisplayedImage(finalSrc);
        setDevModeImage(null);
      }
    };
    
    checkDevModeChanges();
  }, [src, getChanges, getProjectData, refreshKey]);

  const forceRefresh = () => {
    console.log('useImageState: Force refresh triggered');
    setRefreshKey(prev => prev + 1);
  };

  const updateDisplayedImage = (newSrc: string) => {
    console.log('useImageState: Immediately updating displayed image to:', newSrc);
    setDisplayedImage(newSrc);
    setDevModeImage(newSrc);
  };

  return {
    displayedImage,
    refreshKey,
    forceRefresh,
    updateDisplayedImage,
    hasDevModeChanges: devModeImage !== null
  };
};
