
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from "./VideoPlayer";
import { CaseStudyData } from "@/data/caseStudies";
import ProjectLinks from "@/components/project/ProjectLinks";
import { useScroll3DTilt } from "@/hooks/useScroll3DTilt";

interface CaseStudyHeroProps {
  caseStudy: CaseStudyData;
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ caseStudy }) => {
  const textRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLDivElement>(null);
  const { containerStyle: textStyle } = useScroll3DTilt(textRef, { maxTilt: 2.5, yDistance: 10, childParallax: 6 });
  const { containerStyle: videoStyle } = useScroll3DTilt(videoRef, { maxTilt: 2, yDistance: 8, childParallax: 4, scaleRange: [0.996, 1, 0.998] });
  return (
    <section id="hero" data-section="hero" className="bg-gradient-to-br from-background to-muted hero-no-overflow" style={{ perspective: "1000px" }}>
      <div className="hero-mobile-fullbleed hero-no-overflow md:max-w-6xl md:mx-auto">
        {/* Text Container with Padding */}
        <div className="md:px-8 md:pt-8 py-8">
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-center-mobile"
            style={{ ...textStyle, transformStyle: "preserve-3d", willChange: "transform" }}
          >
          <div className="hero-text-stack mt-8 mb-12">
            <h1 className="heading-hero text-foreground">
              {caseStudy.title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground hero-subtitle">
              {caseStudy.description}
            </p>
            
            <div className="hero-tags flex flex-wrap justify-center gap-2 mt-4">
              {caseStudy.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1.5">
                  {tag}
                </Badge>
              ))}
            </div>

            {caseStudy.projectLink && (
              <div className="hero-cta-wrapper max-w-md mx-auto mt-6">
                <ProjectLinks projectLink={caseStudy.projectLink} />
              </div>
            )}
          </div>
          </motion.div>
        </div>

        {/* Media Container - Full Bleed */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-image-fullwidth mt-6 md:max-w-3xl md:mx-auto md:px-6 lg:px-8 md:pb-8"
          style={{ ...videoStyle, transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <div className="hero-image">
            <VideoPlayer 
              videoSrc={caseStudy.video}
              thumbnailSrc={caseStudy.videoThumbnail}
              title={caseStudy.title}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
