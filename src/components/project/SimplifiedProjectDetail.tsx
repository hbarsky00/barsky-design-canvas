
import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import { projectsData } from "@/data/projectsData";
import { projectDetailsData } from "@/data/projectDetailsData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ImageMaximizer from "@/components/ImageMaximizer";
import ModernProjectSections from "./enhanced/sections/ModernProjectSections";
import SEO from "@/seo/SEO";

const SimplifiedProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  if (!projectId) {
    return <Navigate to="/projects" replace />;
  }

  const project = projectsData.find(p => p.id === projectId);
  const details = projectDetailsData[projectId];
  
  if (!project || !details) {
    return <Navigate to="/projects" replace />;
  }

  const [imageCaptions] = useState<Record<string, string>>({});

  // Generate SEO-friendly description
  const seoDescription = project.description.length > 160 
    ? project.description.substring(0, 157) + "..." 
    : project.description;

  return (
    <>
      <SEO
        type="article"
        title={`${project.title} | Product Design Case Study`}
        description={seoDescription}
        url={`/project/${projectId}`}
        image={project.image}
        tags={project.tags}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50/20 via-white to-purple-50/10">
        <Header />
        
        <main className="pt-20">
          {/* Back Navigation */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link 
              to="/projects"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </div>

          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center space-x-3 text-sm mb-4">
                <span className="font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{details.client}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{details.duration}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{details.role}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {project.title}
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="secondary" 
                    className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {details.projectLink && (
                <Button asChild variant="default">
                  <a
                    href={details.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl mb-16"
            >
              <ImageMaximizer
                src={project.image}
                alt={`${project.title} hero image`}
                className="w-full h-auto"
                imageId="hero"
              />
            </motion.div>

            {/* Project Sections */}
            <ModernProjectSections
              details={details}
              projectId={projectId}
              componentKey="simplified"
              imageCaptions={imageCaptions}
              project={project}
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SimplifiedProjectDetail;
