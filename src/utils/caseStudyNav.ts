
interface NavigationItem {
  label: string;
  anchor: string;
}

interface CaseStudyData {
  title?: string;
  description?: string;
  image?: string;
}

export const generateCaseStudyNavigation = (caseStudy: CaseStudyData): NavigationItem[] => {
  return [
    { label: "Overview", anchor: "#overview" },
    { label: "Challenge", anchor: "#challenge" },
    { label: "Process", anchor: "#process" },
    { label: "Solution", anchor: "#solution" },
    { label: "Results", anchor: "#results" }
  ];
};

export const getCaseStudyImage = (caseStudy: CaseStudyData): string => {
  return caseStudy.image || "/api/placeholder/800/600";
};
