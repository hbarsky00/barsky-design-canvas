import { SEO_CONSTANTS } from "@/utils/seoConstants";

export type SEOInput = {
  path: string;               // e.g. "/project/herbalink"
  kind: "home" | "page" | "project" | "post";
  title?: string;
  description?: string;
  image?: string;             // absolute preferred; fallback handled here
  imageAlt?: string;
  author?: string;
  tags?: string[];
  published?: string;         // ISO
  modified?: string;          // ISO
};

export function toAbs(url?: string): string {
  if (!url) return SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE;
  return url.startsWith("http") 
    ? url 
    : `${SEO_CONSTANTS.BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export function buildSEO(input: SEOInput) {
  const canonical = `${SEO_CONSTANTS.BASE_URL}${input.path}`.replace(/[?#].*$/, "");
  const isArticle = input.kind === "project" || input.kind === "post";
  const image = toAbs(input.image) ?? SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE;
  const imageAlt = input.imageAlt ?? `${input.title ?? SEO_CONSTANTS.SITE_NAME} preview image`;

  // Development guardrails
  if (process.env.NODE_ENV === 'development') {
    // Validate description length
    if (input.description && input.description.length < 100) {
      console.warn(`⚠️ SEO Warning: Description too short (${input.description.length} chars) for ${input.path}`);
    }

    // Validate image is absolute
    if (input.image && !input.image.startsWith('http')) {
      console.warn(`⚠️ SEO Warning: Image not absolute URL for ${input.path}: ${input.image}`);
    }

    // Validate required fields
    if (!input.title) {
      console.warn(`⚠️ SEO Warning: Missing title for ${input.path}`);
    }
    if (!input.description) {
      console.warn(`⚠️ SEO Warning: Missing description for ${input.path}`);
    }
  }

  return {
    // core
    title: input.title ?? SEO_CONSTANTS.SITE_NAME,
    description: input.description ?? SEO_CONSTANTS.DEFAULT_DESCRIPTION,
    canonical,
    type: isArticle ? "article" as const : "website" as const,

    // image
    image,
    imageAlt,

    // article fields
    publishedTime: isArticle ? input.published : undefined,
    modifiedTime: isArticle ? input.modified : undefined,
    author: isArticle ? (input.author ?? SEO_CONSTANTS.AUTHOR) : undefined,
    tags: isArticle ? input.tags : undefined,
  };
}