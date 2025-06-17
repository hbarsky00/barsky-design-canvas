
import React from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaximizableImage from "./MaximizableImage";
import { useDevMode } from "@/context/DevModeContext";

interface ProjectMultiImageGalleryProps {
  images: string[];
  captions: Record<string, string>;
  onImageReplace?: (oldSrc: string, newSrc: string) => void;
  onImageReorder?: (oldIndex: number, newIndex: number) => void;
}

const ProjectMultiImageGallery: React.FC<ProjectMultiImageGalleryProps> = ({ 
  images, 
  captions,
  onImageReplace,
  onImageReorder
}) => {
  const { isDevMode } = useDevMode();
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

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
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-card-elevated mobile-optimized-padding mobile-section-spacing layered-depth floating-element"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 mobile-gallery-grid">
        {images.map((image, index) => (
          <div 
            key={image} 
            className={`glass-card mobile-image-container layered-depth floating-element relative group ${
              draggedIndex === index ? 'opacity-50' : ''
            }`}
            draggable={isDevMode}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
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
              alt={captions[image] || `Gallery image ${index + 1}`}
              caption={captions[image]}
              imageList={images}
              currentIndex={index}
              className="rounded-md sm:rounded-lg shadow-md sm:shadow-elevated w-full"
              onImageReplace={onImageReplace ? (newSrc) => onImageReplace(image, newSrc) : undefined}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectMultiImageGallery;
