
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "./MaximizableImage";

interface ProjectGalleryProps {
  images: string[];
  imageCaptions?: Record<string, string>;
  projectId?: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ 
  images, 
  imageCaptions = {},
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {images.map((image, index) => (
        <MaximizableImage
          key={image}
          src={image}
          alt={`Gallery image ${index + 1}`}
          caption={imageCaptions[image]}
          imageList={images}
          currentIndex={index}
          className="shadow-elevated w-full glass-card layered-depth"
        />
      ))}
    </div>
  );
};

export default ProjectGallery;
