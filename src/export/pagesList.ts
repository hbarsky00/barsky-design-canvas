import { structuredCaseStudies } from "@/data/structuredCaseStudies";
import { blogPosts } from "@/data/blogData";

export interface PageInfo {
  id: string;
  title: string;
  url: string;
  type: "global" | "homepage" | "projects" | "case-study" | "about" | "services" | "service-detail" | "contact" | "blog-index" | "blog-post";
}

export const PAGES_LIST: PageInfo[] = [
  // Global (special entry - only appears once)
  { id: "global", title: "Global", url: "", type: "global" },
  
  // Static pages
  { id: "homepage", title: "Home", url: "/", type: "homepage" },
  
  { id: "services", title: "Services", url: "/services", type: "services" },
  { id: "about", title: "About", url: "/about", type: "about" },
  { id: "contact", title: "Contact", url: "/contact", type: "contact" },
  { id: "blog", title: "Blog", url: "/blog", type: "blog-index" },
  
  // Service detail pages
  { id: "ux-ui-design", title: "UX/UI Design", url: "/design-services/ux-ui-design", type: "service-detail" },
  { id: "mobile-app-design", title: "Mobile App Design", url: "/design-services/mobile-app-design", type: "service-detail" },
  { id: "web-development", title: "Web Development", url: "/design-services/web-development", type: "service-detail" },
  
  // Structured case studies
  ...Object.keys(structuredCaseStudies).map(id => ({
    id,
    title: structuredCaseStudies[id].title,
    url: `/project/${id}`,
    type: "case-study" as const
  })),
  
  // Blog posts
  ...blogPosts.map(post => ({
    id: post.slug,
    title: post.title,
    url: `/blog/${post.slug}`,
    type: "blog-post" as const
  }))
];