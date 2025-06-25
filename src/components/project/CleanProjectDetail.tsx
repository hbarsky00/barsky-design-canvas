
import React from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import SimpleProjectHero from "./sections/SimpleProjectHero";
import SimpleContentSection from "./sections/SimpleContentSection";
import ProjectCallToAction from "./ProjectCallToAction";
import ProjectNavigation from "@/components/ProjectNavigation";
import { useProjectAiCaptions } from "@/hooks/useProjectAiCaptions";
import { useProcessImages } from "@/hooks/useProcessImages";

interface CleanProjectDetailProps {
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

const CleanProjectDetail: React.FC<CleanProjectDetailProps> = ({
  project,
  details,
  projectId,
  projectsData,
  imageCaptions = {}
}) => {
  console.log('🎬 CleanProjectDetail: Rendering simplified project detail for:', project.title);

  const {
    finalCaptions
  } = useProjectAiCaptions(project, details, projectId, imageCaptions);

  const processImages = useProcessImages(details);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <SimpleProjectHero
        project={project}
        details={details}
        imageCaptions={finalCaptions}
        projectId={projectId}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Challenge Section */}
        <SimpleContentSection
          title="The Challenge"
          content={details.challenge}
          additionalText={details.challengeAdditionalText}
          images={details.challengeGalleryImages || []}
          imageCaptions={finalCaptions}
          projectId={projectId}
        />

        {/* Process Section */}
        <SimpleContentSection
          title="What I Did"
          content={details.process}
          images={processImages}
          imageCaptions={finalCaptions}
          projectId={projectId}
        />

        {/* Result Section */}
        <SimpleContentSection
          title="The Result"
          content={details.result}
          images={details.resultGalleryImages || []}
          imageCaptions={finalCaptions}
          projectId={projectId}
        />

        {/* Call to Action */}
        <ProjectCallToAction />

        {/* Project Navigation */}
        <section className="mt-16">
          <ProjectNavigation
            currentProjectId={projectId}
            projectsData={projectsData}
          />
        </section>
      </div>
    </div>
  );
};

export default CleanProjectDetail;
