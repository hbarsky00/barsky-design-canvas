
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";

interface MaximizableImageProps {
  src: string;
  alt: string;
  caption?: string;
  imageList?: string[];
  currentIndex?: number;
  priority?: boolean;
  className?: string;
  projectId?: string;
  hideEditButton?: boolean;
  allowRemove?: boolean;
  imageReplacements?: Record<string, string>;
  onImageReplace?: (newSrc: string) => void;
  onImageRemove?: () => void;
  onCaptionUpdate?: (newCaption: string) => void;
}

const MaximizableImage: React.FC<MaximizableImageProps> = ({
  src,
  alt,
  caption,
  imageList = [],
  currentIndex = 0,
  priority = false,
  className = "",
}) => {
  const { maximizeImage } = useImageMaximizer();

  const handleImageClick = () => {
    // Use imageList if provided, otherwise create array with current image
    const imagesToShow = imageList.length > 0 ? imageList : [src];
    const indexToUse = imageList.length > 0 ? currentIndex : 0;
    
    // Call maximizeImage with the correct signature: (image, title, images, index)
    maximizeImage(src, alt, imagesToShow, indexToUse);
  };

  return (
    <div className={`relative group cursor-pointer ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
        onClick={handleImageClick}
      />
      
      {caption && (
        <div className="mt-2 text-sm text-gray-600 italic text-center">
          {caption}
        </div>
      )}
    </div>
  );
};

export default MaximizableImage;
