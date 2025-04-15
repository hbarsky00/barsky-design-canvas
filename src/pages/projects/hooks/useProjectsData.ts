
import { useState, useEffect } from "react";
import { projectsData } from "@/data/projectsData";
import { ProjectProps } from "@/components/ProjectCard";

export const useProjectsData = () => {
  const [visibleProjects, setVisibleProjects] = useState<ProjectProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  useEffect(() => {
    setVisibleProjects(projectsData);
  }, []);
  
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = visibleProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(visibleProjects.length / projectsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const resetFilters = () => {
    setVisibleProjects(projectsData);
  };

  return {
    currentPage,
    totalPages,
    currentProjects,
    paginate,
    resetFilters
  };
};
