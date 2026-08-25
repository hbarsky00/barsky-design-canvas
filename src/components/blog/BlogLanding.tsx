
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { sortedBlogPosts } from '@/data/blogData';
import { Calendar, User, Clock } from 'lucide-react';

const BlogLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-[calc(var(--header-height,64px)+32px)] pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="heading-section text-foreground mb-6">
              Designing and Developing Software
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Notes from building products end to end: AI-assisted workflow, design systems,
              and what shipping solo actually takes.
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedBlogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background border border-border/10 rounded-xs shadow-elevation-2 overflow-hidden hover:shadow-elevation-4 transition-shadow duration-300"
              >
                {/* The whole card is one link. Only the <h3> used to be, so
                    clicking the cover image — the biggest, most obviously
                    clickable thing on the card — did nothing at all. One Link
                    wrapping everything keeps a single tab stop and one
                    accessible name rather than several competing ones. */}
                <Link to={`/blog/${post.slug}`} className="group block">
                {post.coverImage && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="heading-card text-foreground mb-3 line-clamp-2 transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogLanding;
