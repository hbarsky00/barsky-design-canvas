

export interface ProjectDetails {
  challenge: string;
  process: string;
  result: string;
  technologies: string[];
  duration: string;
  client: string;
  role: string;
  imageConfig?: ImageConfig;
  availableImages?: string[];
  challengeGalleryImages?: string[];
  processGalleryImages?: string[];
  resultGalleryImages?: string[];
  servicesGalleryImages?: string[];
  galleryImages?: string[];
  processImage?: string;
  processBottomImage?: string;
  resultImage?: string;
  challengeImage?: string;
  challengeBottomImage?: string;
  extraImages?: string[];
  projectLink?: string;
  caseStudyLink?: string;
  useAiCaptions?: boolean; // New flag to enable AI caption generation
}

export interface ImageConfig {
  challenge?: ImageSectionConfig;
  process?: ImageSectionConfig;
  result?: ImageSectionConfig;
}

export interface ImageSectionConfig {
  beforeHeader?: string;
  afterHeader?: string;
}

// Export ProjectImageConfig as an alias for ImageConfig
export type ProjectImageConfig = ImageConfig;

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date?: string;
}
