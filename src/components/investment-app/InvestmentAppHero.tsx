
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProjectLinks from "@/components/project/ProjectLinks";

const InvestmentAppHero: React.FC = () => {
  return (
    <div className="text-center space-y-8">
      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          <TrendingUp className="w-4 h-4 mr-2" />
          FinTech • Educational Design
        </Badge>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Making Investing{" "}
          <span className="text-green-600">Accessible to Everyone</span>
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
      >
        Educational design that turns investment complexity into confidence, with 23% more engagement from beginner investors.
      </p>

      {/* Project Link */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <ProjectLinks projectLink="#demo" />
      </motion.div>
    </div>
  );
};

export default InvestmentAppHero;
