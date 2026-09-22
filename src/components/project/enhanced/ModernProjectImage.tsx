
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import VideoHoverImage from "../VideoHoverImage";
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

  // FIXED: Force re-render when project.image changes and log the actual image being used
  const [imageKey, setImageKey] = React.useState(0);
  
  React.useEffect(() => {
    setImageKey(prev => prev + 1);
    console.log('🖼️ ModernProjectImage: Rendering with image:', project.image);
    console.log('🖼️ ModernProjectImage: Image key updated to:', imageKey + 1);
  }, [project.image]);

  const handleImageReplace = React.useCallback((newSrc: string) => {
    console.log('🔄 ModernProjectImage: Hero image replacement triggered');
    console.log('🔄 Old image:', project.image);
    console.log('🔄 New image:', newSrc);
    
    handleSectionImageUpdate('hero', project.image, newSrc);
    setImageKey(prev => prev + 1);
    
    // Force a page refresh to ensure the new image displays
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('forceComponentRefresh', {
        detail: { projectId, immediate: true }
      }));
    }, 100);
  }, [project.image, handleSectionImageUpdate, projectId]);

  console.log('🎨 ModernProjectImage: Rendering with final image src:', project.image);

  // Get video for Herbalink project specifically
  const getProjectVideo = () => {
    if (projectId === "herbalink") {
      return "/uploads/archive/herbalink-promo.mp4";
    }
    return undefined;
  };

  return (
    <motion.div
      key={`hero-image-${imageKey}-${project.image}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="floating-element"
    >
      <VideoHoverImage
        src={project.image}
        alt={project.title}
        caption={imageCaptions[project.image] || project.title}
        videoSrc={getProjectVideo()}
        imageList={[project.image]}
        currentIndex={0}
        priority={true}
        className="shadow-elevated-lg w-full glass-card layered-depth"
        projectId={projectId}
        hideEditButton={false}
        onImageReplace={handleImageReplace}
      />
    </motion.div>
  );
};

export default ModernProjectImage;
