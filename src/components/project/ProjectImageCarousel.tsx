
import React from "react";
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
  return (
    <div className="mb-12">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="h-[500px] w-full overflow-hidden rounded-xl">
              <img 
                src={mainImage} 
                alt={title} 
                className="w-full h-full object-cover" 
              />
            </div>
          </CarouselItem>
          {extraImages.map((img, index) => (
            <CarouselItem key={index}>
              <div className="h-[500px] w-full overflow-hidden rounded-xl">
                <img 
                  src={img} 
                  alt={`${title} - view ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default ProjectImageCarousel;
