
import { ProjectDetails } from "../types/project";

export const splittimeDetails: ProjectDetails = {
  client: "SplitTime Inc.",
  duration: "3 months",
  role: "Lead UX/UI Designer",
  projectLink: "https://figma.com/splittime-prototype",
  overview: "SplitTime is a comprehensive co-parenting application designed to streamline communication, scheduling, and coordination between separated parents.",
  problem: "Divorced and separated parents often struggle with coordination, leading to miscommunication, scheduling conflicts, and stress for both parents and children.",
  solution: "A centralized platform that facilitates clear communication, shared calendars, expense tracking, and document sharing while maintaining healthy boundaries.",
  keyFeatures: [
    "Shared calendar with custody schedules",
    "Secure messaging system",
    "Expense tracking and splitting",
    "Document storage and sharing",
    "Child profile management",
    "Communication logs for legal purposes"
  ],
  technologies: ["React Native", "Node.js", "PostgreSQL", "Firebase", "Stripe API"],
  challenges: [
    "Designing for high-emotion situations",
    "Ensuring child privacy and safety",
    "Creating neutral, non-confrontational UI",
    "Balancing feature complexity with usability"
  ],
  outcomes: [
    "40% reduction in co-parenting conflicts",
    "85% user satisfaction rate",
    "Featured in App Store family category",
    "10,000+ active users within 6 months"
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      caption: "Mobile app interface showing the main dashboard with calendar integration and upcoming events for co-parenting coordination"
    },
    {
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      caption: "User research session analyzing co-parenting communication patterns and pain points through data visualization charts"
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      caption: "Design system components and UI elements for the SplitTime co-parenting app showing consistent branding and accessibility features"
    }
  ],
  designProcess: {
    research: "Conducted interviews with 25 divorced parents, analyzed existing co-parenting apps, and studied family law requirements.",
    wireframes: "Created low-fidelity wireframes focusing on essential features like calendar management, messaging, and expense tracking.",
    prototyping: "Developed interactive prototypes for user testing, emphasizing emotional neutrality and ease of use.",
    testing: "Ran usability tests with divorced parents and family counselors to validate design decisions."
  },
  userPersonas: [
    {
      name: "Sarah Mitchell",
      age: 34,
      role: "Working Mother",
      goals: ["Keep organized schedules", "Maintain clear communication", "Reduce conflict"],
      frustrations: ["Miscommunication", "Forgotten events", "Financial disputes"]
    },
    {
      name: "Mike Johnson", 
      age: 38,
      role: "Father & Business Professional",
      goals: ["Stay involved in children's lives", "Track shared expenses", "Document communications"],
      frustrations: ["Scheduling conflicts", "Unclear expectations", "Legal documentation needs"]
    }
  ]
};
