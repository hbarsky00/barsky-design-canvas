
import { useState, useCallback } from 'react';
import { useProjectPersistence } from './useProjectPersistence';

interface UseNewImageCaptionGeneratorProps {
  projectId: string;
}

export const useNewImageCaptionGenerator = ({ projectId }: UseNewImageCaptionGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { saveImageCaption } = useProjectPersistence(projectId);

  const generateCaptionForNewImage = useCallback(async (imageSrc: string): Promise<string | null> => {
    if (!imageSrc || isGenerating) {
      return null;
    }

    setIsGenerating(true);
    console.log('📷 Generating caption for new image:', imageSrc.substring(0, 50) + '...');

    try {
      // Call the edge function to generate caption
      const response = await fetch('/api/generate-image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageSrc,
          contextType: 'project',
          hasProjectContext: true
        }),
      });

      if (!response.ok) {
        console.error('❌ Caption generation failed:', response.status, response.statusText);
        return null;
      }

      const data = await response.json();
      
      if (data.caption) {
        console.log('✅ Caption generated:', data.caption.substring(0, 50) + '...');
        
        // Save to database immediately
        await saveImageCaption(imageSrc, data.caption);
        console.log('💾 Caption saved to database');
        
        return data.caption;
      } else {
        console.error('❌ No caption in response:', data);
        return null;
      }
    } catch (error) {
      console.error('❌ Error generating caption:', error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [projectId, saveImageCaption, isGenerating]);

  return {
    generateCaptionForNewImage,
    isGenerating
  };
};
