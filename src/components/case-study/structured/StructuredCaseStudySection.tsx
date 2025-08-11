import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditableImage } from "./EditableImage";
import { EditableVideo } from "./EditableVideo";
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
  const getVariantStyles = () => {
    switch (variant) {
      case 'problem':
        return {
          container: "border-error/20 bg-error-container/5",
          header: "text-error",
          accent: "bg-error/10"
        };
      case 'impact':
        return {
          container: "border-tertiary/20 bg-tertiary-container/5",
          header: "text-tertiary",
          accent: "bg-tertiary/10"
        };
      case 'failed':
        return {
          container: "border-outline/20 bg-surface-variant/5",
          header: "text-on-surface-variant",
          accent: "bg-outline/10"
        };
      case 'solution':
        return {
          container: "border-primary/20 bg-primary-container/5",
          header: "text-primary",
          accent: "bg-primary/10"
        };
      default:
        return {
          container: "border-outline/20 bg-surface",
          header: "text-on-surface",
          accent: "bg-surface-variant"
        };
    }
  };
  const styles = getVariantStyles();
  return <motion.section id={id} initial={{
    opacity: 0,
    y: 30
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.6
  }} className={`mb-16 scroll-mt-4 md:[scroll-margin-top:calc(var(--header-height,64px)+16px)] ${className}`}>
      <Card className={`relative overflow-hidden p-8 lg:p-12 ${styles.container} transition-all duration-300 hover:shadow-md`}>
        {/* Sweep overlay for slick transition */}
        <motion.div
          aria-hidden
          initial={{ x: "-100%", opacity: 0.22 }}
          whileInView={{ x: "100%", opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10"
        />
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-8 text-center">
          
          <h2 className="text-display-small font-bold text-on-surface text-center">
            {title}
          </h2>
        </div>

        {/* Content Layout */}
        <div className={`grid gap-8 ${media ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} items-start`}>
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-body-large text-on-surface-variant leading-relaxed">
              {content}
            </p>

            {/* Metrics Display */}
            {metrics && metrics.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.map((metric, index) => <motion.div key={index} initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: index * 0.1
            }} className="bg-surface-container rounded-xl p-4 text-center">
                    <div className="text-title-large font-bold text-primary mb-1">
                      {metric.value}
                    </div>
                    <div className="text-body-small text-on-surface-variant">
                      {metric.label}
                    </div>
                  </motion.div>)}
              </div>}

            {/* Tags */}
            {tags && tags.length > 0 && <div className="flex flex-wrap gap-2">
                {tags.map(tag => <Badge key={tag} variant="secondary" className="text-body-small">
                    {tag}
                  </Badge>)}
              </div>}
          </div>

          {/* Media Content */}
          {media && <div className="space-y-4">
              {media.type === 'video' ? <EditableVideo src={media.src} alt={media.alt} caption={media.caption} className="w-full rounded-xl overflow-hidden shadow-lg" /> : media.type === 'comparison' ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <EditableImage src={media.beforeSrc || ''} alt={`Before: ${media.alt}`} caption="Before" className="w-full rounded-lg overflow-hidden shadow-md" />
                  </div>
                  <div className="space-y-2">
                    <EditableImage src={media.src} alt={`After: ${media.alt}`} caption="After" className="w-full rounded-lg overflow-hidden shadow-md" />
                  </div>
                </div> : <EditableImage src={media.src} alt={media.alt} caption={media.caption} className="w-full rounded-xl overflow-hidden shadow-lg" />}
            </div>}
        </div>
      </Card>
    </motion.section>;
};
export default StructuredCaseStudySection;