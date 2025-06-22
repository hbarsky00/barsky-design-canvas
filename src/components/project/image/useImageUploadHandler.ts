
import { useCallback } from 'react';
import { VercelBlobStorageService } from '@/services/vercelBlobStorage';
import { toast } from 'sonner';

interface UseImageUploadHandlerProps {
  projectId?: string;
  currentSrc: string;
  onImageReplace?: (newSrc: string) => void;
  setCurrentSrc: (src: string) => void;
  setImageError: (error: boolean) => void;
  setForceRefresh: (updater: (prev: number) => number) => void;
}

export const useImageUploadHandler = ({
  projectId,
  currentSrc,
  onImageReplace,
  setCurrentSrc,
  setImageError,
  setForceRefresh
}: UseImageUploadHandlerProps) => {
  const handleImageReplace = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !projectId || !onImageReplace) {
      event.target.value = '';
      return;
    }

    // Validate file
    if (!file.type.startsWith('image/')) {
      console.error('❌ Invalid file type:', file.type);
      toast.error('Please select an image file');
      event.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      console.error('❌ File too large:', file.size);
      toast.error('Image must be smaller than 10MB');
      event.target.value = '';
      return;
    }

    setImageError(false);
    toast.info('Uploading image...');
    
    try {
      console.log('📤 Starting image upload for replacement:', file.name);
      
      // Create immediate preview for better UX
      const previewUrl = URL.createObjectURL(file);
      setCurrentSrc(previewUrl);
      setForceRefresh(prev => prev + 1);
      
      const newImageUrl = await VercelBlobStorageService.uploadImage(file, projectId, currentSrc);
      
      if (newImageUrl) {
        console.log('✅ Image uploaded successfully:', newImageUrl);
        
        // Clean up the preview URL
        URL.revokeObjectURL(previewUrl);
        
        setCurrentSrc(newImageUrl);
        setForceRefresh(prev => prev + 1);
        setImageError(false);
        
        onImageReplace(newImageUrl);
        
        toast.success('Image uploaded successfully!');
        console.log('🎉 Image replacement completed successfully');
      } else {
        console.error('❌ Upload failed - no URL returned');
        // Revert to original src on failure
        setCurrentSrc(currentSrc);
        setImageError(true);
        toast.error('Image upload failed. Please check your configuration.');
      }
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      // Revert to original src on error
      setCurrentSrc(currentSrc);
      setImageError(true);
      toast.error('Image upload failed. Please try again.');
    } finally {
      event.target.value = '';
    }
  }, [projectId, currentSrc, onImageReplace, setCurrentSrc, setImageError, setForceRefresh]);

  return {
    handleImageReplace
  };
};
