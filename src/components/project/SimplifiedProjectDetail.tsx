
import React from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectHeader from "./ProjectHeader";
import ProjectContent from "./ProjectContent";
import ProjectNavigation from "./ProjectNavigation";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import AutoSeo from "@/components/seo/AutoSeo";

const SimplifiedProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, details, isLoading, error } = useProjectDetail(projectId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project || !details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600">{error || 'This project could not be loaded'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Auto-detecting SEO */}
      <AutoSeo 
        fallbackTitle={`${project.title} - Product Design Case Study`}
        fallbackDescription={project.description}
        fallbackImage={project.image}
      />
      
      {/* SEO data attributes for auto-detection */}
      <div 
        data-page-title={`${project.title} - Product Design Case Study`}
        data-page-description={project.description}
        data-page-image={project.image}
        style={{ display: 'none' }}
      />
      
      <Navigation />
      
      <main className="pt-20">
        {/* Project Header */}
        <section data-hero className="py-20 bg-gradient-to-br from-background to-muted/50">
          <ProjectHeader project={project} details={details} />
        </section>

        {/* Project Content */}
        <ProjectContent details={details} />

        {/* Project Navigation */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <ProjectNavigation currentProjectId={project.id} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SimplifiedProjectDetail;
