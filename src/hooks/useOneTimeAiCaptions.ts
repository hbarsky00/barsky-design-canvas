
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

  // Check if captions already exist for all images - NEVER regenerate existing captions
  const checkExistingCaptions = useCallback(() => {
    console.log('🔍 Checking existing captions for project:', projectId);
    
    const existingCaptions: Record<string, string> = {};
    let allCaptionsExist = true;
    
    images.forEach(imageSrc => {
      const existingCaption = getImageCaption(imageSrc);
      if (existingCaption) {
        existingCaptions[imageSrc] = existingCaption;
        console.log(`✅ Found existing caption for image:`, imageSrc.substring(0, 50) + '...', existingCaption.substring(0, 50) + '...');
      } else {
        allCaptionsExist = false;
        console.log(`❌ No existing caption found for image:`, imageSrc.substring(0, 50) + '...');
      }
    });
    
    setCaptions(existingCaptions);
    setCaptionsGenerated(allCaptionsExist);
    
    console.log('📊 Caption status:', {
      totalImages: images.length,
      existingCaptions: Object.keys(existingCaptions).length,
      allCaptionsExist,
      missingCaptions: images.length - Object.keys(existingCaptions).length
    });
    
    return allCaptionsExist;
  }, [images, getImageCaption, projectId]);

  // Generate captions ONLY for images that don't have them - NEVER regenerate
  const generateMissingCaptions = useCallback(async () => {
    if (!enabled || captionsGenerated || isGenerating || images.length === 0) {
      console.log('🚫 Skipping caption generation:', { enabled, captionsGenerated, isGenerating, imageCount: images.length });
      return;
    }

    // Only generate captions for images that don't have them
    const imagesToGenerate = images.filter(imageSrc => {
      const hasCaption = !!getImageCaption(imageSrc);
      if (hasCaption) {
        console.log(`⏭️ Skipping image with existing caption:`, imageSrc.substring(0, 50) + '...');
      }
      return !hasCaption;
    });
    
    if (imagesToGenerate.length === 0) {
      console.log('✅ All images already have captions, no generation needed');
      setCaptionsGenerated(true);
      return;
    }

    console.log(`🚀 Starting one-time AI caption generation for ${imagesToGenerate.length} missing captions out of ${images.length} total images`);
    setIsGenerating(true);

    try {
      console.log('📝 Generating unique captions for images without existing captions:', imagesToGenerate.map(img => img.substring(0, 30) + '...'));
      
      const newCaptions = await generateProjectCaptions(
        imagesToGenerate,
        projectId,
        async (imageSrc: string, caption: string) => {
          // Save each caption immediately to prevent regeneration
          console.log('💾 Saving new caption for:', imageSrc.substring(0, 50) + '...', caption.substring(0, 50) + '...');
          await saveImageCaption(imageSrc, caption);
          setCaptions(prev => ({ ...prev, [imageSrc]: caption }));
        }
      );

      // Mark as complete only after all missing captions are generated
      setCaptionsGenerated(true);
      console.log('✅ One-time caption generation complete - Generated', Object.keys(newCaptions).length, 'new unique captions');
      
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
        console.log('🎯 Missing captions detected, starting generation process');
        generateMissingCaptions();
      } else if (allExist) {
        console.log('✅ All captions already exist, no generation needed');
      }
    }
  }, [images, enabled, checkExistingCaptions, generateMissingCaptions, isGenerating]);

  // Force regeneration function (if needed for debugging - but should rarely be used)
  const regenerateAllCaptions = useCallback(async () => {
    console.log('🔄 Force regenerating all captions - this will replace existing ones');
    setCaptionsGenerated(false);
    setCaptions({});
    // Clear persisted captions for regeneration
    for (const imageSrc of images) {
      await saveImageCaption(imageSrc, ''); // Clear existing caption
    }
    await generateMissingCaptions();
  }, [generateMissingCaptions, images, saveImageCaption]);

  return {
    captions,
    isGenerating,
    captionsGenerated,
    regenerateAllCaptions // Only use for debugging
  };
};
