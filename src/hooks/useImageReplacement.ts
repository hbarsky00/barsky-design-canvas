
import { useState, useCallback } from 'react';
import { ImageStorageService } from '@/services/imageStorage';
import { toast } from 'sonner';

interface UseImageReplacementProps {
  projectId?: string;
  onSuccess?: (newSrc: string) => void;
  onError?: (error: string) => void;
}

export const useImageReplacement = ({ 
  projectId, 
  onSuccess, 
  onError 
}: UseImageReplacementProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const replaceImage = useCallback(async (file: File, originalSrc?: string) => {
    if (!projectId) {
      const error = 'Project ID is required for image replacement';
      console.error('❌', error);
      onError?.(error);
      toast.error(error);
      return;
    }

    if (!file.type.startsWith('image/')) {
      const error = 'Please select an image file';
      console.error('❌', error);
      onError?.(error);
      toast.error(error);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      const error = 'Image must be smaller than 10MB';
      console.error('❌', error);
      onError?.(error);
      toast.error(error);
      return;
    }

    setIsUploading(true);
    toast.info('Uploading new image...');
    
    try {
      console.log('📤 Replacing image via Supabase Storage:', file.name);
      
      const newImageUrl = await ImageStorageService.uploadImage(
        file, 
        projectId, 
        originalSrc || `replacement-${Date.now()}`
      );
      
      if (newImageUrl) {
        console.log('✅ Image replacement successful:', newImageUrl);
        onSuccess?.(newImageUrl);
        toast.success('Image replaced successfully!');
      } else {
        throw new Error('Upload failed - no URL returned');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Image replacement failed';
      console.error('❌ Error replacing image:', error);
      onError?.(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, [projectId, onSuccess, onError]);

  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>, originalSrc?: string) => {
    const file = event.target.files?.[0];
    if (file) {
      replaceImage(file, originalSrc);
    }
    // Clear the input so the same file can be selected again
    event.target.value = '';
  }, [replaceImage]);

  return {
    isUploading,
    replaceImage,
    handleFileInput
  };
};
