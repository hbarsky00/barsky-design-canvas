import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Share2, CheckCircle2, AlertCircle } from 'lucide-react';

interface TestResult {
  platform: string;
  url: string;
  status: 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  image?: string;
  message: string;
}

const SocialSharingTester: React.FC = () => {
  const [testUrl, setTestUrl] = useState('');
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const socialPlatforms = [
    {
      name: 'Facebook',
      debuggerUrl: 'https://developers.facebook.com/tools/debug/',
      color: 'bg-blue-600'
    },
    {
      name: 'LinkedIn',
      debuggerUrl: 'https://www.linkedin.com/post-inspector/',
      color: 'bg-blue-700'
    },
    {
      name: 'Twitter',
      debuggerUrl: 'https://cards-dev.twitter.com/validator',
      color: 'bg-blue-500'
    }
  ];

  const testMetaTags = async (url: string) => {
    setTesting(true);
    setResults([]);

    try {
      // Simulate meta tag extraction (in a real implementation, this would be server-side)
      const response = await fetch(url);
      const html = await response.text();
      
      // Parse meta tags (simplified version)
      const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/) || [];
      const ogDescription = html.match(/<meta property="og:description" content="([^"]*)"/) || [];
      const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/) || [];
      const twitterTitle = html.match(/<meta name="twitter:title" content="([^"]*)"/) || [];

      const newResults: TestResult[] = [
        {
          platform: 'Open Graph (Facebook/LinkedIn)',
          url: url,
          status: ogTitle[1] && ogDescription[1] ? 'success' : 'warning',
          title: ogTitle[1],
          description: ogDescription[1],
          image: ogImage[1],
          message: ogTitle[1] && ogDescription[1] 
            ? 'Meta tags found and properly configured' 
            : 'Missing or incomplete Open Graph tags'
        },
        {
          platform: 'Twitter Cards',
          url: url,
          status: twitterTitle[1] ? 'success' : 'warning',
          title: twitterTitle[1],
          message: twitterTitle[1] 
            ? 'Twitter Card tags configured correctly' 
            : 'Twitter Card tags missing or incomplete'
        }
      ];

      setResults(newResults);
    } catch (error) {
      setResults([{
        platform: 'Error',
        url: url,
        status: 'error',
        message: 'Failed to fetch or parse the URL. Please check if the URL is accessible.'
      }]);
    } finally {
      setTesting(false);
    }
  };

  const handleTest = () => {
    if (testUrl) {
      testMetaTags(testUrl);
    }
  };

  const openDebugger = (debuggerUrl: string) => {
    if (typeof window !== 'undefined') {
      const fullUrl = `${debuggerUrl}?q=${encodeURIComponent(testUrl)}`;
      window.open(fullUrl, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Social Media Sharing Tester
        </h1>
        <p className="text-lg text-gray-600">
          Test how your pages will appear when shared on social media platforms
        </p>
      </motion.div>

      {/* URL Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Test URL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter URL to test (e.g., https://barskydesign.pro/blog/post-slug)"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleTest} 
              disabled={!testUrl || testing}
              className="min-w-[100px]"
            >
              {testing ? 'Testing...' : 'Test'}
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            <p className="font-medium mb-1">Quick test URLs:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTestUrl('https://barskydesign.pro')}
                className="text-blue-600 hover:underline"
              >
                Homepage
              </button>
              <button
                onClick={() => setTestUrl('https://barskydesign.pro/services')}
                className="text-blue-600 hover:underline"
              >
                Services
              </button>
              <button
                onClick={() => setTestUrl('https://barskydesign.pro/project/splittime')}
                className="text-blue-600 hover:underline"
              >
                Case Study
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {result.status === 'success' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  {result.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                  {result.status === 'error' && <AlertCircle className="h-5 w-5 text-red-600" />}
                  <h3 className="font-semibold">{result.platform}</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{result.message}</p>
                
                {result.title && (
                  <div className="space-y-1 text-sm">
                    <p><strong>Title:</strong> {result.title}</p>
                    {result.description && <p><strong>Description:</strong> {result.description}</p>}
                    {result.image && <p><strong>Image:</strong> {result.image}</p>}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Social Platform Debuggers */}
      {testUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Platform Debuggers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Use these official debugging tools to test and refresh your social media previews:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {socialPlatforms.map((platform) => (
                <Button
                  key={platform.name}
                  onClick={() => openDebugger(platform.debuggerUrl)}
                  className={`${platform.color} hover:opacity-90 text-white`}
                  size="lg"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {platform.name} Debugger
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Meta Tag Requirements</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• og:title (unique for each page)</li>
                <li>• og:description (150 chars max)</li>
                <li>• og:image (1200x630px recommended)</li>
                <li>• og:type (article for blog posts)</li>
                <li>• twitter:card (summary_large_image)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Image Optimization</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Size: 1200x630px (1.91:1 ratio)</li>
                <li>• Format: JPG, PNG, or WebP</li>
                <li>• File size: Under 100KB</li>
                <li>• Include alt text</li>
                <li>• Use absolute URLs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialSharingTester;