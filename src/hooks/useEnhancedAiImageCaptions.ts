
import { useState, useCallback } from 'react';

export interface CaptionStyle {
  type: 'alt-text' | 'descriptive' | 'seo-optimized' | 'technical';
  caption: string;
}

interface AiCaptionResponse {
  captions: CaptionStyle[];
  error?: string;
  contextType?: 'project' | 'general' | 'blog';
}

interface BatchProcessingProgress {
  total: number;
  completed: number;
  failed: number;
  currentImage?: string;
  errors: Array<{ imageSrc: string; error: string }>;
}

export const useEnhancedAiImageCaptions = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [batchProgress, setBatchProgress] = useState<BatchProcessingProgress | null>(null);

  const getContextualPrompt = (contextType: 'project' | 'general' | 'blog' = 'general') => {
    const basePrompt = 'You are an expert at analyzing images and describing them accurately and professionally.';
    
    const contextPrompts = {
      project: `${basePrompt} You are analyzing images from a professional design portfolio. Focus on design elements, user interfaces, functionality, processes, and technical implementations.`,
      blog: `${basePrompt} You are analyzing images for blog content. Focus on educational value, key concepts, and actionable insights.`,
      general: `${basePrompt} Look at the image carefully and describe exactly what you see - whether it's a user interface, design mockup, screenshot, process diagram, workflow, data visualization, mobile app screen, website layout, etc.`
    };

    return contextPrompts[contextType];
  };

  const generateCaptions = async (imageSrc: string, contextType: 'project' | 'general' | 'blog' = 'general'): Promise<AiCaptionResponse> => {
    setIsGenerating(true);
    
    try {
      console.log('🔍 Enhanced AI Caption: Analyzing image for multiple caption styles:', imageSrc.substring(0, 50) + '...');
      
      const response = await fetch('/functions/v1/generate-image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ 
          imageSrc,
          contextType,
          requestMultipleStyles: true
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to analyze image: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Enhanced AI Caption: Multiple caption styles generated');
      
      return { captions: data.captions, contextType };
    } catch (error) {
      console.error('❌ Enhanced AI Caption Error:', error);
      
      // Fallback to basic caption
      const fallbackCaption = contextType === 'project' 
        ? 'Professional design interface showcasing modern user experience and technical implementation'
        : 'Image content analysis unavailable - please add a custom description';
        
      return { 
        captions: [{ type: 'descriptive', caption: fallbackCaption }],
        error: error instanceof Error ? error.message : 'Unknown error',
        contextType
      };
    } finally {
      setIsGenerating(false);
    }
  };

  const processBatchCaptions = async (
    imageList: Array<{ src: string; contextType?: 'project' | 'general' | 'blog' }>,
    onProgress?: (progress: BatchProcessingProgress) => void,
    onCaptionGenerated?: (imageSrc: string, captions: CaptionStyle[]) => void
  ) => {
    setIsGenerating(true);
    
    const progress: BatchProcessingProgress = {
      total: imageList.length,
      completed: 0,
      failed: 0,
      errors: []
    };

    setBatchProgress(progress);
    
    console.log(`🚀 Enhanced AI Caption: Starting batch processing for ${imageList.length} images...`);
    
    for (const [index, { src, contextType = 'general' }] of imageList.entries()) {
      try {
        progress.currentImage = src;
        onProgress?.(progress);
        
        console.log(`🖼️ Enhanced AI Caption: Processing image ${index + 1}/${imageList.length}:`, src.substring(0, 50) + '...');
        
        const result = await generateCaptions(src, contextType);
        
        if (result.captions && !result.error) {
          progress.completed++;
          onCaptionGenerated?.(src, result.captions);
          console.log(`📝 Enhanced AI Caption: Generated ${result.captions.length} caption styles for image ${index + 1}`);
        } else {
          progress.failed++;
          progress.errors.push({ imageSrc: src, error: result.error || 'Unknown error' });
          console.warn(`⚠️ Enhanced AI Caption: Failed to process image ${index + 1}`);
        }
        
        setBatchProgress({ ...progress });
        onProgress?.(progress);
        
        // Add delay to avoid overwhelming the API
        if (index < imageList.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      } catch (error) {
        progress.failed++;
        progress.errors.push({ 
          imageSrc: src, 
          error: error instanceof Error ? error.message : 'Processing failed' 
        });
        console.error(`❌ Enhanced AI Caption: Error processing image ${index + 1}:`, error);
      }
    }
    
    progress.currentImage = undefined;
    setBatchProgress(progress);
    setIsGenerating(false);
    
    console.log(`✅ Enhanced AI Caption: Batch processing complete. Success: ${progress.completed}, Failed: ${progress.failed}`);
    
    return progress;
  };

  const retryFailedCaptions = async (
    failedImages: Array<{ imageSrc: string; error: string }>,
    contextType: 'project' | 'general' | 'blog' = 'general',
    onSuccess?: (imageSrc: string, captions: CaptionStyle[]) => void
  ) => {
    console.log(`🔄 Enhanced AI Caption: Retrying ${failedImages.length} failed images...`);
    
    const retryResults = [];
    
    for (const { imageSrc } of failedImages) {
      try {
        const result = await generateCaptions(imageSrc, contextType);
        if (result.captions && !result.error) {
          onSuccess?.(imageSrc, result.captions);
          retryResults.push({ imageSrc, success: true });
          console.log(`✅ Enhanced AI Caption: Retry successful for:`, imageSrc.substring(0, 30) + '...');
        } else {
          retryResults.push({ imageSrc, success: false, error: result.error });
        }
        
        // Add delay between retries
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        retryResults.push({ 
          imageSrc, 
          success: false, 
          error: error instanceof Error ? error.message : 'Retry failed' 
        });
      }
    }
    
    return retryResults;
  };

  const generateSingleCaption = async (imageSrc: string, style: 'alt-text' | 'descriptive' | 'seo-optimized' | 'technical' = 'descriptive', contextType: 'project' | 'general' | 'blog' = 'general') => {
    const result = await generateCaptions(imageSrc, contextType);
    const targetCaption = result.captions.find(c => c.type === style) || result.captions[0];
    return targetCaption?.caption || 'Unable to generate caption';
  };

  return {
    generateCaptions,
    generateSingleCaption,
    processBatchCaptions,
    retryFailedCaptions,
    isGenerating,
    batchProgress
  };
};
