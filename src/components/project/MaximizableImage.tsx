
import React, { useState, useEffect } from "react";
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
  const { maximizeImage } = useImageMaximizer();
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [imageKey, setImageKey] = useState(0);

  // Update current source when prop changes
  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src);
      setImageKey(prev => prev + 1);
    }
  }, [src, currentSrc]);

  const handleMaximize = () => {
    maximizeImage(currentSrc, alt, imageList, currentIndex);
  };

  const handleImageReplace = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !projectId || !onImageReplace) return;

    setIsUploading(true);
    try {
      const newImageUrl = await ImageStorageService.uploadImage(file, projectId, currentSrc);
      if (newImageUrl) {
        // Add cache busting parameter
        const cacheBustedUrl = newImageUrl.includes('?') 
          ? `${newImageUrl}&v=${Date.now()}` 
          : `${newImageUrl}?v=${Date.now()}`;
        
        setCurrentSrc(cacheBustedUrl);
        setImageKey(prev => prev + 1);
        onImageReplace(cacheBustedUrl);
        console.log('Image replaced successfully:', cacheBustedUrl);
      }
    } catch (error) {
      console.error('Error replacing image:', error);
    } finally {
      setIsUploading(false);
      // Clear the input value to allow re-selecting the same file
      event.target.value = '';
    }
  };

  const handleImageRemove = () => {
    if (onImageRemove) {
      onImageRemove();
    }
  };

  const handleImageError = () => {
    console.error('Image failed to load:', currentSrc);
    // Force a reload with cache busting
    setImageKey(prev => prev + 1);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', currentSrc);
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className="relative group overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          key={`${currentSrc}-${imageKey}`}
          src={currentSrc}
          alt={alt}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
          onClick={handleMaximize}
          onError={handleImageError}
          onLoad={handleImageLoad}
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
      </div>
      
      {caption && (
        <div className="mt-2 px-2">
          <p className="text-gray-600 text-sm text-center">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default MaximizableImage;
