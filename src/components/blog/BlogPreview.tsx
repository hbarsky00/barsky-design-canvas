
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortedBlogPosts } from "@/data/blogData";
import SectionHeader from "@/components/shared/SectionHeader";

interface BlogPreviewProps {
  maxPosts?: number;
  showTitle?: boolean;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({
  maxPosts = 3,
  showTitle = true
}) => {
  const recentPosts = sortedBlogPosts.slice(0, maxPosts);

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {showTitle && (
          <SectionHeader
            as="h2"
            title="Latest Insights"
            subtitle="Expert perspectives on AI-enhanced design, accessibility, and conversion optimization"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recentPosts.map(post => <article key={post.id} className="bg-background border border-border/10 rounded-2xl shadow-elevation-2 overflow-hidden hover:shadow-elevation-4 transition-shadow duration-300">
              <Link to={`/blog/${post.slug}`} className="block aspect-video w-full overflow-hidden bg-muted">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300" />
              </Link>

              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3 md:gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="heading-medium md:text-xl text-foreground mb-3 line-clamp-2 leading-tight">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm md:text-base">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map(tag => <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {tag}
                    </span>)}
                </div>

                <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm md:text-base">
                  Read More
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
