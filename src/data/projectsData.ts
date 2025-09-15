
import { ProjectProps } from "@/components/ProjectCard";

export const projectsData: ProjectProps[] = [
  {
    id: "business-management",
    title: "Business Management App",
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    image: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/warehouse/heroimage.png?v=1",
    videoThumbnail: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/warehouse/heroimage.png?v=1",
    video: "bizmgmt-demo.mp4",
    tags: ["Enterprise", "CRM", "Dashboard"],
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
    id: "barskyjoint",
    title: "BarskyJoint",
    description: "Dual-format restaurant ordering platform that increased average ticket size by 28% through menu clarity and guided customization.",
    image: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
    videoThumbnail: "barskyjoint-thumb.jpg",
    video: "barskyjoint-demo.mp4",
    tags: ["Restaurant Tech", "Food Service", "Kiosk Design"],
    featured: true,
  }
];
