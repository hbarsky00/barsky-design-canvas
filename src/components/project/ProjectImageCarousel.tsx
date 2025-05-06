
import React, { useState, useRef, useEffect } from "react";
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

const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({ 
  mainImage, 
  title, 
  extraImages 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const allImages = [mainImage, ...extraImages];
  
  console.log("Carousel images:", { mainImage, extraImages, allImages });
  
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
    console.log(`Image ${index} loaded successfully`);
    setImagesLoaded(prev => ({...prev, [index]: true}));
  };

  const handleImageError = (index: number) => {
    console.error(`Failed to load image ${index}:`, allImages[index]);
  };

  return (
    <div className="mb-12 space-y-4">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {allImages.map((img, index) => (
            <CarouselItem key={index}>
              <div className="h-[600px] w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                <img 
                  src={img} 
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
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      
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
