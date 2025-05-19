
import React from "react";
import { Maximize } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

interface ProjectImageProps {
  image: string;
  alt: string;
  caption?: string;
  onImageClick?: (image: string, title: string) => void;
}

const ProjectImage: React.FC<ProjectImageProps> = ({
  image,
  alt,
  caption,
  onImageClick
}) => {
  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(image, alt);
    }
  };

  return (
    <>
      <motion.div 
        className="mb-2 rounded-lg overflow-hidden border border-gray-100 shadow-sm group relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <AspectRatio ratio={16 / 9} className="bg-gray-100">
          <img 
            src={image} 
            alt={alt} 
            className="object-cover w-full h-full cursor-pointer transition-all group-hover:brightness-95"
            loading="lazy"
            onClick={handleImageClick}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 p-2 rounded-full">
              <Maximize className="h-6 w-6 text-white" />
            </div>
          </div>
        </AspectRatio>
      </motion.div>
      {caption && (
        <motion.div 
          className="mb-4 text-sm text-gray-600 italic text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {caption}
        </motion.div>
      )}
    </>
  );
};

export default ProjectImage;
