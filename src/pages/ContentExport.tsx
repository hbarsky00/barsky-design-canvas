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
    const globalSections = extractGlobalContent();
    globalSections.forEach(section => {
      output += `--- SECTION: ${section.displayName} ---\n`;
      output += `Section Key/ID: ${section.key}\n`;
      output += `Visibility: ${section.visibility}\n`;
      output += `H1: ${section.fields.h1 || ''}\n`;
      output += `H2: ${section.fields.h2 || ''}\n`;
      output += `H3: ${section.fields.h3 || ''}\n`;
      output += `Body: ${section.fields.body || ''}\n`;
      output += `Bullets: ${section.fields.bullets?.join('; ') || ''}\n`;
      output += `Captions / Alt text: ${section.fields.captions?.join('; ') || ''}\n`;
      output += `Form labels / placeholders / validation messages: ${section.fields.formLabels?.join('; ') || ''}\n`;
      output += `Tooltips / helper text: ${section.fields.tooltips?.join('; ') || ''}\n`;
      output += `CTA Buttons: ${section.fields.ctas?.map(c => `${c.label} (${c.url})`).join('; ') || ''}\n`;
      output += `Notes: ${section.fields.notes || ''}\n\n`;
    });

    // === PAGES ===
    const pages = PAGES_LIST.filter(p => p.type !== 'global');

    pages.forEach(page => {
      output += `=== PAGE: ${page.title} — ${page.url} ===\n\n`;

      // --- SEO Meta ---
      let seoData: BuiltSEO;
      try {
        const input = resolveSeoInput(page.url);
        seoData = buildSEO(input as any);
      } catch {
        seoData = {
          title: '',
          description: '',
          canonical: '',
          type: 'website',
          image: '',
          imageAlt: '',
          robots: 'index,follow'
        };
      }

      output += 'Meta\n';
      output += `- Meta Title: ${seoData.title || ''}\n`;
      output += `- Meta Description: ${seoData.description || ''}\n`;
      output += `- OpenGraph Title: ${seoData.title || ''}\n`;
      output += `- OpenGraph Description: ${seoData.description || ''}\n`;
      output += `- OpenGraph Image alt/caption: ${seoData.imageAlt || ''}\n\n`;

      // --- Sections ---
      let sections: SectionExport[] = [];

      switch (page.type) {
        case 'homepage':
          sections = extractHomepageContent();
          break;

        case 'case-study':
          sections = extractStructuredCaseStudyContent(page.id);
          break;

        case 'projects':
          sections = [{
            key: 'page-title',
            displayName: 'Page Title',
            visibility: 'rendered',
            fields: {
              h1: 'Projects',
              h2: '',
              h3: '',
              body: 'Design case studies showcasing impact, outcomes, and process.',
              bullets: [],
              captions: [],
              formLabels: [],
              tooltips: [],
              ctas: [],
              notes: ''
            }
          }];
          break;

        case 'services':
          sections = [{
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
          }];
          break;

        case 'about':
          sections = [{
            key: 'personal-story',
            displayName: 'Personal Story',
            visibility: 'rendered',
            fields: {
              h1: 'About Hiram',
              h2: '',
              h3: '',
              body: '15+ years designing fintech, healthcare, and SaaS platforms.',
              bullets: [],
              captions: [],
              formLabels: [],
              tooltips: [],
              ctas: [],
              notes: ''
            }
          }];
          break;

        case 'contact':
          sections = [{
            key: 'page-title',
            displayName: 'Page Title',
            visibility: 'rendered',
            fields: {
              h1: 'Get In Touch',
              h2: '',
              h3: '',
              body: '',
              bullets: [],
              captions: [],
              formLabels: [],
              tooltips: [],
              ctas: [],
              notes: ''
            }
          }];
          break;

        case 'blog-index':
          sections = [{
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
          }];
          break;

        case 'blog-post':
          const post = blogPosts.find(p => p.slug === page.id);
          if (post) {
            sections = [{
              key: 'header',
              displayName: 'Header',
              visibility: 'rendered',
              fields: {
                h1: post.title,
                h2: '',
                h3: '',
                body: post.excerpt,
                bullets: post.tags,
                captions: [post.coverImage],
                formLabels: [],
                tooltips: [],
                ctas: [],
                notes: ''
              }
            }];
          }
          break;

        default:
          sections = getTemplateForPageType(page.type).map(s => ({
            key: s.key,
            displayName: s.displayName,
            visibility: 'hidden',
            fields: { h1:'',h2:'',h3:'',body:'',bullets:[],captions:[],formLabels:[],tooltips:[],ctas:[],notes:'<EMPTY>' }
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
