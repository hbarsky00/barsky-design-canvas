
import React from "react";
import { motion } from "framer-motion";
import { Figma } from "lucide-react";

interface HeroVisualProps {
  isVisible: boolean;
}

const HeroVisual: React.FC<HeroVisualProps> = ({ isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      <div className="relative">
        {/* Main Project Showcase */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src="/lovable-uploads/fc79b2eb-c9ff-47eb-b5a9-f5db1a7857c1.png"
            alt="Featured UX/UI design project showcase - Mobile app designs"
            className="w-full h-auto object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Project Info Overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold mb-1">UX/UI Design Projects</h3>
            <p className="text-sm opacity-90">User Research → Wireframes → Interactive Prototypes</p>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm font-medium">7+ Design Projects</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute -bottom-4 -left-4 bg-blue-600 text-white rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <Figma className="h-4 w-4" />
            <span className="text-sm font-medium">Live Web Apps</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroVisual;
