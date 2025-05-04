
import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
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
  
  // Create a ref to store the Embla API
  const [emblaRef, emblaApi] = useEmblaCarousel();

  // Set up the event listener when emblaApi becomes available
  React.useEffect(() => {
    if (emblaApi) {
      // Update active index when the carousel changes slides
      const onSelect = () => {
        setActiveIndex(emblaApi.selectedScrollSnap());
      };

      emblaApi.on("select", onSelect);
      // Call once initially to set the correct starting state
      onSelect();
      
      // Cleanup when unmounting
      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  // Handle tab selection - scroll carousel to appropriate slide
  const handleTabChange = (value: string) => {
    const index = parseInt(value);
    setActiveIndex(index);
    
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  return (
    <div className="mb-12 space-y-4">
      <Carousel>
        <CarouselContent ref={emblaRef}>
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
            onValueChange={handleTabChange}
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
