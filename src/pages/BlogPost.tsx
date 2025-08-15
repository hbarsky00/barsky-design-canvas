import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';
import BlogPostContent from '@/components/blog/BlogPostContent';
import RelatedPosts from '@/components/blog/RelatedPosts';
import BlogPostShare from '@/components/blog/BlogPostShare';
import TableOfContents from '@/components/blog/TableOfContents';
import BlogPostNavigation from '@/components/blog/BlogPostNavigation';
import BlogPostEngagement from '@/components/blog/BlogPostEngagement';
import AuthorBio from '@/components/blog/AuthorBio';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import SEO from '@/components/SEO';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blogPost = blogPosts.find(post => post.id === id);

  if (!blogPost) {
    return <Navigate to="/blog" replace />;
  }

  const baseUrl = 'https://barskydesign.pro';
  const postUrl = `${baseUrl}/blog/${blogPost.id}`;

  return (
    <>
      <SEO
        title={`${blogPost.title} | Blog`}
        description={blogPost.description}
        image={blogPost.image}
        url={postUrl}
        type="article"
        author={blogPost.author}
        publishedDate={blogPost.date}
        tags={blogPost.tags}
      />

      <div className="flex flex-col min-h-screen bg-white">
        <Header />

        <main className="flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative py-16 bg-white"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* Back Button */}
              <div className="mb-8">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/blog" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>

              {/* Post Header */}
              <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {blogPost.title}
                </h1>
                <div className="flex items-center justify-center text-gray-500 space-x-4 mb-6">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    {blogPost.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {blogPost.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    {blogPost.readTime}
                  </div>
                </div>
                <div className="flex justify-center gap-2 mb-4">
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="rounded-2xl shadow-lg w-full max-w-3xl mx-auto mb-8"
                />
              </div>

              <div className="lg:flex lg:space-x-8">
                {/* Table of Contents (Left Sidebar) */}
                {blogPost.tableOfContents && (
                  <aside className="lg:w-1/4 mb-8 lg:mb-0">
                    <TableOfContents items={blogPost.tableOfContents} />
                  </aside>
                )}

                {/* Blog Post Content (Main Content) */}
                <div className="lg:w-3/4">
                  <BlogPostContent content={blogPost.content} />

                  {/* Author Bio */}
                  <AuthorBio author={blogPost.author} bio={blogPost.authorBio} image={blogPost.authorImage} />

                  {/* Blog Post Engagement */}
                  <BlogPostEngagement />

                  {/* Newsletter Signup */}
                  <NewsletterSignup />

                  {/* Related Posts */}
                  <RelatedPosts tags={blogPost.tags} currentPostId={blogPost.id} />

                  {/* Blog Post Navigation */}
                  <BlogPostNavigation currentPostId={blogPost.id} />
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
