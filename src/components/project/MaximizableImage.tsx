import React from "react";
import { Maximize } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import EditImageButton from "@/components/dev/EditImageButton";

interface MaximizableImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: number;
  className?: string;
  priority?: boolean;
  imageList?: string[];
  currentIndex?: number;
}
const MaximizableImage: React.FC<MaximizableImageProps> = ({
  src,
  alt,
  caption,
  aspectRatio,
  className = "",
  priority = false,
  imageList,
  currentIndex
}) => {
  const {
    maximizeImage
  } = useImageMaximizer();
  const handleImageClick = () => {
    // Use caption for the title if available, otherwise use alt text
    const imageTitle = caption || alt || "Image";

    // If we have an image list and current index, pass them for navigation
    if (imageList && currentIndex !== undefined) {
      maximizeImage(src, imageTitle, imageList, currentIndex);
      console.log("Image clicked with gallery:", src, "Index:", currentIndex, "Total:", imageList.length);
    } else {
      // Single image mode
      maximizeImage(src, imageTitle);
      console.log("Image clicked (single):", src);
    }
  };

  // Use caption as alt text if available, otherwise use the provided alt text
  const imageAltText = caption || alt;
  return <div className="w-full">
      <motion.div className={`rounded-lg overflow-hidden border border-gray-100 shadow-sm group relative ${className}`} initial={{
      opacity: 0,
      scale: 0.95
    }} whileInView={{
      opacity: 1,
      scale: 1
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.5
    }}>
        <EditImageButton src={src} />
        {aspectRatio ? <AspectRatio ratio={aspectRatio} className="bg-gray-100">
            <img src={src} alt={imageAltText} className="object-contain w-full h-full cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:brightness-95" loading={priority ? "eager" : "lazy"} onClick={handleImageClick} />
            <button onClick={handleImageClick} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Maximize image">
              <div className="bg-black/50 p-2 rounded-full">
                <Maximize className="h-6 w-6 text-white" />
              </div>
            </button>
          </AspectRatio> : <div className="bg-gray-100 flex items-center justify-center min-h-[200px] p-4">
            <img src={src} alt={imageAltText} loading={priority ? "eager" : "lazy"} onClick={handleImageClick} className="max-w-full max-h-full cursor-pointer transition-all duration-300 group-hover:scale-105 object-cover" />
            <button onClick={handleImageClick} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Maximize image">
              <div className="bg-black/50 p-2 rounded-full">
                <Maximize className="h-6 w-6 text-white" />
              </div>
            </button>
          </div>}
      </motion.div>
      {caption && <motion.div className="mt-2 text-sm text-gray-600 italic text-center" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.5,
      delay: 0.2
    }}>
          {caption}
        </motion.div>}
    </div>;
};
export default MaximizableImage;
