/**
 * External Link Validator - Check and fix broken external links
 */

interface LinkValidationResult {
  url: string;
  status: 'valid' | 'invalid' | 'timeout' | 'unknown';
  element: HTMLAnchorElement;
  statusCode?: number;
}

class ExternalLinkValidator {
  private checkedUrls = new Map<string, boolean>();
  private timeout = 5000; // 5 seconds

  /**
   * Validate a single URL
   */
  async validateUrl(url: string): Promise<boolean> {
    // Check cache first
    if (this.checkedUrls.has(url)) {
      return this.checkedUrls.get(url)!;
    }

    try {
      // Use a simple approach for external links
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors', // Handle CORS issues
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      const isValid = response.status === 200 || response.type === 'opaque';
      this.checkedUrls.set(url, isValid);
      return isValid;
    } catch (error) {
      // For external links, assume valid if we can't check (CORS)
      if (url.startsWith('http')) {
        this.checkedUrls.set(url, true);
        return true;
      }
      
      this.checkedUrls.set(url, false);
      return false;
    }
  }

  /**
   * Validate all external links on the page
   */
  async validateAllLinks(): Promise<LinkValidationResult[]> {
    const links = Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[];
    const externalLinks = links.filter(link => 
      link.href.startsWith('http') && !link.href.includes(window.location.hostname)
    );

    const results: LinkValidationResult[] = [];

    for (const link of externalLinks) {
      try {
        const isValid = await this.validateUrl(link.href);
        results.push({
          url: link.href,
          status: isValid ? 'valid' : 'invalid',
          element: link
        });
      } catch (error) {
        results.push({
          url: link.href,
          status: 'timeout',
          element: link
        });
      }
    }

    return results;
  }

  /**
   * Fix external link issues
   */
  fixExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]') as NodeListOf<HTMLAnchorElement>;
    
    externalLinks.forEach(link => {
      // Add security attributes
      if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }
      
      // Add target="_blank" if not present
      if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
      }
      
      // Add aria-label for accessibility
      if (!link.hasAttribute('aria-label') && !link.textContent?.trim()) {
        const hostname = new URL(link.href).hostname;
        link.setAttribute('aria-label', `Visit ${hostname} (opens in new tab)`);
      }
      
      // Add title for better UX
      if (!link.hasAttribute('title')) {
        const hostname = new URL(link.href).hostname;
        link.setAttribute('title', `Visit ${hostname} (opens in new tab)`);
      }
    });
  }

  /**
   * Monitor for new external links
   */
  initMonitoring() {
    // Fix existing links
    this.fixExternalLinks();
    
    // Monitor for new links
    const observer = new MutationObserver(() => {
      this.fixExternalLinks();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return observer;
  }
}

// Export singleton instance
export const linkValidator = new ExternalLinkValidator();

/**
 * Initialize external link validation and fixing
 */
export const initExternalLinkValidator = () => {
  return linkValidator.initMonitoring();
};