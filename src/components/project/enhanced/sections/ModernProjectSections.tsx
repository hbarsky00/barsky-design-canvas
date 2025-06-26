
import React from "react";
import { ProjectDetails } from "@/data/types/project";
import ModernProjectChallengeSection from "./ModernProjectChallengeSection";
import ModernProjectProcessSection from "./ModernProjectProcessSection";
import ModernProjectResultSection from "./ModernProjectResultSection";

interface ModernProjectSectionsProps {
  details: ProjectDetails;
  projectId: string;
  componentKey: string;
  imageCaptions: Record<string, string>;
}

const ModernProjectSections: React.FC<ModernProjectSectionsProps> = ({
  details,
  projectId,
  componentKey,
  imageCaptions
}) => {
  return (
    <div className="space-y-8 lg:space-y-16">
      <ModernProjectChallengeSection
        details={details}
        projectId={projectId}
        componentKey={componentKey}
        imageCaptions={imageCaptions}
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
