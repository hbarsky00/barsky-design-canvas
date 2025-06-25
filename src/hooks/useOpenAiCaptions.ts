
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

  const generateCaption = async (imageSrc: string, projectContext?: string, imageIndex?: number): Promise<OpenAiCaptionResponse> => {
    console.log('🤖 OpenAI Caption: Analyzing image:', imageSrc.substring(0, 50) + '...', 'Index:', imageIndex);
    
    try {
      const result = await retryWithBackoff(async () => {
        const functionUrl = `https://ctqttomppgkjbjkckise.supabase.co/functions/v1/generate-image-caption`;
        
        // Enhanced context with unique image identifiers and specific prompts
        const imageFileName = imageSrc.split('/').pop() || '';
        const uniqueImageContext = `${projectContext}. 

CRITICAL INSTRUCTIONS FOR IMAGE #${(imageIndex || 0) + 1}:
- Image filename: ${imageFileName}
- This is a UNIQUE image that requires a COMPLETELY DIFFERENT description from all other images
- Analyze the SPECIFIC UI elements, features, text, buttons, layouts, and functionality visible in THIS PARTICULAR image
- Focus on what makes this screen/interface UNIQUE and DIFFERENT from other app screens
- Describe the exact visual elements you can see: specific text, colors, icons, navigation elements, content areas
- DO NOT use generic descriptions - be extremely specific about what you observe in this exact image
- Each image must have a completely unique caption that describes its specific purpose and visual elements
- Provide a detailed, professional description suitable for a UX/UI portfolio that highlights the unique design and functionality visible in this exact image`;
        
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
            projectContext: uniqueImageContext
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
      
      console.log('✅ OpenAI Caption generated successfully for image', (imageIndex || 0) + 1, ':', result.caption.substring(0, 100) + '...');
      
      return { caption: result.caption };
    } catch (error) {
      console.error('❌ Error generating OpenAI caption for image', (imageIndex || 0) + 1, ':', error);
      // Return unique fallback based on image index, filename, and project context
      const getUniqueFallback = (index: number, imageSrc: string, projectContext: string) => {
        const imageFileName = imageSrc.split('/').pop() || `image-${index}`;
        const imageId = imageFileName.replace(/\.[^/.]+$/, ""); // Remove extension
        
        if (projectContext.includes('medication') || projectContext.includes('diabetic') || projectContext.includes('health')) {
          const medicationFallbacks = [
            `Medication tracking dashboard showing daily prescription management for diabetic patients - Image: ${imageId}`,
            `Health monitoring interface with glucose level tracking and medication reminders - Image: ${imageId}`,
            `Patient profile management screen with medical history and prescription details - Image: ${imageId}`,
            `Appointment scheduling interface integrated with medication management system - Image: ${imageId}`,
            `Medical alert system displaying medication notifications and health warnings - Image: ${imageId}`,
            `Prescription refill management dashboard with pharmacy integration - Image: ${imageId}`,
            `Health metrics visualization showing medication adherence and glucose trends - Image: ${imageId}`,
            `Doctor communication portal within the medication management app - Image: ${imageId}`,
            `Emergency contact system for diabetes-related medical situations - Image: ${imageId}`
          ];
          return medicationFallbacks[index % medicationFallbacks.length];
        }
        
        // Generic fallbacks with unique identifiers
        const genericFallbacks = [
          `Professional app interface with modern UI design and user-focused functionality - Image: ${imageId}`,
          `Interactive dashboard featuring clean navigation and accessible design elements - Image: ${imageId}`,
          `User-friendly platform interface with streamlined workflow and intuitive controls - Image: ${imageId}`,
          `Responsive application screen showcasing professional UX/UI design principles - Image: ${imageId}`,
          `Digital interface with modern aesthetics and enhanced user experience features - Image: ${imageId}`,
          `Application screen demonstrating best practices in interface design - Image: ${imageId}`,
          `Professional software interface with clean, accessible design methodology - Image: ${imageId}`,
          `Modern app screen featuring intuitive navigation and user-centered design - Image: ${imageId}`
        ];
        
        return genericFallbacks[index % genericFallbacks.length];
      };
      
      return { 
        caption: getUniqueFallback(imageIndex || 0, imageSrc, projectContext || ''),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const generateProjectCaptions = async (
    images: string[], 
    projectId: string, 
    onCaptionGenerated?: (imageSrc: string, caption: string) => void
  ) => {
    console.log(`🚀 Starting one-time OpenAI caption generation for ${images.length} unique images in ${projectId}...`);
    
    // Clear existing cache for this project to force regeneration if needed
    images.forEach(imageSrc => {
      delete globalCaptionCache[imageSrc];
    });
    
    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: images.length });
    
    const newCaptions: Record<string, string> = {};
    
    // Set specific project context for better caption generation
    let projectContext = '';
    if (projectId === 'medication-app') {
      projectContext = 'Medication management app for diabetic patients featuring prescription tracking, glucose monitoring, appointment scheduling, and health management tools. Analyze the specific UI elements, medical interface components, patient-focused design, medication tracking features, health monitoring displays, and clinical workflow functionality visible in this particular interface design. Each screen serves a unique medical purpose.';
    } else if (projectId === 'splittime') {
      projectContext = 'Splittime co-parenting coordination app for separated families - analyze the specific UI elements, family communication features, scheduling tools, conflict reduction interface, child-focused design elements, and co-parent collaboration functionality visible in this particular interface design. Focus on co-parenting and family coordination features. Each image shows a different aspect of the app.';
    } else if (projectId === 'barskyjoint') {
      projectContext = 'Barsky Joint food truck and restaurant app - analyze the specific UI elements, mobile ordering features, food truck operations, restaurant management interface, GPS tracking functionality, and customer experience elements visible in this particular image. Each screen serves a different purpose.';
    } else if (projectId === 'herbalink') {
      projectContext = 'Herbalink herbal medicine app for connecting patients with herbalists - analyze the specific UI elements, herbalist discovery features, consultation booking interface, herb recommendation system, and patient-practitioner connection functionality visible in this particular interface design. Each interface has unique functionality.';
    } else if (projectId === 'gold2crypto') {
      projectContext = 'Gold2Crypto cryptocurrency trading platform for traditional investors - analyze the specific UI elements, trading features, portfolio management, market analysis tools, and investor onboarding functionality visible in this particular interface.';
    } else if (projectId === 'spectrum') {
      projectContext = 'Spectrum Apparel custom clothing design platform - analyze the specific UI elements, design tools, e-commerce features, customization options, and accessibility features visible in this particular interface.';
    } else if (projectId === 'dae-search' || projectId === 'daeSearch') {
      projectContext = 'DAE Search enterprise data discovery platform - analyze the specific UI elements, search functionality, data catalog features, AI recommendations, and business intelligence tools visible in this particular interface.';
    } else if (projectId === 'investor-loan-app') {
      projectContext = 'Investor loan management platform for private banking - analyze the specific UI elements, loan processing features, financial data management, banking workflows, and investment tracking functionality visible in this particular interface.';
    } else {
      projectContext = 'Professional app interface - analyze the specific UI elements, features, and functionality visible in this particular interface design. Each screen is unique and serves different purposes.';
    }
    
    for (let i = 0; i < images.length; i++) {
      const imageSrc = images[i];
      
      try {
        setGenerationProgress({ current: i + 1, total: images.length });
        
        console.log(`🎯 Processing unique image ${i + 1}/${images.length}:`, imageSrc.substring(0, 50) + '...');
        
        // Generate caption with enhanced uniqueness context
        const result = await generateCaption(imageSrc, projectContext, i);
        
        if (result.caption && !result.error) {
          newCaptions[imageSrc] = result.caption;
          globalCaptionCache[imageSrc] = result.caption;
          
          // Save to persistence layer immediately to prevent regeneration
          if (onCaptionGenerated) {
            onCaptionGenerated(imageSrc, result.caption);
          }
          
          console.log(`✅ Unique caption generated for image ${i + 1}/${images.length}:`, result.caption.substring(0, 80) + '...');
        } else {
          console.warn(`⚠️ Using fallback caption for image ${i + 1}/${images.length}`);
          if (result.caption) {
            newCaptions[imageSrc] = result.caption;
            if (onCaptionGenerated) {
              onCaptionGenerated(imageSrc, result.caption);
            }
          }
        }
        
        // Add progressive delay to avoid overwhelming the API and ensure uniqueness
        if (i < images.length - 1) {
          const delay = 4000 + (i * 1000); // Start with 4s, increase by 1s each time for better API spacing
          console.log(`⏳ Waiting ${delay/1000}s before processing next unique image...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error(`❌ Failed to generate caption for image ${i + 1}: ${imageSrc}:`, error);
      }
    }
    
    setIsGenerating(false);
    setGenerationProgress(null);
    console.log('✅ One-time unique caption generation complete for project:', projectId, 'Generated captions:', Object.keys(newCaptions).length);
    return newCaptions;
  };

  return {
    generateCaption,
    generateProjectCaptions,
    isGenerating,
    generationProgress
  };
};
