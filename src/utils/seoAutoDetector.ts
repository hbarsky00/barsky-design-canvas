
import { BASE_URL } from './urlUtils';

export interface PageSEOData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: 'website' | 'article';
}

/**
 * Auto-detects page metadata for SEO tags
 */
export const applySEOForPage = (): PageSEOData => {
  const currentPath = window.location.pathname;
  const currentUrl = `${BASE_URL}${currentPath}`;
  
  // Detect title
  const title = detectTitle();
  
  // Detect description
  const description = detectDescription();
  
  // Detect hero image
  const image = detectHeroImage();
  
  // Determine page type
  const type = currentPath.includes('/project/') || currentPath.includes('/blog/') ? 'article' : 'website';
  
  return {
    title,
    description,
    image,
    url: currentUrl,
    type
  };
};

/**
 * Detects page title in priority order:
 * 1. Explicit page title from meta/data attributes
 * 2. First H1 text content
 * 3. Document title (fallback)
 */
const detectTitle = (): string => {
  // Check for explicit title in data attributes
  const explicitTitle = document.querySelector('[data-page-title]')?.getAttribute('data-page-title');
  if (explicitTitle) return explicitTitle;
  
  // Check for first H1
  const h1Element = document.querySelector('h1');
  if (h1Element?.textContent?.trim()) {
    return h1Element.textContent.trim();
  }
  
  // Fallback to document title (cleaned)
  const docTitle = document.title.replace(' | Hiram Barsky Design', '').replace(' | Barsky Design', '');
  return docTitle || 'Hiram Barsky - Product Designer & Gen AI Developer';
};

/**
 * Detects page description in priority order:
 * 1. Explicit description from meta/data attributes
 * 2. First paragraph after H1
 * 3. Meta description (fallback)
 */
const detectDescription = (): string => {
  // Check for explicit description
  const explicitDesc = document.querySelector('[data-page-description]')?.getAttribute('data-page-description');
  if (explicitDesc) return truncateDescription(explicitDesc);
  
  // Look for first paragraph after H1
  const h1 = document.querySelector('h1');
  if (h1) {
    const paragraph = h1.parentElement?.querySelector('p') || 
                     document.querySelector('h1 + p') ||
                     document.querySelector('h1 ~ p');
    
    if (paragraph?.textContent?.trim()) {
      return truncateDescription(paragraph.textContent.trim());
    }
  }
  
  // Check existing meta description as fallback
  const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
  if (metaDesc) return truncateDescription(metaDesc);
  
  // Default fallback
  return 'Expert Product Designer specializing in Gen AI integration and user-centered design solutions for startups and enterprises.';
};

/**
 * Detects hero image in priority order:
 * 1. Explicit hero image from data attributes
 * 2. First image in hero section
 * 3. First video poster
 * 4. Default fallback image
 */
const detectHeroImage = (): string => {
  // Check for explicit hero image
  const explicitImage = document.querySelector('[data-page-image]')?.getAttribute('data-page-image');
  if (explicitImage) return convertToAbsoluteUrl(explicitImage);
  
  // Look for hero section images
  const heroSection = document.querySelector('[data-hero], .hero, section:first-of-type');
  if (heroSection) {
    const heroImage = heroSection.querySelector('img');
    if (heroImage?.src) {
      return convertToAbsoluteUrl(heroImage.src);
    }
    
    // Check for video poster
    const video = heroSection.querySelector('video[poster]');
    if (video?.getAttribute('poster')) {
      return convertToAbsoluteUrl(video.getAttribute('poster')!);
    }
  }
  
  // Look for first significant image on page
  const firstImage = document.querySelector('main img, article img, section img');
  if (firstImage instanceof HTMLImageElement && firstImage.src) {
    const src = firstImage.src;
    // Avoid small icons, avatars, or decorative images
    if (firstImage.width >= 400 && firstImage.height >= 200) {
      return convertToAbsoluteUrl(src);
    }
  }
  
  // Default fallback
  return `${BASE_URL}/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png`;
};

/**
 * Converts relative URLs to absolute URLs
 */
const convertToAbsoluteUrl = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  if (url.startsWith('/')) {
    return `${BASE_URL}${url}`;
  }
  
  return `${BASE_URL}/${url}`;
};

/**
 * Truncates description to optimal length for SEO (≤160 characters)
 */
const truncateDescription = (text: string): string => {
  if (text.length <= 160) return text;
  
  const truncated = text.substring(0, 157);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
};

/**
 * Updates document head with SEO meta tags
 */
export const updateHeadTags = (seoData: PageSEOData): void => {
  // Update title
  document.title = seoData.title;
  
  // Update or create meta tags
  updateMetaTag('name', 'description', seoData.description);
  updateMetaTag('property', 'og:title', seoData.title);
  updateMetaTag('property', 'og:description', seoData.description);
  updateMetaTag('property', 'og:url', seoData.url);
  updateMetaTag('property', 'og:type', seoData.type);
  updateMetaTag('property', 'og:image', seoData.image);
  updateMetaTag('property', 'og:image:width', '1200');
  updateMetaTag('property', 'og:image:height', '630');
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', seoData.title);
  updateMetaTag('name', 'twitter:description', seoData.description);
  updateMetaTag('name', 'twitter:image', seoData.image);
  
  // Update canonical URL
  updateCanonicalLink(seoData.url);
  
  // Add Article schema for project/blog pages
  if (seoData.type === 'article') {
    updateArticleSchema(seoData);
  } else {
    removeArticleSchema();
  }
};

/**
 * Updates or creates a meta tag
 */
const updateMetaTag = (attribute: string, value: string, content: string): void => {
  let tag = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  
  tag.setAttribute('content', content);
};

/**
 * Updates canonical link
 */
const updateCanonicalLink = (url: string): void => {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  
  canonical.href = url;
};

/**
 * Updates Article JSON-LD schema for project/blog pages
 */
const updateArticleSchema = (seoData: PageSEOData): void => {
  // Remove existing schema
  removeArticleSchema();
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": seoData.title,
    "description": seoData.description,
    "image": [seoData.image],
    "author": {
      "@type": "Person",
      "name": "Hiram Barsky"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Barsky Design"
    },
    "url": seoData.url,
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString()
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'article-schema';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Removes Article JSON-LD schema
 */
const removeArticleSchema = (): void => {
  const existingSchema = document.getElementById('article-schema');
  if (existingSchema) {
    existingSchema.remove();
  }
};
