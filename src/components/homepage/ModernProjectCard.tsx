import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Hash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ModernProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  videoThumbnail: string;
  video?: string;
  url: string;
  className?: string;
}

const ModernProjectCard: React.FC<ModernProjectCardProps> = ({
  title,
  description,
  tags,
  videoThumbnail,
  video,
  url,
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden bg-surface/80 backdrop-blur-sm border-outline/20 hover:shadow-xl transition-all duration-300 group">
        {/* Video/Thumbnail Section */}
        <div className="relative aspect-video bg-surface-variant overflow-hidden">
          {!isPlaying ? (
            <>
              <img
                src={videoThumbnail}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Play Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.8 }}
                className="absolute inset-0 bg-scrim/30 flex items-center justify-center"
              >
                <Button
                  variant="filled"
                  size="lg"
                  className="bg-surface/90 text-on-surface hover:bg-surface shadow-xl"
                  onClick={() => video && setIsPlaying(true)}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Preview
                </Button>
              </motion.div>
            </>
          ) : (
            <div className="w-full h-full bg-surface-variant flex items-center justify-center">
              {/* Placeholder for actual video player */}
              <div className="text-center space-y-4">
                <div className="text-on-surface-variant">
                  <Play className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-body-large">Video would play here</p>
                  <p className="text-body-small opacity-70">Source: {video}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsPlaying(false)}
                >
                  Back to Thumbnail
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-body-small gap-1">
                <Hash className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-title-large font-bold text-on-surface leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-body-medium text-on-surface-variant leading-relaxed">
            {description}
          </p>

          {/* CTA */}
          <div className="pt-2">
            <Link to={url}>
              <Button variant="text" className="gap-2 text-primary hover:bg-primary-container/50">
                View Case Study
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ModernProjectCard;