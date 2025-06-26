
import { useState } from 'react';
import { VercelBlobStorageService } from '@/services/vercelBlobStorage';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UseDirectImageUploadProps {
  projectId: string;
  onImageUpdate: (newSrc: string) => void;
}

export const useDirectImageUpload = ({ projectId, onImageUpdate }: UseDirectImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File, originalSrc: string) => {
    if (!file || !projectId) {
      toast.error('Missing file or project ID');
      return;
    }

    setIsUploading(true);
    console.log('🔄 Starting direct image upload and replacement');

    try {
      // Step 1: Delete old image data from database first
      console.log('🗑️ Removing old image data for:', originalSrc);
      const { error: deleteError } = await supabase
        .from('dev_mode_changes')
        .delete()
        .eq('project_id', projectId)
        .eq('change_type', 'image_replacement')
        .eq('change_key', `image_${originalSrc}`);

      if (deleteError) {
        console.warn('⚠️ Could not delete old image data:', deleteError);
      }

      // Step 2: Show immediate preview
      const blobUrl = URL.createObjectURL(file);
      onImageUpdate(blobUrl);
      
      // Step 3: Upload to Vercel Blob (this will replace the old image)
      const uploadedUrl = await VercelBlobStorageService.replaceImage(
        originalSrc,
        file, 
        projectId, 
        `img-${Date.now()}`
      );
      
      if (uploadedUrl) {
        // Step 4: Update with permanent URL
        onImageUpdate(uploadedUrl);
        URL.revokeObjectURL(blobUrl);
        
        // Step 5: Save NEW image replacement to database
        console.log('💾 Saving new image replacement:', originalSrc, '->', uploadedUrl);
        const { error: saveError } = await supabase
          .from('dev_mode_changes')
          .upsert({
            project_id: projectId,
            change_type: 'image_replacement',
            change_key: `image_${originalSrc}`,
            change_value: { url: uploadedUrl }
          }, {
            onConflict: 'project_id,change_type,change_key'
          });

        if (saveError) {
          console.error('❌ Failed to save image replacement:', saveError);
          toast.error('Failed to save image replacement');
        } else {
          toast.success('Image replaced successfully!');
          console.log('✅ Image replacement complete:', uploadedUrl);
        }
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('❌ Upload failed:', error);
      toast.error('Image upload failed');
      // Revert to original
      onImageUpdate(originalSrc);
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading };
};
