
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

  // Update display source when replacement hook changes
  useEffect(() => {
    setDisplaySrc(currentSrc);
  }, [currentSrc]);

  // Load saved image from database on mount
  useEffect(() => {
    if (!projectId) return;
    
    const loadSavedImage = async () => {
      try {
        console.log('🔍 Loading saved image for:', baseImageSrc);
        
        // Check dev_mode_changes for image replacement
        const { data, error } = await supabase
          .from('dev_mode_changes')
          .select('change_value')
          .eq('project_id', projectId)
          .eq('change_key', `image_${baseImageSrc}`)
          .eq('change_type', 'image_replacement')
          .maybeSingle();

        if (data && !error && data.change_value && typeof data.change_value === 'object' && 'url' in data.change_value) {
          const imageUrl = (data.change_value as { url: string }).url;
          if (imageUrl && !imageUrl.startsWith('blob:')) {
            console.log('✅ Found saved permanent image:', imageUrl);
            setDisplaySrc(imageUrl);
            return;
          }
        }

        // Check published_projects for published image replacements
        const { data: publishedData, error: publishedError } = await supabase
          .from('published_projects')
          .select('image_replacements')
          .eq('project_id', projectId)
          .maybeSingle();

        if (publishedData && !publishedError && publishedData.image_replacements) {
          const imageReplacements = publishedData.image_replacements as Record<string, string>;
          if (imageReplacements[baseImageSrc]) {
            console.log('✅ Found published image replacement:', imageReplacements[baseImageSrc]);
            setDisplaySrc(imageReplacements[baseImageSrc]);
            return;
          }
        }
        
        console.log('📝 No replacement found, using original:', baseImageSrc);
      } catch (error) {
        console.error('❌ Error loading saved image:', error);
      }
    };

    loadSavedImage();
  }, [projectId, baseImageSrc]);

  // Listen for image updates
  useEffect(() => {
    const handleImageUpdate = (e: CustomEvent) => {
      if (e.detail?.originalSrc === baseImageSrc && e.detail?.newSrc) {
        console.log('🔄 Image update event received:', e.detail.newSrc);
        setDisplaySrc(e.detail.newSrc);
      }
    };

    window.addEventListener('projectDataUpdated', handleImageUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleImageUpdate as EventListener);
    };
  }, [baseImageSrc]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await replaceImage(file);
    event.target.value = '';
  };

  console.log('🖼️ ModernProjectImage: Displaying image:', displaySrc);

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
