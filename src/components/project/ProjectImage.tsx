import React from "react";
import { Maximize } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import EditImageButton from "@/components/dev/EditImageButton";
import EditableText from "@/components/dev/EditableText";

interface ProjectImageProps {
  image: string;
  alt: string;
  caption?: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({
  image,
  alt,
  caption
}) => {
  const { maximizeImage } = useImageMaximizer();
  
  const handleImageClick = () => {
    maximizeImage(image, alt);
    console.log("Project image clicked:", image);
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
        <EditImageButton src={image} />
        <AspectRatio ratio={16 / 9} className="bg-gray-100">
          <img 
            src={image} 
            alt={alt} 
            className="object-cover w-full h-full cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:brightness-95"
            loading="lazy"
            onClick={handleImageClick}
          />
          <button
            onClick={handleImageClick}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Maximize image"
          >
            <div className="bg-black/50 p-2 rounded-full">
              <Maximize className="h-6 w-6 text-white" />
            </div>
          </button>
        </AspectRatio>
      </motion.div>
      {caption && (
        <div className="mb-4 text-sm text-gray-600 italic text-center">
          <EditableText initialText={caption}>
            {(text) => (
              <motion.div
                className="pr-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {text}
              </motion.div>
            )}
          </EditableText>
        </div>
      )}
    </>
  );
};

export default ProjectImage;
