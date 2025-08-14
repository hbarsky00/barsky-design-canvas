
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, User } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { Badge } from "@/components/ui/badge";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { useHomepageKeyboardNavigation } from "@/hooks/useHomepageKeyboardNavigation";

interface BlogPreviewProps {
  maxPosts?: number;
  showTitle?: boolean;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ 
  maxPosts = 3, 
  showTitle = true 
}) => {
  const { navigateUp, navigateDown, canNavigateUp, canNavigateDown } = useHomepageKeyboardNavigation();
  
  const featuredPosts = blogPosts.slice(0, maxPosts);

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 relative">
      <div className="container px-4 mx-auto max-w-6xl">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest Design Insights
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest thoughts on UX design, AI integration, and industry trends
            </p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  Read Article
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/blog"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View All Articles
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        )}
      </div>

      <SectionNavigation
        onNavigateUp={navigateUp}
        onNavigateDown={navigateDown}
        canNavigateUp={canNavigateUp}
        canNavigateDown={canNavigateDown}
        upLabel="Back to services"
        downLabel="View FAQ"
      />
    </section>
  );
};

export default BlogPreview;
