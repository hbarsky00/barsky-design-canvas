import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface BlogPostSeoProps {
  type: 'blog-post';
  title: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  publishedDate: string;
  tags: string[];
  slug: string;
}

interface PageSeoProps {
  type: 'page';
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
  structuredData?: Record<string, any>;
  path?: string; // Optional for backwards compatibility
}

interface ProjectSeoProps {
  type: 'project';
  project?: any;
  details?: any;
  projectName?: string;
  description?: string;
  image?: string;
  keywords?: string | string[];
}

interface ServiceSeoProps {
  type: 'service';
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
  serviceName?: string;
  benefits?: string[];
  targetAudience?: string;
  path?: string; // Optional for backwards compatibility
}

interface HomeSeoProps {
  type: 'home';
}

type DynamicSeoProps = BlogPostSeoProps | PageSeoProps | ProjectSeoProps | ServiceSeoProps | HomeSeoProps;

const DynamicSeo: React.FC<DynamicSeoProps> = (props) => {
  const location = useLocation();
  const baseDomain = 'https://barskydesign.pro';
  const defaultImage = 'https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png';

  // Generate the correct canonical URL based on current location
  const getCanonicalUrl = () => {
    // Use current pathname to ensure canonical URL matches fetched URL
    return `${baseDomain}${location.pathname}`;
  };

  const canonicalUrl = getCanonicalUrl();

  // Helper function to truncate description to 150-160 characters
  const truncateDescription = (text: string, maxLength: number = 160): string => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  // Debug logging to show what canonical URL is being set
  console.log('DynamicSeo canonical URL:', canonicalUrl, 'for page type:', props.type);
  
  // Debug logging to verify canonical URL generation
  React.useEffect(() => {
    console.log('DynamicSeo canonical URL:', canonicalUrl, 'for pathname:', location.pathname, 'page type:', props.type);
  }, [canonicalUrl, location.pathname, props.type]);

  // Generate structured data for blog posts
  const generateBlogPostSchema = (props: BlogPostSeoProps) => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": props.title,
      "description": props.excerpt,
      "image": props.featuredImage || defaultImage,
      "author": {
        "@type": "Person",
        "name": props.author,
        "url": `${baseDomain}/about`
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hiram Barsky - AI-Enhanced Design",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseDomain}/logo.png`
        }
      },
      "datePublished": props.publishedDate,
      "dateModified": props.publishedDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseDomain}/blog/${props.slug}`
      },
      "keywords": props.tags.join(', ')
    };
  };

  // Generate structured data for regular pages
  const generatePageSchema = (props: PageSeoProps) => {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": props.title,
      "description": props.description,
      "url": canonicalUrl,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Hiram Barsky - AI-Enhanced Design",
        "url": baseDomain
      }
    };
  };

  // Generate structured data for project pages
  const generateProjectSchema = (props: ProjectSeoProps) => {
    const projectName = props.project?.title || props.projectName || 'Project';
    const description = props.project?.description || props.details?.challenge || props.description || 'A design project';
    const keywords = Array.isArray(props.keywords) ? props.keywords.join(', ') : (props.keywords || '');
    
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": projectName,
      "description": description,
      "url": canonicalUrl,
      "image": props.image || props.project?.heroImage || defaultImage,
      "creator": {
        "@type": "Person",
        "name": "Hiram Barsky",
        "url": `${baseDomain}/about`
      },
      "about": projectName,
      "keywords": `${keywords}, UX Design, AI Integration`,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Hiram Barsky - AI-Enhanced Design",
        "url": baseDomain
      }
    };
  };

  // Generate structured data for service pages
  const generateServiceSchema = (props: ServiceSeoProps) => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": props.serviceName || props.title,
      "description": props.description,
      "url": canonicalUrl,
      "image": props.image || defaultImage,
      "provider": {
        "@type": "Person",
        "name": "Hiram Barsky",
        "url": `${baseDomain}/about`
      },
      "audience": {
        "@type": "Audience",
        "audienceType": props.targetAudience || "Business professionals"
      },
      "serviceType": "Design & Development",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Hiram Barsky - AI-Enhanced Design",
        "url": baseDomain
      }
    };
  };

  if (props.type === 'blog-post') {
    const pageCanonicalUrl = canonicalUrl;
    const schema = generateBlogPostSchema(props);
    const truncatedExcerpt = truncateDescription(props.excerpt);

    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{props.title} | Barsky Design Blog</title>
        <meta name="description" content={truncatedExcerpt} />
        <link rel="canonical" href={pageCanonicalUrl} />
        
        {/* Open Graph Tags for Facebook/LinkedIn */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${props.title} | Barsky Design Blog`} />
        <meta property="og:description" content={truncatedExcerpt} />
        <meta property="og:url" content={pageCanonicalUrl} />
        <meta property="og:image" content={props.featuredImage || defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={props.title} />
        <meta property="og:site_name" content="Barsky Design" />
        <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
        
        {/* Article-specific Open Graph Tags */}
        <meta property="og:article:author" content={props.author} />
        <meta property="og:article:published_time" content={props.publishedDate} />
        <meta property="og:article:section" content="Design & Technology" />
        {props.tags.map(tag => (
          <meta key={tag} property="og:article:tag" content={tag} />
        ))}
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hirambarsky" />
        <meta name="twitter:creator" content="@hirambarsky" />
        <meta name="twitter:title" content={`${props.title} | Barsky Design Blog`} />
        <meta name="twitter:description" content={truncatedExcerpt} />
        <meta name="twitter:image" content={props.featuredImage || defaultImage} />
        <meta name="twitter:image:alt" content={props.title} />
        
        {/* Keywords */}
        <meta name="keywords" content={`${props.tags.join(', ')}, Hiram Barsky, Product Designer, Gen AI Developer, UX Design, Blog`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    );
  }

  if (props.type === 'page') {
    const pageCanonicalUrl = canonicalUrl;
    const schema = props.structuredData || generatePageSchema(props);
    const truncatedDescription = truncateDescription(props.description);
    const keywordsString = props.keywords ? props.keywords.join(', ') : '';

    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{props.title}</title>
        <meta name="description" content={truncatedDescription} />
        <link rel="canonical" href={pageCanonicalUrl} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={truncatedDescription} />
        <meta property="og:url" content={pageCanonicalUrl} />
        <meta property="og:image" content={props.image || defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={props.title} />
        <meta property="og:site_name" content="Barsky Design" />
        <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hirambarsky" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={truncatedDescription} />
        <meta name="twitter:image" content={props.image || defaultImage} />
        <meta name="twitter:image:alt" content={props.title} />
        
        {/* Keywords */}
        {keywordsString && <meta name="keywords" content={`${keywordsString}, Hiram Barsky`} />}
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    );
  }

  if (props.type === 'project') {
    const pageCanonicalUrl = canonicalUrl;
    const schema = generateProjectSchema(props);
    const projectName = props.project?.title || props.projectName || 'Project';
    const description = props.project?.description || props.details?.challenge || props.description || 'A design project';
    const truncatedDescription = truncateDescription(description);
    const keywords = Array.isArray(props.keywords) ? props.keywords.join(', ') : (props.keywords || '');

    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{projectName} - Product Design Case Study | Barsky Design</title>
        <meta name="description" content={truncatedDescription} />
        <link rel="canonical" href={pageCanonicalUrl} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${projectName} - Product Design Case Study | Barsky Design`} />
        <meta property="og:description" content={truncatedDescription} />
        <meta property="og:url" content={pageCanonicalUrl} />
        <meta property="og:image" content={props.image || props.project?.heroImage || defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={projectName} />
        <meta property="og:site_name" content="Barsky Design" />
        <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
        
        {/* Project-specific Open Graph Tags */}
        <meta property="og:article:author" content="Hiram Barsky" />
        <meta property="og:article:section" content="Case Studies" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hirambarsky" />
        <meta name="twitter:creator" content="@hirambarsky" />
        <meta name="twitter:title" content={`${projectName} - Product Design Case Study | Barsky Design`} />
        <meta name="twitter:description" content={truncatedDescription} />
        <meta name="twitter:image" content={props.image || props.project?.heroImage || defaultImage} />
        <meta name="twitter:image:alt" content={projectName} />
        
        {/* Keywords */}
        <meta name="keywords" content={`${keywords}, Case Study, UX Design, AI Integration, Hiram Barsky`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    );
  }

  if (props.type === 'service') {
    const pageCanonicalUrl = canonicalUrl;
    const schema = generateServiceSchema(props);
    const truncatedDescription = truncateDescription(props.description);
    const serviceName = props.serviceName || props.title;
    const keywordsString = props.keywords ? props.keywords.join(', ') : '';

    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{props.title}</title>
        <meta name="description" content={truncatedDescription} />
        <link rel="canonical" href={pageCanonicalUrl} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={truncatedDescription} />
        <meta property="og:url" content={pageCanonicalUrl} />
        <meta property="og:image" content={props.image || defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={serviceName} />
        <meta property="og:site_name" content="Barsky Design" />
        <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hirambarsky" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={truncatedDescription} />
        <meta name="twitter:image" content={props.image || defaultImage} />
        <meta name="twitter:image:alt" content={serviceName} />
        
        {/* Keywords */}
        {keywordsString && <meta name="keywords" content={`${keywordsString}, UX Design, AI Integration, Product Design, Hiram Barsky`} />}
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    );
  }

  // Default/Home page
  const homeDescription = "15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration for startups and enterprises.";
  const truncatedHomeDescription = truncateDescription(homeDescription);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>Hiram Barsky - Product Designer & Gen AI Developer | New York</title>
      <meta name="description" content={truncatedHomeDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Hiram Barsky - Product Designer & Gen AI Developer | New York" />
      <meta property="og:description" content={truncatedHomeDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      <meta property="og:site_name" content="Barsky Design" />
      <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:title" content="Hiram Barsky - Product Designer & Gen AI Developer | New York" />
      <meta name="twitter:description" content={truncatedHomeDescription} />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:image:alt" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      
      {/* Keywords */}
      <meta name="keywords" content="UX Designer, UI Designer, Product Designer, Gen AI Developer, Artificial Intelligence, UX Research, Design Systems, New York" />
    </Helmet>
  );
};

export default DynamicSeo;