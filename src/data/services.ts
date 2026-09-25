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
    title: "Product Design",
    description: "User-centered design solutions from research to final implementation",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping", 
      "Design Systems",
      "UI/UX Design"
    ]
  },
  {
    title: "Gen AI Development",
    description: "AI-powered features and intelligent user experiences",
    features: [
      "AI Integration",
      "Machine Learning Models",
      "Intelligent Automation",
      "Data-Driven Insights"
    ]
  }
];

export const SERVICES_CTA = {
  title: "Start with a call",
  description:
    "Tell me what you are building and what is in the way. If it is not a fit I will say so.",
  buttonText: "Get in touch"
};

export const SERVICES_HERO = {
  title: "Product Design & Gen AI Development",
  description:
    "One person taking a product from research through interface design to a shipped React front end, database and deploy.",
  buttonText: "Start with a call"
};