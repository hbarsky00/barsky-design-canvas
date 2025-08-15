
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

export interface ProjectDetails {
  challenge: string;
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
  challengeImage?: string;
  challengeGalleryImages?: string[];
  processGalleryImages?: string[];
  resultGalleryImages?: string[];
}
