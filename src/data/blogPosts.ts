
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  tableOfContents?: Array<{
    id: string;
    title: string;
    level: number;
  }>;
}

export const blogPosts: BlogPost[] = [
  {
    id: "ai-design-future",
    title: "The Future of AI in Design: Beyond the Hype",
    description: "Exploring how AI is genuinely transforming the design process and what it means for designers.",
    content: `
      <p>Artificial Intelligence in design isn't just a buzzword—it's fundamentally changing how we approach creative problems. From automated layout suggestions to intelligent color palette generation, AI tools are becoming indispensable partners in the design process.</p>
      
      <h2>The Current State</h2>
      <p>Today's AI design tools excel at pattern recognition and automation of repetitive tasks. They can generate variations, suggest improvements, and even create entire layouts based on content and objectives.</p>
      
      <h2>What This Means for Designers</h2>
      <p>Rather than replacing designers, AI is amplifying our capabilities. It handles the mundane tasks, allowing us to focus on strategy, storytelling, and human connection—the areas where creativity truly shines.</p>
      
      <h2>Looking Forward</h2>
      <p>The future lies in collaboration between human creativity and AI efficiency. The designers who thrive will be those who learn to work alongside these tools, not against them.</p>
    `,
    author: "Hiram Barsky",
    authorBio: "Product Designer & Gen AI Developer with 15+ years of experience creating AI-enhanced digital experiences.",
    authorImage: "/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/lovable-uploads/ai-design-blog.png",
    tags: ["AI", "Design", "Future", "Technology"]
  },
  {
    id: "ux-research-methods",
    title: "Modern UX Research: Methods That Actually Work",
    description: "A practical guide to UX research methods that deliver actionable insights for product teams.",
    content: `
      <p>UX research has evolved dramatically in recent years. The methods that worked a decade ago may not be the most effective today. Here's what's actually working now.</p>
      
      <h2>Rapid Prototyping & Testing</h2>
      <p>Gone are the days of lengthy research cycles. Modern teams need insights fast. Rapid prototyping combined with quick user tests provides immediate feedback loops.</p>
      
      <h2>Behavioral Analytics Integration</h2>
      <p>Combining qualitative research with quantitative behavioral data gives us the full picture. Tools like heatmaps and user session recordings reveal what users actually do, not just what they say.</p>
      
      <h2>Remote Research at Scale</h2>
      <p>Remote research tools have democratized user insights. We can now gather feedback from diverse user groups without geographical constraints.</p>
    `,
    author: "Hiram Barsky",
    date: "2024-01-10",
    readTime: "7 min read",
    image: "/lovable-uploads/ux-research-blog.png",
    tags: ["UX Research", "Methods", "Product Design"]
  }
];
