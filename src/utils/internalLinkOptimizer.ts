/**
 * Internal Link Structure Optimizer - Improve internal linking patterns
 */

interface InternalLinkData {
  url: string;
  element: HTMLAnchorElement;
  text: string;
  incomingLinks: number;
  outgoingLinks: number;
  pageType: string;
}

class InternalLinkOptimizer {
  private linkMap = new Map<string, InternalLinkData>();
  private processedUrls = new Set<string>();

  /**
   * Analyze internal link structure
   */
  analyzeInternalLinks(): Map<string, InternalLinkData> {
    const links = document.querySelectorAll('a[href]') as NodeListOf<HTMLAnchorElement>;
    const currentHost = window.location.hostname;
    
    // Reset data
    this.linkMap.clear();
    
    links.forEach(link => {
      const href = link.href;
      
      // Only process internal links
      if (href.includes(currentHost) || href.startsWith('/')) {
        const normalizedUrl = this.normalizeUrl(href);
        const linkData = this.linkMap.get(normalizedUrl) || {
          url: normalizedUrl,
          element: link,
          text: link.textContent?.trim() || '',
          incomingLinks: 0,
          outgoingLinks: 0,
          pageType: this.getPageType(normalizedUrl)
        };
        
        linkData.incomingLinks++;
        this.linkMap.set(normalizedUrl, linkData);
      }
    });
    
    return this.linkMap;
  }

  /**
   * Normalize URL for consistent comparison
   */
  private normalizeUrl(url: string): string {
    try {
      const urlObj = new URL(url, window.location.origin);
      return urlObj.pathname.replace(/\/$/, '') || '/';
    } catch {
      return url.replace(/\/$/, '') || '/';
    }
  }

  /**
   * Determine page type based on URL pattern
   */
  private getPageType(url: string): string {
    if (url === '/' || url === '') return 'homepage';
    if (url.includes('/project') || url.includes('/case-stud')) return 'project';
    if (url.includes('/blog')) return 'blog';
    if (url.includes('/service')) return 'service';
    if (url.includes('/about')) return 'about';
    if (url.includes('/contact')) return 'contact';
    return 'other';
  }

  /**
   * Find pages with insufficient internal links
   */
  findUnderlinkedPages(): InternalLinkData[] {
    const linkData = this.analyzeInternalLinks();
    return Array.from(linkData.values()).filter(data => 
      data.incomingLinks <= 1 && data.pageType !== 'homepage'
    );
  }

  /**
   * Generate contextual internal links
   */
  generateContextualLinks() {
    const underlinkedPages = this.findUnderlinkedPages();
    
    // Define contextual relationships
    const contextualMappings = {
      'project': {
        suggestedLinks: ['/projects', '/about', '/contact'],
        keywords: ['design', 'development', 'UX', 'UI', 'solution']
      },
      'blog': {
        suggestedLinks: ['/blog', '/projects', '/services'],
        keywords: ['learn', 'insights', 'tips', 'guide']
      },
      'service': {
        suggestedLinks: ['/projects', '/contact', '/about'],
        keywords: ['expertise', 'consultation', 'help', 'solutions']
      }
    };

    underlinkedPages.forEach(pageData => {
      const context = contextualMappings[pageData.pageType as keyof typeof contextualMappings];
      if (context) {
        this.addContextualLinksToContent(pageData, context);
      }
    });
  }

  /**
   * Add contextual links to page content
   */
  private addContextualLinksToContent(pageData: InternalLinkData, context: any) {
    // Find suitable text content where we can add contextual links
    const textElements = document.querySelectorAll('p, div, span');
    
    textElements.forEach(element => {
      const text = element.textContent?.toLowerCase() || '';
      
      // Look for relevant keywords
      context.keywords.forEach((keyword: string) => {
        if (text.includes(keyword) && !element.querySelector('a')) {
          // Add a relevant contextual link
          const relevantLink = context.suggestedLinks.find((link: string) => 
            !document.querySelector(`a[href="${link}"]`)
          );
          
          if (relevantLink) {
            this.insertContextualLink(element, keyword, relevantLink);
          }
        }
      });
    });
  }

  /**
   * Insert a contextual link into text content
   */
  private insertContextualLink(element: Element, keyword: string, linkUrl: string) {
    const textContent = element.textContent || '';
    const keywordIndex = textContent.toLowerCase().indexOf(keyword);
    
    if (keywordIndex !== -1) {
      const beforeText = textContent.substring(0, keywordIndex);
      const keywordText = textContent.substring(keywordIndex, keywordIndex + keyword.length);
      const afterText = textContent.substring(keywordIndex + keyword.length);
      
      // Create new content with link
      const linkText = this.getLinkTextForUrl(linkUrl);
      const newContent = `${beforeText}${keywordText}. <a href="${linkUrl}" class="text-blue-vibrant hover:underline">${linkText}</a>${afterText}`;
      
      element.innerHTML = newContent;
    }
  }

  /**
   * Get appropriate link text for URL
   */
  private getLinkTextForUrl(url: string): string {
    const linkTexts: Record<string, string> = {
      '/projects': 'View our portfolio',
      '/services': 'Learn about our services',
      '/contact': 'Get in touch',
      '/about': 'Learn more about us',
      '/blog': 'Read our insights'
    };
    
    return linkTexts[url] || 'Learn more';
  }

  /**
   * Remove redirect chains in internal links
   */
  fixInternalRedirects() {
    const links = document.querySelectorAll('a[href]') as NodeListOf<HTMLAnchorElement>;
    
    // Common redirect patterns to fix
    const redirectFixes: Record<string, string> = {
      '/project/': '/case-studies/',
      '/case-study-': '/case-studies/',
      '/services/': '/design-services/'
    };
    
    links.forEach(link => {
      let href = link.getAttribute('href') || '';
      
      // Fix known redirect patterns
      Object.entries(redirectFixes).forEach(([pattern, replacement]) => {
        if (href.includes(pattern)) {
          href = href.replace(pattern, replacement);
          link.setAttribute('href', href);
        }
      });
    });
  }

  /**
   * Initialize internal link optimization
   */
  initializeOptimization() {
    // Fix redirects
    this.fixInternalRedirects();
    
    // Generate contextual links for underlinked pages
    this.generateContextualLinks();
    
    // Monitor for new content
    const observer = new MutationObserver(() => {
      this.fixInternalRedirects();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    const linkAnalysis = this.analyzeInternalLinks();
    const underlinkedCount = this.findUnderlinkedPages().length;
    
    console.log(`✅ Internal link optimization applied`);
    console.log(`📊 Total internal links: ${linkAnalysis.size}`);
    console.log(`⚠️ Pages needing more links: ${underlinkedCount}`);
    
    return observer;
  }
}

// Export singleton instance
export const internalLinkOptimizer = new InternalLinkOptimizer();

/**
 * Initialize internal link optimization
 */
export const initInternalLinkOptimization = () => {
  return internalLinkOptimizer.initializeOptimization();
};