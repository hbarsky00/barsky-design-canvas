
import React from "react";
import TechnologiesList from "./TechnologiesList";
import ServicesList from "./ServicesList";
import ProjectLinks from "./ProjectLinks";
import ChallengeSection from "./sections/ChallengeSection";
import ProcessSection from "./sections/ProcessSection";
import ResultSection from "./sections/ResultSection";
import { useProjectConfiguration } from "@/hooks/useProjectConfiguration";
import { useProcessContent } from "@/hooks/useProcessContent";

interface ProjectOverviewProps {
  challenge: string;
  process: string;
  result: string;
  technologies: string[];
  projectLink?: string;
  caseStudyLink?: string;
  challengeImage?: string;
  processImage?: string;
  processBottomImage?: string;
  resultImage?: string;
  resultGalleryImages?: string[];
  imageCaptions?: Record<string, string>;
  galleryImages?: string[];
  showTechnologies?: boolean;
  challengeBottomImage?: string;
  challengeGalleryImages?: string[];
  allImages: string[];
  projectId?: string;
  servicesGalleryImages?: string[];
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ 
  challenge, 
  process, 
  result,
  technologies,
  projectLink,
  challengeImage,
  processImage,
  processBottomImage,
  resultImage,
  resultGalleryImages,
  imageCaptions = {},
  showTechnologies = false,
  challengeBottomImage,
  challengeGalleryImages = [],
  projectId,
  servicesGalleryImages = []
}) => {
  const {
    isInvestorProject,
    isDaeSearchProject,
    inspirationImages,
    inspirationCaptions,
    servicesCaptions,
    processBreakpoint
  } = useProjectConfiguration(projectId);

  const { processBeforeGallery, processAfterGallery } = useProcessContent(
    process,
    isInvestorProject,
    processBreakpoint
  );

  return (
    <div>
      <ChallengeSection
        challenge={challenge}
        challengeImage={challengeImage}
        challengeBottomImage={challengeBottomImage}
        challengeGalleryImages={challengeGalleryImages}
        imageCaptions={imageCaptions}
        projectId={projectId}
      />
      
      <ProcessSection
        processBeforeGallery={processBeforeGallery}
        processAfterGallery={processAfterGallery}
        isInvestorProject={isInvestorProject}
        isDaeSearchProject={isDaeSearchProject}
        inspirationImages={inspirationImages}
        inspirationCaptions={inspirationCaptions}
        servicesGalleryImages={servicesGalleryImages}
        servicesCaptions={servicesCaptions}
        processImage={processImage}
        processBottomImage={processBottomImage}
        imageCaptions={imageCaptions}
        projectId={projectId}
      />
      
      <ResultSection
        result={result}
        resultGalleryImages={resultGalleryImages}
        resultImage={resultImage}
        imageCaptions={imageCaptions}
        projectId={projectId}
      />
      
      {/* Technologies Section - Only show if showTechnologies is true */}
      {showTechnologies && <TechnologiesList technologies={technologies} />}
      
      {/* Services Section - Only show if not DAE Search (since it has its own services carousel) */}
      {!isDaeSearchProject && <ServicesList />}
      
      {/* Links Section */}
      <ProjectLinks projectLink={projectLink} />
    </div>
  );
};

export default ProjectOverview;
