import { useState, useEffect, useCallback } from 'react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

interface UseAIImageEnhancementOptions {
  enabled?: boolean;
  quality?: 'low' | 'medium' | 'high';
  autoEnhance?: boolean;
}

interface EnhancementResult {
  originalSrc: string;
  enhancedSrc: string;
  isProcessing: boolean;
  error: string | null;
}

export const useAIImageEnhancement = (options: UseAIImageEnhancementOptions = {}) => {
  const { enabled = true, quality = 'medium', autoEnhance = true } = options;
  
  const [enhancementCache, setEnhancementCache] = useState<Map<string, EnhancementResult>>(new Map());
  const [isInitialized, setIsInitialized] = useState(false);
  const [enhancer, setEnhancer] = useState<any>(null);

  // Initialize the AI model
  useEffect(() => {
    if (!enabled) return;

    const initEnhancer = async () => {
      try {
        console.log('🤖 Initializing AI image enhancer...');
        
        // Use a smaller, faster model for real-time enhancement
        const imageEnhancer = await pipeline(
          'image-to-image',
          'Xenova/swin2SR-classical-sr-x2-64',
          { 
            device: 'webgpu',
            dtype: 'fp16'
          }
        );
        
        setEnhancer(imageEnhancer);
        setIsInitialized(true);
        console.log('✅ AI image enhancer initialized');
      } catch (error) {
        console.warn('⚠️ WebGPU not available, falling back to CPU');
        try {
          const imageEnhancer = await pipeline(
            'image-to-image',
            'Xenova/swin2SR-classical-sr-x2-64'
          );
          setEnhancer(imageEnhancer);
          setIsInitialized(true);
        } catch (fallbackError) {
          console.error('❌ Failed to initialize AI enhancer:', fallbackError);
        }
      }
    };

    initEnhancer();
  }, [enabled]);

  const enhanceImage = useCallback(async (imageSrc: string): Promise<string> => {
    if (!enabled || !enhancer || !isInitialized) {
      return imageSrc;
    }

    // Check cache first
    const cached = enhancementCache.get(imageSrc);
    if (cached && !cached.isProcessing && cached.enhancedSrc) {
      return cached.enhancedSrc;
    }

    // Skip enhancement for very small images or data URLs
    if (imageSrc.startsWith('data:') && imageSrc.length < 10000) {
      return imageSrc;
    }

    try {
      // Update cache to show processing
      setEnhancementCache(prev => new Map(prev.set(imageSrc, {
        originalSrc: imageSrc,
        enhancedSrc: '',
        isProcessing: true,
        error: null
      })));

      console.log('🔄 Enhancing image:', imageSrc.substring(0, 50) + '...');

      // Load image and convert to proper format
      const image = await loadImageElement(imageSrc);
      const canvas = await imageToCanvas(image);
      
      // Resize if too large for performance
      if (canvas.width > 1024 || canvas.height > 1024) {
        const resized = resizeCanvas(canvas, 1024);
        canvas.width = resized.width;
        canvas.height = resized.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(resized, 0, 0);
      }

      // Convert canvas to blob for AI processing
      const blob = await canvasToBlob(canvas);
      
      // Enhance with AI
      const result = await enhancer(blob);
      
      // Convert result back to data URL
      const enhancedSrc = await blobToDataURL(result);

      // Update cache with result
      setEnhancementCache(prev => new Map(prev.set(imageSrc, {
        originalSrc: imageSrc,
        enhancedSrc,
        isProcessing: false,
        error: null
      })));

      console.log('✅ Image enhanced successfully');
      return enhancedSrc;

    } catch (error) {
      console.error('❌ Enhancement failed:', error);
      
      // Update cache with error
      setEnhancementCache(prev => new Map(prev.set(imageSrc, {
        originalSrc: imageSrc,
        enhancedSrc: imageSrc, // Fall back to original
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Enhancement failed'
      })));

      return imageSrc; // Return original on error
    }
  }, [enabled, enhancer, isInitialized, enhancementCache]);

  const getEnhancementStatus = useCallback((imageSrc: string) => {
    return enhancementCache.get(imageSrc) || {
      originalSrc: imageSrc,
      enhancedSrc: '',
      isProcessing: false,
      error: null
    };
  }, [enhancementCache]);

  return {
    enhanceImage,
    getEnhancementStatus,
    isInitialized,
    isEnabled: enabled && isInitialized
  };
};

// Helper functions
async function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function imageToCanvas(image: HTMLImageElement): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(image, 0, 0);
  return canvas;
}

function resizeCanvas(canvas: HTMLCanvasElement, maxSize: number): HTMLCanvasElement {
  const { width, height } = canvas;
  let newWidth = width;
  let newHeight = height;

  if (width > height) {
    if (width > maxSize) {
      newWidth = maxSize;
      newHeight = (height * maxSize) / width;
    }
  } else {
    if (height > maxSize) {
      newHeight = maxSize;
      newWidth = (width * maxSize) / height;
    }
  }

  const resized = document.createElement('canvas');
  resized.width = newWidth;
  resized.height = newHeight;
  const ctx = resized.getContext('2d')!;
  ctx.drawImage(canvas, 0, 0, newWidth, newHeight);
  return resized;
}

async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to convert canvas to blob'));
    }, 'image/png', 0.95);
  });
}

async function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}