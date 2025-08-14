export interface ImageTextItem {
  text: string;
  image?: string;
  type?: 'text' | 'image';
  content?: {
    text?: string;
    image?: {
      src: string;
      alt: string;
    };
  };
}

export interface ImageSectionConfig {
  beforeHeader?: string;
  afterHeader?: string;
  [key: string]: any;
}

export interface ImageConfig {
  hero?: string;
  challenge?: string[];
  process?: ImageSectionConfig;
  solution?: string[];
  results?: string[];
  [key: string]: any;
}

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
  processGalleryImages?: string[];
  resultGalleryImages?: string[];
  galleryImages?: string[];
  extraImages?: string[];
  servicesGalleryImages?: string[];
  availableImages?: string[];
  
  // Enhanced gallery content
  challengeGalleryContent?: ImageTextItem[];
  
  // Image configuration
  imageConfig?: ImageConfig;
  
  // Image captions
  imageCaptions?: Record<string, string>;
  
  // AI features
  useAiCaptions?: boolean;
}

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}
