
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
      console.error('❌ Invalid file type');
      toast.error('Please select an image file');
      event.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      console.error('❌ File too large');
      toast.error('Image must be smaller than 10MB');
      event.target.value = '';
      return;
    }

    setImageError(false);
    toast.info('Uploading image to Vercel Blob...');
    
    try {
      console.log('📤 Starting image upload for replacement using Vercel Blob:', file.name);
      
      // Create immediate preview using FileReader for instant feedback
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        if (previewUrl) {
          console.log('🖼️ Showing immediate preview while uploading');
          setCurrentSrc(previewUrl);
          setForceRefresh(prev => prev + 1);
        }
      };
      reader.readAsDataURL(file);
      
      const newImageUrl = await VercelBlobStorageService.uploadImage(file, projectId, currentSrc);
      
      if (newImageUrl) {
        const cacheBustedUrl = `${newImageUrl}?v=${Date.now()}`;
        
        console.log('✅ Image uploaded successfully to Vercel Blob, updating to final URL:', cacheBustedUrl);
        
        setCurrentSrc(cacheBustedUrl);
        setForceRefresh(prev => prev + 1);
        setImageError(false);
        
        onImageReplace(cacheBustedUrl);
        
        // Force all images with this src to update in the DOM
        setTimeout(() => {
          document.querySelectorAll(`img[src*="${currentSrc}"]`).forEach((img) => {
            (img as HTMLImageElement).src = cacheBustedUrl;
          });
          
          window.dispatchEvent(new CustomEvent('imageReplaced', {
            detail: { oldSrc: currentSrc, newSrc: cacheBustedUrl }
          }));
          
          console.log('🔄 Triggered global image refresh');
        }, 100);
        
        toast.success('Image uploaded successfully!');
        console.log('🎉 Image replacement completed successfully using Vercel Blob');
      } else {
        console.error('❌ Upload failed - no URL returned');
        setCurrentSrc(currentSrc);
        setImageError(true);
        toast.error('Image upload failed. Please check your Vercel Blob configuration.');
      }
    } catch (error) {
      console.error('❌ Error uploading image to Vercel Blob:', error);
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
