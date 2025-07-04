
import React from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import CaseStudyDetail from "./CaseStudyDetail";

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
    <CaseStudyDetail
      project={project}
      details={details}
      projectId={projectId}
    />
  );
};

export default CleanProjectDetail;
