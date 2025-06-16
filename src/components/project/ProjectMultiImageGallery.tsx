
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "./MaximizableImage";

interface ProjectMultiImageGalleryProps {
  images: string[];
  captions: Record<string, string>;
  onImageReplace?: (oldSrc: string, newSrc: string) => void;
}

const ProjectMultiImageGallery: React.FC<ProjectMultiImageGalleryProps> = ({ 
  images, 
  captions,
  onImageReplace 
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card-elevated p-8 space-y-8 layered-depth floating-element"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div key={image} className="glass-card p-4 layered-depth floating-element">
            <MaximizableImage
              src={image}
              alt={captions[image] || `Gallery image ${index + 1}`}
              caption={captions[image]}
              imageList={images}
              currentIndex={index}
              className="rounded-lg shadow-elevated w-full"
              onImageReplace={onImageReplace ? (newSrc) => onImageReplace(image, newSrc) : undefined}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectMultiImageGallery;
