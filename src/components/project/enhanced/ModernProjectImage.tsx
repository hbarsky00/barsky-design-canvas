
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

  // Get video for projects with hover functionality
  const getProjectVideo = () => {
    if (projectId === "herbalink") {
      return "https://barskyux.com/wp-content/uploads/2025/08/social_u3514236419_httpss.mj_.rungHHTkRnoxDQ_have_her_stop_looking_at_7775da4e-d6bf-4b3d-8ad4-6bb240f18e2a_2.mp4";
    }
    if (projectId === "daesearchproject") {
      return "https://www.loom.com/embed/d11e52c85a1c48b181a5b23290321195?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true";
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
