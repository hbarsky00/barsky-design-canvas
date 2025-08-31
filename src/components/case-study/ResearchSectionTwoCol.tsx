import React from "react";
import { motion } from "framer-motion";
import ProjectVideo from "../project/ProjectVideo";
import { getAnnotationBlurbClasses, getResponsiveTruncatedText } from "@/utils/captionStyles";

interface EmergingTheme {
  eyebrow: string;
  insight: string;
  drove: string;
}

interface ResearchSection {
  subhead: string;
  blurb?: string;
  emergingThemes: EmergingTheme[];
  researchImage?: string;
  researchImageAlt?: string;
  researchImages?: { src: string; alt: string; }[];
  researchVideo?: string;
}

interface ResearchSectionTwoColProps {
  researchSection: ResearchSection;
}

const ResearchSectionTwoCol: React.FC<ResearchSectionTwoColProps> = ({
  researchSection
}) => {
  // Debug logging
  console.log('🔍 ResearchSectionTwoCol - researchSection:', researchSection);
  console.log('🔍 ResearchSectionTwoCol - researchImages:', researchSection.researchImages);
  console.log('🔍 ResearchSectionTwoCol - researchImage:', researchSection.researchImage);
  
  // Consolidate all media items
  const allMedia = [
    ...(researchSection.researchImage ? [{ 
      src: researchSection.researchImage, 
      alt: researchSection.researchImageAlt || "Research image" 
    }] : []),
    ...(researchSection.researchImages || [])
  ].filter(Boolean);

  console.log('🔍 ResearchSectionTwoCol - allMedia:', allMedia);

  // Dynamic layout based on media count
  const hasMedia = allMedia.length > 0 || researchSection.researchVideo;
  const isSingleMedia = allMedia.length === 1 && !researchSection.researchVideo;
  
  console.log('🔍 ResearchSectionTwoCol - hasMedia:', hasMedia, 'isSingleMedia:', isSingleMedia);
  
  // Grid column classes
  const gridCols = !hasMedia ? 'grid-cols-1' : 
                   isSingleMedia ? 'lg:grid-cols-10' : 'lg:grid-cols-12';
  const textCols = !hasMedia ? 'lg:col-span-full' :
                   isSingleMedia ? 'lg:col-span-6' : 'lg:col-span-7';
  const mediaCols = isSingleMedia ? 'lg:col-span-4' : 'lg:col-span-5';

  return (
    <motion.section
      id="research"
      className="py-8 scroll-mt-[calc(var(--header-height,64px)+2rem)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-container">
        {/* Header - Centered above grid */}
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-eyebrow header-spacing min-touch">
            RESEARCH
          </div>
          <h2 className="text-section-title text-foreground font-display mb-4 content-rail-center">
            Gathering insights
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground content-spacing content-rail-center">
            {researchSection.subhead}
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className={`grid grid-cols-1 ${gridCols} gap-6 sm:gap-8 lg:gap-10 items-start`}>
          {/* Left column - Content */}
          <div className={`${textCols} content-rail-left`}>
            <h3 className="text-subsection-title text-foreground font-display mb-6 sm:mb-8">
              Emerging themes
            </h3>
            
            {/* Clean theme list */}
            <div className="space-y-6 sm:space-y-8">
              {researchSection.emergingThemes.map((theme, index) => (
                <motion.div
                  key={index}
                  className="border-l-2 border-primary/20 pl-4 sm:pl-6"
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
                  <div className="text-xs font-semibold tracking-wide uppercase text-primary mb-2">
                    {theme.eyebrow}
                  </div>
                  <p className="text-foreground leading-relaxed mb-2 text-base">
                    {theme.insight}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    <span className="font-medium text-foreground">Drove:</span> {theme.drove}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column - Video or Images */}
          {hasMedia && (
            <div className={`${mediaCols} order-first lg:order-last`}>
              <motion.div
                className="lg:sticky lg:top-24"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Video Display */}
                {researchSection.researchVideo ? (
                  <ProjectVideo
                    src={researchSection.researchVideo}
                    title="Research Video"
                    className="w-full rounded-xl"
                  />
                ) : (
                  /* Optimized Image Display */
                  <div className={`flex flex-col gap-4 ${isSingleMedia ? 'h-auto' : 'h-[56vh] lg:h-[74vh] max-h-[74vh] overflow-y-auto'}`}>
                    {allMedia.map((image, index) => (
                      <figure key={index} className={`${isSingleMedia ? 'h-auto' : 'flex-1 min-h-0'} relative`}>
                         <img
                          src={image.src}
                          srcSet={image.src.startsWith('http') ? `${image.src} 1x${image.src && image.src.includes('.') ? `, ${image.src.replace(/\.(jpg|jpeg|png)$/, '@2x.$1')} 2x` : ''}` : undefined}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          alt={image.alt}
                          className={`w-full ${isSingleMedia ? 'h-auto object-cover' : 'h-full object-contain'} rounded-xl`}
                          loading="lazy"
                          decoding="async"
                          onLoad={() => console.log('✅ Research image loaded:', image.src)}
                          onError={() => {
                            console.error('❌ Research image failed to load:', image.src);
                            console.log('❌ Image error details:', { src: image.src, alt: image.alt });
                          }}
                          style={{ 
                            border: '2px solid red',
                            minHeight: '200px',
                            backgroundColor: 'yellow'
                          }}
                        />
                        {researchSection.blurb && index === 0 && (
                          <div className={getAnnotationBlurbClasses()}>
                            {getResponsiveTruncatedText(researchSection.blurb)}
                          </div>
                        )}
                      </figure>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default ResearchSectionTwoCol;