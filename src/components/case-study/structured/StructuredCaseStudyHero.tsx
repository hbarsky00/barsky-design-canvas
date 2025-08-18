
import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from "../VideoPlayer";
import ProjectActionsCompact from "@/components/project/ProjectActionsCompact";
import { useScroll3DTilt } from "@/hooks/useScroll3DTilt";
import { StructuredCaseStudyData } from "@/data/structuredCaseStudies";
import { getCanonicalUrl } from "@/utils/urlUtils";

interface StructuredCaseStudyHeroProps {
  caseStudyData: StructuredCaseStudyData;
  heroAsImage?: boolean;
}

const StructuredCaseStudyHero: React.FC<StructuredCaseStudyHeroProps> = ({ 
  caseStudyData,
  heroAsImage = false 
}) => {
  const location = useLocation();
  const textRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLDivElement>(null);
  const { containerStyle: textStyle } = useScroll3DTilt(textRef, { maxTilt: 2.5, yDistance: 10, childParallax: 6 });
  const { containerStyle: videoStyle } = useScroll3DTilt(videoRef, { maxTilt: 2, yDistance: 8, childParallax: 4, scaleRange: [0.996, 1, 0.998] });

  return (
    <section className="section-spacing bg-gradient-to-br from-background to-muted" style={{ perspective: "1000px" }}>
      <div className="section-container">
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12 mt-8"
          style={{ ...textStyle, transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <h1 className="text-hero-h1 text-foreground mb-6 content-rail-center">
            {caseStudyData.title}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 content-rail-center">
            {caseStudyData.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {caseStudyData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>

          {caseStudyData.projectLink && (
            <div className="flex justify-center max-w-md mx-auto">
              <ProjectActionsCompact 
                liveUrl={caseStudyData.projectLink}
                projectTitle={caseStudyData.title}
                projectDescription={caseStudyData.description}
                projectPageUrl={getCanonicalUrl(location.pathname)}
              />
            </div>
          )}
        </motion.div>

        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
          style={{ ...videoStyle, transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {heroAsImage && caseStudyData.seoData?.image ? (
            <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-2xl">
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

export default StructuredCaseStudyHero;
