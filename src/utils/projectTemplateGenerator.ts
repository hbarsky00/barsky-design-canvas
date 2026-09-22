import { ProjectDetails } from "@/data/types/project";
import { ProjectVariable } from "@/data/project-variables/types";

/**
 * Converts ProjectVariable data to ProjectDetails format
 * This eliminates hardcoded content by generating it from variables
 */
export const generateProjectDetailsFromVariables = (variables: ProjectVariable): ProjectDetails => {
  const challenge = `${variables.challenge.description}\n\nKey Problems:\n${variables.challenge.painPoints.map(point => `• ${point}`).join('\n')}`;
  
  const process = `${variables.process.description}\n\n${variables.process.keyInnovations ? 
    `Key Innovations:\n${variables.process.keyInnovations.map(innovation => `• ${innovation}`).join('\n')}\n\n` : ''
  }Process Steps:\n${variables.process.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}`;
  
  const result = `${variables.results.description}\n\nKey Metrics:\n${variables.results.metrics.map(metric => `• ${metric}`).join('\n')}${
    variables.results.testimonials ? 
    `\n\nUser Testimonials:\n${variables.results.testimonials.map(testimonial => `• "${testimonial}"`).join('\n')}` : ''
  }${
    variables.results.longTermImpact ? 
    `\n\nLong-term Impact:\n${variables.results.longTermImpact.map(impact => `• ${impact}`).join('\n')}` : ''
  }`;

  return {
    challenge,
    process,
    result,
    technologies: variables.techStack,
    duration: variables.timeline,
    client: variables.client,
    role: variables.role,
    projectLink: variables.projectLink,
    caseStudyLink: variables.caseStudyLink,
    useAiCaptions: false,
    imageCaptions: variables.imageCaptions || {},
    
    // Generate image configurations from variables
    challengeGalleryImages: variables.imageConfig?.challenge || [],
    processGalleryImages: variables.imageConfig?.process || [],
    resultGalleryImages: variables.imageConfig?.results || [],
    
    // Set hero image
    ...(variables.imageConfig?.hero && { 
      challengeImage: variables.imageConfig.hero 
    })
  };
};

/**
 * Get project variables by ID with fallback
 */
export const getProjectVariables = (projectId: string, projectVariables: Record<string, ProjectVariable>): ProjectVariable | null => {
  return projectVariables[projectId] || null;
};