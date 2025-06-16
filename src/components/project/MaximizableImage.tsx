
import React from "react";
import { Maximize } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import EditImageButton from "@/components/dev/EditImageButton";
import EditableText from "@/components/dev/EditableText";
import { useProjectPersistence } from "@/hooks/useProjectPersistence";
import { useParams } from "react-router-dom";

interface MaximizableImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: number;
  className?: string;
  priority?: boolean;
  imageList?: string[];
  currentIndex?: number;
  onImageReplace?: (newSrc: string) => void;
  projectId?: string;
}

const MaximizableImage: React.FC<MaximizableImageProps> = ({
  src,
  alt,
  caption,
  aspectRatio,
  className = "",
  priority = false,
  imageList,
  currentIndex,
  onImageReplace,
  projectId
}) => {
  const { maximizeImage } = useImageMaximizer();
  const { projectId: routeProjectId } = useParams<{ projectId: string }>();
  const currentProjectId = projectId || routeProjectId || '';
  const { getProjectData } = useProjectPersistence(currentProjectId);
  
  // Get the actual image source from merged data (includes published overrides)
  const actualImageSrc = React.useMemo(() => {
    const data = getProjectData();
    return data.imageReplacements[src] || src;
  }, [src, getProjectData]);
  
  console.log('MaximizableImage rendering:', {
    originalSrc: src,
    actualSrc: actualImageSrc,
    hasReplacement: actualImageSrc !== src,
    projectId: currentProjectId
  });
  
  const handleImageClick = () => {
    // Use caption for the title if available, otherwise use alt text
    const imageTitle = caption || alt || "Image";

    // If we have an image list and current index, pass them for navigation
    if (imageList && currentIndex !== undefined) {
      maximizeImage(actualImageSrc, imageTitle, imageList, currentIndex);
      console.log("Image clicked with gallery:", actualImageSrc, "Index:", currentIndex, "Total:", imageList.length);
    } else {
      // Single image mode
      maximizeImage(actualImageSrc, imageTitle);
      console.log("Image clicked (single):", actualImageSrc);
    }
  };

  const handleImageReplace = (newSrc: string) => {
    console.log('MaximizableImage: Image replacement requested', { oldSrc: src, newSrc, projectId: currentProjectId });
    
    if (onImageReplace) {
      onImageReplace(newSrc);
    }
  };

  // Use caption as alt text if available, otherwise use the provided alt text
  const imageAltText = caption || alt;
  
  return (
    <div className="w-full">
      <motion.div 
        className={`rounded-lg overflow-hidden border border-gray-100 shadow-sm group relative ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <EditImageButton 
          src={src} 
          onImageReplace={handleImageReplace}
          projectId={currentProjectId}
        />
        
        {aspectRatio ? (
          <AspectRatio ratio={aspectRatio} className="bg-gray-100">
            <img 
              src={actualImageSrc} 
              alt={imageAltText} 
              className="object-contain w-full h-full cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:brightness-95" 
              loading={priority ? "eager" : "lazy"}
              onClick={handleImageClick}
              onError={(e) => {
                console.error('Image failed to load:', actualImageSrc);
                console.log('Falling back to original src:', src);
                e.currentTarget.src = src;
              }}
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
        ) : (
          <div className="bg-gray-100 flex items-center justify-center min-h-[200px] p-4">
            <img 
              src={actualImageSrc} 
              alt={imageAltText} 
              loading={priority ? "eager" : "lazy"}
              onClick={handleImageClick}
              className="max-w-full max-h-full cursor-pointer transition-all duration-300 group-hover:scale-105 object-cover"
              onError={(e) => {
                console.error('Image failed to load:', actualImageSrc);
                console.log('Falling back to original src:', src);
                e.currentTarget.src = src;
              }}
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
          </div>
        )}
      </motion.div>
      
      {caption && (
        <div className="mt-2 text-sm text-gray-600 italic text-center">
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
    </div>
  );
};

export default MaximizableImage;
