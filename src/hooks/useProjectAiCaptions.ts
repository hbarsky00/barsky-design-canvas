
import { useState, useEffect } from 'react';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';
import { useOneTimeAiCaptions } from './useOneTimeAiCaptions';
import { useProjectPersistence } from './useProjectPersistence';

export const useProjectAiCaptions = (
  project: ProjectProps,
  details: ProjectDetails,
  projectId: string,
  staticCaptions: Record<string, string> = {}
) => {
  const [finalCaptions, setFinalCaptions] = useState<Record<string, string>>(staticCaptions);
  const { getImageCaption } = useProjectPersistence(projectId);

  // Collect all unique images from the project
  const allImages = Array.from(new Set([
    project.image,
    ...(details.availableImages || []),
    ...(details.challengeGalleryImages || []),
    ...(details.resultGalleryImages || []),
    ...(details.processGalleryImages || []),
    ...(details.servicesGalleryImages || []),
    ...(details.galleryImages || []),
    ...(details.imageConfig?.challenge?.beforeHeader ? [details.imageConfig.challenge.beforeHeader] : []),
    ...(details.imageConfig?.challenge?.afterHeader ? [details.imageConfig.challenge.afterHeader] : []),
    ...(details.imageConfig?.process?.beforeHeader ? [details.imageConfig.process.beforeHeader] : []),
    ...(details.imageConfig?.process?.afterHeader ? [details.imageConfig.process.afterHeader] : []),
    ...(details.imageConfig?.result?.beforeHeader ? [details.imageConfig.result.beforeHeader] : []),
    ...(details.imageConfig?.result?.afterHeader ? [details.imageConfig.result.afterHeader] : [])
  ].filter(Boolean)));

  // Use one-time AI caption generation
  const { 
    captions: aiCaptions, 
    isGenerating, 
    captionsGenerated 
  } = useOneTimeAiCaptions({
    projectId,
    images: allImages,
    enabled: details.useAiCaptions
  });

  useEffect(() => {
    // Combine static captions with AI-generated and persisted captions
    const combinedCaptions = { ...staticCaptions };
    
    // Add persisted captions
    allImages.forEach(imageSrc => {
      const persistedCaption = getImageCaption(imageSrc);
      if (persistedCaption) {
        combinedCaptions[imageSrc] = persistedCaption;
      }
    });
    
    // Add AI-generated captions (these override persisted ones)
    Object.entries(aiCaptions).forEach(([imageSrc, caption]) => {
      combinedCaptions[imageSrc] = caption;
    });
    
    setFinalCaptions(combinedCaptions);
    
    console.log('🔄 Updated final captions:', {
      staticCount: Object.keys(staticCaptions).length,
      aiCount: Object.keys(aiCaptions).length,
      totalCount: Object.keys(combinedCaptions).length
    });
  }, [staticCaptions, aiCaptions, allImages, getImageCaption]);

  return {
    finalCaptions,
    isGenerating,
    captionsGenerated
  };
};
