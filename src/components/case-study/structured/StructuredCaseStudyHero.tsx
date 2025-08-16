
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import IdentityBadge from "@/components/shared/IdentityBadge";
import VideoPlayer from "../VideoPlayer";
import { StructuredCaseStudyData } from "@/data/structuredCaseStudies";
import ProjectLinks from "@/components/project/ProjectLinks";
import { useScroll3DTilt } from "@/hooks/useScroll3DTilt";

interface StructuredCaseStudyHeroProps {
  caseStudyData: StructuredCaseStudyData;
  heroAsImage?: boolean;
}

const StructuredCaseStudyHero: React.FC<StructuredCaseStudyHeroProps> = ({ 
  caseStudyData, 
  heroAsImage = false 
}) => {
  const textRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLDivElement>(null);
  const { containerStyle: textStyle } = useScroll3DTilt(textRef, { maxTilt: 2.5, yDistance: 10, childParallax: 6 });
  const { containerStyle: videoStyle } = useScroll3DTilt(videoRef, { maxTilt: 2, yDistance: 8, childParallax: 4, scaleRange: [0.996, 1, 0.998] });

  return (
    <section className="pt-8 pb-16 bg-gradient-to-br from-background to-muted" style={{ perspective: "1000px" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <IdentityBadge
            to="/"
            imageSrc="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
            name="Hiram Barsky"
            subtitle="Product Designer & Gen AI Developer"
            size="md"
            subtitleStyle="text"
          />
        </motion.div>

        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
          style={{ ...textStyle, transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {caseStudyData.title}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
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
            <div className="flex justify-center">
              <ProjectLinks projectLink={caseStudyData.projectLink} />
            </div>
          )}
        </motion.div>

        {/* Hero Content - Image or Video */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
          style={{ ...videoStyle, transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {heroAsImage && caseStudyData.heroImage ? (
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-2xl">
              <img
                src={caseStudyData.heroImage}
                alt={`${caseStudyData.title} hero image`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : caseStudyData.video && caseStudyData.videoThumbnail ? (
            <VideoPlayer 
              videoSrc={caseStudyData.video}
              thumbnailSrc={caseStudyData.videoThumbnail}
              title={caseStudyData.title}
            />
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default StructuredCaseStudyHero;
