
import React from "react";
import { motion } from "framer-motion";
import InteractiveImageGallery from "./InteractiveImageGallery";

interface TechnicalImplementationSectionProps {
  technologies: string[];
  technicalImages: string[];
  imageCaptions: Record<string, string>;
}

const TechnicalImplementationSection: React.FC<TechnicalImplementationSectionProps> = ({
  technologies,
  technicalImages,
  imageCaptions
}) => {
  if (technicalImages.length === 0) return null;

  return (
    <section className="case-study-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="process-card"
      >
        <h2 className="text-heading-2 text-navy-primary mb-6">Technical Implementation</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {technologies.map((tech) => (
            <div key={tech} className="text-center p-3 bg-neutral-100 rounded-lg">
              <span className="text-sm font-medium text-navy-primary">{tech}</span>
            </div>
          ))}
        </div>
        <InteractiveImageGallery
          images={technicalImages}
          captions={imageCaptions}
          columns={2}
        />
      </motion.div>
    </section>
  );
};

export default TechnicalImplementationSection;
