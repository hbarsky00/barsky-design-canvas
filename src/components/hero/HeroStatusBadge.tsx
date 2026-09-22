
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface HeroStatusBadgeProps {
  isVisible: boolean;
}

const HeroStatusBadge: React.FC<HeroStatusBadgeProps> = ({ isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Badge variant="outline" className="glass-button bg-secondary/10 text-on-surface border-border/50 px-4 py-2 backdrop-blur-sm">
        <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
        Available for design projects
      </Badge>
    </motion.div>
  );
};

export default HeroStatusBadge;
