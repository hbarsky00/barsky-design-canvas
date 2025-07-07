import { ProjectVariable } from "./types";
import { herbalinkVariables } from "./herbalink";
import { splittimeVariables } from "./splittime";
import { investorLoanAppVariables } from "./investorLoanApp";
import { wholesaleDistributionVariables } from "./wholesaleDistribution";

export const projectVariables: Record<string, ProjectVariable> = {
  "herbalink": herbalinkVariables,
  "splittime": splittimeVariables,
  "investor-loan-app": investorLoanAppVariables,
  "wholesale-distribution": wholesaleDistributionVariables
};

export * from "./types";