/**
 * External Link Validation Utility
 * Checks external links for broken URLs and validates responses
 */

interface LinkValidationResult {
  url: string;
  status: 'valid' | 'broken' | 'redirected' | 'timeout';
  statusCode?: number;
  redirectedTo?: string;
  responseTime?: number;
  error?: string;
}

interface LinkValidationOptions {
  timeout?: number;
  followRedirects?: boolean;
  userAgent?: string;
}

const DEFAULT_OPTIONS: LinkValidationOptions = {
  timeout: 10000, // 10 seconds
  followRedirects: true,
  userAgent: 'Mozilla/5.0 (compatible; BarskyDesign-LinkChecker/1.0)'
};

/**
 * Validates a single external URL
 */
export const validateExternalLink = async (
  url: string, 
  options: LinkValidationOptions = {}
): Promise<LinkValidationResult> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const startTime = Date.now();
  
  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), opts.timeout);
    
    const response = await fetch(url, {
      method: 'HEAD', // Use HEAD for faster response
      headers: {
        'User-Agent': opts.userAgent!
      },
      signal: controller.signal,
      redirect: opts.followRedirects ? 'follow' : 'manual'
    });
    
    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;
    
    if (response.ok) {
      return {
        url,
        status: 'valid',
        statusCode: response.status,
        responseTime
      };
    } else if ([301, 302, 307, 308].includes(response.status)) {
      const redirectedTo = response.headers.get('location');
      return {
        url,
        status: 'redirected',
        statusCode: response.status,
        redirectedTo: redirectedTo || undefined,
        responseTime
      };
    } else {
      return {
        url,
        status: 'broken',
        statusCode: response.status,
        responseTime,
        error: `HTTP ${response.status}: ${response.statusText}`
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          url,
          status: 'timeout',
          responseTime,
          error: `Request timed out after ${opts.timeout}ms`
        };
      }
      
      return {
        url,
        status: 'broken',
        responseTime,
        error: error.message
      };
    }
    
    return {
      url,
      status: 'broken',
      responseTime,
      error: 'Unknown error occurred'
    };
  }
};

/**
 * Validates multiple external URLs in parallel
 */
export const validateExternalLinks = async (
  urls: string[], 
  options: LinkValidationOptions = {}
): Promise<LinkValidationResult[]> => {
  const promises = urls.map(url => validateExternalLink(url, options));
  return Promise.all(promises);
};

/**
 * Extracts external links from a DOM element or document
 */
export const extractExternalLinks = (element: Element | Document = document): string[] => {
  const links = element.querySelectorAll('a[href^="http"], a[href^="//"]');
  const externalUrls = new Set<string>();
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      // Convert protocol-relative URLs to HTTPS
      const normalizedUrl = href.startsWith('//') ? `https:${href}` : href;
      
      // Filter out same-domain links
      try {
        const url = new URL(normalizedUrl);
        if (url.hostname !== window.location.hostname) {
          externalUrls.add(normalizedUrl);
        }
      } catch {
        // Invalid URL, skip
      }
    }
  });
  
  return Array.from(externalUrls);
};

/**
 * Runs a comprehensive link validation check on the current page
 */
export const validatePageLinks = async (options?: LinkValidationOptions): Promise<{
  validLinks: LinkValidationResult[];
  brokenLinks: LinkValidationResult[];
  redirectedLinks: LinkValidationResult[];
  timeoutLinks: LinkValidationResult[];
  totalTime: number;
}> => {
  const startTime = Date.now();
  const externalLinks = extractExternalLinks();
  
  if (externalLinks.length === 0) {
    return {
      validLinks: [],
      brokenLinks: [],
      redirectedLinks: [],
      timeoutLinks: [],
      totalTime: 0
    };
  }
  
  const results = await validateExternalLinks(externalLinks, options);
  const totalTime = Date.now() - startTime;
  
  const validLinks = results.filter(r => r.status === 'valid');
  const brokenLinks = results.filter(r => r.status === 'broken');
  const redirectedLinks = results.filter(r => r.status === 'redirected');
  const timeoutLinks = results.filter(r => r.status === 'timeout');
  
  // Log results for monitoring
  console.group('🔗 External Link Validation Results');
  console.log(`✅ Valid: ${validLinks.length}`);
  console.log(`❌ Broken: ${brokenLinks.length}`);
  console.log(`↗️ Redirected: ${redirectedLinks.length}`);
  console.log(`⏱️ Timeout: ${timeoutLinks.length}`);
  console.log(`🕒 Total time: ${totalTime}ms`);
  
  if (brokenLinks.length > 0) {
    console.warn('Broken links found:', brokenLinks);
  }
  if (redirectedLinks.length > 0) {
    console.info('Redirected links found:', redirectedLinks);
  }
  
  console.groupEnd();
  
  return {
    validLinks,
    brokenLinks,
    redirectedLinks,
    timeoutLinks,
    totalTime
  };
};

/**
 * Monitors external links and reports issues
 */
export const monitorExternalLinks = (intervalMs: number = 300000): (() => void) => {
  let intervalId: NodeJS.Timeout;
  
  const runCheck = () => {
    validatePageLinks().then(results => {
      if (results.brokenLinks.length > 0 || results.timeoutLinks.length > 0) {
        // Report to analytics or monitoring service
        console.warn('External link issues detected:', {
          broken: results.brokenLinks.length,
          timeouts: results.timeoutLinks.length
        });
      }
    });
  };
  
  // Run initial check
  runCheck();
  
  // Set up periodic monitoring
  intervalId = setInterval(runCheck, intervalMs);
  
  // Return cleanup function
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
};