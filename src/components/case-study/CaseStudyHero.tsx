
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from "./VideoPlayer";
import { CaseStudyData } from "@/data/caseStudies";
import ProjectLinks from "@/components/project/ProjectLinks";
import { useScroll3DTilt } from "@/hooks/useScroll3DTilt";
import TechStackDisplay, { TechStack } from "@/components/tech-stack/TechStackDisplay";

interface CaseStudyHeroProps {
  caseStudy: CaseStudyData & { techStack?: TechStack };
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ caseStudy }) => {
  const textRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLDivElement>(null);
  const { containerStyle: textStyle } = useScroll3DTilt(textRef, { maxTilt: 2.5, yDistance: 10, childParallax: 6 });
  const { containerStyle: videoStyle } = useScroll3DTilt(videoRef, { maxTilt: 2, yDistance: 8, childParallax: 4, scaleRange: [0.996, 1, 0.998] });
  return (
    <section className="bg-gradient-to-br from-background to-muted md:pt-8 md:pb-16" style={{ perspective: "1000px" }}>
      <div className="hero-container-mobile md:max-w-6xl md:mx-auto">
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
          style={{ ...textStyle, transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <div className="hero-text-stack mt-8 mb-12">
            <h1 className="heading-hero text-foreground">
              {caseStudy.title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground hero-subtitle">
              {caseStudy.description}
            </p>
            
            <div className="hero-tags">
              {caseStudy.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1.5">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Tech Stack - Gen-AI First */}
            {caseStudy.techStack && (
              <div className="mt-6">
                <TechStackDisplay techStack={caseStudy.techStack} variant="full" className="justify-center" />
              </div>
            )}

            {caseStudy.projectLink && (
              <div className="hero-cta-wrapper">
                <ProjectLinks projectLink={caseStudy.projectLink} />
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8"
          style={{ ...videoStyle, transformStyle: "preserve-3d", willChange: "transform" }}
        >
            <VideoPlayer 
              videoSrc={caseStudy.video}
              thumbnailSrc={caseStudy.videoThumbnail}
              title={caseStudy.title}
            />
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
