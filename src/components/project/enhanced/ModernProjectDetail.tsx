
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ModernProjectHero from "./ModernProjectHero";
import ProjectHeroImageSection from "./ProjectHeroImageSection";
import ModernProjectContentSection from "./ModernProjectContentSection";
import ProjectNavigation from "@/components/ProjectNavigation";
import AddSectionButton from "@/components/dev/AddSectionButton";

interface ModernProjectDetailProps {
  project: ProjectProps;
  details: ProjectDetails;
  projectId: string;
  projectsData: Array<{
    id: string;
    title: string;
    image: string;
  }>;
  imageCaptions?: Record<string, string>;
}

const ModernProjectDetail: React.FC<ModernProjectDetailProps> = ({
  project,
  details,
  projectId,
  projectsData,
  imageCaptions = {}
}) => {
  console.log('ModernProjectDetail: projectId received:', projectId, typeof projectId);
  
  // Convert ProjectImageConfig to the expected format for ModernProjectContentSection
  const convertImageConfig = (imageConfig?: any): Record<string, string[]> => {
    if (!imageConfig) return {};
    
    const converted: Record<string, string[]> = {};
    
    // Convert each section's beforeHeader and afterHeader to arrays
    Object.entries(imageConfig).forEach(([sectionKey, sectionConfig]: [string, any]) => {
      if (sectionConfig) {
        const images: string[] = [];
        if (sectionConfig.beforeHeader) images.push(sectionConfig.beforeHeader);
        if (sectionConfig.afterHeader) images.push(sectionConfig.afterHeader);
        if (images.length > 0) {
          converted[sectionKey] = images;
        }
      }
    });
    
    return converted;
  };

  const convertedImageConfig = convertImageConfig(details.imageConfig);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen relative"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-white/50 to-purple-50/10" />
      
      {/* Hero Section */}
      <ModernProjectHero
        project={project}
        details={details}
        imageCaptions={imageCaptions}
      />

      {/* Main Content - Single Column Layout with Glass Effects */}
      <div className="relative max-w-4xl mx-auto px-6 py-16 space-y-16 z-10">
        
        {/* Hero Image Section */}
        <ProjectHeroImageSection 
          projectId={projectId} 
          imageCaptions={imageCaptions}
        />

        {/* Add section button after hero */}
        <AddSectionButton projectId={projectId} insertAfter="hero" />

        {/* The Challenge Section */}
        <ModernProjectContentSection
          title="The Challenge"
          content={details.challenge}
          sectionKey="challenge"
          imageConfig={convertedImageConfig}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        {/* Add section button after challenge */}
        <AddSectionButton projectId={projectId} insertAfter="challenge" />

        {/* What I Did Section */}
        <ModernProjectContentSection
          title="What I Did"
          content={details.process}
          sectionKey="process"
          imageConfig={convertedImageConfig}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        {/* Add section button after process */}
        <AddSectionButton projectId={projectId} insertAfter="process" />

        {/* The Result Section */}
        <ModernProjectContentSection
          title="The Result"
          content={details.result}
          sectionKey="result"
          imageConfig={convertedImageConfig}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        {/* Add section button after result */}
        <AddSectionButton projectId={projectId} insertAfter="result" />

        {/* Project Navigation */}
        <div className="glass-card p-6 layered-depth">
          <ProjectNavigation
            currentProjectId={projectId}
            projectsData={projectsData}
          />
        </div>

        {/* Final add section button */}
        <AddSectionButton projectId={projectId} />
      </div>
    </motion.div>
  );
};

export default ModernProjectDetail;
