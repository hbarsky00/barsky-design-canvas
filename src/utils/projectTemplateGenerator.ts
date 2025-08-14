
import { ProjectDetails } from "@/data/types/project";

export const generateProjectTemplate = (projectId: string): ProjectDetails => {
  return {
    challenge: "Define the main challenge or problem this project aimed to solve.",
    process: "Describe the methodology and approach taken to address the challenge.",
    result: "Summarize the outcomes and impact of the project.",
    duration: "3 months",
    client: "Client Name",
    role: "Lead Product Designer",
    technologies: ["React", "TypeScript", "Figma"],
    projectLink: `https://example.com/${projectId}`,
    challengeAdditionalText: "Additional context about the challenge.",
    imageCaptions: {}
  };
};

export const generateProjectDetailsFromVariables = (variables: any): ProjectDetails => {
  return {
    challenge: variables.challenge || "Define the main challenge or problem this project aimed to solve.",
    process: variables.process || "Describe the methodology and approach taken to address the challenge.",
    result: variables.result || "Summarize the outcomes and impact of the project.",
    duration: variables.duration || "3 months",
    client: variables.client || "Client Name",
    role: variables.role || "Lead Product Designer",
    technologies: variables.technologies || ["React", "TypeScript", "Figma"],
    projectLink: variables.projectLink,
    challengeAdditionalText: variables.challengeAdditionalText,
    imageCaptions: variables.imageCaptions || {},
    challengeImage: variables.challengeImage,
    processImage: variables.processImage,
    resultImage: variables.resultImage,
    challengeGalleryImages: variables.challengeGalleryImages,
    processGalleryImages: variables.processGalleryImages,
    resultGalleryImages: variables.resultGalleryImages,
    galleryImages: variables.galleryImages,
    extraImages: variables.extraImages,
    servicesGalleryImages: variables.servicesGalleryImages,
    availableImages: variables.availableImages,
    challengeGalleryContent: variables.challengeGalleryContent,
    imageConfig: variables.imageConfig,
    useAiCaptions: variables.useAiCaptions,
    processBottomImage: variables.processBottomImage,
    challengeBottomImage: variables.challengeBottomImage,
    caseStudyLink: variables.caseStudyLink
  };
};
