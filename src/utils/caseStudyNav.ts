
export interface CaseStudyNavItem {
  id: string;
  title: string;
  image: string;
}

export const getCaseStudyNavItems = (): CaseStudyNavItem[] => {
  return [
    { 
      id: 'herbalink', 
      title: 'HerbaLink',
      image: 'https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png'
    },
    { 
      id: 'splittime', 
      title: 'SplitTime',
      image: 'https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png'
    },
    { 
      id: 'business-management', 
      title: 'Business Management',
      image: 'https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png'
    },
    { 
      id: 'investor-loan-app', 
      title: 'Investor Loan App',
      image: 'https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png'
    },
    { 
      id: 'wholesale-distribution', 
      title: 'Wholesale Distribution',
      image: 'https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png'
    },
  ];
};
