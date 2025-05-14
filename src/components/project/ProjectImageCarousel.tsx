
import React from "react";
import { Image } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectImageCarouselProps {
  mainImage: string;
  title: string;
  extraImages: string[]; // Keeping this for backward compatibility
}

// Define a placeholder image to use when images fail to load
const FALLBACK_IMAGE = "/placeholder.svg";

const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({ 
  mainImage, 
  title
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  const handleImageError = () => {
    console.error(`Failed to load main image:`, mainImage);
    setImageError(true);
  };

  // Function to get the proper image source
  const getImageSrc = (): string => {
    if (imageError) {
      return FALLBACK_IMAGE;
    }
    return mainImage;
  };

  return (
    <div className="mb-12 space-y-4">
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="flex justify-center bg-gray-50 dark:bg-gray-900/30">
          <img 
            src={getImageSrc()} 
            alt={`${title} - main screenshot`} 
            className="max-h-[600px] w-auto object-contain"
            loading="lazy"
            onError={handleImageError}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectImageCarousel;
