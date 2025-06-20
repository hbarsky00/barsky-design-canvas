
import React from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ModernProjectHero from "./ModernProjectHero";
import ProjectHeroImageSection from "./ProjectHeroImageSection";
import ModernProjectContentSection from "./ModernProjectContentSection";
import ProjectNavigation from "@/components/ProjectNavigation";
import ProjectCallToAction from "@/components/project/ProjectCallToAction";

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
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen relative w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-white/50 to-purple-50/10" />
      
      <ModernProjectHero
        project={project}
        details={details}
        imageCaptions={imageCaptions}
        projectId={projectId}
      />

      <div className="relative w-full px-4 py-8 space-y-8 z-10">
        <ProjectHeroImageSection 
          projectId={projectId} 
          imageCaptions={imageCaptions}
        />

        <ModernProjectContentSection
          title="The Challenge"
          content={details.challenge}
          sectionKey="challenge"
          imageConfig={{}}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        <ModernProjectContentSection
          title="What I Did"
          content={details.process}
          sectionKey="process"
          imageConfig={{}}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        <ModernProjectContentSection
          title="The Result"
          content={details.result}
          sectionKey="result"
          imageConfig={{}}
          imageCaptions={imageCaptions}
          projectId={projectId}
        />

        <ProjectCallToAction />

        <div className="glass-card p-4 layered-depth">
          <ProjectNavigation
            currentProjectId={projectId}
            projectsData={projectsData}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ModernProjectDetail;
