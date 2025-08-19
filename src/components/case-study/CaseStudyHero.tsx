
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
    <section className="pt-8 pb-16 bg-gradient-to-br from-background to-muted" style={{ perspective: "1000px" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12 mt-8"
          style={{ ...textStyle, transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {caseStudy.title}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {caseStudy.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {caseStudy.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>

          {caseStudy.projectLink && (
            <div className="flex justify-center">
              <ProjectLinks projectLink={caseStudy.projectLink} />
            </div>
          )}
        </motion.div>

        {/* Full-width white background container for hero video */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white py-8 md:py-12">
          <motion.div
            ref={videoRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            style={{ ...videoStyle, transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <VideoPlayer 
              videoSrc={caseStudy.video}
              thumbnailSrc={caseStudy.videoThumbnail}
              title={caseStudy.title}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
