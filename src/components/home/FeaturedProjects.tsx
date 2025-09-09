
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Figma } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProjectsData } from "@/pages/projects/hooks/useProjectsData";

const FeaturedProjects: React.FC = () => {
  const {
    filteredProjects
  } = useProjectsData();

  // Show featured projects with crypto first, then investor platform
  const featuredProjectIds = ["crypto", "investor-loan-app", "business-management", "herbalink", "barskyjoint"];
  const displayProjects = featuredProjectIds.map(id => filteredProjects.find(project => project.id === id)).filter(Boolean);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-16"
        >
          <h2 className="heading-section text-gray-900 mb-6 py-[25px]">Case Study Design Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Real case studies showing how AI-enhanced UX design delivers measurable ROI for startups and enterprises. 
            Each project combines traditional UX research with Gen AI to create breakthrough results.
          </p>
        </motion.div>

        {/* Projects Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {displayProjects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: index * 0.1 }} 
              className="group relative"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover Overlay - Updated with standardized buttons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-3">
                      <Button asChild variant="outline" className="bg-white/90 hover:bg-white border-gray-300">
                        <Link to={`/project/${project.id}`}>
                          View Case Study
                        </Link>
                      </Button>
                      {project.link && (
                        <Button asChild variant="outline" className="bg-blue-50/90 hover:bg-blue-100 border-blue-300 text-blue-700 hover:text-blue-800">
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <Figma className="h-4 w-4 mr-1" />
                            Live Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="heading-card text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 2 && (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-500 text-xs">
                        +{project.tags.length - 2} more
                      </Badge>
                    )}
                  </div>

                  {/* Project Meta */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>2025</span>
                      <span>•</span>
                      <span>Product Design</span>
                    </div>
                    <Button asChild variant="outline" size="sm" className="text-xs">
                      <Link to={`/project/${project.id}`} className="flex items-center group">
                        View Case Study
                        <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROI Metrics Bar - Desktop */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6, delay: 0.3 }} 
          className="hidden sm:grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16"
        >
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-impact-metric-neutral-md text-green-600">65%</div>
            <div className="text-sm text-green-700">User Engagement ↑</div>
            <div className="text-xs text-green-600">Business Management</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-impact-metric-neutral-md text-blue-600">70%</div>
            <div className="text-sm text-blue-700">Faster Processing</div>
            <div className="text-xs text-blue-600">Loan Management</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-impact-metric-neutral-md text-purple-600">$2M+</div>
            <div className="text-sm text-purple-700">Revenue Generated</div>
            <div className="text-xs text-purple-600">Client Portfolio</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
