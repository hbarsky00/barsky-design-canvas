
import React from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import ModernProjectDetail from "./enhanced/ModernProjectDetail";

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
  console.log('🎬 CleanProjectDetail: Rendering with projectId:', projectId);
  
  return (
    <ModernProjectDetail
      project={project}
      details={details}
      projectId={projectId}
      projectsData={projectsData}
      imageCaptions={imageCaptions}
    />
  );
};

export default CleanProjectDetail;
