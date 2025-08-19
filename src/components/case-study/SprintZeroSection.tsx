import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "@/components/project/MaximizableImage";

interface SprintZeroSectionProps {
  eyebrow: string;
  title: string;
  workshopKickoff: string;
  explorations: string;
  decisionPoint: string;
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

const SprintZeroSection: React.FC<SprintZeroSectionProps> = ({
  eyebrow,
  title,
  workshopKickoff,
  explorations,
  decisionPoint,
  images
}) => {
  return (
    <section 
      id="sprint-zero" 
      data-section="sprint-zero" 
      aria-labelledby="sprint-zero-heading" 
      className="section-snap py-12 md:py-16 scroll-mt-[calc(var(--header-height,64px)+1rem)]"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-eyebrow text-blue-700 header-spacing">
              {eyebrow}
            </div>
            <h2 id="sprint-zero-heading" className="text-section-title content-rail-center">
              {title}
            </h2>
          </div>

          <div className="content-rail-left space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Workshop Kickoff</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {workshopKickoff}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Explorations</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {explorations}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Decision Point</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {decisionPoint}
              </p>
            </div>
          </div>

          {images && images.length > 0 && (
            <div className="space-y-6 mt-8">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <MaximizableImage
                    src={image.src}
                    alt={image.alt}
                    caption={image.caption}
                    className="w-full rounded-lg"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SprintZeroSection;