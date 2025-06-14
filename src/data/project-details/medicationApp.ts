
import { ProjectDetails } from "../types/project";

export const medicationAppDetails: ProjectDetails = {
  challenge: "Diabetic patients struggle with complex medication schedules and frequent appointments, leading to poor adherence and missed medical visits. Existing solutions were either too complex for daily use or lacked comprehensive diabetes management features.",

  process: "I conducted user research with diabetic patients and healthcare providers to understand pain points in medication management. Through iterative design and testing, I created an intuitive interface that simplifies medication tracking while maintaining medical-grade accuracy and accessibility standards.",

  result: "The final app delivered an 85% improvement in medication adherence and 70% reduction in missed appointments among beta users. The clean, accessible design successfully bridges the gap between patients and healthcare providers, creating a more efficient healthcare experience.",

  technologies: [
    "React Native",
    "TypeScript", 
    "Firebase",
    "Healthcare APIs",
    "Push Notifications",
    "Biometric Authentication",
    "Calendar Integration",
    "Data Visualization",
    "Accessibility Tools"
  ],

  duration: "1.5 years",
  client: "Healthcare Technology Startup",
  role: "Lead UX/UI Designer",

  // New simplified image configuration - easy to edit!
  imageConfig: {
    challenge: {
      beforeHeader: "/lovable-uploads/5faa6be9-9602-4fd5-8dff-4f95864e7142.png", // User research findings
      afterHeader: "/lovable-uploads/759f7954-5048-407d-9dca-e1d4a4cd954f.png"  // Competitive analysis
    },
    process: {
      beforeHeader: "/lovable-uploads/3561de34-19f0-43b5-af1e-c72096282ab3.png", // Initial wireframes
      afterHeader: "/lovable-uploads/46b1b74d-cba7-4b37-95e7-17f113a89041.png"  // Design system
    },
    result: {
      beforeHeader: "/lovable-uploads/f291f600-a3da-4d1f-8a53-70063b1b113e.png", // Final app interface
      afterHeader: "/lovable-uploads/60d8aee8-4b4b-4335-8cc5-3a0816eccfab.png"  // User journey screens
    }
  },

  // Available images pool for easy reference and swapping
  availableImages: [
    "/lovable-uploads/5faa6be9-9602-4fd5-8dff-4f95864e7142.png", // User research findings - pain points analysis
    "/lovable-uploads/759f7954-5048-407d-9dca-e1d4a4cd954f.png", // Competitive analysis - market research
    "/lovable-uploads/9de388e2-d7b4-4265-816c-08384411503a.png", // Early concept sketches
    "/lovable-uploads/3561de34-19f0-43b5-af1e-c72096282ab3.png", // Initial wireframes - app architecture
    "/lovable-uploads/46b1b74d-cba7-4b37-95e7-17f113a89041.png", // Design system - colors and typography
    "/lovable-uploads/73d25798-547e-49a0-ad44-a79540285bff.png", // Low-fidelity wireframes
    "/lovable-uploads/5ebc710e-fd8f-40aa-b092-99290c136a57.png", // Task completion states
    "/lovable-uploads/f291f600-a3da-4d1f-8a53-70063b1b113e.png", // Final app interface - main screens
    "/lovable-uploads/60d8aee8-4b4b-4335-8cc5-3a0816eccfab.png", // User journey - complete flow
    "/lovable-uploads/593ace1d-0082-49d1-aacf-debe109e5235.png"  // User journey mapping documentation
  ],

  // Legacy properties for backward compatibility - will be deprecated
  challengeImage: "/lovable-uploads/5faa6be9-9602-4fd5-8dff-4f95864e7142.png",
  challengeGalleryImages: [
    "/lovable-uploads/759f7954-5048-407d-9dca-e1d4a4cd954f.png",
    "/lovable-uploads/9de388e2-d7b4-4265-816c-08384411503a.png"
  ],
  processImage: "/lovable-uploads/3561de34-19f0-43b5-af1e-c72096282ab3.png",
  processBottomImage: "/lovable-uploads/46b1b74d-cba7-4b37-95e7-17f113a89041.png",
  resultImage: "/lovable-uploads/f291f600-a3da-4d1f-8a53-70063b1b113e.png",
  resultGalleryImages: [
    "/lovable-uploads/60d8aee8-4b4b-4335-8cc5-3a0816eccfab.png",
    "/lovable-uploads/73d25798-547e-49a0-ad44-a79540285bff.png",
    "/lovable-uploads/5ebc710e-fd8f-40aa-b092-99290c136a57.png",
    "/lovable-uploads/593ace1d-0082-49d1-aacf-debe109e5235.png"
  ],
  galleryImages: []
};
