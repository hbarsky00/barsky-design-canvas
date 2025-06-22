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
  resultImage?: string;
  projectLink?: string;
  useAiCaptions?: boolean; // New flag to enable AI caption generation
}

interface ImageConfig {
  challenge?: ImageSectionConfig;
  process?: ImageSectionConfig;
  result?: ImageSectionConfig;
}

interface ImageSectionConfig {
  beforeHeader?: string;
  afterHeader?: string;
}

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date?: string;
}
