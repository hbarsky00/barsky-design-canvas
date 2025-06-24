
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
        ? `${projectContext}. CRITICAL: Analyze this specific image in detail. Each image is unique and requires a completely different description. Focus on the exact UI elements, features, layouts, text, and functionality visible in THIS particular image. Do not use generic descriptions. Be specific about what makes this screen different from others.`
        : 'App interface - analyze the specific UI elements, features, and functionality visible in this particular image. Provide a unique description that highlights what makes this screen special.';
      
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
      
      console.log('✅ OpenAI Caption generated successfully:', data.caption.substring(0, 100) + '...');
      
      return { caption: data.caption };
    } catch (error) {
      console.error('❌ Error generating OpenAI caption:', error);
      // Return unique fallback based on image index and project context
      const getUniqueFallback = (index: number, projectContext: string) => {
        if (projectContext.includes('splittime') || projectContext.includes('co-parenting')) {
          const fallbacks = [
            'Co-parenting coordination dashboard featuring family schedule management and communication tools',
            'Child custody calendar interface with shared parenting schedule and event coordination',
            'Co-parent messaging system designed to reduce conflict and improve family communication',
            'Family profile management screen with child information and shared custody details',
            'Alert and notification center for co-parenting activities and important updates',
            'Document sharing hub for custody agreements and family records',
            'Event planning interface for coordinating family activities and appointments',
            'Communication timeline showing family interactions and shared updates'
          ];
          return fallbacks[index % fallbacks.length];
        }
        
        if (projectContext.includes('gold2crypto') || projectContext.includes('cryptocurrency')) {
          const fallbacks = [
            'Cryptocurrency trading dashboard with portfolio tracking and market analysis',
            'Digital asset management interface for traditional gold investors',
            'Investment portfolio overview showing crypto and traditional asset allocation',
            'Trading platform designed to bridge gold and cryptocurrency investments',
            'Market analysis tools for cryptocurrency and precious metals trading',
            'User onboarding interface for new crypto investors from traditional markets',
            'Security features and wallet management for cryptocurrency trading',
            'Educational resources for traditional investors entering crypto markets'
          ];
          return fallbacks[index % fallbacks.length];
        }
        
        if (projectContext.includes('spectrum') || projectContext.includes('apparel')) {
          const fallbacks = [
            'Custom apparel design interface with real-time preview capabilities',
            'E-commerce platform for personalized clothing and design tools',
            'Product customization dashboard with advanced design options',
            'Online store interface for custom apparel and design services',
            'Design tool interface for creating personalized clothing items',
            'Product catalog with customization options and design features',
            'User-friendly design platform for custom apparel creation',
            'Accessibility-focused e-commerce interface for inclusive shopping'
          ];
          return fallbacks[index % fallbacks.length];
        }
        
        if (projectContext.includes('dae') || projectContext.includes('search') || projectContext.includes('data')) {
          const fallbacks = [
            'Enterprise data search interface with advanced filtering capabilities',
            'Data discovery platform with AI-powered search and recommendations',
            'Dataset catalog with intelligent search and metadata management',
            'Data analysis dashboard with predictive search functionality',
            'Enterprise search results with relevance scoring and categorization',
            'Data management interface with smart search and organization tools',
            'Business intelligence platform with enhanced data discovery features',
            'Search analytics dashboard showing data usage and discovery patterns'
          ];
          return fallbacks[index % fallbacks.length];
        }
        
        // Generic fallbacks for other projects
        const genericFallbacks = [
          'Professional app interface designed for enhanced user experience',
          'Modern dashboard with intuitive navigation and clean design',
          'User-friendly platform interface with streamlined functionality',
          'Responsive web application with professional design elements',
          'Interactive interface showcasing modern UX/UI design principles',
          'Digital platform with accessible design and user-focused features',
          'Application interface demonstrating best practices in user experience',
          'Professional software interface with clean, modern aesthetics'
        ];
        
        return genericFallbacks[index % genericFallbacks.length];
      };
      
      return { 
        caption: getUniqueFallback(imageIndex || 0, projectContext || ''),
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
      projectContext = 'Splittime co-parenting coordination app for separated families - analyze the specific UI elements, family communication features, scheduling tools, conflict reduction interface, child-focused design elements, and co-parent collaboration functionality visible in this particular interface design. Focus on co-parenting and family coordination features.';
    } else if (projectId === 'barskyjoint') {
      projectContext = 'Barsky Joint food truck and restaurant app - analyze the specific UI elements, mobile ordering features, food truck operations, restaurant management interface, GPS tracking functionality, and customer experience elements visible in this particular image';
    } else if (projectId === 'herbalink') {
      projectContext = 'Herbalink herbal medicine app for connecting patients with herbalists - analyze the specific UI elements, herbalist discovery features, consultation booking interface, herb recommendation system, and patient-practitioner connection functionality visible in this particular interface design';
    } else if (projectId === 'gold2crypto') {
      projectContext = 'Gold2Crypto cryptocurrency trading platform for traditional investors - analyze the specific UI elements, trading features, portfolio management, market analysis tools, and investor onboarding functionality visible in this particular interface';
    } else if (projectId === 'spectrum') {
      projectContext = 'Spectrum Apparel custom clothing design platform - analyze the specific UI elements, design tools, e-commerce features, customization options, and accessibility features visible in this particular interface';
    } else if (projectId === 'dae-search' || projectId === 'daeSearch') {
      projectContext = 'DAE Search enterprise data discovery platform - analyze the specific UI elements, search functionality, data catalog features, AI recommendations, and business intelligence tools visible in this particular interface';
    } else {
      projectContext = 'Professional app interface - analyze the specific UI elements, features, and functionality visible in this particular interface design';
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
          console.log(`✅ Unique caption generated for image ${i + 1}/${images.length}`);
        } else {
          console.warn(`⚠️ Using fallback caption for image ${i + 1}/${images.length}`);
          if (result.caption) {
            newCaptions[imageSrc] = result.caption;
          }
        }
        
        // Add delay to avoid overwhelming the API
        if (i < images.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1500));
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
