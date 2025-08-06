export interface CaseStudyData {
  title: string;
  video: string;
  videoThumbnail: string;
  tags: string[];
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
    title: "HerbaLink",
    video: "herbalink-demo.mp4",
    videoThumbnail: "herbalink-thumb.jpg",
    tags: ["Health", "Marketplace", "Gen AI"],
    description: "Connected users to certified herbalists across the country and increased booking rates by 3x.",
    stickyNav: [
      { label: "The Problem", anchor: "#the-problem" },
      { label: "Quantified Impact", anchor: "#quantified-impact" },
      { label: "What Didn't Work", anchor: "#what-didnt-work" },
      { label: "My Thought Process", anchor: "#my-thought-process" }
    ],
    sections: {
      "the-problem": {
        text: "People struggle to find trustworthy herbal practitioners online. The market was fragmented, and users didn't know who to trust or how to book. We needed to create a national, verified directory with seamless scheduling.",
        image: {
          src: "images/herbalink-problem.png",
          alt: "Screenshot showing confusing herbalist directory before redesign"
        }
      },
      "quantified-impact": {
        text: "✅ 3x increase in booking rates. ✅ Users reported 80% satisfaction with match quality. ✅ 50% faster decision-making thanks to filters and verified reviews.",
        image: {
          src: "images/herbalink-impact.png",
          alt: "Dashboard showing user growth and bookings after relaunch"
        }
      },
      "what-didnt-work": {
        text: "We initially used a map-first layout that confused users. The expert profile info was buried, and users didn't trust the platform. Switching to a card-based directory and highlighting certifications changed everything.",
        image: {
          src: "images/herbalink-fail.png",
          alt: "Old UI design mockup with confusing map-based layout"
        }
      },
      "my-thought-process": {
        text: "I focused on trust and clarity. What would *I* need to feel safe booking a health consult online? I designed trust signals, reviews, and proof of practice into the flow before even showing pricing.",
        image: {
          src: "images/herbalink-process.png",
          alt: "Wireframes showing layout for trust elements"
        }
      }
    }
  },
  "splittime": {
    title: "SplitTime",
    video: "splittime-demo.mp4",
    videoThumbnail: "splittime-thumb.jpg",
    tags: ["Family Tech", "iOS to Android", "Legal UX"],
    description: "Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools.",
    stickyNav: [
      { label: "The Problem", anchor: "#the-problem" },
      { label: "Quantified Impact", anchor: "#quantified-impact" },
      { label: "What Didn't Work", anchor: "#what-didnt-work" },
      { label: "My Thought Process", anchor: "#my-thought-process" }
    ],
    sections: {
      "the-problem": {
        text: "Co-parents often fight over miscommunication — pickups, school events, doctor visits. Courts needed a neutral platform to reduce conflict and align on child needs.",
        image: {
          src: "images/splittime-problem.png",
          alt: "Court paperwork and calendar chaos in co-parenting"
        }
      },
      "quantified-impact": {
        text: "✅ Reduced message volume by 62%. ✅ 300% increase in calendar usage. ✅ 90% of surveyed parents said it helped avoid at least one argument.",
        image: {
          src: "images/splittime-impact.png",
          alt: "Graph showing decrease in communication conflict"
        }
      },
      "what-didnt-work": {
        text: "We originally added chat first, but it amplified conflict. Also, too many features upfront overwhelmed users. Simplifying to calendar + permissions helped.",
        image: {
          src: "images/splittime-fail.png",
          alt: "Old UI showing chat-heavy design that was removed"
        }
      },
      "my-thought-process": {
        text: "This wasn't about UX delight — it was about emotional safety. I talked to family lawyers and judges to understand what both parents needed. I leaned into neutrality and control for each parent.",
        image: {
          src: "images/splittime-process.png",
          alt: "Sketches exploring user rights and visibility in the app"
        }
      }
    }
  },
  "business-management": {
    title: "Business Management App",
    video: "bizmgmt-demo.mp4",
    videoThumbnail: "bizmgmt-thumb.jpg",
    tags: ["Enterprise", "CRM", "Dashboard"],
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    stickyNav: [
      { label: "The Problem", anchor: "#the-problem" },
      { label: "Quantified Impact", anchor: "#quantified-impact" },
      { label: "What Didn't Work", anchor: "#what-didnt-work" },
      { label: "My Thought Process", anchor: "#my-thought-process" }
    ],
    sections: {
      "the-problem": {
        text: "Teams were using 5+ tools to manage sales, inventory, and customer data — none of them integrated. It caused confusion, double entry, and poor reporting.",
        image: {
          src: "images/bizmgmt-problem.png",
          alt: "Flowchart of disconnected tools used before platform"
        }
      },
      "quantified-impact": {
        text: "✅ Cut manual entry by 68%. ✅ Reduced software costs by 43%. ✅ Increased report accuracy by 89%.",
        image: {
          src: "images/bizmgmt-impact.png",
          alt: "Analytics dashboard showing post-launch metrics"
        }
      },
      "what-didnt-work": {
        text: "I initially focused on dashboards, but users needed workflows. Data was buried too deep. Adding task-based shortcuts on the home screen fixed this.",
        image: {
          src: "images/bizmgmt-fail.png",
          alt: "Wireframe of overly complex original dashboard"
        }
      },
      "my-thought-process": {
        text: "I ran workshops with ops managers, built a process map, then prototyped how *their day* should look. Then I designed the tool around that reality, not just data structure.",
        image: {
          src: "images/bizmgmt-process.png",
          alt: "User journey map used to align with operator workflow"
        }
      }
    }
  },
  "investment-app": {
    title: "Investment App",
    video: "investapp-demo.mp4",
    videoThumbnail: "investapp-thumb.jpg",
    tags: ["Finance", "Data Viz", "Mobile"],
    description: "Helped users track, plan, and grow their investments, leading to 23% increase in portfolio engagement.",
    stickyNav: [
      { label: "The Problem", anchor: "#the-problem" },
      { label: "Quantified Impact", anchor: "#quantified-impact" },
      { label: "What Didn't Work", anchor: "#what-didnt-work" },
      { label: "My Thought Process", anchor: "#my-thought-process" }
    ],
    sections: {
      "the-problem": {
        text: "Beginner investors didn't understand their performance or next steps. They wanted clarity without jargon — a coach, not a trading desk.",
        image: {
          src: "images/investapp-problem.png",
          alt: "User research quote about investing confusion"
        }
      },
      "quantified-impact": {
        text: "✅ 23% increase in engagement. ✅ 17% more re-investment activity. ✅ 12% decrease in drop-off after onboarding.",
        image: {
          src: "images/investapp-impact.png",
          alt: "App analytics showing engagement lift"
        }
      },
      "what-didnt-work": {
        text: "We used traditional line graphs — too much. Swapped in goal-based visuals with context. Also, our onboarding was too technical — reworked to ask questions, not show features.",
        image: {
          src: "images/investapp-fail.png",
          alt: "Overly technical onboarding screens"
        }
      },
      "my-thought-process": {
        text: "Instead of showing market data, I asked: 'What does *this person* need to feel confident right now?' I designed journeys based on goals, not dashboards.",
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
    title: "HerbaLink",
    description: "Connected users to certified herbalists across the country and increased booking rates by 3x.",
    tags: ["Health", "Marketplace", "Gen AI"],
    videoThumbnail: "herbalink-thumb.jpg",
    video: "herbalink-demo.mp4",
    url: "/case-studies/herbalink-mobile-herbalist-ux-design"
  },
  {
    title: "SplitTime",
    description: "Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools.",
    tags: ["Family Tech", "iOS to Android", "Legal UX"],
    videoThumbnail: "splittime-thumb.jpg",
    video: "splittime-demo.mp4",
    url: "/case-studies/splittime-coparenting-app-design"
  },
  {
    title: "Business Management App",
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    tags: ["Enterprise", "CRM", "Dashboard"],
    videoThumbnail: "bizmgmt-thumb.jpg",
    video: "bizmgmt-demo.mp4",
    url: "/case-studies/wholesale-distribution-ai-solution"
  },
  {
    title: "Investment App",
    description: "Helped users track, plan, and grow their investments, leading to 23% increase in portfolio engagement.",
    tags: ["Finance", "Data Viz", "Mobile"],
    videoThumbnail: "investapp-thumb.jpg",
    video: "investapp-demo.mp4",
    url: "/case-studies/investor-loan-portfolio-management"
  }
];