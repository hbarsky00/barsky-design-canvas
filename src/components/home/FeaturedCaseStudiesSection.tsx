
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredCaseStudies = [
  {
    id: "herbalink",
    title: "HerbaLink",
    subtitle: "AI-Powered Herbal Medicine Platform",
    description: "Revolutionizing healthcare access by connecting patients with certified herbalists through an intelligent matching system.",
    image: "/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png",
    url: "/case-study-herbalink",
    category: "Healthcare",
    impact: "40% faster patient-herbalist matching",
    tags: ["AI", "Healthcare", "Mobile App"]
  },
  {
    id: "splittime",
    title: "SplitTime",
    subtitle: "Smart Scheduling Solution",
    description: "Intelligent time management app that eliminates scheduling conflicts through AI-driven optimization.",
    image: "/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png",
    url: "/case-study-splittime",
    category: "Productivity",
    impact: "65% reduction in scheduling conflicts",
    tags: ["AI", "Productivity", "Scheduling"]
  },
  {
    id: "investor-loan",
    title: "Investor Loan App",
    subtitle: "FinTech Innovation",
    description: "Streamlined loan application platform for real estate investors with automated approval workflows.",
    image: "/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png",
    url: "/case-study-investor-loan",
    category: "FinTech",
    impact: "50% faster loan approval process",
    tags: ["FinTech", "Real Estate", "Automation"]
  }
];

const FeaturedCaseStudiesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Case Studies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deep into real-world projects that showcase the power of AI-enhanced design 
            and user-centered solutions across industries
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {featuredCaseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link
                to={study.url}
                className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {study.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Impact Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium">{study.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {study.title}
                  </h3>
                  <h4 className="text-lg font-medium text-blue-600 mb-3">
                    {study.subtitle}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {study.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      <span>Read Case Study</span>
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" className="text-lg">
            <Link to="/case-studies" className="inline-flex items-center gap-3">
              View All Case Studies
              <ArrowRight className="w-6 h-6" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudiesSection;
