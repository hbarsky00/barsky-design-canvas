import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import { VercelBlobStorageService } from './vercelBlobStorage';

export class BackgroundRemovalService {
  static async processAndUploadImage(
    imageSrc: string,
    projectId: string = 'hero-logo'
  ): Promise<string> {
    try {
      console.log('🎨 Starting background removal for:', imageSrc);
      
      // Fetch the image
      const response = await fetch(imageSrc);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const imageBlob = await response.blob();
      const imageElement = await loadImage(imageBlob);
      
      console.log('🖼️ Image loaded, removing background...');
      const processedBlob = await removeBackground(imageElement);
      
      console.log('✅ Background removed, uploading...');
      
      // Convert blob to file for upload
      const file = new File([processedBlob], 'hero-logo-no-bg.png', { 
        type: 'image/png' 
      });
      
      // Upload the processed image
      const uploadedUrl = await VercelBlobStorageService.uploadImage(
        file,
        projectId,
        'hero-logo-processed'
      );
      
      if (uploadedUrl) {
        console.log('🎉 Background removal complete:', uploadedUrl);
        return uploadedUrl;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('❌ Background removal failed:', error);
      throw error;
    }
  }
}