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
    color: "bg-blue-100 text-blue-800 border-blue-200",
    count: 4
  },
  {
    name: "AI & Technology",
    slug: "ai-technology",
    description: "AI-enhanced design tools and emerging technologies",
    icon: <Lightbulb className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    count: 2
  },
  {
    name: "Career Growth",
    slug: "career",
    description: "Professional development and career advancement",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "bg-green-100 text-green-800 border-green-200",
    count: 3
  },
  {
    name: "Design Systems",
    slug: "design-systems",
    description: "Building and maintaining scalable design systems",
    icon: <Code className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-800 border-orange-200",
    count: 2
  },
  {
    name: "User Research",
    slug: "user-research",
    description: "Research methods, tools, and insights",
    icon: <Search className="h-5 w-5" />,
    color: "bg-cyan-100 text-cyan-800 border-cyan-200",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/blog/category/${category.slug}`}
              className="group p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-blue-300"
            >
              <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4 group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {category.count} article{category.count !== 1 ? 's' : ''}
                </span>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
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