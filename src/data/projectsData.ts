
import { ProjectProps } from "@/components/ProjectCard";

export const projectsData: ProjectProps[] = [
  {
    id: "crypto",
    title: "Trading Without Friction",
    description: "How a dual-mode crypto app turned churn into growth by serving both novices and pros",
    image: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/crypto/dashboardmobileanddesktopcrypto.jpg",
    videoThumbnail: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/crypto/dashboardmobileanddesktopcrypto.jpg",
    video: "/lovable-uploads/crypto-hero.mp4",
    tags: ["Fintech", "Crypto", "Mobile & Web"],
    featured: true,
  },
  {
    id: "investor-loan-app",
    title: "Redesigning Loans: 85% Fewer Errors, 40% Faster",
    description: "How I led a banking platform redesign that replaced Excel and scaled operations with speed, accuracy, and trust.",
    image: "https://barskyux.com/wp-content/uploads/2025/08/analysisdashboard-1.png",
    videoThumbnail: "https://barskyux.com/wp-content/uploads/2025/08/analysisdashboard-1.png",
    video: "investor-loan-demo.mp4",
    tags: ["FinTech", "Analytics", "WebApp"],
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
