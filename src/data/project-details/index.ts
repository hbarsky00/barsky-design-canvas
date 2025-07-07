
import { ProjectDetails } from "../types/project";
import { projectVariables } from "../project-variables";
import { generateProjectDetailsFromVariables } from "../../utils/projectTemplateGenerator";

// Generate dynamic project details from variables (no hardcoded content)
const dynamicProjectDetails: Record<string, ProjectDetails> = {};

// Generate details for projects that have variables defined
Object.keys(projectVariables).forEach(projectId => {
  const variables = projectVariables[projectId];
  if (variables) {
    console.log(`🔧 Generating dynamic project details for: ${projectId}`);
    dynamicProjectDetails[projectId] = generateProjectDetailsFromVariables(variables);
  }
});

console.log('📋 Dynamic project details generated:', Object.keys(dynamicProjectDetails));

export const projectDetails: Record<string, ProjectDetails> = {
  // ONLY dynamic projects generated from variables - NO hardcoded content
  ...dynamicProjectDetails
};
