
import { useState, useEffect } from 'react';

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

interface ProjectDetails {
  challenge: string;
  process: string;
  result: string;
  technologies?: string[];
  duration?: string;
  client?: string;
  role?: string;
}

export const useProjectDetail = (projectId?: string) => {
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setError('No project ID provided');
      setIsLoading(false);
      return;
    }

    // Mock project data - replace with actual data fetching
    const mockProject: ProjectProps = {
      id: projectId,
      title: 'Sample Project',
      description: 'A sample project description',
      image: '/placeholder-image.jpg',
      tags: ['React', 'TypeScript']
    };

    const mockDetails: ProjectDetails = {
      challenge: 'Sample challenge description',
      process: 'Sample process description',
      result: 'Sample results description'
    };

    setProject(mockProject);
    setDetails(mockDetails);
    setIsLoading(false);
  }, [projectId]);

  return { project, details, isLoading, error };
};
