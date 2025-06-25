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
        
        // Enhanced context with unique image identifiers and concise prompts
        const imageFileName = imageSrc.split('/').pop() || '';
        const uniqueImageContext = `${projectContext}. 

CRITICAL INSTRUCTIONS FOR IMAGE #${(imageIndex || 0) + 1}:
- Image filename: ${imageFileName}
- Generate EXACTLY ONE SENTENCE describing the specific UI elements and functionality visible in this image
- Be extremely specific about what makes this screen unique
- Focus on the primary purpose and key visual elements you can see
- Keep it concise but descriptive - maximum 25 words
- Do not use generic descriptions - describe what you actually see in this specific interface`;
        
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
      
      // Ensure caption is one sentence by taking only the first sentence
      let caption = result.caption.trim();
      const firstSentence = caption.split(/[.!?]/)[0];
      if (firstSentence && firstSentence.length > 10) {
        caption = firstSentence + '.';
      }
      
      // Limit to maximum 25 words
      const words = caption.split(' ');
      if (words.length > 25) {
        caption = words.slice(0, 25).join(' ') + '.';
      }
      
      console.log('✅ OpenAI Caption generated successfully for image', (imageIndex || 0) + 1, ':', caption);
      
      return { caption };
    } catch (error) {
      console.error('❌ Error generating OpenAI caption for image', (imageIndex || 0) + 1, ':', error);
      // Return unique fallback based on image index, filename, and project context
      const getUniqueFallback = (index: number, imageSrc: string, projectContext: string) => {
        const imageFileName = imageSrc.split('/').pop() || `image-${index}`;
        const imageId = imageFileName.replace(/\.[^/.]+$/, ""); // Remove extension
        
        if (projectContext.includes('medication') || projectContext.includes('diabetic') || projectContext.includes('health')) {
          const medicationFallbacks = [
            `Medication tracking dashboard for diabetic patients.`,
            `Health monitoring interface with glucose tracking.`,
            `Patient profile management with medical history.`,
            `Appointment scheduling with medication reminders.`,
            `Medical alert system for health notifications.`,
            `Prescription refill management dashboard.`,
            `Health metrics visualization interface.`,
            `Doctor communication portal screen.`,
            `Emergency contact system interface.`
          ];
          return medicationFallbacks[index % medicationFallbacks.length];
        }
        
        // Generic fallbacks with unique identifiers
        const genericFallbacks = [
          `Professional app interface with modern design.`,
          `Interactive dashboard with clean navigation.`,
          `User-friendly platform with streamlined workflow.`,
          `Responsive application screen design.`,
          `Digital interface with modern aesthetics.`,
          `Application screen with professional design.`,
          `Software interface with accessible layout.`,
          `Modern app screen with intuitive design.`
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
      projectContext = 'Medication management app for diabetic patients with prescription tracking and health monitoring.';
    } else if (projectId === 'splittime') {
      projectContext = 'Splittime co-parenting coordination app for separated families with scheduling and communication tools.';
    } else if (projectId === 'barskyjoint') {
      projectContext = 'Barsky Joint food truck and restaurant app with mobile ordering and GPS tracking.';
    } else if (projectId === 'herbalink') {
      projectContext = 'Herbalink herbal medicine app connecting patients with herbalists for consultations.';
    } else if (projectId === 'gold2crypto') {
      projectContext = 'Gold2Crypto cryptocurrency trading platform for traditional investors.';
    } else if (projectId === 'spectrum') {
      projectContext = 'Spectrum Apparel custom clothing design platform with e-commerce features.';
    } else if (projectId === 'dae-search' || projectId === 'daeSearch') {
      projectContext = 'DAE Search enterprise data discovery platform with AI recommendations.';
    } else if (projectId === 'investor-loan-app') {
      projectContext = 'Investor loan management platform for private banking and financial data.';
    } else {
      projectContext = 'Professional app interface with modern design and functionality.';
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
          
          console.log(`✅ Unique caption generated for image ${i + 1}/${images.length}:`, result.caption);
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
