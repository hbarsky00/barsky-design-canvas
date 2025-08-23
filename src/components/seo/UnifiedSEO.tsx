
import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { fetchPageMetadata, fetchBlogPost } from "@/hooks/database/operations";
import { normalizeUrl } from "@/utils/seo/canonicalUtils";
import { generateStructuredData } from "@/utils/seo/structuredDataUtils";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

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
  
  // Generate immediate canonical URL with enhanced debugging
  const immediateCanonical = useMemo(() => {
    const pathname = location?.pathname || '/';
    const canonical = normalizeUrl(pathname);
    
    // Enhanced debugging for canonical generation
    console.log('🔥 CANONICAL DEBUG - IMMEDIATE GENERATION:', {
      pathname,
      canonical,
      locationExists: !!location,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'SSR',
      isLinkedInBot: typeof navigator !== 'undefined' && navigator.userAgent.includes('LinkedInBot'),
      isScraper: typeof navigator !== 'undefined' && /bot|crawler|spider|scraper/i.test(navigator.userAgent)
    });
    
    return canonical;
  }, [location?.pathname]);

  // Initialize seoData with immediate canonical URL and project data
  const [seoData, setSeoData] = useState<SEOData>(() => {
    const pathname = location?.pathname || '/';
    
    // Check if this is a project page and load structured case study data immediately
    if (pathname.startsWith('/project/')) {
      const projectId = pathname.replace('/project/', '').replace('/', '');
      const caseStudyData = getStructuredCaseStudy(projectId);
      
      if (caseStudyData) {
        const projectSeoData = {
          title: caseStudyData.title,
          description: caseStudyData.description,
          canonical: immediateCanonical,
          image: caseStudyData.seoData?.image || "https://barskydesign.pro/images/profile-hero.jpg",
          type: 'website' as const
        };
        
        console.log('🚀 UnifiedSEO - IMMEDIATE PROJECT SEO DATA:', {
          ...projectSeoData,
          projectId,
          timestamp: new Date().toISOString(),
          note: "IMMEDIATE PROJECT DATA - Available for scrapers on first render"
        });
        
        return projectSeoData;
      }
    }
    
    // Default data for non-project pages or fallback
    const initialData = {
      title: "Hiram Barsky — Product Design & AI",
      description: "15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration.",
      canonical: immediateCanonical,
      image: "https://barskydesign.pro/images/profile-hero.jpg",
      type: 'website' as const
    };
    
    console.log('🚀 UnifiedSEO - INITIAL SEO DATA:', {
      ...initialData,
      timestamp: new Date().toISOString(),
      note: "IMMEDIATE - Available for scrapers on first render"
    });
    
    return initialData;
  });

  useEffect(() => {
    const loadSEOData = async () => {
      const pathname = location?.pathname || '/';
      
      console.log('🔍 ENHANCED SEO LOADING DEBUG:', {
        pathname,
        immediateCanonical,
        currentSeoCanonical: seoData.canonical,
        timestamp: new Date().toISOString(),
        loadingStarted: true
      });

      try {
        let enhancedSeoData: SEOData = {
          title: "Hiram Barsky — Product Design & AI",
          description: "15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration.",
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
          // Handle project pages first
          if (pathname.startsWith('/project/')) {
            const projectId = pathname.replace('/project/', '').replace('/', '');
            console.log('🎯 Loading project page SEO for:', projectId);
            
            // Try to get structured case study data
            const caseStudyData = getStructuredCaseStudy(projectId);
            
            if (caseStudyData) {
              enhancedSeoData = {
                title: caseStudyData.title,
                description: caseStudyData.description,
                canonical: normalizeUrl(pathname),
                image: caseStudyData.seoData?.image || enhancedSeoData.image,
                type: 'website'
              };
              console.log('✨ Using structured case study SEO data for project:', projectId);
            } else {
              // Fallback to generic project data
              enhancedSeoData.canonical = normalizeUrl(pathname);
              console.log('⚠️ No structured case study found for project:', projectId);
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
        }

        console.log('✅ FINAL SEO DATA COMPLETE:', {
          ...enhancedSeoData,
          timestamp: new Date().toISOString(),
          canonicalChanged: enhancedSeoData.canonical !== seoData.canonical,
          previousCanonical: seoData.canonical,
          newCanonical: enhancedSeoData.canonical
        });
        
        setSeoData(enhancedSeoData);

      } catch (error) {
        console.error('❌ SEO DATA ERROR - FALLING BACK TO IMMEDIATE CANONICAL:', {
          error,
          pathname,
          fallbackCanonical: immediateCanonical,
          timestamp: new Date().toISOString()
        });
        
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

  // Final debug before render
  console.log('🎯 FINAL RENDER - CANONICAL URL:', {
    canonical: seoData.canonical,
    title: seoData.title,
    pathname: location?.pathname,
    timestamp: new Date().toISOString(),
    renderNumber: Math.random()
  });

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={seoData.canonical} />
      
      {/* Force scrapers to see canonical immediately */}
      <meta property="og:url" content={seoData.canonical} />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      
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
