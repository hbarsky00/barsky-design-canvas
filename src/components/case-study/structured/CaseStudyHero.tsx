
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface CaseStudyHeroProps {
  title: string;
  description: string;
  tags: string[];
  heroVideo?: {
    src: string;
    poster?: string;
  };
  videoSrc?: string;
  posterSrc?: string;
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ 
  title, 
  description, 
  tags, 
  heroVideo,
  videoSrc,
  posterSrc 
}) => {
  // Support both new and legacy prop structures
  const video = heroVideo || (videoSrc ? { src: videoSrc, poster: posterSrc } : undefined);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      {video && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={video.poster}
          >
            <source src={video.src} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {title}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudyHero;
