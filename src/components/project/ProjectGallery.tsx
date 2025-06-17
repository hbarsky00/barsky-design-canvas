
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
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ 
  images, 
  imageCaptions,
  allImages,
  onImageReorder
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => {
        const caption = imageCaptions[image] || `Gallery image ${index + 1}`;
        const imageIndex = allImages.indexOf(image);
        
        return (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative group ${draggedIndex === index ? 'opacity-50' : ''}`}
            draggable={isDevMode}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            {isDevMode && (
              <div className="absolute top-2 left-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 bg-background/80 backdrop-blur-sm cursor-grab active:cursor-grabbing"
                  title="Drag to reorder"
                >
                  <GripVertical className="h-3 w-3" />
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
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProjectGallery;
