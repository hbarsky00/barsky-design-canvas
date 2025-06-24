
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
            ...(details.galleryImages || [])
          ].filter(Boolean)));

          console.log('🖼️ useProjectAiCaptions: Generating captions for', allImages.length, 'images');
          
          const generatedCaptions = await generateProjectCaptions(allImages, projectId);
          
          // Merge static captions with AI-generated ones (AI takes precedence)
          setFinalCaptions({
            ...staticCaptions,
            ...generatedCaptions
          });
          
          console.log('✅ useProjectAiCaptions: AI caption generation complete');
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
