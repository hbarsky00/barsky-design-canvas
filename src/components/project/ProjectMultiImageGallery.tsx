import React, { useState, useCallback } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi 
} from "@/components/ui/carousel";
import { Maximize } from "lucide-react";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import EditImageButton from "@/components/dev/EditImageButton";
import EditTextButton from "@/components/dev/EditTextButton";

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  
  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!api) return;
    
    onSelect(api);
    api.on("select", onSelect);
    
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  
  const handleImageClick = (image: string) => {
    if (onImageClick) {
      const caption = captions[image] || "Project Design";
      onImageClick(image, caption);
    } else {
      maximizeImage(image, captions[image] || "Project Design", images, images.indexOf(image));
      console.log("Gallery image clicked:", image);
    }
  };

  // Function to generate meaningful fallback alt text
  const generateFallbackAlt = (index: number) => {
    const types = [
      "Interface design",
      "User workflow", 
      "Wireframe sketch",
      "Design mockup",
      "System diagram",
      "Dashboard view",
      "Mobile interface",
      "Process flow",
      "Feature overview",
      "Design concept"
    ];
    return types[index % types.length];
  };

  if (!images || images.length === 0) {
    return null;
  }

  const hasMultipleImages = images.length > 1;

  return (
    <motion.div
      className="mb-8 overflow-hidden relative w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: hasMultipleImages,
        }}
        className="w-full relative"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="p-1 w-full">
                <div className="overflow-hidden rounded-lg border border-gray-100 shadow-sm group relative w-full min-h-[400px] flex items-center justify-center bg-gray-50">
                  <EditImageButton src={image} />
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={image}
                      alt={captions[image] || generateFallbackAlt(index)}
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
                  {/* Custom navigation arrows with proper visibility logic */}
                  {hasMultipleImages && (
                    <>
                      {/* Show previous arrow only from second image onwards */}
                      {current > 0 && (
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 border border-gray-200 shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                      {/* Always show next arrow when there are multiple images and not on last image */}
                      {current < images.length - 1 && (
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 border border-gray-200 shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </>
                  )}
                </div>
                {captions[image] && (
                  <div className="relative group mt-3 text-sm text-gray-600 italic text-center px-2">
                    <EditTextButton text={captions[image]} />
                    <span className="pr-8">{captions[image]}</span>
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
