
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, Edit, X, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { ImageStorageService } from "@/services/imageStorage";

interface MaximizableImageProps {
  src: string;
  alt: string;
  caption?: string;
  imageList?: string[];
  currentIndex?: number;
  priority?: boolean;
  className?: string;
  projectId?: string;
  hideEditButton?: boolean;
  allowRemove?: boolean;
  onImageReplace?: (newSrc: string) => void;
  onImageRemove?: () => void;
}

const MaximizableImage: React.FC<MaximizableImageProps> = ({
  src,
  alt,
  caption,
  imageList = [src],
  currentIndex = 0,
  priority = false,
  className = "",
  projectId,
  hideEditButton = false,
  allowRemove = false,
  onImageReplace,
  onImageRemove
}) => {
  const { openMaximizer } = useImageMaximizer();
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleMaximize = () => {
    openMaximizer({
      src,
      alt,
      caption,
      imageList,
      currentIndex
    });
  };

  const handleImageReplace = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !projectId || !onImageReplace) return;

    setIsUploading(true);
    try {
      const newImageUrl = await ImageStorageService.uploadImage(file, projectId, src);
      if (newImageUrl) {
        onImageReplace(newImageUrl);
        console.log('Image replaced successfully:', newImageUrl);
      }
    } catch (error) {
      console.error('Error replacing image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageRemove = () => {
    if (onImageRemove) {
      onImageRemove();
    }
  };

  return (
    <div 
      className={`relative group overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        loading={priority ? "eager" : "lazy"}
        onClick={handleMaximize}
      />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleMaximize}
                className="bg-white/90 hover:bg-white text-gray-900"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              {!hideEditButton && onImageReplace && (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageReplace}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-blue-500/90 hover:bg-blue-600 text-white"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Edit className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
              
              {allowRemove && onImageRemove && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleImageRemove}
                  className="bg-red-500/90 hover:bg-red-600 text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white text-sm">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default MaximizableImage;
