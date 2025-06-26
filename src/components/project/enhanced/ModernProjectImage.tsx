
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import MaximizableImage from "../MaximizableImage";
import { useSimpleImageReplacement } from "@/hooks/useSimpleImageReplacement";
import { supabase } from '@/integrations/supabase/client';

interface ModernProjectImageProps {
  project: ProjectProps;
  imageCaptions: Record<string, string>;
  projectId?: string;
  originalImageSrc?: string;
}

const ModernProjectImage: React.FC<ModernProjectImageProps> = ({
  project,
  imageCaptions,
  projectId,
  originalImageSrc
}) => {
  const baseImageSrc = originalImageSrc || project.image;
  const [displaySrc, setDisplaySrc] = useState(baseImageSrc);
  
  const { currentSrc, replaceImage, isUploading } = useSimpleImageReplacement({
    projectId: projectId || '',
    originalSrc: baseImageSrc
  });

  // Update display when replacement changes
  useEffect(() => {
    console.log('🔄 ModernProjectImage: currentSrc changed to:', currentSrc);
    setDisplaySrc(currentSrc);
  }, [currentSrc]);

  // Load saved replacement on mount
  useEffect(() => {
    if (!projectId) return;
    
    const loadSavedReplacement = async () => {
      console.log('🔍 Loading saved replacement for:', baseImageSrc);
      
      try {
        const { data, error } = await supabase
          .from('dev_mode_changes')
          .select('change_value')
          .eq('project_id', projectId)
          .eq('change_key', `image_${baseImageSrc}`)
          .eq('change_type', 'image_replacement')
          .maybeSingle();

        if (error) {
          console.error('❌ Error loading saved replacement:', error);
          return;
        }

        if (data?.change_value) {
          const changeValue = data.change_value;
          if (typeof changeValue === 'object' && changeValue !== null && 'url' in changeValue) {
            const urlValue = (changeValue as { url: string }).url;
            if (urlValue && urlValue !== baseImageSrc) {
              console.log('✅ Found saved replacement:', urlValue);
              setDisplaySrc(urlValue);
            }
          }
        } else {
          console.log('ℹ️ No saved replacement found');
        }
      } catch (error) {
        console.error('❌ Error in loadSavedReplacement:', error);
      }
    };

    loadSavedReplacement();
  }, [projectId, baseImageSrc]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('📤 Starting image upload:', file.name);
    await replaceImage(file);
    event.target.value = ''; // Clear input
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="floating-element"
    >
      <div className="glass-card p-4 layered-depth relative group">
        <MaximizableImage
          src={displaySrc}
          alt={project.title}
          caption={imageCaptions[baseImageSrc] || project.title}
          imageList={[displaySrc]}
          currentIndex={0}
          priority={true}
          className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
          projectId={projectId}
          hideEditButton={false}
          onImageReplace={handleImageUpload}
          isUploading={isUploading}
        />
      </div>
    </motion.div>
  );
};

export default ModernProjectImage;
