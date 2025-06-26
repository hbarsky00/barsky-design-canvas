
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
  
  // Use originalImageSrc if provided, otherwise fall back to project.image
  const baseImageSrc = originalImageSrc || project.image;
  const [currentImageSrc, setCurrentImageSrc] = useState(baseImageSrc);
  const [componentKey, setComponentKey] = useState(0);
  
  console.log('🖼️ ModernProjectImage: Base image src:', baseImageSrc);
  console.log('🖼️ ModernProjectImage: Current image src:', currentImageSrc);

  // Check for any saved replacement on mount
  useEffect(() => {
    const replacementSrc = getImageSrc(baseImageSrc);
    console.log('🔄 ModernProjectImage: Checking for replacement:', baseImageSrc, '->', replacementSrc);
    
    if (replacementSrc !== baseImageSrc) {
      console.log('✅ ModernProjectImage: Found replacement, updating current src');
      setCurrentImageSrc(replacementSrc);
      setComponentKey(prev => prev + 1);
    }
  }, [getImageSrc, baseImageSrc]);

  const handleImageReplace = async (newSrc: string) => {
    console.log('🔄 ModernProjectImage: Starting image replacement:', baseImageSrc, '->', newSrc);
    
    try {
      if (projectId) {
        // Update the display immediately for instant feedback
        setCurrentImageSrc(newSrc);
        setComponentKey(prev => prev + 1);
        
        // Save the replacement to database
        await saveImageReplacement(baseImageSrc, newSrc);
        console.log('✅ ModernProjectImage: Image replacement saved to database');
        
        // Dispatch global update event
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId,
            imageReplacement: { originalSrc: baseImageSrc, newSrc },
            immediate: true,
            forceRefresh: true,
            timestamp: Date.now()
          }
        }));
        
        console.log('✅ ModernProjectImage: Image replacement completed successfully');
      } else {
        console.error('❌ ModernProjectImage: No project ID provided for image replacement');
      }
    } catch (error) {
      console.error('❌ ModernProjectImage: Error during image replacement:', error);
      // Revert on error
      setCurrentImageSrc(baseImageSrc);
      setComponentKey(prev => prev + 1);
    }
  };

  // Clean display URL without cache busting for better consistency
  const displayImageSrc = currentImageSrc;

  console.log('🎨 ModernProjectImage: Final display src:', displayImageSrc);

  return (
    <motion.div
      key={`hero-image-${componentKey}`}
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
