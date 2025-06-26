
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
      
      // Upload new image to Vercel Blob - this creates a permanent URL
      const uploadedUrl = await VercelBlobStorageService.uploadImage(
        file, 
        projectId, 
        `replacement-${Date.now()}`
      );
      
      if (!uploadedUrl) {
        throw new Error('Upload failed - no URL returned');
      }

      // Check if this is a blob URL (temporary) or permanent URL
      const isPermanentUrl = !uploadedUrl.startsWith('blob:');
      
      if (isPermanentUrl) {
        console.log('✅ Upload successful, permanent URL:', uploadedUrl);
        
        // Save to dev_mode_changes table with image_replacement type using UPSERT
        const { error } = await supabase
          .from('dev_mode_changes')
          .upsert({
            project_id: projectId,
            change_key: `image_${originalSrc}`,
            change_value: { url: uploadedUrl },
            change_type: 'image_replacement',
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'project_id,change_type,change_key'
          });

        if (error) {
          console.error('❌ Database save error:', error);
          throw error;
        }

        console.log('✅ Database save successful for permanent URL');
      } else {
        console.log('⚠️ Using temporary blob URL:', uploadedUrl);
      }
      
      // Update the display with the new URL (permanent or temporary)
      setCurrentSrc(uploadedUrl);
      
      toast.success('Image replaced successfully!');
      
      // Dispatch event to update other components
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          imageReplaced: true,
          originalSrc,
          newSrc: uploadedUrl,
          isPermanent: isPermanentUrl
        }
      }));
      
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
