
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
  '/projects': {
    title: `Case Studies & Projects — ${SEO_CONSTANTS.SITE_NAME}`,
    description: 'Explore selected work in product design, UX, and AI.'
  },
  '/services': {
    title: `Design & AI Services — ${SEO_CONSTANTS.SITE_NAME}`,
    description: 'UX research, design systems, and AI integration services.'
  },
  '/contact': {
    title: `Contact — ${SEO_CONSTANTS.SITE_NAME}`,
    description: 'Get in touch to discuss product design, UX, and AI initiatives.'
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
    // Handle redirects/aliases before processing
    const aliases: Record<string, string> = {
      '/project/wholesale-distribution': '/project/business-management'
    };
    const rawPathname = location?.pathname || '/';
    const pathname = aliases[rawPathname] || rawPathname;
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

      const ensureAbsolute = (img?: string) => {
        if (!img) return SEO_CONSTANTS.DEFAULT_PROFILE_IMAGE;
        return img.startsWith('http') ? img : `${SEO_CONSTANTS.BASE_URL}${img.startsWith('/') ? img : `/${img}`}`;
      };
      
      if (caseStudyData) {
        const projectSeoData = {
          title: caseStudyData.title,
          description: caseStudyData.description,
          canonical,
          image: ensureAbsolute(caseStudyData.seoData?.image),
          type: 'article' as const
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
        type: 'article' as const
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
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      
      {/* Open Graph */}
      <meta property="og:site_name" content={SEO_CONSTANTS.SITE_NAME} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:url" content={seoData.canonical} />
      <meta property="og:type" content={seoData.type} />
      {seoData.image && <meta property="og:image" content={seoData.image} />}
      {seoData.image && <meta property="og:image:alt" content={seoData.title} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONSTANTS.TWITTER_HANDLE} />
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
