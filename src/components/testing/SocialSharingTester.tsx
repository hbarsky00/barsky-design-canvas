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

  const validateImageDimensions = async (imageUrl: string): Promise<{valid: boolean, dimensions?: string}> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const isOptimal = img.width === 1200 && img.height === 630;
        resolve({
          valid: isOptimal,
          dimensions: `${img.width}x${img.height}`
        });
      };
      img.onerror = () => resolve({valid: false});
      img.src = imageUrl;
    });
  };

  const testMetaTags = async (url: string) => {
    setTesting(true);
    setResults([]);

    try {
      // Simulate meta tag extraction (in a real implementation, this would be server-side)
      const response = await fetch(url);
      const html = await response.text();
      
      // Parse meta tags (enhanced version with image validation)
      const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/) || [];
      const ogDescription = html.match(/<meta property="og:description" content="([^"]*)"/) || [];
      const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/) || [];
      const ogImageWidth = html.match(/<meta property="og:image:width" content="([^"]*)"/) || [];
      const ogImageHeight = html.match(/<meta property="og:image:height" content="([^"]*)"/) || [];
      const twitterTitle = html.match(/<meta name="twitter:title" content="([^"]*)"/) || [];
      const twitterCard = html.match(/<meta name="twitter:card" content="([^"]*)"/) || [];

      // Validate og:image dimensions if present
      let imageValidation = null;
      if (ogImage[1]) {
        imageValidation = await validateImageDimensions(ogImage[1]);
      }

      const newResults: TestResult[] = [
        {
          platform: 'Open Graph (Facebook/LinkedIn)',
          url: url,
          status: ogTitle[1] && ogDescription[1] && ogImage[1] ? 'success' : 'warning',
          title: ogTitle[1],
          description: ogDescription[1],
          image: ogImage[1],
          message: ogTitle[1] && ogDescription[1] && ogImage[1]
            ? `Meta tags configured correctly${imageValidation && !imageValidation.valid ? ` (Image: ${imageValidation.dimensions}, recommended: 1200x630)` : ''}`
            : 'Missing or incomplete Open Graph tags (title, description, image required)'
        },
        {
          platform: 'LinkedIn Optimization',
          url: url,
          status: ogImage[1] && imageValidation?.valid ? 'success' : 'warning',
          image: ogImage[1],
          message: ogImage[1] 
            ? (imageValidation?.valid 
                ? 'Image optimized for LinkedIn (1200x630px)' 
                : `Image found but not optimal for LinkedIn (${imageValidation?.dimensions || 'unknown'}, recommended: 1200x630px)`)
            : 'No og:image found - LinkedIn will not display image preview'
        },
        {
          platform: 'Twitter Cards',
          url: url,
          status: twitterTitle[1] && twitterCard[1] ? 'success' : 'warning',
          title: twitterTitle[1],
          message: twitterTitle[1] && twitterCard[1]
            ? `Twitter Card configured (${twitterCard[1] || 'unknown type'})`
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
    const fullUrl = `${debuggerUrl}?q=${encodeURIComponent(testUrl)}`;
    window.open(fullUrl, '_blank');
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
                
                {(result.title || result.image) && (
                  <div className="space-y-2 text-sm">
                    {result.title && <p><strong>Title:</strong> {result.title}</p>}
                    {result.description && <p><strong>Description:</strong> {result.description}</p>}
                    {result.image && (
                      <div>
                        <p><strong>Image URL:</strong> <span className="text-xs break-all">{result.image}</span></p>
                        <div className="mt-2 border rounded p-2 bg-gray-50">
                          <img 
                            src={result.image} 
                            alt="og:image preview" 
                            className="max-w-full h-auto max-h-32 rounded"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}
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
              <h4 className="font-semibold mb-2">LinkedIn Image Optimization</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Size: 1200x630px (optimal for LinkedIn)</li>
                <li>• Format: JPG, PNG, or WebP</li>
                <li>• File size: Under 5MB (recommended under 100KB)</li>
                <li>• High contrast for professional visibility</li>
                <li>• Use absolute URLs</li>
                <li>• Include og:image:width and og:image:height</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialSharingTester;