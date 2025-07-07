import { ProjectVariable } from "./types";
import { wholesaleDistributionVariables } from "./wholesaleDistribution";

export const projectVariables: Record<string, ProjectVariable> = {
  "wholesale-distribution": wholesaleDistributionVariables
};

export * from "./types";