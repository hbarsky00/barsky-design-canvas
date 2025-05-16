
import { Product, Category } from "@/types/product";

export const products: Product[] = [
  {
    id: "figma-system",
    name: "Complete Design System Figma File",
    description: "Professional design system with comprehensive component library, light/dark mode, responsive layouts, and detailed documentation. Perfect for startups and design teams.",
    price: 129,
    image: "/lovable-uploads/31b21f6b-faa3-4ffe-a96b-702f87142fbd.png",
    category: "templates",
    badge: "Premium"
  },
  {
    id: "1",
    name: "UX Research Template",
    description: "A comprehensive template for conducting user research interviews and synthesizing findings.",
    price: 49,
    image: "/lovable-uploads/2d1a328c-29eb-4d8a-97d5-3d6d9977a4f3.png",
    category: "templates"
  },
  {
    id: "2",
    name: "Design System Starter",
    description: "Jump-start your design system with this comprehensive Figma template.",
    price: 79,
    image: "/lovable-uploads/31b21f6b-faa3-4ffe-a96b-702f87142fbd.png",
    category: "templates"
  },
  {
    id: "3",
    name: "Wireframe Kit",
    description: "200+ wireframing components to quickly prototype your next digital product.",
    price: 59,
    image: "/lovable-uploads/6edd294a-5638-4a33-9e90-34a3341ddeaf.png",
    category: "ui-kits"
  },
  {
    id: "4",
    name: "Mobile UI Kit",
    description: "A comprehensive mobile UI kit with 300+ components for iOS and Android.",
    price: 89,
    image: "/lovable-uploads/f859dde1-e2bb-4777-a2cd-293d24d4d865.png",
    category: "ui-kits"
  },
  {
    id: "5",
    name: "UX Writing Guide",
    description: "The ultimate guide to writing effective UX copy for your digital products.",
    price: 39,
    image: "/lovable-uploads/8a8efa4e-4d69-4f21-8ea3-b45b70284058.png",
    category: "guides"
  },
  {
    id: "6",
    name: "Animation Principles eBook",
    description: "Learn how to create meaningful animations that enhance user experience.",
    price: 29,
    image: "/lovable-uploads/f90e5551-b19a-49c3-aeb4-348089b0ea6a.png",
    category: "guides"
  }
];

export const categories: Category[] = [
  { id: "all", name: "All Products" },
  { id: "templates", name: "Templates" },
  { id: "ui-kits", name: "UI Kits" },
  { id: "guides", name: "Guides & eBooks" }
];
