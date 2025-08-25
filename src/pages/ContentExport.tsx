import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

import { PAGES_LIST } from '@/export/pagesList';
import { extractGlobalContent } from '@/export/extractors/global';
import { extractHomepageContent } from '@/export/extractors/homepage';
import { extractStructuredCaseStudyContent } from '@/export/extractors/structuredCaseStudy';
import { buildSEO } from '@/utils/seo/seoBuilder';
import { getStaticPageSEO, getProjectSEO, getBlogSEO } from '@/data/seoData';
import { blogPosts } from '@/data/blogData';
import { SERVICES_DATA, SERVICES_CTA, SERVICES_HERO } from '@/data/services';
import { getTemplateForPageType } from '@/export/templateRegistry';
import { SectionExport } from '@/export/extractors/global';

const ContentExport: React.FC = () => {
  const exportText = useMemo(() => {
    let output = '';
    
    // GLOBAL section (appears once at top)
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
      output += `CTA Buttons (label + URL): ${section.fields.ctas?.map(cta => `${cta.label} (${cta.url})`).join('; ') || ''}\n`;
      output += `Notes: ${section.fields.notes || ''}\n\n`;
    });
    
    // Process each page
    const pages = PAGES_LIST.filter(page => page.type !== 'global');
    
    pages.forEach(page => {
      output += `=== PAGE: ${page.title} — ${page.url} ===\n\n`;
      
      // SEO Meta fields (from buildSEO only)
      let seoInput;
      if (page.type === 'case-study') {
        const projectSEO = getProjectSEO(page.id);
        seoInput = { 
          path: page.url, 
          kind: 'project' as const,
          ...projectSEO 
        };
      } else if (page.type === 'blog-post') {
        const blogPost = blogPosts.find(post => post.slug === page.id);
        const blogSEO = getBlogSEO(page.id);
        seoInput = {
          path: page.url,
          kind: 'post' as const,
          title: blogPost?.title,
          description: blogPost?.excerpt,
          author: blogPost?.author,
          published: blogPost?.date,
          tags: blogPost?.tags,
          ...blogSEO
        };
      } else {
        const staticSEO = getStaticPageSEO(page.url);
        seoInput = {
          path: page.url,
          kind: staticSEO?.kind || 'page' as const,
          ...staticSEO
        };
      }
      
      const seoData = buildSEO(seoInput);
      
      output += 'Meta\n';
      output += `- Meta Title: ${seoData.title}\n`;
      output += `- Meta Description: ${seoData.description}\n`;
      output += `- OpenGraph Title: ${seoData.title}\n`;
      output += `- OpenGraph Description: ${seoData.description}\n`;
      output += `- OpenGraph Image alt/caption: ${seoData.imageAlt || ''}\n\n`;
      
      // Extract page content based on type
      let sections: SectionExport[] = [];
      
      switch (page.type) {
        case 'homepage':
          sections = extractHomepageContent();
          break;
          
        case 'case-study':
          sections = extractStructuredCaseStudyContent(page.id);
          break;
          
        case 'projects':
          sections = [
            {
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
            },
            {
              key: 'project-cards',
              displayName: 'Project Cards',
              visibility: 'rendered',
              fields: {
                h1: '',
                h2: '',
                h3: '',
                body: '',
                bullets: [
                  'HerbaLink – 3× More Bookings for Certified Herbalists',
                  'SplitTime – Simplifying Co-Parenting with Better Planning',
                  'Business Management – Streamlined Operations Platform',
                  'Investor Loan App – Faster Fintech Underwriting'
                ],
                captions: [],
                formLabels: [],
                tooltips: [],
                ctas: [
                  { label: 'View HerbaLink', url: '/project/herbalink' },
                  { label: 'View SplitTime', url: '/project/splittime' },
                  { label: 'View Business Management', url: '/project/business-management' },
                  { label: 'View Investor Loan App', url: '/project/investor-loan-app' }
                ],
                notes: 'Project cards from projectsData'
              }
            }
          ];
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
            },
            {
              key: 'services-grid',
              displayName: 'Services Grid',
              visibility: 'rendered',
              fields: {
                h1: '',
                h2: '',
                h3: '',
                body: '',
                bullets: SERVICES_DATA.map(service => 
                  `${service.title}: ${service.description} — Features: ${service.features.join(', ')}`
                ),
                captions: [],
                formLabels: [],
                tooltips: [],
                ctas: [],
                notes: 'Services with features from SERVICES_DATA'
              }
            },
            {
              key: 'cta-section',
              displayName: 'CTA Section',
              visibility: 'rendered',
              fields: {
                h1: '',
                h2: SERVICES_CTA.title,
                h3: '',
                body: SERVICES_CTA.description,
                bullets: [],
                captions: [],
                formLabels: [],
                tooltips: [],
                ctas: [{ label: SERVICES_CTA.buttonText, url: '/contact' }],
                notes: ''
              }
            }
          ];
          break;
          
        case 'about':
          sections = [
            {
              key: 'personal-story',
              displayName: 'Personal Story',
              visibility: 'rendered',
              fields: {
                h1: 'About Hiram',
                h2: '',
                h3: '',
                body: 'I\'m a senior UX/Product Designer with 15+ years of experience creating data-driven, AI-powered, and mobile-first digital platforms.',
                bullets: [],
                captions: [],
                formLabels: [],
                tooltips: [],
                ctas: [],
                notes: 'Personal story section'
              }
            }
          ];
          break;
          
        case 'contact':
          sections = [
            {
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
            },
            {
              key: 'contact-information',
              displayName: 'Contact Information',
              visibility: 'rendered',
              fields: {
                h1: '',
                h2: '',
                h3: '',
                body: 'Email: hiram@barskydesign.pro\nLocation: Clifton, NJ\nPhone: Available upon request',
                bullets: [],
                captions: [],
                formLabels: [],
                tooltips: [],
                ctas: [
                  { label: 'Email Me', url: 'mailto:hiram@barskydesign.pro' }
                ],
                notes: 'Contact details and links'
              }
            },
            {
              key: 'contact-form',
              displayName: 'Contact Form',
              visibility: 'rendered',
              fields: {
                h1: '',
                h2: '',
                h3: '',
                body: '',
                bullets: [],
                captions: [],
                formLabels: [
                  'Name',
                  'Email',
                  'Company',
                  'Project Budget',
                  'Message',
                  'How did you hear about us?'
                ],
                tooltips: [],
                ctas: [{ label: 'Send Message', url: '#' }],
                notes: '(Duplicated from GLOBAL)'
              }
            }
          ];
          break;
          
        case 'blog-index':
          sections = [
            {
              key: 'hero',
              displayName: 'Hero',
              visibility: 'rendered',
              fields: {
                h1: 'Design Insights & Case Studies',
                h2: '',
                h3: '',
                body: 'Thoughts on UX, AI, and design strategy — lessons learned from projects and experiments.',
                bullets: [],
                captions: [],
                formLabels: [],
                tooltips: [],
                ctas: [],
                notes: ''
              }
            },
            {
              key: 'posts-grid',
              displayName: 'Posts Grid',
              visibility: 'rendered',
              fields: {
                h1: '',
                h2: '',
                h3: '',
                body: '',
                bullets: blogPosts.map(post => 
                  `${post.title} — ${post.excerpt} — By ${post.author} — ${post.date} — ${post.readTime}`
                ),
                captions: [],
                formLabels: [],
                tooltips: [],
                ctas: blogPosts.map(post => ({ label: `Read ${post.title}`, url: `/blog/${post.slug}` })),
                notes: 'Blog posts with metadata'
              }
            }
          ];
          break;
          
        case 'blog-post':
          const blogPost = blogPosts.find(post => post.slug === page.id);
          if (blogPost) {
            // Convert HTML content to plain text
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = blogPost.content;
            const plainTextContent = tempDiv.textContent || tempDiv.innerText || '';
            
            sections = [
              {
                key: 'header',
                displayName: 'Header',
                visibility: 'rendered',
                fields: {
                  h1: blogPost.title,
                  h2: '',
                  h3: '',
                  body: `By ${blogPost.author} — ${blogPost.date} — ${blogPost.readTime}`,
                  bullets: blogPost.tags,
                  captions: [],
                  formLabels: [],
                  tooltips: [],
                  ctas: [],
                  notes: 'Blog post header with metadata and tags'
                }
              },
              {
                key: 'featured-image',
                displayName: 'Featured Image',
                visibility: 'rendered',
                fields: {
                  h1: '',
                  h2: '',
                  h3: '',
                  body: '',
                  bullets: [],
                  captions: [blogPost.coverImage],
                  formLabels: [],
                  tooltips: [],
                  ctas: [],
                  notes: 'Featured image for blog post'
                }
              },
              {
                key: 'body',
                displayName: 'Body',
                visibility: 'rendered',
                fields: {
                  h1: '',
                  h2: '',
                  h3: '',
                  body: plainTextContent.slice(0, 500) + '...', // Truncate for export
                  bullets: [],
                  captions: [],
                  formLabels: [],
                  tooltips: [],
                  ctas: [],
                  notes: 'Blog post content (HTML converted to plain text, truncated)'
                }
              }
            ];
          }
          break;
          
        default:
          // Get template sections but mark as empty
          const template = getTemplateForPageType(page.type);
          sections = template.map(section => ({
            key: section.key,
            displayName: section.displayName,
            visibility: 'hidden' as const,
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
              notes: '<EMPTY SECTION (present in template)>'
            }
          }));
      }
      
      // Output each section
      sections.forEach(section => {
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
        output += `CTA Buttons (label + URL): ${section.fields.ctas?.map(cta => `${cta.label} (${cta.url})`).join('; ') || ''}\n`;
        output += `Notes: ${section.fields.notes || ''}\n\n`;
      });
      
      // MISSING template sections
      const template = getTemplateForPageType(page.type);
      const missingSections = template.filter(templateSection => 
        !sections.some(section => section.key === templateSection.key)
      );
      
      if (missingSections.length > 0) {
        output += 'MISSING (Template Sections Not Found in Page Content Source):\n';
        missingSections.forEach(section => {
          output += `- ${section.displayName}\n`;
        });
        output += '\n';
      }
      
      output += '\n';
    });
    
    return output;
  }, []);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      toast.success('Content copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy content');
    }
  };
  
  return (
    <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Site Content Export for Grammarly
            </h1>
            <p className="text-muted-foreground mb-4">
              Complete site text export following template canonical sections. 
              All content extracted from components, data files, and templates.
            </p>
            <Button onClick={copyToClipboard} size="lg">
              <Copy className="mr-2 h-5 w-5" />
              Copy All Content
            </Button>
          </div>
          
          <div className="bg-muted/30 border rounded-lg p-6">
            <pre className="whitespace-pre-wrap text-sm font-mono text-foreground overflow-x-auto">
              {exportText}
            </pre>
          </div>
        </div>
      </div>
  );
};

export default ContentExport;