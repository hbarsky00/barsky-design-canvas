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
  // This is a stub for build compatibility
  // The actual data is used in TypeScript components
  return null;
};