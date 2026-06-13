import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogData';
import { sanitizeHtml } from '@/utils/htmlSanitizer';

interface InternalLinkEnhancerProps {
  content: string;
  currentSlug: string;
}

interface LinkRule {
  keywords: string[];
  targetSlug: string;
  anchorText: string;
  title: string;
}

/**
 * SEO-optimized internal linking rules
 * Each rule defines keywords to match and the target post to link to
 */
const getLinkingRules = (): LinkRule[] => [
  {
    keywords: ['Claude', 'starter', 'learn'],
    targetSlug: 'learning-ai-design-with-claude',
    anchorText: 'learning AI design with Claude',
    title: "Learning AI Design with Claude: A Designer's Starter Kit"
  },
  {
    keywords: ['prompt', 'prompting', 'prompt engineering'],
    targetSlug: 'prompt-engineering-for-designers',
    anchorText: 'prompt engineering for designers',
    title: 'Prompt Engineering for Designers'
  },
  {
    keywords: ['AI-native', 'interface', 'interfaces', 'UX patterns'],
    targetSlug: 'designing-ai-native-interfaces',
    anchorText: 'designing AI-native interfaces',
    title: 'Designing AI-Native Interfaces'
  },
  {
    keywords: ['ChatGPT', 'Gemini', 'model comparison', 'compare models'],
    targetSlug: 'chatgpt-vs-claude-vs-gemini-for-ux',
    anchorText: 'comparing ChatGPT, Claude, and Gemini for UX',
    title: 'ChatGPT vs Claude vs Gemini for UX'
  },
  {
    keywords: ['prototype', 'prototyping', 'weekend build', 'MVP'],
    targetSlug: 'ai-powered-prototype-weekend',
    anchorText: 'AI-powered prototyping in a weekend',
    title: 'AI-Powered Prototype in a Weekend'
  },
  {
    keywords: ['trust', 'transparency', 'AI safety', 'reliability'],
    targetSlug: 'designing-trust-into-ai',
    anchorText: 'designing trust into AI',
    title: 'Designing Trust into AI'
  },
  {
    keywords: ['Figma', 'production', 'handoff', 'shipping'],
    targetSlug: 'figma-to-production-with-ai',
    anchorText: 'Figma to production with AI',
    title: 'Figma to Production with AI'
  }
];

/**
 * Enhanced content with strategic internal links for SEO
 */
export const InternalLinkEnhancer: React.FC<InternalLinkEnhancerProps> = ({ 
  content, 
  currentSlug 
}) => {
  const linkingRules = getLinkingRules();
  
  // Don't link to the current article
  const availableRules = linkingRules.filter(rule => rule.targetSlug !== currentSlug);
  
  const enhanceContentWithLinks = (htmlContent: string): string => {
    let enhancedContent = htmlContent;
    let linksAdded = 0;
    const maxLinksPerPost = 3; // SEO best practice: 2-3 internal links per post
    
    // Track which rules we've already used to avoid duplicate links
    const usedRules = new Set<string>();
    
    for (const rule of availableRules) {
      if (linksAdded >= maxLinksPerPost) break;
      if (usedRules.has(rule.targetSlug)) continue;
      
      // Find the first occurrence of any keyword in the content
      for (const keyword of rule.keywords) {
        // Create a regex that matches the keyword but not if it's already in a link
        const keywordRegex = new RegExp(
          `(?<!<a[^>]*>.*?)\\b${keyword}\\b(?![^<]*</a>)`,
          'i'
        );
        
        if (keywordRegex.test(enhancedContent)) {
          // Replace the first occurrence with a link
          enhancedContent = enhancedContent.replace(
            keywordRegex,
            `<a href="/blog/${rule.targetSlug}" 
               class="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors duration-200"
               title="${rule.title}"
               rel="internal">
               ${rule.anchorText}
            </a>`
          );
          
          usedRules.add(rule.targetSlug);
          linksAdded++;
          break; // Move to next rule after finding a match
        }
      }
    }
    
    return enhancedContent;
  };
  
  const enhancedContent = enhanceContentWithLinks(content);
  
  // Sanitize HTML to prevent XSS attacks
  const sanitizedContent = sanitizeHtml(enhancedContent);
  
  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

/**
 * Related posts section for end of articles
 */
interface RelatedPostsProps {
  currentSlug: string;
  maxPosts?: number;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ 
  currentSlug, 
  maxPosts = 3 
}) => {
  const currentPost = blogPosts.find(post => post.slug === currentSlug);
  if (!currentPost) return null;
  
  // Find related posts based on shared tags
  const relatedPosts = blogPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => ({
      ...post,
      sharedTags: post.tags.filter(tag => currentPost.tags.includes(tag)).length
    }))
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, maxPosts);
  
  if (relatedPosts.length === 0) return null;
  
  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="heading-subsection text-gray-900 mb-6">
        Related AI Design Posts
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors duration-200 block"
            title={`Read more about ${post.title}`}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-5">
              <h4 className="heading-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                {post.title}
              </h4>

              <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InternalLinkEnhancer;