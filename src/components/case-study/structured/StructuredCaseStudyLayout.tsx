
import React from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudySection from "./CaseStudySection";
import ProjectNavigation from "@/components/project/ProjectNavigation";
import { StructuredCaseStudy, CaseStudySection as CaseStudySectionType } from "@/data/types/structuredCaseStudy";
import AutoSeo from "@/components/seo/AutoSeo";

interface StructuredCaseStudyLayoutProps extends Omit<StructuredCaseStudy, 'id'> {}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  title,
  description,
  tags,
  heroVideo,
  sections,
  projectLink,
  gradientClasses,
  seoData
}) => {
  const heroImageUrl = heroVideo?.poster || sections.find(s => s.type === 'hero')?.content.image;

  return (
    <div className="min-h-screen bg-background">
      {/* Auto-detecting SEO with fallbacks from seoData */}
      <AutoSeo 
        fallbackTitle={seoData?.title || title}
        fallbackDescription={seoData?.description || description}
        fallbackImage={heroImageUrl}
      />
      
      {/* SEO data attributes for auto-detection */}
      <div 
        data-page-title={seoData?.title || title}
        data-page-description={seoData?.description || description}
        data-page-image={heroImageUrl}
        style={{ display: 'none' }}
      />
      
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section data-hero className="relative overflow-hidden">
          <CaseStudyHero
            title={title}
            description={description}
            tags={tags}
            heroVideo={heroVideo}
            gradientClasses={gradientClasses}
          />
        </section>

        {/* Case Study Sections */}
        <div className="space-y-0">
          {sections.map((section: CaseStudySectionType, index: number) => (
            <CaseStudySection
              key={index}
              section={section}
              index={index}
            />
          ))}
        </div>

        {/* Project Navigation */}
        {projectLink && (
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <ProjectNavigation currentProjectId={projectLink} />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default StructuredCaseStudyLayout;
