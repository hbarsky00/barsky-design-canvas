
import { supabase } from '@/integrations/supabase/client';

export class ImageStorageService {
  private static BUCKET_NAME = 'published-images';

  // Ensure bucket exists before using it
  private static async ensureBucketExists(): Promise<boolean> {
    try {
      const { data: buckets, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.error('Error listing buckets:', error);
        return false;
      }

      const bucketExists = buckets?.some(bucket => bucket.name === this.BUCKET_NAME);
      
      if (!bucketExists) {
        console.log('Creating storage bucket:', this.BUCKET_NAME);
        const { error: createError } = await supabase.storage.createBucket(this.BUCKET_NAME, {
          public: true
        });
        
        if (createError) {
          console.error('Error creating bucket:', createError);
          return false;
        }
        
        console.log('✅ Storage bucket created successfully');
      }
      
      return true;
    } catch (error) {
      console.error('Error ensuring bucket exists:', error);
      return false;
    }
  }

  static async uploadImage(file: File, projectId: string, originalPath: string): Promise<string | null> {
    try {
      // Ensure bucket exists first
      const bucketReady = await this.ensureBucketExists();
      if (!bucketReady) {
        console.error('Storage bucket is not ready');
        return null;
      }

      // Create a unique filename based on project and original path
      const fileExt = file.name.split('.').pop();
      const fileName = `${projectId}/${originalPath.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${fileExt}`;
      
      console.log('📤 Uploading image to storage:', fileName);
      
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('❌ Storage upload error:', error);
        return null;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(fileName);

      console.log('✅ Image uploaded successfully:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('❌ Error uploading image:', error);
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
