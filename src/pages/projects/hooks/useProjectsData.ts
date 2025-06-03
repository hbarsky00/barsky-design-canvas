
import { useState, useEffect } from "react";
import { projectsData } from "@/data/projects/projectsList";
import { ProjectProps } from "@/components/ProjectCard";

// IDs of the featured projects to display on homepage
const featuredProjectIds = ["splittime", "herbalink", "dae-search", "investor-loan-app", "barskyjoint"];

// IDs of hidden projects that won't appear in listings
const hiddenProjectIds = ["gold2crypto", "spectrum"];

export const useProjectsData = () => {
  const [visibleProjects, setVisibleProjects] = useState<ProjectProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  // Filter projects for homepage display (only the selected projects)
  const filteredProjects = projectsData.filter(project => 
    featuredProjectIds.includes(project.id)
  );
  
  useEffect(() => {
    // Filter out hidden projects from visible projects
    setVisibleProjects(projectsData.filter(project => !hiddenProjectIds.includes(project.id)));
  }, []);
  
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = visibleProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(visibleProjects.length / projectsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const resetFilters = () => {
    setVisibleProjects(projectsData.filter(project => !hiddenProjectIds.includes(project.id)));
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
