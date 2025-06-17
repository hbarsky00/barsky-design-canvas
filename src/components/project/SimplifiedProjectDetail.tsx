
import React from "react";
import { DevModeProvider } from "@/context/DevModeContext";
import { ImageReplacementProvider } from "@/context/ImageReplacementContext";
import { useParams } from "react-router-dom";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import ProjectDetailLoading from "./ProjectDetailLoading";
import ModernProjectDetail from "./enhanced/ModernProjectDetail";
import ProjectDetailSeo from "./ProjectDetailSeo";

const SimplifiedProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  const {
    project,
    details,
    projectsData,
    imageCaptions,
    isLoading,
    error
  } = useProjectDetail(projectId);

  if (isLoading) {
    return <ProjectDetailLoading />;
  }

  if (error || !project || !details || !projectId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600">
            {error || "The requested project could not be found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProjectDetailSeo project={project} details={details} />
      <ModernProjectDetail
        project={project}
        details={details}
        projectId={projectId}
        projectsData={projectsData}
        imageCaptions={imageCaptions}
      />
    </>
  );
};

export default SimplifiedProjectDetail;
