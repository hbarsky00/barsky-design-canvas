
import { ProjectDetails } from "../types/project";

export const splittimeDetails: ProjectDetails = {
  client: "SplitTime Inc.",
  duration: "3 months",
  role: "Lead UX/UI Designer",
  projectLink: "https://figma.com/splittime-prototype",
  challenge: "Divorced and separated parents often struggle with coordination, leading to miscommunication, scheduling conflicts, and stress for both parents and children.",
  process: "I conducted interviews with 25 divorced parents, analyzed existing co-parenting apps, and designed a centralized platform that facilitates clear communication, shared calendars, expense tracking, and document sharing while maintaining healthy boundaries.",
  result: "The application achieved a 40% reduction in co-parenting conflicts, 85% user satisfaction rate, was featured in App Store family category, and gained 10,000+ active users within 6 months.",
  technologies: ["React Native", "Node.js", "PostgreSQL", "Firebase", "Stripe API"],
  imageConfig: {
    challenge: {
      beforeHeader: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    process: {
      beforeHeader: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    result: {
      beforeHeader: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    }
  }
};
