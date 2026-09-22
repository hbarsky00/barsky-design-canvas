
import { useState, useEffect } from 'react';
import { ProjectProps } from '@/components/ProjectCard';
import { ProjectDetails } from '@/data/types/project';
import { useOpenAiCaptions } from './useOpenAiCaptions';

interface UseProjectAiCaptionsProps {
  project: ProjectProps;
  details: ProjectDetails;
  projectId: string;
  existingCaptions?: Record<string, string>;
}

export const useProjectAiCaptions = (
  project: ProjectProps,
  details: ProjectDetails,
  projectId: string,
  existingCaptions: Record<string, string> = {}
) => {
  const [finalCaptions, setFinalCaptions] = useState<Record<string, string>>(existingCaptions);
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateProjectCaptions } = useOpenAiCaptions();

  useEffect(() => {
    // Only generate captions if AI captions are enabled for this project
    if (!details.useAiCaptions) {
      console.log('🤖 AI captions disabled for project:', projectId);
      setFinalCaptions(existingCaptions);
      return;
    }

    // Collect all images from the project
    const allImages = new Set<string>();
    
    // Add project hero image
    if (project.image) {
      allImages.add(project.image);
    }
    
    // Add images from details
    if (details.availableImages) {
      details.availableImages.forEach(img => allImages.add(img));
    }
    
    if (details.challengeGalleryImages) {
      details.challengeGalleryImages.forEach(img => allImages.add(img));
    }
    
    if (details.resultGalleryImages) {
      details.resultGalleryImages.forEach(img => allImages.add(img));
    }
    
    if (details.processImage) {
      allImages.add(details.processImage);
    }
    
    if (details.processBottomImage) {
      allImages.add(details.processBottomImage);
    }

    const imageArray = Array.from(allImages);
    console.log('🖼️ Found images for caption generation:', imageArray.length);

    // Check if we already have captions for all images
    const missingCaptions = imageArray.filter(img => !existingCaptions[img]);
    
    if (missingCaptions.length === 0) {
      console.log('✅ All images already have captions');
      setFinalCaptions(existingCaptions);
      return;
    }

    console.log('🔄 Need to generate captions for:', missingCaptions.length, 'images');
    
    // Don't block image display - set what we have immediately
    setFinalCaptions(existingCaptions);
    
    // Generate missing captions in background
    const generateMissingCaptions = async () => {
      setIsGenerating(true);
      
      try {
        const newCaptions = await generateProjectCaptions(
          missingCaptions,
          projectId,
          (imageSrc: string, caption: string) => {
            setFinalCaptions(prev => ({
              ...prev,
              [imageSrc]: caption
            }));
          }
        );
        
        // Merge new captions with existing ones
        setFinalCaptions(prev => ({
          ...prev,
          ...newCaptions
        }));
        
      } catch (error) {
        console.error('❌ Error generating AI captions:', error);
        // Continue with existing captions even if generation fails
      } finally {
        setIsGenerating(false);
      }
    };

    // Add a small delay to avoid blocking initial render
    setTimeout(generateMissingCaptions, 100);
    
  }, [projectId, details.useAiCaptions, project.image]);

  return {
    finalCaptions,
    isGenerating
  };
};
