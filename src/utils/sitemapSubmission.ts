
/**
 * Enhanced sitemap submission for better indexing
 */

interface SubmissionResult {
  engine: string;
  success: boolean;
  message: string;
}

export class SitemapSubmissionManager {
  private baseUrl: string;
  private sitemapUrl: string;

  constructor(baseUrl: string = 'https://barskydesign.pro') {
    this.baseUrl = baseUrl;
    this.sitemapUrl = `${baseUrl}/sitemap.xml`;
  }

  /**
   * Submit sitemap to Google Search Console with enhanced parameters
   */
  async submitToGoogle(): Promise<SubmissionResult> {
    try {
      const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(this.sitemapUrl)}`;
      const response = await fetch(pingUrl, { 
        method: 'GET',
        headers: {
          'User-Agent': 'BarskyDesign-SEO-Bot/1.0'
        }
      });
      
      return {
        engine: 'Google',
        success: response.ok,
        message: response.ok ? 'Successfully submitted to Google Search Console' : 'Google submission failed'
      };
    } catch (error) {
      return {
        engine: 'Google',
        success: false,
        message: `Google submission error: ${error}`
      };
    }
  }

  /**
   * Submit sitemap to Bing Webmaster Tools
   */
  async submitToBing(): Promise<SubmissionResult> {
    try {
      const pingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(this.sitemapUrl)}`;
      const response = await fetch(pingUrl, { 
        method: 'GET',
        headers: {
          'User-Agent': 'BarskyDesign-SEO-Bot/1.0'
        }
      });
      
      return {
        engine: 'Bing',
        success: response.ok,
        message: response.ok ? 'Successfully submitted to Bing Webmaster Tools' : 'Bing submission failed'
      };
    } catch (error) {
      return {
        engine: 'Bing',
        success: false,
        message: `Bing submission error: ${error}`
      };
    }
  }

  /**
   * Submit individual URLs for faster indexing
   */
  async submitIndividualUrls(): Promise<SubmissionResult[]> {
    const urls = [
      '/',
      '/projects',
      '/services',
      '/blog',
      '/project/splittime',
      '/project/herbalink',
      '/project/business-management',
      '/project/medication-app',
      '/project/gold2crypto',
      '/project/dae-search',
      '/project/barskyjoint',
      '/design-services/ux-ui-design',
      '/design-services/web-development',
      '/design-services/mobile-app-design'
    ];

    const results: SubmissionResult[] = [];
    
    for (const path of urls) {
      const fullUrl = `${this.baseUrl}${path}`;
      
      try {
        // Submit to Google
        const googlePing = `https://www.google.com/ping?sitemap=${encodeURIComponent(fullUrl)}`;
        const googleResponse = await fetch(googlePing, { method: 'GET' });
        
        results.push({
          engine: `Google (${path})`,
          success: googleResponse.ok,
          message: googleResponse.ok ? `Successfully submitted ${path}` : `Failed to submit ${path}`
        });
        
        // Add delay between requests
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        results.push({
          engine: `Google (${path})`,
          success: false,
          message: `Error submitting ${path}: ${error}`
        });
      }
    }
    
    return results;
  }

  /**
   * Enhanced submission to all platforms
   */
  async submitToAll(): Promise<SubmissionResult[]> {
    console.log('🚀 Starting enhanced sitemap submission for better indexing...');
    
    const results = await Promise.all([
      this.submitToGoogle(),
      this.submitToBing(),
      ...await this.submitIndividualUrls()
    ]);

    // Log results
    results.forEach(result => {
      console.log(`${result.engine}: ${result.message}`);
    });

    // Track in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'enhanced_sitemap_submission', {
        total_submissions: results.length,
        successful_submissions: results.filter(r => r.success).length,
        submission_type: 'enhanced_indexing',
        timestamp: new Date().toISOString()
      });
    }

    return results;
  }

  /**
   * Get submission status report
   */
  getSubmissionReport(results: SubmissionResult[]): string {
    const successful = results.filter(r => r.success).length;
    const total = results.length;
    
    return `Enhanced sitemap submission completed: ${successful}/${total} successful submissions. ` +
           `This should help improve indexing for discovered but unindexed pages.`;
  }
}

// Enhanced utility function
export const submitSitemapToAllPlatforms = async (): Promise<void> => {
  const manager = new SitemapSubmissionManager();
  const results = await manager.submitToAll();
  const report = manager.getSubmissionReport(results);
  
  console.log('📊 SEO Report:', report);
};
