import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from "../VideoPlayer";
import ProjectActionsCompact from "@/components/project/ProjectActionsCompact";
import MaximizableImage from "@/components/project/MaximizableImage";
import { useScroll3DTilt } from "@/hooks/useScroll3DTilt";
import { useIsMobile } from "@/hooks/use-mobile";
import { StructuredCaseStudyData } from "@/data/structuredCaseStudies";
import { getCanonicalUrl } from "@/utils/urlUtils";

interface UnifiedCaseStudyHeroProps {
  caseStudyData: StructuredCaseStudyData;
  heroAsImage?: boolean;
}

const UnifiedCaseStudyHero: React.FC<UnifiedCaseStudyHeroProps> = ({ 
  caseStudyData,
  heroAsImage = false 
}) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const textRef = React.useRef<HTMLDivElement>(null);
  const mediaRef = React.useRef<HTMLDivElement>(null);
  
  const { containerStyle: textStyle } = useScroll3DTilt(textRef, { 
    maxTilt: 2.5, 
    yDistance: 10, 
    childParallax: 6 
  });
  
  const { containerStyle: mediaStyle } = useScroll3DTilt(mediaRef, { 
    maxTilt: 2, 
    yDistance: 8, 
    childParallax: 4, 
    scaleRange: [0.996, 1, 0.998] 
  });

  const shouldShowVideo = !heroAsImage && caseStudyData.heroVideo?.src;
  const shouldShowImage = heroAsImage || (!caseStudyData.heroVideo?.src && caseStudyData.seoData?.image);

  return (
    <section 
      id="hero"
      data-section="hero"
      className="section-snap w-full bg-white md:py-12 lg:py-16 scroll-mt-[calc(var(--header-height,64px)+1rem)]" 
      style={{ perspective: "1000px" }}
    >
      {/* Mobile Layout: Full Hero Container */}
      {isMobile ? (
        <div className="hero-container">
          <div className="flex flex-col justify-center gap-4 w-full max-w-none">
            {/* Text Content */}
            <motion.div
              ref={textRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-left w-full"
              style={{ ...textStyle, transformStyle: "preserve-3d", willChange: "transform" }}
            >
              <h1 className="hero-title-mobile text-foreground mb-3 w-full">
                {caseStudyData.title}
              </h1>
              
              <p className="hero-subtitle-mobile text-muted-foreground mb-4 w-full">
                {caseStudyData.description}
              </p>
              
              <div className="hero-tags mb-5 w-full">
                 {caseStudyData.tags.map((tag) => (
                   <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
                     {tag}
                   </Badge>
                 ))}
              </div>

               {caseStudyData.projectLink && (
                 <div className="hero-cta-container w-full">
                   <ProjectActionsCompact 
                     liveUrl={caseStudyData.projectLink}
                     projectTitle={caseStudyData.title}
                     projectDescription={caseStudyData.description}
                     projectPageUrl={getCanonicalUrl(location.pathname)}
                   />
                 </div>
               )}
            </motion.div>

            {/* Media Content */}
            <motion.div
              ref={mediaRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full"
              style={{ ...mediaStyle, transformStyle: "preserve-3d", willChange: "transform" }}
            >
              {shouldShowVideo && (
                <div className="hero-image">
                  <VideoPlayer 
                    videoSrc={caseStudyData.heroVideo!.src}
                    thumbnailSrc={caseStudyData.heroVideo!.poster}
                    title={caseStudyData.title}
                  />
                </div>
              )}
              
              {shouldShowImage && caseStudyData.seoData?.image && (
                <div className="hero-image">
                  <MaximizableImage
                    src={caseStudyData.seoData.image}
                    alt={`${caseStudyData.title} hero image`}
                    caption={`${caseStudyData.title} project overview`}
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      ) : (
        /* Desktop Layout: Two Columns */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column: Text Content */}
            <motion.div
              ref={textRef}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-left"
              style={{ ...textStyle, transformStyle: "preserve-3d", willChange: "transform" }}
            >
              <h1 className="text-hero-h1 text-foreground mb-6 leading-tight">
                {caseStudyData.title}
              </h1>
              
              <p className="text-lg xl:text-xl text-muted-foreground mb-8 leading-relaxed">
                {caseStudyData.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {caseStudyData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>

              {caseStudyData.projectLink && (
                <div className="max-w-md">
                  <ProjectActionsCompact 
                    liveUrl={caseStudyData.projectLink}
                    projectTitle={caseStudyData.title}
                    projectDescription={caseStudyData.description}
                    projectPageUrl={getCanonicalUrl(location.pathname)}
                  />
                </div>
              )}
            </motion.div>

            {/* Right Column: Media Content */}
            <motion.div
              ref={mediaRef}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
              style={{ ...mediaStyle, transformStyle: "preserve-3d", willChange: "transform" }}
            >
              {shouldShowVideo && (
                <VideoPlayer 
                  videoSrc={caseStudyData.heroVideo!.src}
                  thumbnailSrc={caseStudyData.heroVideo!.poster}
                  title={caseStudyData.title}
                />
              )}
              
              {shouldShowImage && caseStudyData.seoData?.image && (
                <MaximizableImage
                  src={caseStudyData.seoData.image}
                  alt={`${caseStudyData.title} hero image`}
                  caption={`${caseStudyData.title} project overview`}
                />
              )}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UnifiedCaseStudyHero;