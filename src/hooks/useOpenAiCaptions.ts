
import { useState } from 'react';

interface OpenAiCaptionResponse {
  caption: string;
  error?: string;
}

export const useOpenAiCaptions = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<{current: number, total: number} | null>(null);

  const generateCaption = async (imageSrc: string, projectContext?: string): Promise<OpenAiCaptionResponse> => {
    console.log('🤖 OpenAI Caption: Analyzing image for medication app:', imageSrc.substring(0, 50) + '...');
    
    try {
      const response = await fetch('/api/generate-image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          imageSrc,
          contextType: 'project',
          projectContext: projectContext || 'medication management app for diabetic patients - focus on UI/UX elements, user interface design, medication tracking features, and patient-friendly functionality'
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
    }
  };

  const generateProjectCaptions = async (images: string[], projectId: string) => {
    console.log(`🚀 Starting OpenAI caption generation for ${images.length} images in ${projectId}...`);
    
    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: images.length });
    
    const captions: Record<string, string> = {};
    
    for (let i = 0; i < images.length; i++) {
      const imageSrc = images[i];
      try {
        setGenerationProgress({ current: i + 1, total: images.length });
        
        const result = await generateCaption(
          imageSrc, 
          'medication management app for diabetic patients - describe the specific UI elements, features, and functionality visible in this interface design'
        );
        
        if (result.caption && !result.error) {
          captions[imageSrc] = result.caption;
        } else {
          captions[imageSrc] = 'Professional medication management interface designed for enhanced patient experience';
        }
        
        // Add delay to avoid overwhelming the API
        if (i < images.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      } catch (error) {
        console.error(`❌ Failed to generate caption for ${imageSrc}:`, error);
        captions[imageSrc] = 'Professional medication management interface designed for enhanced patient experience';
      }
    }
    
    setIsGenerating(false);
    setGenerationProgress(null);
    console.log('✅ OpenAI caption generation complete for project:', projectId);
    return captions;
  };

  return {
    generateCaption,
    generateProjectCaptions,
    isGenerating,
    generationProgress
  };
};
