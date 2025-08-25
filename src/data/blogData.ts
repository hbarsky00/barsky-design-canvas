export type BlogPost = {
  id?: string;          // backwards compatibility
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;   // absolute URL
  imageAlt?: string;
  author: string;
  tags: string[];
  date: string;         // ISO or parseable
  updated?: string;     // ISO if available
  readTime?: string;    // backwards compatibility
  content?: string;     // backwards compatibility
};

export const blogPosts: BlogPost[] = [
  {
    id: "finding-ux-job",
    slug: "finding-ux-job",
    title: "Finding a UX Job in 2025 – What Actually Works",
    excerpt: "Practical tactics for landing interviews and offers in a crowded market—what to double down on and what to ignore.",
    coverImage: "https://barskydesign.pro/images/blog-finding-ux-job.jpg",
    imageAlt: "UX job search strategies overview",
    author: "Hiram Barsky",
    tags: ["UX Careers", "Portfolio", "Hiring"],
    date: "2025-07-14",
    readTime: "7 min read",
    content: "Blog post content placeholder"
  },
  {
    id: "ai-in-design",
    slug: "ai-in-design",
    title: "How AI Is Changing UX — Patterns That Build Trust",
    excerpt: "Where AI helps, where it confuses users, and interaction patterns that keep people in control.",
    coverImage: "https://barskydesign.pro/images/blog-ai-in-design.jpg",
    imageAlt: "AI and UX patterns illustration",
    author: "Hiram Barsky",
    tags: ["AI", "UX Strategy", "Trust"],
    date: "2025-06-22",
    updated: "2025-08-10",
    readTime: "9 min read",
    content: "Blog post content placeholder"
  },
  {
    id: "case-studies-that-win",
    slug: "case-studies-that-win",
    title: "Case Studies That Win Clients — Beyond Pretty Screens",
    excerpt: "Start with the problem, quantify impact, show what failed, and explain your thinking—skip the wireframe montage.",
    coverImage: "https://barskydesign.pro/images/blog-case-study-writing.jpg",
    imageAlt: "Case study storytelling framework",
    author: "Hiram Barsky",
    tags: ["Case Studies", "Storytelling", "Consulting"],
    date: "2025-05-18",
    readTime: "6 min read",
    content: "Blog post content placeholder"
  }
];