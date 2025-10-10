
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
    <div className="case-study-image-grid">
      {images.map((image, index) => (
        <motion.div
          key={image}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="case-study-image-container case-study-image-standard"
        >
          <MaximizableImage
            src={image}
            alt={imageCaptions[image] || `Gallery image ${index + 1}`}
            imageList={images}
            currentIndex={index}
            className="w-full h-full"
          />
          {imageCaptions[image] && (
            <p className="case-study-image-caption">
              {imageCaptions[image]}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectGallery;
