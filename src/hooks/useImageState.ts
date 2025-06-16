
import { useState, useEffect, useMemo } from 'react';
import { useProjectPersistence } from '@/hooks/useProjectPersistence';

interface UseImageStateProps {
  src: string;
  projectId: string;
}

export const useImageState = ({ src, projectId }: UseImageStateProps) => {
  const { getProjectData } = useProjectPersistence(projectId);
  const [refreshKey, setRefreshKey] = useState(0);
  const [displayedImage, setDisplayedImage] = useState(src);
  
  // Get the actual image source with replacements
  const actualImageSrc = useMemo(() => {
    const data = getProjectData();
    const replacedSrc = data.imageReplacements[src] || src;
    console.log('useImageState: Computing image source', { 
      originalSrc: src, 
      replacedSrc, 
      hasReplacement: replacedSrc !== src,
      refreshKey,
      projectId
    });
    return replacedSrc;
  }, [src, getProjectData, refreshKey, projectId]);
  
  // Update displayed image when actual source changes
  useEffect(() => {
    console.log('useImageState: Updating displayed image', { 
      actualImageSrc, 
      displayedImage,
      changed: actualImageSrc !== displayedImage 
    });
    setDisplayedImage(actualImageSrc);
  }, [actualImageSrc]);

  const forceRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const updateDisplayedImage = (newSrc: string) => {
    setDisplayedImage(newSrc);
  };

  return {
    displayedImage,
    refreshKey,
    forceRefresh,
    updateDisplayedImage
  };
};
