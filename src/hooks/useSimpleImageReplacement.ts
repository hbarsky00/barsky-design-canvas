
import { useState, useCallback } from 'react';
import { VercelBlobStorageService } from '@/services/vercelBlobStorage';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UseSimpleImageReplacementProps {
  projectId: string;
  originalSrc: string;
}

export const useSimpleImageReplacement = ({ projectId, originalSrc }: UseSimpleImageReplacementProps) => {
  const [currentSrc, setCurrentSrc] = useState(originalSrc);
  const [isUploading, setIsUploading] = useState(false);

  const replaceImage = useCallback(async (file: File) => {
    if (!file || !projectId) return;

    setIsUploading(true);
    toast.info('Uploading image...');
    
    try {
      console.log('🔄 Starting simple image replacement for:', originalSrc);
      
      // Upload new image
      const uploadedUrl = await VercelBlobStorageService.uploadImage(
        file, 
        projectId, 
        `replacement-${Date.now()}`
      );
      
      if (!uploadedUrl) {
        throw new Error('Upload failed');
      }

      console.log('✅ Upload successful:', uploadedUrl);
      
      // Save to existing dev_mode_changes table instead of non-existent project_content table
      const { error } = await supabase
        .from('dev_mode_changes')
        .upsert({
          project_id: projectId,
          change_key: `image_${originalSrc}`,
          change_value: { url: uploadedUrl },
          change_type: 'image_replacement',
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('❌ Database save error:', error);
        throw error;
      }

      console.log('✅ Database save successful');
      
      // Immediately update the display
      setCurrentSrc(uploadedUrl);
      
      toast.success('Image replaced successfully!');
      
      // Force a hard reload after a short delay to ensure it sticks
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('❌ Image replacement failed:', error);
      toast.error('Image replacement failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [projectId, originalSrc]);

  return {
    currentSrc,
    replaceImage,
    isUploading
  };
};
