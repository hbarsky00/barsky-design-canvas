
import React from "react";
import { Maximize } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import EditImageButton from "@/components/dev/EditImageButton";
import EditableText from "@/components/dev/EditableText";
import { useProjectPersistence } from "@/hooks/useProjectPersistence";
import { useParams } from "react-router-dom";

interface MaximizableImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: number;
  className?: string;
  priority?: boolean;
  imageList?: string[];
  currentIndex?: number;
  onImageReplace?: (newSrc: string) => void;
  projectId?: string;
}

const MaximizableImage: React.FC<MaximizableImageProps> = ({
  src,
  alt,
  caption,
  aspectRatio,
  className = "",
  priority = false,
  imageList,
  currentIndex,
  onImageReplace,
  projectId
}) => {
  const { maximizeImage } = useImageMaximizer();
  const { projectId: routeProjectId } = useParams<{ projectId: string }>();
  const currentProjectId = projectId || routeProjectId || '';
  const { getProjectData } = useProjectPersistence(currentProjectId);
  
  // Force re-renders when published data changes
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [displayedImage, setDisplayedImage] = React.useState(src);
  
  // Get the actual image source with replacements
  const actualImageSrc = React.useMemo(() => {
    const data = getProjectData();
    const replacedSrc = data.imageReplacements[src] || src;
    console.log('MaximizableImage: Computing image source', { 
      originalSrc: src, 
      replacedSrc, 
      hasReplacement: replacedSrc !== src,
      refreshKey,
      projectId: currentProjectId
    });
    return replacedSrc;
  }, [src, getProjectData, refreshKey, currentProjectId]);
  
  // Update displayed image when actual source changes
  React.useEffect(() => {
    console.log('MaximizableImage: Updating displayed image', { 
      actualImageSrc, 
      displayedImage,
      changed: actualImageSrc !== displayedImage 
    });
    setDisplayedImage(actualImageSrc);
  }, [actualImageSrc]);
  
  // Listen for all types of project data updates
  React.useEffect(() => {
    const handleProjectUpdate = (e: Event) => {
      console.log('MaximizableImage: Project data updated, refreshing');
      setRefreshKey(prev => prev + 1);
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes(`imageOverrides_${currentProjectId}`) || 
          e.key?.includes(`textOverrides_${currentProjectId}`) ||
          e.key?.includes(`project_${currentProjectId}`)) {
        console.log('MaximizableImage: Storage changed, refreshing');
        setRefreshKey(prev => prev + 1);
      }
    };

    const handleCacheCleared = (e: Event) => {
      console.log('MaximizableImage: Cache cleared, refreshing');
      setRefreshKey(prev => prev + 1);
    };

    // Listen for multiple event types
    window.addEventListener('projectDataUpdated', handleProjectUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('projectCacheCleared', handleCacheCleared);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('projectCacheCleared', handleCacheCleared);
    };
  }, [currentProjectId]);
  
  const handleImageClick = () => {
    const imageTitle = caption || alt || "Image";

    if (imageList && currentIndex !== undefined) {
      maximizeImage(displayedImage, imageTitle, imageList, currentIndex);
    } else {
      maximizeImage(displayedImage, imageTitle);
    }
  };

  const handleImageReplace = (newSrc: string) => {
    console.log('MaximizableImage: Image replacement requested', { 
      oldSrc: src, 
      newSrc, 
      projectId: currentProjectId 
    });
    
    // Immediately update the displayed image for instant feedback
    setDisplayedImage(newSrc);
    
    if (onImageReplace) {
      onImageReplace(newSrc);
    }
    
    // Force refresh to ensure all data is updated
    setTimeout(() => {
      setRefreshKey(prev => prev + 1);
    }, 100);
  };

  const imageAltText = caption || alt;
  
  return (
    <div className="w-full">
      <motion.div 
        className={`rounded-lg overflow-hidden border border-gray-100 shadow-sm group relative ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        key={`${displayedImage}-${refreshKey}`}
      >
        <EditImageButton 
          src={src} 
          onImageReplace={handleImageReplace}
          projectId={currentProjectId}
        />
        
        {aspectRatio ? (
          <AspectRatio ratio={aspectRatio} className="bg-gray-100">
            <img 
              src={displayedImage} 
              alt={imageAltText} 
              className="object-contain w-full h-full cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:brightness-95" 
              loading={priority ? "eager" : "lazy"}
              onClick={handleImageClick}
              onError={(e) => {
                console.error('Image failed to load:', displayedImage);
                // Try fallback to original source
                if (displayedImage !== src) {
                  console.log('Falling back to original source:', src);
                  setDisplayedImage(src);
                }
              }}
              key={`img-${displayedImage}-${refreshKey}`}
            />
            <button 
              onClick={handleImageClick}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Maximize image"
            >
              <div className="bg-black/50 p-2 rounded-full">
                <Maximize className="h-6 w-6 text-white" />
              </div>
            </button>
          </AspectRatio>
        ) : (
          <div className="bg-gray-100 flex items-center justify-center min-h-[200px] p-4">
            <img 
              src={displayedImage} 
              alt={imageAltText} 
              loading={priority ? "eager" : "lazy"}
              onClick={handleImageClick}
              className="max-w-full max-h-full cursor-pointer transition-all duration-300 group-hover:scale-105 object-cover"
              onError={(e) => {
                console.error('Image failed to load:', displayedImage);
                // Try fallback to original source
                if (displayedImage !== src) {
                  console.log('Falling back to original source:', src);
                  setDisplayedImage(src);
                }
              }}
              key={`img-${displayedImage}-${refreshKey}`}
            />
            <button 
              onClick={handleImageClick}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Maximize image"
            >
              <div className="bg-black/50 p-2 rounded-full">
                <Maximize className="h-6 w-6 text-white" />
              </div>
            </button>
          </div>
        )}
      </motion.div>
      
      {caption && (
        <div className="mt-2 text-sm text-gray-600 italic text-center">
          <EditableText initialText={caption}>
            {(text) => (
              <motion.div
                className="pr-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {text}
              </motion.div>
            )}
          </EditableText>
        </div>
      )}
    </div>
  );
};

export default MaximizableImage;
