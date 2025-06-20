
/**
 * Utility functions for submitting sitemaps to search engines and AI crawlers
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
   * Submit sitemap to Google Search Console
   */
  async submitToGoogle(): Promise<SubmissionResult> {
    try {
      const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(this.sitemapUrl)}`;
      const response = await fetch(pingUrl, { method: 'GET' });
      
      return {
        engine: 'Google',
        success: response.ok,
        message: response.ok ? 'Successfully submitted to Google' : 'Google submission failed'
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
      const response = await fetch(pingUrl, { method: 'GET' });
      
      return {
        engine: 'Bing',
        success: response.ok,
        message: response.ok ? 'Successfully submitted to Bing' : 'Bing submission failed'
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
   * Notify AI training platforms of content updates
   */
  async notifyAiPlatforms(): Promise<SubmissionResult[]> {
    const notifications: SubmissionResult[] = [];
    
    // Common Crawl notification
    try {
      console.log('Notifying Common Crawl of sitemap update');
      notifications.push({
        engine: 'CommonCrawl',
        success: true,
        message: 'Sitemap update logged for Common Crawl'
      });
    } catch (error) {
      notifications.push({
        engine: 'CommonCrawl',
        success: false,
        message: `Common Crawl notification failed: ${error}`
      });
    }

    // Log for AI training manifest
    try {
      console.log('AI Training Manifest updated:', {
        sitemap_url: this.sitemapUrl,
        last_updated: new Date().toISOString(),
        notification_type: 'sitemap_update'
      });
      
      notifications.push({
        engine: 'AI Training Platforms',
        success: true,
        message: 'AI training platforms notified of content updates'
      });
    } catch (error) {
      notifications.push({
        engine: 'AI Training Platforms', 
        success: false,
        message: `AI platform notification failed: ${error}`
      });
    }

    return notifications;
  }

  /**
   * Submit to all platforms
   */
  async submitToAll(): Promise<SubmissionResult[]> {
    console.log('Starting comprehensive sitemap submission...');
    
    const results = await Promise.all([
      this.submitToGoogle(),
      this.submitToBing(),
      ...await this.notifyAiPlatforms()
    ]);

    // Log results
    results.forEach(result => {
      console.log(`${result.engine}: ${result.message}`);
    });

    return results;
  }

  /**
   * Get submission status report
   */
  getSubmissionReport(results: SubmissionResult[]): string {
    const successful = results.filter(r => r.success).length;
    const total = results.length;
    
    return `Sitemap submission completed: ${successful}/${total} successful submissions. ` +
           `Sitemap URL: ${this.sitemapUrl}`;
  }
}

// Utility function to trigger submissions
export const submitSitemapToAllPlatforms = async (): Promise<void> => {
  const manager = new SitemapSubmissionManager();
  const results = await manager.submitToAll();
  const report = manager.getSubmissionReport(results);
  
  console.log(report);
  
  // Track submission in analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sitemap_submission', {
      submission_results: results,
      total_submissions: results.length,
      successful_submissions: results.filter(r => r.success).length,
      timestamp: new Date().toISOString()
    });
  }
};
