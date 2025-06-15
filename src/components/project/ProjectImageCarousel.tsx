
import React from "react";
import { Maximize } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import EditImageButton from "@/components/dev/EditImageButton";

interface ProjectImageCarouselProps {
  mainImage: string;
  title: string;
  extraImages?: string[];
  captions?: Record<string, string>;
}

const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({
  mainImage,
  title,
  captions = {}
}) => {
  const { maximizeImage } = useImageMaximizer();
  
  const handleImageClick = (image: string) => {
    maximizeImage(image, title);
  };
  
  return (
    <div className="relative mb-12">
      <motion.div 
        className="rounded-lg overflow-hidden border border-gray-100 shadow-sm mb-4 group relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <EditImageButton src={mainImage} />
        <AspectRatio ratio={16 / 9} className="bg-gray-100">
          <img
            src={mainImage}
            alt={title}
            className="object-cover w-full h-full cursor-pointer transition-all group-hover:brightness-95"
            loading="eager"
            onClick={() => handleImageClick(mainImage)}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 p-2 rounded-full">
              <Maximize className="h-6 w-6 text-white" />
            </div>
          </div>
        </AspectRatio>
        {captions && captions[mainImage] && (
          <motion.div 
            className="mt-2 text-sm text-gray-600 italic text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {captions[mainImage]}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectImageCarousel;
