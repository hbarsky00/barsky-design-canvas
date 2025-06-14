export interface ProjectImageConfig {
  challenge?: {
    beforeHeader?: string;
    afterHeader?: string;
  };
  process?: {
    beforeHeader?: string;
    afterHeader?: string;
  };
  result?: {
    beforeHeader?: string;
    afterHeader?: string;
  };
}

export interface ProjectDetails {
  challenge: string;
  process: string;
  result: string;
  technologies: string[];
  duration: string;
  client: string;
  role: string;
  projectLink?: string;
  caseStudyLink?: string;
  
  // New simplified image configuration
  imageConfig?: ProjectImageConfig;
  
  // Pool of available images for easy reference
  availableImages?: string[];
  
  // Keep legacy properties for backward compatibility (will be deprecated)
  challengeImage?: string;
  processImage?: string;
  processBottomImage?: string;
  resultImage?: string;
  resultGalleryImages?: string[];
  galleryImages?: string[];
  extraImages?: string[];
  videoUrl?: string;
  challengeBottomImage?: string;
  challengeGalleryImages?: string[];
  servicesGalleryImages?: string[];
}
