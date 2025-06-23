
import { useState, useEffect } from 'react';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';

export const useProjectAiCaptions = (
  project: ProjectProps,
  details: ProjectDetails,
  projectId: string,
  staticCaptions: Record<string, string> = {}
) => {
  const [finalCaptions, setFinalCaptions] = useState<Record<string, string>>(staticCaptions);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Skip AI caption generation if OpenAI is not properly configured
    // Just use static captions to prevent errors
    console.log('🤖 useProjectAiCaptions: Using static captions only');
    setFinalCaptions(staticCaptions);
    setIsGenerating(false);
  }, [project, details, projectId, staticCaptions]);

  return {
    finalCaptions,
    isGenerating: false // Always false to prevent loading states
  };
};
