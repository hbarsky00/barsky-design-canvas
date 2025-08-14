
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InteractiveImageGalleryProps {
  images: string[];
  captions?: Record<string, string>;
  title?: string;
  columns?: 2 | 3 | 4;
}

const InteractiveImageGallery: React.FC<InteractiveImageGalleryProps> = ({
  images,
  captions = {},
  title,
  columns = 3
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Override columns prop when there are exactly 2 images
  const getGridCols = () => {
    if (images.length === 2) {
      return "md:grid-cols-2";
    }
    
    const gridCols = {
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4"
    };
    
    return gridCols[columns];
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <div className="space-y-6">
      {title && (
        <h3 className="text-heading-2 text-navy-primary">{title}</h3>
      )}
      
      {/* Gallery Grid */}
      <div className={`grid grid-cols-1 ${getGridCols()} gap-6`}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="gallery-image group"
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={image}
                alt={captions[image] || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 p-3">
                  <Maximize className="h-5 w-5 text-navy-primary" />
                </div>
              </div>
            </div>
            
            {captions[image] && (
              <p className="mt-3 text-sm text-neutral-500 text-center">
                {captions[image]}
              </p>
            )}
          </motion.div>
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
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={closeLightbox}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Navigation Buttons - positioned at top */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-4 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute right-16 top-4 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image with transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src={images[selectedImage]}
                    alt={captions[images[selectedImage]] || `Gallery image ${selectedImage + 1}`}
                    className="max-w-full max-h-full object-contain cursor-pointer"
                    onClick={closeLightbox}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Caption */}
              {captions[images[selectedImage]] && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4"
                >
                  <p className="text-center">{captions[images[selectedImage]]}</p>
                </motion.div>
              )}

              {/* Image Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 text-sm rounded">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveImageGallery;
