
import { useState, useEffect } from "react";
import { projectsData } from "@/data/projects/projectsList";
import { ProjectProps } from "@/components/ProjectCard";

// Only show these 3 specific projects everywhere
const featuredProjectIds = ["herbalink", "splittime", "investor-loan-app"];

export const useProjectsData = () => {
  const [visibleProjects, setVisibleProjects] = useState<ProjectProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  // Filter projects to only show the 3 featured ones
  const filteredProjects = projectsData.filter(project => 
    featuredProjectIds.includes(project.id)
  );
  
  useEffect(() => {
    // Only show the 3 filtered projects
    setVisibleProjects(filteredProjects);
  }, []);
  
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = visibleProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(visibleProjects.length / projectsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const resetFilters = () => {
    setVisibleProjects(filteredProjects);
  };

  return {
    currentPage,
    totalPages,
    currentProjects,
    paginate,
    resetFilters,
    filteredProjects
  };
};
