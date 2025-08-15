
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface CaseStudyHeroProps {
  title: string;
  description: string;
  tags: string[];
  heroVideo: {
    src: string;
    poster?: string;
  };
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  description,
  tags,
  heroVideo
}) => {
  return (
    <section className="relative py-20 px-4">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-2xl">
            <video
              src={heroVideo.src}
              poster={heroVideo.poster}
              className="w-full h-full object-cover"
              controls
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
