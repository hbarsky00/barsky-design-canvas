
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "./MaximizableImage";

interface ProjectGalleryProps {
  images: string[];
  imageCaptions: Record<string, string>;
  allImages: string[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ 
  images, 
  imageCaptions,
  allImages 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => {
        const caption = imageCaptions[image] || `Gallery image ${index + 1}`;
        const imageIndex = allImages.indexOf(image);
        
        return (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <MaximizableImage
              src={image}
              alt={caption}
              caption={caption}
              aspectRatio={4/3}
              imageList={allImages}
              currentIndex={imageIndex >= 0 ? imageIndex : 0}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProjectGallery;
