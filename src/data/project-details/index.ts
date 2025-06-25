
import { ProjectDetails } from "../types/project";
import { investorLoanAppDetails } from "./investorLoanApp";
import { daeSearchDetails } from "./daeSearch";
import { splittimeDetails } from "./splittime";
import { herbalinkDetails } from "./herbalink";
import { gold2cryptoDetails } from "./gold2crypto";
import { barskyjointDetails } from "./barskyjoint";
import { spectrumDetails } from "./spectrum";
import { medicationAppDetails } from "./medicationApp";

export const projectDetails: Record<string, ProjectDetails> = {
  "medication-app": medicationAppDetails,
  "investor-loan-app": investorLoanAppDetails,
  "dae-search": daeSearchDetails,
  "splittime": splittimeDetails,
  "herbalink": herbalinkDetails,
  "gold2crypto": gold2cryptoDetails,
  "barskyjoint": barskyjointDetails,
  "spectrum": spectrumDetails
};

// Enhanced logging for debugging
console.log('📚 Project details loaded successfully:', {
  totalProjects: Object.keys(projectDetails).length,
  projectIds: Object.keys(projectDetails),
  medicationAppLoaded: !!projectDetails["medication-app"],
  medicationAppDetails: projectDetails["medication-app"] ? {
    hasChallenge: !!projectDetails["medication-app"].challenge,
    hasProcess: !!projectDetails["medication-app"].process,
    hasResult: !!projectDetails["medication-app"].result,
    imageCount: projectDetails["medication-app"].availableImages?.length || 0
  } : null
});
