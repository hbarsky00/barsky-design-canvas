// Services data for export and DRY usage

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceData {
  title: string;
  description: string;
  features: string[];
}

export const SERVICES_DATA: ServiceData[] = [
  {
    title: "AI-First Product Design",
    description: "Designing intelligent experiences that go beyond the screen.",
    features: [
      "AI Workflow & Interaction Design",
      "Prompt UX & Conversational Interfaces",
      "Human-AI Collaboration Patterns",
      "Design Systems for Adaptive Products"
    ]
  },
  {
    title: "Gen AI Integration",
    description: "Bringing real AI capability into your product — not just the wrapper.",
    features: [
      "ChatGPT / Claude API Integration",
      "AI-Powered Feature Design",
      "Intelligent Automation Flows",
      "Data-Driven UX Decisions"
    ]
  },
  {
    title: "Core Product Design",
    description: "The craft that makes AI products actually usable.",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "High-Fidelity UI Design",
      "Responsive Design Systems"
    ]
  }
];

export interface ServicePackage {
  title: string;
  price: string;
  description: string;
  timeline: string;
  features: string[];
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    title: "MVP Validation",
    price: "$8,500",
    description: "For funded startups that need to move fast and validate smart.",
    timeline: "3 weeks to launch-ready design",
    features: [
      "AI-powered competitive analysis",
      "User persona development",
      "Strategic UX wireframes",
      "High-fidelity UI design",
      "Interactive prototype",
      "30-day post-launch support"
    ]
  },
  {
    title: "AI-First Redesign",
    price: "$18,500",
    description: "For companies ready to rebuild their product around AI — not just bolt it on.",
    timeline: "12 weeks",
    features: [
      "Full UX research with AI insight synthesis",
      "AI interaction model design",
      "ChatGPT / Claude API integration design",
      "Responsive design system",
      "Dev collaboration & handoff",
      "90-day optimization support"
    ]
  }
];

export const SERVICES_CTA = {
  title: "Ready to Build Something Smarter?",
  description: "Let's design a product that uses AI to do something that actually matters.",
  buttonText: "Schedule a Call"
};

export const SERVICES_HERO = {
  title: "AI-First Product Design",
  description: "I design products where AI isn't a feature — it's the foundation. Hiram Barsky · AI-First Designer.",
  buttonText: "Work With Me"
};
