
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getCaptionClasses } from "@/utils/captionStyles";

interface ProjectMultiImageGalleryProps {
  images: string[];
  imageCaptions?: Record<string, string>;
  title?: string;
}

const ProjectMultiImageGallery: React.FC<ProjectMultiImageGalleryProps> = ({
  images,
  imageCaptions = {},
  title = "Gallery"
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (selectedImage === null) return;
    
    if (direction === 'next') {
      setSelectedImage((selectedImage + 1) % images.length);
    } else {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const getGridLayout = () => {
    if (images.length === 1) {
      return "grid-cols-1";
    } else {
      return "grid-cols-1 md:grid-cols-2";
    }
  };

  return (
    <div className="space-y-6">
      <div className={`grid ${getGridLayout()} gap-6`}>
        {images.map((image, index) => (
          <motion.figure
            key={image}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card layered-depth group relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={image}
              alt={imageCaptions[image] || `Gallery image ${index + 1}`}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            
            {imageCaptions[image] && (
              <figcaption className={getCaptionClasses({ 
                variant: 'card', 
                alignment: 'left',
                className: "absolute bottom-0 left-0 right-0 m-3 backdrop-blur-md"
              })}>
                {imageCaptions[image]}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-20"
            >
              <X className="h-8 w-8" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-4 top-4 text-white hover:text-gray-300 z-20 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-16 top-4 text-white hover:text-gray-300 z-20 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -100 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[selectedImage]}
                  alt={imageCaptions[images[selectedImage]] || `Gallery image ${selectedImage + 1}`}
                  className="max-w-full max-h-full object-contain cursor-pointer"
                  onClick={closeLightbox}
                />
              </motion.div>
            </AnimatePresence>

            {imageCaptions[images[selectedImage]] && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 text-center"
              >
                <div className={getCaptionClasses({ 
                  variant: 'card', 
                  alignment: 'center',
                  className: "inline-block backdrop-blur-md"
                })}>
                  {imageCaptions[images[selectedImage]]}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectMultiImageGallery;
