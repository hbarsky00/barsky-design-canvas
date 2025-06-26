
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
    console.log('🔄 Starting image replacement for:', originalSrc);
    
    try {
      // Create immediate blob URL for instant preview
      const blobUrl = URL.createObjectURL(file);
      console.log('📱 Created blob URL for immediate preview:', blobUrl);
      
      // Update display immediately
      setCurrentSrc(blobUrl);
      toast.info('Uploading image...');
      
      // Upload to Vercel Blob
      const uploadedUrl = await VercelBlobStorageService.uploadImage(
        file, 
        projectId, 
        `replacement-${Date.now()}`
      );
      
      if (uploadedUrl && !uploadedUrl.startsWith('blob:')) {
        console.log('✅ Vercel Blob upload successful:', uploadedUrl);
        
        // Update with permanent URL
        setCurrentSrc(uploadedUrl);
        
        // Save to database - use a simpler approach to avoid conflicts
        const changeKey = `image_${originalSrc}`;
        
        // First try to update existing record
        const { data: existingData } = await supabase
          .from('dev_mode_changes')
          .select('id')
          .eq('project_id', projectId)
          .eq('change_type', 'image_replacement')
          .eq('change_key', changeKey)
          .maybeSingle();
        
        if (existingData) {
          // Update existing record
          const { error: updateError } = await supabase
            .from('dev_mode_changes')
            .update({
              change_value: { url: uploadedUrl },
              updated_at: new Date().toISOString()
            })
            .eq('id', existingData.id);
            
          if (updateError) {
            console.warn('⚠️ Database update failed:', updateError);
          } else {
            console.log('✅ Updated existing database record');
          }
        } else {
          // Insert new record
          const { error: insertError } = await supabase
            .from('dev_mode_changes')
            .insert({
              project_id: projectId,
              change_key: changeKey,
              change_value: { url: uploadedUrl },
              change_type: 'image_replacement',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
            
          if (insertError) {
            console.warn('⚠️ Database insert failed:', insertError);
          } else {
            console.log('✅ Inserted new database record');
          }
        }
        
        // Clean up blob URL
        URL.revokeObjectURL(blobUrl);
        toast.success('Image replaced successfully!');
      } else {
        console.log('⚠️ Using local blob URL as fallback');
        toast.success('Image replaced locally!');
      }
      
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
