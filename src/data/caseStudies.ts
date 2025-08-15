
export interface CaseStudyData {
  title: string;
  video: string;
  videoThumbnail: string;
  tags: string[];
  projectLink?: string;
  description: string;
  stickyNav: Array<{ label: string; anchor: string }>;
  sections: {
    [key: string]: {
      text: string;
      image: {
        src: string;
        alt: string;
      };
    };
  };
}

export const caseStudiesData: Record<string, CaseStudyData> = {
  // Removed herbalink and splittime entries since they have custom components
  // Removed investment-app since it has a custom component
  
  "business-management": {
    title: "68% Fewer Errors: Streamlining Enterprise Operations",
    video: "https://share.shots.so/OgbJwJkcMtPo0GHV.mp4",
    videoThumbnail: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png",
    tags: ["Enterprise", "Analytics", "Dashboard"],
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    projectLink: "https://in-situ-quickbooks-flow.lovable.app/",
    stickyNav: [
      { label: "The Problem", anchor: "#the-problem" },
      { label: "Quantified Impact", anchor: "#quantified-impact" },
      { label: "What Didn't Work", anchor: "#what-didnt-work" },
      { label: "My Thought Process", anchor: "#my-thought-process" }
    ],
    sections: {
      "the-problem": {
        text: "Teams juggled 5+ disconnected tools for sales, inventory, and customer data causing confusion and double-entry errors. No single source of truth existed for operations.",
        image: {
          src: "images/bizmgmt-problem.png",
          alt: "Flowchart of disconnected tools used before platform"
        }
      },
      "quantified-impact": {
        text: "✅ 68% reduction in manual entry errors ✅ 43% decrease in software costs ✅ 89% improvement in report accuracy.",
        image: {
          src: "images/bizmgmt-impact.png",
          alt: "Analytics dashboard showing post-launch metrics"
        }
      },
      "what-didnt-work": {
        text: "Dashboard-first approach buried important workflows. Users needed task shortcuts, not data visualization. Moving workflows to the home screen solved adoption issues immediately.",
        image: {
          src: "images/bizmgmt-fail.png",
          alt: "Wireframe of overly complex original dashboard"
        }
      },
      "my-thought-process": {
        text: "I mapped real operator workflows through workshops before designing features. The tool had to match their actual workday, not idealized data structures.",
        image: {
          src: "images/bizmgmt-process.png",
          alt: "User journey map used to align with operator workflow"
        }
      }
    }
  }
};

export const homepageCaseStudyPreviews = [
  {
    title: "3x More Bookings: How I Connected Users to Certified Herbalists",
    description: "Connected users to certified herbalists across the country and increased booking rates by 3x.",
    tags: ["Health", "Marketplace", "Gen AI"],
    videoThumbnail: "images/herbalink-promo.png",
    video: "https://share.shots.so/W6ikOt0HenziCxLQ.mp4",
    url: "/project/herbalink"
  },
  {
    title: "40% Less Conflict: Designing Neutral Co-Parenting Tools",
    description: "Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools.",
    tags: ["Family Tech", "iOS→Android", "Legal UX"],
    videoThumbnail: "images/desktop-signup-1.png",
    video: "https://share.shots.so/GlnqjFOJW3Rhn4p2.mp4",
    url: "/project/splittime"
  },
  {
    title: "68% Fewer Errors: Streamlining Enterprise Operations",
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    tags: ["Enterprise", "Analytics", "Dashboard"],
    videoThumbnail: "",
    video: "https://share.shots.so/OgbJwJkcMtPo0GHV.mp4",
    url: "/project/business-management"
  },
  {
    title: "23% More Engagement: Making Investing Accessible to Beginners",
    description: "Helped users track, plan, and grow their investments, leading to 23% increase in portfolio engagement.",
    tags: ["Finance", "Analytics", "Tutorial"],
    videoThumbnail: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png",
    video: "https://share.shots.so/WIa01A8uV6pGHd9q.mp4",
    url: "/project/investment-app"
  }
];
