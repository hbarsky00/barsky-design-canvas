import React from "react";
import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description: string;
  image?: string;
  slug: string;
}

const ProjectSeo: React.FC<Props> = ({ title, description, image, slug }) => {
  const url = `https://barskydesign.pro/project/${slug}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default ProjectSeo;
