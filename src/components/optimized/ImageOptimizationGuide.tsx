import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * Development component to guide image optimization
 */
export const ImageOptimizationGuide: React.FC = () => {
  const optimizationChecklist = [
    {
      title: "WebP Format",
      description: "Use WebP format for 25-35% better compression",
      status: "required",
      implementation: "Add .webp versions of all images"
    },
    {
      title: "Responsive Images",
      description: "Provide multiple sizes for different screen resolutions",
      status: "required", 
      implementation: "Generate 480w, 768w, 1024w, 1280w, 1920w variants"
    },
    {
      title: "Lazy Loading",
      description: "Load images only when they enter the viewport",
      status: "implemented",
      implementation: "Use loading='lazy' for below-fold images"
    },
    {
      title: "SEO Alt Text",
      description: "Descriptive alt text with relevant keywords",
      status: "required",
      implementation: "Include context and keywords in alt attributes"
    },
    {
      title: "Optimal File Names",
      description: "SEO-friendly filenames with keywords",
      status: "required",
      implementation: "product-designer-portfolio-case-study.webp"
    },
    {
      title: "Priority Loading",
      description: "Eager load above-fold hero images",
      status: "implemented",
      implementation: "loading='eager' fetchPriority='high' for hero"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'required': return 'bg-orange-100 text-orange-800';
      case 'optional': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Image Optimization Guide
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Follow this checklist to reduce your page size from 8MB+ to under 2MB while maintaining visual quality.
        </p>
      </div>

      <div className="grid gap-4">
        {optimizationChecklist.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-3 rounded-lg">
                <code className="text-sm text-gray-700">
                  {item.implementation}
                </code>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Quick Implementation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">1. Replace existing images:</h4>
            <code className="block bg-white p-2 rounded text-sm">
              {`import { ResponsiveImage } from '@/components/optimized/ResponsiveImage';

<ResponsiveImage
  src="/your-image.jpg"
  alt="Product designer portfolio showcase"
  context="hero"
  seoKeywords={["product design", "portfolio", "case study"]}
  priority={true}
/>`}
            </code>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">2. Generate WebP versions:</h4>
            <code className="block bg-white p-2 rounded text-sm">
              Use online tools or ImageOptim to convert existing images to WebP format
            </code>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">3. Create responsive variants:</h4>
            <code className="block bg-white p-2 rounded text-sm">
              Generate 480w, 768w, 1024w, 1280w, 1920w versions of each image
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};