
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MaximizableImage from "@/components/project/MaximizableImage";
import { EditableVideo } from "./EditableVideo";
import PlaceholderImage from "./PlaceholderImage";

export interface StructuredCaseStudySectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  variant: "problem" | "solution" | "impact" | "failed";
  content: string;
  media?: {
    type: "image" | "video";
    src: string;
    alt: string;
    caption?: string;
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
    trend: "up" | "down" | "neutral";
  }>;
  tags?: string[];
}

const StructuredCaseStudySection: React.FC<StructuredCaseStudySectionProps> = ({
  id,
  title,
  icon: Icon,
  variant,
  content,
  media,
  metrics,
  tags,
}) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "problem":
        return {
          cardClass: "border-red-200 bg-red-50/50",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          titleColor: "text-red-900"
        };
      case "solution":
        return {
          cardClass: "border-blue-200 bg-blue-50/50",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          titleColor: "text-blue-900"
        };
      case "impact":
        return {
          cardClass: "border-green-200 bg-green-50/50",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          titleColor: "text-green-900"
        };
      case "failed":
        return {
          cardClass: "border-amber-200 bg-amber-50/50",
          iconBg: "bg-amber-100",
          iconColor: "text-amber-600",
          titleColor: "text-amber-900"
        };
      default:
        return {
          cardClass: "border-border bg-card",
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          titleColor: "text-foreground"
        };
    }
  };

  const styles = getVariantStyles(variant);

  return (
    <section id={id} className="scroll-mt-[calc(var(--header-height,64px)+1rem)]">
      <Card className={`p-8 lg:p-12 shadow-elevated ${styles.cardClass}`}>
        {/* Header - Fixed alignment to center */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`flex-shrink-0 p-3 rounded-lg ${styles.iconBg} flex items-center justify-center`}>
            <Icon className={`h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 ${styles.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold leading-tight ${styles.titleColor}`}>
              {title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Media or Placeholder - with proper containment */}
          {media ? (
            <div className="w-full max-w-full overflow-hidden">
              {media.type === "image" ? (
                <div className="w-full max-w-full">
                  <MaximizableImage
                    src={media.src}
                    alt={media.alt}
                    caption={media.caption}
                    className="w-full max-w-full rounded-lg shadow-lg"
                    projectId="case-study"
                    fit="contain"
                  />
                </div>
              ) : (
                <EditableVideo
                  src={media.src}
                  alt={media.alt}
                  caption={media.caption}
                  className="w-full max-w-full rounded-lg shadow-lg"
                  videoOptions={media.videoOptions}
                />
              )}
            </div>
          ) : (
            <div className="w-full max-w-full">
              <PlaceholderImage title={title} />
            </div>
          )}

          {/* Main content - moved after media */}
          <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph.split('\n').map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {line.includes('**') ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                        }}
                      />
                    ) : (
                      line
                    )}
                    {lineIndex < paragraph.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>

          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-bold text-foreground mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </section>
  );
};

export default StructuredCaseStudySection;
