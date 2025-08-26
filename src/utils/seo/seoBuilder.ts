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
  robots?: string;
};

export type BuiltSEO = {
  title: string;
  description: string;
  canonical: string;
  type: 'website' | 'article';
  siteName?: string;
  robots?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  author?: string;
  tags?: string[];
  publishedTime?: string;
  modifiedTime?: string;
};

export function toAbs(url?: string): string {
  if (!url) return SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE;
  return url.startsWith("http") 
    ? url 
    : `${SEO_CONSTANTS.BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export function buildSEO(input: SEOInput): BuiltSEO {
  const canonical = `${SEO_CONSTANTS.BASE_URL}${input.path}`.replace(/[?#].*$/, "");
  const isArticle = input.kind === "project" || input.kind === "post";
  const imageAbs = toAbs(input.image) ?? SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE;

  return {
    title: input.title ?? SEO_CONSTANTS.SITE_NAME,
    description: input.description ?? SEO_CONSTANTS.DEFAULT_DESCRIPTION,
    canonical,
    type: isArticle ? 'article' : 'website',

    // All fields from builder - no hardcoding elsewhere
    siteName: SEO_CONSTANTS.SITE_NAME,
    robots: input.robots ?? 'index,follow',
    image: imageAbs,
    imageAlt: input.imageAlt ?? `${input.title ?? SEO_CONSTANTS.SITE_NAME} preview image`,
    imageWidth: 1200,
    imageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterSite: SEO_CONSTANTS.TWITTER_HANDLE,

    author: isArticle ? (input.author ?? SEO_CONSTANTS.AUTHOR) : undefined,
    tags: isArticle ? input.tags : undefined,
    publishedTime: isArticle ? input.published : undefined,
    modifiedTime: isArticle ? input.modified : undefined,
  };
}