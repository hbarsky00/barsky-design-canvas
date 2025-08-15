
export interface ImageSectionConfig {
  beforeHeader?: string;
  afterHeader?: string;
}

export interface ImageConfig {
  hero?: string;
  challenge?: ImageSectionConfig;
  process?: ImageSectionConfig;
  results?: ImageSectionConfig;
}

export interface ImageTextItem {
  text: string;
  image?: string;
  type?: 'text' | 'image';
  content?: string;
}

export interface ProjectDetails {
  challenge: string;
  challengeAdditionalText?: string;
  process: string;
  result: string;
  technologies?: string[];
  duration?: string;
  client?: string;
  role?: string;
  projectLink?: string;
  caseStudyLink?: string;
  useAiCaptions: boolean;
  imageCaptions: Record<string, string>;
  
  // Image properties
  challengeImage?: string;
  challengeBottomImage?: string;
  processImage?: string;
  processBottomImage?: string;
  resultImage?: string;
  
  // Gallery properties
  challengeGalleryImages?: string[];
  processGalleryImages?: string[];
  resultGalleryImages?: string[];
  galleryImages?: string[];
  extraImages?: string[];
  servicesGalleryImages?: string[];
  availableImages?: string[];
  
  // Enhanced content
  challengeGalleryContent?: ImageTextItem[];
  imageConfig?: ImageConfig;
}
