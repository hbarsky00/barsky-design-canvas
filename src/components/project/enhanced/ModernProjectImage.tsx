
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

  // Load saved image from database on mount
  useEffect(() => {
    if (!projectId) return;
    
    const loadSavedImage = async () => {
      try {
        const { data, error } = await supabase
          .from('project_content')
          .select('content_value')
          .eq('project_id', projectId)
          .eq('content_key', `image_${baseImageSrc}`)
          .eq('content_type', 'image')
          .single();

        if (data && !error) {
          console.log('✅ Found saved image in database:', data.content_value);
          setDisplaySrc(data.content_value);
        } else {
          console.log('📝 No saved image found, using original:', baseImageSrc);
          setDisplaySrc(baseImageSrc);
        }
      } catch (error) {
        console.error('❌ Error loading saved image:', error);
        setDisplaySrc(baseImageSrc);
      }
    };

    loadSavedImage();
  }, [projectId, baseImageSrc]);

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
