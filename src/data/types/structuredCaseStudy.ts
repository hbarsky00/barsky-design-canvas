
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
