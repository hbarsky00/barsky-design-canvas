import { supabase } from '@/integrations/supabase/client';

export class ImageStorageService {
  private static BUCKET_NAME = 'published-images';

  static async uploadImage(file: File, projectId: string, originalPath: string): Promise<string | null> {
    try {
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
}
