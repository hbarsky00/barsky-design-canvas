
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { caseStudiesData } from "@/data/caseStudies";
import OriginalCaseStudyLayout from "@/components/case-study/OriginalCaseStudyLayout";
import StoryDrivenProjectDetail from "./StoryDrivenProjectDetail";
import InvestmentAppCaseStudy from "@/pages/InvestmentAppCaseStudy";

// Lazy load the case study components that exist
const HerbalinkCaseStudy = React.lazy(() => import('@/pages/HerbalinkCaseStudy'));
const SplittimeCaseStudy = React.lazy(() => import('@/pages/SplittimeCaseStudy'));

const SimplifiedProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  console.log('🚀 SimplifiedProjectDetail: Routing for projectId:', projectId);
  
  if (!projectId) {
    return <Navigate to="/projects" replace />;
  }

  // Route to specific case study components
  switch (projectId) {
    case 'herbalink':
      console.log('✅ Routing to HerbalinkCaseStudy component');
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <HerbalinkCaseStudy />
        </React.Suspense>
      );
    
    case 'splittime':
      console.log('✅ Routing to SplittimeCaseStudy component');
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <SplittimeCaseStudy />
        </React.Suspense>
      );
    
    case 'wholesale-distribution':
      console.log('✅ Routing to StoryDrivenProjectDetail component');
      return <StoryDrivenProjectDetail />;
    
    case 'investment-app':
      console.log('✅ Routing to InvestmentAppCaseStudy component');
      return <InvestmentAppCaseStudy />;
    
    default:
      console.log('⚠️ No custom component found for:', projectId, 'checking fallback data...');
      // Fallback to original layout for any remaining case studies
      const caseStudy = caseStudiesData[projectId];
      
      if (!caseStudy) {
        console.log('❌ No case study data found, redirecting to projects');
        return <Navigate to="/projects" replace />;
      }

      console.log('📄 Using OriginalCaseStudyLayout for:', projectId);
      return (
        <OriginalCaseStudyLayout 
          caseStudy={caseStudy}
          projectId={projectId}
        />
      );
  }
};

export default SimplifiedProjectDetail;
