
import { useCallback } from 'react';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { PublishingService } from '@/services/publishingService';

export const useImageLoader = (projectId: string, isValidImageUrl: (url: string) => boolean, isValidPublishedUrl: (url: string) => boolean) => {
  const { getChanges } = useDevModeDatabase(projectId);

  const loadImageState = useCallback(async (
    src: string,
    imageReplacements: Record<string, string> | undefined,
    displayedImage: string,
    mountedRef: React.MutableRefObject<boolean>,
    loadingRef: React.MutableRefObject<boolean>,
    setDisplayedImage: (src: string) => void,
    setHasDevModeChanges: (hasChanges: boolean) => void,
    setIsLoading: (loading: boolean) => void,
    setHasError: (error: boolean) => void
  ) => {
    if (!mountedRef.current || !src || !projectId || loadingRef.current) {
      console.log('🔍 Skipping load - component unmounted, missing data, or already loading');
      if (mountedRef.current) {
        setIsLoading(false);
      }
      return;
    }

    // If we already have a published replacement, only check for dev mode overrides
    if (imageReplacements?.[src]) {
      console.log('🔍 Already have published replacement, checking for dev mode changes only');
      
      try {
        const devData = await getChanges();
        const devReplacement = devData?.imageReplacements?.[src];
        
        if (devReplacement && devReplacement !== src && isValidImageUrl(devReplacement) && mountedRef.current) {
          console.log('✅ Found dev mode override for published image:', devReplacement.substring(0, 50) + '...');
          setDisplayedImage(devReplacement);
          setHasDevModeChanges(true);
        }
      } catch (error) {
        console.warn('⚠️ Error checking dev mode changes:', error);
      }
      
      setIsLoading(false);
      return;
    }

    loadingRef.current = true;
    setIsLoading(true);
    setHasError(false);
    
    try {
      console.log('🔍 Loading image state for:', src.substring(0, 50) + '...');
      
      // Check dev mode changes first
      const devData = await getChanges();
      const devReplacement = devData?.imageReplacements?.[src];
      
      if (devReplacement && devReplacement !== src && isValidImageUrl(devReplacement) && mountedRef.current) {
        console.log('✅ Using dev mode replacement:', devReplacement.substring(0, 50) + '...');
        setDisplayedImage(devReplacement);
        setHasDevModeChanges(true);
        setIsLoading(false);
        loadingRef.current = false;
        return;
      }
      
      // Check published data as fallback
      const publishedData = await PublishingService.loadPublishedData(projectId);
      const publishedReplacement = publishedData?.image_replacements?.[src];
      
      if (publishedReplacement && publishedReplacement !== src && mountedRef.current) {
        if (publishedReplacement.startsWith('data:')) {
          console.warn('⚠️ Found data: URL in published content, using original:', publishedReplacement.substring(0, 50) + '...');
          setDisplayedImage(src);
          setHasDevModeChanges(false);
          setIsLoading(false);
        } else if (isValidPublishedUrl(publishedReplacement)) {
          console.log('📄 Using published replacement:', publishedReplacement.substring(0, 50) + '...');
          setDisplayedImage(publishedReplacement);
          setHasDevModeChanges(false);
          setIsLoading(false);
        } else {
          console.warn('⚠️ Invalid published URL format:', publishedReplacement);
          setDisplayedImage(src);
          setHasDevModeChanges(false);
          setIsLoading(false);
        }
      } else if (mountedRef.current) {
        console.log('🖼️ Using original image:', src.substring(0, 50) + '...');
        setDisplayedImage(src);
        setHasDevModeChanges(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('❌ Error loading image state:', error);
      if (mountedRef.current) {
        setDisplayedImage(src);
        setHasDevModeChanges(false);
        setHasError(true);
        setIsLoading(false);
      }
    } finally {
      loadingRef.current = false;
    }
  }, [projectId, getChanges, isValidImageUrl, isValidPublishedUrl]);

  return { loadImageState };
};
