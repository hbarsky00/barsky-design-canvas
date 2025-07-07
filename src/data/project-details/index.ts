
import { ProjectDetails } from "../types/project";
import { investorLoanAppDetails } from "./investorLoanApp";
import { daeSearchDetails } from "./daeSearch";
import { splittimeDetails } from "./splittime";
import { herbalinkDetails } from "./herbalink";
import { gold2cryptoDetails } from "./gold2crypto";
import { barskyjointDetails } from "./barskyjoint";
import { spectrumDetails } from "./spectrum";
import { medicationAppDetails } from "./medicationApp";
import { wholesaleDistributionDetails } from "./wholesaleDistribution";
import { projectVariables } from "../project-variables";
import { generateProjectDetailsFromVariables } from "../../utils/projectTemplateGenerator";

// Generate dynamic project details from variables (no hardcoded content)
const dynamicProjectDetails: Record<string, ProjectDetails> = {};

// Generate details for projects that have variables defined
Object.keys(projectVariables).forEach(projectId => {
  const variables = projectVariables[projectId];
  if (variables) {
    dynamicProjectDetails[projectId] = generateProjectDetailsFromVariables(variables);
  }
});

export const projectDetails: Record<string, ProjectDetails> = {
  // Dynamic projects (generated from variables - no hardcoded content)
  ...dynamicProjectDetails,
  
  // Legacy projects (still using hardcoded content - to be migrated)
  "medication-app": medicationAppDetails,
  "dae-search": daeSearchDetails,
  "gold2crypto": gold2cryptoDetails,
  "barskyjoint": barskyjointDetails,
  "spectrum": spectrumDetails
};
