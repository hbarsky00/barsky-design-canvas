
import { ProjectProps } from "@/components/ProjectCard";

export interface ProjectDetails {
  fullDescription: string;
  technologies: string[];
  duration: string;
  client: string;
  role: string;
  extraImages: string[];
  caseStudyLink?: string; // New optional property for case study links
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
    ],
    caseStudyLink: "https://hirambarsky.com/case-studies/splittime"
  },
  "herbalink": {
    fullDescription: "Herbalink is a comprehensive mobile platform connecting users with qualified herbalists for natural health solutions. The app features an intuitive interface with personalized herbalist matching, secure video consultations, in-app messaging, and appointment scheduling. Users can browse practitioner profiles with verified credentials, specialties, and ratings, while accessing a knowledge base of herbal remedies. The payment system supports multiple options, and the app includes personalized treatment tracking and reminder features to ensure users follow their wellness plans.",
    technologies: ["React Native", "TypeScript", "Redux", "Node.js", "WebRTC", "MongoDB", "Stripe API", "Push Notifications", "Biometric Authentication"],
    duration: "6 months",
    client: "Herbalink Wellness Technologies",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/1aff7c3f-ce98-47e7-bc9d-fa69de522425.png",
      "/lovable-uploads/e4fb8ea0-be2b-41f7-8d69-d8f8a043c213.png",
      "/lovable-uploads/dbed92d3-b001-4854-bf76-b4c7ae74de29.png",
      "/lovable-uploads/11d88ba0-3135-42e4-99ba-d68beb56e518.png",
      "/lovable-uploads/da448046-c673-41fd-9682-c9471088dc98.png",
      "/lovable-uploads/31b21f6b-faa3-4ffe-a96b-702f87142fbd.png"
    ],
    caseStudyLink: "https://hirambarsky.com/case-studies/herbalink"
  },
  "gold2crypto": {
    fullDescription: "Gold 2 Crypto Services is a sophisticated cryptocurrency trading platform that bridges traditional gold investments with modern crypto markets. The platform features real-time price tracking, advanced charting tools, secure wallet integration, and instant trading capabilities. Users can monitor market trends, set price alerts, and execute trades with multiple cryptocurrency pairs. The platform includes a responsive dashboard with portfolio analytics, transaction history, and customizable watchlists. Security features include two-factor authentication, cold storage options, and encrypted transactions.",
    technologies: ["React", "TypeScript", "WebSocket API", "Trading View Charts", "Crypto APIs", "Node.js", "Redux", "TailwindCSS"],
    duration: "6 months",
    client: "Gold 2 Crypto Services",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/24032530-c712-4fff-9236-3975170ee6e6.png",
      "/lovable-uploads/ddd4793c-96fd-4af4-a35a-6ee17e1ad879.png",
      "/lovable-uploads/8ad63858-b980-4021-af95-772475a451b5.png",
      "/lovable-uploads/f859dde1-e2bb-4777-a2cd-293d24d4d865.png"
    ],
    caseStudyLink: "https://hirambarsky.com/case-studies/gold2crypto"
  },
  "barskyjoint": {
    fullDescription: "Barsky Joint Food Truck mobile app revolutionizes the food truck ordering experience with a sleek, user-friendly interface. The app features a curated menu of gourmet options including their signature bacon chicken cheese special sauce sandwich, customizable smash burgers, and innovative vegan options. Key features include real-time order tracking, customizable ingredients, side options between regular and sweet potato fries or salad, and seamless payment integration. The app also includes a loyalty program, push notifications for truck location updates, and estimated waiting times.",
    technologies: ["React Native", "Redux", "Node.js", "Express", "MongoDB", "Stripe", "Push Notifications", "GPS Integration"],
    duration: "3 months",
    client: "Barsky Joint Food Truck",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
      "/lovable-uploads/d7198f1c-cc71-40f9-ae5c-c586ea92918b.png",
      "/lovable-uploads/bebd5718-47dc-4238-ab61-d1892611d24e.png"
    ],
    caseStudyLink: "https://hirambarsky.com/case-studies/barskyjoint"
  },
  "spectrum": {
    fullDescription: "Spectrum Apparel Co. is a modern e-commerce platform dedicated to creating and selling autism awareness apparel and custom shirts. The platform features an intuitive design interface for custom shirt creation, size-inclusive options, and a streamlined shopping experience. Key features include a drag-and-drop shirt designer, real-time preview of customizations, automated inventory management, and a size recommendation tool. The platform also includes a blog section for autism awareness content and community stories.",
    technologies: ["React", "Next.js", "Stripe", "AWS", "Tailwind CSS", "Canvas API", "Shopify API"],
    duration: "4 months",
    client: "Spectrum Apparel Co.",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/56a3b260-72d5-4b69-879b-9280e1731be7.png",
      "/lovable-uploads/8a8efa4e-4d69-4f21-8ea3-b45b70284058.png",
      "/lovable-uploads/e65cf5f1-62f3-4412-b533-fdfc0e59aae3.png",
      "/lovable-uploads/6544f03a-2e0f-4adb-b382-521741cdf807.png"
    ],
    caseStudyLink: "https://hirambarsky.com/case-studies/spectrum"
  }
};

export const projectsData: ProjectProps[] = [
  {
    id: "splittime",
    title: "Co-Parenting Coordination App",
    description: "A mobile application designed to help separated parents better coordinate childcare responsibilities.",
    image: "/lovable-uploads/876fb1bd-4f5a-4734-8812-c18fa01e10ce.png",
    tags: ["Figma", "Lovable.dev", "Product Design", "UX / UI Design", "Mobile App", "React Native"],
    link: "https://splittime.pro/"
  },
  {
    id: "herbalink",
    title: "Herbalink",
    description: "Mobile application connecting individuals with qualified herbalists for personalized natural health solutions.",
    image: "/lovable-uploads/1aff7c3f-ce98-47e7-bc9d-fa69de522425.png",
    tags: ["Figma", "Lovable.dev", "Product Design", "UX / UI Design", "Mobile App", "Healthcare"],
    link: "https://herbalink.live"
  },
  {
    id: "gold2crypto",
    title: "Gold 2 Crypto Services",
    description: "Trading platform bridging traditional gold investments with cryptocurrency markets.",
    image: "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png",
    tags: ["Figma", "Lovable.dev", "Product Design", "UX / UI Design", "Web App", "Trading", "Crypto"],
    link: "https://gold2.gold/"
  },
  {
    id: "barskyjoint",
    title: "Barsky Joint Food Truck",
    description: "Mobile ordering app for a gourmet food truck with real-time tracking and customization.",
    image: "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png",
    tags: ["Figma", "Lovable.dev", "Product Design", "UX / UI Design", "Mobile App", "Food Service"],
    link: "https://barskyjoint.biz/"
  },
  {
    id: "spectrum",
    title: "Spectrum Apparel Co.",
    description: "E-commerce platform for autism awareness apparel with custom shirt design capabilities.",
    image: "/lovable-uploads/56a3b260-72d5-4b69-879b-9280e1731be7.png",
    tags: ["Figma", "Lovable.dev", "Product Design", "UX / UI Design", "Web App", "E-Commerce", "Accessibility"],
    link: "https://supersha.store"
  }
];
