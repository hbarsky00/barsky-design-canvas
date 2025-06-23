
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
    console.log('🤖 OpenAI Caption: Analyzing image:', imageSrc.substring(0, 50) + '...');
    
    try {
      // Construct the full URL for the Supabase edge function
      const functionUrl = `https://ctqttomppgkjbjkckise.supabase.co/functions/v1/generate-image-caption`;
      
      // Enhanced context with uniqueness requirements
      const enhancedContext = projectContext 
        ? `${projectContext}. CRITICAL: Analyze this specific image in detail. Each image is unique and requires a completely different description. Focus on the exact UI elements, features, layouts, text, and functionality visible in THIS particular image. Do not use generic descriptions.`
        : 'App interface - analyze the specific UI elements, features, and functionality visible in this particular image';
      
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
          projectContext: enhancedContext
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
      // Return unique fallback based on image index
      const uniqueFallbacks = [
        'Co-parenting app home screen featuring family-friendly navigation and scheduling tools',
        'Calendar interface designed for coordinating shared parenting schedules and events',
        'Messaging system enabling secure communication between co-parents',
        'Child profile management screen with essential information and updates',
        'Scheduling tool for managing pickup, drop-off, and custody arrangements',
        'Communication hub designed to reduce conflict and improve family coordination',
        'Event planning interface for shared activities and important dates',
        'Document sharing system for important family information and records'
      ];
      
      const fallbackIndex = (imageIndex || 0) % uniqueFallbacks.length;
      return { 
        caption: uniqueFallbacks[fallbackIndex],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const generateProjectCaptions = async (images: string[], projectId: string) => {
    console.log(`🚀 Starting OpenAI caption generation for ${images.length} images in ${projectId}...`);
    
    // Clear existing cache for this project to force regeneration
    images.forEach(imageSrc => {
      delete globalCaptionCache[imageSrc];
    });
    
    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: images.length });
    
    const newCaptions: Record<string, string> = {};
    
    // Set appropriate context based on project
    let projectContext = '';
    if (projectId === 'splittime') {
      projectContext = 'Splittime co-parenting coordination app for separated families - analyze the specific UI elements, family communication features, scheduling tools, conflict reduction interface, child-focused design elements, and co-parent collaboration functionality visible in this particular interface design';
    } else if (projectId === 'barskyjoint') {
      projectContext = 'Barsky Joint food truck and restaurant app - analyze the specific UI elements, mobile ordering features, food truck operations, restaurant management interface, GPS tracking functionality, and customer experience elements visible in this particular image';
    } else if (projectId === 'herbalink') {
      projectContext = 'herbal medicine app for connecting patients with herbalists - analyze the specific UI elements, herbalist discovery features, consultation booking interface, herb recommendation system, and patient-practitioner connection functionality visible in this particular interface design';
    } else {
      projectContext = 'app interface - analyze the specific UI elements, features, and functionality visible in this particular interface design';
    }
    
    for (let i = 0; i < images.length; i++) {
      const imageSrc = images[i];
      
      try {
        setGenerationProgress({ current: i + 1, total: images.length });
        
        // Generate caption with index for uniqueness
        const result = await generateCaption(imageSrc, projectContext, i);
        
        if (result.caption && !result.error) {
          newCaptions[imageSrc] = result.caption;
          globalCaptionCache[imageSrc] = result.caption;
          console.log(`✅ Unique caption generated for image ${i + 1}/${images.length}: ${result.caption.substring(0, 100)}...`);
        } else {
          console.warn(`⚠️ Using fallback caption for image ${i + 1}/${images.length}`);
        }
        
        // Add delay to avoid overwhelming the API
        if (i < images.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`❌ Failed to generate caption for ${imageSrc}:`, error);
      }
    }
    
    setIsGenerating(false);
    setGenerationProgress(null);
    console.log('✅ OpenAI caption generation complete for project:', projectId, 'Generated captions:', Object.keys(newCaptions).length);
    return newCaptions;
  };

  return {
    generateCaption,
    generateProjectCaptions,
    isGenerating,
    generationProgress
  };
};
