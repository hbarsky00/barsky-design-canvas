
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
