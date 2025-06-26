
import React from "react";
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
  
  const { getUpdatedImagePath } = useProjectDataUpdater();
  
  // Get the current image source, checking for any replacements
  const currentImageSrc = projectId ? getUpdatedImagePath(projectId, project.image) : project.image;
  
  console.log('🖼️ ModernProjectImage: Original src:', project.image);
  console.log('🖼️ ModernProjectImage: Current src after replacement check:', currentImageSrc);

  const handleImageReplace = (newSrc: string) => {
    console.log('🔄 ModernProjectImage: Replacing hero image:', project.image, '->', newSrc);
    handleSectionImageUpdate('hero', project.image, newSrc);
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
