
import { useState, useCallback } from 'react';

interface UseDirectImageReplacementProps {
  projectId: string;
  originalSrc: string;
}

export const useDirectImageReplacement = ({ projectId, originalSrc }: UseDirectImageReplacementProps) => {
  // Get initial value from localStorage
  const getStoredImage = () => {
    try {
      const stored = localStorage.getItem(`direct_image_${projectId}_${originalSrc}`);
      return stored || originalSrc;
    } catch {
      return originalSrc;
    }
  };

  const [currentSrc, setCurrentSrc] = useState(getStoredImage);

  const replaceImage = useCallback(async (newSrc: string) => {
    console.log('🔄 Direct image replacement:', originalSrc, '->', newSrc);
    
    // Immediately update the display
    setCurrentSrc(newSrc);
    
    // Save to localStorage for persistence
    try {
      localStorage.setItem(`direct_image_${projectId}_${originalSrc}`, newSrc);
      console.log('✅ Image saved to localStorage successfully');
    } catch (error) {
      console.error('❌ Failed to save to localStorage:', error);
    }
    
    // Force a page refresh to ensure the change sticks
    setTimeout(() => {
      window.location.reload();
    }, 500);
    
  }, [projectId, originalSrc]);

  return {
    currentSrc,
    replaceImage
  };
};
