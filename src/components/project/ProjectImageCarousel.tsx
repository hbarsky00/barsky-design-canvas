
import React, { useState, useEffect } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";

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
  
  console.log("Carousel images:", { 
    mainImage, 
    originalExtraImages: extraImages,
    filteredExtraImages,
    allImages,
    totalImages: allImages.length
  });
  
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
    console.log(`Image ${index} loaded successfully:`, allImages[index]);
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

  return (
    <div className="mb-12 space-y-4">
      {allImages.length === 0 ? (
        <div className="h-[600px] w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-gray-900/30">
          <p className="text-gray-400">No images available</p>
        </div>
      ) : (
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {allImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="h-[600px] w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                  <img 
                    src={getImageSrc(index)} 
                    alt={`${title} - screenshot ${index + 1}`} 
                    className="w-full h-full object-contain bg-gray-50 dark:bg-gray-900/30" 
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
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
          <span className="font-medium">{activeIndex + 1}/{allImages.length}:</span> {activeIndex === 0 ? 
            "Main application view" : 
            `Additional screen of the ${title} application`}
        </div>
      )}
    </div>
  );
};

export default ProjectImageCarousel;
