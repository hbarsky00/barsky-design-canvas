
import React from "react";
import TechnologiesList from "./TechnologiesList";
import ServicesList from "./ServicesList";
import ProjectLinks from "./ProjectLinks";
import ChallengeSection from "./sections/ChallengeSection";
import { useProjectConfiguration } from "@/hooks/useProjectConfiguration";

interface ProjectOverviewProps {
  challenge: string;
  challengeAdditionalText?: string;
  technologies: string[];
  projectLink?: string;
  caseStudyLink?: string;
  challengeImage?: string;
  imageCaptions?: Record<string, string>;
  galleryImages?: string[];
  showTechnologies?: boolean;
  challengeBottomImage?: string;
  challengeGalleryImages?: string[];
  allImages: string[];
  projectId?: string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ 
  challenge, 
  challengeAdditionalText,
  technologies,
  projectLink,
  challengeImage,
  imageCaptions = {},
  showTechnologies = false,
  challengeBottomImage,
  challengeGalleryImages = [],
  projectId
}) => {
  const { isDaeSearchProject } = useProjectConfiguration(projectId);


  return (
    <div>
      <ChallengeSection
        challenge={challenge}
        challengeAdditionalText={challengeAdditionalText}
        challengeImage={challengeImage}
        challengeBottomImage={challengeBottomImage}
        challengeGalleryImages={challengeGalleryImages}
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
