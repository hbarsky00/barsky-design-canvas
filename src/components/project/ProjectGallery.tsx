
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MaximizableImage from "./MaximizableImage";

interface ProjectGalleryProps {
  galleryImages: string[];
  captions?: Record<string, string>;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ 
  galleryImages, 
  captions = {}
}) => {
  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {galleryImages.map((image, index) => (
            <CarouselItem key={`image-${index}`}>
              <div className="flex aspect-video items-center justify-center p-6">
                <MaximizableImage
                  src={image}
                  alt={`Project gallery image ${index + 1}`}
                  caption={captions[image]}
                  className="w-full h-full object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProjectGallery;
