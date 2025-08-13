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
  "herbalink": {
    title: "3x More Bookings: How I Connected Users to Certified Herbalists",
    video: "https://share.shots.so/W6ikOt0HenziCxLQ.mp4",
    videoThumbnail: "images/herbalink-promo.png",
    tags: ["Health", "Marketplace", "Gen AI"],
    description: "Connected users to certified herbalists across the country and increased booking rates by 3x.",
    projectLink: "https://herbalink.live",
    stickyNav: [
      { label: "The Problem", anchor: "#the-problem" },
      { label: "Quantified Impact", anchor: "#quantified-impact" },
      { label: "What Didn't Work", anchor: "#what-didnt-work" },
      { label: "My Thought Process", anchor: "#my-thought-process" }
    ],
    sections: {
      "the-problem": {
        text: "Users couldn't find trustworthy herbalists online due to fragmented directories and no verification system. We solved this by creating a national platform with certified practitioners and seamless booking.",
        image: {
          src: "images/herbalink-problem.png",
          alt: "Screenshot showing confusing herbalist directory before redesign"
        }
      },
      "quantified-impact": {
        text: "✅ 3x increase in booking rates ✅ 80% user satisfaction with match quality ✅ 50% faster decision-making through filters and verified reviews.",
        image: {
          src: "images/herbalink-impact.png",
          alt: "Dashboard showing user growth and bookings after relaunch"
        }
      },
      "what-didnt-work": {
        text: "Map-first layout confused users and buried expert credentials. Switching to card-based directory with prominent certifications immediately built trust and improved conversions.",
        image: {
          src: "images/herbalink-fail.png",
          alt: "Old UI design mockup with confusing map-based layout"
        }
      },
      "my-thought-process": {
        text: "I asked: what would make ME trust a health platform? Trust signals, verified reviews, and clear credentials had to come before pricing to build confidence.",
        image: {
          src: "images/herbalink-process.png",
          alt: "Wireframes showing layout for trust elements"
        }
      }
    }
  },
  "splittime": {
    title: "40% Less Conflict: Designing Neutral Co-Parenting Tools",
    video: "",
    videoThumbnail: "splittime-thumb.jpg",
    tags: ["Family Tech", "iOS→Android", "Legal UX"],
    description: "Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools.",
    projectLink: "https://splittime.pro",
    stickyNav: [
      { label: "The Problem", anchor: "#the-problem" },
      { label: "Quantified Impact", anchor: "#quantified-impact" },
      { label: "What Didn't Work", anchor: "#what-didnt-work" },
      { label: "My Thought Process", anchor: "#my-thought-process" }
    ],
    sections: {
      "the-problem": {
        text: "Co-parents fought constantly over miscommunication around pickups, events, and appointments. Courts needed a neutral platform to reduce conflict and keep focus on child needs.",
        image: {
          src: "images/splittime-problem.png",
          alt: "Court paperwork and calendar chaos in co-parenting"
        }
      },
      "quantified-impact": {
        text: "✅ 62% reduction in message volume ✅ 300% increase in calendar usage ✅ 90% of parents avoided at least one argument per month.",
        image: {
          src: "images/splittime-impact.png",
          alt: "Graph showing decrease in communication conflict"
        }
      },
      "what-didnt-work": {
        text: "Chat features amplified conflict instead of reducing it. Too many features overwhelmed stressed parents. Simplifying to calendar + permissions was the breakthrough.",
        image: {
          src: "images/splittime-fail.png",
          alt: "Old UI showing chat-heavy design that was removed"
        }
      },
      "my-thought-process": {
        text: "This wasn't about UX delight—it was emotional safety. I interviewed family lawyers and judges to design for neutrality and equal control for both parents.",
        image: {
          src: "images/splittime-process.png",
          alt: "Sketches exploring user rights and visibility in the app"
        }
      }
    }
  },
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
  },
  "investment-app": {
    title: "23% More Engagement: Making Investing Accessible to Beginners",
    video: "investapp-demo.mp4",
    videoThumbnail: "investapp-thumb.jpg",
    tags: ["Finance", "Analytics", "Tutorial"],
    description: "Helped users track, plan, and grow their investments, leading to 23% increase in portfolio engagement.",
    stickyNav: [
      { label: "The Problem", anchor: "#the-problem" },
      { label: "Quantified Impact", anchor: "#quantified-impact" },
      { label: "What Didn't Work", anchor: "#what-didnt-work" },
      { label: "My Thought Process", anchor: "#my-thought-process" }
    ],
    sections: {
      "the-problem": {
        text: "Beginner investors felt overwhelmed by jargon and couldn't understand performance or next steps. They needed a coach, not another trading platform.",
        image: {
          src: "images/investapp-problem.png",
          alt: "User research quote about investing confusion"
        }
      },
      "quantified-impact": {
        text: "✅ 23% increase in portfolio engagement ✅ 17% more re-investment activity ✅ 12% decrease in post-onboarding drop-off.",
        image: {
          src: "images/investapp-impact.png",
          alt: "App analytics showing engagement lift"
        }
      },
      "what-didnt-work": {
        text: "Traditional line graphs overwhelmed users. Goal-based visuals with context performed better. Technical onboarding scared people away—questions worked better than feature tours.",
        image: {
          src: "images/investapp-fail.png",
          alt: "Overly technical onboarding screens"
        }
      },
      "my-thought-process": {
        text: "Instead of market data, I asked: 'What does this person need to feel confident right now?' Goal-based journeys beat dashboard-first design every time.",
        image: {
          src: "images/investapp-process.png",
          alt: "Persona-based flow diagram for investment goals"
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
    videoThumbnail: "splittime-thumb.jpg",
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
    url: "/project/investor-loan-app"
  }
];