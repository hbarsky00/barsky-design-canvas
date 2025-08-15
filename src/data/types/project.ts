
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
  type: 'text' | 'image' | 'video';
  content: string;
  caption?: string; // For images and videos
  textKey?: string; // For text sections, used for saving
  text?: string; // Legacy support
  image?: string; // Legacy support
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
