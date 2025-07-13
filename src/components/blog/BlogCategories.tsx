import React from "react";
import { Link } from "react-router-dom";
import { Tag, TrendingUp, Users, Lightbulb, Code, Search } from "lucide-react";

interface Category {
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

const categories: Category[] = [
  {
    name: "UX Design",
    slug: "ux-design",
    description: "User experience principles, processes, and best practices",
    icon: <Users className="h-5 w-5" />,
    color: "bg-primary/10 text-primary border-primary/20",
    count: 4
  },
  {
    name: "AI & Technology",
    slug: "ai-technology",
    description: "AI-enhanced design tools and emerging technologies",
    icon: <Lightbulb className="h-5 w-5" />,
    color: "bg-secondary/10 text-secondary-foreground border-secondary/20",
    count: 2
  },
  {
    name: "Career Growth",
    slug: "career",
    description: "Professional development and career advancement",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "bg-accent/10 text-accent-foreground border-accent/20",
    count: 3
  },
  {
    name: "Design Systems",
    slug: "design-systems",
    description: "Building and maintaining scalable design systems",
    icon: <Code className="h-5 w-5" />,
    color: "bg-muted text-muted-foreground border-muted-foreground/20",
    count: 2
  },
  {
    name: "User Research",
    slug: "user-research",
    description: "Research methods, tools, and insights",
    icon: <Search className="h-5 w-5" />,
    color: "bg-primary/5 text-primary border-primary/10",
    count: 1
  }
];

const BlogCategories: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Tag className="h-6 w-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Browse by Category
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated content organized by topics that matter most to UX professionals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/blog/category/${category.slug}`}
              className="group flex flex-col p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:border-primary/50 h-full"
            >
              <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4 group-hover:scale-110 transition-transform self-start`}>
                {category.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              
              <p className="text-muted-foreground mb-4 flex-grow">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm text-muted-foreground">
                  {category.count} article{category.count !== 1 ? 's' : ''}
                </span>
                <span className="text-primary group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCategories;