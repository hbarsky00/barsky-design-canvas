import React from "react";
import { motion } from "framer-motion";
import VideoPlayer from "../VideoPlayer";
import { useScroll3DTilt } from "@/hooks/useScroll3DTilt";
import { StructuredCaseStudyData } from "@/data/structuredCaseStudies";

interface StructuredHeroImageSectionProps {
  caseStudyData: StructuredCaseStudyData;
  heroAsImage?: boolean;
}

const StructuredHeroImageSection: React.FC<StructuredHeroImageSectionProps> = ({ 
  caseStudyData,
  heroAsImage = false 
}) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const { containerStyle: videoStyle } = useScroll3DTilt(videoRef, { maxTilt: 2, yDistance: 8, childParallax: 4, scaleRange: [0.996, 1, 0.998] });

  return (
    <section 
      id="hero-image" 
      data-section="hero-image" 
      aria-labelledby="hero-image-heading" 
      className="section-snap py-8 scroll-mt-[calc(var(--header-height,64px)+2rem)]" 
      style={{ perspective: "1000px" }}
    >
      <h2 id="hero-image-heading" className="sr-only">Project Hero Image</h2>
      <div className="section-container">
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ ...videoStyle, transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {heroAsImage && caseStudyData.seoData?.image ? (
            <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={caseStudyData.seoData.image} 
                alt={caseStudyData.title}
                className="w-full h-auto object-contain"
              />
            </div>
          ) : caseStudyData.heroVideo?.src ? (
            <VideoPlayer 
              videoSrc={caseStudyData.heroVideo.src}
              thumbnailSrc={caseStudyData.heroVideo.poster || caseStudyData.seoData?.image || ''}
              title={caseStudyData.title}
            />
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default StructuredHeroImageSection;