
interface PageSEOData {
  title: string;
  description: string;
  image: string;
  canonicalUrl: string;
  pageType: 'home' | 'project' | 'blog' | 'service' | 'page';
  schemaData?: any;
}

const BASE_URL = 'https://barskydesign.pro';
// Updated to use your circular headshot as the default OG image
const DEFAULT_IMAGE = `${BASE_URL}/images/default-og-image.jpg`;

/**
 * Converts relative URLs to absolute URLs
 */
const toAbsoluteUrl = (url: string): string => {
  if (!url) return DEFAULT_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

/**
 * Truncates description to SEO-optimal length (150-160 chars)
 */
const truncateDescription = (text: string, maxLength: number = 160): string => {
  if (!text || text.length <= maxLength) return text || '';
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
};

/**
 * Default fallback description for all pages
 */
const DEFAULT_DESCRIPTION = "Hiram Barsky – Product Designer + AI Developer helping businesses design smarter, faster, and more user-focused digital products.";

/**
 * Extracts title from page content in order of preference
 */
const extractTitle = (pathname: string): string => {
  // Check for explicit page title meta tag first
  const titleMeta = document.querySelector('meta[name="page-title"]');
  if (titleMeta) {
    return titleMeta.getAttribute('content') || '';
  }

  // Extract from first H1
  const h1 = document.querySelector('h1');
  if (h1) {
    return h1.textContent?.trim() || '';
  }

  // Fallback based on path
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathname === '/') return 'Hiram Barsky - Product Designer & Gen AI Developer';
  if (pathSegments[0] === 'project') return 'Case Study | Hiram Barsky Design';
  if (pathSegments[0] === 'blog') return 'Blog Post | Hiram Barsky Design';
  if (pathSegments[0] === 'services') return 'Design Services | Hiram Barsky Design';
  
  return 'Hiram Barsky Design - Product Designer & Gen AI Developer';
};

/**
 * Extracts description from page content - separate from title
 */
const extractDescription = (pathname: string): string => {
  // Check for explicit description meta tag
  const descMeta = document.querySelector('meta[name="page-description"]');
  if (descMeta) {
    return truncateDescription(descMeta.getAttribute('content') || '');
  }

  // Look for first paragraph after H1 (separate from title)
  const h1 = document.querySelector('h1');
  if (h1) {
    let nextElement = h1.nextElementSibling;
    while (nextElement) {
      if (nextElement.tagName === 'P' && nextElement.textContent?.trim()) {
        const description = nextElement.textContent.trim();
        // Ensure it's different from the title
        if (description !== h1.textContent?.trim()) {
          return truncateDescription(description);
        }
      }
      nextElement = nextElement.nextElementSibling;
    }
  }

  // Fallback descriptions based on path (separate from titles)
  if (pathname === '/') {
    return DEFAULT_DESCRIPTION;
  }
  if (pathname.startsWith('/project/')) {
    return 'Product design case study showcasing UX research, design process, and AI-enhanced solutions by Hiram Barsky.';
  }
  if (pathname.startsWith('/blog/')) {
    return 'Insights on product design, UX research, and AI integration in digital product development.';
  }
  if (pathname.includes('service')) {
    return 'Professional product design and Gen AI development services for startups and enterprises.';
  }

  return DEFAULT_DESCRIPTION;
};

/**
 * Extracts hero image from page content - prioritizes project/blog featured images
 */
const extractHeroImage = (): string => {
  // Check for explicit hero image meta tag
  const imageMeta = document.querySelector('meta[name="page-image"]');
  if (imageMeta) {
    return toAbsoluteUrl(imageMeta.getAttribute('content') || '');
  }

  // Look for featured images in project/blog contexts
  const featuredSelectors = [
    '[data-featured-image] img',
    '[data-hero-image] img',
    '.hero img',
    '[class*="hero"] img',
    'section:first-of-type img',
    'video[poster]'
  ];

  for (const selector of featuredSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      if (element.tagName === 'VIDEO') {
        const poster = element.getAttribute('poster');
        if (poster) return toAbsoluteUrl(poster);
      } else if (element.tagName === 'IMG') {
        const src = element.getAttribute('src');
        if (src) return toAbsoluteUrl(src);
      }
    }
  }

  // Return your circular headshot as fallback
  return DEFAULT_IMAGE;
};

/**
 * Determines page type based on pathname
 */
const getPageType = (pathname: string): PageSEOData['pageType'] => {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/project/')) return 'project';
  if (pathname.startsWith('/blog/')) return 'blog';
  if (pathname.includes('service')) return 'service';
  return 'page';
};

/**
 * Generates JSON-LD schema based on page type
 */
const generateSchema = (data: Omit<PageSEOData, 'schemaData'>): any => {
  const baseSchema = {
    "@context": "https://schema.org",
    "url": data.canonicalUrl,
    "name": data.title,
    "description": data.description,
    "image": data.image
  };

  switch (data.pageType) {
    case 'project':
      return {
        ...baseSchema,
        "@type": "Article",
        "headline": data.title,
        "author": {
          "@type": "Person",
          "name": "Hiram Barsky",
          "url": `${BASE_URL}/about`
        },
        "publisher": {
          "@type": "Organization", 
          "name": "Barsky Design",
          "url": BASE_URL
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": data.canonicalUrl
        }
      };

    case 'blog':
      return {
        ...baseSchema,
        "@type": "BlogPosting",
        "headline": data.title,
        "author": {
          "@type": "Person",
          "name": "Hiram Barsky",
          "url": `${BASE_URL}/about`
        },
        "publisher": {
          "@type": "Organization",
          "name": "Barsky Design",
          "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/logo.png`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": data.canonicalUrl
        }
      };

    case 'service':
      return {
        ...baseSchema,
        "@type": "Service",
        "provider": {
          "@type": "Person",
          "name": "Hiram Barsky",
          "url": `${BASE_URL}/about`
        },
        "serviceType": "Design & Development"
      };

    default:
      return {
        ...baseSchema,
        "@type": "WebPage",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Hiram Barsky Design",
          "url": BASE_URL
        }
      };
  }
};

/**
 * Main SEO detection function - automatically detects page metadata
 */
export const applySEOForPage = (): PageSEOData => {
  const pathname = window.location.pathname;
  const canonicalUrl = `${BASE_URL}${pathname}`;
  
  const title = extractTitle(pathname);
  const description = extractDescription(pathname);
  const image = extractHeroImage();
  const pageType = getPageType(pathname);
  
  const seoData: Omit<PageSEOData, 'schemaData'> = {
    title,
    description,
    image,
    canonicalUrl,
    pageType
  };

  const schemaData = generateSchema(seoData);

  console.log('🔍 SEO Detection (Updated):', {
    pathname,
    title,
    description: description.substring(0, 50) + '...',
    image,
    pageType,
    defaultImage: DEFAULT_IMAGE
  });

  return {
    ...seoData,
    schemaData
  };
};
