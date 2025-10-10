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
// Removed getCanonicalUrl import - URL is handled by UnifiedSEO only

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
  const [isTablet, setIsTablet] = React.useState(false);
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

  React.useEffect(() => {
    const checkTablet = () => {
      setIsTablet(!isMobile && window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, [isMobile]);

  const shouldShowVideo = !heroAsImage && caseStudyData.heroVideo?.src;
  const shouldShowImage = heroAsImage || (!caseStudyData.heroVideo?.src && caseStudyData.seoData?.image);

  return (
    <section 
      id="hero"
      data-section="hero"
      className="section-snap w-full hero-no-overflow md:py-6 lg:py-8 scroll-mt-[calc(var(--header-height,64px)+1rem)] bg-white" 
      style={{ perspective: "1000px" }}
    >
      {/* Mobile Layout: Full Hero Container */}
      {isMobile ? (
        <div className="hero-mobile-fullbleed hero-no-overflow">
          {/* Text Content - Centered with proper padding */}
          <div className="py-8">
            <motion.div
              ref={textRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-center-mobile"
              style={{ ...textStyle, transformStyle: "preserve-3d", willChange: "transform" }}
            >
              <div className="hero-text-stack">
            <h1 className="hero-title-mobile text-foreground font-display">
              {caseStudyData.title}
            </h1>
            
            <p className="hero-subtitle-mobile text-muted-foreground">
              {caseStudyData.description}
            </p>
                
                <div className="hero-tags flex flex-wrap justify-center gap-2 mt-4">
                  {caseStudyData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-2">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {caseStudyData.projectLink && (
                  <div className="hero-cta-wrapper max-w-md mx-auto mt-6">
                    <ProjectActionsCompact 
                      liveUrl={caseStudyData.projectLink}
                      projectTitle={caseStudyData.title}
                      projectDescription={caseStudyData.description}
                      projectPageUrl={`https://barskydesign.pro${location.pathname}`}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Media Content - Full width with proper aspect ratio */}
          <motion.div
            ref={mediaRef}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-image-fullwidth mt-8"
            style={{ ...mediaStyle, transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <div className="hero-image">
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
                  className="w-full h-auto block rounded-2xl shadow-md"
                  priority={true}
                />
              )}
            </div>
          </motion.div>
        </div>
      ) : isTablet ? (
        /* Tablet Layout: Full-width images, padded text */
        <div className="hero-mobile-fullbleed hero-no-overflow">
          {/* Text with constrained width */}
          <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12">
            <motion.div
              ref={textRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
              style={{ ...textStyle, transformStyle: "preserve-3d", willChange: "transform" }}
            >
              <div className="hero-text-stack">
                <h1 className="text-4xl md:text-5xl text-foreground font-display leading-tight">
                  {caseStudyData.title}
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground hero-subtitle">
                  {caseStudyData.description}
                </p>
                
                <div className="hero-tags">
                  {caseStudyData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1.5">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {caseStudyData.projectLink && (
                  <div className="hero-cta-wrapper">
                    <ProjectActionsCompact
                      liveUrl={caseStudyData.projectLink}
                      projectTitle={caseStudyData.title}
                      projectDescription={caseStudyData.description}
                      projectPageUrl={`https://barskydesign.pro${location.pathname}`}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Image full-width on tablet too */}
          <motion.div
            ref={mediaRef}
            initial={{ opacity: 0.3, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="hero-image-fullwidth"
            style={{ ...mediaStyle, transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <div className="hero-image">
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
            </div>
          </motion.div>
        </div>
      ) : (
        /* Desktop Layout: Two Columns */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center">
            {/* Left Column: Text Content */}
            <motion.div
              ref={textRef}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-left"
              style={{ ...textStyle, transformStyle: "preserve-3d", willChange: "transform" }}
            >
              <h1 className="text-hero-h1 text-foreground font-display mb-6 leading-tight">
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
                    projectPageUrl={`https://barskydesign.pro${location.pathname}`}
                  />
                </div>
              )}
            </motion.div>

            {/* Right Column: Media Content */}
            <motion.div
              ref={mediaRef}
              initial={{ opacity: 0.3, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
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