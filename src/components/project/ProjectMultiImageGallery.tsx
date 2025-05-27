
import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Maximize } from "lucide-react";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";

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
  const { maximizeImage } = useImageMaximizer();
  
  const handleImageClick = (image: string) => {
    if (onImageClick) {
      const caption = captions[image] || "Project Image";
      onImageClick(image, caption);
    } else {
      maximizeImage(image, captions[image] || "Project Image", images, images.indexOf(image));
      console.log("Gallery image clicked:", image);
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mb-8 overflow-hidden relative w-full"
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
        className="w-full relative"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="p-1 w-full">
                <div className="overflow-hidden rounded-lg border border-gray-100 shadow-sm group relative w-full min-h-[400px] flex items-center justify-center bg-gray-50">
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={image}
                      alt={captions[image] || `Project image showing relevant design or interface ${index + 1}`}
                      className="max-w-full max-h-[600px] object-contain cursor-pointer transition-all duration-300 group-hover:scale-[1.02]"
                      onClick={() => handleImageClick(image)}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <button
                      onClick={() => handleImageClick(image)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Maximize image"
                    >
                      <div className="bg-black/50 p-2 rounded-full">
                        <Maximize className="h-6 w-6 text-white" />
                      </div>
                    </button>
                  </div>
                  {/* Navigation arrows positioned inside the image */}
                  {images.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 border border-gray-200 shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 border border-gray-200 shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </div>
                {captions[image] && (
                  <div className="mt-3 text-sm text-gray-600 italic text-center px-2">
                    {captions[image]}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </motion.div>
  );
};

export default ProjectMultiImageGallery;
