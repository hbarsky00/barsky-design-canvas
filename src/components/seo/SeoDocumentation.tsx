
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface SeoDocumentationProps {
  showInDev?: boolean;
}

const SeoDocumentation: React.FC<SeoDocumentationProps> = ({ showInDev = false }) => {
  // Only show in development mode or when explicitly requested
  if (!showInDev && process.env.NODE_ENV === 'production') {
    return null;
  }

  const seoComponents = [
    {
      name: 'StructuredCaseStudySEO',
      status: 'active',
      usage: 'New structured case studies (HerbaLink, SplitTime, Investment App, etc.)',
      features: ['Meta tags', 'Open Graph', 'Twitter Cards', 'JSON-LD Schema', 'Canonical URLs']
    },
    {
      name: 'ProjectDetailSeo',
      status: 'active', 
      usage: 'Project detail pages via SimplifiedProjectDetail',
      features: ['Dynamic meta generation', 'Project-specific schema', 'Social media optimization']
    },
    {
      name: 'LegacyCaseStudySEO',
      status: 'active',
      usage: 'Legacy case studies using old format',
      features: ['Basic meta tags', 'Open Graph', 'Twitter Cards']
    },
    {
      name: 'DynamicSeo',
      status: 'active',
      usage: 'General purpose SEO for various page types',
      features: ['Flexible meta tags', 'Multiple page type support']
    }
  ];

  const pageTypes = [
    {
      type: 'Homepage',
      seoMethod: 'SEO Detection + Dynamic Meta Tags',
      status: 'optimized',
      features: ['Auto-detection', 'Profile image fallback', 'Dynamic descriptions']
    },
    {
      type: 'Project Pages',
      seoMethod: 'ProjectDetailSeo Component',
      status: 'optimized',
      features: ['Project-specific meta', 'Hero image optimization', 'Rich snippets']
    },
    {
      type: 'Case Studies',
      seoMethod: 'StructuredCaseStudySEO or LegacyCaseStudySEO',
      status: 'optimized', 
      features: ['Structured data', 'Performance metrics', 'Social sharing']
    },
    {
      type: 'Service Pages',
      seoMethod: 'Dynamic SEO Detection',
      status: 'basic',
      features: ['Basic meta tags', 'Service-specific descriptions']
    },
    {
      type: 'Blog Posts',
      seoMethod: 'Database-driven metadata',
      status: 'optimized',
      features: ['Author information', 'Published dates', 'Tag integration']
    },
    {
      type: 'Contact Page',
      seoMethod: 'Basic SEO configuration',
      status: 'basic',
      features: ['Contact information', 'Location data']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimized':
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'basic':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'optimized' || status === 'active' ? 'default' : 
                   status === 'basic' ? 'secondary' : 'outline';
    return <Badge variant={variant}>{status}</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">SEO Implementation Overview</h1>
        <p className="text-muted-foreground">Comprehensive SEO coverage across all page types</p>
      </div>

      {/* SEO Components */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Info className="h-5 w-5" />
          SEO Components
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {seoComponents.map((component) => (
            <div key={component.name} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{component.name}</h3>
                <div className="flex items-center gap-2">
                  {getStatusIcon(component.status)}
                  {getStatusBadge(component.status)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{component.usage}</p>
              <div className="flex flex-wrap gap-1">
                {component.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Page Type Coverage */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Page Type Coverage
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pageTypes.map((page) => (
            <div key={page.type} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{page.type}</h3>
                <div className="flex items-center gap-2">
                  {getStatusIcon(page.status)}
                  {getStatusBadge(page.status)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{page.seoMethod}</p>
              <div className="space-y-1">
                {page.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* SEO Features */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Implemented SEO Features</h2>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {[
            'Meta Tags Optimization',
            'Open Graph Protocol',
            'Twitter Card Metadata', 
            'JSON-LD Structured Data',
            'Canonical URLs',
            'Sitemap Generation',
            'URL Indexing',
            'Analytics Integration',
            'Core Web Vitals',
            'Social Media Images',
            'Rich Snippets',
            'Performance Tracking'
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 p-2 rounded">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SeoDocumentation;
