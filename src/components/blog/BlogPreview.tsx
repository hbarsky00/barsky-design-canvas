
import React from "react";
import { imgDims } from "@/utils/imageDims";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogData";
import SectionHeader from "@/components/shared/SectionHeader";

interface BlogPreviewProps {
  maxPosts?: number;
  showTitle?: boolean;
  /** Override the curated picks — pass nothing on the homepage. */
  slugs?: string[];
}

/**
 * The three posts the homepage leads with, chosen rather than dated.
 *
 * Measured 2026-11-16: of 48 posts, 13 name a design practitioner as the reader
 * in the title itself ("Prompt Engineering for Designers", "How to Interview a
 * Designer Now", "Your portfolio gets read by a robot before a human"), and a
 * title-by-title read puts roughly 28 of 48 as writing for the design
 * profession against 11 for someone who owns a product. Five of the six newest
 * are for the profession. That is a corpus that selects designers as its
 * audience — which is why the inbound is designers offering to redesign the
 * site, and why a founder with a broken internal tool never enters it.
 *
 * Sorting the strip by date (earlier the same day) made its "Latest" claim
 * true, and put three pieces of career advice for designers on the page whose
 * job is to convert a founder. Date was the wrong selector for this slot.
 *
 * These three are Hiram's own writing, picked to match the site's settled
 * positioning — SaaS, web apps, mobile apps and internal tools, across fintech,
 * healthcare and pharma. Nothing here is a new claim; it is an edit.
 */
const HOMEPAGE_PICKS = [
  "why-enterprise-tools-lose-to-excel",
  "demo-works-shipping-is-different",
  "design-for-the-approval-gates",
] as const;

const BlogPreview: React.FC<BlogPreviewProps> = ({
  maxPosts = 3,
  showTitle = true,
  slugs
}) => {
  // Resolve the picks against the real corpus, drop any that no longer exist,
  // and top up from newest-first so a renamed slug degrades to a stale-free
  // strip instead of blanking the section.
  const wanted = slugs ?? HOMEPAGE_PICKS;
  const picked = wanted
    .map(slug => blogPosts.find(post => post.slug === slug))
    .filter((post): post is (typeof blogPosts)[number] => Boolean(post));
  const recentPosts = [
    ...picked,
    ...blogPosts.filter(post => !picked.some(p => p.id === post.id))
  ].slice(0, maxPosts);

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {showTitle && (
          <SectionHeader
            as="h2"
            title="If you're building something"
            subtitle="Three on what actually sinks a build. The rest of the writing is in the archive."
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recentPosts.map(post => <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Link to={`/blog/${post.slug}`} className="block aspect-video w-full overflow-hidden bg-gray-100">
                <img {...imgDims(post.coverImage)} src={post.coverImage} alt={post.title} className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300" loading="lazy" />
              </Link>
              
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3 md:gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="heading-medium md:text-xl text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm md:text-base">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map(tag => <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>)}
                </div>
                
                <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm md:text-base">
                  {/* "Read More" x3 was the only generic anchor text left on the
                      site. The sr-only half gives crawlers and screen readers the
                      real destination without changing the visual link. */}
                  Read More<span className="sr-only">: {post.title}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>)}
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <Link to="/blog">
            <Button size="lg" variant="outline">
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
