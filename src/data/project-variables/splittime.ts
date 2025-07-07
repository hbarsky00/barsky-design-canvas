import { ProjectVariable } from "./types";

export const splittimeVariables: ProjectVariable = {
  projectTitle: "Splittime",
  projectSubtitle: "AI-Enhanced Co-Parenting Coordination Platform",
  timeline: "1 year to present",
  role: "Lead Product Designer & UX Researcher",
  industry: "Family Services/Legal Tech",
  client: "Family Technology Startup",
  projectLink: "http://splittime.pro",

  challenge: {
    heading: "The Challenge",
    description: "Co-parenting apps often fail because they're built like business tools, not emotional support systems. 73% of app abandonment happened during high-stress communication moments.",
    painPoints: [
      "Traditional communication methods (text, email) escalated conflicts instead of resolving them",
      "73% of users abandoned existing co-parenting apps during emotional moments",
      "Children were being caught in the middle of parental disputes",
      "Lack of neutral communication tools increased legal expenses",
      "Scheduling chaos created additional stress for already overwhelmed families",
      "Financial disagreements over child expenses caused ongoing tension"
    ]
  },

  process: {
    heading: "From Conflict to Collaboration",
    description: "Research and Discovery: I conducted extensive field research including 12 divorced parent interviews and 8 family counselor sessions, performed behavioral analysis of 150+ parents using existing tools, created emotional journey mapping to identify stress triggers, and integrated AI for conflict pattern recognition.",
    steps: [
      "Discovery: Conducted interviews with divorced/separated parents and family counselors",
      "Analysis: Mapped emotional stress points and conflict triggers in co-parenting",
      "Innovation: Developed AI-powered conflict prevention and neutral communication tools",
      "Testing: Validated with real co-parenting families through iterative design cycles"
    ],
    keyInnovations: [
      "Neutral communication system that removes emotional triggers from messaging",
      "AI-powered language suggestions during high-stress interactions",
      "Child-focused dashboard that prioritizes wellbeing over parental conflicts",
      "Intelligent scheduling that prevents common coordination mistakes",
      "Secure document sharing with automatic legal compliance"
    ]
  },

  solution: {
    heading: "The AI-Enhanced Solution",
    description: "I designed an intuitive co-parenting platform with AI-powered conflict detection and smart scheduling features that automatically reduce friction points between parents.",
    features: [
      "Emotionally intelligent design with conflict-reduction focus",
      "AI-powered communication tone analysis and neutral language suggestions",
      "Streamlined scheduling with drag-and-drop conflict detection",
      "Child-centered design that prioritizes wellbeing metrics",
      "Smart notifications that reduce overwhelm while maintaining transparency"
    ]
  },

  results: {
    heading: "Measurable Family Impact",
    description: "52% reduction in conflict reported by families within 8 weeks. This wasn't just a design improvement—it was a family relationship multiplier.",
    metrics: [
      "52% reduction in conflict reported by families within 8 weeks",
      "User engagement increased by 52% with significantly less stress reported",
      "App abandonment during emotional moments dropped by 73%",
      "Legal consultation needs reduced by 67% among active users",
      "Average family savings: $3,200 annually in legal fees",
      "Over 10,000 families now use the platform successfully",
      "89% reduction in heated communication threads",
      "96% of users report reduced stress levels after 3 months"
    ],
    testimonials: [
      "For the first time in two years, we're communicating about our kids without fighting",
      "The neutral language suggestions saved us from so many unnecessary arguments",
      "My daughter noticed we're less stressed during pickup and drop-off times"
    ]
  },

  techStack: [
    "React Native", "Node.js", "MongoDB", "Socket.io", "Push Notifications", 
    "Calendar APIs", "Secure Messaging", "Payment Integration", "Family Safety Features"
  ],

  imageConfig: {
    hero: "/lovable-uploads/028009a0-8ed7-4cf1-9155-1269a756bcb1.png",
    challenge: [
      "/lovable-uploads/3be08617-e041-4762-95ee-d64e40bfa9bd.png",
      "/lovable-uploads/54b8d8d3-83c7-4d48-b647-d7ae18dd9685.png"
    ],
    process: ["/lovable-uploads/ae5ccd96-fa33-40a2-a780-81e82a3beb93.png"],
    solution: [
      "/lovable-uploads/6e70d067-2ac3-4ead-a811-8dca98a26393.png",
      "/lovable-uploads/053bd992-cc02-4938-9f9f-a693e33d3f56.png"
    ],
    results: ["/lovable-uploads/010681bc-91bc-4f74-9ad9-33cba67f1289.png"]
  },

  imageCaptions: {
    "/lovable-uploads/028009a0-8ed7-4cf1-9155-1269a756bcb1.png": "Splittime app user flow diagram showing navigation paths for different user types",
    "/lovable-uploads/3be08617-e041-4762-95ee-d64e40bfa9bd.png": "Co-parenting dashboard showing family coordination features",
    "/lovable-uploads/54b8d8d3-83c7-4d48-b647-d7ae18dd9685.png": "Child wellbeing tracking interface with activity updates",
    "/lovable-uploads/ae5ccd96-fa33-40a2-a780-81e82a3beb93.png": "Family calendar displaying custody schedule and events",
    "/lovable-uploads/6e70d067-2ac3-4ead-a811-8dca98a26393.png": "Parent communication screen for coordinating child activities",
    "/lovable-uploads/053bd992-cc02-4938-9f9f-a693e33d3f56.png": "Child profile management with health and activity information",
    "/lovable-uploads/010681bc-91bc-4f74-9ad9-33cba67f1289.png": "Results and impact metrics showing 60% reduction in court visits, $25K annual savings, and 85% satisfaction rate"
  }
};