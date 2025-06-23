
import { useEffect, useState } from "react";
import { ProjectDetails } from "@/data/types/project";
import { ProjectProps } from "@/components/ProjectCard";
import { useOpenAiCaptions } from "@/hooks/useOpenAiCaptions";

export const useProjectAiCaptions = (
  project: ProjectProps,
  details: ProjectDetails,
  projectId: string,
  imageCaptions: Record<string, string>
) => {
  const [aiCaptions, setAiCaptions] = useState<Record<string, string>>({});
  const { generateProjectCaptions, isGenerating, generationProgress } = useOpenAiCaptions();

  // Generate AI captions for projects that have useAiCaptions enabled
  useEffect(() => {
    if (details.useAiCaptions) {
      const allImages = [
        project.image,
        ...(details.imageConfig?.challenge?.beforeHeader ? [details.imageConfig.challenge.beforeHeader] : []),
        ...(details.imageConfig?.challenge?.afterHeader ? [details.imageConfig.challenge.afterHeader] : []),
        ...(details.imageConfig?.process?.beforeHeader ? [details.imageConfig.process.beforeHeader] : []),
        ...(details.imageConfig?.process?.afterHeader ? [details.imageConfig.process.afterHeader] : []),
        ...(details.imageConfig?.result?.beforeHeader ? [details.imageConfig.result.beforeHeader] : []),
        ...(details.imageConfig?.result?.afterHeader ? [details.imageConfig.result.afterHeader] : []),
        ...(details.challengeGalleryImages || []),
        ...(details.resultGalleryImages || []),
        ...(details.servicesGalleryImages || []),
        ...(details.processGalleryImages || []),
        ...(details.galleryImages || [])
      ].filter(Boolean);

      const uniqueImages = [...new Set(allImages)];
      
      console.log(`🤖 Generating OpenAI captions for ${projectId} images:`, uniqueImages.length);
      
      generateProjectCaptions(uniqueImages, projectId)
        .then(captions => {
          setAiCaptions(captions);
          console.log(`✅ AI captions generated for ${projectId}:`, Object.keys(captions).length, 'captions');
        })
        .catch(error => {
          console.error('❌ Failed to generate AI captions:', error);
        });
    }
  }, [projectId, details.useAiCaptions, generateProjectCaptions]);

  // Merge manual captions with AI captions (AI captions take priority for projects with useAiCaptions enabled)
  const finalCaptions = details.useAiCaptions 
    ? { ...imageCaptions, ...aiCaptions }
    : imageCaptions;

  return {
    finalCaptions,
    aiCaptions,
    isGenerating,
    generationProgress
  };
};
