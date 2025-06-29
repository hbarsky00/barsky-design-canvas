
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Figma } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProjectsData } from "@/pages/projects/hooks/useProjectsData";

const FeaturedProjects: React.FC = () => {
  const { filteredProjects } = useProjectsData();
  
  // Show only the three specific projects in order: herbalink, splittime, investor-loan-app
  const featuredProjectIds = ["herbalink", "splittime", "investor-loan-app"];
  const displayProjects = featuredProjectIds
    .map(id => filteredProjects.find(project => project.id === id))
    .filter(Boolean); // Remove any undefined projects

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Explore my portfolio of Product Design and Generative AI Development work. 
            Each project reflects a user-centered design approach, encompassing research, ideation, 
            design, and development implementation.
          </p>
        </motion.div>

        {/* Projects Grid - 3 columns for desktop/tablet, 1 for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-3">
                      <Link 
                        to={`/project/${project.id}`}
                        className="bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        View Case Study
                      </Link>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600/90 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                        >
                          <Figma className="h-4 w-4 mr-1" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge 
                        key={tag}
                        variant="secondary" 
                        className="bg-gray-100 text-gray-700 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 2 && (
                      <Badge 
                        variant="secondary" 
                        className="bg-gray-100 text-gray-500 text-xs"
                      >
                        +{project.tags.length - 2} more
                      </Badge>
                    )}
                  </div>

                  {/* Project Meta */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>2024</span>
                      <span>•</span>
                      <span>UX/UI Design</span>
                    </div>
                    <Link 
                      to={`/project/${project.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group"
                    >
                      View Case Study
                      <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/projects">
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold"
            >
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
