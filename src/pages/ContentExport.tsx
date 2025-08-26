import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

import { PAGES_LIST } from '@/export/pagesList';
import { extractGlobalContent } from '@/export/extractors/global';
import { extractHomepageContent } from '@/export/extractors/homepage';
import { extractStructuredCaseStudyContent } from '@/export/extractors/structuredCaseStudy';
import { buildSEO, BuiltSEO } from '@/utils/seo/seoBuilder';
import { resolveSeoInput } from '@/data/seoData';
import { blogPosts } from '@/data/blogData';
import { SERVICES_DATA, SERVICES_CTA, SERVICES_HERO } from '@/data/services';
import { getTemplateForPageType } from '@/export/templateRegistry';
import { SectionExport } from '@/export/extractors/global';

const ContentExport: React.FC = () => {
  const exportText = useMemo(() => {
    let output = '';

    // === GLOBAL ===
    output += '=== GLOBAL ===\n\n';
    extractGlobalContent().forEach(section => {
      output += `--- SECTION: ${section.displayName} ---\n`;
      output += `Section Key/ID: ${section.key}\n`;
      output += `Visibility: ${section.visibility}\n`;
      output += `H1: ${section.fields.h1 || ''}\n`;
      output += `Body: ${section.fields.body || ''}\n\n`;
    });

    // === PAGES ===
    const pages = PAGES_LIST.filter(p => p.type !== 'global');

    pages.forEach(page => {
      output += `=== PAGE: ${page.title} — ${page.url} ===\n\n`;

      // --- SEO Meta ---
      let seoData: BuiltSEO;
      try {
        // resolveSeoInput is async, but here we just use the shape
        // in non-runtime context; fallback if not resolved
        const input: any = {
          path: page.url,
          kind: page.type === 'case-study' ? 'project' :
                page.type === 'blog-post' ? 'post' : 'page',
          title: page.title,
          description: ''
        };
        seoData = buildSEO(input);
      } catch {
        seoData = {
          title: page.title,
          description: '',
          canonical: `https://barskydesign.pro${page.url}`,
          type: 'website',
          image: '',
          robots: 'index,follow'
        };
      }

      output += 'Meta\n';
      output += `- Meta Title: ${seoData.title || ''}\n`;
      output += `- Meta Description: ${seoData.description || ''}\n`;
      output += `- OpenGraph Title: ${seoData.title || ''}\n`;
      output += `- OpenGraph Description: ${seoData.description || ''}\n`;
      output += `- OpenGraph Image: ${seoData.image || ''}\n\n`;

      // --- Sections ---
      let sections: SectionExport[] = [];

      switch (page.type) {
        case 'homepage':
          sections = extractHomepageContent();
          break;
        case 'case-study':
          sections = extractStructuredCaseStudyContent(page.id);
          break;
        case 'services':
          sections = [
            {
              key: 'hero',
              displayName: 'Hero',
              visibility: 'rendered',
              fields: {
                h1: SERVICES_HERO.title,
                h2: '',
                h3: '',
                body: SERVICES_HERO.description,
                bullets: [],
                captions: [],
                formLabels: [],
                tooltips: [],
                ctas: [{ label: SERVICES_HERO.buttonText, url: '/contact' }],
                notes: ''
              }
            }
          ];
          break;
        case 'blog-index':
          sections = [
            {
              key: 'posts-grid',
              displayName: 'Posts Grid',
              visibility: 'rendered',
              fields: {
                h1: '',
                h2: '',
                h3: '',
                body: '',
                bullets: blogPosts.map(p => `${p.title} — ${p.excerpt}`),
                captions: [],
                formLabels: [],
                tooltips: [],
                ctas: blogPosts.map(p => ({ label: `Read ${p.title}`, url: `/blog/${p.slug}` })),
                notes: 'Blog posts with metadata'
              }
            }
          ];
          break;
        default:
          sections = getTemplateForPageType(page.type).map(s => ({
            key: s.key,
            displayName: s.displayName,
            visibility: 'hidden',
            fields: {
              h1: '',
              h2: '',
              h3: '',
              body: '',
              bullets: [],
              captions: [],
              formLabels: [],
              tooltips: [],
              ctas: [],
              notes: '<EMPTY>'
            }
          }));
      }

      // Print sections
      sections.forEach(section => {
        output += `--- SECTION: ${section.displayName} ---\n`;
        output += `Section Key/ID: ${section.key}\n`;
        output += `Visibility: ${section.visibility}\n`;
        output += `H1: ${section.fields.h1 || ''}\n`;
        output += `Body: ${section.fields.body || ''}\n\n`;
      });
    });

    return output;
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      toast.success('Content copied!');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Site Content Export</h1>
        <Button onClick={copyToClipboard} size="lg">
          <Copy className="mr-2 h-5 w-5" /> Copy All Content
        </Button>
        <div className="bg-muted/30 border rounded-lg p-6 mt-6">
          <pre className="whitespace-pre-wrap text-sm font-mono">
            {exportText}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ContentExport;
