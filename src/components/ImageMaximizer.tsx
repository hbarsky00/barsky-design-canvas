
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface ImageMaximizerProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

const ImageMaximizer: React.FC<ImageMaximizerProps> = ({ 
  src, 
  alt, 
  className = '',
  caption 
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleImageClick = () => {
    setIsMaximized(true);
  };

  const handleClose = () => {
    setIsMaximized(false);
  };

  return (
    <>
      <div className={`relative group cursor-pointer ${className}`} onClick={handleImageClick}>
        <img src={src} alt={alt} className="w-full h-full object-cover rounded-lg" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
          <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {caption && (
        <p className="text-sm text-gray-600 mt-2 text-center">{caption}</p>
      )}

      <AnimatePresence>
        {isMaximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageMaximizer;
