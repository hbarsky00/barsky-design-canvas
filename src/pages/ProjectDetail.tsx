
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import SimplifiedProjectDetail from "@/components/project/SimplifiedProjectDetail";

const ProjectDetail = () => {
  const { pathname } = useLocation();
  // /project/dae-search is an explicit route (so it prerenders) and has no :projectId.
  const projectId = useParams<{ projectId: string }>().projectId ?? pathname.split("/").filter(Boolean).pop();
  
  if (!projectId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600">Invalid project ID</p>
        </div>
      </div>
    );
  }
  
  return (
    <ImageMaximizerProvider>
      <SimplifiedProjectDetail />
    </ImageMaximizerProvider>
  );
};

export default ProjectDetail;
