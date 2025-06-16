
import React from "react";
import { DevModeProvider } from "@/context/DevModeContext";
import SimplifiedProjectDetail from "@/components/project/SimplifiedProjectDetail";

const ProjectDetail = () => {
  return (
    <DevModeProvider>
      <SimplifiedProjectDetail />
    </DevModeProvider>
  );
};

export default ProjectDetail;
