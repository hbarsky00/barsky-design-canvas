
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
  "splittime": {
    fullDescription: "A mobile application designed to help separated parents better coordinate childcare responsibilities. The app includes features such as shared calendars for custody schedules, expense tracking and splitting, secure messaging, and important document storage. The design focuses on creating a neutral platform that promotes positive co-parenting communication and reduces conflict.",
    technologies: ["React Native", "Firebase", "Redux", "Node.js", "Express", "MongoDB", "Push Notifications"],
    duration: "4 months",
    client: "Family Support Services",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/d247fe26-c5c2-450d-a27d-fd1d41739b55.png",
      "/lovable-uploads/f90e5551-b19a-49c3-aeb4-348089b0ea6a.png"
      // Main image is already /lovable-uploads/876fb1bd-4f5a-4734-8812-c18fa01e10ce.png, removed from here
    ]
  },
  "herbalink": {
    fullDescription: "Herbalink is a comprehensive mobile platform connecting users with qualified herbalists for natural health solutions. The app features an intuitive interface with personalized herbalist matching, secure video consultations, in-app messaging, and appointment scheduling. Users can browse practitioner profiles with verified credentials, specialties, and ratings, while accessing a knowledge base of herbal remedies. The payment system supports multiple options, and the app includes personalized treatment tracking and reminder features to ensure users follow their wellness plans.",
    technologies: ["React Native", "TypeScript", "Redux", "Node.js", "WebRTC", "MongoDB", "Stripe API", "Push Notifications", "Biometric Authentication"],
    duration: "6 months",
    client: "Herbalink Wellness Technologies",
    role: "Lead Designer & Inventor",
    // The main image is /lovable-uploads/9f715d44-69d8-41e0-a399-30a775d33ac5.png, so we don't repeat it here
    extraImages: [
      "/lovable-uploads/ad5f253f-bf3d-47fa-8e3c-3bc5d9ccca8a.png", 
      "/lovable-uploads/af96963b-d956-4f00-9dd2-024e082c4ce3.png",
      "/lovable-uploads/4c34d90f-194f-4e0d-8441-077677636a26.png",
      "/lovable-uploads/b4e4500c-8c14-4c50-b907-bdce0935fd22.png",
      "/lovable-uploads/f029901e-a9e3-480d-a621-a3bc686d1994.png",
      "/lovable-uploads/a0cbc4ac-772d-4862-b7c0-3d8d3d5d2413.png",
      // Add placeholder in case original images are missing
      "/placeholder.svg"
    ]
  },
  "gold2crypto": {
    fullDescription: "Gold 2 Crypto Services is a sophisticated cryptocurrency trading platform that bridges traditional gold investments with modern crypto markets. The platform features real-time price tracking, advanced charting tools, secure wallet integration, and instant trading capabilities. Users can monitor market trends, set price alerts, and execute trades with multiple cryptocurrency pairs. The platform includes a responsive dashboard with portfolio analytics, transaction history, and customizable watchlists. Security features include two-factor authentication, cold storage options, and encrypted transactions.",
    technologies: ["React", "TypeScript", "WebSocket API", "Trading View Charts", "Crypto APIs", "Node.js", "Redux", "TailwindCSS"],
    duration: "6 months",
    client: "Gold 2 Crypto Services",
    role: "Lead Designer & Inventor",
    extraImages: [
      // Using just one reference to avoid duplicates, since all paths are the same
      "/placeholder.svg"
    ]
  },
  "barskyjoint": {
    fullDescription: "Barsky Joint Food Truck mobile app revolutionizes the food truck ordering experience with a sleek, user-friendly interface. The app features a curated menu of gourmet options including their signature bacon chicken cheese special sauce sandwich, customizable smash burgers, and innovative vegan options. Key features include real-time order tracking, customizable ingredients, side options between regular and sweet potato fries or salad, and seamless payment integration. The app also includes a loyalty program, push notifications for truck location updates, and estimated waiting times.",
    technologies: ["React Native", "Redux", "Node.js", "Express", "MongoDB", "Stripe", "Push Notifications", "GPS Integration"],
    duration: "3 months",
    client: "Barsky Joint Food Truck",
    role: "Lead Designer & Inventor",
    extraImages: [
      // Using just one reference to avoid duplicates, since all paths are the same
      "/placeholder.svg"
    ]
  },
  "spectrum": {
    fullDescription: "Spectrum Apparel Co. is a modern e-commerce platform dedicated to creating and selling autism awareness apparel and custom shirts. The platform features an intuitive design interface for custom shirt creation, size-inclusive options, and a streamlined shopping experience. Key features include a drag-and-drop shirt designer, real-time preview of customizations, automated inventory management, and a size recommendation tool. The platform also includes a blog section for autism awareness content and community stories.",
    technologies: ["React", "Next.js", "Stripe", "AWS", "Tailwind CSS", "Canvas API", "Shopify API"],
    duration: "4 months",
    client: "Spectrum Apparel Co.",
    role: "Lead Designer & Inventor",
    extraImages: [
      // Using just one reference to avoid duplicates, since all paths are the same
      "/placeholder.svg"
    ]
  }
};

export const projectsData: ProjectProps[] = [
  {
    id: "splittime",
    title: "Co-Parenting Coordination App",
    description: "A mobile application designed to help separated parents better coordinate childcare responsibilities.",
    image: "/lovable-uploads/876fb1bd-4f5a-4734-8812-c18fa01e10ce.png",
    tags: ["Mobile App", "React Native", "Firebase"],
    link: "https://splittime.pro/"
  },
  {
    id: "herbalink",
    title: "Herbalink",
    description: "Mobile application connecting individuals with qualified herbalists for personalized natural health solutions.",
    image: "/lovable-uploads/9f715d44-69d8-41e0-a399-30a775d33ac5.png",
    tags: ["Mobile App", "Healthcare", "React Native"],
    link: "https://herbalink.live"
  },
  {
    id: "gold2crypto",
    title: "Gold 2 Crypto Services",
    description: "Trading platform bridging traditional gold investments with cryptocurrency markets.",
    image: "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png",
    tags: ["Web App", "Trading", "Crypto", "Finance"],
    link: "https://gold2.gold/"
  },
  {
    id: "barskyjoint",
    title: "Barsky Joint Food Truck",
    description: "Mobile ordering app for a gourmet food truck with real-time tracking and customization.",
    image: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
    tags: ["Mobile App", "Food Service", "E-Commerce"],
    link: "https://barskyjoint.biz/"
  },
  {
    id: "spectrum",
    title: "Spectrum Apparel Co.",
    description: "E-commerce platform for autism awareness apparel with custom shirt design capabilities.",
    image: "/lovable-uploads/29c909f0-96bf-47e7-a65b-2ccfc46f125c.png",
    tags: ["Web App", "E-Commerce", "Design Tool", "Accessibility"],
    link: "https://supersha.store"
  }
];
