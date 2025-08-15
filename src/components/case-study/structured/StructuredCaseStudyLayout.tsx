
import React from "react";
import { motion } from "framer-motion";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudySection from "../CaseStudySection";
import CaseStudyNavigation from "../CaseStudyNavigation";
import AutoSeo from "@/components/seo/AutoSeo";
import SeoAnalyticsTracker from "@/components/seo/SeoAnalyticsTracker";
import { StructuredCaseStudySectionProps } from "@/data/types/caseStudy";

interface StructuredCaseStudyLayoutProps {
  title: string;
  description: string;
  tags: string[];
  heroVideo: {
    src: string;
    poster?: string;
  };
  sections: StructuredCaseStudySectionProps[];
  projectLink?: string;
  gradientClasses?: string;
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  nextProject?: {
    image: string;
    projectName: string;
    results: string[];
    technologies: string[];
    path: string;
    title?: string;
    description?: string;
  };
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  title,
  description,
  tags,
  heroVideo,
  sections,
  projectLink,
  gradientClasses = "from-blue-50 via-slate-50 to-indigo-50",
  seoData,
  nextProject
}) => {
  return (
    <>
      <AutoSeo 
        title={seoData.title}
        description={seoData.description} 
        keywords={seoData.keywords}
        ogImage={seoData.ogImage}
      />
      <SeoAnalyticsTracker pageTitle={seoData.title} pageType="case-study" />
      
      <div className={`min-h-screen bg-gradient-to-br ${gradientClasses}`}>
        {/* Hero Section */}
        <CaseStudyHero 
          title={title}
          description={description}
          tags={tags}
          heroVideo={heroVideo}
        />

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-12 space-y-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CaseStudySection {...section} />
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        {nextProject && (
          <CaseStudyNavigation 
            nextProject={nextProject}
            projectLink={projectLink}
          />
        )}
      </div>
    </>
  );
};

export default StructuredCaseStudyLayout;
