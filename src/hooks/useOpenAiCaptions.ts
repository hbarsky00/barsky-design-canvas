
import { useState } from 'react';

interface OpenAiCaptionResponse {
  caption: string;
  error?: string;
}

// Global cache for generated captions to persist across component remounts
const globalCaptionCache: Record<string, string> = {};

export const useOpenAiCaptions = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<{current: number, total: number} | null>(null);

  // Add retry logic with exponential backoff for rate limiting
  const retryWithBackoff = async (fn: () => Promise<any>, maxRetries = 3): Promise<any> => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error: any) {
        if (error.message.includes('429') && i < maxRetries - 1) {
          const delay = Math.pow(2, i) * 2000 + Math.random() * 1000; // 2s, 4s, 8s + jitter
          console.log(`🔄 Rate limited, retrying in ${Math.round(delay/1000)}s...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw error;
      }
    }
  };

  // Function to enforce ULTRA SHORT captions - MAXIMUM 2 words
  const enforceUltraShortCaption = (text: string): string => {
    if (!text) return 'App interface.';
    
    // Remove any markdown formatting and punctuation except periods
    text = text.replace(/[*_`]/g, '').replace(/[^\w\s.]/g, '');
    
    // Take only the first sentence if multiple exist
    const sentences = text.split(/[.!?]+/);
    let caption = sentences[0].trim();
    
    // Limit to MAXIMUM 2 words
    const words = caption.split(/\s+/).filter(word => word.length > 0);
    if (words.length > 2) {
      caption = words.slice(0, 2).join(' ');
    }
    
    // Ensure it ends with a period
    if (!caption.endsWith('.')) {
      caption += '.';
    }
    
    // Clean up multiple spaces
    caption = caption.replace(/\s+/g, ' ').trim();
    
    return caption;
  };

  const generateCaption = async (imageSrc: string, projectContext?: string, imageIndex?: number): Promise<OpenAiCaptionResponse> => {
    console.log('🤖 OpenAI Caption: Analyzing image:', imageSrc.substring(0, 50) + '...', 'Index:', imageIndex);
    
    try {
      const result = await retryWithBackoff(async () => {
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
            projectContext: projectContext || 'App interface'
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ OpenAI API response error:', response.status, errorText);
          throw new Error(`Failed to generate caption: ${response.status} - ${errorText}`);
        }

        return await response.json();
      });
      
      if (result.error) {
        console.error('❌ OpenAI API returned error:', result.error);
        throw new Error(result.error);
      }
      
      if (!result.caption) {
        throw new Error('No caption received from OpenAI API');
      }
      
      // Enforce ULTRA short caption constraint on client side - MAXIMUM 2 words
      const caption = enforceUltraShortCaption(result.caption);
      
      console.log('✅ Ultra short caption generated for image', (imageIndex || 0) + 1, ':', caption);
      
      return { caption };
    } catch (error) {
      console.error('❌ Error generating OpenAI caption for image', (imageIndex || 0) + 1, ':', error);
      
      // Return ULTRA short fallback based on image index - MAXIMUM 2 words
      const getUltraShortFallback = (index: number) => {
        const fallbacks = [
          'App interface.',
          'Dashboard view.',
          'User platform.',
          'App screen.',
          'Interface layout.',
          'Platform view.',
          'Software design.',
          'System screen.'
        ];
        
        return fallbacks[index % fallbacks.length];
      };
      
      return { 
        caption: getUltraShortFallback(imageIndex || 0),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const generateProjectCaptions = async (
    images: string[], 
    projectId: string, 
    onCaptionGenerated?: (imageSrc: string, caption: string) => void
  ) => {
    console.log(`🚀 Starting one-time OpenAI caption generation for ${images.length} images in ${projectId}...`);
    
    // Clear existing cache for this project to force regeneration if needed
    images.forEach(imageSrc => {
      delete globalCaptionCache[imageSrc];
    });
    
    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: images.length });
    
    const newCaptions: Record<string, string> = {};
    
    for (let i = 0; i < images.length; i++) {
      const imageSrc = images[i];
      
      try {
        setGenerationProgress({ current: i + 1, total: images.length });
        
        console.log(`🎯 Processing image ${i + 1}/${images.length}:`, imageSrc.substring(0, 50) + '...');
        
        // Generate caption with ULTRA short constraints - MAXIMUM 2 words
        const result = await generateCaption(imageSrc, projectId, i);
        
        if (result.caption && !result.error) {
          // Double-check caption is ULTRA short on client side - MAXIMUM 2 words
          const cleanedCaption = enforceUltraShortCaption(result.caption);
          newCaptions[imageSrc] = cleanedCaption;
          globalCaptionCache[imageSrc] = cleanedCaption;
          
          // Save to persistence layer immediately to prevent regeneration
          if (onCaptionGenerated) {
            onCaptionGenerated(imageSrc, cleanedCaption);
          }
          
          console.log(`✅ Ultra short caption generated for image ${i + 1}/${images.length}:`, cleanedCaption);
        } else {
          console.warn(`⚠️ Using fallback caption for image ${i + 1}/${images.length}`);
          if (result.caption) {
            const cleanedCaption = enforceUltraShortCaption(result.caption);
            newCaptions[imageSrc] = cleanedCaption;
            if (onCaptionGenerated) {
              onCaptionGenerated(imageSrc, cleanedCaption);
            }
          }
        }
      } catch (error) {
        console.error(`❌ Failed to generate caption for image ${i + 1}: ${imageSrc}:`, error);
      }
    }
    
    setIsGenerating(false);
    setGenerationProgress(null);
    console.log('✅ One-time caption generation complete for project:', projectId, 'Generated captions:', Object.keys(newCaptions).length);
    return newCaptions;
  };

  return {
    generateCaption,
    generateProjectCaptions,
    isGenerating,
    generationProgress
  };
};
