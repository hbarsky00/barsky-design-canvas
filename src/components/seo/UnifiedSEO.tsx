
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

  // DISABLED: Client-side Helmet usage to prevent conflicts with static prerendering
  // The static prerender script now handles all SEO meta tags in the built HTML
  // This component now only handles structured data for better indexing
  
  return (
    <Helmet>
      {/* Only structured data - all other SEO tags handled by static prerender */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default UnifiedSEO;
