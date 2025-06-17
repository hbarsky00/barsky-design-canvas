
import React from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaximizableImage from "./MaximizableImage";
import { useDevMode } from "@/context/DevModeContext";

interface ProjectGalleryProps {
  images: string[];
  imageCaptions: Record<string, string>;
  allImages: string[];
  onImageReorder?: (oldIndex: number, newIndex: number) => void;
  onCaptionUpdate?: (imageSrc: string, newCaption: string) => void;
  projectId?: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ 
  images, 
  imageCaptions,
  allImages,
  onImageReorder,
  onCaptionUpdate,
  projectId
}) => {
  const { isDevMode } = useDevMode();
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex === dropIndex || draggedIndex === null) {
      setDraggedIndex(null);
      return;
    }

    if (onImageReorder) {
      onImageReorder(dragIndex, dropIndex);
    }
    
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mobile-gallery-grid">
      {images.map((image, index) => {
        const caption = imageCaptions[image] || `Gallery image ${index + 1}`;
        const imageIndex = allImages.indexOf(image);
        const handleCaptionChange = onCaptionUpdate ? (newCaption: string) => onCaptionUpdate(image, newCaption) : undefined;
        
        return (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative group ${draggedIndex === index ? 'opacity-50' : ''}`}
          >
            <div
              draggable={isDevMode}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className="w-full h-full"
            >
              {isDevMode && (
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 sm:h-6 sm:w-6 bg-background/80 backdrop-blur-sm cursor-grab active:cursor-grabbing"
                    title="Drag to reorder"
                  >
                    <GripVertical className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </Button>
                </div>
              )}
              
              <MaximizableImage
                src={image}
                alt={caption}
                caption={caption}
                aspectRatio={4/3}
                imageList={allImages}
                currentIndex={imageIndex >= 0 ? imageIndex : 0}
                projectId={projectId}
                onCaptionUpdate={handleCaptionChange}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProjectGallery;
