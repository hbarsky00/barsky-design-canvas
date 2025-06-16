
import React from "react";
import { motion } from "framer-motion";
import { useDevMode } from "@/context/DevModeContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EditableText from "@/components/dev/EditableText";
import HeroImageGrid from "./HeroImageGrid";
import { useHeroImages } from "@/hooks/useHeroImages";

interface ProjectHeroImageSectionProps {
  projectId: string;
  imageCaptions: Record<string, string>;
}

const ProjectHeroImageSection: React.FC<ProjectHeroImageSectionProps> = ({
  projectId,
  imageCaptions
}) => {
  const { isDevMode } = useDevMode();
  
  console.log('ProjectHeroImageSection: projectId received:', projectId, typeof projectId);

  const {
    heroImages,
    draggedIndex,
    handleAddImage,
    handleRemoveImage,
    handleImageReplace,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  } = useHeroImages({ projectId });

  // Only show hero image section if project has images
  if (heroImages.length === 0 && !isDevMode) {
    return null;
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
        
        <HeroImageGrid
          heroImages={heroImages}
          imageCaptions={imageCaptions}
          projectId={projectId}
          draggedIndex={draggedIndex}
          onImageReplace={handleImageReplace}
          onRemoveImage={handleRemoveImage}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        />
      </div>
    </motion.section>
  );
};

export default ProjectHeroImageSection;
