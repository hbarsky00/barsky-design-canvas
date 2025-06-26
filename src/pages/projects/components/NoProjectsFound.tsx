
import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoProjectsFoundProps {
  onRefresh: () => void;
}

const NoProjectsFound: React.FC<NoProjectsFoundProps> = ({ onRefresh }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center py-12"
    >
      <div className="text-gray-400 mb-4">
        <Eye className="h-12 w-12 mx-auto" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
      <p className="text-gray-600 mb-4">
        Please check back later for new design projects.
      </p>
      <Button
        variant="outline"
        onClick={onRefresh}
      >
        Refresh projects
      </Button>
    </motion.div>
  );
};

export default NoProjectsFound;
