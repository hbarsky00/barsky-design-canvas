
import { ImageConfig } from "@/data/types/project";

export interface ImageAssignment {
  section: string;
  position: string;
  imagePath: string;
  description?: string;
}

/**
 * Get all image assignments from a project's image configuration
 */
export const getImageAssignments = (imageConfig?: ImageConfig): ImageAssignment[] => {
  if (!imageConfig) return [];

  const assignments: ImageAssignment[] = [];

  Object.entries(imageConfig).forEach(([section, sectionConfig]) => {
    if (sectionConfig?.beforeHeader) {
      assignments.push({
        section,
        position: 'beforeHeader',
        imagePath: sectionConfig.beforeHeader
      });
    }
    if (sectionConfig?.afterHeader) {
      assignments.push({
        section,
        position: 'afterHeader', 
        imagePath: sectionConfig.afterHeader
      });
    }
  });

  return assignments;
};

/**
 * Validate that all images in the configuration exist in the available images array
 */
export const validateImageConfig = (
  imageConfig?: ImageConfig,
  availableImages?: string[]
): { isValid: boolean; missingImages: string[] } => {
  if (!imageConfig || !availableImages) {
    return { isValid: true, missingImages: [] };
  }

  const assignments = getImageAssignments(imageConfig);
  const usedImages = assignments.map(a => a.imagePath);
  const missingImages = usedImages.filter(img => !availableImages.includes(img));

  return {
    isValid: missingImages.length === 0,
    missingImages
  };
};

/**
 * Get unused images from the available images pool
 */
export const getUnusedImages = (
  imageConfig?: ImageConfig,
  availableImages?: string[]
): string[] => {
  if (!imageConfig || !availableImages) return availableImages || [];

  const assignments = getImageAssignments(imageConfig);
  const usedImages = assignments.map(a => a.imagePath);
  
  return availableImages.filter(img => !usedImages.includes(img));
};

/**
 * Check for duplicate image assignments
 */
export const findDuplicateImages = (imageConfig?: ImageConfig): string[] => {
  if (!imageConfig) return [];

  const assignments = getImageAssignments(imageConfig);
  const imageCounts = assignments.reduce((acc, assignment) => {
    acc[assignment.imagePath] = (acc[assignment.imagePath] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(imageCounts)
    .filter(([_, count]) => count > 1)
    .map(([imagePath]) => imagePath);
};
