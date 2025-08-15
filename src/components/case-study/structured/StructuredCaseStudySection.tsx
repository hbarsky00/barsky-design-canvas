
import React from "react";
import { motion } from "framer-motion";
import { StructuredCaseStudySectionProps } from "@/data/types/caseStudy";
import ImageMaximizer from "@/components/ImageMaximizer";

interface StructuredCaseStudySectionComponentProps {
  section: StructuredCaseStudySectionProps;
  index: number;
}

const StructuredCaseStudySection: React.FC<StructuredCaseStudySectionComponentProps> = ({
  section,
  index
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      {section.title && (
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          {section.title}
        </h2>
      )}

      {/* Content Section */}
      {section.type === 'content' && section.content && (
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {section.content}
          </p>
        </div>
      )}

      {/* Gallery Section */}
      {section.type === 'gallery' && section.images && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.images.map((image, idx) => (
            <ImageMaximizer
              key={idx}
              src={image}
              alt={`${section.title} - Image ${idx + 1}`}
              className="rounded-lg overflow-hidden"
            />
          ))}
        </div>
      )}

      {/* Video Section */}
      {section.type === 'video' && section.videoSrc && (
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          <video
            src={section.videoSrc}
            poster={section.videoPoster}
            controls
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Metrics Section */}
      {section.type === 'metrics' && section.metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {section.metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-background border border-border rounded-lg"
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default StructuredCaseStudySection;
