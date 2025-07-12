import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getCanonicalUrl, validateCanonicalUrl } from '@/utils/canonicalUrl';
import { useRouterReady } from '@/hooks/useRouterReady';

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
  
  // Use router ready hook to ensure proper initialization
  const isRouterReady = useRouterReady();

  // Dynamic og:image selection based on page type
  const getPageTypeImage = (pageType: string, customImage?: string): string => {
    if (customImage) return customImage;
    
    // Page-specific default images optimized for LinkedIn/social sharing (1200x630px)
    const imageMap: Record<string, string> = {
      'service': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop&crop=center',
      'project': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop&crop=center', 
      'blog': 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=630&fit=crop&crop=center',
      'home': defaultImage
    };
    
    return imageMap[pageType] || defaultImage;
  };

  // Generate canonical URL using consolidated utility
  const canonicalUrl = React.useMemo(() => {
    return getCanonicalUrl(isRouterReady ? location.pathname : undefined);
  }, [location.pathname, isRouterReady]);

  // Helper function to truncate description to 150-160 characters
  const truncateDescription = (text: string, maxLength: number = 160): string => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  // Enhanced cleanup and defensive canonical URL generation
  React.useEffect(() => {
    if (!isRouterReady || typeof window === 'undefined') return;
    
    // Get clean pathname, fallback to '/' if problematic
    const pathname = location.pathname === '/index.html' ? '/' : location.pathname;
    const cleanPath = pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    
    // Remove any existing canonical tags to prevent duplicates
    const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
    existingCanonicals.forEach(link => {
      const href = link.getAttribute('href');
      if (href?.includes('index.html')) {
        console.warn('🚨 Removing incorrect canonical URL:', href);
        link.remove();
      }
    });
    
    // Create new canonical
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `https://barskydesign.pro${cleanPath}`;
    document.head.appendChild(canonical);
    
    // Update Open Graph URL meta tag
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://barskydesign.pro${cleanPath}`);
    } else {
      const newOgUrl = document.createElement('meta');
      newOgUrl.setAttribute('property', 'og:url');
      newOgUrl.setAttribute('content', `https://barskydesign.pro${cleanPath}`);
      document.head.appendChild(newOgUrl);
    }
    
    console.log('✅ Canonical URL set to:', canonical.href);
    console.log('✅ Open Graph URL set to:', `https://barskydesign.pro${cleanPath}`);
  }, [isRouterReady, location.pathname]);

  // Debug logging and validation
  React.useEffect(() => {
    if (isRouterReady) {
      console.log('🔗 DynamicSeo Debug:', {
        pageType: props.type,
        routerPath: location.pathname,
        canonicalUrl,
        isValid: validateCanonicalUrl(canonicalUrl)
      });
    }
  }, [canonicalUrl, location.pathname, props.type, isRouterReady]);

  // Don't render meta tags until router is ready
  if (!isRouterReady) {
    return null;
  }

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
        <meta property="og:image" content={getPageTypeImage('blog', props.featuredImage)} />
        <meta property="og:image:type" content="image/jpeg" />
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
        <meta name="twitter:image" content={getPageTypeImage('blog', props.featuredImage)} />
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
        <meta property="og:image" content={getPageTypeImage('page', props.image)} />
        <meta property="og:image:type" content="image/jpeg" />
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
        <meta name="twitter:image" content={getPageTypeImage('page', props.image)} />
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
        <meta property="og:image" content={getPageTypeImage('project', props.image || props.project?.heroImage)} />
        <meta property="og:image:type" content="image/jpeg" />
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
        <meta name="twitter:image" content={getPageTypeImage('project', props.image || props.project?.heroImage)} />
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
        <meta property="og:image" content={getPageTypeImage('service', props.image)} />
        <meta property="og:image:type" content="image/jpeg" />
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
        <meta name="twitter:image" content={getPageTypeImage('service', props.image)} />
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
  const pageCanonicalUrl = canonicalUrl;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Hiram Barsky - Product Designer & Gen AI Developer | New Jersey Web Designer",
    "description": "Expert Product Designer and Gen AI Developer in New Jersey specializing in UX/UI design, web development, and AI-enhanced solutions for modern businesses.",
    "url": pageCanonicalUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Barsky Design - Product Designer & Gen AI Developer",
      "url": baseDomain
    },
    "mainEntity": {
      "@type": "Person",
      "name": "Hiram Barsky",
      "jobTitle": "Product Designer & Gen AI Developer",
      "url": baseDomain
    }
  };

  return (
    <Helmet>
      {/* Enhanced Home Page Meta Tags */}
      <title>Hiram Barsky - Product Designer & Gen AI Developer | New Jersey Web Designer</title>
      <meta name="description" content="Expert Product Designer and Gen AI Developer in New Jersey specializing in UX/UI design, web development, and AI-enhanced solutions for modern businesses. 8+ years experience." />
      <link rel="canonical" href={pageCanonicalUrl} />
      
      {/* Enhanced Keywords */}
      <meta name="keywords" content="Product Designer New Jersey, Web Designer New Jersey, Gen AI Developer, UX Designer New Jersey, UI Designer, Hiram Barsky, Barsky Design, Web Development NJ, AI Integration, User Experience Design, Digital Product Design, Responsive Web Design, Design Systems, Fair Lawn NJ Designer" />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="US-NJ" />
      <meta name="geo.placename" content="Fair Lawn, New Jersey" />
      <meta name="geo.position" content="40.9370;-74.1318" />
      <meta name="ICBM" content="40.9370, -74.1318" />
      
      {/* Open Graph Tags for Home */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Hiram Barsky - Product Designer & Gen AI Developer | New Jersey" />
      <meta property="og:description" content="Expert Product Designer and Gen AI Developer in New Jersey specializing in UX/UI design, web development, and AI-enhanced solutions for modern businesses." />
      <meta property="og:url" content={pageCanonicalUrl} />
      <meta property="og:image" content={getPageTypeImage('home')} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Hiram Barsky - Product Designer & Gen AI Developer Portfolio" />
      <meta property="og:site_name" content="Barsky Design" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags for Home */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:creator" content="@hirambarsky" />
      <meta name="twitter:title" content="Hiram Barsky - Product Designer & Gen AI Developer | New Jersey" />
      <meta name="twitter:description" content="Expert Product Designer and Gen AI Developer in New Jersey specializing in UX/UI design, web development, and AI-enhanced solutions." />
      <meta name="twitter:image" content={getPageTypeImage('home')} />
      <meta name="twitter:image:alt" content="Hiram Barsky - Product Designer & Gen AI Developer Portfolio" />
      
      {/* Structured Data for Home */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
export default DynamicSeo;