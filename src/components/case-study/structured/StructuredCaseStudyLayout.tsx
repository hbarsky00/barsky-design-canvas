
import React from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudySection from "./CaseStudySection";
import ProjectNavigation from "@/components/project/ProjectNavigation";
import { StructuredCaseStudy } from "@/data/types/structuredCaseStudy";

interface StructuredCaseStudyLayoutProps {
  caseStudy: StructuredCaseStudy;
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  caseStudy
}) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <CaseStudyHero 
          title={caseStudy.title}
          description={caseStudy.description}
          tags={caseStudy.tags}
          videoSrc={caseStudy.heroVideo?.src}
          posterSrc={caseStudy.heroVideo?.poster}
        />
        
        <div className="container mx-auto px-4 py-16">
          {caseStudy.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CaseStudySection
                id={`section-${index}`}
                title={section.title || ''}
                content={{
                  text: section.content.text || '',
                  image: {
                    src: section.content.image || '/api/placeholder/800/600',
                    alt: section.title || 'Case study image'
                  }
                }}
              />
            </motion.div>
          ))}
        </div>
        
        <ProjectNavigation currentProjectId={caseStudy.id} />
      </main>
      
      <Footer />
    </div>
  );
};

export default StructuredCaseStudyLayout;
