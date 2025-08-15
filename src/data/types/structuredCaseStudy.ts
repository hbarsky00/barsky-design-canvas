
import { LucideIcon } from "lucide-react";

export interface CaseStudySection {
  id: string;
  title: string;
  type: "hero" | "problem" | "solution" | "impact" | "failed";
  icon?: LucideIcon;
  content: {
    text?: string;
    image?: string;
    video?: string;
    caption?: string;
  };
  metrics?: Array<{
    value: string;
    label: string;
    trend: "up" | "down" | "neutral";
  }>;
  tags?: string[];
}

export interface StructuredCaseStudy {
  id: string;
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
  sections: CaseStudySection[];
  projectLink?: string;
  gradientClasses?: string;
  seoData?: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}
