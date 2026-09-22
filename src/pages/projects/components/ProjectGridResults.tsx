
import React from "react";
import { motion } from "framer-motion";

interface ProjectGridResultsProps {
  count: number;
}

const ProjectGridResults: React.FC<ProjectGridResultsProps> = ({ count }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between text-sm text-gray-600 mt-4"
    >
      <span>
        Showing <span className="font-bold text-lg">{count}</span> design projects
      </span>
    </motion.div>
  );
};

export default ProjectGridResults;
