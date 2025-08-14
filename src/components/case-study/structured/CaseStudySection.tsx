
import React from "react";
import { motion } from "framer-motion";

interface CaseStudySectionProps {
  section: {
    type: string;
    title?: string;
    content: {
      text?: string;
      image?: string;
      images?: string[];
    };
  };
  index: number;
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ section, index }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {section.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              {section.title}
            </h2>
          )}

          {section.content.text && (
            <div className="prose prose-lg max-w-4xl mx-auto mb-12">
              <p className="text-muted-foreground leading-relaxed">
                {section.content.text}
              </p>
            </div>
          )}

          {section.content.image && (
            <div className="max-w-6xl mx-auto mb-12">
              <img
                src={section.content.image}
                alt={section.title || 'Case study image'}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {section.content.images && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {section.content.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`${section.title || 'Case study'} image ${imgIndex + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySection;
