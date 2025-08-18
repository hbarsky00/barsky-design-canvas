import React from "react";
import { motion } from "framer-motion";

interface EmergingTheme {
  eyebrow: string;
  insight: string;
  drove: string;
}

interface ResearchSection {
  subhead: string;
  emergingThemes: EmergingTheme[];
  researchImage: string;
  researchImageAlt: string;
}

interface ResearchSectionTwoColProps {
  researchSection: ResearchSection;
}

const ResearchSectionTwoCol: React.FC<ResearchSectionTwoColProps> = ({
  researchSection
}) => {
  return (
    <motion.section
      id="research"
      className="pt-16 pb-16 md:pt-24 md:pb-24 scroll-mt-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header - Centered above grid */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
          RESEARCH
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Gathering insights
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {researchSection.subhead}
        </p>
      </div>

      {/* Grid - 12 columns responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left column - Content (7 columns on desktop) */}
        <div className="lg:col-span-7">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8">
            Emerging themes
          </h3>
          
          {/* Bubble cards list */}
          <div className="space-y-6">
            {researchSection.emergingThemes.map((theme, index) => (
              <motion.div
                key={index}
                className="rounded-[24px] border border-neutral-200 bg-white p-6 md:p-7 shadow-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-xs font-semibold tracking-wide uppercase text-neutral-600 mb-3">
                  {theme.eyebrow}
                </div>
                <p className="text-foreground leading-relaxed mb-2">
                  {theme.insight}
                </p>
                <p className="text-foreground leading-relaxed">
                  <span className="font-medium">Drove:</span> {theme.drove}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column - Image (5 columns on desktop) */}
        <div className="lg:col-span-5">
          <motion.div
            className="sticky top-24"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={researchSection.researchImage}
              alt={researchSection.researchImageAlt}
              className="w-full h-auto rounded-2xl shadow-lg object-contain"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ResearchSectionTwoCol;