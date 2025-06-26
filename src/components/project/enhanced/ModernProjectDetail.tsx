
import React from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedDataManager } from "@/hooks/useSimplifiedDataManager";
import ModernProjectHeader from "./ModernProjectHeader";
import ModernProjectImage from "./ModernProjectImage";
import ModernProjectSections from "./sections/ModernProjectSections";
import ProjectCallToAction from "../ProjectCallToAction";
import ProjectNavigation from "@/components/ProjectNavigation";

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
  console.log('🎬 ModernProjectDetail: Rendering with projectId:', projectId);
  console.log('🎬 ModernProjectDetail: Projects data received:', projectsData.length, 'projects');
  
  const { updatedProject, updatedDetails, componentKey } = useSimplifiedDataManager(projectId, project, details);
  
  // Use manual captions from details, merged with any saved captions from database
  const finalCaptions = {
    ...details.imageCaptions,
    ...imageCaptions
  };

  console.log('🔄 ModernProjectDetail: Component key:', componentKey);
  console.log('🔄 ModernProjectDetail: Updated project data:', {
    title: updatedProject.title,
    description: updatedProject.description.substring(0, 50) + '...'
  });
  console.log('📝 ModernProjectDetail: Using manual captions:', Object.keys(finalCaptions).length, 'captions available');

  return (
    <div key={`project-detail-${componentKey}`} className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      
      {/* Header Section - At the very top */}
      <ModernProjectHeader
        project={updatedProject}
        details={updatedDetails}
        projectId={projectId}
      />

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 py-8 lg:py-16 space-y-8 lg:space-y-16 max-w-6xl mx-auto">
        
        {/* All Project Sections */}
        <ModernProjectSections
          details={updatedDetails}
          projectId={projectId}
          componentKey={componentKey}
          imageCaptions={finalCaptions}
        />

        {/* Hero Image Section - After challenge */}
        <ModernProjectImage
          project={updatedProject}
          imageCaptions={finalCaptions}
          projectId={projectId}
        />

        {/* Call to Action */}
        <ProjectCallToAction />

        {/* Project Navigation */}
        <section className="mt-8 lg:mt-16">
          <ProjectNavigation
            currentProjectId={projectId}
            projectsData={projectsData}
          />
        </section>
      </div>
    </div>
  );
};

export default ModernProjectDetail;
