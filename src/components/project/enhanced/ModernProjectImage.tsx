
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
  const [currentImageSrc, setCurrentImageSrc] = useState(getImageSrc(originalSrc));
  const [forceRefresh, setForceRefresh] = useState(0);
  
  console.log('🖼️ ModernProjectImage: Original src:', originalSrc);
  console.log('🖼️ ModernProjectImage: Current src:', currentImageSrc);

  // Update current image when persistence data changes
  useEffect(() => {
    const updatedSrc = getImageSrc(originalSrc);
    console.log('🔄 ModernProjectImage: Updating current src to:', updatedSrc);
    setCurrentImageSrc(updatedSrc);
  }, [getImageSrc, originalSrc]);

  const handleImageReplace = async (newSrc: string) => {
    console.log('🔄 ModernProjectImage: Replacing hero image:', originalSrc, '->', newSrc);
    
    try {
      if (projectId) {
        // Save the replacement to database immediately
        await saveImageReplacement(originalSrc, newSrc);
        console.log('✅ ModernProjectImage: Image replacement saved to database');
        
        // Update the current display source immediately
        setCurrentImageSrc(newSrc);
        setForceRefresh(prev => prev + 1);
        
        // Dispatch event to update the rest of the app
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId,
            imageReplacement: { originalSrc, newSrc },
            immediate: true,
            forceRefresh: true,
            timestamp: Date.now()
          }
        }));
        
        console.log('✅ ModernProjectImage: Image replacement completed and events dispatched');
      }
    } catch (error) {
      console.error('❌ ModernProjectImage: Error saving hero image replacement:', error);
    }
  };

  // Add cache-busting to ensure fresh display
  const displayImageSrc = currentImageSrc + (currentImageSrc.includes('?') ? '&' : '?') + `refresh=${forceRefresh}`;

  console.log('🎨 ModernProjectImage: Final display src:', displayImageSrc);

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
