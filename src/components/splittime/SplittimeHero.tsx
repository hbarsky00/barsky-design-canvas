
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProjectLinks from "@/components/project/ProjectLinks";

interface SplittimeHeroProps {
  onImageClick: (imageId: string) => void;
  onImageKeypress: (event: React.KeyboardEvent, imageId: string) => void;
}

const SplittimeHero: React.FC<SplittimeHeroProps> = ({ onImageClick, onImageKeypress }) => {
  return (
    <div className="text-center space-y-8">
      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          <Heart className="w-4 h-4 mr-2" />
          Co-Parenting • Communication Platform
        </Badge>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          40% Less Conflict in{" "}
          <span className="text-blue-600">Co-Parenting Communication</span>
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
      >
        Neutral communication tools and stress-aware design that puts children first, reducing conflict by 40% in the first three months.
      </motion.p>

      {/* Project Link */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <ProjectLinks projectLink="http://splittime.pro" />
      </motion.div>
    </div>
  );
};

export default SplittimeHero;
