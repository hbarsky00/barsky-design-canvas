
import { useState, useCallback } from 'react';
import { ImageStorageService } from '@/services/imageStorage';
import { toast } from 'sonner';

interface UseImageUploadProps {
  projectId?: string;
  onImageAdd?: (imageSrc: string) => void;
}

export const useImageUpload = ({ projectId, onImageAdd }: UseImageUploadProps) => {
  const [isSelecting, setIsSelecting] = useState(false);

  const handleImageAdd = useCallback(async () => {
    if (!onImageAdd || isSelecting || !projectId) {
      console.log('🚫 Image upload blocked:', { onImageAdd: !!onImageAdd, isSelecting, projectId });
      return;
    }
    
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

              toast.info('Uploading image to Supabase Storage...');
              console.log('📤 Uploading image to Supabase Storage:', file.name, 'Size:', file.size);
              
              const uploadedUrl = await ImageStorageService.uploadImage(file, projectId, `content-${Date.now()}`);
              
              if (uploadedUrl) {
                console.log('✅ Image uploaded successfully:', uploadedUrl);
                resolve(uploadedUrl);
              } else {
                console.error('❌ Upload failed - no URL returned');
                toast.error('Image upload failed. Please check your Supabase Storage configuration.');
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
      
      console.log('➕ Adding uploaded image to UI:', selectedImageSrc.substring(0, 50) + '...');
      
      // Call the onImageAdd callback immediately
      onImageAdd(selectedImageSrc);
      
      toast.success('Image uploaded and added successfully!');
      console.log('✅ Image upload complete');
      
    } catch (error) {
      console.log('❌ Image upload cancelled or failed:', error);
      if (error instanceof Error && error.message !== 'File selection cancelled') {
        console.error('❌ Image upload error details:', error);
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
