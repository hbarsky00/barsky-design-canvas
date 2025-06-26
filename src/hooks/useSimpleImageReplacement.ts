
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
    if (!file || !projectId) {
      console.error('❌ Missing file or projectId');
      return;
    }

    setIsUploading(true);
    console.log('🔄 Starting image replacement:', { originalSrc, fileSize: file.size });
    
    try {
      // 1. Create blob URL for immediate display
      const blobUrl = URL.createObjectURL(file);
      setCurrentSrc(blobUrl);
      console.log('✅ Immediate preview set:', blobUrl);
      
      // 2. Upload to Vercel Blob
      const uploadedUrl = await VercelBlobStorageService.uploadImage(
        file, 
        projectId, 
        `replacement-${Date.now()}`
      );
      
      if (!uploadedUrl) {
        throw new Error('Upload failed - no URL returned');
      }

      console.log('✅ Upload successful:', uploadedUrl);
      
      // 3. Update display to permanent URL
      setCurrentSrc(uploadedUrl);
      URL.revokeObjectURL(blobUrl);
      
      // 4. Save to database with simple structure
      const { error } = await supabase
        .from('dev_mode_changes')
        .upsert({
          project_id: projectId,
          change_key: `image_${originalSrc}`,
          change_value: { url: uploadedUrl },
          change_type: 'image_replacement'
        }, {
          onConflict: 'project_id,change_type,change_key'
        });
      
      if (error) {
        console.error('❌ Database save error:', error);
        toast.error('Failed to save image');
      } else {
        console.log('✅ Database save successful');
        toast.success('Image replaced successfully!');
      }
      
    } catch (error) {
      console.error('❌ Image replacement failed:', error);
      toast.error('Image replacement failed');
      // Revert to original on error
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
