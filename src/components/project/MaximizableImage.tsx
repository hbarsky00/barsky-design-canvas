
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
  const [imageError, setImageError] = useState(false);
  const [imageKey, setImageKey] = useState(Date.now());

  // Update current source when prop changes - force refresh
  useEffect(() => {
    if (src !== currentSrc) {
      console.log('Image src changed, updating:', src);
      setCurrentSrc(src);
      setImageError(false);
      setImageKey(Date.now()); // Force image refresh
    }
  }, [src]);

  const handleMaximize = () => {
    if (!imageError) {
      maximizeImage(currentSrc, alt, imageList, currentIndex);
    }
  };

  const handleImageReplace = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !projectId || !onImageReplace) {
      event.target.value = '';
      return;
    }

    // Validate file
    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type');
      event.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      console.error('File too large');
      event.target.value = '';
      return;
    }

    setIsUploading(true);
    setImageError(false);

    try {
      console.log('Starting image upload for replacement:', file.name);
      
      const newImageUrl = await ImageStorageService.uploadImage(file, projectId, currentSrc);
      
      if (newImageUrl) {
        // Create cache-busted URL with timestamp
        const timestamp = Date.now();
        const cacheBustedUrl = newImageUrl.includes('?') 
          ? `${newImageUrl}&cb=${timestamp}` 
          : `${newImageUrl}?cb=${timestamp}`;
        
        console.log('Image uploaded successfully, updating UI:', cacheBustedUrl);
        
        // Update local state immediately for instant feedback
        setCurrentSrc(cacheBustedUrl);
        setImageKey(timestamp);
        setImageError(false);
        
        // Call parent callback to update parent state
        onImageReplace(cacheBustedUrl);
        
        console.log('Image replacement completed successfully');
      } else {
        console.error('Upload failed - no URL returned');
        setImageError(true);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageError(true);
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const handleImageRemove = () => {
    if (onImageRemove) {
      console.log('Removing image:', currentSrc);
      onImageRemove();
    }
  };

  const handleImageError = () => {
    console.error('Image failed to load:', currentSrc);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', currentSrc);
    setImageError(false);
  };

  // Create the final image URL with cache busting
  const imageUrl = currentSrc.includes('?') 
    ? `${currentSrc}&key=${imageKey}` 
    : `${currentSrc}?key=${imageKey}`;

  return (
    <div className={`relative ${className}`}>
      <div 
        className="relative group overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imageError ? (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-sm">Failed to load image</div>
              <div className="text-xs mt-1">Try replacing with a new image</div>
            </div>
          </div>
        ) : (
          <img
            key={imageKey} // Force re-render when key changes
            src={imageUrl}
            alt={alt}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
            onClick={handleMaximize}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
        
        <AnimatePresence>
          {isHovered && !imageError && (
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
