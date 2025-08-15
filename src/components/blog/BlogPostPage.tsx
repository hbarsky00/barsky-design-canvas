import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useParams, Navigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

import { blogPosts } from '@/data/blogPosts';
import BlogPostContent from '@/components/blog/BlogPostContent';
import RelatedPosts from '@/components/blog/RelatedPosts';
import BlogPostShare from '@/components/blog/BlogPostShare';
import TableOfContents from '@/components/blog/TableOfContents';
import BlogPostNavigation from '@/components/blog/BlogPostNavigation';
import BlogPostEngagement from '@/components/blog/BlogPostEngagement';
import AuthorBio from '@/components/blog/AuthorBio';
import NewsletterSignup from '@/components/blog/NewsletterSignup';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blogPost = blogPosts[id || ""];

  if (!blogPost) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <SEO
        title={`${blogPost.title} | Blog`}
        description={blogPost.description}
        image={blogPost.image}
        type="article"
        publishedDate={blogPost.date}
        tags={blogPost.tags}
      />
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-[calc(var(--header-height,64px)+12px)]">
          <BlogPostNavigation />

          <section className="relative py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <Link to="/blog" className="text-blue-500 hover:underline flex items-center">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Blog
                  </Link>
                  <BlogPostShare blogPost={blogPost} />
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">{blogPost.title}</h1>

                <div className="flex items-center text-gray-500 space-x-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{blogPost.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{blogPost.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{blogPost.readTime}</span>
                  </div>
                </div>

                <div className="space-x-2">
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </motion.div>

              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-9">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-lg max-w-none mb-8"
                  >
                    <BlogPostContent content={blogPost.content} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-8"
                  >
                    <BlogPostEngagement />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <AuthorBio />
                  </motion.div>
                </div>

                <aside className="lg:col-span-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-8"
                  >
                    <TableOfContents content={blogPost.content} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <NewsletterSignup />
                  </motion.div>
                </aside>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <RelatedPosts currentPost={blogPost} />
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
