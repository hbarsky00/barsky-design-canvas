
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
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
  };
  gradientClasses?: string;
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  description,
  tags,
  heroVideo,
  gradientClasses = "from-background to-muted/50"
}) => {
  return (
    <div className={`bg-gradient-to-br ${gradientClasses} py-20`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        {heroVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
              <video
                src={heroVideo.src}
                poster={heroVideo.poster}
                autoPlay={heroVideo.autoplay}
                loop={heroVideo.loop}
                muted={heroVideo.muted}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CaseStudyHero;
