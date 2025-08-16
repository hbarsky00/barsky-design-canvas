
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { caseStudiesData } from '@/data/caseStudies';
import OriginalCaseStudyLayout from '@/components/case-study/OriginalCaseStudyLayout';
import StoryDrivenProjectDetail from "./StoryDrivenProjectDetail";
import StructuredInvestmentAppCaseStudy from "@/pages/StructuredInvestmentAppCaseStudy";

const SimplifiedProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  if (!projectId) {
    return <Navigate to="/projects" replace />;
  }

  // Use the new story-driven component for wholesale-distribution
  if (projectId === 'wholesale-distribution') {
    return <StoryDrivenProjectDetail />;
  }

  // Use the new structured component for investment-app
  if (projectId === 'investment-app') {
    return <StructuredInvestmentAppCaseStudy />;
  }

  // Check if this project has case study data
  const caseStudy = caseStudiesData[projectId];
  
  if (!caseStudy) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <OriginalCaseStudyLayout 
      caseStudy={caseStudy}
      projectId={projectId}
    />
  );
};

export default SimplifiedProjectDetail;
