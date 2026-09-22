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
  title: "Ready to Transform Your Product?",
  description: "Let's discuss your project and create something amazing together",
  buttonText: "Schedule Consultation"
};

export const SERVICES_HERO = {
  title: "Product Design & Gen AI Development",
  description: "Transform your digital products with user-centered design and cutting-edge AI integration",
  buttonText: "Get Started"
};