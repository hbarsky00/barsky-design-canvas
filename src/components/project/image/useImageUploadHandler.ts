
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
      console.log('❌ Image upload blocked: missing file, projectId, or callback');
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
      console.log('📤 Starting image upload for replacement:', file.name, 'Size:', file.size);
      
      // Upload the new image and replace the old one
      const newImageUrl = await VercelBlobStorageService.replaceImage(
        currentSrc, 
        file, 
        projectId, 
        `replacement-${Date.now()}`
      );
      
      if (newImageUrl) {
        console.log('✅ Image uploaded successfully:', newImageUrl);
        
        // Call the replacement callback immediately
        await onImageReplace(newImageUrl);
        
        toast.success('Image replaced successfully!');
        console.log('🎉 Image replacement completed successfully');
      } else {
        console.error('❌ Upload failed - no URL returned');
        setImageError(true);
        toast.error('Image upload failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      setImageError(true);
      toast.error('Image upload failed. Please try again.');
    } finally {
      event.target.value = '';
    }
  }, [projectId, currentSrc, onImageReplace, setImageError]);

  return {
    handleImageReplace
  };
};
