
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import MaximizableImage from "../MaximizableImage";
import { useDirectImageUpload } from "@/hooks/useDirectImageUpload";

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
  const [currentSrc, setCurrentSrc] = useState(baseImageSrc);
  
  const { uploadImage, isUploading } = useDirectImageUpload({
    projectId: projectId || '',
    onImageUpdate: setCurrentSrc
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('📤 Handling image upload:', file.name);
    await uploadImage(file, baseImageSrc);
    event.target.value = '';
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
          src={currentSrc}
          alt={project.title}
          caption={imageCaptions[baseImageSrc] || project.title}
          imageList={[currentSrc]}
          currentIndex={0}
          priority={true}
          className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
          projectId={projectId}
          hideEditButton={false}
          onImageReplace={handleImageUpload}
          isUploading={isUploading}
        />
      </div>
    </motion.div>
  );
};

export default ModernProjectImage;
