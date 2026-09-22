import React from "react";
import { Helmet } from "react-helmet-async";
import { PROJECT_SEO_MAP } from "@/data/seoData";

interface Props {
  title: string;
  description: string;
  image?: string;
  slug: string;
  basePath?: "/project" | "/case-studies";
}

// Page-level SEO for project promo and case-study pages. PROJECT_SEO_MAP is
// the source of truth (it also feeds the prerendered static head and the
// sitemap); the props are only a fallback for slugs not in the map, so the
// tags Google renders always match the tags shipped in the static HTML.
const ProjectSeo: React.FC<Props> = ({ title, description, image, slug, basePath = "/project" }) => {
  const url = `https://barskydesign.pro${basePath}/${slug}`;
  const mapSeo = PROJECT_SEO_MAP[slug];

  const finalTitle = mapSeo
    ? (basePath === "/case-studies"
        ? mapSeo.title
        : mapSeo.title.replace(/Case Study/i, "Product Overview"))
    : title;
  const finalDescription = mapSeo
    ? (basePath === "/case-studies" ? mapSeo.description : `Product tour: ${mapSeo.description}`)
    : description;
  const finalImage = mapSeo?.image ?? image;

  return (
    <Helmet defer={false}>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      {finalImage && <meta property="og:image" content={finalImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {finalImage && <meta name="twitter:image" content={finalImage} />}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default ProjectSeo;
