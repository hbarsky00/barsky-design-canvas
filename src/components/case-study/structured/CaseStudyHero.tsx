
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface CaseStudyHeroProps {
  title: string;
  description: string;
  tags: string[];
  videoSrc?: string;
  posterSrc?: string;
  heroVideo?: {
    src: string;
    poster?: string;
  };
  gradientClasses?: string;
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  description,
  tags,
  videoSrc,
  posterSrc,
  heroVideo,
  gradientClasses = "from-background to-muted/50"
}) => {
  // Use videoSrc/posterSrc if provided, otherwise use heroVideo
  const video = videoSrc ? { src: videoSrc, poster: posterSrc } : heroVideo;

  return (
    <div className={`bg-gradient-to-br ${gradientClasses} py-20`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>

          {video && (
            <div className="relative max-w-4xl mx-auto">
              <video
                className="w-full h-auto rounded-lg shadow-2xl"
                poster={video.poster}
                controls
                playsInline
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudyHero;
