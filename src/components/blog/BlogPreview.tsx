
import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Link } from "react-router-dom";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { useHomepageKeyboardNavigation } from "@/hooks/useHomepageKeyboardNavigation";

const BlogPreview: React.FC = () => {
  const { navigateUp, navigateDown, canNavigateUp, canNavigateDown } = useHomepageKeyboardNavigation();

  const featuredPosts = [
    {
      id: "ai-ux-design-future",
      title: "The Future of AI in UX Design",
      excerpt: "How artificial intelligence is revolutionizing user experience design and what it means for designers.",
      image: "/lovable-uploads/ai-ux-design.jpg",
      date: "2024-01-15",
      readTime: "5 min read",
      slug: "ai-ux-design-future"
    },
    {
      id: "design-system-best-practices",
      title: "Building Scalable Design Systems",
      excerpt: "Essential principles and practices for creating design systems that grow with your product.",
      image: "/lovable-uploads/design-system.jpg",
      date: "2024-01-10",
      readTime: "8 min read",
      slug: "design-system-best-practices"
    },
    {
      id: "user-research-methods",
      title: "Modern User Research Methods",
      excerpt: "A comprehensive guide to user research techniques that drive product decisions.",
      image: "/lovable-uploads/user-research.jpg",
      date: "2024-01-05",
      readTime: "6 min read",
      slug: "user-research-methods"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-background relative">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts on design, technology, and the future of digital experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    fallback="/placeholder.svg"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                  >
                    Read More
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button asChild size="lg">
            <Link to="/blog">
              View All Posts
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <SectionNavigation
        onNavigateUp={navigateUp}
        onNavigateDown={navigateDown}
        canNavigateUp={canNavigateUp}
        canNavigateDown={canNavigateDown}
        upLabel="Back to contact"
        downLabel="View FAQ"
      />
    </section>
  );
};

export default BlogPreview;
