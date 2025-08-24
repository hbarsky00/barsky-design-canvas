
import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
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
    return buildSEO(seoInput);
  }, [location?.pathname]);

  const structuredData = generateStructuredData(seoData);

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={seoData.canonical} />

      {/* Robots from builder to avoid hardcoding */}
      {seoData.robots && <meta name="robots" content={seoData.robots} />}
      {seoData.robots && <meta name="googlebot" content={seoData.robots} />}

      {/* Open Graph */}
      <meta property="og:type" content={seoData.type ?? 'website'} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:url" content={seoData.canonical} />
      {seoData.siteName && <meta property="og:site_name" content={seoData.siteName} />}
      {seoData.image && (
        <>
          <meta property="og:image" content={seoData.image} />
          <meta property="og:image:secure_url" content={seoData.image} />
          {seoData.imageAlt && <meta property="og:image:alt" content={seoData.imageAlt} />}
          {seoData.imageWidth && <meta property="og:image:width" content={String(seoData.imageWidth)} />}
          {seoData.imageHeight && <meta property="og:image:height" content={String(seoData.imageHeight)} />}
        </>
      )}

      {/* Article-only */}
      {seoData.type === 'article' && seoData.publishedTime && (
        <meta property="article:published_time" content={seoData.publishedTime} />
      )}
      {seoData.type === 'article' && seoData.modifiedTime && (
        <meta property="article:modified_time" content={seoData.modifiedTime} />
      )}
      {seoData.type === 'article' && seoData.author && (
        <meta property="article:author" content={seoData.author} />
      )}
      {seoData.type === 'article' && seoData.tags?.map((t) => (
        <meta key={t} property="article:tag" content={t} />
      ))}

      {/* Twitter */}
      {seoData.twitterCard && <meta name="twitter:card" content={seoData.twitterCard} />}
      {seoData.twitterSite && <meta name="twitter:site" content={seoData.twitterSite} />}
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      {seoData.image && <meta name="twitter:image" content={seoData.image} />}
      {seoData.imageAlt && <meta name="twitter:image:alt" content={seoData.imageAlt} />}

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default UnifiedSEO;
