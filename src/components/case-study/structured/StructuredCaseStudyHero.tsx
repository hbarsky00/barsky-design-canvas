
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { StructuredCaseStudy } from "@/data/types/caseStudy";
import VideoPlayer from "../VideoPlayer";

interface StructuredCaseStudyHeroProps {
  caseStudy: StructuredCaseStudy;
}

const StructuredCaseStudyHero: React.FC<StructuredCaseStudyHeroProps> = ({
  caseStudy
}) => {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
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
      </motion.div>

      {caseStudy.heroVideo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <VideoPlayer 
            videoSrc={caseStudy.heroVideo.src}
            thumbnailSrc={caseStudy.heroVideo.poster}
            title={caseStudy.title}
          />
        </motion.div>
      )}
    </section>
  );
};

export default StructuredCaseStudyHero;
