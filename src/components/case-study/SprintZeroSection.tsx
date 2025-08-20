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
      className="section-snap py-6 md:py-12 scroll-mt-[calc(var(--header-height,64px)+1rem)]"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4 md:space-y-8"
        >
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-eyebrow text-blue-700 header-spacing">
              {eyebrow}
            </div>
            <h2 id="sprint-zero-heading" className="text-section-title content-rail-center">
              {title}
            </h2>
          </div>

          {/* Row 1 - Initial Concepts & Sketches (50% image left, 50% text right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-6 md:mb-12">
            {/* Image - 50% on desktop */}
            <div className="md:col-span-6">
              {images && images[0] && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <MaximizableImage
                    src={images[0].src}
                    alt={images[0].alt}
                    caption={images[0].caption}
                    className="w-full rounded-lg"
                  />
                </motion.div>
              )}
            </div>
            
            {/* Text - 50% on desktop */}
            <div className="md:col-span-6 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">Exploration: Initial Concepts & Sketches</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {explorations}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Row 2 - Decision Point (50% text left, 50% image right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Text - 50% on desktop */}
            <div className="md:col-span-6 flex flex-col justify-center order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">Decision Point</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {decisionPoint}
                </p>
              </motion.div>
            </div>
            
            {/* Image - 50% on desktop */}
            <div className="md:col-span-6 order-1 md:order-2">
              {images && images[1] && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <MaximizableImage
                    src={images[1].src}
                    alt={images[1].alt}
                    caption={images[1].caption}
                    className="w-full rounded-lg"
                    fit="contain"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SprintZeroSection;