
export interface CaseStudySection {
  type: string;
  title?: string;
  content: any;
}

export interface StructuredCaseStudy {
  id: string;
  title: string;
  description: string;
  tags: string[];
  heroVideo?: {
    src: string;
    poster: string;
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
