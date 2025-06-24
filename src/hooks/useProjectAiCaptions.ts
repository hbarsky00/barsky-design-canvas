
import { useState, useEffect } from 'react';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';
import { useOpenAiCaptions } from './useOpenAiCaptions';
import { useProjectPersistence } from './useProjectPersistence';

export const useProjectAiCaptions = (
  project: ProjectProps,
  details: ProjectDetails,
  projectId: string,
  staticCaptions: Record<string, string> = {}
) => {
  const [finalCaptions, setFinalCaptions] = useState<Record<string, string>>(staticCaptions);
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateProjectCaptions } = useOpenAiCaptions();
  const { saveImageCaption, getImageCaption } = useProjectPersistence(projectId);

  useEffect(() => {
    // Only generate AI captions if the project has useAiCaptions enabled
    if (details.useAiCaptions) {
      const generateCaptions = async () => {
        console.log('🤖 useProjectAiCaptions: Starting AI caption generation for project:', projectId);
        setIsGenerating(true);
        
        try {
          // Collect all unique images from the project
          const allImages = Array.from(new Set([
            project.image,
            ...(details.availableImages || []),
            ...(details.challengeGalleryImages || []),
            ...(details.resultGalleryImages || []),
            ...(details.processGalleryImages || []),
            ...(details.servicesGalleryImages || []),
            ...(details.galleryImages || []),
            // Also include images from imageConfig
            ...(details.imageConfig?.challenge?.beforeHeader ? [details.imageConfig.challenge.beforeHeader] : []),
            ...(details.imageConfig?.challenge?.afterHeader ? [details.imageConfig.challenge.afterHeader] : []),
            ...(details.imageConfig?.process?.beforeHeader ? [details.imageConfig.process.beforeHeader] : []),
            ...(details.imageConfig?.process?.afterHeader ? [details.imageConfig.process.afterHeader] : []),
            ...(details.imageConfig?.result?.beforeHeader ? [details.imageConfig.result.beforeHeader] : []),
            ...(details.imageConfig?.result?.afterHeader ? [details.imageConfig.result.afterHeader] : [])
          ].filter(Boolean)));

          console.log('🖼️ useProjectAiCaptions: Generating captions for', allImages.length, 'unique images');
          
          // Check for existing captions from persistence layer
          const existingCaptions: Record<string, string> = {};
          allImages.forEach(imageSrc => {
            const existingCaption = getImageCaption(imageSrc);
            if (existingCaption) {
              existingCaptions[imageSrc] = existingCaption;
            }
          });

          // Only generate captions for images that don't have them
          const imagesToGenerate = allImages.filter(imageSrc => !existingCaptions[imageSrc]);
          
          console.log('📝 Found existing captions for', Object.keys(existingCaptions).length, 'images');
          console.log('🚀 Generating captions for', imagesToGenerate.length, 'new images');

          let generatedCaptions: Record<string, string> = {};
          
          if (imagesToGenerate.length > 0) {
            generatedCaptions = await generateProjectCaptions(
              imagesToGenerate, 
              projectId,
              // Save each caption to persistence layer as it's generated
              async (imageSrc: string, caption: string) => {
                await saveImageCaption(imageSrc, caption);
              }
            );
          }
          
          // Merge static captions, existing captions, and new AI-generated ones
          const updatedCaptions = {
            ...staticCaptions,
            ...existingCaptions,
            ...generatedCaptions
          };
          
          setFinalCaptions(updatedCaptions);
          
          console.log('✅ useProjectAiCaptions: Caption generation complete with', Object.keys(generatedCaptions).length, 'new captions');
        } catch (error) {
          console.error('❌ useProjectAiCaptions: Error generating captions:', error);
          // Fall back to static captions and any existing persisted captions
          const fallbackCaptions = { ...staticCaptions };
          
          // Try to load any existing captions from persistence
          const allImages = Array.from(new Set([
            project.image,
            ...(details.availableImages || [])
          ].filter(Boolean)));
          
          allImages.forEach(imageSrc => {
            const existingCaption = getImageCaption(imageSrc);
            if (existingCaption) {
              fallbackCaptions[imageSrc] = existingCaption;
            }
          });
          
          setFinalCaptions(fallbackCaptions);
        } finally {
          setIsGenerating(false);
        }
      };

      generateCaptions();
    } else {
      // Use static captions and any persisted captions
      console.log('📝 useProjectAiCaptions: Using static captions only for project:', projectId);
      const combinedCaptions = { ...staticCaptions };
      
      // Also load any existing persisted captions
      if (details.availableImages) {
        details.availableImages.forEach(imageSrc => {
          const existingCaption = getImageCaption(imageSrc);
          if (existingCaption) {
            combinedCaptions[imageSrc] = existingCaption;
          }
        });
      }
      
      setFinalCaptions(combinedCaptions);
      setIsGenerating(false);
    }
  }, [project, details, projectId, staticCaptions, generateProjectCaptions, saveImageCaption, getImageCaption]);

  return {
    finalCaptions,
    isGenerating
  };
};
