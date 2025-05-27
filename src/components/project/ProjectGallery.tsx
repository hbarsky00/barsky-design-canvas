
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
    <div className="mb-8 relative">
      <Carousel className="w-full relative group">
        <CarouselContent>
          {galleryImages.map((image, index) => (
            <CarouselItem key={`image-${index}`}>
              <div className="flex items-center justify-center p-6 relative min-h-[400px]">
                <MaximizableImage
                  src={image}
                  alt={captions[image] || `Project image ${index + 1}`}
                  caption={captions[image]}
                  className="w-full h-full max-h-[600px] object-contain"
                  aspectRatio={undefined}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Position arrows inside the carousel area */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 border border-gray-200 shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 border border-gray-200 shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </Carousel>
    </div>
  );
};

export default ProjectGallery;
