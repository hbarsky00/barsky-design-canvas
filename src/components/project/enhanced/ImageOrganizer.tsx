
interface ImageOrganizerProps {
  project: {
    image: string;
  };
  details: {
    challengeGalleryImages?: string[];
    resultGalleryImages?: string[];
    galleryImages?: string[];
    extraImages?: string[];
    processImage?: string;
    processBottomImage?: string;
    challengeImage?: string;
    challengeBottomImage?: string;
    resultImage?: string;
    servicesGalleryImages?: string[];
  };
}

export const organizeProjectImages = ({ project, details }: ImageOrganizerProps) => {
  return {
    hero: project.image,
    gallery: [
      ...(details.challengeGalleryImages || []),
      ...(details.resultGalleryImages || []),
      ...(details.galleryImages || []),
      ...(details.extraImages || [])
    ].filter(Boolean),
    process: [
      ...(details.processImage ? [details.processImage] : []),
      ...(details.processBottomImage ? [details.processBottomImage] : []),
      ...(details.challengeImage ? [details.challengeImage] : []),
      ...(details.challengeBottomImage ? [details.challengeBottomImage] : [])
    ].filter(Boolean),
    technical: [
      ...(details.servicesGalleryImages || [])
    ].filter(Boolean),
    result: [
      ...(details.resultImage ? [details.resultImage] : [])
    ].filter(Boolean)
  };
};
