
import { useState, useEffect } from "react";
import { projectsData } from '@/data/projectsData';
import { ProjectProps } from "@/components/ProjectCard";

// Only these three projects should show on the homepage
const featuredProjectIds = ["herbalink", "investor-loan-app", "splittime"];

// No hidden projects
const hiddenProjectIds: string[] = [];

export const useProjectsData = () => {
  const [visibleProjects, setVisibleProjects] = useState<ProjectProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  // Filter projects for homepage display (only the 3 specified projects)
  const filteredProjects = projectsData.filter(project => 
    featuredProjectIds.includes(project.id)
  );
  
  useEffect(() => {
    // Show all projects in the projects page
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
    resetFilters,
    filteredProjects
  };
};
