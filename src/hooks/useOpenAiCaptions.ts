
import { useState } from 'react';

interface OpenAiCaptionResponse {
  caption: string;
  error?: string;
}

export const useOpenAiCaptions = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCaption = async (imageSrc: string, projectContext?: string): Promise<OpenAiCaptionResponse> => {
    setIsGenerating(true);
    
    try {
      console.log('🤖 OpenAI Caption: Analyzing image for medication app:', imageSrc.substring(0, 50) + '...');
      
      const response = await fetch('/api/generate-image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          imageSrc,
          contextType: 'project',
          projectContext: projectContext || 'medication management app for diabetic patients'
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate caption: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ OpenAI Caption generated:', data.caption);
      
      return { caption: data.caption };
    } catch (error) {
      console.error('❌ Error generating OpenAI caption:', error);
      return { 
        caption: 'Professional medication management interface showcasing user-friendly design for diabetic patients',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      setIsGenerating(false);
    }
  };

  const generateProjectCaptions = async (images: string[], projectId: string) => {
    console.log(`🚀 Starting OpenAI caption generation for ${images.length} images in ${projectId}...`);
    
    const captions: Record<string, string> = {};
    
    for (const imageSrc of images) {
      try {
        const result = await generateCaption(imageSrc, 'medication management app for diabetic patients');
        if (result.caption && !result.error) {
          captions[imageSrc] = result.caption;
        }
        
        // Add delay to avoid overwhelming the API
        if (images.length > 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`❌ Failed to generate caption for ${imageSrc}:`, error);
        captions[imageSrc] = 'Professional medication management interface designed for enhanced patient experience';
      }
    }
    
    console.log('✅ OpenAI caption generation complete for project:', projectId);
    return captions;
  };

  return {
    generateCaption,
    generateProjectCaptions,
    isGenerating
  };
};
