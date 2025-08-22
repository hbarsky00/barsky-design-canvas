
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogData';
import { Calendar, User, Clock } from 'lucide-react';

const BlogLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="heading-section text-gray-900 mb-6">
              UX Design & AI Insights
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Expert insights on AI-enhanced UX design, accessibility compliance, 
              and conversion optimization from the field.
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Featured Image */}
                {post.coverImage && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="heading-card text-gray-900 mb-3 line-clamp-2">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
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
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogLanding;
