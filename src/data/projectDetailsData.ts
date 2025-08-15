
import { ProjectDetails } from "@/data/types/project";

export const projectDetailsData: Record<string, ProjectDetails> = {
  "herbalink": {
    challenge: "HerbaLink needed a complete digital transformation to connect herb enthusiasts with quality suppliers while building trust in an unregulated market.",
    process: "Conducted extensive user research, created wireframes, and developed a comprehensive platform with supplier verification, product catalog, and secure transactions.",
    result: "Delivered a trusted marketplace that increased supplier visibility by 300% and improved user engagement through intuitive design and robust verification systems.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe API"],
    duration: "6 months",
    client: "HerbaLink",
    role: "Lead Product Designer & Developer",
    useAiCaptions: false,
    imageCaptions: {}
  },
  "splittime": {
    challenge: "SplitTime needed to revolutionize time tracking for remote teams with an intuitive interface that would actually encourage usage rather than create friction.",
    process: "Designed user-centered workflows, implemented real-time collaboration features, and created an analytics dashboard that provides actionable insights.",
    result: "Achieved 95% user adoption rate and 40% improvement in project delivery times through streamlined time tracking and automated reporting.",
    technologies: ["React", "TypeScript", "Firebase", "Chart.js"],
    duration: "4 months",
    client: "SplitTime",
    role: "UX/UI Designer & Frontend Developer",
    useAiCaptions: false,
    imageCaptions: {}
  },
  "wholesale-distribution": {
    challenge: "A wholesale distribution company needed to modernize their legacy system and create a seamless ordering experience for B2B clients.",
    process: "Redesigned the entire user journey, implemented inventory management, and created automated workflows for order processing and fulfillment.",
    result: "Reduced order processing time by 60% and increased customer satisfaction scores to 4.8/5 through improved user experience and reliability.",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    duration: "8 months",
    client: "Wholesale Distribution Corp",
    role: "Senior Product Designer & Technical Lead",
    useAiCaptions: false,
    imageCaptions: {}
  }
};
