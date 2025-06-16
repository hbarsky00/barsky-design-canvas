
import React, { useState } from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";
import { useDevMode } from "@/context/DevModeContext";
import { Button } from "@/components/ui/button";
import { Plus, X, GripVertical } from "lucide-react";

interface ProjectHeroImageSectionProps {
  projectId: string;
  imageCaptions: Record<string, string>;
}

const ProjectHeroImageSection: React.FC<ProjectHeroImageSectionProps> = ({
  projectId,
  imageCaptions
}) => {
  const { isDevMode } = useDevMode();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Define which projects have hero images and their URLs
  const projectHeroImages: Record<string, { url: string; title: string }[]> = {
    "medication-app": [
      {
        url: "/lovable-uploads/5ebc710e-fd8f-40aa-b092-99290c136a57.png",
        title: "Medication App Task Completion Interface"
      }
    ],
    "investor-loan-app": [
      {
        url: "/lovable-uploads/b49f4918-37cd-4ffa-bae3-2468e22f2fce.png",
        title: "Advanced Search Functionality"
      },
      {
        url: "/lovable-uploads/d9596b32-c5a5-42bd-9229-db1b496aeea4.png",
        title: "Advanced Loans Orderbook Interface"
      },
      {
        url: "/lovable-uploads/8d00085d-423a-4f72-be94-2f47f6c9a894.png",
        title: "Deal Central Dashboard"
      },
      {
        url: "/lovable-uploads/1a7eeadb-eae0-4c00-8a2c-a2ed24372c35.png",
        title: "Collaborative Deal Management"
      }
    ]
  };

  const initialImages = projectHeroImages[projectId] || [];
  const [heroImages, setHeroImages] = useState(initialImages);

  // Only show hero image section if project has images
  if (heroImages.length === 0 && !isDevMode) {
    return null;
  }

  const handleAddImage = () => {
    const newImage = {
      url: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
      title: "New showcase image"
    };
    setHeroImages(prev => [...prev, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setHeroImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageReplace = (index: number, newSrc: string) => {
    console.log('ProjectHeroImageSection: Replacing image at index', index, 'with', newSrc);
    setHeroImages(prev => prev.map((img, i) => 
      i === index ? { ...img, url: newSrc } : img
    ));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newImages = [...heroImages];
    const draggedImage = newImages[draggedIndex];
    
    // Remove the dragged image
    newImages.splice(draggedIndex, 1);
    
    // Insert at new position
    const insertIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newImages.splice(insertIndex, 0, draggedImage);
    
    setHeroImages(newImages);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Create empty slots to fill up to 4 images in dev mode
  const displayImages = [...heroImages];
  if (isDevMode) {
    while (displayImages.length < 4) {
      displayImages.push({
        url: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
        title: "Empty slot - click to add image"
      });
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <div className="glass-card-elevated p-8 layered-depth relative group">
        {isDevMode && heroImages.length < 4 && (
          <div className="absolute top-4 right-4 z-20">
            <Button
              onClick={handleAddImage}
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full shadow-md bg-background/90 backdrop-blur-sm hover:bg-background border-blue-300 hover:border-blue-500"
              title="Add showcase image"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}

        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Project Showcase
        </h2>
        
        <div className="floating-element">
          <div className="glass-card p-4 layered-depth">
            <div className="grid grid-cols-2 gap-4">
              {displayImages.slice(0, 4).map((imageData, index) => (
                <div 
                  key={`${imageData.url}-${index}`} 
                  className={`relative group/image ${
                    draggedIndex === index ? 'opacity-50' : ''
                  } ${index >= heroImages.length && isDevMode ? 'opacity-30' : ''}`}
                  draggable={isDevMode && index < heroImages.length}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  {isDevMode && index < heroImages.length && (
                    <div className="absolute top-2 right-2 z-30 flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover/image:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm cursor-grab active:cursor-grabbing"
                        title="Drag to reorder"
                      >
                        <GripVertical className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => handleRemoveImage(index)}
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover/image:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  <MaximizableImage
                    src={imageData.url}
                    alt={imageData.title}
                    caption={imageCaptions[imageData.url] || imageData.title}
                    imageList={heroImages.map(img => img.url)}
                    currentIndex={index}
                    priority={index === 0}
                    className={`rounded-xl shadow-elevated-lg w-full overflow-hidden ${
                      index >= heroImages.length && isDevMode 
                        ? 'border-2 border-dashed border-gray-300' 
                        : ''
                    }`}
                    onImageReplace={(newSrc) => handleImageReplace(index, newSrc)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectHeroImageSection;
