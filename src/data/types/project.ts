export interface ProjectDetails {
  challenge: string;
  challengeAdditionalText?: string; // Text that appears between challenge images
  process: string;
  result: string;
  technologies: string[];
  duration: string;
  client: string;
  role: string;
  projectLink?: string;
  caseStudyLink?: string;
  useAiCaptions?: boolean;
  imageCaptions?: Record<string, string>; // Manual image captions
  
  imageConfig?: ImageConfig;
  
  // Enhanced gallery support with text sections
  challengeGalleryContent?: ImageTextItem[];
  processGalleryContent?: ImageTextItem[];
  resultGalleryContent?: ImageTextItem[];
  
  availableImages?: string[];
  challengeGalleryImages?: string[];
  processImage?: string;
  processBottomImage?: string;
  processGalleryImages?: string[];
  resultGalleryImages?: string[];
  servicesGalleryImages?: string[];
  galleryImages?: string[];
  extraImages?: string[];
  challengeImage?: string;
  challengeBottomImage?: string;
  resultImage?: string;
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

export interface ImageTextItem {
  type: 'image' | 'text';
  content: string; // For images: image path, for text: text content
  caption?: string; // Only for images
  textKey?: string; // Only for text sections, used for saving
}
