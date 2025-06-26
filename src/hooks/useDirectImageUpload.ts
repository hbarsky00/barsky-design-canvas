
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
    console.log('🔄 Starting direct image upload');

    try {
      // Show immediate preview
      const blobUrl = URL.createObjectURL(file);
      onImageUpdate(blobUrl);
      
      // Upload to Vercel Blob
      const uploadedUrl = await VercelBlobStorageService.uploadImage(
        file, 
        projectId, 
        `img-${Date.now()}`
      );
      
      if (uploadedUrl) {
        // Update with permanent URL
        onImageUpdate(uploadedUrl);
        URL.revokeObjectURL(blobUrl);
        
        // Save to database with the correct format for publishing system
        await supabase
          .from('dev_mode_changes')
          .upsert({
            project_id: projectId,
            change_type: 'image_replacement',
            change_key: `image_${originalSrc}`,
            change_value: { url: uploadedUrl }
          }, {
            onConflict: 'project_id,change_type,change_key'
          });
        
        toast.success('Image uploaded successfully!');
        console.log('✅ Image upload complete:', uploadedUrl);
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
