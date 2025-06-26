
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

  // ENHANCED: Force re-render when project.image changes to ensure updated images are displayed
  const [imageKey, setImageKey] = React.useState(0);
  
  React.useEffect(() => {
    setImageKey(prev => prev + 1);
    console.log('🖼️ ModernProjectImage: Project image updated to:', project.image);
  }, [project.image]);

  const handleImageReplace = React.useCallback((newSrc: string) => {
    console.log('🔄 ModernProjectImage: Hero image being replaced:', project.image, '->', newSrc);
    handleSectionImageUpdate('hero', project.image, newSrc);
    setImageKey(prev => prev + 1);
  }, [project.image, handleSectionImageUpdate]);

  return (
    <motion.div
      key={`hero-image-${imageKey}`}
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
          onImageReplace={handleImageReplace}
        />
      </div>
    </motion.div>
  );
};

export default ModernProjectImage;
