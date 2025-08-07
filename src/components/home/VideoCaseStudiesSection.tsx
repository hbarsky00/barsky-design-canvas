import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ModernProjectCard from "@/components/homepage/ModernProjectCard";
import { homepageCaseStudyPreviews } from "@/data/caseStudies";

const VideoCaseStudiesSection: React.FC = () => {

  return (
    <section id="projects" className="py-16 bg-gradient-to-br from-primary-container/10 to-secondary-container/10">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-medium font-bold text-on-surface mb-6">
            Case Studies That Drive Results
          </h2>
          <p className="text-title-large text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            Real projects. Measurable outcomes. See how I transform business challenges into digital solutions.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-4 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Case Studies
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoCaseStudiesSection;