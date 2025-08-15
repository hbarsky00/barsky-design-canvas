
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { caseStudiesData } from "@/data/structuredCaseStudies";
import OriginalCaseStudyLayout from "./OriginalCaseStudyLayout";
import StoryDrivenProjectDetail from "./StoryDrivenProjectDetail";
import InvestmentAppCaseStudy from "@/pages/InvestmentAppCaseStudy";

// Lazy load the case study components that exist
const HerbalinkCaseStudy = React.lazy(() => import('@/pages/HerbalinkCaseStudy'));
const SplittimeCaseStudy = React.lazy(() => import('@/pages/SplittimeCaseStudy'));

const SimplifiedProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  if (!projectId) {
    return <Navigate to="/projects" replace />;
  }

  // Route to specific case study components
  switch (projectId) {
    case 'herbalink':
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <HerbalinkCaseStudy />
        </React.Suspense>
      );
    
    case 'splittime':
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <SplittimeCaseStudy />
        </React.Suspense>
      );
    
    case 'wholesale-distribution':
      return <StoryDrivenProjectDetail />;
    
    case 'investment-app':
      return <InvestmentAppCaseStudy />;
    
    default:
      // Fallback to original layout for any remaining case studies
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
  }
};

export default SimplifiedProjectDetail;
