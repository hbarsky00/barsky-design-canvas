
export interface ProjectDetails {
  challenge: string;
  process: string;
  result: string;
  technologies: string[];
  duration: string;
  client: string;
  role: string;
  projectLink?: string;
  useAiCaptions?: boolean;
  imageCaptions?: Record<string, string>; // Add this property
  
  imageConfig?: {
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
  };
  
  availableImages?: string[];
  challengeGalleryImages?: string[];
  processImage?: string;
  processBottomImage?: string;
  processGalleryImages?: string[];
  resultGalleryImages?: string[];
}
