
import { useState } from 'react';

interface AiCaptionResponse {
  caption: string;
  error?: string;
}

export const useAiImageCaptions = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCaption = async (imageSrc: string): Promise<AiCaptionResponse> => {
    setIsGenerating(true);
    
    try {
      console.log('🤖 Requesting AI caption for:', imageSrc);
      
      const response = await fetch('/api/generate-image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageSrc }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate caption');
      }

      const data = await response.json();
      console.log('✅ AI caption received:', data.caption);
      
      return { caption: data.caption };
    } catch (error) {
      console.error('❌ Error generating AI caption:', error);
      return { 
        caption: 'Professional design showcase demonstrating innovative solutions and user-centered approach',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateCaption,
    isGenerating
  };
};
