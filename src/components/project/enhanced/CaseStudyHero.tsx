
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import MaximizableImage from "../MaximizableImage";

interface KeyMetric {
  value: string;
  label: string;
}

interface CaseStudyHeroProps {
  title: string;
  description: string;
  heroImage: string;
  tags: string[];
  duration: string;
  role: string;
  client: string;
  keyMetrics: KeyMetric[];
  projectId?: string;
  imageCaptions?: Record<string, string>;
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  description,
  heroImage,
  tags,
  duration,
  role,
  client,
  keyMetrics,
  projectId,
  imageCaptions = {}
}) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="case-study-container py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Title & Description */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="px-3 py-1 bg-white/80 text-gray-700 border border-gray-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Duration</p>
                <p className="text-lg font-semibold text-gray-900">{duration}</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Role</p>
                <p className="text-lg font-semibold text-gray-900">{role}</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Client</p>
                <p className="text-lg font-semibold text-gray-900">{client}</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white overflow-hidden shadow-2xl">
              <MaximizableImage
                src={heroImage}
                alt={title}
                caption={imageCaptions[heroImage]}
                className="w-full h-auto object-cover"
                projectId={projectId}
                priority={true}
              />
            </div>
          </motion.div>
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="p-6 text-center bg-white/80 backdrop-blur border-gray-200">
                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm md:text-base text-gray-600 leading-tight">
                  {metric.label}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
