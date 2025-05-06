
import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
  const allImages = [mainImage, ...extraImages];
  
  // Set up the event listener to track carousel position
  const handleCarouselChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="mb-12 space-y-4">
      <Carousel onValueChange={handleCarouselChange}>
        <CarouselContent>
          {allImages.map((img, index) => (
            <CarouselItem key={index}>
              <div className="h-[600px] w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                <img 
                  src={img} 
                  alt={`${title} - screenshot ${index + 1}`} 
                  className="w-full h-full object-contain bg-gray-50 dark:bg-gray-900/30" 
                  loading="lazy"
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
