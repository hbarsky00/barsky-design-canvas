import { SEO_CONSTANTS } from "../utils/seo/seoConstants.js";

// Minimal, build-safe SEO data resolvers for prerender. Extend later to include all routes.
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

  // Generic fallback for non-home routes to avoid build failures
  const cleanPath = typeof routePath === "string" ? routePath : "/";
  return {
    path: cleanPath,
    kind: "page",
    title: `${SEO_CONSTANTS.SITE_NAME}`,
    description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
  };
}

export async function getAllRoutes() {
  // Minimal set to keep build green. Can be expanded to include all site routes.
  return ["/"];
}
