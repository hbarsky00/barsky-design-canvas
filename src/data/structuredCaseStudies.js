// JavaScript shim for structuredCaseStudies.ts
// This file provides the case study IDs for the prerender script

const CASE_STUDY_IDS = [
  "crypto",
  "herbalink", 
  "splittime",
  "investor-loan-app",
  "business-management"
];

export const getAllCaseStudyIds = () => {
  return CASE_STUDY_IDS;
};

export const getStructuredCaseStudy = (id) => {
  // Import and re-export from TypeScript for build compatibility
  try {
    const { structuredCaseStudies } = require("./structuredCaseStudies.ts");
    return structuredCaseStudies[id] || null;
  } catch (error) {
    // Fallback for build process
    return null;
  }
};