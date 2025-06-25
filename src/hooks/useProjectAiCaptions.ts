
import { useState, useEffect } from 'react';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';
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

  useEffect(() => {
    // ONLY load persisted captions from database - NO AI generation
    const combinedCaptions = { ...staticCaptions };
    
    // Add persisted captions from database
    allImages.forEach(imageSrc => {
      const persistedCaption = getImageCaption(imageSrc);
      if (persistedCaption) {
        combinedCaptions[imageSrc] = persistedCaption;
      }
    });
    
    setFinalCaptions(combinedCaptions);
    
    console.log('📷 Loaded captions from database only:', {
      staticCount: Object.keys(staticCaptions).length,
      persistedCount: Object.keys(combinedCaptions).length - Object.keys(staticCaptions).length,
      totalCount: Object.keys(combinedCaptions).length
    });
  }, [staticCaptions, allImages, getImageCaption]);

  return {
    finalCaptions,
    isGenerating: false, // Never generating - only using saved captions
    captionsGenerated: true // Always true since we only use saved captions
  };
};
