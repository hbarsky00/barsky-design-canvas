
import React from "react";
import { useParams } from "react-router-dom";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import SimplifiedProjectDetail from "@/components/project/SimplifiedProjectDetail";
import { useMetaTagOptimization } from "@/hooks/useMetaTagOptimization";
import MetaTagVerifier from "@/components/seo/MetaTagVerifier";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  // Optimize meta tags for crawlers
  useMetaTagOptimization();
  
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
      <MetaTagVerifier />
    </ImageMaximizerProvider>
  );
};

export default ProjectDetail;
