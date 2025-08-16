
interface SEOData {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export const generateStructuredData = (seoData: SEOData) => {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": seoData.type === 'article' ? "Article" : "WebPage",
    name: seoData.title,
    description: seoData.description,
    url: seoData.canonical,
    ...(seoData.image && { image: seoData.image })
  };

  if (seoData.type === 'article') {
    return {
      ...baseStructuredData,
      "@type": "Article",
      headline: seoData.title,
      ...(seoData.publishedTime && { datePublished: seoData.publishedTime }),
      ...(seoData.modifiedTime && { dateModified: seoData.modifiedTime }),
      ...(seoData.author && { 
        author: {
          "@type": "Person",
          name: seoData.author
        }
      }),
      ...(seoData.tags && { keywords: seoData.tags.join(', ') })
    };
  }

  return baseStructuredData;
};
