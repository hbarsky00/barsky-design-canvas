import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, Edit, X, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { VercelBlobStorageService } from "@/services/vercelBlobStorage";
import { toast } from "sonner";
import { shouldShowEditingControls } from "@/utils/devModeDetection";

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
  const [forceRefresh, setForceRefresh] = useState(0);
  const showEditingControls = shouldShowEditingControls();

  // Update current source when prop changes and force complete refresh
  useEffect(() => {
    if (src !== currentSrc) {
      console.log('🔄 Image src changed, forcing complete refresh:', src);
      setCurrentSrc(src);
      setImageError(false);
      setForceRefresh(prev => prev + 1);
      
      // Force browser to reload the image by clearing cache
      const img = new Image();
      img.onload = () => {
        console.log('✅ New image preloaded successfully');
        setForceRefresh(prev => prev + 1);
      };
      img.src = src + '?refresh=' + Date.now();
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
      console.error('❌ Invalid file type');
      toast.error('Please select an image file');
      event.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      console.error('❌ File too large');
      toast.error('Image must be smaller than 10MB');
      event.target.value = '';
      return;
    }

    setIsUploading(true);
    setImageError(false);
    toast.info('Uploading image to Vercel Blob...');
    
    try {
      console.log('📤 Starting image upload for replacement using Vercel Blob:', file.name);
      
      // Create immediate preview using FileReader for instant feedback
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        if (previewUrl) {
          console.log('🖼️ Showing immediate preview while uploading');
          setCurrentSrc(previewUrl);
          setForceRefresh(prev => prev + 1);
        }
      };
      reader.readAsDataURL(file);
      
      const newImageUrl = await VercelBlobStorageService.uploadImage(file, projectId, currentSrc);
      
      if (newImageUrl) {
        // Add timestamp for cache busting
        const cacheBustedUrl = `${newImageUrl}?v=${Date.now()}`;
        
        console.log('✅ Image uploaded successfully to Vercel Blob, updating to final URL:', cacheBustedUrl);
        
        // Update to final uploaded URL
        setCurrentSrc(cacheBustedUrl);
        setForceRefresh(prev => prev + 1);
        setImageError(false);
        
        // Call parent callback immediately
        onImageReplace(cacheBustedUrl);
        
        // Force all images with this src to update in the DOM
        setTimeout(() => {
          document.querySelectorAll(`img[src*="${src}"]`).forEach((img) => {
            (img as HTMLImageElement).src = cacheBustedUrl;
          });
          
          // Trigger a global refresh event
          window.dispatchEvent(new CustomEvent('imageReplaced', {
            detail: { oldSrc: src, newSrc: cacheBustedUrl }
          }));
          
          console.log('🔄 Triggered global image refresh');
        }, 100);
        
        toast.success('Image uploaded successfully!');
        console.log('🎉 Image replacement completed successfully using Vercel Blob');
      } else {
        console.error('❌ Upload failed - no URL returned');
        setCurrentSrc(src); // Revert to original
        setImageError(true);
        toast.error('Image upload failed. Please check your Vercel Blob configuration.');
      }
    } catch (error) {
      console.error('❌ Error uploading image to Vercel Blob:', error);
      setCurrentSrc(src); // Revert to original
      setImageError(true);
      toast.error('Image upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const handleImageRemove = () => {
    if (onImageRemove) {
      console.log('🗑️ Removing image:', currentSrc);
      onImageRemove();
    }
  };

  const handleImageError = () => {
    console.error('❌ Image failed to load:', currentSrc);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', currentSrc);
    setImageError(false);
  };

  // Create final URL with aggressive cache busting
  const displayUrl = React.useMemo(() => {
    const baseUrl = currentSrc;
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}refresh=${forceRefresh}&t=${Date.now()}`;
  }, [currentSrc, forceRefresh]);

  return (
    <div className={`relative ${className}`} key={`image-${forceRefresh}`}>
      <div 
        className="relative group overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imageError ? (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-sm">Failed to load image</div>
              {showEditingControls && (
                <div className="text-xs mt-1">Try replacing with a new image</div>
              )}
            </div>
          </div>
        ) : (
          <img
            key={`img-${forceRefresh}-${Date.now()}`}
            src={displayUrl}
            alt={alt}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
            onClick={handleMaximize}
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ 
              opacity: isUploading ? 0.7 : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
        )}
        
        {/* Upload Progress Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2" />
              <div className="text-sm">Uploading to Vercel Blob...</div>
            </div>
          </div>
        )}
        
        <AnimatePresence>
          {isHovered && !imageError && !isUploading && (
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
                
                {showEditingControls && !hideEditButton && onImageReplace && (
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
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {showEditingControls && allowRemove && onImageRemove && (
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
