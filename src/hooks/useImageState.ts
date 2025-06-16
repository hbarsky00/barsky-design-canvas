
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
  
  // Get the actual image source with both published and dev mode replacements
  const actualImageSrc = useMemo(() => {
    // First check published data
    const publishedData = getProjectData();
    const publishedReplacement = publishedData.imageReplacements[src];
    
    if (publishedReplacement) {
      console.log('useImageState: Using published replacement:', src, '->', publishedReplacement);
      return publishedReplacement;
    }
    
    // If no published replacement, check for dev mode changes
    // This will be handled by the effect below for async loading
    return src;
  }, [src, getProjectData, refreshKey, projectId]);
  
  // Check for dev mode changes asynchronously
  useEffect(() => {
    const checkDevModeChanges = async () => {
      try {
        const devData = await getChanges();
        const devReplacement = devData.imageReplacements[src];
        
        if (devReplacement) {
          console.log('useImageState: Using dev mode replacement:', src, '->', devReplacement);
          setDisplayedImage(devReplacement);
        } else {
          // Use published or original
          const publishedData = getProjectData();
          const finalSrc = publishedData.imageReplacements[src] || src;
          setDisplayedImage(finalSrc);
        }
      } catch (error) {
        console.error('Error loading dev mode changes:', error);
        // Fallback to published or original
        const publishedData = getProjectData();
        const finalSrc = publishedData.imageReplacements[src] || src;
        setDisplayedImage(finalSrc);
      }
    };
    
    checkDevModeChanges();
  }, [src, getChanges, getProjectData, refreshKey]);
  
  // Update displayed image when actual source changes
  useEffect(() => {
    console.log('useImageState: Updating displayed image', { 
      actualImageSrc, 
      displayedImage,
      changed: actualImageSrc !== displayedImage 
    });
    if (actualImageSrc !== displayedImage) {
      setDisplayedImage(actualImageSrc);
    }
  }, [actualImageSrc]);

  const forceRefresh = () => {
    console.log('useImageState: Force refresh triggered');
    setRefreshKey(prev => prev + 1);
  };

  const updateDisplayedImage = (newSrc: string) => {
    console.log('useImageState: Immediately updating displayed image to:', newSrc);
    setDisplayedImage(newSrc);
  };

  return {
    displayedImage,
    refreshKey,
    forceRefresh,
    updateDisplayedImage
  };
};
