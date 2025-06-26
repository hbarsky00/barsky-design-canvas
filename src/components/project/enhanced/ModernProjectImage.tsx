
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import MaximizableImage from "../MaximizableImage";
import { useSimplifiedProjectPersistence } from "@/hooks/useSimplifiedProjectPersistence";

interface ModernProjectImageProps {
  project: ProjectProps;
  imageCaptions: Record<string, string>;
  projectId?: string;
  originalImageSrc?: string; // Add this to track the original image source
}

const ModernProjectImage: React.FC<ModernProjectImageProps> = ({
  project,
  imageCaptions,
  projectId,
  originalImageSrc
}) => {
  const { saveImageReplacement, getImageSrc } = useSimplifiedProjectPersistence(projectId || '');
  
  // Use the original image source for persistence lookups, fallback to project.image
  const originalSrc = originalImageSrc || project.image;
  
  // Use the persistence system to get the current image source
  const currentImageSrc = getImageSrc(originalSrc);
  
  console.log('🖼️ ModernProjectImage: Original src:', originalSrc);
  console.log('🖼️ ModernProjectImage: Project image src:', project.image);
  console.log('🖼️ ModernProjectImage: Current src from persistence:', currentImageSrc);

  const handleImageReplace = async (newSrc: string) => {
    console.log('🔄 ModernProjectImage: Replacing hero image:', originalSrc, '->', newSrc);
    
    try {
      // Save the image replacement to the database using the original source as key
      if (projectId) {
        await saveImageReplacement(originalSrc, newSrc);
        console.log('✅ ModernProjectImage: Hero image replacement saved to database');
      }
    } catch (error) {
      console.error('❌ ModernProjectImage: Error saving hero image replacement:', error);
    }
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
          src={currentImageSrc}
          alt={project.title}
          caption={imageCaptions[currentImageSrc] || imageCaptions[originalSrc] || imageCaptions[project.image] || project.title}
          imageList={[currentImageSrc]}
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
