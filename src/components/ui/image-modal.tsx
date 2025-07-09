import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageModalProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  src,
  alt,
  caption,
  className = "",
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Clickable trigger */}
      <div 
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer transition-transform duration-200 hover:scale-[1.02] ${className}`}
      >
        {children || (
          <figure className="project-image-container">
            <img 
              src={src}
              alt={alt}
              className="w-full h-auto object-cover rounded-3xl shadow-2xl"
            />
            {caption && (
              <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                {caption}
              </figcaption>
            )}
          </figure>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain rounded-lg"
              />
              
              {caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white p-4 rounded-b-lg">
                  <p className="text-center text-sm">{caption}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};