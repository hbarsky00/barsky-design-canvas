import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import { CaseStudyData } from "@/data/caseStudies";

interface CaseStudyHeroProps {
  caseStudy: CaseStudyData;
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ caseStudy }) => {
  return (
    <section className="pt-8 pb-16 bg-gradient-to-br from-background to-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
            <img 
              alt="Hiram Barsky" 
              className="w-10 h-10 rounded-full object-cover border-2 border-border" 
              src="/lovable-uploads/e52a884d-0e2f-4470-aae9-56e65adb2de0.png" 
            />
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">Hiram Barsky</div>
              <div className="text-xs text-muted-foreground">Product Designer & Gen AI Developer</div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
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