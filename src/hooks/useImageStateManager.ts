
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { UseImageStateManagerProps, ImageStateManagerReturn } from './image-state/types';
import { useImageValidation } from './image-state/validation';
import { useImageReplacement } from '@/context/ImageReplacementContext';

export const useImageStateManager = ({ src, projectId, imageReplacements }: UseImageStateManagerProps): ImageStateManagerReturn => {
  const mountedRef = useRef(true);
  
  // Make image replacement context optional to prevent crashes
  let getReplacedSrc: (src: string) => string;
  let replaceImage: (originalSrc: string, newSrc: string, projectId: string) => void;
  let isReplacing: boolean;

  try {
    const imageReplacementContext = useImageReplacement();
    getReplacedSrc = imageReplacementContext.getReplacedSrc;
    replaceImage = imageReplacementContext.replaceImage;
    isReplacing = imageReplacementContext.isReplacing;
  } catch (error) {
    // Fallback when ImageReplacementProvider is not available
    console.warn('ImageReplacementProvider not available, using fallback behavior');
    getReplacedSrc = (src: string) => src;
    replaceImage = () => {};
    isReplacing = false;
  }

  const { isValidImageUrl } = useImageValidation();
  
  // Get the current displayed image
  const displayedImage = useMemo(() => {
    if (!src) return '';
    
    try {
      // Priority 1: Context replacements (dev mode changes)
      const contextReplacement = getReplacedSrc(src);
      if (contextReplacement !== src) {
        return contextReplacement;
      }
    } catch (error) {
      console.warn('Error getting context replacement:', error);
    }
    
    // Priority 2: Published replacements (passed as props)
    const publishedReplacement = imageReplacements?.[src];
    if (publishedReplacement && publishedReplacement !== src) {
      return publishedReplacement;
    }
    
    // Priority 3: Original source
    return src;
  }, [src, getReplacedSrc, imageReplacements]);

  const [hasError, setHasError] = useState(false);
  const [hasDevModeChanges, setHasDevModeChanges] = useState(false);

  // Update dev mode changes flag when replacement changes
  useEffect(() => {
    try {
      const contextReplacement = getReplacedSrc(src);
      setHasDevModeChanges(contextReplacement !== src);
    } catch (error) {
      setHasDevModeChanges(false);
    }
  }, [src, getReplacedSrc]);

  const updateDisplayedImage = useCallback((newSrc: string) => {
    if (!mountedRef.current || !newSrc || !src || !projectId) return;
    
    console.log('⚡ useImageStateManager: Immediate image replacement:', {
      originalSrc: src.substring(0, 30) + '...',
      newSrc: newSrc.substring(0, 30) + '...'
    });
    
    try {
      replaceImage(src, newSrc, projectId);
    } catch (error) {
      console.warn('Error replacing image:', error);
    }
  }, [src, projectId, replaceImage]);

  const forceRefresh = useCallback(() => {
    if (!mountedRef.current) return;
    console.log('🔄 useImageStateManager: Force refresh triggered for:', src.substring(0, 50) + '...');
    setHasError(false);
  }, [src]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useMemo(() => ({
    displayedImage: displayedImage || src || '',
    updateDisplayedImage,
    forceRefresh,
    hasDevModeChanges,
    isLoading: isReplacing,
    hasError,
    isValidUrl: isValidImageUrl(displayedImage || src || '')
  }), [displayedImage, src, updateDisplayedImage, forceRefresh, hasDevModeChanges, isReplacing, hasError, isValidImageUrl]);
};
