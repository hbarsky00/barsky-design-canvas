
import { useState } from 'react';

interface OpenAiCaptionResponse {
  caption: string;
  error?: string;
}

export const useOpenAiCaptions = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<{current: number, total: number} | null>(null);

  const generateCaption = async (imageSrc: string, projectContext?: string, imageIndex?: number): Promise<OpenAiCaptionResponse> => {
    console.log('🤖 OpenAI Caption: Analyzing image:', imageSrc.substring(0, 50) + '...', 'Project:', projectContext);
    
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
      
      let caption = result.caption.trim();
      
      console.log('✅ AI Caption received:', caption);
      return { caption };
      
    } catch (error) {
      console.error('❌ Error generating caption:', error);
      
      return { 
        caption: getSplitTimeSpecificFallback(imageIndex || 0, projectContext || ''),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const getSplitTimeSpecificFallback = (index: number, projectContext: string) => {
    if (projectContext?.includes('splittime')) {
      const fallbacks = [
        'Co-parenting dashboard showing family coordination features',
        'Child wellbeing tracking interface with activity updates',
        'Family calendar displaying custody schedule and events',
        'Parent communication screen for coordinating child activities',
        'Child profile management with health and activity information',
        'Family notifications panel showing upcoming events and alerts',
        'Co-parenting mobile view showing dashboard and child wellbeing',
        'Parent coordination interface with notification alerts'
      ];
      return fallbacks[index % fallbacks.length];
    }
    
    if (projectContext?.includes('herbalink')) {
      const fallbacks = [
        'Herbal medicine consultation interface',
        'Practitioner discovery screen',
        'Wellness tracking dashboard',
        'Natural health app interface'
      ];
      return fallbacks[index % fallbacks.length];
    }
    
    if (projectContext?.includes('investor') || projectContext?.includes('loan')) {
      const fallbacks = [
        'Financial investment dashboard',
        'Loan management interface',
        'Banking application screen',
        'Investment portfolio view'
      ];
      return fallbacks[index % fallbacks.length];
    }
    
    const genericFallbacks = [
      'Application dashboard interface',
      'User interface screen',
      'Software application view',
      'Digital platform interface'
    ];
    return genericFallbacks[index % genericFallbacks.length];
  };

  const generateProjectCaptions = async (images: string[], projectId: string, onCaptionGenerated?: (imageSrc: string, caption: string) => void) => {
    console.log(`🚀 Starting caption generation for ${images.length} images in ${projectId}...`);
    
    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: images.length });
    
    const newCaptions: Record<string, string> = {};
    
    // Enhanced project context for SplitTime
    let projectContext = `${projectId} application interface`;
    if (projectId === 'splittime') {
      projectContext = 'splittime co-parenting family coordination app';
    }
    
    for (let i = 0; i < images.length; i++) {
      const imageSrc = images[i];
      
      try {
        setGenerationProgress({ current: i + 1, total: images.length });
        
        const result = await generateCaption(imageSrc, projectContext, i);
        
        if (result.caption && !result.error) {
          newCaptions[imageSrc] = result.caption;
          
          if (onCaptionGenerated) {
            onCaptionGenerated(imageSrc, result.caption);
          }
          
          console.log(`✅ Caption generated (${i + 1}/${images.length}):`, result.caption);
        }
        
        // Add delay between requests to avoid rate limiting
        if (i < images.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      } catch (error) {
        console.error(`❌ Failed to generate caption for image ${i + 1}:`, error);
      }
    }
    
    setIsGenerating(false);
    setGenerationProgress(null);
    console.log('✅ Caption generation complete for project:', projectId);
    return newCaptions;
  };

  return {
    generateCaption,
    generateProjectCaptions,
    isGenerating,
    generationProgress
  };
};
