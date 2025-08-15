
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { caseStudiesData } from '@/data/caseStudies';
import OriginalCaseStudyLayout from '@/components/case-study/OriginalCaseStudyLayout';
import StoryDrivenProjectDetail from "./StoryDrivenProjectDetail";
import InvestmentAppCaseStudy from "@/pages/InvestmentAppCaseStudy";

// Lazy load the case study components
const HerbalinkCaseStudy = React.lazy(() => import('@/pages/HerbalinkCaseStudy'));
const SplittimeCaseStudy = React.lazy(() => import('@/pages/SplittimeCaseStudy'));
const MedicationAppCaseStudy = React.lazy(() => import('@/pages/MedicationAppCaseStudy'));
const Gold2CryptoCaseStudy = React.lazy(() => import('@/pages/Gold2CryptoCaseStudy'));
const DaeSearchCaseStudy = React.lazy(() => import('@/pages/DaeSearchCaseStudy'));
const BarskyJointCaseStudy = React.lazy(() => import('@/pages/BarskyJointCaseStudy'));

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
    
    case 'medication-app':
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <MedicationAppCaseStudy />
        </React.Suspense>
      );
    
    case 'gold2crypto':
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Gold2CryptoCaseStudy />
        </React.Suspense>
      );
    
    case 'dae-search':
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <DaeSearchCaseStudy />
        </React.Suspense>
      );
    
    case 'barskyjoint':
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <BarskyJointCaseStudy />
        </React.Suspense>
      );
    
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
