import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Hash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


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
  const [isHovered, setIsHovered] = useState(false);
  const [videoSrcLoaded, setVideoSrcLoaded] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDirectVideo = Boolean(video && /(\.(mp4|webm|ogg)(\?.*)?$)/i.test(video as string));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
      onHoverStart={() => {
        setIsHovered(true);
        if (isDirectVideo) {
          if (!videoSrcLoaded) setVideoSrcLoaded(video as string);
          setTimeout(() => {
            try { videoRef.current?.play(); } catch {}
          }, 0);
        }
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <Link
        to={url}
        aria-label={`${title} case study`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
      >
        <Card className="overflow-hidden bg-surface/80 backdrop-blur-sm border-outline/20 hover:shadow-xl transition-all duration-300 group cursor-pointer">
          {/* Video/Thumbnail Section */}
          <div className="relative aspect-video bg-surface-variant overflow-hidden">
            <img
              src={videoThumbnail}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {isDirectVideo && (
              <video
                ref={videoRef}
                src={videoSrcLoaded ?? undefined}
                poster={videoThumbnail}
                muted
                playsInline
                loop
                preload="none"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${isHovered && videoSrcLoaded ? 'opacity-100' : 'opacity-0'}`}
                onCanPlay={() => {
                  if (isHovered) {
                    try { videoRef.current?.play(); } catch {}
                  }
                }}
              />
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

            {/* CTA visual (entire card is clickable) */}
            <div className="pt-2 text-primary flex items-center gap-2">
              <span className="font-medium">View Case Study</span>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ModernProjectCard;