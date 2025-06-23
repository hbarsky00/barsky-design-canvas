
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Figma, Eye, Filter, Grid, List, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectProps } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EnhancedProjectGridProps {
  projects: ProjectProps[];
  resetFilters: () => void;
}

const EnhancedProjectGrid: React.FC<EnhancedProjectGridProps> = ({ 
  projects,
  resetFilters
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Design-focused filter categories
  const filterCategories = [
    'All',
    'UX Research',
    'UI Design', 
    'Prototyping',
    'Frontend Development',
    'Mobile Design',
    'Healthcare',
    'FinTech',
    'E-commerce'
  ];

  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'All' || 
                         project.tags.some(tag => tag.includes(selectedFilter)) ||
                         (selectedFilter === 'UX Research' && project.tags.some(tag => 
                           tag.includes('User Research') || tag.includes('UX Research') || tag.includes('User Journey'))) ||
                         (selectedFilter === 'UI Design' && project.tags.some(tag => 
                           tag.includes('UI Design') || tag.includes('UX/UI') || tag.includes('Visual Design'))) ||
                         (selectedFilter === 'Prototyping' && project.tags.some(tag => 
                           tag.includes('Prototyping') || tag.includes('Figma') || tag.includes('Design'))) ||
                         (selectedFilter === 'Frontend Development' && project.tags.some(tag => 
                           tag.includes('React') || tag.includes('Frontend') || tag.includes('Web')));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search design projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="px-3"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="px-3"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-2 flex-wrap"
      >
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-600 mr-2">Filter by:</span>
        {filterCategories.map((category) => (
          <Button
            key={category}
            variant={selectedFilter === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter(category)}
            className="text-xs"
          >
            {category}
          </Button>
        ))}
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center justify-between text-sm text-gray-600"
      >
        <span>
          Showing {filteredProjects.length} of {projects.length} design projects
        </span>
        {(searchTerm || selectedFilter !== 'All') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setSelectedFilter('All');
              resetFilters();
            }}
            className="text-blue-600 hover:text-blue-700"
          >
            Clear filters
          </Button>
        )}
      </motion.div>

      {/* Projects Grid/List */}
      <div className={`grid gap-8 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
          >
            <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 ${
              viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
            }`}>
              {/* Project Image */}
              <div className={`relative overflow-hidden ${
                viewMode === 'list' 
                  ? 'md:w-80 aspect-[16/10] md:aspect-square' 
                  : 'aspect-[16/10]'
              }`}>
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
                      className="bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
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
              <div className={`p-6 space-y-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className={`text-gray-600 leading-relaxed ${
                    viewMode === 'list' ? '' : 'line-clamp-2'
                  }`}>
                    {project.description}
                  </p>
                </div>

                {/* Technology Tags - Design-focused */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, viewMode === 'list' ? 6 : 3).map((tag) => (
                    <Badge 
                      key={tag}
                      variant="secondary" 
                      className="bg-gray-100 text-gray-700 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > (viewMode === 'list' ? 6 : 3) && (
                    <Badge 
                      variant="secondary" 
                      className="bg-gray-100 text-gray-500 text-xs"
                    >
                      +{project.tags.length - (viewMode === 'list' ? 6 : 3)} more
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

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or filters to find design projects.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedFilter('All');
              resetFilters();
            }}
          >
            Clear all filters
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedProjectGrid;
