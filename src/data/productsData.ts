
import { Product, Category } from "@/types/product";

export const products: Product[] = [
  {
    id: "case-study-templates",
    name: "5 Case Studies That Changed My Portfolio Game",
    description: "Professional case study templates that helped me land high-paying clients and transform my portfolio from average to outstanding.",
    price: 10,
    image: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/store/imageofcasestudies.jpeg",
    category: "templates",
    badge: "Best Seller"
  },
  {
    id: "content-templates",
    name: "Professional Content Templates That Work Across All Platforms",
    description: "Ready-to-use content templates for LinkedIn, Twitter, Instagram, Facebook, and Email that drive engagement and grow your personal brand.",
    price: 10,
    image: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/store/Screenshot%202025-09-09%20at%2012.21.11%20PM.png",
    category: "templates"
  }
];

export const categories: Category[] = [
  { id: "all", name: "All Products" },
  { id: "templates", name: "Templates" }
];
