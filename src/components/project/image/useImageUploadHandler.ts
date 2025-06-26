
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
      
      const newImageUrl = await VercelBlobStorageService.uploadImage(file, projectId, currentSrc);
      
      if (newImageUrl) {
        console.log('✅ Image uploaded successfully:', newImageUrl);
        
        // Update the current source immediately
        setCurrentSrc(newImageUrl);
        setImageError(false);
        
        // Call the replacement callback
        onImageReplace(newImageUrl);
        
        if (newImageUrl.startsWith('blob:')) {
          toast.success('Image replaced successfully! (Using local preview - configure Vercel Blob for permanent storage)');
        } else {
          toast.success('Image uploaded and replaced successfully!');
        }
        console.log('🎉 Image replacement completed successfully');
      } else {
        console.error('❌ Upload failed - no URL returned');
        setImageError(true);
        toast.error('Image upload failed. Please check your Vercel Blob configuration.');
      }
    } catch (error) {
      console.error('❌ Error uploading image:', error);
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
