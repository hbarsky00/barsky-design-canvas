
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface HeroSkillsTagsProps {
  isVisible: boolean;
}

const HeroSkillsTags: React.FC<HeroSkillsTagsProps> = ({ isVisible }) => {
  const designSkills = [
    "User Research", "Wireframing", "Prototyping", "Visual Design", "Figma", 
    "React", "TypeScript", "Responsive Design", "Design Systems", "Usability Testing"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
    >
      {designSkills.map((skill, index) => (
        <Badge 
          key={skill} 
          variant="secondary" 
          className="glass-button bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 transition-all duration-300 backdrop-blur-sm px-3 py-1.5"
        >
          {skill}
        </Badge>
      ))}
    </motion.div>
  );
};

export default HeroSkillsTags;
