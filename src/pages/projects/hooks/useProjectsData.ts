
import { useState, useEffect } from "react";
import { projectsData } from '@/data/projectsData';
import { ProjectProps } from "@/components/ProjectCard";

// All projects are featured now since we only have real projects
const featuredProjectIds = ["medication-app", "investor-loan-app", "herbalink", "splittime", "barskyjoint"];

// No hidden projects since we removed all fake ones
const hiddenProjectIds: string[] = [];

export const useProjectsData = () => {
  const [visibleProjects, setVisibleProjects] = useState<ProjectProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  // Filter projects for homepage display (all real projects)
  const filteredProjects = projectsData.filter(project => 
    featuredProjectIds.includes(project.id)
  );
  
  useEffect(() => {
    // Show all real projects
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
