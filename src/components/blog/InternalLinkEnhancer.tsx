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
  /** Blog slug (validated against blogData) — omit for case-study rules. */
  targetSlug?: string;
  /** Absolute in-app path. Derived from targetSlug when not given. */
  href?: string;
  anchorText: string;
  title: string;
}

/**
 * Case-study targets. Blog posts previously only ever linked to other blog
 * posts, so the case studies — the pages that actually convert — got no
 * internal link equity from the blog at all.
 */
const CASE_STUDY_RULES: LinkRule[] = [
  { keywords: ['prediction market', 'prediction markets', 'play money'], href: '/project/stips', anchorText: 'Stips', title: 'Stips — prediction markets you can read' },
  { keywords: ['boxing', 'game feel', 'hit-stop', 'browser game'], href: '/project/ring-rival', anchorText: 'Ring-Rival', title: 'Ring-Rival — console boxing feel on the mobile web' },
  { keywords: ['herbalist', 'credential', 'credentials', 'practitioner'], href: '/project/herbalink', anchorText: 'HerbaLink', title: 'HerbaLink — credentials as a gate, not a badge' },
  { keywords: ['pickup sports', 'meeting strangers', 'safety'], href: '/project/catchbuddy', anchorText: 'CatchBuddy', title: 'CatchBuddy — same-day pickup sports, designed for trust' },
  { keywords: ['Excel', 'spreadsheet', 'system of record', 'loan'], href: '/project/investor-loan-app', anchorText: 'the Investor Loan Platform', title: 'Investor Loan Platform — replacing Excel as the system of record' },
  { keywords: ['enterprise search', 'data discovery', 'data assets'], href: '/project/dae-search', anchorText: 'DAE Search', title: 'DAE Search — enterprise data discovery' },
  { keywords: ['co-parenting', 'custody'], href: '/project/splittime', anchorText: 'SplitTime', title: 'SplitTime — structured requests instead of open chat' },
  { keywords: ['deletion list', 'cut features', 'scope discipline'], href: '/project/fire-lion', anchorText: 'Fire Lion', title: 'Fire Lion — a deletion list longer than the feature list' },
];

/**
 * SEO-optimized internal linking rules
 * Each rule defines keywords to match and the target post to link to
 */
const getLinkingRules = (): LinkRule[] => [
  // Link to the portfolio article
  {
    keywords: ['portfolio', 'case study', 'case studies'],
    targetSlug: 'everyones-portfolio-looks-good-now',
    anchorText: 'portfolios in the AI era',
    title: 'Everyone\'s Portfolio Looks Good Now'
  },

  // Link to the hiring / job market article
  {
    keywords: ['hiring', 'job market', 'career', 'interviews', 'juniors'],
    targetSlug: 'shipping-got-cheap-hiring-got-harder',
    anchorText: 'design hiring right now',
    title: 'Shipping Got Cheap. Hiring Got Harder.'
  },

  // Link to the designers-who-code article
  {
    keywords: ['handoff', 'front-end', 'engineers', 'build it yourself', 'shipped'],
    targetSlug: 'designer-who-codes-argument-is-over',
    anchorText: 'designers who build',
    title: 'The Designer Who Codes Argument Is Over'
  },

  // Link to the debugging AI-generated code article
  {
    keywords: ['bug', 'bugs', 'generated code', 'row-level security', 'verification'],
    targetSlug: 'two-bugs-ai-wrote-that-i-had-to-find',
    anchorText: 'debugging AI-written code',
    title: 'Two Bugs AI Wrote That I Had to Find Myself'
  },

  // Link to the taste article
  {
    keywords: ['taste', 'judgment', 'game feel', 'deletion', 'craft'],
    targetSlug: 'taste-is-the-whole-job',
    anchorText: 'taste as the differentiator',
    title: 'When Generating Is Free, Taste Is the Whole Job'
  },

  // Link to the what-changed article
  {
    keywords: ['artificial intelligence', 'automation', 'AI'],
    targetSlug: 'what-ai-changed-and-what-it-didnt',
    anchorText: 'what AI changed about design work',
    title: 'What AI Changed About Design Work, and What It Didn\'t'
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

  // Don't link to the current article, and never emit a link to a slug that
  // doesn't exist in blogData (a rule pointing at a deleted post otherwise
  // becomes a silent dead link in every article that matches its keywords)
  const availableRules = [...linkingRules, ...CASE_STUDY_RULES].filter(rule => {
    if (rule.href) return true; // case-study targets are static routes
    return rule.targetSlug !== currentSlug && blogPosts.some(post => post.slug === rule.targetSlug);
  });
  
  const enhanceContentWithLinks = (htmlContent: string): string => {
    let linksAdded = 0;
    const maxLinksPerPost = 5; // posts now link to case studies as well as other posts

    // Track which rules we've already used to avoid duplicate links
    const usedRules = new Set<string>();

    // Only link within prose (paragraph) segments — never inside headings.
    // Matching keywords against raw HTML with no structural awareness previously
    // let this rewrite heading text (e.g. a "Research Your Hierarchy" H2 became
    // "cost-effective user research methods Your Hierarchy" because the whole
    // matched word was replaced with the rule's anchor phrase, headings included).
    const segments = htmlContent.split(/(<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>)/i);

    const enhancedSegments = segments.map((segment) => {
      const isHeading = /^<h[1-6][^>]*>/i.test(segment);
      if (isHeading) return segment;

      let enhancedSegment = segment;

      for (const rule of availableRules) {
        if (linksAdded >= maxLinksPerPost) break;
        const ruleKey = rule.href ?? `/blog/${rule.targetSlug}`;
        if (usedRules.has(ruleKey)) continue;

        for (const keyword of rule.keywords) {
          // Match the keyword but not if it's already inside a link
          const keywordRegex = new RegExp(
            `(?<!<a[^>]*>.*?)\\b${keyword}\\b(?![^<]*</a>)`,
            'i'
          );

          if (keywordRegex.test(enhancedSegment)) {
            // Wrap the matched text itself in the link — never substitute it
            // with the rule's (differently worded) anchor phrase, which is
            // what corrupted surrounding prose before.
            enhancedSegment = enhancedSegment.replace(
              keywordRegex,
              (matchedText) =>
                `<a href="${ruleKey}" class="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors duration-200" title="${rule.title}" rel="internal">${matchedText}</a>`
            );

            usedRules.add(ruleKey);
            linksAdded++;
            break; // Move to next rule after finding a match
          }
        }
      }

      return enhancedSegment;
    });

    return enhancedSegments.join('');
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
        Related UX Design Articles
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article 
            key={post.id}
            className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200"
          >
            <h4 className="heading-medium text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h4>
            
            <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
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