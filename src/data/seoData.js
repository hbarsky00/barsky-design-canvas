import { SEO_CONSTANTS } from "../utils/seo/seoConstants.js";
import { blogPosts } from "./blogData.js";

// SEO data resolvers for prerender process
export async function resolveSeoInput(routePath) {
  if (!routePath || routePath === "/") {
    return {
      path: "/",
      kind: "home",
      title: SEO_CONSTANTS.SITE_NAME,
      description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
      image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
      author: SEO_CONSTANTS.DEFAULT_AUTHOR,
    };
  }

  // Handle blog post routes
  if (routePath.startsWith("/blog/")) {
    const slug = routePath.replace("/blog/", "");
    const post = blogPosts.find(p => p.slug === slug);
    if (post) {
      return {
        path: routePath,
        kind: "post",
        title: post.title,
        description: post.excerpt,
        image: post.coverImage,
        imageAlt: post.imageAlt,
        author: post.author,
        published: post.date,
        tags: post.tags,
      };
    }
  }

  // Handle project routes
  if (routePath.startsWith("/project/")) {
    const projectId = routePath.replace("/project/", "");
    return {
      path: routePath,
      kind: "project",
      title: `${projectId.charAt(0).toUpperCase() + projectId.slice(1)} Case Study - ${SEO_CONSTANTS.SITE_NAME}`,
      description: `${SEO_CONSTANTS.DEFAULT_DESCRIPTION}`,
      author: SEO_CONSTANTS.DEFAULT_AUTHOR,
    };
  }

  // Static page routes
  const staticPages = {
    "/about": {
      title: `About - ${SEO_CONSTANTS.SITE_NAME}`,
      description: "Senior Product Designer with 15+ years of experience creating data-driven, AI-powered, and mobile-first digital platforms.",
    },
    "/projects": {
      title: `Projects - ${SEO_CONSTANTS.SITE_NAME}`,
      description: "Design case studies showcasing impact, outcomes, and process across fintech, healthcare, and SaaS products.",
    },
    "/services": {
      title: `Services - ${SEO_CONSTANTS.SITE_NAME}`,
      description: "Product design and Gen AI development services to transform your digital products with user-centered design.",
    },
    "/contact": {
      title: `Contact - ${SEO_CONSTANTS.SITE_NAME}`,
      description: "Get in touch to discuss your next product design or AI development project.",
    },
    "/blog": {
      title: `Blog - ${SEO_CONSTANTS.SITE_NAME}`,
      description: "Design insights and case studies - thoughts on UX, AI, and design strategy.",
    }
  };

  if (staticPages[routePath]) {
    return {
      path: routePath,
      kind: "page",
      ...staticPages[routePath],
    };
  }

  // Generic fallback
  const cleanPath = typeof routePath === "string" ? routePath : "/";
  return {
    path: cleanPath,
    kind: "page",
    title: `${SEO_CONSTANTS.SITE_NAME}`,
    description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
  };
}

export async function getAllRoutes() {
  const routes = [
    "/",
    "/about", 
    "/projects",
    "/services",
    "/contact",
    "/blog"
  ];

  // Add blog post routes
  blogPosts.forEach(post => {
    routes.push(`/blog/${post.slug}`);
  });

  // Add common project routes (hardcoded to avoid complex dependencies)
  const commonProjects = ["herbalink", "splittime", "business-management", "investor-loan-app"];
  commonProjects.forEach(project => {
    routes.push(`/project/${project}`);
  });

  return routes;
}

// Legacy exports for backwards compatibility
export function getStaticPageSEO(routePath) {
  const staticPages = {
    "/about": {
      kind: "page",
      title: `About - ${SEO_CONSTANTS.SITE_NAME}`,
      description: "Senior Product Designer with 15+ years of experience creating data-driven, AI-powered, and mobile-first digital platforms.",
    },
    "/projects": {
      kind: "page", 
      title: `Projects - ${SEO_CONSTANTS.SITE_NAME}`,
      description: "Design case studies showcasing impact, outcomes, and process across fintech, healthcare, and SaaS products.",
    },
    "/services": {
      kind: "page",
      title: `Services - ${SEO_CONSTANTS.SITE_NAME}`,
      description: "Product design and Gen AI development services to transform your digital products with user-centered design.",
    },
    "/contact": {
      kind: "page",
      title: `Contact - ${SEO_CONSTANTS.SITE_NAME}`,
      description: "Get in touch to discuss your next product design or AI development project.",
    },
    "/blog": {
      kind: "page",
      title: `Blog - ${SEO_CONSTANTS.SITE_NAME}`,
      description: "Design insights and case studies - thoughts on UX, AI, and design strategy.",
    }
  };
  
  return staticPages[routePath] || null;
}

export function getProjectSEO(projectId) {
  return {
    kind: "project",
    title: `${projectId.charAt(0).toUpperCase() + projectId.slice(1)} Case Study`,
    description: `${SEO_CONSTANTS.DEFAULT_DESCRIPTION}`,
    author: SEO_CONSTANTS.DEFAULT_AUTHOR,
  };
}

export function getBlogSEO(slug) {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return null;
  
  return {
    kind: "post",
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    imageAlt: post.imageAlt,
    author: post.author,
    published: post.date,
    tags: post.tags,
  };
}
