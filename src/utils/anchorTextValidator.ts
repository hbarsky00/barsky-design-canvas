/**
 * Anchor Text Validator - Improve descriptive link text
 */

const NON_DESCRIPTIVE_PATTERNS = [
  /^click here$/i,
  /^here$/i,
  /^go$/i,
  /^more$/i,
  /^read more$/i,
  /^learn more$/i,
  /^see more$/i,
  /^view$/i,
  /^link$/i,
  /^this$/i,
  /^continue$/i
];

class AnchorTextValidator {
  private improvedLinks = new Set<string>();

  /**
   * Check if anchor text is descriptive
   */
  isDescriptiveText(text: string): boolean {
    const trimmedText = text.trim().toLowerCase();
    
    if (trimmedText.length < 3) return false;
    
    return !NON_DESCRIPTIVE_PATTERNS.some(pattern => 
      pattern.test(trimmedText)
    );
  }

  /**
   * Generate better anchor text based on context
   */
  generateBetterAnchorText(link: HTMLAnchorElement): string {
    const originalText = link.textContent?.trim() || '';
    const href = link.href;
    
    // Try to get context from surrounding text
    const parentElement = link.parentElement;
    const contextText = parentElement?.textContent?.replace(originalText, '').trim() || '';
    
    // Extract meaningful context
    const sentences = contextText.split(/[.!?]/).filter(s => s.trim().length > 10);
    const nearestSentence = sentences[0]?.trim();
    
    // Generate based on URL and context
    try {
      const url = new URL(href);
      const domain = url.hostname.replace('www.', '');
      const path = url.pathname.replace(/^\//, '').replace(/\/$/, '');
      
      // For external links
      if (!href.includes(window.location.hostname)) {
        if (domain.includes('github')) return `View on GitHub`;
        if (domain.includes('linkedin')) return `Connect on LinkedIn`;
        if (domain.includes('twitter')) return `Follow on Twitter`;
        if (domain.includes('calendly')) return `Schedule consultation`;
        if (domain.includes('mailto')) return `Send email`;
        
        return `Visit ${domain}`;
      }
      
      // For internal links
      if (path.includes('project')) return `View project details`;
      if (path.includes('case-stud')) return `Read case study`;
      if (path.includes('blog')) return `Read blog post`;
      if (path.includes('service')) return `Learn about services`;
      if (path.includes('contact')) return `Get in touch`;
      if (path.includes('about')) return `Learn more about Hiram`;
      
      // Use context if available
      if (nearestSentence && nearestSentence.length < 50) {
        return nearestSentence;
      }
      
      return originalText || 'Learn more';
      
    } catch (error) {
      return originalText || 'Learn more';
    }
  }

  /**
   * Improve anchor text for better accessibility and SEO
   */
  improveAnchorText() {
    const links = document.querySelectorAll('a[href]') as NodeListOf<HTMLAnchorElement>;
    let improvedCount = 0;
    
    links.forEach(link => {
      const linkId = link.href + '|' + link.textContent;
      
      // Skip if already processed
      if (this.improvedLinks.has(linkId)) return;
      
      const currentText = link.textContent?.trim() || '';
      
      // Skip if text is already descriptive
      if (this.isDescriptiveText(currentText)) {
        this.improvedLinks.add(linkId);
        return;
      }
      
      // Skip if link has images as content
      if (link.querySelector('img, svg')) {
        // But ensure image links have proper alt or aria-label
        if (!link.hasAttribute('aria-label')) {
          const img = link.querySelector('img');
          const alt = img?.getAttribute('alt');
          if (alt) {
            link.setAttribute('aria-label', alt);
          } else {
            const betterText = this.generateBetterAnchorText(link);
            link.setAttribute('aria-label', betterText);
          }
        }
        this.improvedLinks.add(linkId);
        return;
      }
      
      // Skip empty links or links with only whitespace
      if (!currentText) {
        this.improvedLinks.add(linkId);
        return;
      }
      
      // Generate better anchor text
      const betterText = this.generateBetterAnchorText(link);
      
      if (betterText !== currentText && betterText.length > currentText.length) {
        // Preserve existing styling by wrapping in span
        const span = document.createElement('span');
        span.textContent = betterText;
        span.className = link.className;
        
        // Clear existing content and add new
        link.innerHTML = '';
        link.appendChild(span);
        
        // Add title attribute for context
        link.setAttribute('title', betterText);
        
        improvedCount++;
      }
      
      this.improvedLinks.add(linkId);
    });
    
    if (improvedCount > 0) {
      console.log(`✅ Improved ${improvedCount} non-descriptive anchor texts`);
    }
  }

  /**
   * Validate and improve all anchor texts
   */
  validateAndImproveAnchorTexts() {
    this.improveAnchorText();
    
    // Monitor for new links
    const observer = new MutationObserver(() => {
      this.improveAnchorText();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return observer;
  }

  /**
   * Get anchor text improvement report
   */
  getReport(): {total: number, improved: number, issues: string[]} {
    const links = document.querySelectorAll('a[href]') as NodeListOf<HTMLAnchorElement>;
    const issues: string[] = [];
    let improvedCount = 0;
    
    links.forEach(link => {
      const text = link.textContent?.trim() || '';
      if (!this.isDescriptiveText(text) && !link.querySelector('img, svg')) {
        issues.push(`Non-descriptive link: "${text}" -> ${link.href}`);
      } else if (this.improvedLinks.has(link.href + '|' + text)) {
        improvedCount++;
      }
    });
    
    return {
      total: links.length,
      improved: improvedCount,
      issues
    };
  }
}

// Export singleton instance
export const anchorTextValidator = new AnchorTextValidator();

/**
 * Initialize anchor text validation and improvement
 */
export const initAnchorTextValidation = () => {
  return anchorTextValidator.validateAndImproveAnchorTexts();
};