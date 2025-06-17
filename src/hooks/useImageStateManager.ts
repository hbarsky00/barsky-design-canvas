
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { UseImageStateManagerProps, ImageStateManagerReturn } from './image-state/types';
import { useImageValidation } from './image-state/validation';
import { useImageReplacement } from '@/context/ImageReplacementContext';

export const useImageStateManager = ({ src, projectId, imageReplacements }: UseImageStateManagerProps): ImageStateManagerReturn => {
  const mountedRef = useRef(true);
  const { getReplacedSrc, replaceImage, isReplacing } = useImageReplacement();
  const { isValidImageUrl } = useImageValidation();
  
  // Get the current displayed image from context
  const displayedImage = useMemo(() => {
    if (!src) return '';
    
    // Priority 1: Context replacements (dev mode changes)
    const contextReplacement = getReplacedSrc(src);
    if (contextReplacement !== src) {
      return contextReplacement;
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
    const contextReplacement = getReplacedSrc(src);
    setHasDevModeChanges(contextReplacement !== src);
  }, [src, getReplacedSrc]);

  const updateDisplayedImage = useCallback((newSrc: string) => {
    if (!mountedRef.current || !newSrc || !src || !projectId) return;
    
    console.log('⚡ useImageStateManager: Immediate image replacement:', {
      originalSrc: src.substring(0, 30) + '...',
      newSrc: newSrc.substring(0, 30) + '...'
    });
    
    replaceImage(src, newSrc, projectId);
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
