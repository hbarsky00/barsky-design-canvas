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

/**
 * Google truncates titles around 60-62 characters. 20 of the 52 pages ran over,
 * and every single one was pushed over by the " — Barsky Design" suffix alone —
 * the headline itself always fit. So drop the suffix rather than reword: the
 * headline is the part that earns the click, and Google appends the site name
 * itself anyway.
 *
 * Lives in buildSEO because both the static injector (inject-seo-html.ts) and
 * the runtime component (UnifiedSEO) call it — putting the rule anywhere else
 * would let the prerendered title and the hydrated one drift apart.
 */
const TITLE_BUDGET = 62;
const fitTitle = (title: string): string => {
  if (title.length <= TITLE_BUDGET) return title;
  const suffix = ` — ${SEO_CONSTANTS.BRAND}`;
  return title.endsWith(suffix) ? title.slice(0, -suffix.length) : title;
};

export function buildSEO(input: SEOInput): BuiltSEO {
  // Normalize canonical URL - ensure homepage gets trailing slash, others don't
  let canonicalPath = input.path.replace(/[?#].*$/, "");
  
  // Remove trailing slash for non-root paths for consistency
  if (canonicalPath !== '/' && canonicalPath.endsWith('/')) {
    canonicalPath = canonicalPath.slice(0, -1);
  }
  
  // Build canonical - homepage should be baseUrl/ (with trailing slash)
  const canonical = canonicalPath === '/' 
    ? `${SEO_CONSTANTS.BASE_URL}/`
    : `${SEO_CONSTANTS.BASE_URL}${canonicalPath}`;
    
  const isArticle = input.kind === "project" || input.kind === "post";
  const imageAbs = toAbs(input.image) ?? SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE;

  return {
    title: fitTitle(input.title ?? SEO_CONSTANTS.SITE_NAME),
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