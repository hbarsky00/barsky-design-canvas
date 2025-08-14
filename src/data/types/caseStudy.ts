
export interface CaseStudySection {
  id: string;
  title: string;
  type: 'text' | 'image' | 'gallery' | 'video';
  content: {
    text?: string;
    image?: {
      src: string;
      alt: string;
    };
    gallery?: {
      src: string;
      alt: string;
    }[];
    video?: {
      src: string;
      poster?: string;
    };
  };
}

export interface StructuredCaseStudySectionProps {
  id: string;
  title: string;
  type: 'text' | 'image' | 'gallery' | 'video';
  content: {
    text?: string;
    image?: {
      src: string;
      alt: string;
    };
    gallery?: {
      src: string;
      alt: string;
    }[];
    video?: {
      src: string;
      poster?: string;
    };
  };
}

export interface CaseStudyNavItem {
  image: string;
  projectName: string;
  results: string[];
  technologies: string[];
  path: string;
  title?: string;
  description?: string;
}

export interface StructuredCaseStudyLayoutProps {
  caseStudyData: {
    title: string;
    description: string;
    tags: string[];
    heroVideo: {
      src: string;
      poster?: string;
    };
    sections: CaseStudySection[];
    projectLink: string;
    gradientClasses: string;
    seoData: {
      title: string;
      description: string;
      keywords: string[];
      ogImage?: string;
    };
  };
  nextProject?: CaseStudyNavItem;
}
