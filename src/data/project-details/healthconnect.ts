
import { ProjectDetails } from "../types/project";

export const healthconnectDetails: ProjectDetails = {
  client: "HealthConnect Medical Group",
  duration: "4 months", 
  role: "Senior UX/UI Designer",
  projectLink: "https://figma.com/healthconnect-design",
  problem: "The existing patient portal had poor usability, leading to low adoption rates and increased administrative burden on healthcare staff.",
  solution: "A modern, accessible interface that simplifies appointment scheduling, medical record access, and communication with healthcare providers.",
  keyFeatures: [
    "Intuitive appointment scheduling",
    "Secure messaging with providers", 
    "Medical record access and download",
    "Prescription management",
    "Test results viewing",
    "Insurance and billing information"
  ],
  technologies: ["React", "TypeScript", "FHIR API", "Node.js", "PostgreSQL"],
  challenges: [
    "HIPAA compliance requirements",
    "Accessibility for elderly users",
    "Complex medical data presentation",
    "Multi-device responsive design"
  ],
  outcomes: [
    "65% increase in portal usage",
    "90% user satisfaction score",
    "50% reduction in phone calls to office",
    "WCAG 2.1 AA accessibility compliance"
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      caption: "Clean and accessible patient portal dashboard showing appointment scheduling, medical records, and health summary information"
    },
    {
      src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      caption: "Healthcare data visualization showing patient health metrics, test results, and medical history in an easy-to-understand format"
    },
    {
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      caption: "Responsive design mockups demonstrating the patient portal's accessibility features and mobile-friendly interface across devices"
    }
  ],
  designProcess: {
    research: "Conducted user interviews with patients aged 25-75, analyzed existing portal usage data, and reviewed healthcare accessibility guidelines.",
    wireframes: "Created user flow diagrams and wireframes prioritizing clear navigation and essential healthcare functions.",
    prototyping: "Built high-fidelity prototypes with focus on accessibility features and HIPAA-compliant design patterns.",
    testing: "Performed usability testing with diverse patient groups and healthcare staff to ensure optimal user experience."
  },
  userPersonas: [
    {
      name: "Margaret Thompson",
      age: 68,
      role: "Retired Patient with Chronic Conditions",
      goals: ["Easy access to test results", "Simple appointment booking", "Clear medication information"],
      frustrations: ["Complex navigation", "Small text", "Technical difficulties"]
    },
    {
      name: "David Chen",
      age: 42,
      role: "Busy Professional & Parent", 
      goals: ["Quick appointment scheduling", "Family health management", "Mobile access"],
      frustrations: ["Time-consuming processes", "Multiple logins", "Poor mobile experience"]
    }
  ]
};
