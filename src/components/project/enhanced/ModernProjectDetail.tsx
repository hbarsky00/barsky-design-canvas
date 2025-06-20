
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ModernProjectHero from "./ModernProjectHero";
import ProjectHeroImageSection from "./ProjectHeroImageSection";
import ModernProjectContentSection from "./ModernProjectContentSection";
import ProjectNavigation from "@/components/ProjectNavigation";
import ProjectCallToAction from "@/components/project/ProjectCallToAction";
import AddSectionButton from "@/components/dev/AddSectionButton";
import DevModeToggle from '@/components/dev/DevModeToggle';
import { useProjectDataManager } from "@/hooks/useProjectDataManager";

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
  
  const { updatedProject, updatedDetails, getReplacedImageSrc } = useProjectDataManager(projectId, project, details);
  
  const convertImageConfig = (imageConfig?: any): Record<string, string[]> => {
    if (!imageConfig) return {};
    
    const converted: Record<string, string[]> = {};
    
    Object.entries(imageConfig).forEach(([sectionKey, sectionConfig]: [string, any]) => {
      if (sectionConfig) {
        const images: string[] = [];
        if (sectionConfig.beforeHeader) images.push(getReplacedImageSrc(sectionConfig.beforeHeader));
        if (sectionConfig.afterHeader) images.push(getReplacedImageSrc(sectionConfig.afterHeader));
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
      className="min-h-screen relative w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-white/50 to-purple-50/10" />
      
      <DevModeToggle />
      
      <ModernProjectHero
        project={updatedProject}
        details={updatedDetails}
        imageCaptions={imageCaptions}
      />

      <div className="relative w-full px-4 py-8 space-y-8 z-10">
        <ProjectHeroImageSection 
          projectId={projectId} 
          imageCaptions={imageCaptions}
        />

        <AddSectionButton projectId={projectId} insertAfter="hero" />

        <ModernProjectContentSection
          title="The Challenge"
          content={updatedDetails.challenge}
          sectionKey="challenge"
          imageConfig={convertedImageConfig}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        <AddSectionButton projectId={projectId} insertAfter="challenge" />

        <ModernProjectContentSection
          title="What I Did"
          content={updatedDetails.process}
          sectionKey="process"
          imageConfig={convertedImageConfig}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        <AddSectionButton projectId={projectId} insertAfter="process" />

        <ModernProjectContentSection
          title="The Result"
          content={updatedDetails.result}
          sectionKey="result"
          imageConfig={convertedImageConfig}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        <AddSectionButton projectId={projectId} insertAfter="result" />

        <ProjectCallToAction />

        <div className="glass-card p-4 layered-depth">
          <ProjectNavigation
            currentProjectId={projectId}
            projectsData={projectsData}
          />
        </div>

        <AddSectionButton projectId={projectId} />
      </div>
    </motion.div>
  );
};

export default ModernProjectDetail;
