
import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { generateStructuredData } from "@/utils/seo/structuredDataUtils";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";
import { blogPosts } from "@/data/blogData";
import { SEO_CONSTANTS } from "@/utils/seoConstants";
import { buildSEO, SEOInput } from "@/utils/seo/seoBuilder";
import { normalizeCanonicalUrl, resolveUrlAliases } from "@/utils/seo/urlNormalizer";
import { getStaticPageSEO, getProjectSEO, getBlogSEO } from "@/data/seoData";

interface SEOData {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

const UnifiedSEO: React.FC = () => {
  const location = useLocation();
  
  // Generate SEO data using unified builder
  const seoData = useMemo(() => {
    const rawPathname = location?.pathname || '/';
    const pathname = resolveUrlAliases(rawPathname);
    
    console.log('🔒 SEO UNIFIED BUILDER:', {
      pathname,
      timestamp: new Date().toISOString(),
      note: "USING SHARED SEO BUILDER"
    });
    
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
    const builtSeo = buildSEO(seoInput);
    
    console.log('✅ UNIFIED SEO BUILT:', {
      pathname,
      title: builtSeo.title,
      hasImage: !!builtSeo.image,
      type: builtSeo.type
    });
    
    return builtSeo;
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
      {seoData.image && <meta property="og:image:secure_url" content={seoData.image} />}
      {seoData.image && <meta property="og:image:alt" content={seoData.imageAlt || seoData.title} />}
      {seoData.image && <meta property="og:image:width" content="1200" />}
      {seoData.image && <meta property="og:image:height" content="630" />}
      
      {/* Article-specific meta */}
      {seoData.type === 'article' && seoData.publishedTime && (
        <meta property="article:published_time" content={seoData.publishedTime} />
      )}
      {seoData.type === 'article' && seoData.modifiedTime && (
        <meta property="article:modified_time" content={seoData.modifiedTime} />
      )}
      {seoData.type === 'article' && seoData.author && (
        <meta property="article:author" content={seoData.author} />
      )}
      {seoData.type === 'article' && seoData.tags?.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONSTANTS.TWITTER_HANDLE} />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      {seoData.image && <meta name="twitter:image" content={seoData.image} />}
      {seoData.image && <meta name="twitter:image:alt" content={seoData.imageAlt || seoData.title} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default UnifiedSEO;
