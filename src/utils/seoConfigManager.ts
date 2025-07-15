/**
 * SEO Configuration Manager - Centralized configuration for SEO meta tags
 * Eliminates hardcoded values and provides configurable social media integration
 */

export interface SeoConfig {
  site: {
    name: string;
    url: string;
    description: string;
    author: string;
    image: string;
  };
  social: {
    twitter: {
      handle: string;
      site: string;
    };
    facebook: {
      appId: string | null;
    };
    linkedin: {
      companyId: string | null;
    };
  };
  analytics: {
    gtag: string;
  };
}

// Centralized SEO configuration
export const seoConfig: SeoConfig = {
  site: {
    name: "Barsky Design",
    url: "https://barskydesign.com",
    description: "15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration for startups and enterprises.",
    author: "Hiram Barsky",
    image: "/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png"
  },
  social: {
    twitter: {
      handle: "@barskydesign",
      site: "@barskydesign"
    },
    facebook: {
      appId: null // Set to null to disable FB App ID meta tag
    },
    linkedin: {
      companyId: null
    }
  },
  analytics: {
    gtag: "G-321GKNB37Y"
  }
};

/**
 * Get configured social media handles
 */
export const getSocialHandles = () => {
  return {
    twitter: seoConfig.social.twitter.handle,
    twitterSite: seoConfig.social.twitter.site,
    facebookAppId: seoConfig.social.facebook.appId,
    linkedinCompanyId: seoConfig.social.linkedin.companyId
  };
};

/**
 * Get site configuration
 */
export const getSiteConfig = () => {
  return {
    name: seoConfig.site.name,
    url: seoConfig.site.url,
    description: seoConfig.site.description,
    author: seoConfig.site.author,
    defaultImage: seoConfig.site.image
  };
};

/**
 * Generate social media sharing URLs
 */
export const generateSocialUrls = (title: string, url: string, description?: string) => {
  const fullUrl = url.startsWith('http') ? url : `${seoConfig.site.url}${url}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedDescription = description ? encodeURIComponent(description) : '';

  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };
};