
import { ProjectProps } from "@/components/ProjectCard";

export const projectsData: ProjectProps[] = [
  {
    id: "crypto",
    title: "Trading Without Friction",
    description: "How a dual-mode crypto app turned churn into growth by serving both novices and pros",
    image: "https://barskyux.com/wp-content/uploads/2025/08/CryptoFeatureimage.png",
    videoThumbnail: "https://barskyux.com/wp-content/uploads/2025/08/CryptoFeatureimage.png",
    video: "/lovable-uploads/crypto-hero.mp4",
    tags: ["Fintech", "Crypto", "Mobile & Web"],
    featured: true,
  },
  {
    id: "herbalink",
    title: "HerbaLink",
    description: "Connected users to certified herbalists across the country and increased booking rates by 3x.",
    image: "/lovable-uploads/0733fede-9de2-483a-8bb8-09538b044e33.png",
    videoThumbnail: "herbalink-thumb.jpg",
    video: "herbalink-demo.mp4",
    tags: ["Health", "Marketplace", "Gen AI"],
    featured: true,
  },
  {
    id: "splittime",
    title: "SplitTime",
    description: "Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools.",
    image: "/lovable-uploads/8fb40d7a-8ac6-404e-a3ce-43746775a75c.png",
    videoThumbnail: "splittime-thumb.jpg",
    video: "splittime-demo.mp4",
    tags: ["Family Tech", "iOS to Android", "Legal UX"],
    featured: true,
  },
  {
    id: "business-management",
    title: "Business Management App",
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    image: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png",
    videoThumbnail: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png",
    video: "bizmgmt-demo.mp4",
    tags: ["Enterprise", "CRM", "Dashboard"],
    featured: true,
  }
];
