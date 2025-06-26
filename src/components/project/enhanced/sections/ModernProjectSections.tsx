
import React from "react";
import { ProjectDetails } from "@/data/types/project";
import { ProjectProps } from "@/components/ProjectCard";
import ModernProjectChallengeSection from "./ModernProjectChallengeSection";
import ModernProjectProcessSection from "./ModernProjectProcessSection";
import ModernProjectResultSection from "./ModernProjectResultSection";
import ModernProjectImage from "../ModernProjectImage";

interface ModernProjectSectionsProps {
  details: ProjectDetails;
  projectId: string;
  componentKey: string;
  imageCaptions: Record<string, string>;
  project: ProjectProps;
}

const ModernProjectSections: React.FC<ModernProjectSectionsProps> = ({
  details,
  projectId,
  componentKey,
  imageCaptions,
  project
}) => {
  return (
    <div className="space-y-8 lg:space-y-16">
      <ModernProjectChallengeSection
        details={details}
        projectId={projectId}
        componentKey={componentKey}
        imageCaptions={imageCaptions}
      />

      {/* Hero Image Section - After Challenge section */}
      <ModernProjectImage
        project={project}
        imageCaptions={imageCaptions}
        projectId={projectId}
      />

      <ModernProjectProcessSection
        details={details}
        projectId={projectId}
        componentKey={componentKey}
        imageCaptions={imageCaptions}
      />

      <ModernProjectResultSection
        details={details}
        projectId={projectId}
        componentKey={componentKey}
        imageCaptions={imageCaptions}
      />
    </div>
  );
};

export default ModernProjectSections;
