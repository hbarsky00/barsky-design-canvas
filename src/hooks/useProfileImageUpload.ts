
import { useCallback, useState } from 'react';
import { ImageStorageService } from '@/services/imageStorage';
import { toast } from 'sonner';

export const useProfileImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadProfileImage = useCallback(async () => {
    try {
      console.log('📁 Opening file picker for profile image...');
      
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      
      const uploadedUrl = await new Promise<string>((resolve, reject) => {
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

              setIsUploading(true);
              toast.info('Uploading profile image...');
              console.log('📤 Uploading profile image to Supabase Storage:', file.name);
              
              const uploadedUrl = await ImageStorageService.uploadImage(
                file, 
                'profile', 
                `profile-image-${Date.now()}`
              );
              
              if (uploadedUrl) {
                console.log('✅ Profile image uploaded successfully:', uploadedUrl);
                resolve(uploadedUrl);
              } else {
                toast.error('Image upload failed. Please check your Supabase Storage configuration.');
                reject(new Error('Upload failed'));
              }
            } catch (error) {
              console.error('❌ Error uploading profile image:', error);
              toast.error('Image upload failed. Please try again.');
              reject(error);
            } finally {
              setIsUploading(false);
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
      
      // Store the uploaded URL in localStorage for persistence
      localStorage.setItem('profileImageUrl', uploadedUrl);
      toast.success('Profile image uploaded successfully!');
      
      // Trigger a refresh of profile components
      window.dispatchEvent(new CustomEvent('profileImageUpdated', {
        detail: { imageUrl: uploadedUrl }
      }));
      
      return uploadedUrl;
    } catch (error) {
      console.log('❌ Profile image upload cancelled or failed:', error);
      if (error instanceof Error && error.message !== 'File selection cancelled') {
        toast.error('Failed to upload profile image');
      }
      return null;
    }
  }, []);

  return {
    uploadProfileImage,
    isUploading
  };
};
