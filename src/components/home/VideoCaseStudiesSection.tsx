import React from "react";
import { motion } from "framer-motion";
import ModernProjectCard from "@/components/homepage/ModernProjectCard";
import { homepageCaseStudyPreviews } from "@/data/caseStudies";
import SectionHeader from "@/components/shared/SectionHeader";
const VideoCaseStudiesSection: React.FC = () => {
  return <section id="projects" className="py-16 bg-gradient-to-br from-primary-container/10 to-secondary-container/10">
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
          className="mb-16"
        >
          <SectionHeader
            as="h2"
            title="Case Studies That Drive Results"
            subtitle="Real projects. Measurable outcomes. See how I transform business challenges into digital solutions."
            titleClassName="text-display-medium font-bold text-on-surface"
            subtitleClassName="text-title-large text-on-surface-variant"
          />
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {homepageCaseStudyPreviews.map((study, index) => <ModernProjectCard key={study.title} title={study.title} description={study.description} tags={study.tags} videoThumbnail={study.videoThumbnail} video={study.video} url={study.url} className="" />)}
        </div>

        {/* View All CTA */}
      </div>
    </section>;
};
export default VideoCaseStudiesSection;