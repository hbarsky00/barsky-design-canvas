
import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { normalizeUrl } from "@/utils/seo/canonicalUtils";
import { generateStructuredData } from "@/utils/seo/structuredDataUtils";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";
import { SEO_CONSTANTS } from "@/utils/seoConstants";

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

// Local SEO data map for static pages
const staticPageSEO: Record<string, Partial<SEOData>> = {
  '/': {
    title: "Senior Product Designer & AI Strategist — Hiram Barsky",
    description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
    image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE
  },
  '/blog': {
    title: "Design & AI Insights — Hiram Barsky",
    description: "Thoughts on UX design, AI integration, and digital product strategy from 15+ years in the field."
  },
  '/about': {
    title: "About Hiram Barsky — Senior Product Designer & AI Strategist",
    description: "Learn about my 15+ year journey designing AI-enhanced digital experiences and strategic product solutions."
  }
};

const UnifiedSEO: React.FC = () => {
  const location = useLocation();
  
  // Generate SEO data completely synchronously using only local data
  const seoData = useMemo(() => {
    const pathname = location?.pathname || '/';
    const canonical = normalizeUrl(pathname);
    
    console.log('🔒 SEO LOCKED - SYNCHRONOUS ONLY:', {
      pathname,
      canonical,
      timestamp: new Date().toISOString(),
      note: "NO DATABASE CALLS - 100% SYNCHRONOUS"
    });
    
    // Handle project pages with structured case studies
    if (pathname.startsWith('/project/')) {
      const projectId = pathname.replace('/project/', '').replace('/', '');
      const caseStudyData = getStructuredCaseStudy(projectId);
      
      if (caseStudyData) {
        const projectSeoData = {
          title: caseStudyData.title,
          description: caseStudyData.description,
          canonical,
          image: caseStudyData.seoData?.image || SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
          type: 'website' as const
        };
        
        console.log('✨ PROJECT SEO DATA (SYNC):', {
          ...projectSeoData,
          projectId,
          imageAbsolute: projectSeoData.image?.startsWith('http')
        });
        
        return projectSeoData;
      }
      
      // Fallback for unknown projects
      return {
        title: `Project: ${projectId} — Hiram Barsky`,
        description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
        canonical,
        image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
        type: 'website' as const
      };
    }
    
    // Handle static pages from local map
    const staticSeo = staticPageSEO[pathname];
    if (staticSeo) {
      const result = {
        title: staticSeo.title || SEO_CONSTANTS.SITE_NAME,
        description: staticSeo.description || SEO_CONSTANTS.DEFAULT_DESCRIPTION,
        canonical,
        image: staticSeo.image || SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
        type: 'website' as const
      };
      
      console.log('📄 STATIC PAGE SEO (SYNC):', result);
      return result;
    }
    
    // Default fallback
    const defaultData = {
      title: SEO_CONSTANTS.SITE_NAME,
      description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
      canonical,
      image: SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE,
      type: 'website' as const
    };
    
    console.log('🔄 DEFAULT SEO (SYNC):', defaultData);
    return defaultData;
  }, [location?.pathname]);

  const structuredData = generateStructuredData(seoData);

  console.log('🎯 FINAL SEO RENDER:', {
    canonical: seoData.canonical,
    title: seoData.title,
    hasImage: !!seoData.image,
    imageAbsolute: seoData.image?.startsWith('http'),
    pathname: location?.pathname
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
      
      {/* Article specific meta tags - not used in current synchronous implementation */}
      
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
