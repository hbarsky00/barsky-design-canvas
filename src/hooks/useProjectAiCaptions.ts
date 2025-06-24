
import { useState, useEffect } from 'react';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';
import { useOpenAiCaptions } from './useOpenAiCaptions';

export const useProjectAiCaptions = (
  project: ProjectProps,
  details: ProjectDetails,
  projectId: string,
  staticCaptions: Record<string, string> = {}
) => {
  const [finalCaptions, setFinalCaptions] = useState<Record<string, string>>(staticCaptions);
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateProjectCaptions } = useOpenAiCaptions();

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
          
          const generatedCaptions = await generateProjectCaptions(allImages, projectId);
          
          // Merge static captions with AI-generated ones (AI takes precedence)
          const updatedCaptions = {
            ...staticCaptions,
            ...generatedCaptions
          };
          
          setFinalCaptions(updatedCaptions);
          
          console.log('✅ useProjectAiCaptions: AI caption generation complete with', Object.keys(generatedCaptions).length, 'new captions');
        } catch (error) {
          console.error('❌ useProjectAiCaptions: Error generating captions:', error);
          // Fall back to static captions
          setFinalCaptions(staticCaptions);
        } finally {
          setIsGenerating(false);
        }
      };

      generateCaptions();
    } else {
      // Use static captions only
      console.log('📝 useProjectAiCaptions: Using static captions only for project:', projectId);
      setFinalCaptions(staticCaptions);
      setIsGenerating(false);
    }
  }, [project, details, projectId, staticCaptions, generateProjectCaptions]);

  return {
    finalCaptions,
    isGenerating
  };
};
