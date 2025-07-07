
import { ProjectDetails } from "../types/project";
import { wholesaleDistributionDetails } from "./wholesaleDistribution";
import { projectVariables } from "../project-variables";
import { generateProjectDetailsFromVariables } from "../../utils/projectTemplateGenerator";

// Generate dynamic project details from variables (no hardcoded content)
const dynamicProjectDetails: Record<string, ProjectDetails> = {};

// Generate details for projects that have variables defined
Object.keys(projectVariables).forEach(projectId => {
  const variables = projectVariables[projectId];
  if (variables && projectId === "wholesale-distribution") {
    dynamicProjectDetails[projectId] = generateProjectDetailsFromVariables(variables);
  }
});

export const projectDetails: Record<string, ProjectDetails> = {
  // Only keep wholesale distribution project
  ...dynamicProjectDetails
};
