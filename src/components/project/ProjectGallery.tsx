
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
    <div className="grid grid-cols-1 gap-6">
      {images.map((image, index) => (
        <motion.div
          key={image}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="glass-card p-4 layered-depth"
        >
          <MaximizableImage
            src={image}
            alt={`Gallery image ${index + 1}`}
            caption={imageCaptions[image]}
            imageList={images}
            currentIndex={index}
            className="rounded-lg shadow-elevated w-full"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectGallery;
