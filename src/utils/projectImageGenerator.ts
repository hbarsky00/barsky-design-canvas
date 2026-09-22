
interface ProjectImageContext {
  challengeImage: string;
  solutionImage: string;
}

export const generateProjectImages = (projectId: string): ProjectImageContext => {
  // Return empty strings for all projects to remove AI images
  return {
    challengeImage: "",
    solutionImage: ""
  };
};
