
import React, { useMemo, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getSeoBySlug, type SeoMetaRecord } from "@/lib/supabase/seoQueries";
import { generateStructuredData } from "@/utils/seo/structuredDataUtils";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";
import { blogPosts } from "@/data/blogData";
import { SEO_CONSTANTS } from "@/utils/seoConstants";
import { buildSEO, SEOInput, BuiltSEO } from "@/utils/seo/seoBuilder";
import { resolveUrlAliases } from "@/utils/seo/urlNormalizer";
import { getStaticPageSEO, getProjectSEO, getBlogSEO } from "@/data/seoData";

const devLog = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') console.warn(...args);
};

const UnifiedSEO: React.FC = () => {
  const location = useLocation();
  const [dbSeo, setDbSeo] = useState<SeoMetaRecord | null>(null);

  // Fetch Supabase SEO data on pathname change
  useEffect(() => {
    let slug = location.pathname === '/' ? 'home' : location.pathname.replace(/^\//, '').replace(/\/$/, '');
    
    // Extract slug from routes
    if (location.pathname.startsWith('/project/')) {
      slug = location.pathname.split('/project/')[1];
    } else if (location.pathname.startsWith('/blog/')) {
      slug = location.pathname.split('/blog/')[1];
    }
    
    getSeoBySlug(slug).then(data => {
      if (data) {
        console.log('✅ Loaded Supabase SEO for client-side hydration:', slug);
        setDbSeo(data);
      }
    });
  }, [location.pathname]);
  
  // Generate SEO data using unified builder
  const seoData = useMemo((): BuiltSEO => {
    const rawPathname = location?.pathname || '/';
    const pathname = resolveUrlAliases(rawPathname);
    
    devLog('🔒 SEO UNIFIED BUILDER:', { pathname });
    
    // Build SEO input based on path type
    let seoInput: SEOInput;
    
    // Handle blog posts
    if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '').replace('/', '');
      const blogPost = blogPosts.find(post => post.slug === slug);
      
      if (blogPost) {
        const blogSeoOverride = getBlogSEO(slug) || {};
        seoInput = {
          path: pathname,
          kind: 'post',
          title: `${blogPost.title} — ${SEO_CONSTANTS.SITE_NAME}`,
          description: blogPost.excerpt,
          image: blogPost.coverImage,
          published: new Date(blogPost.date).toISOString(),
          author: blogPost.author,
          tags: blogPost.tags,
          ...blogSeoOverride
        };
      } else {
        // Fallback for unknown blog posts
        seoInput = {
          path: pathname,
          kind: 'post',
          title: `Blog Post: ${slug} — ${SEO_CONSTANTS.SITE_NAME}`,
          description: SEO_CONSTANTS.DEFAULT_DESCRIPTION
        };
      }
    }
    // Handle project pages
    else if (pathname.startsWith('/project/')) {
      const projectId = pathname.replace('/project/', '').replace('/', '');
      const caseStudyData = getStructuredCaseStudy(projectId);
      const projectSeoOverride = getProjectSEO(projectId);
      
      if (caseStudyData && projectSeoOverride) {
        seoInput = {
          path: pathname,
          kind: 'project',
          title: projectSeoOverride.title!,
          description: projectSeoOverride.description!,
          image: projectSeoOverride.image!
        };
      } else if (caseStudyData) {
        seoInput = {
          path: pathname,
          kind: 'project',
          title: caseStudyData.title,
          description: caseStudyData.description,
          image: caseStudyData.seoData?.image
        };
      } else {
        // Fallback for unknown projects
        seoInput = {
          path: pathname,
          kind: 'project',
          title: `Project: ${projectId} — Hiram Barsky`,
          description: SEO_CONSTANTS.DEFAULT_DESCRIPTION
        };
      }
    }
    // Handle static pages
    else {
      const staticSeo = getStaticPageSEO(pathname);
      if (staticSeo) {
        seoInput = {
          path: pathname,
          ...staticSeo
        } as SEOInput;
      } else {
        // Default fallback
        seoInput = {
          path: pathname,
          kind: 'page',
          title: SEO_CONSTANTS.SITE_NAME,
          description: SEO_CONSTANTS.DEFAULT_DESCRIPTION
        };
      }
    }
    
    // Build final SEO data using unified builder
    const baseSeo = buildSEO(seoInput);
    
    // Merge with Supabase data if available
    if (dbSeo) {
      return {
        ...baseSeo,
        title: dbSeo.title,
        description: dbSeo.description,
        canonical: dbSeo.canonical_url || baseSeo.canonical,
        image: dbSeo.og_image || baseSeo.image
      };
    }
    
    return baseSeo;
  }, [location?.pathname, dbSeo]);

  const structuredData = generateStructuredData(seoData);

  return (
    <Helmet>
      {/* Primary SEO Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={seoData.canonical} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoData.type} />
      <meta property="og:site_name" content={SEO_CONSTANTS.SITE_NAME} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:url" content={seoData.canonical} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:image:alt" content={`${seoData.title} - Visual Preview`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={SEO_CONSTANTS.LOCALE} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONSTANTS.TWITTER_HANDLE} />
      <meta name="twitter:creator" content={SEO_CONSTANTS.TWITTER_HANDLE} />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content={SEO_CONSTANTS.AUTHOR} />
      <meta name="language" content={SEO_CONSTANTS.LANGUAGE} />
      <meta name="theme-color" content={SEO_CONSTANTS.THEME_COLOR} />
      
      {/* Article-specific tags for blog posts and projects */}
      {seoData.type === 'article' && seoData.publishedTime && (
        <>
          <meta property="article:published_time" content={seoData.publishedTime} />
          <meta property="article:author" content={SEO_CONSTANTS.AUTHOR} />
        </>
      )}
      
      {seoData.type === 'article' && seoData.modifiedTime && (
        <meta property="article:modified_time" content={seoData.modifiedTime} />
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default UnifiedSEO;
