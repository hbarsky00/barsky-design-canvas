export interface ProjectVariable {
  projectTitle: string;
  projectSubtitle: string;
  timeline: string;
  role: string;
  industry: string;
  client: string;
  projectLink?: string;
  caseStudyLink?: string;
  
  challenge: {
    heading: string;
    description: string;
    painPoints: string[];
  };
  
  process: {
    heading: string;
    description: string;
    steps: string[];
    keyInnovations?: string[];
  };
  
  solution: {
    heading: string;
    description: string;
    features: string[];
  };
  
  results: {
    heading: string;
    description: string;
    metrics: string[];
    testimonials?: string[];
    longTermImpact?: string[];
  };
  
  techStack: string[];
  imageConfig?: {
    hero?: string;
    challenge?: string[];
    process?: string[];
    solution?: string[];
    results?: string[];
  };
  imageCaptions?: Record<string, string>;
}