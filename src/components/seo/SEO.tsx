
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  type: 'website' | 'article';
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  publishedDate?: string;
  tags?: string[];
}

const DEFAULT_IMAGE = 'https://barskydesign.pro/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png';

const SEO: React.FC<SEOProps> = ({
  type,
  title,
  description,
  url,
  image = DEFAULT_IMAGE,
  author = 'Hiram Barsky',
  publishedDate,
  tags = []
}) => {
  // Ensure absolute URLs
  const absoluteUrl = url.startsWith('http') ? url : `https://barskydesign.pro${url}`;
  const absoluteImage = image.startsWith('http') ? image : `https://barskydesign.pro${image}`;

  // Generate JSON-LD based on type
  const generateJsonLd = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "name": title,
      "description": description,
      "url": absoluteUrl,
      "image": absoluteImage,
      "author": {
        "@type": "Person",
        "name": author
      }
    };

    switch (type) {
      case 'article':
        return {
          "@type": "Article",
          ...baseSchema,
          "headline": title,
          "datePublished": publishedDate,
          "keywords": tags.join(', '),
          "publisher": {
            "@type": "Organization",
            "name": "Hiram Barsky Design"
          }
        };
      
      case 'website':
      default:
        return {
          "@type": "WebSite",
          ...baseSchema
        };
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absoluteUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hiram Barsky Design" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:creator" content="@hirambarsky" />
      
      {/* Additional meta */}
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      
      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(generateJsonLd(), null, 2)}
      </script>
    </Helmet>
  );
};

export default SEO;
