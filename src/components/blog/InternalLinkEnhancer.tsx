import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogData';

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
  // Link to portfolio red flags article
  {
    keywords: ['portfolio', 'case study', 'case studies'],
    targetSlug: 'portfolio-red-flags-no-interviews',
    anchorText: 'portfolio optimization',
    title: 'Portfolio Red Flags: Why Your UX Portfolio Isn\'t Getting You Interviews'
  },
  
  // Link to finding first UX job
  {
    keywords: ['job search', 'career', 'networking', 'interviews'],
    targetSlug: 'finding-first-ux-job-guide',
    anchorText: 'UX job search strategies',
    title: 'Finding Your First UX Job: A Senior Designer\'s Honest Guide'
  },
  
  // Link to design systems article
  {
    keywords: ['design system', 'design systems', 'components', 'documentation'],
    targetSlug: 'design-systems-that-get-used',
    anchorText: 'building effective design systems',
    title: 'Building Design Systems That Actually Get Used'
  },
  
  // Link to AI-enhanced UX article
  {
    keywords: ['AI', 'artificial intelligence', 'future', 'technology', 'automation'],
    targetSlug: 'ai-enhanced-ux-designer-future',
    anchorText: 'AI-enhanced UX design',
    title: 'The AI-Enhanced UX Designer: Future-Proofing Your Career'
  },
  
  // Link to user research article
  {
    keywords: ['user research', 'research', 'budget', 'testing', 'usability'],
    targetSlug: 'user-research-shoestring-budget',
    anchorText: 'cost-effective user research methods',
    title: 'User Research on a Shoestring Budget: Maximum Impact, Minimum Cost'
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
  
  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: enhancedContent }}
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
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Related UX Design Articles
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article 
            key={post.id}
            className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h4>
            
            <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <Link 
              to={`/blog/${post.slug}`}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
              title={`Read more about ${post.title}`}
            >
              Read More →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default InternalLinkEnhancer;