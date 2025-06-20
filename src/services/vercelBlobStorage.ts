
import { put, del, list } from '@vercel/blob';

export class VercelBlobStorageService {
  private static readonly BLOB_READ_WRITE_TOKEN = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN || '';

  // Check if Vercel Blob is properly configured
  private static checkConfiguration(): boolean {
    if (!this.BLOB_READ_WRITE_TOKEN) {
      console.error('❌ VITE_BLOB_READ_WRITE_TOKEN environment variable is not set');
      return false;
    }
    return true;
  }

  static async uploadImage(file: File, projectId: string, originalPath: string): Promise<string | null> {
    try {
      console.log('📤 Starting Vercel Blob upload:', {
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)}KB`,
        fileType: file.type,
        projectId: projectId.substring(0, 20) + '...'
      });

      // Check configuration
      if (!this.checkConfiguration()) {
        return null;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        console.error('❌ Invalid file type:', file.type);
        return null;
      }

      // Validate file size (10MB limit for Vercel Blob)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        console.error('❌ File too large:', `${(file.size / 1024 / 1024).toFixed(2)}MB`);
        return null;
      }

      // Create a unique filename
      const fileExt = file.name.split('.').pop() || 'jpg';
      const sanitizedPath = originalPath.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${projectId}/${sanitizedPath}_${Date.now()}.${fileExt}`;
      
      console.log('📁 Upload path:', fileName);
      
      // Upload to Vercel Blob
      const blob = await put(fileName, file, {
        access: 'public',
        token: this.BLOB_READ_WRITE_TOKEN
      });

      if (!blob.url) {
        console.error('❌ Upload succeeded but no URL returned');
        return null;
      }

      console.log('✅ Image uploaded successfully to Vercel Blob:', {
        url: blob.url.substring(0, 50) + '...'
      });
      
      return blob.url;
    } catch (error) {
      console.error('❌ Unexpected error during Vercel Blob upload:', error);
      return null;
    }
  }

  static async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      if (!this.checkConfiguration()) {
        return false;
      }

      // Extract the file path from the Vercel Blob URL
      const url = new URL(imageUrl);
      const pathname = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
      
      console.log('🗑️ Deleting image from Vercel Blob:', pathname);

      await del(imageUrl, {
        token: this.BLOB_READ_WRITE_TOKEN
      });

      console.log('✅ Image deleted successfully from Vercel Blob:', pathname);
      return true;
    } catch (error) {
      console.error('❌ Error deleting image from Vercel Blob:', error);
      return false;
    }
  }

  static async cleanupProjectImages(projectId: string, keepImages: string[]): Promise<void> {
    try {
      if (!this.checkConfiguration()) {
        return;
      }

      console.log('🧹 Cleaning up project images for:', projectId);
      
      // List all blobs with the project prefix
      const { blobs } = await list({
        prefix: `${projectId}/`,
        token: this.BLOB_READ_WRITE_TOKEN
      });

      // Find images to delete (not in keepImages list)
      const imagesToDelete = blobs
        .map(blob => blob.url)
        .filter(url => !keepImages.includes(url));

      if (imagesToDelete.length > 0) {
        console.log('🗑️ Deleting unused images from Vercel Blob:', imagesToDelete);
        
        await Promise.all(
          imagesToDelete.map(url => this.deleteImage(url))
        );

        console.log('✅ Cleaned up unused images successfully');
      }
    } catch (error) {
      console.error('❌ Error during Vercel Blob cleanup:', error);
    }
  }

  // Clear image cache for specific images
  static clearImageCache(imagePaths: string[]): void {
    imagePaths.forEach(imagePath => {
      console.log('🧹 Clearing cache for image:', imagePath);
      
      // Force reload images by updating their src with cache busting
      document.querySelectorAll(`img[src="${imagePath}"]`).forEach((img) => {
        const htmlImg = img as HTMLImageElement;
        const originalSrc = htmlImg.src;
        htmlImg.src = '';
        setTimeout(() => {
          htmlImg.src = originalSrc + '?v=' + Date.now();
        }, 100);
      });

      // Clear any background images
      document.querySelectorAll(`[style*="background-image"]`).forEach((element) => {
        const style = (element as HTMLElement).style;
        if (style.backgroundImage && style.backgroundImage.includes(imagePath)) {
          const newUrl = imagePath + '?v=' + Date.now();
          style.backgroundImage = style.backgroundImage.replace(imagePath, newUrl);
        }
      });
    });
  }
}
