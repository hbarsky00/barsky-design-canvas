
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
  const lastLoadedStateRef = useRef<string>('');
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

  // Load and maintain dev mode image state with persistence
  useEffect(() => {
    const loadImageState = async () => {
      if (!projectId || !src || !mountedRef.current) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        console.log('🖼️ useImageStateManager: Loading persistent image state for:', src.substring(0, 50) + '...');
        
        // ALWAYS check dev mode changes FIRST and give them absolute priority
        const devChanges = await getChanges();
        const devReplacement = devChanges.imageReplacements[src];
        
        if (devReplacement && isValidUrl(devReplacement)) {
          console.log('✅ DEV MODE PRIORITY: Using dev image replacement:', devReplacement.substring(0, 50) + '...');
          
          // Only update if this is actually different from current state
          if (devReplacement !== lastLoadedStateRef.current) {
            setDisplayedImage(devReplacement);
            setHasDevModeChanges(true);
            lastLoadedStateRef.current = devReplacement;
          }
        } else {
          // Only fall back if we don't have a dev mode change
          const fallbackReplacement = imageReplacements[src];
          if (fallbackReplacement && isValidUrl(fallbackReplacement)) {
            console.log('📖 Using fallback image replacement:', fallbackReplacement.substring(0, 50) + '...');
            if (fallbackReplacement !== lastLoadedStateRef.current) {
              setDisplayedImage(fallbackReplacement);
              setHasDevModeChanges(false);
              lastLoadedStateRef.current = fallbackReplacement;
            }
          } else {
            console.log('🔄 Using original image:', src.substring(0, 50) + '...');
            if (src !== lastLoadedStateRef.current) {
              setDisplayedImage(src);
              setHasDevModeChanges(false);
              lastLoadedStateRef.current = src;
            }
          }
        }
        
        setHasError(false);
      } catch (error) {
        console.error('❌ useImageStateManager: Error loading image state:', error);
        if (src !== lastLoadedStateRef.current) {
          setDisplayedImage(src);
          setHasDevModeChanges(false);
          lastLoadedStateRef.current = src;
        }
        setHasError(false);
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    };

    loadImageState();
  }, [src, projectId, imageReplacements, getChanges, isValidUrl, forceRefreshKey]);

  // Listen for project updates but be selective about what triggers reloads
  useEffect(() => {
    const handleProjectUpdate = (e: CustomEvent) => {
      if (!mountedRef.current) return;
      
      const detail = e.detail || {};
      
      // Only refresh if this is specifically about images or immediate updates
      if (detail.imageReplaced || detail.immediate || detail.forceRefresh) {
        console.log('🔄 useImageStateManager: Selective refresh triggered by:', detail);
        setForceRefreshKey(prev => prev + 1);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, []);

  // Update displayed image directly for immediate feedback while preserving state
  const updateDisplayedImage = useCallback((newSrc: string) => {
    if (isValidUrl(newSrc) && mountedRef.current) {
      console.log('⚡ useImageStateManager: Immediate image update with persistence:', newSrc.substring(0, 50) + '...');
      setDisplayedImage(newSrc);
      setHasDevModeChanges(true);
      setHasError(false);
      lastLoadedStateRef.current = newSrc;
    }
  }, [isValidUrl]);

  // Force refresh while preserving current state
  const forceRefresh = useCallback(() => {
    if (mountedRef.current) {
      console.log('🔄 useImageStateManager: Force refresh while maintaining state');
      setForceRefreshKey(prev => prev + 1);
      setHasError(false);
    }
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
