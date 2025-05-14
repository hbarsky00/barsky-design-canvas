
import React, { useState } from "react";
import { Image } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectImageCarouselProps {
  mainImage: string;
  title: string;
  extraImages: string[];
}

// Define a placeholder image to use when images fail to load
const FALLBACK_IMAGE = "/placeholder.svg";

const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({ 
  mainImage, 
  title, 
  extraImages 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Filter out main image from extraImages if it's duplicated
  const filteredExtraImages = extraImages.filter(img => img !== mainImage);
  const allImages = [mainImage, ...filteredExtraImages];
  
  const handleImageClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleImageError = (index: number) => {
    console.error(`Failed to load image ${index}:`, allImages[index]);
    setImageErrors(prev => ({...prev, [index]: true}));
  };

  // Function to get the proper image source
  const getImageSrc = (index: number): string => {
    if (imageErrors[index]) {
      return FALLBACK_IMAGE;
    }
    return allImages[index];
  };
  
  // Generate descriptions for images
  const getImageDescription = (index: number): string => {
    if (index === 0) {
      return "Main application view";
    }
    
    // For Herbalink project, provide specific descriptions
    if (title === "Herbalink") {
      const descriptions = [
        "Main application view",
        "Community and discussion forum",
        "Herbal consultations booking screen",
        "Find the perfect herbalist interface",
        "Herb library detail page",
        "Herb library main page"
      ];
      return descriptions[index] || `Additional screen of the ${title} application`;
    }
    
    // For Barsky Joint Food Truck project, provide specific descriptions
    if (title === "Barsky Joint Food Truck") {
      const descriptions = [
        "Main application view",
        "Cart screen with food items",
        "Bacon Chicken Cheese Special detail screen",
        "Menu browsing interface",
        "Order customization screen"
      ];
      return descriptions[index] || `Food item from ${title}`;
    }
    
    // For Gold 2 Crypto Services project, provide specific descriptions
    if (title === "Gold 2 Crypto Services") {
      const descriptions = [
        "Main application view",
        "Portfolio dashboard showing investment tracking",
        "Trading interface with real-time chart data",
        "Market overview with cryptocurrency listings",
        "Dashboard with portfolio summary and asset distribution"
      ];
      return descriptions[index] || `Trading platform screen from ${title}`;
    }
    
    // For Spectrum Apparel Co. project, provide specific descriptions
    if (title === "Spectrum Apparel Co.") {
      const descriptions = [
        "Main shop page with product categories",
        "Shopping cart overview with order summary",
        "Autism Expression Collection featuring sensory-friendly apparel",
        "Collection of autism awareness clothing with descriptive titles"
      ];
      return descriptions[index] || `E-commerce screen from ${title}`;
    }
    
    return `Additional screen of the ${title} application`;
  };

  return (
    <div className="mb-12 space-y-4">
      {allImages.length === 0 ? (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-gray-900/30">
          <div className="flex flex-col items-center text-gray-400 py-8">
            <Image className="w-16 h-16 mb-2 opacity-30" />
            <p>No images available</p>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="flex justify-center bg-gray-50 dark:bg-gray-900/30">
              <img 
                src={getImageSrc(activeIndex)} 
                alt={`${title} - screenshot ${activeIndex + 1}`} 
                className="max-h-[600px] w-auto object-contain"
                loading="lazy"
                onError={() => handleImageError(activeIndex)}
              />
            </div>
          </div>
          
          {allImages.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {allImages.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    activeIndex === index 
                      ? 'border-barsky-blue' 
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                  aria-label={`View ${getImageDescription(index)}`}
                >
                  <AspectRatio ratio={1}>
                    <img 
                      src={getImageSrc(index)} 
                      alt={`${title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => handleImageError(index)}
                    />
                  </AspectRatio>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      
      {allImages.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          <span className="font-medium">{activeIndex + 1}/{allImages.length}:</span> {getImageDescription(activeIndex)}
        </div>
      )}
    </div>
  );
};

export default ProjectImageCarousel;
