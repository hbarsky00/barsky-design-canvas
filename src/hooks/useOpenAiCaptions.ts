
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
      // Construct the full URL for the Supabase edge function
      const functionUrl = `https://ctqttomppgkjbjkckise.supabase.co/functions/v1/generate-image-caption`;
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cXR0b21wcGdramJqa2NraXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Mjg1MzMsImV4cCI6MjA2MDAwNDUzM30.q15G4xYUtQqi7kdlha0C31LaIlYWBqPbIit-e9wq48Q`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cXR0b21wcGdramJqa2NraXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Mjg1MzMsImV4cCI6MjA2MDAwNDUzM30.q15G4xYUtQqi7kdlha0C31LaIlYWBqPbIit-e9wq48Q',
        },
        body: JSON.stringify({ 
          imageSrc,
          contextType: 'project',
          projectContext: projectContext || 'medication management app for diabetic patients - focus on UI/UX elements, user interface design, medication tracking features, and patient-friendly functionality'
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ OpenAI API response error:', response.status, errorText);
        throw new Error(`Failed to generate caption: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        console.error('❌ OpenAI API returned error:', data.error);
        throw new Error(data.error);
      }
      
      if (!data.caption) {
        throw new Error('No caption received from OpenAI API');
      }
      
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
      
      // Skip if already processed or invalid
      if (!imageSrc || captions[imageSrc]) {
        continue;
      }
      
      try {
        setGenerationProgress({ current: i + 1, total: images.length });
        
        const result = await generateCaption(
          imageSrc, 
          'medication management app for diabetic patients - describe the specific UI elements, features, and functionality visible in this interface design'
        );
        
        if (result.caption && !result.error) {
          captions[imageSrc] = result.caption;
          console.log(`✅ Caption generated for image ${i + 1}/${images.length}`);
        } else {
          console.warn(`⚠️ Using fallback caption for image ${i + 1}/${images.length}`);
          captions[imageSrc] = 'Professional medication management interface designed for enhanced patient experience';
        }
        
        // Add delay to avoid overwhelming the API (only if not the last image)
        if (i < images.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`❌ Failed to generate caption for ${imageSrc}:`, error);
        captions[imageSrc] = 'Professional medication management interface designed for enhanced patient experience';
      }
    }
    
    setIsGenerating(false);
    setGenerationProgress(null);
    console.log('✅ OpenAI caption generation complete for project:', projectId, 'Generated:', Object.keys(captions).length, 'captions');
    return captions;
  };

  return {
    generateCaption,
    generateProjectCaptions,
    isGenerating,
    generationProgress
  };
};
