
import { useState, useEffect, useCallback } from 'react';
import { useProjectPersistence } from './useProjectPersistence';

interface OneTimeAiCaptionsProps {
  projectId: string;
  images: string[];
  enabled?: boolean;
}

export const useOneTimeAiCaptions = ({ 
  projectId, 
  images, 
  enabled = false // Default to false - no more AI generation
}: OneTimeAiCaptionsProps) => {
  const [captionsGenerated, setCaptionsGenerated] = useState(true); // Always true
  const [isGenerating, setIsGenerating] = useState(false); // Never generating
  const [captions, setCaptions] = useState<Record<string, string>>({});
  
  const { getImageCaption } = useProjectPersistence(projectId);

  // Load existing captions from database only
  const loadExistingCaptions = useCallback(() => {
    console.log('📷 Loading existing captions from database for project:', projectId);
    
    const existingCaptions: Record<string, string> = {};
    
    images.forEach(imageSrc => {
      const existingCaption = getImageCaption(imageSrc);
      if (existingCaption) {
        existingCaptions[imageSrc] = existingCaption;
        console.log(`✅ Found saved caption for image:`, imageSrc.substring(0, 50) + '...', existingCaption.substring(0, 50) + '...');
      }
    });
    
    setCaptions(existingCaptions);
    setCaptionsGenerated(true);
    
    console.log('📊 Caption status (database only):', {
      totalImages: images.length,
      savedCaptions: Object.keys(existingCaptions).length,
      loadedFromDatabase: true
    });
  }, [images, getImageCaption, projectId]);

  // Load existing captions on mount
  useEffect(() => {
    if (images.length > 0) {
      loadExistingCaptions();
    }
  }, [images, loadExistingCaptions]);

  // Disabled regeneration function - only logs warning
  const regenerateAllCaptions = useCallback(async () => {
    console.warn('🚫 Caption regeneration is disabled. Captions are loaded from database only.');
  }, []);

  return {
    captions,
    isGenerating: false, // Never generating
    captionsGenerated: true, // Always true
    regenerateAllCaptions // Disabled function
  };
};
