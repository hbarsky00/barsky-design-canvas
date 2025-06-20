
import { useState, useCallback } from 'react';
import { VercelBlobStorageService } from '@/services/vercelBlobStorage';
import { toast } from 'sonner';

interface UseImageUploadProps {
  projectId?: string;
  onImageAdd?: (imageSrc: string) => void;
}

export const useImageUpload = ({ projectId, onImageAdd }: UseImageUploadProps) => {
  const [isSelecting, setIsSelecting] = useState(false);

  const handleImageAdd = useCallback(async () => {
    if (!onImageAdd || isSelecting || !projectId) return;
    
    setIsSelecting(true);
    
    try {
      console.log('📁 Opening file picker for image selection...');
      
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      
      const selectedImageSrc = await new Promise<string>((resolve, reject) => {
        input.onchange = async (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            try {
              if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                reject(new Error('Invalid file type'));
                return;
              }

              if (file.size > 10 * 1024 * 1024) {
                toast.error('Image must be smaller than 10MB');
                reject(new Error('File too large'));
                return;
              }

              toast.info('Uploading image to Vercel Blob...');
              console.log('📤 Uploading image to Vercel Blob:', file.name);
              
              const uploadedUrl = await VercelBlobStorageService.uploadImage(file, projectId, `content-${Date.now()}`);
              
              if (uploadedUrl) {
                resolve(uploadedUrl);
              } else {
                toast.error('Image upload failed. Please check your Vercel Blob configuration.');
                reject(new Error('Upload failed'));
              }
            } catch (error) {
              console.error('❌ Error uploading image:', error);
              toast.error('Image upload failed. Please try again.');
              reject(error);
            }
          } else {
            reject(new Error('No file selected'));
          }
        };
        
        input.oncancel = () => {
          reject(new Error('File selection cancelled'));
        };
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
      });
      
      console.log('➕ Adding uploaded image:', selectedImageSrc.substring(0, 50) + '...');
      onImageAdd(selectedImageSrc);
      toast.success('Image uploaded and added successfully!');
    } catch (error) {
      console.log('❌ Image upload cancelled or failed:', error);
      if (error instanceof Error && error.message !== 'File selection cancelled') {
        toast.error('Failed to add image');
      }
    } finally {
      setIsSelecting(false);
    }
  }, [onImageAdd, isSelecting, projectId]);

  return {
    isSelecting,
    handleImageAdd
  };
};
