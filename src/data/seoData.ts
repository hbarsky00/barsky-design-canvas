import { SEO_CONSTANTS } from "@/utils/seoConstants";
import { getStructuredCaseStudy, getAllCaseStudyIds } from "@/data/structuredCaseStudies";
import { blogPosts } from "@/data/blogData";

export async function resolveSeoInput(path: string) {
  path = path.replace(/[?#].*$/, "").replace(/\/{2,}/g, "/");

  if (path === "/") {
    return {
      path, kind: "home",
      title: SEO_CONSTANTS.SITE_NAME,
      description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
      image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
      imageAlt: "Portrait of Hiram Barsky, Product Designer"
    };
  }

  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "").replace(/\/$/, "");
    const post = blogPosts.find(p => p.slug === slug);
    if (post) {
      return {
        path, kind: "post",
        title: `${post.title} — ${SEO_CONSTANTS.SITE_NAME}`,
        description: post.excerpt,
        image: post.coverImage,
        imageAlt: post.imageAlt ?? `${post.title} preview image`,
        author: post.author, tags: post.tags,
        published: new Date(post.date).toISOString(),
        modified: new Date(post.updated ?? post.date).toISOString()
      };
    }
  }

  if (path.startsWith("/project/")) {
    const id = path.replace("/project/", "").replace(/\/$/, "");
    const cs = getStructuredCaseStudy(id);
    if (cs) {
      return {
        path, kind: "project",
        title: cs.title, description: cs.description,
        image: cs.seoData?.image,
        imageAlt: cs.seoData?.image ? `${cs.title} preview image` : undefined,
        author: "Hiram Barsky",
        tags: cs.tags,
        published: "2025-01-01T00:00:00Z", // default date
        modified: "2025-08-01T00:00:00Z"  // default date
      };
    }
  }

  const staticMap: Record<string, any> = {
    "/projects": {
      title: "Design Case Studies – Barsky Design",
      description: "HerbaLink, SplitTime, Business Management, Investment App — quantified outcomes, failures, and thought process.",
      image: "https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png"
    },
    "/services": {
      title: "UX & Product Design Services – Barsky Design",
      description: "From research to high-impact UX, I help fintech, healthcare, and SaaS teams deliver outcomes fast.",
      image: "https://barskyux.com/wp-content/uploads/2025/08/macbookpro.png"
    },
    "/contact": {
      title: "Contact Hiram Barsky – Product Designer",
      description: "Book a call to discuss your product vision and UX challenges.",
      image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
    },
    "/about": {
      title: "About Hiram Barsky – Product Designer",
      description: "15+ years designing fintech, healthcare, and SaaS platforms. Principal UX/UI Designer & Design Leader.",
      image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
    },
    "/blog": {
      title: "Design Insights & Case Studies – Barsky Blog",
      description: "UX, AI, and design strategy — quantified lessons and experiments.",
      image: "https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg"
    }
  };
  if (staticMap[path]) return { path, kind: "page", ...staticMap[path] };

  return {
    path, kind: "page",
    title: SEO_CONSTANTS.SITE_NAME,
    description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
    image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
  };
}

export async function getAllRoutes(): Promise<string[]> {
  const pages = ["/", "/projects", "/services", "/contact", "/about", "/blog"];
  const projects = getAllCaseStudyIds().map(id => `/project/${id}`);
  const posts = blogPosts.map(p => `/blog/${p.slug}`);
  return [...pages, ...projects, ...posts];
}

// Legacy exports for backwards compatibility
export const getStaticPageSEO = (path: string) => null;
export const getProjectSEO = (projectId: string) => null;
export const getBlogSEO = (slug: string) => null;