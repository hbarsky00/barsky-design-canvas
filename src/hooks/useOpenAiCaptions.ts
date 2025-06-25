
import { useState } from 'react';

interface OpenAiCaptionResponse {
  caption: string;
  error?: string;
}

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
      
      let caption = result.caption.trim();
      
      // Additional client-side cleanup to ensure simple captions
      caption = caption
        .replace(/[#*_`\[\](){}|\\~><@!$%^&+=.,;:?]/g, '')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      // If it contains analysis language, replace with simple fallback
      if (caption.toLowerCase().includes('interface analysis') || 
          caption.toLowerCase().includes('analysis') || 
          caption.toLowerCase().includes('overview') ||
          caption.toLowerCase().includes('section') ||
          caption.toLowerCase().includes('functionality') ||
          caption.includes('###') ||
          caption.includes('####') ||
          caption.length > 60) {
        caption = getSimpleFallback(imageIndex || 0, projectContext || '');
      }
      
      console.log('✅ Caption received:', caption);
      return { caption };
      
    } catch (error) {
      console.error('❌ Error generating caption:', error);
      
      return { 
        caption: getSimpleFallback(imageIndex || 0, projectContext || ''),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const getSimpleFallback = (index: number, projectContext: string) => {
    if (projectContext?.includes('investor') || projectContext?.includes('loan')) {
      const fallbacks = [
        'Banking dashboard with loan data',
        'Financial interface for loans',
        'Loan management screen',
        'Investment platform interface'
      ];
      return fallbacks[index % fallbacks.length];
    }
    
    if (projectContext?.includes('splittime')) {
      const fallbacks = [
        'Family scheduling app interface',
        'Parent communication screen',
        'Child activity planner',
        'Family calendar view'
      ];
      return fallbacks[index % fallbacks.length];
    }
    
    if (projectContext?.includes('spectrum')) {
      const fallbacks = [
        'Design tool interface',
        'Product customization screen',
        'Configuration dashboard',
        'User interface builder'
      ];
      return fallbacks[index % fallbacks.length];
    }
    
    if (projectContext?.includes('barsky')) {
      const fallbacks = [
        'Restaurant ordering interface',
        'Food truck app screen',
        'Menu display interface',
        'Restaurant management panel'
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
    
    // Set project context for better captions
    let projectContext = `${projectId} application interface`;
    
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
          await new Promise(resolve => setTimeout(resolve, 2000));
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
