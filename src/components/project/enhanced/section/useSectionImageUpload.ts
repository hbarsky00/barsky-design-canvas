
import { useCallback } from 'react';
import { VercelBlobStorageService } from '@/services/vercelBlobStorage';
import { toast } from 'sonner';

interface UseSectionImageUploadProps {
  projectId?: string;
  sectionKey: string;
  onImageAdded: (imageSrc: string) => void;
}

export const useSectionImageUpload = ({ projectId, sectionKey, onImageAdded }: UseSectionImageUploadProps) => {
  const handleAddImage = useCallback(async () => {
    if (!projectId) return;
    
    try {
      console.log('📁 Opening file picker for section image...');
      
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
              console.log('📤 Uploading section image to Vercel Blob:', file.name);
              
              const uploadedUrl = await VercelBlobStorageService.uploadImage(file, projectId, `section-${sectionKey}-${Date.now()}`);
              
              if (uploadedUrl) {
                resolve(uploadedUrl);
              } else {
                toast.error('Image upload failed. Please check your Vercel Blob configuration.');
                reject(new Error('Upload failed'));
              }
            } catch (error) {
              console.error('❌ Error uploading section image:', error);
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
      
      onImageAdded(selectedImageSrc);
      toast.success('Image uploaded and added successfully!');
    } catch (error) {
      console.log('❌ Image upload cancelled or failed:', error);
      if (error instanceof Error && error.message !== 'File selection cancelled') {
        toast.error('Failed to add image');
      }
    }
  }, [projectId, sectionKey, onImageAdded]);

  return {
    handleAddImage
  };
};
