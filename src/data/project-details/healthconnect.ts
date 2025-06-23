
import { ProjectDetails } from "../types/project";

export const healthconnectDetails: ProjectDetails = {
  client: "HealthConnect Medical Group",
  duration: "4 months", 
  role: "Senior UX/UI Designer",
  projectLink: "https://figma.com/healthconnect-design",
  challenge: "The existing patient portal had poor usability, leading to low adoption rates and increased administrative burden on healthcare staff.",
  process: "I conducted user interviews with patients aged 25-75, analyzed existing portal usage data, and designed a modern, accessible interface that simplifies appointment scheduling, medical record access, and communication with healthcare providers.",
  result: "The redesigned portal achieved a 65% increase in usage, 90% user satisfaction score, 50% reduction in phone calls to office, and WCAG 2.1 AA accessibility compliance.",
  technologies: ["React", "TypeScript", "FHIR API", "Node.js", "PostgreSQL"],
  imageConfig: {
    challenge: {
      beforeHeader: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    process: {
      beforeHeader: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    result: {
      beforeHeader: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    }
  }
};
