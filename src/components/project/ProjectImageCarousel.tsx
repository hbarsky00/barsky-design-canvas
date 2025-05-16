
import React from "react";
import { Maximize } from "lucide-react";
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
  onImageClick,
  captions = {}
}) => {
  const handleImageClick = (image: string) => {
    if (onImageClick) {
      onImageClick(image, title);
    }
  };
  
  return (
    <div className="relative mb-12">
      <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm mb-4 group relative">
        <AspectRatio ratio={16 / 9} className="bg-gray-100">
          <img
            src={mainImage}
            alt={title}
            className="object-cover w-full h-full cursor-pointer transition-all group-hover:brightness-95"
            loading="eager"
            onClick={() => handleImageClick(mainImage)}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 p-2 rounded-full">
              <Maximize className="h-6 w-6 text-white" />
            </div>
          </div>
        </AspectRatio>
        {captions && captions[mainImage] && (
          <div className="mt-2 text-sm text-gray-600 italic text-center">
            {captions[mainImage]}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectImageCarousel;
