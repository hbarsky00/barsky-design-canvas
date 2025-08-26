
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPostMetadata } from '@/hooks/usePageMetadata';
import { blogPosts } from '@/data/blogData';
import { InternalLinkEnhancer, RelatedPosts } from '@/components/blog/InternalLinkEnhancer';
import BlogBreadcrumbs from '@/components/seo/BlogBreadcrumbs';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { metadata, loading } = useBlogPostMetadata(slug || '');
  
  // Fallback to static blog data if database doesn't have the post
  const staticPost = blogPosts.find(post => post.slug === slug);
  const post = metadata || staticPost;

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-600">Loading blog post...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const seoData = metadata ? {
    title: metadata.title,
    description: metadata.excerpt,
    featuredImage: metadata.featuredImage,
    author: metadata.author,
    publishedDate: metadata.publishedDate,
    tags: metadata.tags,
    slug: slug || '',
    path: `/blog/${slug}`
  } : {
    title: staticPost!.title,
    description: staticPost!.excerpt,
    featuredImage: staticPost!.coverImage,
    author: staticPost!.author,
    publishedDate: staticPost!.date,
    tags: staticPost!.tags,
    slug: staticPost!.slug,
    path: `/blog/${staticPost!.slug}`
  };

  return (
    <>
      {/* SEO is now handled globally by UnifiedSEO in App.tsx */}
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Featured Image */}
              {(metadata?.featuredImage || staticPost?.coverImage) && (
                <div className="w-full h-96 overflow-hidden">
                  <img
                    src={metadata?.featuredImage || staticPost?.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Article Content */}
              <div className="p-8 lg:p-12">
                {/* SEO Breadcrumbs */}
                <BlogBreadcrumbs 
                  currentTitle={post.title} 
                  currentSlug={slug}
                />
                
                <header className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                    <span>By {metadata?.author || staticPost?.author}</span>
                    <span>•</span>
                    <time dateTime={metadata?.publishedDate || staticPost?.date}>
                      {metadata?.publishedDate || staticPost?.date}
                    </time>
                    <span>•</span>
                    <span>{staticPost?.readTime || '5 min read'}</span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {(metadata?.tags || staticPost?.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </header>
                
                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    {metadata?.excerpt || staticPost?.excerpt}
                  </p>
                  
                  {/* Enhanced blog content with internal SEO links */}
                  {staticPost?.content && (
                    <div className="prose prose-lg max-w-none">
                      <InternalLinkEnhancer 
                        content={staticPost.content} 
                        currentSlug={staticPost.slug} 
                      />
                    </div>
                  )}
                  
                  {/* Related posts section for additional internal linking */}
                  {staticPost && (
                    <RelatedPosts currentSlug={staticPost.slug} maxPosts={3} />
                  )}
                </div>
              </div>
            </motion.article>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
