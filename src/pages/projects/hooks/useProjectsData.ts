
import { useState, useEffect } from "react";
import { projectsData } from "@/data/projectsData";
import { ProjectProps } from "@/components/ProjectCard";

export const useProjectsData = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleProjects, setVisibleProjects] = useState<ProjectProps[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  useEffect(() => {
    const filteredByCategory = activeCategory === "All" 
      ? projectsData 
      : projectsData.filter(project => 
          project.tags.some(tag => tag === activeCategory)
        );
    
    const filteredBySearch = searchTerm 
      ? filteredByCategory.filter(project => 
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : filteredByCategory;
    
    setVisibleProjects(filteredBySearch);
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);
  
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = visibleProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(visibleProjects.length / projectsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const resetFilters = () => {
    setActiveCategory("All");
    setSearchTerm("");
  };

  return {
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    isFilterOpen,
    setIsFilterOpen,
    currentPage,
    totalPages,
    currentProjects,
    paginate,
    resetFilters
  };
};
