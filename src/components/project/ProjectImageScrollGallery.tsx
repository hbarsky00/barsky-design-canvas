import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "./MaximizableImage";

interface ProjectImageScrollGalleryProps {
  images: string[];
  imageCaptions?: Record<string, string>;
  projectId?: string;
}

/**
 * Horizontal scrolling gallery - perfect for app screens and sequences
 */
const ProjectImageScrollGallery: React.FC<ProjectImageScrollGalleryProps> = ({ 
  images, 
  imageCaptions = {},
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full my-8">
      <div className="case-study-image-scroll">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="case-study-image-container flex-shrink-0"
            style={{ width: '280px' }}
          >
            <MaximizableImage
              src={image}
              alt={imageCaptions[image] || `Screen ${index + 1}`}
              imageList={images}
              currentIndex={index}
              className="w-full h-full"
            />
            {imageCaptions[image] && (
              <p className="case-study-image-caption text-xs">
                {imageCaptions[image]}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectImageScrollGallery;
