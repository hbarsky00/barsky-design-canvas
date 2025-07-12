
import React from "react";
import { useParams } from "react-router-dom";
import StoryDrivenProjectDetail from "./StoryDrivenProjectDetail";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import ProjectDetailLoading from "./ProjectDetailLoading";
import CleanProjectDetail from "./CleanProjectDetail";
import ProjectDetailSeo from "./ProjectDetailSeo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import { projectFaqs } from "@/data/seoFaqs";

const SimplifiedProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  // Use the new story-driven component for wholesale-distribution
  if (projectId === 'wholesale-distribution') {
    return <StoryDrivenProjectDetail />;
  }
  
  // Redirect to case study pages for specific projects
  if (projectId === 'herbalink') {
    window.location.href = '/case-study-herbalink';
    return null;
  }
  
  if (projectId === 'splittime') {
    window.location.href = '/case-study-splittime';
    return null;
  }
  
  if (projectId === 'investor-loan-app') {
    window.location.href = '/case-study-investor-loan';
    return null;
  }
  
  console.log('🎬 SimplifiedProjectDetail: Rendering with projectId:', projectId);
  
  const {
    project,
    details,
    projectsData,
    imageCaptions,
    isLoading,
    error
  } = useProjectDetail(projectId);

  console.log('📊 SimplifiedProjectDetail: Hook data:', {
    hasProject: !!project,
    hasDetails: !!details,
    isLoading,
    error
  });

  if (isLoading) {
    console.log('⏳ SimplifiedProjectDetail: Showing loading state');
    return <ProjectDetailLoading />;
  }

  if (error || !project || !details || !projectId) {
    console.log('❌ SimplifiedProjectDetail: Showing error state:', { error, hasProject: !!project, hasDetails: !!details, projectId });
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600">
              {error || "The requested project could not be found."}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  console.log('✅ SimplifiedProjectDetail: Rendering clean project detail with data:', {
    projectTitle: project.title,
    detailsChallenge: details.challenge.substring(0, 50) + '...'
  });

  return (
    <div className="flex flex-col min-h-screen">
      <ProjectDetailSeo project={project} details={details} />
      <Header />
      <main className="flex-grow">
        <CleanProjectDetail
          project={project}
          details={details}
          projectId={projectId}
          projectsData={projectsData}
          imageCaptions={imageCaptions}
        />
        
        {/* FAQ Section */}
        <SeoFaqSection 
          title="Project Case Study Questions"
          faqs={projectFaqs}
          className="mt-16"
        />
      </main>
      <Footer />
    </div>
  );
};

export default SimplifiedProjectDetail;
