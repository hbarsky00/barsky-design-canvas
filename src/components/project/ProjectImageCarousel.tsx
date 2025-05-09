import React, { useState, useEffect } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { Image } from "lucide-react";

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
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Filter out main image from extraImages if it's duplicated
  const filteredExtraImages = extraImages.filter(img => img !== mainImage);
  const allImages = [mainImage, ...filteredExtraImages];
  
  // Use the api to track carousel position changes
  useEffect(() => {
    if (!api) return;
    
    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    
    api.on("select", handleSelect);
    
    // Cleanup
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({...prev, [index]: true}));
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
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {allImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex justify-center bg-gray-50 dark:bg-gray-900/30">
                    <img 
                      src={getImageSrc(index)} 
                      alt={`${title} - screenshot ${index + 1}`} 
                      className="max-h-[600px] w-auto object-contain"
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {allImages.length > 1 && (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          )}
        </Carousel>
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
