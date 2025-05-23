
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
  videoUrl?: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ 
  galleryImages, 
  captions = {},
  videoUrl 
}) => {
  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  // Convert YouTube Shorts URL to embeddable format
  const getEmbedUrl = (url: string) => {
    const videoId = url.match(/shorts\/([^?]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {galleryImages.map((image, index) => {
            // Insert video before the last image
            const isLastImage = index === galleryImages.length - 1;
            
            return (
              <React.Fragment key={`gallery-item-${index}`}>
                {/* Show video before the last image */}
                {isLastImage && videoUrl && (
                  <CarouselItem key="video-item">
                    <div className="flex aspect-video items-center justify-center p-6">
                      <iframe
                        src={getEmbedUrl(videoUrl)}
                        title="Barsky Joint Demo Video"
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </CarouselItem>
                )}
                
                {/* Regular image item */}
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
              </React.Fragment>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProjectGallery;
