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
    videoThumbnail: "https://barskyux.com/wp-content/uploads/2025/08/herbalinkpromonew.png",
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
        text: "Users couldn't find trustworthy herbalists online due to fragmented directories and no verification system. I solved this by creating a national platform with certified practitioners and seamless booking.",
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
    videoThumbnail: "images/desktop-signup-1.png",
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
  "email-creation-ai": {
    title: "ManuscriptRx: Designing an AI-Assisted Email Creation Workflow for Pharma",
    video: "",
    videoThumbnail: "images/email-ai-promo.png",
    tags: ["Concept Project", "Enterprise", "Gen AI", "Pharma", "Workflow Design"],
    description:
      "A self-initiated concept — a 6-step AI-assisted workflow that replaces the broken handoffs in pharma HCP email production with one platform built around real roles and approval gates.",
    projectLink: "",
    stickyNav: [
      { label: "The Problem", anchor: "#the-problem" },
      { label: "Quantified Impact", anchor: "#quantified-impact" },
      { label: "What Didn't Work", anchor: "#what-didnt-work" },
      { label: "My Thought Process", anchor: "#my-thought-process" },
      { label: "How I Used AI", anchor: "#how-i-used-ai" }
    ],
    sections: {
      "the-problem": {
        text: "A global pharmaceutical company's HCP email production required 6+ disconnected tools, multiple manual handoffs between Medical Writers, Content Ops, and Brand teams, and a slow MLR review cycle that caused weeks of delays per campaign. There was no unified workflow — just fragmented steps, repeated rework, and no AI assistance to speed compliant content generation.",
        image: { src: "images/emailai-problem.png", alt: "Diagram showing disconnected tools and manual handoff delays across the email production process" }
      },
      "quantified-impact": {
        text: "✅ 40% reduction in email production time ✅ 100% compliant manuscript generation with ISI, safety links, and unsubscribe auto-appended ✅ Eliminated 3+ manual handoff steps through AI-assisted content assembly ✅ Real-time role-based review reduced revision cycles by an estimated 50%.",
        image: { src: "images/emailai-impact.png", alt: "Before and after comparison of email production timeline showing reduced steps" }
      },
      "what-didnt-work": {
        text: "Early designs let users write emails freeform inside the platform. Medical Writers ignored the AI suggestions entirely and defaulted to copy-pasting from Word documents. The breakthrough came from flipping the model — the AI generates a full compliant manuscript first from an approved brief, and the human refines from there. That shift made the AI feel like acceleration rather than an obstacle.",
        image: { src: "images/emailai-fail.png", alt: "Early wireframe showing abandoned freeform editor approach" }
      },
      "my-thought-process": {
        text: "I mapped every role in the process — Medical Writer, Content Ops, Brand, MLR Reviewer — and designed each step around their actual approval gates, not an idealized flow. Each screen surfaces only what that role needs to act on. The AI acts as an orchestration layer: it pulls from approved briefs, appends market-specific compliance content automatically, and flags issues before they reach human review. The goal was to make compliance invisible and speed feel natural.",
        image: { src: "images/emailai-process.png", alt: "Role-based workflow map showing each step owned by AI, Content Ops, Med Writer, and Brand" }
      },
      "how-i-used-ai": {
        text: "I used Claude throughout the design process — not just as a writing tool, but as a dev handoff partner. I created structured Markdown files that documented every screen's logic, component states, role permissions, and AI behavior. These MD files gave the development team a precise spec they could follow without needing constant back-and-forth. It replaced long Slack threads with a single source of truth the AI helped me write, structure, and maintain as the product evolved.",
        image: { src: "images/emailai-ai-method.png", alt: "Screenshot of Claude-generated MD spec file used for dev handoff" }
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
    title: "ManuscriptRx: Designing an AI-Assisted Email Creation Workflow for Pharma",
    description:
      "A self-initiated concept — a 6-step AI-assisted workflow that replaces broken handoffs in pharma HCP email production with one platform built around real roles and approval gates.",
    tags: ["Concept Project", "Enterprise", "Gen AI", "Pharma", "Workflow Design"],
    videoThumbnail: "images/email-ai-promo.png",
    video: "",
    url: "/project/email-creation-ai"
  }
];
