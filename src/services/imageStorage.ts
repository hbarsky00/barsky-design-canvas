import { supabase } from '@/integrations/supabase/client';

export class ImageStorageService {
  private static BUCKET_NAME = 'published-images';

  // Check if bucket exists and is accessible
  private static async checkBucketHealth(): Promise<boolean> {
    try {
      const { data, error } = await supabase.storage.from(this.BUCKET_NAME).list('', {
        limit: 1
      });
      
      if (error) {
        console.error('❌ Bucket health check failed:', error);
        return false;
      }
      
      console.log('✅ Storage bucket is healthy and accessible');
      return true;
    } catch (error) {
      console.error('❌ Bucket health check error:', error);
      return false;
    }
  }

  static async uploadImage(file: File, projectId: string, originalPath: string): Promise<string | null> {
    try {
      console.log('📤 Starting image upload:', {
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)}KB`,
        fileType: file.type,
        projectId: projectId.substring(0, 20) + '...'
      });

      // Check bucket health first
      const bucketHealthy = await this.checkBucketHealth();
      if (!bucketHealthy) {
        console.error('❌ Storage bucket is not accessible');
        return null;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        console.error('❌ Invalid file type:', file.type);
        return null;
      }

      // Validate file size (50MB limit)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        console.error('❌ File too large:', `${(file.size / 1024 / 1024).toFixed(2)}MB`);
        return null;
      }

      // Create a unique filename under the required folder
      const fileExt = file.name.split('.').pop() || 'jpg';
      const sanitizedPath = originalPath.replace(/[^a-zA-Z0-9]/g, '_');
      const folder = 'what i did';
      const fileName = `${folder}/${sanitizedPath}_${Date.now()}.${fileExt}`;
      
      console.log('📁 Upload path:', fileName);
      
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });

      if (error) {
        console.error('❌ Storage upload error:', {
          message: error.message,
          error: error
        });
        return null;
      }

      if (!data?.path) {
        console.error('❌ Upload succeeded but no path returned');
        return null;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(data.path);

      if (!publicUrl) {
        console.error('❌ Failed to get public URL for uploaded file');
        return null;
      }

      console.log('✅ Image uploaded successfully:', {
        path: data.path,
        publicUrl: publicUrl.substring(0, 50) + '...'
      });
      
      return publicUrl;
    } catch (error) {
      console.error('❌ Unexpected error during image upload:', error);
      return null;
    }
  }

  static async deleteImage(imagePath: string): Promise<boolean> {
    try {
      if (!imagePath.includes(this.BUCKET_NAME)) {
        console.log('⚠️ Image not in storage bucket, skipping delete:', imagePath);
        return true;
      }

      // Extract the file path from the full URL
      const urlParts = imagePath.split(`/${this.BUCKET_NAME}/`);
      if (urlParts.length < 2) {
        console.log('⚠️ Could not extract file path from URL:', imagePath);
        return false;
      }

      const filePath = urlParts[1];
      console.log('🗑️ Deleting image from storage:', filePath);

      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        console.error('❌ Storage delete error:', error);
        return false;
      }

      console.log('✅ Image deleted successfully:', filePath);
      return true;
    } catch (error) {
      console.error('❌ Error deleting image:', error);
      return false;
    }
  }

  static async cleanupProjectImages(projectId: string, keepImages: string[]): Promise<void> {
    try {
      console.log('🧹 Cleaning up project images for:', projectId);
      
      const { data: files, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .list(projectId, {
          limit: 1000
        });

      if (error) {
        console.error('❌ Error listing project images:', error);
        return;
      }

      if (!files) return;

      // Find images to delete (not in keepImages list)
      const imagesToDelete = files
        .map(file => `${projectId}/${file.name}`)
        .filter(fullPath => {
          const publicUrl = supabase.storage.from(this.BUCKET_NAME).getPublicUrl(fullPath).data.publicUrl;
          return !keepImages.includes(publicUrl);
        });

      if (imagesToDelete.length > 0) {
        console.log('🗑️ Deleting unused images:', imagesToDelete);
        const { error: deleteError } = await supabase.storage
          .from(this.BUCKET_NAME)
          .remove(imagesToDelete);

        if (deleteError) {
          console.error('❌ Error deleting unused images:', deleteError);
        } else {
          console.log('✅ Cleaned up unused images successfully');
        }
      }
    } catch (error) {
      console.error('❌ Error during cleanup:', error);
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
