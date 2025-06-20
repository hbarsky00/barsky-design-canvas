
import React from "react";
import { useParams } from "react-router-dom";
import { DevModeProvider } from "@/context/DevModeContext";
import { ImageReplacementProvider } from "@/context/ImageReplacementContext";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import SimplifiedProjectDetail from "@/components/project/SimplifiedProjectDetail";
import DevModeSyncButton from "@/components/dev/DevModeSyncButton";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
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
    <DevModeProvider>
      <ImageReplacementProvider projectId={projectId}>
        <ImageMaximizerProvider>
          <SimplifiedProjectDetail />
          <DevModeSyncButton />
        </ImageMaximizerProvider>
      </ImageReplacementProvider>
    </DevModeProvider>
  );
};

export default ProjectDetail;
