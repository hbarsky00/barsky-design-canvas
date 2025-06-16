
import React from "react";
import { useParams } from "react-router-dom";
import { projectsData, imageCaptions } from "@/data/projectsData";
import { projectDetails } from "@/data/project-details";
import ModernProjectDetail from "@/components/project/enhanced/ModernProjectDetail";
import ProjectDetailLoading from "@/components/project/ProjectDetailLoading";
import NotFound from "./NotFound";
import ProjectDetailSeo from "@/components/project/ProjectDetailSeo";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    return <NotFound />;
  }

  const project = projectsData.find(p => p.id === projectId);
  const details = projectDetails[projectId];

  if (!project || !details) {
    return <NotFound />;
  }

  return (
    <>
      <ProjectDetailSeo 
        title={project.title}
        description={project.description}
        tags={project.tags}
        projectId={projectId}
      />
      <ModernProjectDetail
        project={project}
        details={details}
        projectId={projectId}
        projectsData={projectsData.map(p => ({
          id: p.id,
          title: p.title,
          image: p.image
        }))}
        imageCaptions={imageCaptions}
      />
    </>
  );
};

export default ProjectDetail;
