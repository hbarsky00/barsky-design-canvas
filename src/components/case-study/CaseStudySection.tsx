
import React from "react";
import { motion } from "framer-motion";

interface CaseStudySectionProps {
  id: string;
  title: string;
  content: {
    text: string;
    image: {
      src: string;
      alt: string;
    };
  };
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ id, title, content }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16 scroll-mt-24"
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            {content.text.split('✅').map((part, index) => {
              if (index === 0) return <p key={index}>{part}</p>;
              return (
                <div key={index} className="flex items-start gap-2 mb-2">
                  <span className="text-green-600 font-semibold">✅</span>
                  <span>{part.trim()}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CaseStudySection;
