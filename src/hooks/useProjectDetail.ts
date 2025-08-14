
import { useState, useEffect } from "react";
import { ProjectProps, ProjectDetails } from "@/data/types/project";
import { projectsData } from "@/data/projectsData";

export const useProjectDetail = (projectId: string | undefined) => {
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setError("No project ID provided");
      setIsLoading(false);
      return;
    }

    // Find project in data
    const foundProject = projectsData.find(p => p.id === projectId);
    
    if (!foundProject) {
      setError("Project not found");
      setIsLoading(false);
      return;
    }

    setProject(foundProject);
    
    // Mock project details - in a real app this would come from an API
    setDetails({
      challenge: "The main challenge was to create an intuitive user experience while maintaining complex functionality.",
      process: "We followed a user-centered design process, conducting research, creating prototypes, and iterating based on feedback.",
      result: "The final solution delivered improved user satisfaction and measurable business impact.",
      duration: "3 months",
      client: "Enterprise Client",
      role: "Lead Product Designer",
      technologies: foundProject.tags
    });
    
    setIsLoading(false);
  }, [projectId]);

  return { project, details, isLoading, error };
};
