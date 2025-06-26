
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
  
  const originalSrc = originalImageSrc || project.image;
  const currentImageSrc = getImageSrc(originalSrc);
  
  // Force refresh key to ensure image updates are visible
  const [forceRefresh, setForceRefresh] = useState(0);
  
  console.log('🖼️ ModernProjectImage: Original src:', originalSrc);
  console.log('🖼️ ModernProjectImage: Project image src:', project.image);
  console.log('🖼️ ModernProjectImage: Current src from persistence:', currentImageSrc);

  const handleImageReplace = async (newSrc: string) => {
    console.log('🔄 ModernProjectImage: Replacing hero image:', originalSrc, '->', newSrc);
    
    try {
      // Clear any cached versions of the old image
      if (currentImageSrc && currentImageSrc !== originalSrc) {
        console.log('🗑️ Clearing old cached image:', currentImageSrc);
        
        // Force clear browser cache for the old image
        const images = document.querySelectorAll(`img[src*="${currentImageSrc}"]`);
        images.forEach(img => {
          const htmlImg = img as HTMLImageElement;
          htmlImg.src = '';
          setTimeout(() => {
            htmlImg.src = newSrc + '?v=' + Date.now();
          }, 100);
        });
      }
      
      // Save the image replacement to the database using the original source as key
      if (projectId) {
        await saveImageReplacement(originalSrc, newSrc);
        console.log('✅ ModernProjectImage: Hero image replacement saved to database');
        
        // Force a refresh to show the new image
        setForceRefresh(prev => prev + 1);
        
        // Dispatch event to trigger immediate update across the app
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId,
            imageReplacement: { originalSrc, newSrc },
            immediate: true,
            forceRefresh: true,
            timestamp: Date.now()
          }
        }));
      }
    } catch (error) {
      console.error('❌ ModernProjectImage: Error saving hero image replacement:', error);
    }
  };

  // Add cache-busting to the image source
  const displayImageSrc = currentImageSrc + (currentImageSrc.includes('?') ? '&' : '?') + `v=${forceRefresh}`;

  return (
    <motion.div
      key={`hero-image-${forceRefresh}`}
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
          caption={imageCaptions[currentImageSrc] || imageCaptions[originalSrc] || imageCaptions[project.image] || project.title}
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
