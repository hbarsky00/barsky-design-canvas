
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import MaximizableImage from "../MaximizableImage";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import { useProjectDataUpdater } from "@/hooks/useProjectDataUpdater";

interface ModernProjectImageProps {
  project: ProjectProps;
  imageCaptions: Record<string, string>;
  projectId?: string;
}

const ModernProjectImage: React.FC<ModernProjectImageProps> = ({
  project,
  imageCaptions,
  projectId
}) => {
  const { handleSectionImageUpdate } = useSimplifiedContentEditor({ 
    projectId: projectId || '' 
  });
  
  const { getUpdatedImagePath, updateImageInProjectData } = useProjectDataUpdater();
  
  // State to track the current image source with persistence
  const [currentImageSrc, setCurrentImageSrc] = useState(() => {
    // Always check for updated path on initialization
    return projectId ? getUpdatedImagePath(projectId, project.image) : project.image;
  });
  
  // Update image source when project or projectId changes
  useEffect(() => {
    const updatedSrc = projectId ? getUpdatedImagePath(projectId, project.image) : project.image;
    setCurrentImageSrc(updatedSrc);
    console.log('🔄 ModernProjectImage: Updated image source on mount/change:', updatedSrc);
  }, [project.image, projectId, getUpdatedImagePath]);
  
  console.log('🖼️ ModernProjectImage: Original src:', project.image);
  console.log('🖼️ ModernProjectImage: Current src:', currentImageSrc);

  const handleImageReplace = async (newSrc: string) => {
    console.log('🔄 ModernProjectImage: Replacing hero image:', project.image, '->', newSrc);
    
    try {
      // Update both persistence systems
      await handleSectionImageUpdate('hero', project.image, newSrc);
      
      if (projectId) {
        updateImageInProjectData(projectId, project.image, newSrc);
      }
      
      // Immediately update the component state
      setCurrentImageSrc(newSrc);
      
      console.log('✅ ModernProjectImage: Hero image replacement completed');
    } catch (error) {
      console.error('❌ ModernProjectImage: Error replacing hero image:', error);
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
          caption={imageCaptions[currentImageSrc] || imageCaptions[project.image] || project.title}
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
