import { SEO_CONSTANTS } from "./seoConstants.js";

const toAbs = (u) =>
  !u ? undefined : u.startsWith("http") ? u : `${SEO_CONSTANTS.BASE_URL}${u.startsWith("/") ? u : `/${u}`}`;

export function buildSEO(input) {
  const canonical = `${SEO_CONSTANTS.BASE_URL}${input.path}`.replace(/[?#].*$/, "").replace(/\/{2,}/g, "/");
  const isArticle = input.kind === "project" || input.kind === "post";
  const image = toAbs(input.image) ?? SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE;

  return {
    title: input.title ?? SEO_CONSTANTS.SITE_NAME,
    description: input.description ?? SEO_CONSTANTS.DEFAULT_DESCRIPTION,
    canonical,
    type: isArticle ? "article" : "website",
    siteName: SEO_CONSTANTS.SITE_NAME,
    robots: input.robots ?? "index,follow",
    image,
    imageAlt: input.imageAlt ?? `${input.title ?? SEO_CONSTANTS.SITE_NAME} preview image`,
    imageWidth: 1200,
    imageHeight: 630,
    twitterCard: "summary_large_image",
    twitterSite: SEO_CONSTANTS.TWITTER_HANDLE,
    author: isArticle ? (input.author ?? SEO_CONSTANTS.DEFAULT_AUTHOR) : undefined,
    tags: isArticle ? input.tags : undefined,
    publishedTime: isArticle ? input.published : undefined,
    modifiedTime: isArticle ? input.modified : undefined
  };
}
