
import React from "react";
import { DevModeProvider } from "@/context/DevModeContext";
import { ImageReplacementProvider } from "@/context/ImageReplacementContext";
import { useParams } from "react-router-dom";
import SimplifiedProjectDetail from "@/components/project/SimplifiedProjectDetail";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  return (
    <DevModeProvider>
      <ImageReplacementProvider projectId={projectId || ''}>
        <SimplifiedProjectDetail />
      </ImageReplacementProvider>
    </DevModeProvider>
  );
};

export default ProjectDetail;
