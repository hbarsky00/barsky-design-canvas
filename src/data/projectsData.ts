
import { ProjectProps } from "@/components/ProjectCard";

export const projectsData: ProjectProps[] = [
  {
    id: "smarterhealth",
    title: "Smarter Health: Helping Patients Stay on Track",
    description: "How I designed a healthcare app that made medication tracking 45% faster and appointment adherence 60% higher for diabetic patients.",
    image: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/smarterhealth/frontpage.png",
    videoThumbnail: "/assets/case-studies/smarter-health/hero-video.mp4",
    video: "/assets/case-studies/smarter-health/hero-video.mp4",
    tags: ["UX Design", "Healthcare App", "Mobile App Design", "Accessibility"],
    featured: true,
  },
  {
    id: "business-management",
    title: "WholeTech Operations Platform",
    description: "How I saved a failing $2.8M wholesale distributor: 68% fewer manual errors, 45% faster order processing, and prevented bankruptcy through one integrated system.",
    image: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/warehouse/heroimage.png?v=1",
    videoThumbnail: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/warehouse/heroimage.png?v=1",
    video: "bizmgmt-demo.mp4",
    tags: ["Enterprise B2B", "Crisis Management", "Legacy System Migration"],
    featured: true,
  },
  {
    id: "herbalink",
    title: "HerbaLink: GenAI Health Marketplace",
    description: "Built trust in an unregulated industry: 312% booking increase by solving credential verification and enabling remote consultations during COVID-19 restrictions.",
    image: "/uploads/0733fede-9de2-483a-8bb8-09538b044e33.png",
    videoThumbnail: "herbalink-thumb.jpg",
    video: "herbalink-demo.mp4",
    tags: ["HealthTech", "AI/ML", "Regulatory Compliance", "COVID Response"],
    featured: true,
  }
];
