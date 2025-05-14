
import React from "react";
import { ArrowLeft, ArrowRight, Maximize } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectImageCarouselProps {
  mainImage: string;
  title: string;
  extraImages?: string[];
  onImageClick?: (image: string, title: string) => void;
  captions?: Record<string, string>;
}

const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({
  mainImage,
  title,
  extraImages = [],
  onImageClick,
  captions = {}
}) => {
  const allImages = [mainImage, ...extraImages];
  
  const handleImageClick = (image: string) => {
    if (onImageClick) {
      onImageClick(image, title);
    }
  };
  
  return (
    <div className="relative mb-12">
      {allImages.length > 0 && (
        <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm mb-4 group relative">
          <AspectRatio ratio={16 / 9} className="bg-gray-100">
            <img
              src={allImages[0]}
              alt={title}
              className="object-cover w-full h-full cursor-pointer transition-all group-hover:brightness-95"
              loading="eager"
              onClick={() => handleImageClick(allImages[0])}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/50 p-2 rounded-full">
                <Maximize className="h-6 w-6 text-white" />
              </div>
            </div>
          </AspectRatio>
          {captions && captions[allImages[0]] && (
            <div className="mt-2 text-sm text-gray-600 italic text-center">
              {captions[allImages[0]]}
            </div>
          )}
        </div>
      )}
      
      {allImages.length > 1 && (
        <div className="grid grid-cols-3 gap-4">
          {allImages.slice(1, 4).map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden border border-gray-100 shadow-sm group relative">
              <AspectRatio ratio={16 / 9} className="bg-gray-100">
                <img
                  src={image}
                  alt={`${title} - image ${index + 2}`}
                  className="object-cover w-full h-full cursor-pointer transition-all group-hover:brightness-95"
                  loading="lazy"
                  onClick={() => handleImageClick(image)}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 p-2 rounded-full">
                    <Maximize className="h-6 w-6 text-white" />
                  </div>
                </div>
              </AspectRatio>
              {captions && captions[image] && (
                <div className="mt-1 text-sm text-gray-600 italic text-center line-clamp-2">
                  {captions[image]}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectImageCarousel;
