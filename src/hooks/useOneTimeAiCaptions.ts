
import { useState, useEffect, useCallback } from 'react';
import { useOpenAiCaptions } from './useOpenAiCaptions';
import { useProjectPersistence } from './useProjectPersistence';

interface OneTimeAiCaptionsProps {
  projectId: string;
  images: string[];
  enabled?: boolean;
}

export const useOneTimeAiCaptions = ({ 
  projectId, 
  images, 
  enabled = true 
}: OneTimeAiCaptionsProps) => {
  const [captionsGenerated, setCaptionsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [captions, setCaptions] = useState<Record<string, string>>({});
  
  const { generateProjectCaptions } = useOpenAiCaptions();
  const { saveImageCaption, getImageCaption } = useProjectPersistence(projectId);

  // Check if captions already exist for all images
  const checkExistingCaptions = useCallback(() => {
    console.log('🔍 Checking existing captions for project:', projectId);
    
    const existingCaptions: Record<string, string> = {};
    let allCaptionsExist = true;
    
    images.forEach(imageSrc => {
      const existingCaption = getImageCaption(imageSrc);
      if (existingCaption) {
        existingCaptions[imageSrc] = existingCaption;
      } else {
        allCaptionsExist = false;
      }
    });
    
    setCaptions(existingCaptions);
    setCaptionsGenerated(allCaptionsExist);
    
    console.log('📊 Caption status:', {
      totalImages: images.length,
      existingCaptions: Object.keys(existingCaptions).length,
      allCaptionsExist
    });
    
    return allCaptionsExist;
  }, [images, getImageCaption, projectId]);

  // Generate captions for all images at once
  const generateAllCaptions = useCallback(async () => {
    if (!enabled || captionsGenerated || isGenerating || images.length === 0) {
      return;
    }

    console.log('🚀 Starting one-time AI caption generation for', images.length, 'images');
    setIsGenerating(true);

    try {
      // Only generate captions for images that don't have them
      const imagesToGenerate = images.filter(imageSrc => !getImageCaption(imageSrc));
      
      if (imagesToGenerate.length === 0) {
        console.log('✅ All captions already exist, skipping generation');
        setCaptionsGenerated(true);
        setIsGenerating(false);
        return;
      }

      console.log('📝 Generating captions for', imagesToGenerate.length, 'new images');
      
      const newCaptions = await generateProjectCaptions(
        imagesToGenerate,
        projectId,
        async (imageSrc: string, caption: string) => {
          // Save each caption as it's generated
          await saveImageCaption(imageSrc, caption);
          setCaptions(prev => ({ ...prev, [imageSrc]: caption }));
        }
      );

      // Mark as complete
      setCaptionsGenerated(true);
      console.log('✅ One-time caption generation complete');
      
    } catch (error) {
      console.error('❌ Error during one-time caption generation:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [enabled, captionsGenerated, isGenerating, images, generateProjectCaptions, projectId, saveImageCaption, getImageCaption]);

  // Check existing captions on mount and when images change
  useEffect(() => {
    if (images.length > 0) {
      const allExist = checkExistingCaptions();
      if (!allExist && enabled && !isGenerating) {
        generateAllCaptions();
      }
    }
  }, [images, enabled, checkExistingCaptions, generateAllCaptions, isGenerating]);

  // Force regeneration function (if needed)
  const regenerateAllCaptions = useCallback(async () => {
    setCaptionsGenerated(false);
    setCaptions({});
    await generateAllCaptions();
  }, [generateAllCaptions]);

  return {
    captions,
    isGenerating,
    captionsGenerated,
    regenerateAllCaptions
  };
};
