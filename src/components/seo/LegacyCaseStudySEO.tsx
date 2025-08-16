
import React from "react";
import { Helmet } from "react-helmet-async";

interface LegacySEOData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  path: string;
}

interface LegacyCaseStudySEOProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  path: string;
}

const LegacyCaseStudySEO: React.FC<LegacyCaseStudySEOProps> = ({
  title,
  description,
  image,
  tags,
  path
}) => {
  const siteUrl = "https://barskydesign.pro";
  const fullUrl = `${siteUrl}${path}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title} | Hiram Barsky - UX Designer</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Hiram Barsky - UX Designer" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Article Meta */}
      <meta property="article:author" content="Hiram Barsky" />
      <meta property="article:section" content="Case Study" />
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "description": description,
          "image": fullImageUrl,
          "author": {
            "@type": "Person",
            "name": "Hiram Barsky"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Hiram Barsky Design",
            "logo": {
              "@type": "ImageObject",
              "url": `${siteUrl}/images/profile-photo.jpg`
            }
          },
          "url": fullUrl,
          "keywords": tags.join(", ")
        })}
      </script>
    </Helmet>
  );
};

export default LegacyCaseStudySEO;
