import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { 
  getSocialDebugUrls, 
  testSocialSharing, 
  validateSocialImage,
  SOCIAL_IMAGE_CONFIGS 
} from '@/utils/socialMediaUtils';

interface SocialTestResult {
  platform: string;
  success: boolean;
  loadTime: number;
  issues: string[];
}

/**
 * Social Media Testing Dashboard for debugging sharing issues
 */
export const SocialMediaTestDashboard: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [testResults, setTestResults] = useState<SocialTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageValidation, setImageValidation] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Set current page URL
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);
  
  const handleSocialTest = async () => {
    if (!currentUrl) return;
    
    setIsLoading(true);
    try {
      const results = await testSocialSharing(currentUrl);
      setTestResults(results);
    } catch (error) {
      console.error('Social media test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImageValidation = async (imageUrl: string, platform: keyof typeof SOCIAL_IMAGE_CONFIGS) => {
    try {
      const validation = await validateSocialImage(imageUrl, platform);
      setImageValidation(prev => ({
        ...prev,
        [`${platform}-${imageUrl}`]: validation
      }));
    } catch (error) {
      console.error(`Image validation failed for ${platform}:`, error);
    }
  };
  
  const debugUrls = currentUrl ? getSocialDebugUrls(currentUrl) : {};
  
  const getStatusIcon = (success: boolean, loadTime: number) => {
    if (success && loadTime < 3000) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (success && loadTime < 5000) return <Clock className="w-5 h-5 text-yellow-500" />;
    return <AlertCircle className="w-5 h-5 text-red-500" />;
  };
  
  const getLoadTimeColor = (loadTime: number) => {
    if (loadTime < 2000) return 'text-green-600';
    if (loadTime < 4000) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Social Media Optimization Dashboard
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Test and debug social media sharing performance, validate Open Graph tags, and optimize for faster crawler loading.
        </p>
      </div>

      {/* Current URL Testing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Social Media Crawler Testing
          </CardTitle>
          <CardDescription>
            Test how social media crawlers interact with your page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="url"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              placeholder="Enter URL to test..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button 
              onClick={handleSocialTest}
              disabled={isLoading || !currentUrl}
            >
              {isLoading ? 'Testing...' : 'Test Crawlers'}
            </Button>
          </div>
          
          {testResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testResults.map((result) => (
                <div key={result.platform} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{result.platform}</h3>
                    {getStatusIcon(result.success, result.loadTime)}
                  </div>
                  <div className="space-y-2">
                    <div className={`text-sm ${getLoadTimeColor(result.loadTime)}`}>
                      Load Time: {result.loadTime}ms
                    </div>
                    <Badge variant={result.success ? "default" : "destructive"}>
                      {result.success ? 'Success' : 'Failed'}
                    </Badge>
                    {result.issues.length > 0 && (
                      <div className="text-sm text-red-600">
                        {result.issues.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Media Debug Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Debug Tools</CardTitle>
          <CardDescription>
            Use official platform tools to validate your social media tags
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(debugUrls).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="font-medium capitalize">{platform}</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Image Optimization Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Image Requirements</CardTitle>
          <CardDescription>
            Optimal image dimensions and file sizes for each platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(SOCIAL_IMAGE_CONFIGS).map(([platform, config]) => (
              <div key={platform} className="border rounded-lg p-4">
                <h3 className="font-semibold capitalize mb-2">{platform}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Dimensions: {config.width}x{config.height}px</div>
                  <div>Format: {config.format.toUpperCase()}</div>
                  <div>Quality: {config.quality}%</div>
                  <div>Max Size: 1MB</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Success Metrics to Track</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Performance Targets</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Page load speed:</span>
                  <Badge variant="outline">Under 3 seconds</Badge>
                </li>
                <li className="flex justify-between">
                  <span>Social crawler load:</span>
                  <Badge variant="outline">Under 2 seconds</Badge>
                </li>
                <li className="flex justify-between">
                  <span>PageSpeed Insights:</span>
                  <Badge variant="outline">90+ score</Badge>
                </li>
                <li className="flex justify-between">
                  <span>Image file size:</span>
                  <Badge variant="outline">Under 1MB</Badge>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">SEO Metrics</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Core Web Vitals:</span>
                  <Badge variant="outline">All Green</Badge>
                </li>
                <li className="flex justify-between">
                  <span>Social shares:</span>
                  <Badge variant="outline">Track increases</Badge>
                </li>
                <li className="flex justify-between">
                  <span>Click-through rate:</span>
                  <Badge variant="outline">Monitor improvements</Badge>
                </li>
                <li className="flex justify-between">
                  <span>Search impressions:</span>
                  <Badge variant="outline">Track growth</Badge>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};