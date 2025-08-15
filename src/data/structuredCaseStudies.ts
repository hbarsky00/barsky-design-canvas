
export interface StructuredCaseStudySection {
  id: string;
  title: string;
  content: string;
  images?: string[];
  metrics?: string[];
  quote?: {
    text: string;
    author: string;
  };
  icon?: string;
  variant?: 'default' | 'highlighted';
}

export interface StructuredCaseStudy {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  heroVideo?: {
    src: string;
    poster: string;
    alt: string;
  };
  tags: string[];
  projectLink?: string;
  gradientClasses?: string;
  sections: StructuredCaseStudySection[];
}

/**
 * Standardized case study data - all projects follow HerbaLink structure
 * Template sections: Problem → Process Flow → Key Features → Results → Challenges → Next Steps
 */
export const structuredCaseStudies: Record<string, StructuredCaseStudy> = {
  'herbalink': {
    id: 'herbalink',
    title: '3x More Bookings: How I Connected Users to Certified Herbalists',
    description: 'Connected users to certified herbalists across the country and increased booking rates by 3x.',
    heroImage: 'https://barskydesign.pro/images/herbalink-promo.png',
    tags: ['Health', 'Marketplace', 'Gen AI'],
    projectLink: 'https://herbalink.live',
    gradientClasses: 'from-green-50 via-emerald-50 to-teal-50',
    sections: [
      {
        id: 'problem',
        title: 'The Problem',
        content: 'Users couldn\'t find trustworthy herbalists online due to fragmented directories and no verification system. Existing platforms lacked credibility markers and made it difficult to book appointments with qualified practitioners.',
        images: ['https://barskydesign.pro/images/herbalink-problem.png']
      },
      {
        id: 'process-flow',
        title: 'Process Flow',
        content: 'I designed a streamlined user journey from search to booking, prioritizing trust signals and practitioner credentials throughout the experience.',
        images: ['https://barskydesign.pro/images/herbalink-process.png']
      },
      {
        id: 'key-features',
        title: 'Solution / Key Features',
        content: 'Created a national platform with verified herbalist profiles, integrated booking system, and trust-building elements like certifications and client reviews.',
        images: ['https://barskydesign.pro/images/herbalink-features.png']
      },
      {
        id: 'results-impact',
        title: 'Results',
        content: 'The redesigned platform delivered measurable improvements in user engagement and business outcomes.',
        metrics: [
          '3x increase in booking rates',
          '80% user satisfaction with match quality',
          '50% faster decision-making through filters'
        ],
        quote: {
          text: 'The new platform made it so easy to find and book with qualified herbalists. I felt confident in my choice.',
          author: 'Sarah M., Platform User'
        }
      },
      {
        id: 'challenges',
        title: 'Challenges & Fixes',
        content: 'Map-first layout confused users and buried expert credentials. Switching to card-based directory with prominent certifications immediately built trust and improved conversions.',
        images: ['https://barskydesign.pro/images/herbalink-fail.png']
      },
      {
        id: 'next-steps',
        title: 'Next Steps',
        content: 'Continue expanding the practitioner network and enhance the matching algorithm based on user preferences and health goals.',
        images: ['https://barskydesign.pro/images/herbalink-next.png']
      }
    ]
  },
  'investment-app': {
    id: 'investment-app',
    title: '23% More Engagement: Making Investing Accessible to Beginners',
    description: 'Helped users track, plan, and grow their investments, leading to 23% increase in portfolio engagement.',
    heroImage: 'https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png',
    tags: ['Finance', 'Analytics', 'Tutorial'],
    gradientClasses: 'from-blue-50 via-slate-50 to-indigo-50',
    sections: [
      {
        id: 'problem',
        title: 'The Problem',
        content: 'Beginner investors felt overwhelmed by jargon and couldn\'t understand performance or next steps. They needed guidance, not another complex trading platform.',
        images: ['https://barskydesign.pro/images/investapp-problem.png']
      },
      {
        id: 'process-flow',
        title: 'Process Flow',
        content: 'Designed goal-based investment journeys that guide users from learning to action, with contextual help at every step.',
        images: ['https://barskydesign.pro/images/investapp-process.png']
      },
      {
        id: 'key-features',
        title: 'Solution / Key Features',
        content: 'Created educational onboarding, goal-based portfolio tracking, and simplified performance visualization that beginners could understand.',
        images: ['https://barskydesign.pro/images/investapp-features.png']
      },
      {
        id: 'results-impact',
        title: 'Results',
        content: 'The redesigned app significantly improved user engagement and investment behavior.',
        metrics: [
          '23% increase in portfolio engagement',
          '17% more re-investment activity',
          '12% decrease in post-onboarding drop-off'
        ],
        quote: {
          text: 'Finally, an investment app that doesn\'t make me feel stupid. I understand my portfolio now.',
          author: 'Mike T., New Investor'
        }
      },
      {
        id: 'challenges',
        title: 'Challenges & Fixes',
        content: 'Traditional line graphs overwhelmed users. Goal-based visuals with context performed better. Technical onboarding scared people away—questions worked better than feature tours.',
        images: ['https://barskydesign.pro/images/investapp-fail.png']
      },
      {
        id: 'next-steps',
        title: 'Next Steps',
        content: 'Expand educational content library and develop AI-powered investment coaching features.',
        images: ['https://barskydesign.pro/images/investapp-next.png']
      }
    ]
  },
  'splittime': {
    id: 'splittime',
    title: '40% Less Conflict: Designing Neutral Co-Parenting Tools',
    description: 'Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools.',
    heroImage: 'https://barskydesign.pro/images/desktop-signup-1.png',
    tags: ['Family Tech', 'iOS→Android', 'Legal UX'],
    projectLink: 'https://splittime.pro',
    gradientClasses: 'from-purple-50 via-pink-50 to-rose-50',
    sections: [
      {
        id: 'problem',
        title: 'The Problem',
        content: 'Co-parents fought constantly over miscommunication around pickups, events, and appointments. Courts needed a neutral platform to reduce conflict and keep focus on child needs.',
        images: ['https://barskydesign.pro/images/splittime-problem.png']
      },
      {
        id: 'process-flow',
        title: 'Process Flow',
        content: 'Designed neutral communication flows that prioritize child schedules over parent preferences, reducing emotional triggers.',
        images: ['https://barskydesign.pro/images/splittime-process.png']
      },
      {
        id: 'key-features',
        title: 'Solution / Key Features',
        content: 'Built shared calendar system, neutral messaging framework, and equal visibility for both parents to maintain fairness.',
        images: ['https://barskydesign.pro/images/splittime-features.png']
      },
      {
        id: 'results-impact',
        title: 'Results',
        content: 'The platform successfully reduced conflict and improved co-parenting communication.',
        metrics: [
          '62% reduction in message volume',
          '300% increase in calendar usage',
          '90% of parents avoided at least one argument per month'
        ],
        quote: {
          text: 'This app saved our co-parenting relationship. No more fighting over simple schedule changes.',
          author: 'Jennifer L., Co-Parent'
        }
      },
      {
        id: 'challenges',
        title: 'Challenges & Fixes',
        content: 'Chat features amplified conflict instead of reducing it. Too many features overwhelmed stressed parents. Simplifying to calendar + permissions was the breakthrough.',
        images: ['https://barskydesign.pro/images/splittime-fail.png']
      },
      {
        id: 'next-steps',
        title: 'Next Steps',
        content: 'Add court integration features and expand to support extended family coordination.',
        images: ['https://barskydesign.pro/images/splittime-next.png']
      }
    ]
  },
  'business-management': {
    id: 'business-management',
    title: '68% Fewer Errors: Streamlining Enterprise Operations',
    description: 'Improved internal operations and reduced manual entry errors by 68% with one central tool.',
    heroImage: 'https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png',
    tags: ['Enterprise', 'Analytics', 'Dashboard'],
    projectLink: 'https://in-situ-quickbooks-flow.lovable.app/',
    gradientClasses: 'from-orange-50 via-amber-50 to-yellow-50',
    sections: [
      {
        id: 'problem',
        title: 'The Problem',
        content: 'Teams juggled 5+ disconnected tools for sales, inventory, and customer data causing confusion and double-entry errors. No single source of truth existed for operations.',
        images: ['https://barskydesign.pro/images/bizmgmt-problem.png']
      },
      {
        id: 'process-flow',
        title: 'Process Flow',
        content: 'Mapped real operator workflows through workshops to design unified data flows that match actual workday patterns.',
        images: ['https://barskydesign.pro/images/bizmgmt-process.png']
      },
      {
        id: 'key-features',
        title: 'Solution / Key Features',
        content: 'Created unified dashboard with workflow shortcuts, automated data sync, and role-based access to eliminate tool switching.',
        images: ['https://barskydesign.pro/images/bizmgmt-features.png']
      },
      {
        id: 'results-impact',
        title: 'Results',
        content: 'The unified platform dramatically improved operational efficiency and accuracy.',
        metrics: [
          '68% reduction in manual entry errors',
          '43% decrease in software costs',
          '89% improvement in report accuracy'
        ],
        quote: {
          text: 'We went from 6 different tools to 1. Our team is so much more efficient now.',
          author: 'David R., Operations Manager'
        }
      },
      {
        id: 'challenges',
        title: 'Challenges & Fixes',
        content: 'Dashboard-first approach buried important workflows. Users needed task shortcuts, not data visualization. Moving workflows to the home screen solved adoption issues immediately.',
        images: ['https://barskydesign.pro/images/bizmgmt-fail.png']
      },
      {
        id: 'next-steps',
        title: 'Next Steps',
        content: 'Add predictive analytics and AI-powered workflow optimization based on usage patterns.',
        images: ['https://barskydesign.pro/images/bizmgmt-next.png']
      }
    ]
  },
  'investor-loan-app': {
    id: 'investor-loan-app',
    title: 'Streamlined Real Estate Investment Loans',
    description: 'Simplified the complex loan application process for real estate investors.',
    heroImage: 'https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png',
    tags: ['Finance', 'Real Estate', 'Workflow'],
    gradientClasses: 'from-cyan-50 via-blue-50 to-indigo-50',
    sections: [
      {
        id: 'problem',
        title: 'The Problem',
        content: 'Real estate investors struggled with complex loan applications that required extensive documentation and had unclear approval processes.',
        images: ['https://barskydesign.pro/images/loan-problem.png']
      },
      {
        id: 'process-flow',
        title: 'Process Flow',
        content: 'Designed a step-by-step process that breaks down complex applications into manageable chunks with clear progress indicators.',
        images: ['https://barskydesign.pro/images/loan-process.png']
      },
      {
        id: 'key-features',
        title: 'Solution / Key Features',
        content: 'Created automated document collection, real-time application tracking, and instant pre-qualification tools.',
        images: ['https://barskydesign.pro/images/loan-features.png']
      },
      {
        id: 'results-impact',
        title: 'Results',
        content: 'The streamlined process significantly improved application completion rates and user satisfaction.',
        metrics: [
          '45% faster application completion',
          '30% increase in approval rates',
          '85% user satisfaction score'
        ],
        quote: {
          text: 'This platform made getting investment loans so much easier. Clear process, no surprises.',
          author: 'Robert K., Real Estate Investor'
        }
      },
      {
        id: 'challenges',
        title: 'Challenges & Fixes',
        content: 'Initial design was too complex with too many fields on each page. Breaking it into smaller steps with smart defaults improved completion rates.',
        images: ['https://barskydesign.pro/images/loan-fail.png']
      },
      {
        id: 'next-steps',
        title: 'Next Steps',
        content: 'Add AI-powered document analysis and predictive approval scoring to further streamline the process.',
        images: ['https://barskydesign.pro/images/loan-next.png']
      }
    ]
  },
  'wholesale-distribution': {
    id: 'wholesale-distribution',
    title: 'Optimized B2B Distribution Platform',
    description: 'Streamlined wholesale operations and improved order management efficiency.',
    heroImage: 'https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png',
    tags: ['B2B', 'Distribution', 'Logistics'],
    gradientClasses: 'from-gray-50 via-slate-50 to-zinc-50',
    sections: [
      {
        id: 'problem',
        title: 'The Problem',
        content: 'Wholesale distributors faced inefficient order processing, poor inventory visibility, and communication gaps between suppliers and retailers.',
        images: ['https://barskydesign.pro/images/wholesale-problem.png']
      },
      {
        id: 'process-flow',
        title: 'Process Flow',
        content: 'Designed an integrated workflow that connects suppliers, distributors, and retailers in a seamless order management system.',
        images: ['https://barskydesign.pro/images/wholesale-process.png']
      },
      {
        id: 'key-features',
        title: 'Solution / Key Features',
        content: 'Built real-time inventory tracking, automated reordering, and integrated communication tools for all stakeholders.',
        images: ['https://barskydesign.pro/images/wholesale-features.png']
      },
      {
        id: 'results-impact',
        title: 'Results',
        content: 'The platform significantly improved operational efficiency and reduced costs across the distribution chain.',
        metrics: [
          '35% reduction in processing time',
          '50% fewer stockouts',
          '25% decrease in operational costs'
        ],
        quote: {
          text: 'Our distribution operations are now completely streamlined. We can handle twice the volume with the same team.',
          author: 'Maria S., Operations Director'
        }
      },
      {
        id: 'challenges',
        title: 'Challenges & Fixes',
        content: 'Legacy system integrations were complex. Building API adapters and gradual migration plans solved compatibility issues without disrupting operations.',
        images: ['https://barskydesign.pro/images/wholesale-fail.png']
      },
      {
        id: 'next-steps',
        title: 'Next Steps',
        content: 'Implement machine learning for demand forecasting and expand international shipping capabilities.',
        images: ['https://barskydesign.pro/images/wholesale-next.png']
      }
    ]
  }
};

// Add a small helper to retrieve a case study by id (used by pages)
export const getStructuredCaseStudy = (id: string): StructuredCaseStudy | undefined => {
  return structuredCaseStudies[id];
};
