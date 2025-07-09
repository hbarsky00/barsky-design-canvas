
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface HeroSkillsTagsProps {
  isVisible: boolean;
}

const HeroSkillsTags: React.FC<HeroSkillsTagsProps> = ({ isVisible }) => {
  const skills = [
    "Gen AI Integration",
    "WCAG Accessibility", 
    "Conversion Optimization",
    "Enterprise UX"
  ];

  return (
    <div className="space-y-4">
      {/* Skills Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.8 + index * 0.1, duration: 0.4 }}
          >
            <Badge 
              variant="secondary" 
              className="glass-button px-3 py-1 bg-blue-50/80 text-blue-800 hover:bg-blue-100/80 backdrop-blur-sm transition-all duration-300 border border-blue-200/30 text-xs"
            >
              {skill}
            </Badge>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default HeroSkillsTags;
