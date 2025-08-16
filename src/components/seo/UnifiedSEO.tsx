
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { usePageMetadata } from '@/hooks/usePageMetadata';
import { SEO_CONSTANTS } from '@/utils/seoConstants';

interface PageSEOData {
  title: string;
  description: string;
  image: string;
  canonicalUrl: string;
  pageType: 'home' | 'project' | 'blog' | 'service' | 'page';
  schemaData?: any;
}

const UnifiedSEO: React.FC = () => {
  const location = useLocation();
  const { metadata, loading } = usePageMetadata(location.pathname);
  const [seoData, setSeoData] = useState<PageSEOData | null>(null);

  // Skip SEO for case study routes - they have their own StructuredCaseStudySEO
  const shouldSkipSEO = location.pathname.startsWith('/project/');

  useEffect(() => {
    if (shouldSkipSEO) {
      setSeoData(null);
      return;
    }

    const generateSEOData = () => {
      try {
        // Database-first approach
        if (metadata) {
          const data: PageSEOData = {
            title: metadata.title || getDefaultTitle(location.pathname),
            description: metadata.description || getDefaultDescription(location.pathname),
            image: metadata.image || getPageImage() || SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
            canonicalUrl: `${SEO_CONSTANTS.BASE_URL}${location.pathname}`,
            pageType: getPageType(location.pathname),
          };
          
          data.schemaData = generateSchema(data);
          setSeoData(data);
          document.title = data.title;
          return;
        }

        // Fallback for pages without database entries
        const fallbackData: PageSEOData = {
          title: getDefaultTitle(location.pathname),
          description: getDefaultDescription(location.pathname),
          image: getPageImage() || SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
          canonicalUrl: `${SEO_CONSTANTS.BASE_URL}${location.pathname}`,
          pageType: getPageType(location.pathname),
        };

        fallbackData.schemaData = generateSchema(fallbackData);
        setSeoData(fallbackData);
        document.title = fallbackData.title;
        
      } catch (error) {
        console.error('SEO generation error:', error);
        // Ultimate fallback
        setSeoData({
          title: 'Hiram Barsky Design - Product Designer & Gen AI Developer',
          description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
          image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
          canonicalUrl: `${SEO_CONSTANTS.BASE_URL}${location.pathname}`,
          pageType: 'page'
        });
      }
    };

    if (!loading) {
      generateSEOData();
    }
  }, [location.pathname, metadata, loading, shouldSkipSEO]);

  const getDefaultTitle = (pathname: string): string => {
    if (pathname === '/') return 'Hiram Barsky - Product Designer & Gen AI Developer';  
    if (pathname.startsWith('/blog/')) return 'Blog Post | Hiram Barsky Design';
    if (pathname === '/projects') return 'Product Design Portfolio | Hiram Barsky Design';
    if (pathname === '/services') return 'Design Services | Hiram Barsky Design';
    if (pathname === '/contact') return 'Contact | Hiram Barsky Design';
    if (pathname === '/about') return 'About | Hiram Barsky Design';
    if (pathname === '/blog') return 'UX Design Blog | Hiram Barsky Design';
    return 'Hiram Barsky Design - Product Designer & Gen AI Developer';
  };

  const getDefaultDescription = (pathname: string): string => {
    if (pathname === '/') return SEO_CONSTANTS.DEFAULT_DESCRIPTION;
    if (pathname.startsWith('/blog/')) return 'Insights on product design, UX research, and AI integration in digital product development.';
    if (pathname === '/projects') return 'Explore Product Design portfolio featuring Gen AI integration, intelligent web applications, and AI-powered user interfaces.';
    if (pathname === '/services') return 'Professional product design and Gen AI development services for startups and enterprises.';
    if (pathname === '/contact') return 'Get in touch for AI-enhanced product design services and consultation.';
    if (pathname === '/about') return 'Learn about Hiram Barsky, Product Designer and Gen AI Developer specializing in AI-enhanced user experiences.';
    if (pathname === '/blog') return 'Expert insights on AI-enhanced UX design, accessibility compliance, and conversion optimization.';
    return SEO_CONSTANTS.DEFAULT_DESCRIPTION;
  };

  const getPageImage = (): string | null => {
    // Try to find page-specific images from DOM
    const selectors = [
      '[data-featured-image] img',
      '[data-hero-image] img', 
      '.hero img',
      'section:first-of-type img'
    ];

    for (const selector of selectors) {
      const img = document.querySelector(selector) as HTMLImageElement;
      if (img?.src) {
        return img.src.startsWith('http') ? img.src : `${SEO_CONSTANTS.BASE_URL}${img.src}`;
      }
    }
    return null;
  };

  const getPageType = (pathname: string): PageSEOData['pageType'] => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/blog/')) return 'blog';
    if (pathname.includes('service')) return 'service';
    return 'page';
  };

  const generateSchema = (data: PageSEOData) => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": data.pageType === 'home' ? 'Person' : 'WebPage',
      "name": data.title,
      "description": data.description,
      "url": data.canonicalUrl,
      "image": data.image,
      "author": {
        "@type": "Person",
        "name": SEO_CONSTANTS.AUTHOR,
        "url": SEO_CONSTANTS.BASE_URL,
        "sameAs": SEO_CONSTANTS.SOCIAL_PROFILES
      }
    };

    if (data.pageType === 'home') {
      return {
        ...baseSchema,
        "@type": "Person",
        "jobTitle": "Product Designer & Gen AI Developer",
        "email": "hbarsky01@gmail.com",
        "knowsAbout": [
          "Product Design",
          "Gen AI Integration", 
          "User Experience Design",
          "AI-Enhanced Digital Products"
        ]
      };
    }

    return baseSchema;
  };

  // Don't render anything for case study routes
  if (!seoData || shouldSkipSEO) return null;

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={seoData.canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:url" content={seoData.canonicalUrl} />
      <meta property="og:type" content={seoData.pageType === 'home' ? 'website' : 'article'} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SEO_CONSTANTS.SITE_NAME} />
      <meta property="og:locale" content={SEO_CONSTANTS.LOCALE} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />
      <meta name="twitter:site" content={SEO_CONSTANTS.TWITTER_HANDLE} />
      <meta name="twitter:creator" content={SEO_CONSTANTS.TWITTER_HANDLE} />
      
      {/* LinkedIn Cache Busting */}
      <meta property="og:updated_time" content={new Date().toISOString()} />
      <meta name="linkedin:owner" content="hirambarsky" />
      
      {/* Additional SEO meta tags */}
      <meta name="author" content={SEO_CONSTANTS.AUTHOR} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="theme-color" content={SEO_CONSTANTS.THEME_COLOR} />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="language" content={SEO_CONSTANTS.LANGUAGE} />
      
      {/* JSON-LD Schema */}
      {seoData.schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(seoData.schemaData, null, 2)}
        </script>
      )}
    </Helmet>
  );
};

export default UnifiedSEO;
