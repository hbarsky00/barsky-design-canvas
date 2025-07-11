import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  path: string;
}

interface ProjectSeoProps {
  type: 'project';
  title: string;
  description: string;
  image?: string;
  projectName: string;
  results: string[];
  technologies: string[];
  path: string;
}

interface ServiceSeoProps {
  type: 'service';
  title: string;
  description: string;
  image?: string;
  serviceName: string;
  benefits: string[];
  targetAudience: string;
  path: string;
}

interface HomeSeoProps {
  type: 'home';
}

type DynamicSeoProps = BlogPostSeoProps | PageSeoProps | ProjectSeoProps | ServiceSeoProps | HomeSeoProps;

const DynamicSeo: React.FC<DynamicSeoProps> = (props) => {
  const baseUrl = 'https://barskydesign.pro';
  const defaultImage = 'https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png';

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
        "url": `${baseUrl}/about`
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hiram Barsky - AI-Enhanced Design",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "datePublished": props.publishedDate,
      "dateModified": props.publishedDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${props.slug}`
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
      "url": `${baseUrl}${props.path}`,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Hiram Barsky - AI-Enhanced Design",
        "url": baseUrl
      }
    };
  };

  // Generate structured data for project pages
  const generateProjectSchema = (props: ProjectSeoProps) => {
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": props.title,
      "description": props.description,
      "url": `${baseUrl}${props.path}`,
      "image": props.image || defaultImage,
      "creator": {
        "@type": "Person",
        "name": "Hiram Barsky",
        "url": `${baseUrl}/about`
      },
      "about": props.projectName,
      "keywords": [...props.technologies, "UX Design", "AI Integration"].join(', '),
      "isPartOf": {
        "@type": "WebSite",
        "name": "Hiram Barsky - AI-Enhanced Design",
        "url": baseUrl
      }
    };
  };

  // Generate structured data for service pages
  const generateServiceSchema = (props: ServiceSeoProps) => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": props.serviceName,
      "description": props.description,
      "url": `${baseUrl}${props.path}`,
      "image": props.image || defaultImage,
      "provider": {
        "@type": "Person",
        "name": "Hiram Barsky",
        "url": `${baseUrl}/about`
      },
      "audience": {
        "@type": "Audience",
        "audienceType": props.targetAudience
      },
      "serviceType": "Design & Development",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Hiram Barsky - AI-Enhanced Design",
        "url": baseUrl
      }
    };
  };

  if (props.type === 'blog-post') {
    const canonicalUrl = `${baseUrl}/blog/${props.slug}`;
    const schema = generateBlogPostSchema(props);

    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{props.title} | Hiram Barsky - AI-Enhanced Design</title>
        <meta name="description" content={props.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Tags for Facebook/LinkedIn */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={props.featuredImage || defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={props.title} />
        <meta property="og:site_name" content="Hiram Barsky - AI-Enhanced Design" />
        
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
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.excerpt} />
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
    const canonicalUrl = `${baseUrl}${props.path}`;
    const schema = generatePageSchema(props);

    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{props.title} | Hiram Barsky - AI-Enhanced Design</title>
        <meta name="description" content={props.description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={props.image || defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={props.title} />
        <meta property="og:site_name" content="Hiram Barsky - AI-Enhanced Design" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hirambarsky" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:image" content={props.image || defaultImage} />
        <meta name="twitter:image:alt" content={props.title} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    );
  }

  if (props.type === 'project') {
    const canonicalUrl = `${baseUrl}${props.path}`;
    const schema = generateProjectSchema(props);

    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{props.title} | Hiram Barsky - AI-Enhanced Design</title>
        <meta name="description" content={props.description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={props.image || defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={props.projectName} />
        <meta property="og:site_name" content="Hiram Barsky - AI-Enhanced Design" />
        
        {/* Project-specific Open Graph Tags */}
        <meta property="og:article:author" content="Hiram Barsky" />
        <meta property="og:article:section" content="Case Studies" />
        {props.technologies.map(tech => (
          <meta key={tech} property="og:article:tag" content={tech} />
        ))}
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hirambarsky" />
        <meta name="twitter:creator" content="@hirambarsky" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:image" content={props.image || defaultImage} />
        <meta name="twitter:image:alt" content={props.projectName} />
        
        {/* Keywords */}
        <meta name="keywords" content={`${props.technologies.join(', ')}, Case Study, UX Design, AI Integration, Hiram Barsky`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    );
  }

  if (props.type === 'service') {
    const canonicalUrl = `${baseUrl}${props.path}`;
    const schema = generateServiceSchema(props);

    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{props.title} | Hiram Barsky - AI-Enhanced Design</title>
        <meta name="description" content={props.description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={props.image || defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={props.serviceName} />
        <meta property="og:site_name" content="Hiram Barsky - AI-Enhanced Design" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hirambarsky" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:image" content={props.image || defaultImage} />
        <meta name="twitter:image:alt" content={props.serviceName} />
        
        {/* Keywords */}
        <meta name="keywords" content={`${props.serviceName}, AI Integration, UX Design, ${props.targetAudience}, Hiram Barsky`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    );
  }

  // Default/home page
  return (
    <Helmet>
      <title>Hiram Barsky - Product Designer & Gen AI Developer</title>
      <meta name="description" content="Expert Product Designer specializing in Gen AI integration, user-centered design solutions, and transforming complex business challenges into intuitive digital experiences." />
      <link rel="canonical" href={baseUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      <meta property="og:description" content="Expert Product Designer specializing in Gen AI integration, user-centered design solutions, and transforming complex business challenges into intuitive digital experiences." />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      <meta property="og:site_name" content="Hiram Barsky - AI-Enhanced Design" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:title" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      <meta name="twitter:description" content="Expert Product Designer specializing in Gen AI integration, user-centered design solutions, and transforming complex business challenges into intuitive digital experiences." />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:image:alt" content="Hiram Barsky - Product Designer & Gen AI Developer" />
    </Helmet>
  );
};

export default DynamicSeo;