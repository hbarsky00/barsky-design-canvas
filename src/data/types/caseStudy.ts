
export interface StructuredCaseStudySectionProps {
  id: string;
  type: 'hero' | 'content' | 'gallery' | 'video' | 'metrics';
  title?: string;
  content?: string;
  images?: string[];
  videoSrc?: string;
  videoPoster?: string;
  metrics?: Array<{
    value: string;
    label: string;
  }>;
}

export interface SEOData {
  description?: string;
  image?: string;
  keywords?: string[];
}

export interface VideoConfig {
  src: string;
  poster: string;
  alt: string;
}

export interface StructuredCaseStudy {
  id: string;
  title: string;
  description: string;
  tags: string[];
  heroVideo?: VideoConfig;
  sections: StructuredCaseStudySectionProps[];
  projectLink?: string;
  gradientClasses?: string;
  seoData?: SEOData;
}
