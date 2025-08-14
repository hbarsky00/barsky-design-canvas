
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditableImage } from "./EditableImage";
import { EditableVideo } from "./EditableVideo";
import { useScroll3DTilt } from "@/hooks/useScroll3DTilt";

export interface StructuredCaseStudySectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  media?: {
    type: 'image' | 'video' | 'comparison';
    src: string;
    alt: string;
    caption?: string;
    beforeSrc?: string; // For comparison type
    videoOptions?: {
      autoplay?: boolean;
      loop?: boolean;
      muted?: boolean;
      controls?: boolean;
      playsInline?: boolean;
    };
  };
  metrics?: Array<{
    value: string;
    label: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
  tags?: string[];
  variant?: 'problem' | 'impact' | 'failed' | 'solution';
  className?: string;
}

const StructuredCaseStudySection: React.FC<StructuredCaseStudySectionProps> = ({
  id,
  title,
  icon,
  content,
  media,
  metrics,
  tags,
  variant = 'problem',
  className = ""
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { containerStyle, childStyle } = useScroll3DTilt(containerRef, { maxTilt: 3, yDistance: 12, childParallax: 8 });

  return (
    <motion.section 
      id={id} 
      initial={{
        opacity: 0,
        y: 30
      }} 
      whileInView={{
        opacity: 1,
        y: 0
      }} 
      viewport={{
        once: true
      }} 
      transition={{
        duration: 0.6
      }} 
      className={`mb-16 scroll-mt-4 md:[scroll-margin-top:calc(var(--header-height,64px)+16px)] ${className}`}
    >
      <motion.div ref={containerRef} style={{ ...containerStyle, transformStyle: "preserve-3d", willChange: "transform" }}>
        <Card className="relative overflow-hidden p-8 lg:p-12 bg-card border border-border shadow-elevated transition-all duration-300 hover:shadow-md">
          {/* Section Header */}
          <div className="flex items-center justify-start lg:justify-center gap-4 mb-8 text-left lg:text-center">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 text-primary">
                {icon}
              </div>
              <h2 className="text-display-small font-bold text-foreground text-left lg:text-center">
                {title}
              </h2>
            </div>
          </div>

          <div className="space-y-8">
            {/* Media first - full width */}
            {media && (
              <div className="space-y-4">
                {media.type === 'video' ? (
                  <motion.div style={childStyle}>
                    <EditableVideo 
                      src={media.src} 
                      alt={media.alt} 
                      caption={media.caption} 
                      className="w-full rounded-xl overflow-hidden shadow-elevated" 
                      videoOptions={media.videoOptions}
                    />
                  </motion.div>
                ) : media.type === 'comparison' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <motion.div style={childStyle}>
                        <EditableImage 
                          src={media.beforeSrc || ''} 
                          alt={`Before: ${media.alt}`} 
                          caption="Before" 
                          className="w-full rounded-lg overflow-hidden shadow-elevated" 
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <motion.div style={childStyle}>
                        <EditableImage 
                          src={media.src} 
                          alt={`After: ${media.alt}`} 
                          caption="After" 
                          className="w-full rounded-lg overflow-hidden shadow-elevated" 
                        />
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <motion.div style={childStyle}>
                    <EditableImage 
                      src={media.src} 
                      alt={media.alt} 
                      caption={media.caption} 
                      className="w-full rounded-xl overflow-hidden shadow-elevated" 
                    />
                  </motion.div>
                )}
              </div>
            )}

            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-body-large text-muted-foreground leading-relaxed whitespace-pre-line">
                {content}
              </p>

              {/* Metrics Display */}
              {metrics && metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-surface-container rounded-xl p-4 text-center"
                    >
                      <div className="text-title-large font-bold text-primary mb-1">
                        {metric.value}
                      </div>
                      <div className="text-body-small text-on-surface-variant">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-body-small">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.section>
  );
};

export default StructuredCaseStudySection;
