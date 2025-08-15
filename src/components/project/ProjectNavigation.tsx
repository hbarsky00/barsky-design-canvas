
import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectNavigationProps {
  currentProjectId: string;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentProjectId }) => {
  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold text-foreground mb-4">
        Explore More Projects
      </h3>
      <Link
        to="/projects"
        className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        View All Projects
      </Link>
    </div>
  );
};

export default ProjectNavigation;
