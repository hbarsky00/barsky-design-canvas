export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ProjectDetails {
  challenge?: string;
  process?: string;
  result?: string;
  technologies?: string[];
  projectLink?: string;
  caseStudyLink?: string;
  challengeImage?: string;
  processImage?: string;
  processBottomImage?: string;
  resultImage?: string;
  resultGalleryImages?: string[];
  galleryImages?: string[];
  showTechnologies?: boolean;
  videoUrl?: string;
  challengeBottomImage?: string;
  challengeGalleryImages?: string[];
  content?: Array<{
    type: string;
    content: string;
    src?: string;
    alt?: string;
    images?: string[];
  }>;
}

export interface ProjectsData {
  id: string;
  title: string;
  image: string;
}
