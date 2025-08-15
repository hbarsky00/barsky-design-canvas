
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface SEOData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: 'website' | 'article';
}

/**
 * Safe SEO Manager - Handles meta tags without affecting page layouts
 * Completely isolated from case study structure
 */
const SafeSEOManager: React.FC = () => {
  const location = useLocation();
  const [seoData, setSeoData] = React.useState<SEOData | null>(null);

  useEffect(() => {
    const generateSEOData = (): SEOData => {
      const currentUrl = `https://barskydesign.pro${location.pathname}`;
      const path = location.pathname;

      // Case study pages
      if (path.startsWith('/project/')) {
        const projectId = path.split('/')[2];
        
        const projectSEOMap: Record<string, SEOData> = {
          'herbalink': {
            title: '3x More Bookings: How I Connected Users to Certified Herbalists',
            description: 'Connected users to certified herbalists across the country and increased booking rates by 3x through improved UX design.',
            image: 'https://barskydesign.pro/images/herbalink-promo.png',
            url: currentUrl,
            type: 'article'
          },
          'investment-app': {
            title: '23% More Engagement: Making Investing Accessible to Beginners',
            description: 'Helped users track, plan, and grow their investments, leading to 23% increase in portfolio engagement through intuitive design.',
            image: 'https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png',
            url: currentUrl,
            type: 'article'
          },
          'splittime': {
            title: '40% Less Conflict: Designing Neutral Co-Parenting Tools',
            description: 'Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools designed for family courts.',
            image: 'https://barskydesign.pro/images/desktop-signup-1.png',
            url: currentUrl,
            type: 'article'
          },
          'business-management': {
            title: '68% Fewer Errors: Streamlining Enterprise Operations',
            description: 'Improved internal operations and reduced manual entry errors by 68% with one central tool for business management.',
            image: 'https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png',
            url: currentUrl,
            type: 'article'
          }
        };

        return projectSEOMap[projectId] || {
          title: 'Project Case Study - Hiram Barsky Design',
          description: 'Explore this project case study showcasing UX design and development solutions.',
          image: 'https://barskydesign.pro/images/og-default.jpg',
          url: currentUrl,
          type: 'article'
        };
      }

      // Blog posts
      if (path.startsWith('/blog/')) {
        return {
          title: 'Blog Post - Hiram Barsky Design',
          description: 'Read insights on UX design, AI integration, and product development.',
          image: 'https://barskydesign.pro/images/og-default.jpg',
          url: currentUrl,
          type: 'article'
        };
      }

      // Homepage and other pages
      return {
        title: 'Hiram Barsky Design - Product Designer & Gen AI Developer',
        description: '15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration.',
        image: 'https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png',
        url: currentUrl,
        type: 'website'
      };
    };

    setSeoData(generateSEOData());
  }, [location.pathname]);

  if (!seoData) return null;

  return (
    <Helmet>
      {/* Core Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={seoData.url} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoData.title} data-seo-managed="true" />
      <meta property="og:description" content={seoData.description} data-seo-managed="true" />
      <meta property="og:url" content={seoData.url} data-seo-managed="true" />
      <meta property="og:type" content={seoData.type} data-seo-managed="true" />
      <meta property="og:image" content={seoData.image} data-seo-managed="true" />
      <meta property="og:image:width" content="1200" data-seo-managed="true" />
      <meta property="og:image:height" content="630" data-seo-managed="true" />
      <meta property="og:site_name" content="Hiram Barsky Design" data-seo-managed="true" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" data-seo-managed="true" />
      <meta name="twitter:title" content={seoData.title} data-seo-managed="true" />
      <meta name="twitter:description" content={seoData.description} data-seo-managed="true" />
      <meta name="twitter:image" content={seoData.image} data-seo-managed="true" />
      <meta name="twitter:site" content="@hirambarsky" data-seo-managed="true" />
      <meta name="twitter:creator" content="@hirambarsky" data-seo-managed="true" />
      
      {/* Additional Tags */}
      <meta name="author" content="Hiram Barsky" data-seo-managed="true" />
      <meta name="robots" content="index, follow" data-seo-managed="true" />
    </Helmet>
  );
};

export default SafeSEOManager;
