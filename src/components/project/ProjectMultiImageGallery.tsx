
import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Maximize } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

interface ProjectMultiImageGalleryProps {
  images: string[];
  captions?: Record<string, string>;
  onImageClick?: (image: string, title: string) => void;
}

const ProjectMultiImageGallery: React.FC<ProjectMultiImageGalleryProps> = ({
  images,
  captions = {},
  onImageClick,
}) => {
  const handleImageClick = (image: string) => {
    if (onImageClick) {
      const caption = captions[image] || "Project Image";
      onImageClick(image, caption);
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mb-6 overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Carousel
        opts={{
          align: "start",
          loop: images.length > 1,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-2/3 lg:basis-3/4">
              <div className="p-1">
                <div className="overflow-hidden rounded-lg border border-gray-100 shadow-sm group relative">
                  <AspectRatio ratio={16 / 9} className="bg-gray-50">
                    <img
                      src={image}
                      alt={captions[image] || `Project Image ${index + 1}`}
                      className="object-cover w-full h-full cursor-pointer transition-all group-hover:brightness-95"
                      onClick={() => handleImageClick(image)}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/50 p-2 rounded-full">
                        <Maximize className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </AspectRatio>
                </div>
                {captions[image] && (
                  <div className="mt-2 text-sm text-gray-600 italic text-center px-2">
                    {captions[image]}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2 lg:-left-8" />
            <CarouselNext className="right-2 lg:-right-8" />
          </>
        )}
      </Carousel>
    </motion.div>
  );
};

export default ProjectMultiImageGallery;
