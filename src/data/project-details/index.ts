
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

export const projectDetails: Record<string, ProjectDetails> = {
  "medication-app": medicationAppDetails,
  "investor-loan-app": investorLoanAppDetails,
  "dae-search": daeSearchDetails,
  "splittime": splittimeDetails,
  "wholesale-distribution": wholesaleDistributionDetails,
  "herbalink": herbalinkDetails,
  "gold2crypto": gold2cryptoDetails,
  "barskyjoint": barskyjointDetails,
  "spectrum": spectrumDetails
};
