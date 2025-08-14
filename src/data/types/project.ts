
export interface ProjectDetails {
  challenge: string;
  process: string;
  result: string;
  duration: string;
  client: string;
  role: string;
  technologies: string[];
  
  // Links
  projectLink?: string;
  caseStudyLink?: string;
  
  // Additional text content
  challengeAdditionalText?: string;
  
  // Individual images
  challengeImage?: string;
  processImage?: string;
  processBottomImage?: string;
  resultImage?: string;
  challengeBottomImage?: string;
  
  // Image galleries
  challengeGalleryImages?: string[];
  resultGalleryImages?: string[];
  galleryImages?: string[];
  extraImages?: string[];
  servicesGalleryImages?: string[];
  
  // Image configuration
  imageConfig?: {
    hero?: string;
    challenge?: string[];
    process?: {
      beforeHeader?: string;
      [key: string]: any;
    };
    solution?: string[];
    results?: string[];
  };
  
  // Image captions
  imageCaptions?: Record<string, string>;
}

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string; // Add missing link property
}
