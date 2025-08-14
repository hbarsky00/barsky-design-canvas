
import React from "react";
import { motion } from "framer-motion";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudySection from "../CaseStudySection";
import CaseStudyNavigation from "../CaseStudyNavigation";
import AutoSeo from "@/components/seo/AutoSeo";
import SeoAnalyticsTracker from "@/components/seo/SeoAnalyticsTracker";
import { StructuredCaseStudyLayoutProps } from "@/data/types/caseStudy";

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  caseStudyData,
  nextProject
}) => {
  const { title, description, tags, heroVideo, sections, projectLink, gradientClasses, seoData } = caseStudyData;

  return (
    <>
      <AutoSeo 
        title={seoData.title}
        description={seoData.description} 
        keywords={seoData.keywords}
        ogImage={seoData.ogImage}
      />
      <SeoAnalyticsTracker pageTitle={seoData.title} pageType="case-study" />
      
      <div className={`min-h-screen ${gradientClasses}`}>
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
