
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
      
      // Enhanced context with uniqueness requirements but without explicit numbering
      const enhancedContext = projectContext 
        ? `${projectContext}. IMPORTANT: Analyze this specific image and provide a UNIQUE, detailed description that focuses on the particular UI elements, features, or functionality visible in THIS specific image. Avoid generic descriptions and focus on what makes this image different from others in the project. Describe exactly what you see in this interface.`
        : 'Co-parenting coordination app - focus on UI/UX elements, family communication features, scheduling functionality, conflict reduction tools, and child-focused design elements';
      
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
      return { 
        caption: `Professional co-parenting app interface designed to improve family communication and reduce conflict`,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const generateProjectCaptions = async (images: string[], projectId: string) => {
    console.log(`🚀 Starting OpenAI caption generation for ${images.length} images in ${projectId}...`);
    
    // Filter out images that already have cached captions
    const uncachedImages = images.filter(imageSrc => !globalCaptionCache[imageSrc]);
    
    if (uncachedImages.length === 0) {
      console.log('✅ All images already have cached captions, skipping generation');
      // Return the cached captions for all requested images
      const cachedCaptions: Record<string, string> = {};
      images.forEach(imageSrc => {
        if (globalCaptionCache[imageSrc]) {
          cachedCaptions[imageSrc] = globalCaptionCache[imageSrc];
        }
      });
      return cachedCaptions;
    }
    
    console.log(`📝 Found ${uncachedImages.length} images without cached captions, generating new ones...`);
    
    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: uncachedImages.length });
    
    const newCaptions: Record<string, string> = {};
    
    // Set appropriate context based on project with enhanced uniqueness requirements
    let projectContext = '';
    if (projectId === 'splittime') {
      projectContext = 'co-parenting coordination app for separated families - describe the SPECIFIC UI elements, family communication features, scheduling tools, conflict reduction interface, child-focused design elements, and co-parent collaboration functionality visible in this PARTICULAR interface design. Focus on what makes this screen unique and how it serves families';
    } else if (projectId === 'barskyjoint') {
      projectContext = 'Barsky Joint food truck and restaurant app - analyze and describe the SPECIFIC UI elements, mobile ordering features, food truck operations, restaurant management interface, GPS tracking functionality, and customer experience elements visible in this PARTICULAR image. Focus on what makes this screen/interface unique and different from other app screens';
    } else if (projectId === 'herbalink') {
      projectContext = 'herbal medicine app for connecting patients with herbalists - describe the SPECIFIC UI elements, herbalist discovery features, consultation booking interface, herb recommendation system, and patient-practitioner connection functionality visible in this PARTICULAR interface design. Focus on unique aspects of this screen';
    } else if (projectId === 'medication-app') {
      projectContext = 'medication management app for diabetic patients - describe the SPECIFIC UI elements, features, and functionality visible in this PARTICULAR interface design. Focus on what makes this screen unique';
    } else {
      projectContext = 'app interface - describe the SPECIFIC UI elements, features, and functionality visible in this PARTICULAR interface design. Focus on unique aspects that differentiate this screen from others';
    }
    
    for (let i = 0; i < uncachedImages.length; i++) {
      const imageSrc = uncachedImages[i];
      
      try {
        setGenerationProgress({ current: i + 1, total: uncachedImages.length });
        
        // Generate caption without explicit numbering
        const result = await generateCaption(imageSrc, projectContext);
        
        if (result.caption && !result.error) {
          newCaptions[imageSrc] = result.caption;
          // Cache the generated caption globally
          globalCaptionCache[imageSrc] = result.caption;
          console.log(`✅ Caption generated and cached for image ${i + 1}/${uncachedImages.length}`);
        } else {
          console.warn(`⚠️ Using fallback caption for image ${i + 1}/${uncachedImages.length}`);
          const fallbackCaption = projectId === 'splittime' 
            ? `Professional co-parenting app interface designed to improve family communication and reduce conflict`
            : projectId === 'barskyjoint' 
            ? `Professional food truck and restaurant interface featuring mobile ordering system for enhanced customer experience`
            : projectId === 'herbalink' 
            ? `Professional herbal medicine interface showcasing herbalist discovery and consultation booking features`
            : `Professional app interface designed for enhanced user experience and functionality`;
          newCaptions[imageSrc] = fallbackCaption;
          globalCaptionCache[imageSrc] = fallbackCaption;
        }
        
        // Add delay to avoid overwhelming the API (only if not the last image)
        if (i < uncachedImages.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`❌ Failed to generate caption for ${imageSrc}:`, error);
        const fallbackCaption = projectId === 'splittime' 
          ? `Professional co-parenting app interface designed to improve family communication and reduce conflict`
          : projectId === 'barskyjoint' 
          ? `Professional food truck and restaurant interface featuring mobile ordering system for enhanced customer experience`
          : projectId === 'herbalink' 
          ? `Professional herbal medicine interface showcasing herbalist discovery and consultation booking features`
          : `Professional app interface designed for enhanced user experience and functionality`;
        newCaptions[imageSrc] = fallbackCaption;
        globalCaptionCache[imageSrc] = fallbackCaption;
      }
    }
    
    // Combine new captions with existing cached captions for all requested images
    const allCaptions: Record<string, string> = {};
    images.forEach(imageSrc => {
      if (globalCaptionCache[imageSrc]) {
        allCaptions[imageSrc] = globalCaptionCache[imageSrc];
      }
    });
    
    setIsGenerating(false);
    setGenerationProgress(null);
    console.log('✅ OpenAI caption generation complete for project:', projectId, 'Total cached captions:', Object.keys(globalCaptionCache).length);
    return allCaptions;
  };

  return {
    generateCaption,
    generateProjectCaptions,
    isGenerating,
    generationProgress
  };
};
