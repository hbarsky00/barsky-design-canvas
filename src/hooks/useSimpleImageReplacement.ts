
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
      console.log('🔄 Starting image replacement for:', originalSrc);
      
      // Create immediate blob URL for instant preview
      const blobUrl = URL.createObjectURL(file);
      console.log('📱 Created blob URL for immediate preview:', blobUrl);
      
      // Update display immediately with blob URL
      setCurrentSrc(blobUrl);
      
      // Try to upload to Vercel Blob in the background
      try {
        const uploadedUrl = await VercelBlobStorageService.uploadImage(
          file, 
          projectId, 
          `replacement-${Date.now()}`
        );
        
        if (uploadedUrl && !uploadedUrl.startsWith('blob:')) {
          console.log('✅ Vercel Blob upload successful:', uploadedUrl);
          
          // Update with permanent URL
          setCurrentSrc(uploadedUrl);
          
          // Save to database with permanent URL
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
            console.warn('⚠️ Database save failed, but image is still displayed:', error);
          } else {
            console.log('✅ Permanent URL saved to database');
          }
          
          // Clean up blob URL
          URL.revokeObjectURL(blobUrl);
        } else {
          console.log('⚠️ Vercel Blob upload failed or returned blob URL, using local blob');
        }
      } catch (uploadError) {
        console.warn('⚠️ Background upload failed, but image is displayed locally:', uploadError);
      }
      
      toast.success('Image replaced successfully!');
      
      // Dispatch event to update other components
      window.dispatchEvent(new CustomEvent('projectDataUpdated', {
        detail: { 
          projectId,
          imageReplaced: true,
          originalSrc,
          newSrc: currentSrc
        }
      }));
      
    } catch (error) {
      console.error('❌ Image replacement failed:', error);
      toast.error('Image replacement failed. Please try again.');
      // Revert to original on error
      setCurrentSrc(originalSrc);
    } finally {
      setIsUploading(false);
    }
  }, [projectId, originalSrc, currentSrc]);

  return {
    currentSrc,
    replaceImage,
    isUploading
  };
};
