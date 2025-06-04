
interface ProcessStep {
  title: string;
  description: string;
  image?: string;
  completed?: boolean;
}

interface ProcessStepsGeneratorProps {
  details: {
    processImage?: string;
    processBottomImage?: string;
  };
}

export const generateProcessSteps = ({ details }: ProcessStepsGeneratorProps): ProcessStep[] => {
  return [
    {
      title: "Research & Discovery",
      description: "Conducted user interviews, surveys, and competitive analysis to understand user needs and pain points.",
      image: details.processImage,
      completed: true
    },
    {
      title: "Ideation & Strategy",
      description: "Brainstormed solutions, created user personas, and defined the design strategy and goals.",
      completed: true
    },
    {
      title: "Design & Prototyping",
      description: "Developed wireframes, created high-fidelity designs, and built interactive prototypes for testing.",
      image: details.processBottomImage,
      completed: true
    },
    {
      title: "Testing & Iteration",
      description: "Conducted usability testing, gathered feedback, and iterated on the design based on user insights.",
      completed: true
    }
  ];
};
