
import React from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudySection from "./CaseStudySection";
import ProjectNavigation from "@/components/project/ProjectNavigation";
import { StructuredCaseStudy } from "@/data/types/structuredCaseStudy";

interface StructuredCaseStudyLayoutProps {
  caseStudy?: StructuredCaseStudy;
  // Legacy props for backward compatibility
  title?: string;
  description?: string;
  tags?: string[];
  heroVideo?: {
    src: string;
    poster?: string;
  };
  sections?: any[];
  projectLink?: string;
  gradientClasses?: string;
  seoData?: {
    title?: string;
    description?: string;
  };
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  caseStudy,
  title,
  description,
  tags,
  heroVideo,
  sections,
  projectLink,
  gradientClasses,
  seoData
}) => {
  // Use caseStudy data if provided, otherwise use individual props
  const data = caseStudy || {
    id: 'structured-case-study',
    title: title || '',
    description: description || '',
    tags: tags || [],
    heroVideo,
    sections: sections || [],
    projectLink,
    gradientClasses,
    seoData
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <CaseStudyHero 
          title={data.title}
          description={data.description}
          tags={data.tags}
          heroVideo={data.heroVideo}
          gradientClasses={data.gradientClasses}
        />
        
        <div className="container mx-auto px-4 py-16">
          {data.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CaseStudySection
                section={section}
                index={index}
              />
            </motion.div>
          ))}
        </div>
        
        <ProjectNavigation currentProjectId={data.id} />
      </main>
      
      <Footer />
    </div>
  );
};

export default StructuredCaseStudyLayout;
