
import React from "react";
import { motion } from "framer-motion";

interface SectionImage {
  src: string;
  alt: string;
}

interface ChallengeSolutionSectionProps {
  challenge: string;
  result: string;
  challengeImages?: SectionImage[];
  solutionImages?: SectionImage[];
}

const ChallengeSolutionSection: React.FC<ChallengeSolutionSectionProps> = ({
  challenge,
  result,
  challengeImages = [],
  solutionImages = []
}) => {
  return (
    <section className="case-study-section">
      <div className="space-y-16">
        {/* Challenge Section - 60% text left, 40% images right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
        >
          <div className="lg:col-span-3 process-card">
            <h2 className="text-heading-2 text-navy-primary mb-6">The Challenge</h2>
            <p className="text-body text-neutral-500 leading-relaxed">
              {challenge}
            </p>
          </div>
          
          {challengeImages.length > 0 && (
            <div className="lg:col-span-2 space-y-4">
              {challengeImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-full"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full max-w-[400px] h-auto rounded-lg shadow-md border border-neutral-200"
                    style={{ aspectRatio: '4/3', objectFit: 'cover' }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        
        {/* Solution Section - 40% images left, 60% text right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
        >
          {solutionImages.length > 0 && (
            <div className="lg:col-span-2 space-y-4 order-2 lg:order-1">
              {solutionImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-full"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full max-w-[350px] h-auto rounded-lg shadow-md border border-neutral-200"
                    style={{ aspectRatio: '4/3', objectFit: 'cover' }}
                  />
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="lg:col-span-3 process-card order-1 lg:order-2">
            <h2 className="text-heading-2 text-navy-primary mb-6">The Solution</h2>
            <p className="text-body text-neutral-500 leading-relaxed">
              {result}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChallengeSolutionSection;
