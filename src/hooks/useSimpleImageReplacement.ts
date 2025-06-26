
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
    console.log('🔄 Replacing image:', originalSrc);
    
    try {
      // Create blob URL for immediate display
      const blobUrl = URL.createObjectURL(file);
      setCurrentSrc(blobUrl);
      
      // Upload to Vercel Blob
      const uploadedUrl = await VercelBlobStorageService.uploadImage(
        file, 
        projectId, 
        `replacement-${Date.now()}`
      );
      
      if (uploadedUrl) {
        console.log('✅ Upload successful:', uploadedUrl);
        setCurrentSrc(uploadedUrl);
        
        // Save to database - simple upsert
        await supabase
          .from('dev_mode_changes')
          .upsert({
            project_id: projectId,
            change_key: `image_${originalSrc}`,
            change_value: { url: uploadedUrl },
            change_type: 'image_replacement'
          }, {
            onConflict: 'project_id,change_type,change_key'
          });
        
        URL.revokeObjectURL(blobUrl);
        toast.success('Image replaced!');
      } else {
        toast.success('Image updated locally!');
      }
      
    } catch (error) {
      console.error('❌ Replace failed:', error);
      toast.error('Replace failed');
      setCurrentSrc(originalSrc);
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
