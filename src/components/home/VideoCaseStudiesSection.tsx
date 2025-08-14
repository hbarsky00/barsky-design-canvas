
import React from "react";
import { motion } from "framer-motion";
import ModernProjectCard from "@/components/homepage/ModernProjectCard";
import { homepageCaseStudyPreviews } from "@/data/caseStudies";
import SectionHeader from "@/components/shared/SectionHeader";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { NavigationProps } from "@/types/navigation";

interface VideoCaseStudiesSectionProps extends NavigationProps {}

const VideoCaseStudiesSection: React.FC<VideoCaseStudiesSectionProps> = ({ 
  navigateUp, 
  navigateDown, 
  canNavigateUp, 
  canNavigateDown, 
  isMobile 
}) => {
  return (
    <section id="projects" className="py-4 sm:py-6 min-h-screen flex flex-col justify-center relative bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <SectionHeader
            as="h2"
            title="Case Studies That Drive Results"
            subtitle="Real projects. Measurable outcomes. See how I transform business challenges into digital solutions."
            titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface"
            subtitleClassName="text-lg sm:text-xl md:text-2xl text-on-surface-variant"
          />
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 will-change-transform" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
          {homepageCaseStudyPreviews.map((study, index) => (
            <ModernProjectCard
              key={study.title}
              title={study.title}
              description={study.description}
              tags={study.tags}
              videoThumbnail={study.videoThumbnail}
              video={study.video}
              url={study.url}
              className=""
            />
          ))}
        </div>
      </div>

      {/* Hide navigation arrows on mobile - only show on desktop */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <SectionNavigation
            onNavigateUp={navigateUp}
            onNavigateDown={navigateDown}
            canNavigateUp={canNavigateUp}
            canNavigateDown={canNavigateDown}
            upLabel="Previous section"
            downLabel="Contact"
          />
        </div>
      )}
    </section>
  );
};

export default VideoCaseStudiesSection;
