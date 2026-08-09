
import { Product, Category } from "@/types/product";

// Product covers are locally generated brand art. The originals lived on a
// Supabase project that has since been deprovisioned, so both images were
// broken on the live store.
export const products: Product[] = [
  {
    id: "case-study-templates",
    name: "5 Case Studies That Changed My Portfolio Game",
    description: "Professional case study templates that helped me land high-paying clients and transform my portfolio from average to outstanding.",
    price: 10,
    image: "/images/store/case-study-templates.jpg",
    category: "templates",
    badge: "Best Seller"
  },
  {
    id: "content-templates",
    name: "Professional Content Templates That Work Across All Platforms",
    description: "Ready-to-use content templates for LinkedIn, Twitter, Instagram, Facebook, and Email that drive engagement and grow your personal brand.",
    price: 10,
    image: "/images/store/content-templates.jpg",
    category: "templates"
  }
];

export const categories: Category[] = [
  { id: "all", name: "All Products" },
  { id: "templates", name: "Templates" }
];
