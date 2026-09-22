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
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Desktop Title - Hidden on Mobile */}
        <div className="hidden md:block text-center mb-6 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Tag className="h-6 w-6 text-blue-600" />
            <h2 className="heading-section text-gray-900">
              Browse by Category
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated content organized by topics that matter most to UX professionals
          </p>
        </div>

        {/* Mobile: Compact Category Filters */}
        <div className="md:hidden mb-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/blog/category/${category.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full hover:border-primary hover:bg-primary/5 transition-colors whitespace-nowrap min-w-fit text-xs"
              >
                <div className="flex-shrink-0">
                  {React.cloneElement(category.icon as React.ReactElement, { 
                    className: "h-3.5 w-3.5 text-gray-500" 
                  })}
                </div>
                <span className="font-medium text-gray-700">
                  {category.name}
                </span>
                <span className="bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full text-xs leading-none">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet: Card Grid Layout */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/blog/category/${category.slug}`}
              className="group flex flex-col p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:border-primary/50 h-full"
            >
              <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4 group-hover:scale-110 transition-transform self-start`}>
                {category.icon}
              </div>
              
              <h3 className="heading-medium text-foreground mb-2 group-hover:text-primary transition-colors">
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