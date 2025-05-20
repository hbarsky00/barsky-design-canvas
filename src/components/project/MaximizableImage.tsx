
import React from "react";
import { Maximize } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";

interface MaximizableImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: number;
  className?: string;
  priority?: boolean;
}

const MaximizableImage: React.FC<MaximizableImageProps> = ({
  src,
  alt,
  caption,
  aspectRatio = 16/9,
  className = "",
  priority = false,
}) => {
  const { maximizeImage } = useImageMaximizer();
  
  const handleImageClick = () => {
    maximizeImage(src, alt || caption || "Image");
  };

  return (
    <div className="w-full">
      <motion.div 
        className={`rounded-lg overflow-hidden border border-gray-100 shadow-sm group relative ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <AspectRatio ratio={aspectRatio} className="bg-gray-100">
          <img 
            src={src} 
            alt={alt} 
            className="object-cover w-full h-full cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:brightness-95"
            loading={priority ? "eager" : "lazy"}
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
          className="mt-2 mb-4 text-sm text-gray-600 italic text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {caption}
        </motion.div>
      )}
    </div>
  );
};

export default MaximizableImage;
