
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import MaximizableImage from "../MaximizableImage";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";

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
          src={project.image}
          alt={project.title}
          caption={imageCaptions[project.image] || project.title}
          imageList={[project.image]}
          currentIndex={0}
          priority={true}
          className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
          projectId={projectId}
          hideEditButton={false}
          onImageReplace={(newSrc) => handleSectionImageUpdate('hero', project.image, newSrc)}
        />
      </div>
    </motion.div>
  );
};

export default ModernProjectImage;
