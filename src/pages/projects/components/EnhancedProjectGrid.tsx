
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Grid, List, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProjectProps } from "@/components/ProjectCard";

interface EnhancedProjectGridProps {
  projects: ProjectProps[];
  resetFilters: () => void;
}

const EnhancedProjectGrid: React.FC<EnhancedProjectGridProps> = ({ 
  projects, 
  resetFilters 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract all unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = !selectedTech || project.tags.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24 z-40"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Technology Filter */}
          <div className="flex flex-wrap gap-2 max-w-2xl">
            <Button
              variant={selectedTech === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTech(null)}
              className="text-xs"
            >
              All
            </Button>
            {allTechnologies.slice(0, 8).map((tech) => (
              <Button
                key={tech}
                variant={selectedTech === tech ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                className="text-xs"
              >
                {tech}
              </Button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-3"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedTech) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Search: "{searchTerm}"
              </Badge>
            )}
            {selectedTech && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Tech: {selectedTech}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedTech(null);
              }}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          </div>
        )}
      </motion.div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </motion.div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length > 0 ? (
        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={
                viewMode === "grid"
                  ? "group relative"
                  : "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              }
            >
              {viewMode === "grid" ? (
                // Grid View Card
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
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
                          View Details
                        </Link>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600/90 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Live
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag}
                          variant="secondary" 
                          className="bg-gray-100 text-gray-700 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge 
                          variant="secondary" 
                          className="bg-gray-100 text-gray-500 text-xs"
                        >
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // List View Card
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 aspect-[16/10] md:aspect-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge 
                            key={tag}
                            variant="secondary" 
                            className="bg-gray-100 text-gray-700 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Link 
                        to={`/project/${project.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        View Project
                      </Link>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-20 bg-white rounded-2xl shadow-lg"
        >
          <div className="max-w-md mx-auto">
            <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find more projects.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedTech(null);
                resetFilters();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Show All Projects
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedProjectGrid;
