import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogData';
import { sanitizeHtml } from '@/utils/htmlSanitizer';

interface InternalLinkEnhancerProps {
  content: string;
  currentSlug: string;
}

interface LinkRule {
  /** Phrases to look for in the post body, matched case-insensitively. */
  phrases: string[];
  targetSlug: string;
  /** Tooltip only. It is never used as the link text — see below. */
  title: string;
}

/**
 * Internal linking rules.
 *
 * Rewritten 2026-11-17 after finding two things wrong with this file, both
 * live on every blog post.
 *
 * **1. It was rewriting Hiram's sentences.** The old implementation replaced
 * the matched keyword with a different `anchorText` phrase. The rule for the
 * keyword "AI" carried `anchorText: 'designing and building products'`, so this
 * sentence shipped on /blog/the-work-is-deleting-not-generating:
 *
 *     "...the parts designing and building products genuinely couldn't do,
 *      is in the Ring-Rival case study."
 *
 * He wrote "the parts AI genuinely couldn't do". A linker is not allowed to
 * edit prose, and this one was doing it silently, on published pages, wherever
 * a one-word keyword happened to land mid-sentence. The injector below now
 * wraps the matched text and changes nothing.
 *
 * **2. Every rule pointed at a post written for designers** — portfolios, the
 * UX job search, a designer's AI career, research methods. So a founder
 * reading "Why Enterprise Tools Lose to Excel" was handed three links into
 * design-career content, and the internal link graph — which is a strong
 * signal about what a site is *about* — argued the site was for designers.
 * That is the same audience problem as the /blog index, one layer down.
 *
 * Rules are now ordered buyer-facing first, and only three are injected per
 * post, so the top of this list is what most posts get.
 *
 * Phrases are multi-word and specific on purpose. Single common words ("AI",
 * "research", "career") matched almost every post and produced links that
 * carried no meaning even when they did not mangle the sentence.
 */
const getLinkingRules = (): LinkRule[] => [
  {
    phrases: ['replace Excel', 'spreadsheet', 'Excel'],
    targetSlug: 'why-enterprise-tools-lose-to-excel',
    title: 'Why Enterprise Tools Lose to Excel'
  },
  {
    phrases: ['approval chain', 'compliance review', 'regulated'],
    targetSlug: 'design-for-the-approval-gates',
    title: 'In Regulated Work, Design for the Gates'
  },
  {
    phrases: ['the demo', 'a demo', 'happy path'],
    targetSlug: 'demo-works-shipping-is-different',
    title: 'The Demo Works. Shipping Is a Different Job.'
  },
  {
    phrases: ['hire a designer', 'hiring a team', 'an agency', 'handoff'],
    targetSlug: 'one-person-or-a-team',
    title: "When One Person Should Build Your Product, and When They Shouldn't"
  },
  {
    phrases: ['cold start', 'before you have the data'],
    targetSlug: 'built-product-without-real-data',
    title: 'Shipping an AI Feature Before You Have the Data'
  },
  {
    phrases: ['scope discipline', 'what not to ship', 'prioritisation'],
    targetSlug: 'scope-discipline-when-building-is-cheap',
    title: 'Scope Discipline When Building Is Cheap'
  },
  {
    phrases: ['trust and safety', 'trust & safety'],
    targetSlug: 'designing-for-trust-when-the-product-is-the-risk',
    title: 'Designing for Trust When the Product Is the Risk'
  },
  // Cross-audience: a design system is a thing both a buyer and a practitioner
  // ask about, so this one stays.
  {
    phrases: ['design system'],
    targetSlug: 'design-systems-that-get-used',
    title: 'Your design system now has two readers, and one of them is a model'
  },
  // Practitioner-facing, kept last so it only fires on posts that matched
  // nothing above.
  {
    phrases: ['user research', 'usability testing'],
    targetSlug: 'user-research-shoestring-budget',
    title: 'Research with no budget, when the tempting shortcut is a model'
  }
];

/** Escape a phrase for safe use inside a RegExp. */
const escapeRe = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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
    const maxLinksPerPost = 3; // 2-3 internal links per post is plenty.

    const usedSlugs = new Set<string>();

    for (const rule of availableRules) {
      if (linksAdded >= maxLinksPerPost) break;
      if (usedSlugs.has(rule.targetSlug)) continue;

      for (const phrase of rule.phrases) {
        // Match the phrase only in body text: not inside an existing anchor,
        // not inside a tag, and not inside an attribute value. The negative
        // lookahead for `</a>` without an intervening `<` is what keeps it out
        // of link text that is already there.
        const phraseRegex = new RegExp(
          `\\b(${escapeRe(phrase)})\\b(?![^<]*</a>)(?![^<>]*>)`,
          'i'
        );

        if (!phraseRegex.test(enhancedContent)) continue;

        // `$1` — the author's own words become the link text. The previous
        // version substituted a different phrase here, which silently rewrote
        // published sentences. Never do that again: a linker links, it does
        // not edit.
        enhancedContent = enhancedContent.replace(
          phraseRegex,
          `<a href="/blog/${rule.targetSlug}" class="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors duration-200" title="${rule.title}" rel="internal">$1</a>`
        );

        usedSlugs.add(rule.targetSlug);
        linksAdded++;
        break;
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
              Read More<span className="sr-only">: {post.title}</span> →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default InternalLinkEnhancer;