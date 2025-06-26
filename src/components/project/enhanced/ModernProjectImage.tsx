
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import MaximizableImage from "../MaximizableImage";
import { useSimplifiedProjectPersistence } from "@/hooks/useSimplifiedProjectPersistence";

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
  const { saveImageReplacement, getImageSrc } = useSimplifiedProjectPersistence(projectId || '');
  
  // Use the original image source as the base
  const baseImageSrc = originalImageSrc || project.image;
  
  // Get the current image (either original or replacement)
  const [displayImageSrc, setDisplayImageSrc] = useState(() => {
    const savedSrc = getImageSrc(baseImageSrc);
    console.log('🖼️ ModernProjectImage: Initial image src:', baseImageSrc, '->', savedSrc);
    return savedSrc;
  });

  // Update display when persistence data changes
  useEffect(() => {
    const newSrc = getImageSrc(baseImageSrc);
    console.log('🔄 ModernProjectImage: Checking for updates:', baseImageSrc, '->', newSrc);
    if (newSrc !== displayImageSrc) {
      console.log('✅ ModernProjectImage: Updating display image to:', newSrc);
      setDisplayImageSrc(newSrc);
    }
  }, [getImageSrc, baseImageSrc, displayImageSrc]);

  const handleImageReplace = async (newSrc: string) => {
    console.log('🔄 ModernProjectImage: Image replacement requested:', baseImageSrc, '->', newSrc);
    
    try {
      // Immediately update the display
      setDisplayImageSrc(newSrc);
      console.log('✅ ModernProjectImage: Display updated immediately to:', newSrc);
      
      // Save to database
      if (projectId) {
        await saveImageReplacement(baseImageSrc, newSrc);
        console.log('✅ ModernProjectImage: Saved to database successfully');
      }
      
    } catch (error) {
      console.error('❌ ModernProjectImage: Error during replacement:', error);
      // Revert on error
      const fallbackSrc = getImageSrc(baseImageSrc);
      setDisplayImageSrc(fallbackSrc);
    }
  };

  console.log('🎨 ModernProjectImage: Final render with src:', displayImageSrc);

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
          src={displayImageSrc}
          alt={project.title}
          caption={imageCaptions[baseImageSrc] || project.title}
          imageList={[displayImageSrc]}
          currentIndex={0}
          priority={true}
          className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
          projectId={projectId}
          hideEditButton={false}
          onImageReplace={handleImageReplace}
        />
      </div>
    </motion.div>
  );
};

export default ModernProjectImage;
