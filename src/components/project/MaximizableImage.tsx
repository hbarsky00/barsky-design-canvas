
import React, { useState } from "react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import ImageOverlay from "./image/ImageOverlay";
import UploadOverlay from "./image/UploadOverlay";
import ImageErrorFallback from "./image/ImageErrorFallback";
import EditableCaption from "../caption/EditableCaption";
import { VercelBlobStorageService } from "@/services/vercelBlobStorage";
import { toast } from "sonner";

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
  const [imageError, setImageError] = useState(false);
  const showEditingControls = shouldShowEditingControls();

  console.log('🖼️ MaximizableImage: Rendering with src:', src);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !projectId || !onImageReplace) {
      event.target.value = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      event.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be smaller than 10MB');
      event.target.value = '';
      return;
    }

    setIsUploading(true);
    toast.info('Uploading image...');
    
    try {
      console.log('📤 Starting upload for:', file.name);
      
      const uploadedUrl = await VercelBlobStorageService.uploadImage(
        file, 
        projectId, 
        `replacement-${Date.now()}`
      );
      
      if (uploadedUrl) {
        console.log('✅ Upload successful:', uploadedUrl);
        await onImageReplace(uploadedUrl);
        toast.success('Image replaced successfully!');
      } else {
        console.error('❌ Upload failed');
        toast.error('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const handleMaximize = () => {
    if (!imageError) {
      maximizeImage(src, alt, imageList, currentIndex);
    }
  };

  const handleImageRemove = () => {
    if (onImageRemove && showEditingControls) {
      onImageRemove();
    }
  };

  const handleImageError = () => {
    console.error('❌ Image failed to load:', src);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully');
    setImageError(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className="relative group overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imageError ? (
          <ImageErrorFallback 
            showEditingControls={showEditingControls}
            originalSrc={src}
          />
        ) : (
          <img
            src={src}
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
        
        <UploadOverlay isUploading={isUploading} />
        
        <ImageOverlay
          isHovered={isHovered}
          isUploading={isUploading}
          imageError={imageError}
          showEditingControls={showEditingControls}
          hideEditButton={hideEditButton}
          allowRemove={allowRemove}
          onMaximize={handleMaximize}
          onImageReplace={handleImageUpload}
          onImageRemove={handleImageRemove}
        />
      </div>
      
      <EditableCaption
        imageSrc={src}
        initialCaption={caption || ''}
        projectId={projectId}
        className="maximizable-image-caption"
      />
    </div>
  );
};

export default MaximizableImage;
