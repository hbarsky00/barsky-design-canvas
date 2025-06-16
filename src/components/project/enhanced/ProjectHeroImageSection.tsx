
import React, { useState } from "react";
import { motion } from "framer-motion";
import MaximizableImage from "../MaximizableImage";
import { useDevMode } from "@/context/DevModeContext";
import { Button } from "@/components/ui/button";
import { Plus, X, GripVertical } from "lucide-react";
import EditableText from "@/components/dev/EditableText";
import { useProjectDataUpdater } from "@/hooks/useProjectDataUpdater";

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
  const { updateImageInProjectData, getUpdatedImagePath } = useProjectDataUpdater();

  console.log('ProjectHeroImageSection: projectId received:', projectId, typeof projectId);

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
      }
    ]
  };

  const initialImages = projectHeroImages[projectId] || [];
  const [heroImages, setHeroImages] = useState(initialImages);

  // Apply any existing image updates from localStorage
  React.useEffect(() => {
    const updateImagesWithLatestPaths = () => {
      return heroImages.map(img => {
        const updatedUrl = getUpdatedImagePath(projectId, img.url);
        return updatedUrl !== img.url ? { ...img, url: updatedUrl } : img;
      });
    };

    setHeroImages(prev => updateImagesWithLatestPaths());
  }, [projectId, getUpdatedImagePath]);

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
    console.log('ProjectHeroImageSection: Replacing image at index', index, 'with', newSrc, 'for project', projectId);
    
    // Update the hero images state immediately for UI feedback
    if (index >= heroImages.length) {
      const newImages = [...heroImages];
      // Fill gaps with placeholder images if needed
      while (newImages.length <= index) {
        newImages.push({
          url: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
          title: "New showcase image"
        });
      }
      // Replace the image at the specific index
      newImages[index] = {
        url: newSrc,
        title: `Showcase image ${index + 1}`
      };
      setHeroImages(newImages);
    } else {
      // Normal replacement for existing images
      const oldImage = heroImages[index];
      setHeroImages(prev => prev.map((img, i) => 
        i === index ? { ...img, url: newSrc } : img
      ));
      
      // Also update the project data
      if (oldImage) {
        updateImageInProjectData(projectId, oldImage.url, newSrc);
      }
    }
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

  // Always show exactly 2 slots, filling with existing images or placeholders
  const displaySlots = Array.from({ length: 2 }, (_, index) => {
    if (index < heroImages.length) {
      return heroImages[index];
    }
    return {
      url: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
      title: "Empty slot - click to add image"
    };
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <div className="glass-card-elevated p-8 layered-depth relative group">
        {isDevMode && heroImages.length < 2 && (
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

        <EditableText initialText="Project Showcase">
          {(text) => (
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center pr-8">
              {text}
            </h2>
          )}
        </EditableText>

        <EditableText 
          initialText="These key screens showcase the transformation from complex Excel workflows to an intuitive banking interface. The advanced search functionality demonstrates AI-powered predictive search capabilities, while the orderbook interface reveals the sophisticated deal management system that revolutionized how loan officers track and manage millions in transactions."
          multiline
        >
          {(text) => (
            <p className="text-gray-600 text-center mb-6 max-w-3xl mx-auto leading-relaxed pr-8">
              {text}
            </p>
          )}
        </EditableText>
        
        <div className="floating-element">
          <div className="glass-card p-4 layered-depth">
            <div className="grid grid-cols-2 gap-4">
              {displaySlots.map((imageData, index) => {
                const isEmptySlot = index >= heroImages.length;
                
                return (
                  <div 
                    key={`${imageData.url}-${index}`} 
                    className={`relative group/image ${
                      draggedIndex === index ? 'opacity-50' : ''
                    } ${isEmptySlot && isDevMode ? 'opacity-60' : ''}`}
                    draggable={isDevMode && !isEmptySlot}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    {isDevMode && !isEmptySlot && (
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
                        isEmptySlot && isDevMode 
                          ? 'border-2 border-dashed border-gray-300' 
                          : ''
                      }`}
                      onImageReplace={(newSrc) => handleImageReplace(index, newSrc)}
                      projectId={projectId}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectHeroImageSection;
