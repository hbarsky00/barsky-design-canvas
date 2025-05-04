
import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  
  // Handle when the carousel changes slides
  const handleCarouselChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="mb-12 space-y-4">
      <Carousel 
        className="w-full" 
        onValueChange={(value) => handleCarouselChange(parseInt(value))}
      >
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
      
      {allImages.length > 1 && (
        <div className="flex justify-center">
          <Tabs 
            defaultValue="0"
            value={activeIndex.toString()}
            onValueChange={(value) => handleCarouselChange(parseInt(value))}
            className="w-fit"
          >
            <TabsList>
              {allImages.map((_, index) => (
                <TabsTrigger key={index} value={index.toString()} className="px-3 py-1">
                  {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}
      
      <div className="text-center text-sm text-gray-500">
        {activeIndex === 0 ? 
          "Main application view" : 
          `Additional screenshot ${activeIndex} of the ${title} application`}
      </div>
    </div>
  );
};

export default ProjectImageCarousel;
