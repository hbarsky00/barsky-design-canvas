
export interface CaseStudyNavItem {
  id: string;
  title: string;
}

export const getCaseStudyNavItems = (): CaseStudyNavItem[] => {
  return [
    { id: 'herbalink', title: 'HerbaLink' },
    { id: 'splittime', title: 'SplitTime' },
    { id: 'business-management', title: 'Business Management' },
    { id: 'investor-loan-app', title: 'Investor Loan App' },
    { id: 'wholesale-distribution', title: 'Wholesale Distribution' },
  ];
};
