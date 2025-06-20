
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { compressImageFile, validateImageSize, getOptimalCompressionSettings } from '@/utils/imageCompression';
import { ImageStorageService } from '@/services/imageStorage';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';
import { useImageValidation } from '@/hooks/useImageValidation';
import { useAiCaptionGenerator } from '@/hooks/useAiCaptionGenerator';

export const useImageUpload = (projectId: string) => {
  const [isUploading, setIsUploading] = useState(false);
  const { saveChange } = useDevModeDatabase(projectId);
  const { setCaption } = useSimpleCaptions(projectId);
  const { validateImageFile, validateImageUrl } = useImageValidation();
  const { generateAiCaption } = useAiCaptionGenerator();

  const uploadImage = useCallback(async (
    file: File, 
    originalSrc: string, 
    onImageReplace?: (newSrc: string) => void
  ): Promise<string | null> => {
    setIsUploading(true);
    
    try {
      console.log('🖼️ useImageUpload: Starting image upload process:', {
        fileName: file.name,
        originalSize: `${(file.size / 1024).toFixed(2)}KB`,
        fileType: file.type,
        originalSrc: originalSrc.substring(0, 50) + '...',
        projectId: projectId.substring(0, 20) + '...'
      });
      
      // Validate file
      validateImageFile(file);
      
      // Show loading feedback
      toast.loading("Uploading image and generating AI caption...", { id: 'image-upload' });
      
      // Get optimal compression settings and compress
      const { maxSizeKB } = getOptimalCompressionSettings(file);
      const compressedFile = await compressImageFile(file, maxSizeKB);
      
      // Validate compressed file
      if (!validateImageSize(compressedFile, maxSizeKB)) {
        throw new Error(`Image is still too large after compression. Please use a smaller image.`);
      }
      
      // Upload to storage
      console.log('☁️ Uploading to Supabase Storage...');
      const publicUrl = await ImageStorageService.uploadImage(compressedFile, projectId, originalSrc);
      
      if (!publicUrl) {
        throw new Error('Failed to upload image to storage. Please try again or use a different image.');
      }
      
      // Validate storage URL
      if (!validateImageUrl(publicUrl)) {
        throw new Error('Invalid image URL received from storage');
      }
      
      // Save to database for persistence
      console.log('💾 useImageUpload: Saving image replacement to database for persistence');
      await saveChange('image', originalSrc, publicUrl);
      
      // Call callback IMMEDIATELY for instant visual feedback
      console.log('⚡ useImageUpload: IMMEDIATE callback for instant UI update');
      if (onImageReplace) {
        onImageReplace(publicUrl);
      }
      
      // Generate AI caption for the new image
      console.log('🤖 useImageUpload: Generating AI caption for replaced image...');
      const aiCaption = await generateAiCaption(publicUrl);
      
      // Set the AI-generated caption
      setCaption(publicUrl, aiCaption);
      
      // Dispatch events for immediate updates
      setTimeout(() => {
        console.log('🚀 useImageUpload: Dispatching immediate project update event');
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId, 
            imageReplaced: true, 
            immediate: true,
            timestamp: Date.now(),
            source: 'image-upload-hook',
            src: originalSrc,
            newSrc: publicUrl
          }
        }));
        
        // Dispatch AI caption event
        window.dispatchEvent(new CustomEvent('aiCaptionGenerated', {
          detail: {
            imageSrc: publicUrl,
            caption: aiCaption,
            projectId,
            autoPublish: false
          }
        }));
      }, 50);
      
      const finalSizeKB = (compressedFile.size / 1024).toFixed(2);
      toast.success("Image uploaded with AI caption!", {
        id: 'image-upload',
        description: `Uploaded ${finalSizeKB}KB and generated smart caption automatically.`,
        duration: 3000,
      });
      
      return publicUrl;
    } catch (error) {
      console.error('❌ useImageUpload: Error uploading image:', error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      // Provide specific error guidance
      let description = "Try using a smaller image or different format (JPG/PNG).";
      
      if (errorMessage.includes('file type') || errorMessage.includes('format')) {
        description = "Please use JPG, PNG, or WebP format.";
      } else if (errorMessage.includes('too large') || errorMessage.includes('size')) {
        description = "Please use a smaller image (under 50MB).";
      } else if (errorMessage.includes('storage') || errorMessage.includes('upload')) {
        description = "Storage service temporarily unavailable. Please try again.";
      }
      
      toast.error("Failed to upload image", {
        id: 'image-upload',
        description: `${errorMessage} ${description}`
      });
      
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [projectId, saveChange, setCaption, validateImageFile, validateImageUrl, generateAiCaption]);

  return {
    uploadImage,
    isUploading
  };
};
