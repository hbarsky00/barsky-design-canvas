/**
 * Social media image optimization utilities
 */

interface SocialImageConfig {
  width: number;
  height: number;
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
}

export const SOCIAL_IMAGE_CONFIGS = {
  facebook: { width: 1200, height: 630, quality: 85, format: 'jpeg' as const },
  twitter: { width: 1200, height: 675, quality: 85, format: 'jpeg' as const },
  linkedin: { width: 1200, height: 627, quality: 90, format: 'jpeg' as const },
  instagram: { width: 1080, height: 1080, quality: 85, format: 'jpeg' as const },
  pinterest: { width: 1000, height: 1500, quality: 85, format: 'jpeg' as const }
};

/**
 * Generate optimized social media image URL
 */
export const generateSocialImageUrl = (
  baseImageUrl: string,
  platform: keyof typeof SOCIAL_IMAGE_CONFIGS = 'facebook'
): string => {
  const config = SOCIAL_IMAGE_CONFIGS[platform];
  
  // Extract file info
  const lastDot = baseImageUrl.lastIndexOf('.');
  const baseName = baseImageUrl.substring(0, lastDot);
  
  // Generate optimized filename
  return `${baseName}-social-${platform}-${config.width}x${config.height}.${config.format}`;
};

/**
 * Validate social media image dimensions and file size
 */
export const validateSocialImage = (
  imageUrl: string,
  platform: keyof typeof SOCIAL_IMAGE_CONFIGS = 'facebook'
): Promise<{
  isValid: boolean;
  issues: string[];
  suggestions: string[];
}> => {
  return new Promise((resolve) => {
    const img = new Image();
    const config = SOCIAL_IMAGE_CONFIGS[platform];
    const issues: string[] = [];
    const suggestions: string[] = [];
    
    img.onload = () => {
      // Check dimensions
      if (img.width !== config.width || img.height !== config.height) {
        issues.push(`Incorrect dimensions: ${img.width}x${img.height}, expected ${config.width}x${config.height}`);
        suggestions.push(`Resize image to ${config.width}x${config.height} pixels for optimal ${platform} sharing`);
      }
      
      // Check aspect ratio
      const aspectRatio = img.width / img.height;
      const expectedRatio = config.width / config.height;
      const ratioDiff = Math.abs(aspectRatio - expectedRatio);
      
      if (ratioDiff > 0.1) {
        issues.push(`Aspect ratio mismatch: ${aspectRatio.toFixed(2)}, expected ${expectedRatio.toFixed(2)}`);
        suggestions.push(`Adjust aspect ratio to ${expectedRatio.toFixed(2)} for proper ${platform} display`);
      }
      
      resolve({
        isValid: issues.length === 0,
        issues,
        suggestions
      });
    };
    
    img.onerror = () => {
      resolve({
        isValid: false,
        issues: ["Image failed to load"],
        suggestions: ["Check image URL and ensure it's accessible"]
      });
    };
    
    img.src = imageUrl;
  });
};

/**
 * Get social media debugging URLs
 */
export const getSocialDebugUrls = (pageUrl: string): Record<string, string> => {
  const encodedUrl = encodeURIComponent(pageUrl);
  
  return {
    facebook: `https://developers.facebook.com/tools/debug/?q=${encodedUrl}`,
    twitter: `https://cards-dev.twitter.com/validator`,
    linkedin: `https://www.linkedin.com/post-inspector/inspect/${encodedUrl}`,
    pinterest: `https://developers.pinterest.com/tools/url-debugger/?link=${encodedUrl}`
  };
};

/**
 * Test social media sharing for a specific URL
 */
export const testSocialSharing = async (
  pageUrl: string
): Promise<{
  platform: string;
  success: boolean;
  loadTime: number;
  issues: string[];
}[]> => {
  const results = [];
  
  // Test Facebook crawler
  try {
    const startTime = Date.now();
    const response = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
      }
    });
    const loadTime = Date.now() - startTime;
    
    results.push({
      platform: 'Facebook',
      success: response.ok,
      loadTime,
      issues: response.ok ? [] : [`HTTP ${response.status}: ${response.statusText}`]
    });
  } catch (error) {
    results.push({
      platform: 'Facebook',
      success: false,
      loadTime: 0,
      issues: [`Network error: ${error instanceof Error ? error.message : String(error)}`]
    });
  }
  
  // Test Twitter crawler
  try {
    const startTime = Date.now();
    const response = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Twitterbot/1.0'
      }
    });
    const loadTime = Date.now() - startTime;
    
    results.push({
      platform: 'Twitter',
      success: response.ok,
      loadTime,
      issues: response.ok ? [] : [`HTTP ${response.status}: ${response.statusText}`]
    });
  } catch (error) {
    results.push({
      platform: 'Twitter',
      success: false,
      loadTime: 0,
      issues: [`Network error: ${error instanceof Error ? error.message : String(error)}`]
    });
  }
  
  // Test LinkedIn crawler
  try {
    const startTime = Date.now();
    const response = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Jakarta Commons-HttpClient/3.1)'
      }
    });
    const loadTime = Date.now() - startTime;
    
    results.push({
      platform: 'LinkedIn',
      success: response.ok,
      loadTime,
      issues: response.ok ? [] : [`HTTP ${response.status}: ${response.statusText}`]
    });
  } catch (error) {
    results.push({
      platform: 'LinkedIn',
      success: false,
      loadTime: 0,
      issues: [`Network error: ${error instanceof Error ? error.message : String(error)}`]
    });
  }
  
  return results;
};

/**
 * Generate social media meta descriptions optimized for each platform
 */
export const generatePlatformDescription = (
  baseDescription: string,
  platform: keyof typeof SOCIAL_IMAGE_CONFIGS
): string => {
  const maxLengths = {
    facebook: 300,
    twitter: 200,
    linkedin: 256,
    instagram: 150,
    pinterest: 500
  };
  
  const maxLength = maxLengths[platform];
  
  if (baseDescription.length <= maxLength) {
    return baseDescription;
  }
  
  // Truncate at word boundary
  const truncated = baseDescription.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
};