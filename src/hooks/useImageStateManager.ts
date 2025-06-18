
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDevModeDatabase } from './useDevModeDatabase';

interface UseImageStateManagerProps {
  src: string;
  projectId: string;
  imageReplacements?: Record<string, string>;
}

export const useImageStateManager = ({
  src,
  projectId,
  imageReplacements = {}
}: UseImageStateManagerProps) => {
  const [displayedImage, setDisplayedImage] = useState(src);
  const [hasDevModeChanges, setHasDevModeChanges] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [forceRefreshKey, setForceRefreshKey] = useState(0);
  const mountedRef = useRef(true);
  const { getChanges } = useDevModeDatabase(projectId);

  // Check if URL is valid
  const isValidUrl = useCallback((url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    return url.startsWith('data:') || 
           url.startsWith('blob:') || 
           url.startsWith('http://') || 
           url.startsWith('https://') ||
           url.startsWith('/');
  }, []);

  // Load dev mode image replacements with proper priority
  useEffect(() => {
    const loadImageState = async () => {
      if (!projectId || !src || !mountedRef.current) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        console.log('🖼️ useImageStateManager: Loading image state for:', src.substring(0, 50) + '...');
        
        // Check dev mode changes FIRST
        const devChanges = await getChanges();
        const devReplacement = devChanges.imageReplacements[src];
        
        if (devReplacement && isValidUrl(devReplacement)) {
          console.log('✅ Using dev mode image replacement:', devReplacement.substring(0, 50) + '...');
          setDisplayedImage(devReplacement);
          setHasDevModeChanges(true);
        } else {
          // Fall back to passed imageReplacements or original
          const fallbackReplacement = imageReplacements[src];
          if (fallbackReplacement && isValidUrl(fallbackReplacement)) {
            console.log('📖 Using fallback image replacement:', fallbackReplacement.substring(0, 50) + '...');
            setDisplayedImage(fallbackReplacement);
            setHasDevModeChanges(false);
          } else {
            console.log('🔄 Using original image:', src.substring(0, 50) + '...');
            setDisplayedImage(src);
            setHasDevModeChanges(false);
          }
        }
        
        setHasError(false);
      } catch (error) {
        console.error('❌ useImageStateManager: Error loading image state:', error);
        setDisplayedImage(src);
        setHasDevModeChanges(false);
        setHasError(false);
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    };

    loadImageState();
  }, [src, projectId, imageReplacements, getChanges, isValidUrl, forceRefreshKey]);

  // Listen for project updates
  useEffect(() => {
    const handleProjectUpdate = (e: CustomEvent) => {
      if (e.detail?.imageReplaced || e.detail?.immediate) {
        console.log('🔄 useImageStateManager: Project update detected, refreshing image state');
        setForceRefreshKey(prev => prev + 1);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, []);

  // Update displayed image directly (for immediate feedback)
  const updateDisplayedImage = useCallback((newSrc: string) => {
    if (isValidUrl(newSrc)) {
      console.log('⚡ useImageStateManager: Updating displayed image immediately:', newSrc.substring(0, 50) + '...');
      setDisplayedImage(newSrc);
      setHasDevModeChanges(true);
      setHasError(false);
    }
  }, [isValidUrl]);

  // Force refresh
  const forceRefresh = useCallback(() => {
    console.log('🔄 useImageStateManager: Force refreshing image state');
    setForceRefreshKey(prev => prev + 1);
    setHasError(false);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    displayedImage,
    updateDisplayedImage,
    forceRefresh,
    hasDevModeChanges,
    hasError,
    isLoading,
    isValidUrl: isValidUrl(displayedImage)
  };
};
