
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

  // Project-specific showcase descriptions
  const getProjectShowcaseDescription = (projectId: string) => {
    switch (projectId) {
      case 'medication-app':
        return "This key screen showcases the intuitive task completion interface designed for diabetic patients. The clean, accessible design demonstrates how users can easily track their daily medication schedules and manage their health appointments in a simple, stress-free way.";
      case 'investor-loan-app':
        return "These key screens showcase the transformation from complex Excel workflows to an intuitive banking interface. The advanced search functionality demonstrates AI-powered predictive search capabilities, while the orderbook interface reveals the sophisticated deal management system that revolutionized how loan officers track and manage millions in transactions.";
      case 'dae-search':
        return "These key screens showcase the enterprise data catalog interface with Bloomberg-inspired design. The intelligent search system demonstrates AI-powered data discovery capabilities, while the comprehensive filtering options reveal how users can efficiently navigate complex enterprise datasets.";
      case 'splittime':
        return "These key screens showcase the co-parenting communication platform designed to facilitate positive family interactions. The messaging interface demonstrates secure communication features, while the calendar system reveals comprehensive scheduling coordination for children's activities.";
      case 'herbalink':
        return "These key screens showcase the herbalist connection platform that bridges traditional medicine with modern technology. The practitioner discovery interface demonstrates location-based search capabilities, while the consultation system reveals comprehensive herbal medicine management features.";
      case 'gold2crypto':
        return "These key screens showcase the trading platform designed for traditional gold investors transitioning to cryptocurrency. The familiar interface demonstrates reduced cognitive load for precious metals investors, while the security features reveal comprehensive protection protocols.";
      case 'barskyjoint':
        return "These key screens showcase the dual-format food service application for both mobile truck and restaurant operations. The location tracking interface demonstrates real-time food truck positioning, while the ordering system reveals streamlined mobile commerce capabilities.";
      case 'spectrum':
        return "These key screens showcase the accessible custom apparel platform with inclusive design principles. The shirt designer interface demonstrates both basic and advanced customization tools, while the accessibility features reveal comprehensive support for users with various abilities.";
      default:
        return "These key screens showcase the project's main features and user interface design. The implementation demonstrates thoughtful user experience considerations and comprehensive functionality.";
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="glass-card-elevated p-3 sm:p-6 lg:p-8 layered-depth relative group">
        {isDevMode && heroImages.length < 2 && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
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

        <EditableText 
          initialText="Project Showcase"
          textKey={`hero_showcase_title_${projectId}`}
        >
          {(text) => (
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 text-center px-2 pr-8 sm:pr-12">
              {text}
            </h2>
          )}
        </EditableText>

        <EditableText 
          initialText={getProjectShowcaseDescription(projectId)}
          multiline
          textKey={`hero_showcase_description_${projectId}`}
        >
          {(text) => (
            <p className="text-sm sm:text-base text-gray-600 text-center mb-3 sm:mb-4 lg:mb-6 max-w-3xl mx-auto leading-relaxed px-2 pr-8 sm:pr-12">
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
