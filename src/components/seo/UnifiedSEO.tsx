import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { usePageMetadata } from '@/hooks/usePageMetadata';
import { SEO_CONSTANTS } from '@/utils/seoConstants';
import { getStructuredCaseStudy } from '@/data/structuredCaseStudies';
import { normalizeUrl } from '@/utils/urlUtils';

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

  useEffect(() => {
    const generateSEOData = () => {
      try {
        // Use normalizeUrl for consistent canonical URL generation
        const canonicalUrl = normalizeUrl(location.pathname);
        
        // Enhanced debug logging
        console.log('🔍 UnifiedSEO - CANONICAL URL GENERATION:', {
          pathname: location.pathname,
          canonicalUrl,
          baseUrl: SEO_CONSTANTS.BASE_URL,
          isOnlyCanonicalSource: true
        });
        
        // Handle case study pages specially
        if (location.pathname.startsWith('/project/')) {
          const projectId = location.pathname.split('/')[2];
          const caseStudy = getStructuredCaseStudy(projectId);
          
          if (caseStudy) {
            const data: PageSEOData = {
              title: caseStudy.title,
              description: caseStudy.description,
              image: caseStudy.seoData?.image || SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
              canonicalUrl: canonicalUrl,
              pageType: 'project',
            };
            
            data.schemaData = {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "headline": caseStudy.title,
              "description": caseStudy.description,
              "url": canonicalUrl,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": canonicalUrl
              },
              "image": {
                "@type": "ImageObject",
                "url": data.image,
                "width": 1200,
                "height": 630
              },
              "author": {
                "@type": "Person",
                "name": SEO_CONSTANTS.AUTHOR,
                "url": SEO_CONSTANTS.BASE_URL,
                "sameAs": SEO_CONSTANTS.SOCIAL_PROFILES
              },
              "publisher": {
                "@type": "Organization",
                "name": SEO_CONSTANTS.SITE_NAME,
                "url": SEO_CONSTANTS.BASE_URL
              },
              "datePublished": new Date().toISOString().split('T')[0],
              "dateModified": new Date().toISOString().split('T')[0]
            };
            
            setSeoData(data);
            document.title = `${data.title} | ${SEO_CONSTANTS.SITE_NAME}`;
            console.log('✅ UnifiedSEO - Project SEO Set:', data.title, data.canonicalUrl);
            return;
          }
        }

        // Database-first approach for other pages
        if (metadata) {
          const data: PageSEOData = {
            title: metadata.title || getDefaultTitle(location.pathname),
            description: metadata.description || getDefaultDescription(location.pathname),
            image: metadata.image || getPageImage() || SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
            canonicalUrl: canonicalUrl,
            pageType: getPageType(location.pathname),
          };
          
          data.schemaData = generateSchema(data);
          setSeoData(data);
          document.title = data.title;
          console.log('✅ UnifiedSEO - Database SEO Set:', data.title, data.canonicalUrl);
          return;
        }

        // Fallback for pages without database entries
        const fallbackData: PageSEOData = {
          title: getDefaultTitle(location.pathname),
          description: getDefaultDescription(location.pathname),
          image: getPageImage() || SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
          canonicalUrl: canonicalUrl,
          pageType: getPageType(location.pathname),
        };

        fallbackData.schemaData = generateSchema(fallbackData);
        setSeoData(fallbackData);
        document.title = fallbackData.title;
        console.log('✅ UnifiedSEO - Fallback SEO Set:', fallbackData.title, fallbackData.canonicalUrl);
        
      } catch (error) {
        console.error('❌ UnifiedSEO - SEO generation error:', error);
        // Ultimate fallback with proper URL normalization
        const fallbackCanonical = normalizeUrl(location.pathname);
        setSeoData({
          title: 'Hiram Barsky Design - Product Designer & Gen AI Developer',
          description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
          image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
          canonicalUrl: fallbackCanonical,
          pageType: 'page'
        });
      }
    };

    if (!loading) {
      generateSEOData();
    }
  }, [location.pathname, metadata, loading]);

  const getDefaultTitle = (pathname: string): string => {
    if (pathname === '/') return 'Hiram Barsky - Product Designer & Gen AI Developer';  
    if (pathname.startsWith('/blog/')) return 'Blog Post | Hiram Barsky Design';
    if (pathname === '/projects') return 'Product Design Portfolio | Hiram Barsky Design';
    if (pathname === '/services') return 'Design Services | Hiram Barsky Design';
    if (pathname === '/contact') return 'Contact | Hiram Barsky Design';
    if (pathname === '/about') return 'About | Hiram Barsky Design';
    if (pathname === '/blog') return 'UX Design Blog | Hiram Barsky Design';
    if (pathname.startsWith('/design-services/')) {
      const service = pathname.split('/').pop();
      return `${service?.replace('-', ' ')} | Hiram Barsky Design`;
    }
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
    if (pathname.startsWith('/design-services/')) return 'Professional design services and Gen AI development for digital product experiences.';
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
    if (pathname.startsWith('/project/')) return 'project';
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
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": data.canonicalUrl
      },
      "image": {
        "@type": "ImageObject",
        "url": data.image,
        "width": 1200,
        "height": 630
      },
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

  if (!seoData) return null;

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
