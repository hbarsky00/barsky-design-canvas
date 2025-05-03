
import { ProjectProps } from "@/components/ProjectCard";

export interface ProjectDetails {
  fullDescription: string;
  technologies: string[];
  duration: string;
  client: string;
  role: string;
  extraImages: string[];
}

export const projectDetails: Record<string, ProjectDetails> = {
  "project1": {
    fullDescription: "A mobile application designed to help separated parents better coordinate childcare responsibilities. The app includes features such as shared calendars for custody schedules, expense tracking and splitting, secure messaging, and important document storage. The design focuses on creating a neutral platform that promotes positive co-parenting communication and reduces conflict.",
    technologies: ["React Native", "Firebase", "Redux", "Node.js", "Express", "MongoDB", "Push Notifications"],
    duration: "4 months",
    client: "Family Support Services",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/84649878-fe81-4d9a-8e4f-59dd99ab25f5.png",
      "/lovable-uploads/92026191-54bd-457b-9a0d-1a7bd591a2a5.png",
      "/lovable-uploads/bd3592b1-c2b2-4a8f-b804-b906046acfd6.png"
    ]
  },
  "project3": {
    fullDescription: "Herbalink is an innovative mobile platform designed to revolutionize access to holistic healthcare. The app serves as a comprehensive marketplace connecting individuals seeking natural wellness solutions with qualified, vetted herbalists. Users can easily search for practitioners based on specialties, health concerns, or location, view detailed profiles with credentials and expertise, and book both virtual and in-person consultations.",
    technologies: ["React Native", "Node.js", "MongoDB", "WebRTC", "Stripe", "GraphQL", "TypeScript"],
    duration: "6 months",
    client: "Herbalink Wellness Technologies",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/14e4f7c9-8f3f-49a6-b459-858623183f1c.png",
      "/lovable-uploads/14e4f7c9-8f3f-49a6-b459-858623183f1c.png",
      "/lovable-uploads/14e4f7c9-8f3f-49a6-b459-858623183f1c.png"
    ]
  },
  "project4": {
    fullDescription: "Gold 2 Crypto Services is a sophisticated cryptocurrency trading platform that bridges traditional gold investments with modern crypto markets. The platform features real-time price tracking, advanced charting tools, secure wallet integration, and instant trading capabilities. Users can monitor market trends, set price alerts, and execute trades with multiple cryptocurrency pairs. The platform includes a responsive dashboard with portfolio analytics, transaction history, and customizable watchlists. Security features include two-factor authentication, cold storage options, and encrypted transactions.",
    technologies: ["React", "TypeScript", "WebSocket API", "Trading View Charts", "Crypto APIs", "Node.js", "Redux", "TailwindCSS"],
    duration: "6 months",
    client: "Gold 2 Crypto Services",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png",
      "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png",
      "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png"
    ]
  },
  "project5": {
    fullDescription: "Barsky Joint Food Truck mobile app revolutionizes the food truck ordering experience with a sleek, user-friendly interface. The app features a curated menu of gourmet options including their signature bacon chicken cheese special sauce sandwich, customizable smash burgers, and innovative vegan options. Key features include real-time order tracking, customizable ingredients, side options between regular and sweet potato fries or salad, and seamless payment integration. The app also includes a loyalty program, push notifications for truck location updates, and estimated waiting times.",
    technologies: ["React Native", "Redux", "Node.js", "Express", "MongoDB", "Stripe", "Push Notifications", "GPS Integration"],
    duration: "3 months",
    client: "Barsky Joint Food Truck",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
      "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
      "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png"
    ]
  },
  "project6": {
    fullDescription: "Spectrum Apparel Co. is a modern e-commerce platform dedicated to creating and selling autism awareness apparel and custom shirts. The platform features an intuitive design interface for custom shirt creation, size-inclusive options, and a streamlined shopping experience. Key features include a drag-and-drop shirt designer, real-time preview of customizations, automated inventory management, and a size recommendation tool. The platform also includes a blog section for autism awareness content and community stories.",
    technologies: ["React", "Next.js", "Stripe", "AWS", "Tailwind CSS", "Canvas API", "Shopify API"],
    duration: "4 months",
    client: "Spectrum Apparel Co.",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/29c909f0-96bf-47e7-a65b-2ccfc46f125c.png",
      "/lovable-uploads/29c909f0-96bf-47e7-a65b-2ccfc46f125c.png",
      "/lovable-uploads/29c909f0-96bf-47e7-a65b-2ccfc46f125c.png"
    ]
  }
};

export const projectsData: ProjectProps[] = [
  {
    id: "project1",
    title: "Co-Parenting Coordination App",
    description: "A mobile application designed to help separated parents better coordinate childcare responsibilities.",
    image: "/lovable-uploads/84649878-fe81-4d9a-8e4f-59dd99ab25f5.png",
    tags: ["Mobile App", "React Native", "Firebase"],
    link: "https://splittime.pro/"
  },
  {
    id: "project3",
    title: "Herbalink",
    description: "Connecting individuals with qualified herbalists for virtual and in-person consultations.",
    image: "/lovable-uploads/14e4f7c9-8f3f-49a6-b459-858623183f1c.png",
    tags: ["Mobile App", "Marketplace", "Healthcare"],
    link: "https://herbalink.live"
  },
  {
    id: "project4",
    title: "Gold 2 Crypto Services",
    description: "Trading platform bridging traditional gold investments with cryptocurrency markets.",
    image: "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png",
    tags: ["Web App", "Trading", "Crypto", "Finance"],
    link: "https://gold2.gold/"
  },
  {
    id: "project5",
    title: "Barsky Joint Food Truck",
    description: "Mobile ordering app for a gourmet food truck with real-time tracking and customization.",
    image: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
    tags: ["Mobile App", "Food Service", "E-Commerce"],
    link: "https://barskyjoint.biz/"
  },
  {
    id: "project6",
    title: "Spectrum Apparel Co.",
    description: "E-commerce platform for autism awareness apparel with custom shirt design capabilities.",
    image: "/lovable-uploads/29c909f0-96bf-47e7-a65b-2ccfc46f125c.png",
    tags: ["Web App", "E-Commerce", "Design Tool", "Accessibility"],
    link: "https://supersha.store"
  }
];
