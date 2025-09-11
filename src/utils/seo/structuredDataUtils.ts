
interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  canonicalUrl?: string;
  image?: string;
  type?: 'website' | 'article';
  kind?: 'page' | 'post' | 'project';
  publishedTime?: string;
  published?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export const generateStructuredData = (seoData: SEOData) => {
  const canonicalUrl = seoData.canonicalUrl || seoData.canonical;
  
  const baseStructuredData: any = {
    "@context": "https://schema.org",
    "@type": seoData.type === 'article' ? "Article" : "WebPage",
    name: seoData.title,
    description: seoData.description,
    url: canonicalUrl,
    ...(seoData.image && { image: seoData.image })
  };

  // Add Organization schema for all pages
  const organizationSchema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hiram Barsky Design",
    url: "https://barskydesign.pro",
    logo: "https://barskydesign.pro/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hbarsky01@gmail.com"
    },
    founder: {
      "@type": "Person",
      name: "Hiram Barsky",
      jobTitle: "UX/UI Designer & AI Developer",
      description: "Product Designer & Gen AI Developer with 15+ years experience in fintech, healthcare, and SaaS"
    },
    serviceArea: "United States",
    priceRange: "$$$"
  };

  const schemas: any[] = [baseStructuredData, organizationSchema];

  // Add specific schemas based on content type
  if (seoData.type === 'article' || seoData.kind === 'post') {
    const blogPostSchema: any = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      ...(seoData.publishedTime && { datePublished: seoData.publishedTime }),
      ...(seoData.published && { datePublished: seoData.published }),
      ...(seoData.modifiedTime && { dateModified: seoData.modifiedTime }),
      author: {
        "@type": "Person",
        name: seoData.author || "Hiram Barsky"
      },
      ...(seoData.tags && { keywords: seoData.tags.join(', ') }),
      ...(seoData.image && { image: seoData.image })
    };
    schemas.push(blogPostSchema);
  }

  // Add Product schema for projects/case studies
  if (seoData.kind === 'project') {
    const productSchema: any = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      brand: {
        "@type": "Brand",
        name: "Hiram Barsky Design"
      },
      ...(seoData.image && { image: seoData.image })
    };
    schemas.push(productSchema);
  }

  // Add FAQ schema for homepage
  if (canonicalUrl?.includes('barskydesign.pro') && 
      !canonicalUrl?.includes('/blog/') && 
      !canonicalUrl?.includes('/project/') &&
      (canonicalUrl?.endsWith('/') || canonicalUrl?.endsWith('barskydesign.pro'))) {
    const faqSchema: any = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What makes your UX design approach different?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "I combine traditional UX research with AI-powered analytics to create data-driven designs that boost conversion by 40%+. Unlike designers who rely on assumptions, I use AI to understand user behavior patterns and optimize accordingly."
          }
        },
        {
          "@type": "Question", 
          name: "How quickly can you deliver results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most clients see measurable improvements within 2-4 weeks of implementation. My AI-enhanced design process allows for rapid iteration and testing, significantly reducing time-to-market compared to traditional design approaches."
          }
        },
        {
          "@type": "Question",
          name: "Do you work with fintech and healthcare companies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, I specialize in fintech, healthcare, and SaaS applications. I have 15+ years of experience designing compliant, user-friendly interfaces for regulated industries while maintaining high conversion rates."
          }
        }
      ]
    };
    schemas.push(faqSchema);
  }

  return schemas.length === 1 ? schemas[0] : schemas;
};
