
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

  const generateCaption = async (imageSrc: string, projectContext?: string, imageIndex?: number): Promise<OpenAiCaptionResponse> => {
    console.log('🤖 OpenAI Caption: Analyzing image:', imageSrc.substring(0, 50) + '...', 'Index:', imageIndex);
    
    try {
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
          projectContext
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate caption: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error || !result.caption) {
        throw new Error(result.error || 'No caption received');
      }
      
      // Force ultra-short captions on client side too
      let caption = result.caption.trim();
      
      // Remove any formatting or analysis language
      caption = caption.replace(/[#*_`\[\](){}|\\~><@!$%^&+=.,;:?]/g, '');
      
      // If it contains analysis words, replace with simple fallback
      if (caption.toLowerCase().includes('interface') || 
          caption.toLowerCase().includes('analysis') || 
          caption.toLowerCase().includes('overview') ||
          caption.toLowerCase().includes('section') ||
          caption.toLowerCase().includes('functionality') ||
          caption.includes('###') ||
          caption.includes('####')) {
        caption = 'App screen';
      }
      
      // Take only first 3 words
      const words = caption.split(' ').filter(word => word.length > 0);
      caption = words.slice(0, 3).join(' ');
      
      console.log('✅ Short caption received:', caption);
      return { caption };
      
    } catch (error) {
      console.error('❌ Error generating caption:', error);
      
      // Ultra-short fallback captions
      const getShortFallback = (index: number, projectContext: string) => {
        if (projectContext?.includes('investor') || projectContext?.includes('loan')) {
          const fallbacks = ['Loan screen', 'Bank interface', 'Finance view', 'Deal dashboard'];
          return fallbacks[index % fallbacks.length];
        }
        
        if (projectContext?.includes('splittime')) {
          const fallbacks = ['Family app', 'Schedule view', 'Message screen', 'Parent tool'];
          return fallbacks[index % fallbacks.length];
        }
        
        if (projectContext?.includes('spectrum')) {
          const fallbacks = ['Design tool', 'Product view', 'Custom screen', 'Build interface'];
          return fallbacks[index % fallbacks.length];
        }
        
        const genericFallbacks = ['App screen', 'User interface', 'Dashboard view', 'Feature page'];
        return genericFallbacks[index % genericFallbacks.length];
      };
      
      return { 
        caption: getShortFallback(imageIndex || 0, projectContext || ''),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const generateProjectCaptions = async (images: string[], projectId: string, onCaptionGenerated?: (imageSrc: string, caption: string) => void) => {
    console.log(`🚀 Starting short caption generation for ${images.length} images in ${projectId}...`);
    
    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: images.length });
    
    const newCaptions: Record<string, string> = {};
    
    // Set project context for short captions
    let projectContext = `${projectId} app interface - generate 2-3 words MAXIMUM`;
    
    for (let i = 0; i < images.length; i++) {
      const imageSrc = images[i];
      
      try {
        setGenerationProgress({ current: i + 1, total: images.length });
        
        const result = await generateCaption(imageSrc, projectContext, i);
        
        if (result.caption && !result.error) {
          newCaptions[imageSrc] = result.caption;
          globalCaptionCache[imageSrc] = result.caption;
          
          if (onCaptionGenerated) {
            onCaptionGenerated(imageSrc, result.caption);
          }
          
          console.log(`✅ Short caption generated (${i + 1}/${images.length}):`, result.caption);
        }
        
        // Add delay between requests
        if (i < images.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      } catch (error) {
        console.error(`❌ Failed to generate caption for image ${i + 1}:`, error);
      }
    }
    
    setIsGenerating(false);
    setGenerationProgress(null);
    console.log('✅ Short caption generation complete for project:', projectId);
    return newCaptions;
  };

  return {
    generateCaption,
    generateProjectCaptions,
    isGenerating,
    generationProgress
  };
};
