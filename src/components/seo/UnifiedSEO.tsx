
import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { fetchPageMetadata, fetchBlogPost } from "@/hooks/database/operations";
import { normalizeUrl } from "@/utils/seo/canonicalUtils";
import { generateStructuredData } from "@/utils/seo/structuredDataUtils";

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

const UnifiedSEO: React.FC = () => {
  const location = useLocation();
  
  // Generate immediate canonical URL safely
  const immediateCanonical = useMemo(() => {
    // Ensure location and pathname exist before accessing
    if (!location || !location.pathname) {
      return 'https://barskydesign.pro/';
    }
    return normalizeUrl(location.pathname);
  }, [location?.pathname]);

  // Initialize seoData with immediate canonical URL
  const [seoData, setSeoData] = useState<SEOData>(() => ({
    title: "Hiram Barsky - UX/UI Designer & Developer",
    description: "Professional UX/UI design and development services by Hiram Barsky. Specializing in user-centered design and modern web applications.",
    canonical: immediateCanonical,
    image: "https://barskydesign.pro/images/profile-hero.jpg",
    type: 'website'
  }));

  console.log('🚀 UnifiedSEO - IMMEDIATE CANONICAL GENERATED:', {
    pathname: location?.pathname || 'undefined',
    canonical: immediateCanonical,
    timestamp: new Date().toISOString(),
    note: "Available on first render for scrapers"
  });

  useEffect(() => {
    const loadSEOData = async () => {
      // Additional safety check
      if (!location || !location.pathname) {
        console.warn('⚠️ UnifiedSEO: location or pathname not available yet');
        return;
      }

      const pathname = location.pathname;
      console.log('🔍 UnifiedSEO: Loading SEO data for:', pathname);

      try {
        let enhancedSeoData: SEOData = {
          title: "Hiram Barsky - UX/UI Designer & Developer",
          description: "Professional UX/UI design and development services by Hiram Barsky. Specializing in user-centered design and modern web applications.",
          canonical: immediateCanonical,
          image: "https://barskydesign.pro/images/profile-hero.jpg",
          type: 'website'
        };

        // Handle blog posts
        if (pathname.startsWith('/blog/') && pathname !== '/blog') {
          const slug = pathname.replace('/blog/', '');
          console.log('📝 Loading blog post SEO for slug:', slug);
          
          const blogPost = await fetchBlogPost(slug);
          if (blogPost) {
            enhancedSeoData = {
              title: blogPost.title,
              description: blogPost.excerpt || enhancedSeoData.description,
              canonical: normalizeUrl(pathname),
              image: blogPost.featured_image || enhancedSeoData.image,
              type: 'article',
              publishedTime: blogPost.created_at,
              modifiedTime: blogPost.updated_at,
              author: "Hiram Barsky",
              tags: blogPost.tags
            };
          }
        } else {
          // Handle other pages
          console.log('📄 Loading page metadata for:', pathname);
          const pageMetadata = await fetchPageMetadata(pathname);
          
          if (pageMetadata) {
            enhancedSeoData = {
              title: pageMetadata.seo_title,
              description: pageMetadata.seo_description,
              canonical: normalizeUrl(pathname),
              image: pageMetadata.featured_image || enhancedSeoData.image,
              type: 'website'
            };
          } else {
            // Update canonical for pages without database entries
            enhancedSeoData.canonical = normalizeUrl(pathname);
          }
        }

        console.log('✅ UnifiedSEO: Final SEO data:', enhancedSeoData);
        setSeoData(enhancedSeoData);

      } catch (error) {
        console.error('❌ UnifiedSEO: Error loading SEO data:', error);
        // On error, at least update the canonical URL
        setSeoData(prev => ({
          ...prev,
          canonical: immediateCanonical
        }));
      }
    };

    loadSEOData();
  }, [location?.pathname, immediateCanonical]);

  const structuredData = generateStructuredData(seoData);

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={seoData.canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:url" content={seoData.canonical} />
      <meta property="og:type" content={seoData.type} />
      {seoData.image && <meta property="og:image" content={seoData.image} />}
      
      {/* Article specific meta tags */}
      {seoData.type === 'article' && (
        <>
          {seoData.publishedTime && <meta property="article:published_time" content={seoData.publishedTime} />}
          {seoData.modifiedTime && <meta property="article:modified_time" content={seoData.modifiedTime} />}
          {seoData.author && <meta property="article:author" content={seoData.author} />}
          {seoData.tags && seoData.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      {seoData.image && <meta name="twitter:image" content={seoData.image} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default UnifiedSEO;
