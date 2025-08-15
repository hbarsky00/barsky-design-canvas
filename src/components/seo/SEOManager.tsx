
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title: string;
  description: string;
  image: string;
  type: 'website' | 'article';
  url: string;
}

const SEOManager: React.FC = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState<SEOData | null>(null);

  useEffect(() => {
    const generateSEOData = (): SEOData => {
      const baseUrl = 'https://barskydesign.pro';
      const currentUrl = `${baseUrl}${location.pathname}`;
      
      // Detect hero image from page content
      const detectHeroImage = (): string => {
        // Look for video thumbnail first (case studies)
        const videoElement = document.querySelector('video');
        if (videoElement?.poster) {
          return videoElement.poster.startsWith('http') ? videoElement.poster : `${baseUrl}/${videoElement.poster}`;
        }
        
        // Look for hero section images
        const heroImage = document.querySelector('[data-hero-image] img, .hero img, section:first-of-type img');
        if (heroImage) {
          const src = heroImage.getAttribute('src');
          if (src) {
            return src.startsWith('http') ? src : `${baseUrl}${src}`;
          }
        }
        
        // Look for featured images (blog posts)
        const featuredImage = document.querySelector('[data-featured-image]');
        if (featuredImage) {
          const src = featuredImage.getAttribute('data-src') || featuredImage.getAttribute('src');
          if (src) {
            return src.startsWith('http') ? src : `${baseUrl}${src}`;
          }
        }
        
        // Fallback to neutral default
        return `${baseUrl}/images/default-og.jpg`;
      };

      // Generate page-specific SEO data
      if (location.pathname === '/') {
        return {
          title: 'Hiram Barsky - Product Designer & Gen AI Developer',
          description: '15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration for startups and enterprises.',
          image: detectHeroImage(),
          type: 'website',
          url: currentUrl
        };
      }

      if (location.pathname.startsWith('/project/')) {
        const h1 = document.querySelector('h1');
        const firstP = document.querySelector('h1 + p, .hero p, section p');
        
        return {
          title: h1?.textContent?.trim() || 'Case Study | Hiram Barsky Design',
          description: firstP?.textContent?.trim()?.substring(0, 160) + '...' || 'Product design case study showcasing UX research, design process, and AI-enhanced solutions.',
          image: detectHeroImage(),
          type: 'article',
          url: currentUrl
        };
      }

      if (location.pathname.startsWith('/blog/')) {
        const h1 = document.querySelector('h1');
        const excerpt = document.querySelector('.excerpt, .lead, h1 + p');
        
        return {
          title: h1?.textContent?.trim() || 'Blog Post | Hiram Barsky Design',
          description: excerpt?.textContent?.trim()?.substring(0, 160) + '...' || 'Insights on product design, UX research, and AI integration in digital product development.',
          image: detectHeroImage(),
          type: 'article',
          url: currentUrl
        };
      }

      // Default for other pages
      const h1 = document.querySelector('h1');
      const firstP = document.querySelector('h1 + p, section p');
      
      return {
        title: h1?.textContent?.trim() || 'Hiram Barsky Design',
        description: firstP?.textContent?.trim()?.substring(0, 160) + '...' || 'Expert product design and Gen AI development services.',
        image: detectHeroImage(),
        type: 'website',
        url: currentUrl
      };
    };

    // Small delay to ensure DOM is rendered
    const timer = setTimeout(() => {
      setSeoData(generateSEOData());
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!seoData) return null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={seoData.url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={seoData.url} />
      <meta property="og:type" content={seoData.type} />
      <meta property="og:site_name" content="Hiram Barsky Design" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />
      <meta name="twitter:site" content="@hirambarsky" />
      
      {/* Additional SEO */}
      <meta name="author" content="Hiram Barsky" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEOManager;
