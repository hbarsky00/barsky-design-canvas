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
      className="min-h-[100dvh] sm:min-h-screen md:min-h-[110vh] pt-safe-top pb-safe-bottom pt-20 pb-16 md:pt-28 md:pb-28 scroll-mt-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header - Centered above grid */}
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4 min-touch">
            RESEARCH
          </div>
          <h2 className="text-responsive-xl font-bold text-foreground mb-4">
            Gathering insights
          </h2>
          <p className="text-responsive-base text-muted-foreground max-w-3xl mx-auto">
            {researchSection.subhead}
          </p>
        </div>

        {/* Grid - 12 columns responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Left column - Content (7 columns on desktop) */}
          <div className="lg:col-span-7 max-w-[62ch]">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6 sm:mb-8">
              Emerging themes
            </h3>
            
            {/* Bubble cards list */}
            <div className="space-y-4 sm:space-y-6">
              {researchSection.emergingThemes.map((theme, index) => (
                <motion.div
                  key={index}
                  className="rounded-[20px] sm:rounded-[24px] border border-border bg-card p-4 sm:p-6 md:p-7 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  style={{ 
                    willChange: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'transform' 
                  }}
                >
                  <div className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
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
          <div className="lg:col-span-5 order-first lg:order-last">
            <motion.div
              className="lg:sticky lg:top-24"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rounded-[24px] sm:rounded-[28px] border border-border bg-card/70 backdrop-blur-sm shadow-sm overflow-hidden p-3 sm:p-4 md:p-6">
                <picture>
                  <source
                    srcSet={`${researchSection.researchImage.replace(/\.(jpg|jpeg|png)$/, '.webp')} 1x, ${researchSection.researchImage.replace(/\.(jpg|jpeg|png)$/, '@2x.webp')} 2x`}
                    type="image/webp"
                  />
                  <img
                    src={researchSection.researchImage}
                    srcSet={`${researchSection.researchImage} 1x, ${researchSection.researchImage.replace(/\.(jpg|jpeg|png)$/, '@2x.$1')} 2x`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt={researchSection.researchImageAlt}
                    className="w-full h-[48vh] sm:h-[56vh] md:h-[68vh] lg:h-[74vh] object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ResearchSectionTwoCol;