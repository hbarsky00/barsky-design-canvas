
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface CaseStudyHeroProps {
  title: string;
  description: string;
  heroImage: string;
  tags: string[];
  duration: string;
  role: string;
  client: string;
  keyMetrics?: Array<{
    value: string;
    label: string;
  }>;
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  description,
  heroImage,
  tags,
  duration,
  role,
  client,
  keyMetrics = []
}) => {
  return (
    <section className="case-study-hero">
      <div className="case-study-container">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            to="/projects" 
            className="inline-flex items-center text-neutral-500 hover:text-blue-vibrant transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Project Title */}
            <div>
              <h1 className="text-display text-navy-primary mb-4">
                {title}
              </h1>
              <p className="text-body-large text-neutral-500 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary" 
                  className="bg-blue-vibrant/10 text-blue-vibrant border-blue-vibrant/20 hover:bg-blue-vibrant hover:text-white transition-all duration-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Project Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-vibrant/10 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-vibrant" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Duration</p>
                  <p className="font-semibold text-navy-primary">{duration}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-vibrant/10 rounded-lg">
                  <User className="h-5 w-5 text-blue-vibrant" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Role</p>
                  <p className="font-semibold text-navy-primary">{role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-vibrant/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-vibrant" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Client</p>
                  <p className="font-semibold text-navy-primary">{client}</p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            {keyMetrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {keyMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="metric-card"
                  >
                    <div className="metric-number">{metric.value}</div>
                    <div className="metric-label">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={heroImage}
                alt={title}
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
