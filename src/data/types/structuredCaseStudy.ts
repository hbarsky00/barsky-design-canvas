
export interface StructuredCaseStudy {
  id: string;
  title: string;
  description: string;
  tags: string[];
  heroVideo?: {
    src: string;
    poster?: string;
  };
  sections: CaseStudySection[];
  projectLink?: string;
  gradientClasses?: string;
  seoData?: {
    title?: string;
    description?: string;
  };
}

export interface CaseStudySection {
  type: 'hero' | 'content' | 'gallery' | 'text' | 'image';
  title?: string;
  content: {
    text?: string;
    image?: string;
    images?: string[];
  };
}

// Additional interface for structured case study sections with more detailed props
export interface StructuredCaseStudySectionProps {
  id: string;
  title: string;
  icon: any; // LucideIcon type
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
