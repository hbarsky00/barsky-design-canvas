import React from 'react';
import { imgDims } from "@/utils/imageDims";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { builderPosts, practicePosts, type BlogPost } from '@/data/blogData';
import { Calendar, Clock } from 'lucide-react';

/**
 * The /blog index.
 *
 * Rewritten 2026-11-17. Three things were wrong with it, and all three pushed
 * the same way — toward a reader who already does this job for a living:
 *
 *   1. The h1 was "UX Design & AI Insights". That is a heading for a designer.
 *      A founder with a product that is losing to a spreadsheet does not search
 *      for UX insights, and would not recognise themselves in that page.
 *   2. All 48 posts rendered in one date-ordered grid, so "Why Enterprise Tools
 *      Lose to Excel" sat between "The take-home test stopped proving anything"
 *      and "Your design system now has two readers". The buyer-facing writing
 *      was already here; the page gave a non-designer no way to find it.
 *   3. `delay: index * 0.1` on 48 cards meant the last card began animating
 *      4.8 seconds after the first. Anything below the fold arrived after the
 *      reader did.
 *
 * So the page is now two tracks. The builder track leads and keeps the cards —
 * it is the one that should dominate. The practice track is a dense list
 * instead of 31 more image cards: faster to scan, and it stops the career and
 * portfolio writing from visually outweighing the work a client would hire for.
 *
 * Nothing was unpublished. Every post is still here and still at its own URL.
 */

const META = "flex items-center gap-4 text-sm text-gray-600";

const PostCard: React.FC<{ post: BlogPost; index: number; priority: boolean }> = ({
  post,
  index,
  priority
}) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    /* Capped at 5 steps. The old 0.1-per-card stagger was unbounded, so a long
       list turned into a visible queue rather than a sequence. */
    transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
  >
    {post.coverImage && (
      <div className="w-full h-48 overflow-hidden">
        <img {...imgDims(post.coverImage)}
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover motion-safe:hover:scale-105 transition-transform duration-300"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined} />
      </div>
    )}

    <div className="p-6 flex flex-col flex-1">
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="heading-card text-gray-900 mb-3 text-balance">
        <Link
          to={`/blog/${post.slug}`}
          className="hover:text-blue-600 transition-colors"
        >
          {post.title}
        </Link>
      </h3>

      <p className="text-gray-700 mb-4 line-clamp-3 flex-1">
        {post.excerpt}
      </p>

      <div className={META}>
        <div className="flex items-center gap-1">
          <Calendar aria-hidden="true" className="w-4 h-4" />
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <div className="flex items-center gap-1">
          <Clock aria-hidden="true" className="w-4 h-4" />
          <span>{post.readTime}</span>
        </div>
      </div>
    </div>
  </motion.article>
);

const BlogLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main id="main-content" className="pt-[calc(var(--header-height,64px)+32px)] pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14 md:mb-20 max-w-3xl"
          >
            <h1 className="heading-section text-gray-900 mb-6 text-balance">
              Notes from building and shipping products
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Fifteen years of design and front-end work, written as decisions
              rather than method — what the constraint was, what I cut, and what
              it cost to find out.
            </p>
          </motion.div>

          {/* The buyer-facing track, first and visually dominant. */}
          <section aria-labelledby="for-builders" className="mb-20 md:mb-28">
            <div className="mb-8 md:mb-10 max-w-2xl">
              <h2 id="for-builders" className="heading-subsection text-gray-900 mb-3 text-balance">
                If you&rsquo;re building something
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The problems that show up once a product meets real data, real
                approval chains and people who already have a way of doing this.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {builderPosts.map((post, index) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  index={index}
                  priority={index === 0}
                />
              ))}
            </div>
          </section>

          {/* The craft and career track. A list, not 31 more image cards. */}
          <section aria-labelledby="on-the-craft">
            <div className="mb-8 md:mb-10 max-w-2xl">
              <h2 id="on-the-craft" className="heading-subsection text-gray-900 mb-3 text-balance">
                If you do this work
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Craft, tooling and the state of the job — written for people who
                design and build for a living.
              </p>
            </div>

            <ul className="divide-y divide-gray-200 border-y border-gray-200">
              {practicePosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:justify-between md:gap-8
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                               focus-visible:ring-offset-2 rounded-sm"
                  >
                    <span className="text-base md:text-lg font-semibold text-gray-900 text-balance
                                     group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </span>
                    <span className="flex shrink-0 items-center gap-4 text-sm text-gray-600">
                      <time dateTime={post.date}>{post.date}</time>
                      <span aria-hidden="true">{post.readTime}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BlogLanding;
