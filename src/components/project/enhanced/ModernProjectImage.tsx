
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import MaximizableImage from "../MaximizableImage";
import { useDirectImageReplacement } from "@/hooks/useDirectImageReplacement";

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
  
  const { currentSrc, replaceImage } = useDirectImageReplacement({
    projectId: projectId || '',
    originalSrc: baseImageSrc
  });

  console.log('🖼️ ModernProjectImage: Displaying image:', currentSrc);

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
          src={currentSrc}
          alt={project.title}
          caption={imageCaptions[baseImageSrc] || project.title}
          imageList={[currentSrc]}
          currentIndex={0}
          priority={true}
          className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
          projectId={projectId}
          hideEditButton={false}
          onImageReplace={replaceImage}
        />
      </div>
    </motion.div>
  );
};

export default ModernProjectImage;
